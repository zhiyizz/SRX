'use client'

import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'
import styles from '@styles/series.module.scss'

import type { GalleryList, MediaEntity, SeriesJson, SeriesObject } from '~types/series';
import SvgIcon from '@components/icons';
import { combineUrl, divideByElement, extractHtmlTag } from '@utils/helper'
import Testdrive from '@components/Testdrive'
import SeriesPage from '@components/series/pages/SeriesPage'
import MediaViewer from '@components/MediaViewer'
import type { OverlayModule } from '@components/SeriesNavigation'
import AsideButtons from '@components/AsideButtons'
import { trackEvent } from '@utils/tracking'
import AliImage from '@components/AlImage'
import { hideNav, resetTd, setKeepScroll, setPosition, setScrollDisabled, setTdInView, setTheme, setXingyun, showNav, useDispatch, useSelector } from 'lib/redux'
import BackTop from '@components/BackTop'

const SeriesGeneral: NextPage<{
  data: SeriesJson
  currentSeries: SeriesObject
  loanPicList?: string[]
  promo?: string
  prefix?: string
  draftMode?: boolean
}> = ({ data, currentSeries, loanPicList, promo, prefix, draftMode }) => {
  // const [hideNav, setHideNav] = useState(false)
  // const [hideFooter, setHideFooter] = useState(true)
  const [showPromo, setShowPromo] = useState(false)
  const [disableScroll, setDisableScroll] = useState(false)
  // const [isAvenir, setIsAvenir] = useState(false)
  // const [isVelite, setIsVelite] = useState(false)
  // const [isElectra, setIsElectra] = useState(false)
  const [themeBlue, setThemeBlue] = useState(false)

  const [galleryList, setGalelryList] = useState<GalleryList>()
  const [showGallery, setShowGallery] = useState(false)

  const [backTop, setBackTop] = useState(false)
  // const [showTd, setShowTd] = useState(false)
  const [defaultOverlay, setDefaultOverlay] = useState<OverlayModule>()

  // const [ebuickLink, setEbuickLink] = useState<string>()

  const [showAsideTop, setShowAsideTop] = useState<boolean>()

  // const [hasKvOverlay, setHasKvOverlay] = useState(false)

  // const [assetsPrefix, setAssetsPrefix] = useState<string>()
  const [tdImages, setTdImages] = useState<{
    pc?: MediaEntity
    mob?: MediaEntity
  }>()

  const tdEle = useRef<HTMLDivElement | null>(null)
  const { ref: tdRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: '1000px 0px 0px 0px',
  })

  const dispatch = useDispatch()
  const showTd = useSelector(state => state.nav.td)

  const handleScrollTop = useCallback(() => {
    if (!backTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setBackTop(true)
      setTimeout(setBackTop, 3000, false)
    }
  }, [backTop])

  const handleNavChange = useCallback((stat: boolean) => {
    if (stat) {
      dispatch(hideNav())
    } else {
      dispatch(showNav())
    }
  }, [dispatch])

  useEffect(() => {
    if (data.testdrive?.media) {
      const img: Partial<Record<'pc' | 'mob', MediaEntity>> = {}
      data.testdrive.media.forEach(item => {
        img[item.device] = item
      })
      setTdImages(img)
    }
  }, [data.testdrive?.media])

  useEffect(() => {
    if (showTd) {
      console.log('to td')
      setDisableScroll(false)
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

  const isAvenir = !!data.avenir
  const isVelite = /^velite/.test(currentSeries.code)
  const isElectra = !!data.electra

  const p = prefix || data.prefix
  const assetsPrefix = (p && combineUrl('https://static.buick.com.cn/assets/', draftMode ? 'preview' : undefined, p, currentSeries.code)) || `/img/${currentSeries.code}`

  useEffect(() => {
    if (data.xingyun?.url) {
      dispatch(setXingyun(combineUrl(data.xingyun.url.startsWith(`${currentSeries.code}-`) ? process.env.NEXT_PUBLIC_XINGYUN_PREFIX : assetsPrefix, data.xingyun.url)))
    } else {
      dispatch(setXingyun(currentSeries.code))
    }
    return () => {
      dispatch(setXingyun(undefined))
    }
  }, [assetsPrefix, currentSeries.code, data.xingyun, dispatch])

  useEffect(() => {
    if (isAvenir) {
      dispatch(setPosition('fixed'))
      dispatch(setScrollDisabled(false))
      dispatch(setKeepScroll(false))
    } else {
      dispatch(setPosition('absolute'))
      dispatch(setScrollDisabled(disableScroll))
      dispatch(setKeepScroll(!backTop))
    }
    return () => {
      dispatch(setPosition('static'))
      dispatch(setScrollDisabled(false))
      dispatch(setKeepScroll(false))
    }
  }, [backTop, disableScroll, dispatch, isAvenir])

  useEffect(() => {
    if (isVelite || isElectra || data.theme === 'blue' || data.electraTheme) {
      dispatch(setTheme('blue'))
      setThemeBlue(true)
    } else {
      dispatch(setTheme('red'))
      setThemeBlue(false)
    }
    return () => {
      dispatch(setTheme('red'))
    }
  }, [data.electraTheme, data.theme, dispatch, isElectra, isVelite])

  useEffect(() => {
    dispatch(setTdInView(true))
    return () => {
      dispatch(setTdInView(false))
    }
  }, [dispatch])

  useEffect(() => {
    console.log(location.hash)
    if (location.hash) {
      const hash = location.hash.replace(/^#/, '') as OverlayModule
      const allowed: OverlayModule[] = ['exterior', 'finance', 'gallery', 'interior', 'specs']
      if (allowed.includes(hash)) {
        console.log('set default overlay')
        setDefaultOverlay(hash)
      }
    }
  }, [])

  useEffect(() => {
    if (loanPicList) {
      window.loanPicList = loanPicList
    }
    return () => {
      delete window.loanPicList
    }
  }, [loanPicList])

  return (
    // <BasePage className={styles.main} title={currentSeries?.displayName || currentSeries?.name} seriesData={series}  code={code} categoryList={category} hideNav={hideNav} navPosition={isAvenir ? "fixed" : "absolute"} theme={isVelite || isElectra ? 'blue' : 'red'} disableScroll={isAvenir ? false : disableScroll} hideScrollbar={isAvenir ? disableScroll : false} keepScroll={isAvenir ? false : (disableScroll && !backTop)} smoothScroll={backTop || showTd} showIChat={showIChat} onNavBuy={ebuickLink ? (() => {
    //   window.open(ebuickLink)
    // }) : undefined} onNavTd={handleScrollTestdrive} onIChatClose={() => {
    //   setShowIChat(false)
    // }}>
    <main className={classNames(styles.main, {
      'theme-blue': themeBlue,
    })}>
      <SeriesPage avenir={isAvenir} promo={promo} name={currentSeries.name} velite={isVelite} electra={isElectra} code={currentSeries.code} data={data} series={currentSeries}
        defaultOverlay={defaultOverlay}
        prefix={assetsPrefix}
        onPromoClick={() => {
          setShowPromo(true)
        }} onScrollStateChange={setDisableScroll} onNavChange={handleNavChange} onGalleryShow={(list) => {
          setGalelryList(list)
          setShowGallery(true)
        }}
        top={backTop} td={showTd} draftMode={draftMode}
        onTop={handleScrollTop} onTopVisibleChange={setShowAsideTop} />

      <AsideButtons configurator={currentSeries.flags?.configurator ? currentSeries.code : undefined} tracking={currentSeries.name} onTop={handleScrollTop} hideTd={inView} showTop={!disableScroll && (/avenir|^velite/.test(currentSeries.code) ? undefined : showAsideTop)} />

      {currentSeries.flags?.testdrive !== false && <div ref={el => {
        tdEle.current = el
        tdRef(el)
      }} className={classNames(styles.testdrive, {
        [styles.avenir]: isAvenir,
        [styles.velite]: isVelite,
        [styles.electra]: /^electra/.test(currentSeries.code),
      })}>
        {tdImages && <figure className={classNames({
          [styles.dark]:data.testdrive?.theme === 'dark'
        })}>
          <div className="pc"><AliImage src={combineUrl(assetsPrefix, tdImages.pc?.url)} alt={tdImages.pc?.alt || '诚邀驾享体验'} fill /></div>
          <div className="m"><AliImage src={combineUrl(assetsPrefix, tdImages.mob?.url)} alt={tdImages.mob?.alt || '诚邀驾享体验'} width={tdImages?.mob?.width || 750} height={tdImages?.mob?.height || 560} /></div>
          <div className={styles.text}>
            <h3>诚邀驾享体验</h3>
            <small>即刻线上预约试驾</small>
          </div>
        </figure>}
        <div className={classNames(styles.container)}>
          <h4>预约试驾</h4>
          <Testdrive styles={styles} series={currentSeries} tracking={`车型页-${currentSeries.name}`} />
        </div>
      </div>}

      <BackTop className={classNames('m', styles.top, {
        [styles.avenir]: /avenir/.test(currentSeries.code),
        [styles.electra]: /electra/.test(currentSeries.code),
      })} onClick={handleScrollTop} />

      {/^electra/.test(currentSeries.code) && <div className={styles['miniprogram-code']}>
        <div className={styles.title}>
          <h3>微信小程序</h3>
          <p>扫码关注{data.kv[0].name}</p>
        </div>
        <div className={styles.code}>
          <picture>
            <source srcSet={combineUrl(assetsPrefix, `${currentSeries.code}.jpg`)} media="(min-width:768px)" />
            <img src={combineUrl(assetsPrefix, `${currentSeries.code}_m.jpg`)} alt="星云展厅小程序" width="100%" />
          </picture>
        </div>
      </div>}

      {/* 金融政策 */}
      {data.promo?.detail && <div className={classNames(styles.promo, {
        [styles['promo-show']]: showPromo,
        'animate__animated': showPromo,
        'animate__zoomIn': showPromo,
        'animate__fast': showPromo,
      })}>
        <div className={styles.container}>
          <a className={styles.close} onClick={() => {
            setShowPromo(false)
            setDisableScroll(false)
            data.promo && currentSeries && trackEvent(`车型页-${currentSeries.name}-一级页面-${data.promo.subTitle || '购车礼遇'}浮层-关闭`)
          }}><i className="icon-close"></i></a>
          <h2><small><span>{data.promo.subTitle || '购车礼遇'}</span></small><span>{data.promo.title || '别克倾情 负担清零'}</span></h2>
          <div className={styles.content}>
            {data.promo.detail.map((item, index) => <div key={index} className={styles.item}>
              <div className={styles.wrapper}>
                <figure>
                  <SvgIcon icon={item.icon} />
                </figure>
                <div className={styles.text}>
                  <strong>{extractHtmlTag(item.title)}{item.sup && <sup>{item.sup}</sup>}</strong>
                  {item.content && <span>{divideByElement(item.content)}</span>}
                </div>
              </div>
            </div>)}
          </div>
          {data.promo.remark && <div className={styles.footer}>{divideByElement(data.promo.remark)}</div>}
        </div>
      </div>}
      {galleryList && <MediaViewer show={showGallery} prefix={assetsPrefix} index={galleryList.index} images={galleryList.list} onClose={() => setShowGallery(false)} />}
    </main>
  )
}

export default SeriesGeneral
