'use client'

import type { FC } from 'react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import { Mousewheel } from 'swiper'
import Scrollbar from 'smooth-scrollbar'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

import styles from '@styles/series.module.scss'

import type { OverlayModule } from '../../SeriesNavigation'
import SeriesNavigation from '../../SeriesNavigation'
import type { SeriesPageProperties } from '~types/series'
import KvSlider from '../../KvSlider'
// import SeriesFeature from '../../SeriesFeature'
import FeatureOverlay from '../../features/FeatureOverlay'
import KvInfo from '@components/KvInfo'
import SvgIcon from '@components/icons'
import { trackEvent, trackPv } from '@utils/tracking'

const SeriesFeature = dynamic(() => import('../../SeriesFeature'), {
  loading: () => <p>正在加载...</p>,
})

const GeneralPage: FC<SeriesPageProperties> = ({ promo, code, data, series, top, td, prefix, defaultOverlay, draftMode, onPromoClick, onNavChange, onScrollStateChange, onTop, onGalleryShow, onHasKvOverlay, onTopVisibleChange }) => {
  const [hideNav, setHideNav] = useState(false)
  const [currentNav, setCurrentNav] = useState<OverlayModule>()
  // const [hideFooter, setHideFooter] = useState(true)
  const [hidePagination, setHidePagination] = useState(true)
  // 浮层显示状态
  const [overlay, setOverlay] = useState('')
  const paginationEl = useRef<HTMLDivElement>(null!)

  const initedFbi = useRef<{[key: string]: boolean}>({})
  const details = useRef<{[key: string]: HTMLDivElement | null}>({})
  const swiper = useRef<SwiperType>()
  const isSwiperEnded = useRef(false)
  const nextOverlay = useRef<OverlayModule>()
  const [paginationName,setPaginationName] = useState<string[]>([])
  const [paginationIdx,setPaginationIdx] = useState(0)
  const [paginationArr,setPaginationArr] = useState<number[]>([0])
  const [trackName,setTrackName] = useState<string[]>([]);

  const showDetail = (key: string) => {
    if (!initedFbi.current[key] && details.current[key]) {
      Scrollbar.init(details.current[key]!, {
        alwaysShowTracks:true
      })
      initedFbi.current[key] = true
    }
    setOverlay(key)
    setScrollable(false)
  }

  const setScrollable = useCallback((status: boolean) => {
    // console.log('set scroll', status, isSwiperEnded.current )
    onScrollStateChange?.(!(status && isSwiperEnded.current))
  }, [onScrollStateChange])

  const hasGallery = Array.isArray(data.gallery) && data.gallery.length > 0

  const showOverlay = useCallback((overlay?: OverlayModule) => {
    if (swiper.current) {
      nextOverlay.current = overlay
      swiper.current.slideTo(1)
      // setCurrentNav(overlay)
    }
  }, [])

  useEffect(() => {
    onScrollStateChange?.(true)

    return () => {
      onScrollStateChange?.(false)
    }
  }, [onScrollStateChange])

  useEffect(() => {
    let disabled = false
    window.scrollTo(0, 0)
    const handleScroll = () => {
      if (isSwiperEnded.current && swiper.current) {
        if (window.scrollY > 0 && !disabled) {
          // console.warn('disable mousewheel')
          swiper.current.mousewheel.disable()
          // swiper.current.allowTouchMove = false
          disabled = true
          // swiper.current.disable()
        } else if (disabled && window.scrollY === 0) {
          // console.warn('enable mousewheel')
          swiper.current.mousewheel.enable()
          // swiper.current.allowTouchMove = true
          disabled = false
          // swiper.current.enable()
        }
      }
    }
    let start = -1
    const handleTouch = (e: TouchEvent) => {
      if (isSwiperEnded.current) {
        if (window.scrollY === 0) {
          const t = e.touches[0]
          if (!~start) {
            start = t.clientY
          }
          const dist = start - t.clientY
          if (dist < -10 && swiper.current) {
            console.log('allow touch')
            swiper.current.allowTouchMove = true
            setScrollable(false)
          }
        }
      }
    }
    const handleTouchEnd = () => {
      start = -1
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchmove', handleTouch)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [setScrollable])

  useEffect(() => {
    if (defaultOverlay) {
      showOverlay(defaultOverlay)
    }
  }, [defaultOverlay, showOverlay])

  useEffect(() => {
    if (top && swiper.current) {
      swiper.current.slideTo(0, 400)
      swiper.current.mousewheel.enable()
      swiper.current.allowTouchMove = true
      setScrollable(false)
    }
  }, [setScrollable, top])

  useEffect(() => {
    if (td && swiper.current && typeof data.features?.length !== 'undefined') {
      swiper.current.slideTo(swiper.current.slides.length - 1, 400)
      swiper.current.mousewheel.disable()
      swiper.current.allowTouchMove = false
    }
  }, [data.features?.length, td])

  const setLock = useCallback((locked: boolean) => {
    setScrollable(!locked)
    if (!isSwiperEnded.current && swiper.current) {
      if (locked) {
        swiper.current.disable()
      } else {
        swiper.current.enable()
      }
    }
  }, [setScrollable])

  useEffect(()=>{
    if (data.features) {
      const paginationName = ['首屏', ...data.features.map(item => item.nav)];
      const track = ['首屏']
      const paginationArr = [0]
      data.features.map((item, idx) => {
        if (Array.isArray(item.slides)) {
          item.slides.filter(() => {
            paginationArr.push(idx + 1)
            track.push(item.nav)
          })
        } else {
          paginationArr.push(idx + 1)
          track.push(item.nav)
        }
      })
      setTrackName(track)
      console.log(paginationArr)
      setPaginationArr(paginationArr)
      setPaginationName(paginationName)
    }
  },[data.features])

  if (!data.features) return null

  const slideTo = (id: number) => {
    const current = paginationArr.filter(item => item < id).length
    return current
  }

  return (
    <>
      <SeriesNavigation code={code} vehiclePic={series.pic} displayName={series.displayName}
        viewer={data.show} specs={data.specs} gallery={data.gallery}
        prefix={prefix} tutorial={data.tutorial} draftMode={draftMode}
        name={series.name} flags={series.flags} show={hideNav} pinned hasGallery={hasGallery} currentOverlay={currentNav} lockPageFn={setLock}
        onOverlayChange={setCurrentNav} onTop={onTop} onGalleryShow={onGalleryShow} />

      <Swiper
        className={styles['series-swiper']}
        direction="vertical"
        modules={[Mousewheel]}
        speed={800}
        threshold={30}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          thresholdTime:800,
        }}
        onSwiper={s => swiper.current = s}
        onSlideChangeTransitionStart={swiper => {
          isSwiperEnded.current = swiper.isEnd
          if (!swiper.isEnd) {
            setScrollable(false)
          }

          const { realIndex } = swiper
          setHidePagination(realIndex < 1)
          setHideNav(realIndex > 0)
          onNavChange?.(realIndex > 0)
          setPaginationIdx(realIndex)
          onTopVisibleChange?.(realIndex > 0)
        }}
        onSlideChangeTransitionEnd={swiper => {
          // console.log('mousewheel', swiper.mousewheel.enabled)
          const { realIndex } = swiper
          if (swiper.isEnd && realIndex > 0) {
            setScrollable(true)
          }
          if (nextOverlay.current) {
            setCurrentNav(nextOverlay.current)
            nextOverlay.current = undefined
          }
          trackPv(`车型页-${series.name}-一级页面-${trackName[realIndex]}`)
        }}
        onToEdge={swiper => {
          // console.log('edge', swiper.isEnd)
          // isSwiperEnded.current = swiper.isEnd
          if (swiper.isEnd) {
            swiper.allowTouchMove = false
          }
        }}
        onSlideResetTransitionStart={swiper => {
          if (swiper.isEnd) {
            // swiper.allowTouchMove = false
            setScrollable(true)
          }
        }}
      >
        {/* 首屏 */}
        <SwiperSlide>
          <KvSlider promo={promo!} className={styles.kv} slides={data.kv} prefix={prefix} onPromoClick={() => {
            setScrollable(false)
            onPromoClick?.()
          }} onHasKvOverlay={onHasKvOverlay} onScrollStateChange={setLock}>
            {data.info && <KvInfo data={data.info} name={series.name} price={series.price} prefix={prefix} />}
          </KvSlider>
          <div className={styles['scroll-hint']}><SvgIcon icon="angle-up" /></div>
          <SeriesNavigation className={styles.subnav} code={code} name={series.name} displayName={series.displayName} flags={series.flags} hasGallery={hasGallery} currentOverlay={currentNav} tutorial={data.tutorial} mirror onMenuClick={showOverlay} />
        </SwiperSlide>

        {/* Fbi */}
        {data.features.map((item, index) => (
          Array.isArray(item.slides) ? (
            item.slides.map((item2,index2) => (
              <SwiperSlide key={index2}>
                <SeriesFeature data={item2} name={series.name} index={`${index}_${index2}`} prefix={prefix} onMore={showDetail} />
             </SwiperSlide>
            ))
          
          ): <SwiperSlide key={index}>
              <SeriesFeature data={item} name={series.name} index={`${index}`} prefix={prefix} onMore={showDetail} />
           </SwiperSlide>
        
        ))}

        {/* Fbi侧导航 */}
        <div className={classNames('swiper-pagination', styles['swiper-pagination-custom-fbi'], {
          [styles.visible]: !hidePagination
        })}>
          <div className={styles['swiper-pagination-bullets']} ref={paginationEl}>
            {paginationName.map((item, index) => (
              <span key={index} className={classNames(styles.bullet, {
                [styles.active]: index === paginationArr[paginationIdx],
              })}
              onClick={() => {
                slideTo(index)
                swiper?.current?.mousewheel.enable()
                window.scrollTo(0, 0)
                setPaginationIdx(index)
                swiper.current?.slideTo(slideTo(index))
                trackEvent(`车型页-${series.name}-一级页面-${trackName[index]}`)
              }}>{item}</span>
            ))}
          </div>
        </div>

      </Swiper>

      {/* Fbi浮层 */}
      <div>
        {data.features.map((item, index) => {
          return (
            <Fragment key={index}>
              {item.slides && Array.isArray(item.slides) ? item.slides && item.slides.map((item2, index2) => {
                return item2.detail && <FeatureOverlay  key={(index2)} code={code} data={item2.detail} layout={item2.layout} category={item2.category} common={item2.common} index={`${index}_${index2}`} prefix={prefix} show={overlay === `${index}_${index2}`} ref={el => details.current[`${index}_${index2}`] = el} onClose={() => {
                  setOverlay('')
                  setScrollable(true)
                }} />
              }) : (
                <FeatureOverlay key={index}  code={code} data={item.detail} layout={item.layout} category={item.category} common={item.common} index={`${index}`} prefix={prefix} show={overlay === `${index}`} ref={el => details.current[index] = el} onClose={() => {
                  setOverlay('')
                  setScrollable(true)
                }} />
              )}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default GeneralPage
