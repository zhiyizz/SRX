'use client'

import AsideButtons from '@components/AsideButtons'
import Testdrive from '@components/Testdrive'
// import { trackEvent } from '@utils/tracking'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from '@styles/home.module.scss'
import type { SeriesObject } from '~types/series'
import { resetTd, setPosition, setTdInView, useDispatch, useSelector } from 'lib/redux'

// type EbuickType = {
//   name: string
//   ebuick: string
// }

// function isEbuickType(val: any): val is EbuickType {
//   return val && 'name' in val && 'ebuick' in val && val.ebuick
// }

type HomeProperties = {
  series?: SeriesObject[]
  seriesOrder?: string[]
}

export default function HomeBlock({ series, seriesOrder }: HomeProperties) {
  // const [ebuick, setEbuick] = useState<EbuickType[]>()
  const [showBuy, setShowBuy] = useState(false)
  // const [buySeries, setBuySeries] = useState<EbuickType>()

  const tdEle = useRef<HTMLElement | null>(null)
  const buyEle = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const showTd = useSelector(state => state.nav.td)
  const isMobile = useSelector(state => state.global.isMobile)

  const { ref: tdRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: '5000px 0px 0px 0px',
  })

  const handleScrollBuy = useCallback(() => {
    if (!showBuy) {
      setShowBuy(true)
      setTimeout(setShowBuy, 3000, false)
    }
  }, [showBuy])

  useEffect(() => {
    if (showTd) {
      console.log('to td')
      setTimeout(() => {
        if (tdEle.current) {
          tdEle.current.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          })
        }
        setTimeout(() => {
          dispatch(resetTd())
        }, 2000);
      }, 20);
    }
  }, [dispatch, showTd])

  useEffect(() => {
    if (showBuy) {
      buyEle.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }, [showBuy])

  useEffect(() => {
    dispatch(setPosition('fixed'))
    return () => {
      dispatch(setPosition('static'))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(setTdInView(true))
    return () => {
      dispatch(setTdInView(false))
    }
  }, [dispatch])

  // useEffect(() => {
  //   if (seriesOrder && series) {
  //     const eb = seriesOrder.map(key => {
  //       let obj = series.find(item => item.code === key)
  //       if (obj) {
  //         return {
  //           name: obj.displayName || obj.name,
  //           ebuick: obj.ebuick,
  //         }
  //       }
  //       return
  //     }).filter(isEbuickType)
  //     setEbuick(eb)
  //   }
  // }, [series, seriesOrder])

  return (
    // <BasePage className={styles.main} seriesData={series} categoryList={category} navPosition="fixed" showIChat={showIChat} smoothScroll={showTd || showBuy} onNavBuy={handleScrollBuy} onNavTd={handleScrollTestdrive} onIChatClose={() => {
    //   setShowIChat(false)
    // }}>
    <>
      <section ref={el => {
        tdEle.current = el
        tdRef(el)
      }} className={styles.td} id="td">
        {typeof isMobile === 'boolean' && <video src={isMobile ? 'video/home_td_m.mp4' : 'video/home_td.mp4'} poster={isMobile ? '/img/home/home_td_m.webp' : undefined} playsInline muted autoPlay loop></video>}
        <div className={styles.wrapper}>
          <h2>预约试驾</h2>
          <Testdrive styles={styles} series={series} seriesOrder={seriesOrder} tracking="首页" />
        </div>
      </section>

      {/* <section ref={buyEle} className={styles.buy} id="buy">
        {typeof isMobile === 'boolean' && <video src={isMobile ? 'video/home_buy_m.mp4' : 'video/home_buy.mp4'} poster={isMobile ? '/img/home/home_buy_m.webp' : undefined} playsInline muted autoPlay loop></video>}
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h2>在线购车</h2>
            <div className={styles.control}>
              <select value={buySeries?.ebuick ?? ''} onChange={e => {
                const buy = ebuick?.find(item => item.ebuick === e.target.value)
                setBuySeries(buy)
              }}>
                <option value="" disabled>请选择车型</option>
                {ebuick && ebuick.map((item, index) => <option key={index} value={item.ebuick}>{item.name}</option>)}
              </select>
            </div>
            <button className="btn" type="button" onClick={() => {
              if (buySeries) {
                const [pc, mob] = buySeries.ebuick.split(/[,|]/)
                const url = initialMobile && mob || pc
                if (/^http/.test(url)) {
                  console.log(url)
                  open(url)
                }
                trackEvent(`首页-立即购车-${buySeries?.name}`)
              } else {
                trackEvent(`首页-立即购车`)
              }
            }}>立即购车</button>
          </div>
        </div>
      </section> */}

      <AsideButtons tracking={'首页'} onBuy={handleScrollBuy} hideTd={inView} />
    </>
    // </BasePage>
  )
}
