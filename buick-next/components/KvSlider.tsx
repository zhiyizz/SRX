'use client'

import 'swiper/scss'
import 'swiper/scss/free-mode'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import 'swiper/scss/grid'

import { type FC, type ReactNode, useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, type Swiper as SwiperType } from 'swiper'
import classNames from 'classnames'
import Link from 'next/link'
import type { KvOverlay, KvSlide, KvSlideContent } from '~types/slider'
import MediaComponent from './MediaComponent'
import AliImage from './AlImage'
import { combineUrl, divideByElement, mapLines } from '../utils/helper'
import { trackEvent } from '@utils/tracking'
import { useSelector } from 'lib/redux'

import styles from '../styles/components/kv-slider.module.scss'

type KvSliderProperties = {
  children?: ReactNode
  className?: string
  name?: string
  slides: KvSlide[]
  prefix?: string
  promo?: string
  size?: 'home'
  onPromoClick?: VoidFunction
  onFirstImageLoad?: VoidFunction
  onScrollStateChange?: (disabled: boolean) => void
  onHasKvOverlay?: (has: boolean) => void
  onDisable?: VoidFunction
}

const KvSlider: FC<KvSliderProperties> = ({ children, className, name = '', promo, size, slides, prefix, onPromoClick, onFirstImageLoad, onHasKvOverlay, onScrollStateChange }) => {
  const navPrevEl = useRef<HTMLDivElement>(null!)
  const navNextEl = useRef<HTMLDivElement>(null!)
  const paginationEl = useRef<HTMLDivElement>(null!)
  const progressEl = useRef<HTMLDivElement>(null!)
  const [prosShow, setPros] = useState(false)
  const [videoShow, setVideoShow] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const [videoSrcMob, setVideoSrcMob] = useState('')
  // const [hasOverlay, setHasOverlay] = useState(false)
  const [overlayShow, setOverlayShow] = useState(false)
  const [promoShow, setPromoShow] = useState(false)
  // const promoTimer = useRef<NodeJS.Timeout>()

  const { isMobile, isInitialMobile } = useSelector(state => state.global)

  const swiper = useRef<SwiperType>()

  useEffect(() => {
    const res = slides.some(item => item.action?.some(a => !!a.overlay))
    // setHasOverlay(res)
    onHasKvOverlay?.(res)
  }, [onHasKvOverlay, slides])

  useEffect(() => {
    return () => {
      setVideoShow(false)
    }
  }, [slides])

  // TODO: 禁用自动打开促销弹层
  // useEffect(() => {
  //   clearTimeout(promoTimer.current)

  //   if (hasOverlay) {
  //     promoTimer.current = setTimeout(() => {
  //       // onScrollStateChange?.(true)
  //       setOverlayShow(true)
  //     }, 800)
  //   }
  //   return () => {
  //     clearTimeout(promoTimer.current)
  //   }
  // }, [hasOverlay])

  function triggerMzClick(name: string) {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-一级页面-${name}`)
    }
  }

  const renderContent = useCallback((data: KvSlideContent, prefix?: string) => {
    if (!data) {
      return null
    }

    if (data.url) {
      return <figure style={{
        width: data.width && (isMobile ? `${(data.width * 1.04) / 750 * 100}vw` : `${data.width / 1920 * 100}vw`),
      }}><AliImage alt={data.alt || name} src={combineUrl(prefix, data.url)} width={data.width} height={data.height} /></figure>
    }
    
    return (
      <>
        {data.subTitle && <strong>{data.subTitle}</strong>}
        {data.title && (
          <h2>
            {typeof data.title === 'string' ? divideByElement(data.title) :
              <>
                <span>{divideByElement(data.title.text)}</span>
                <div className={styles.icon} style={{
                  width: isMobile ? `${(data.title.width * 1.04) / 750 * 100}vw` : `${data.title.width / 1920 * 100}vw`
                }}><AliImage alt={data.title.alt || 'icon'} src={combineUrl(prefix, data.title.icon)} width={data.title.width} height={data.title.height} /></div>
              </>}
          </h2>
        )}
        {data.content && !Array.isArray(data.extra) && <div className={styles.desc}>{mapLines(data.content, 'small')}</div>}
        {Array.isArray(data.extra) && (
          <div className={styles.extra}>
            {data.extra.map((item, index) => (
              <div key={index} className={styles.item}>
                <h4>{item.title}</h4>
                <p>{divideByElement(item.content)}</p>
              </div>
            ))}
          </div>
        )}
      </>
    )
  }, [isMobile, name])

  // const onBeforeInit = (swiper: SwiperType) => {
  //   if (swiper.params.navigation) {
  //     if (typeof swiper.params.navigation !== 'boolean') {
  //       const { navigation } = swiper.params;
  //       navigation.prevEl = navPrevEl.current;
  //       navigation.nextEl = navNextEl.current;
  //     }
  //     if (typeof swiper.params.pagination !== 'boolean') {
  //       swiper.params.pagination.el = paginationEl.current;
  //     }
  //   }
  //   setPros(true)
  // }

  const PromoMoreOverlay = () => {
    if (promo) {
      return (
        <div className={styles.promoOverlay}>
          <a className={styles.close} onClick={() => {
            setPromoShow(false)
            onScrollStateChange?.(false)
            triggerMzClick('查看权益详情浮层-关闭')
          }}><i className="icon-close"></i></a>
          <div className={styles.container} dangerouslySetInnerHTML={{ __html: promo }} />
        </div>
      )
    }
    return null
  }
  const oneSlideOnly = slides.length === 1

  const data = useMemo(() => slides.map(item => {
    const { text, ...rest } = item
    const IMG_PC = item.media.find(m => m.device === 'pc')?.url
    const IMG_MOB = item.media.find(m => m.device === 'mob')?.url
    const TEXT_PC = Array.isArray(text) && text.find(m => m?.device === 'pc')
    const TEXT_MOB = Array.isArray(text) && text.find(m => m?.device === 'mob')
    const TEXT_ALL = !TEXT_PC && !TEXT_MOB ? (Array.isArray(text) ? (text.length === 1 ? text[0] : null) : (text || null)) : null
    return {
      ...rest,
      textMode: ((TEXT_PC && TEXT_MOB) || TEXT_ALL ? true : TEXT_PC ? 'pc' : TEXT_MOB ? 'mob' : false) as boolean | 'pc' | 'mob',
      pc: {
        img: IMG_PC,
        text: TEXT_PC || TEXT_ALL,
      },
      mob: {
        img: IMG_MOB,
        text: TEXT_MOB || TEXT_ALL,
      }
    }
  }), [slides])

  return (<>
    <Swiper
      className={classNames(styles.main, className, {
        [styles.home]: size,
        [styles.slides]: !oneSlideOnly,
      })}
      modules={[Autoplay, Navigation, Pagination]}
      pagination={{
        type: 'fraction',
        el: paginationEl.current
      }}
      navigation={{
        nextEl: navNextEl.current,
        prevEl: navPrevEl.current,
      }}
      autoplay={oneSlideOnly ? false : {
        delay: 5000,
        disableOnInteraction: false
      }}
      threshold={15}
      loop={!oneSlideOnly}
      // onBeforeInit={onBeforeInit}
      onTransitionStart={() => {
        setPros(false)
      }}
      onTransitionEnd={() => {
        if (swiper.current?.autoplay?.running) {
          setPros(true)
        }
      }}
      onAutoplayStop={() => {
        setPros(false)
      }}
      onAutoplayStart={() => {
        setPros(true)
      }}
      onTouchMove={() => {
        setPros(false)
      }}
      onSwiper={s => swiper.current = s}
    >
      {data.map((item, index) => {
        const IMG_PC = item.pc.img
        const IMG_MOB = item.mob.img

        let text: KvSlideContent | null
        switch (item.textMode) {
          case 'mob':
            text = isMobile ? item.mob.text : null
            break
          case 'pc':
            text = isMobile ? null : item.pc.text
            break
          case true:
            text = isMobile ? item.mob.text : item.pc.text
            break
          default:
            text = null
            break
        }
        const theme = text?.theme

        let kvOverlay: KvOverlay | undefined
        if (IMG_MOB || IMG_PC) {
          return (
            ((item.mobile && isInitialMobile) || !item.mobile) && <SwiperSlide className={classNames(styles.wrap, {
              [styles['theme-light']]: theme === 'light' || theme === 'shadow',
              [styles['theme-shadow']]: theme === 'shadow',
            })} key={index}>
              <MediaComponent media={item.media} title={item.name} prefix={prefix} onLoad={onFirstImageLoad} />
              {/* <Image src={item.src} alt="GL8 CENTURY" layout="fill" /> */}
              {text && (
                <div className={classNames(styles.content, {
                  [styles['content-right']]: text.right === true,
                  [styles['content-center']]: text.center,
                })} style={{
                  top: text.top,
                  right: typeof text.right !== 'boolean' ? text.right : undefined,
                  bottom: text.bottom,
                  left: text.left,
                }}>
                  {renderContent(text, prefix)}
                  {item.action && (
                    <div className={styles.action}>
                      {item.action.map((act, idx) => {
                        if ((act.device === 'mob' && !isMobile) || (act.device === 'pc' && isMobile)) {
                          return null
                        }
                        if (act.promo) {
                          return <div key={idx} className="btn" onClick={()=>{
                            onPromoClick && onPromoClick()
                            triggerMzClick(act.text || '购车礼遇')
                          }}>{act.text || '购车礼遇'}</div>
                        } else if (act.text){
                          if (act.overlay) {
                            kvOverlay = act.overlay
                            kvOverlay.label = act.text
                            return <div key={idx} className="btn" onClick={()=>{
                              setOverlayShow(true)
                              swiper.current && swiper.current.autoplay.stop()
                              act.text && triggerMzClick(act.text)
                            }}>{act.text}</div>
                          } else if (act.link) {
                            const external = /^https?:/.test(act.link)
                            const isVideo = /\.mp4$/.test(act.link)
                            if (isVideo) {
                              return <div key={idx} className={classNames('btn', {
                                'btn-outline': act.theme !== 'solid',
                                'btn-light': theme === 'light',
                                'btn-dark': theme !== 'light',
                              })} onClick={()=>{
                                setVideoShow(true)
                                act.link && setVideoSrc(act.link)
                                act.link_m && setVideoSrcMob(act.link_m)
                                act.text && triggerMzClick(act.text)
                              }}>{act.text}</div>
                            } else if (external) {
                              return <a key={idx} href={act.link} className={classNames('btn', {
                                'btn-outline': act.theme !== 'solid',
                                'btn-light': theme === 'light',
                                'btn-dark': theme !== 'light',
                              })} target="_blank" rel="noreferrer">{act.text}</a>
                            } else {
                              return <Link key={idx} href={act.link} className={classNames('btn', {
                                'btn-outline': act.theme !== 'solid',
                                'btn-light': theme === 'light',
                                'btn-dark': theme !== 'light',
                              })}>{act.text}</Link>
                            }
                          }
                        }
                      })}
                    </div>
                  )}
                </div>
              )}
              {!item.hideInfo && children && <div className={classNames({
                'theme-light': theme
              })}>{children}</div>}
              {kvOverlay && <div className={classNames(styles.overlay, {
                [styles.show]: overlayShow,
                'animate__animated': overlayShow,
                'animate__flipInX': overlayShow,
                // 'animate__fast': overlayShow,
              })}>
                <div className={styles.container}>
                  <a className={classNames(styles.close, {
                    [styles.light]: kvOverlay.theme === 'light',
                  })} onClick={() => {
                    setOverlayShow(false)
                    onScrollStateChange?.(false)
                    swiper.current && swiper.current.autoplay.start()
                    triggerMzClick('活动浮层-关闭')
                  }}><i className="icon-close"></i></a>
                  {kvOverlay.media.map((ol, idx) => (<div key={idx} className={classNames(ol.device, styles.figure)}><AliImage alt={ol.alt || kvOverlay?.label || '弹层内容'} src={combineUrl(prefix, ol.url)} width={ol.width} height={ol.height} /></div>))}
                  {kvOverlay.remark && <div className={styles.footer} style={{
                    backgroundColor: kvOverlay.remarkBg,
                  }}>{divideByElement(kvOverlay.remark)}</div>}
                  {promo && <div className={styles['promo-more']}><button onClick={() => {
                    setPromoShow(!promoShow)
                    onScrollStateChange?.(true)
                    triggerMzClick('查看权益详情浮层-打开')
                  }}>查看权益详情</button></div>}
                </div>
              </div>}
              <div className={classNames(styles['hint-tx'], {
                [styles['hint-tx-left']]: typeof item.remark !== 'string' && item.remark?.align === 'left',
              })}>
                {(item.remark ?? item.tips) && <p>{divideByElement((typeof item.remark !== 'string' ? item.remark?.text : item.remark) ?? item.tips)}</p>}
              </div> 
            </SwiperSlide>
          )
        }
        return null
      })}
      {
        videoShow && <div className={styles.video}>
          <div className={classNames(styles.close,'icon-close','icon-close-light')} onClick={()=>{
            setVideoShow(false);
            triggerMzClick('KV视频-关闭')
          }}></div>
          
          <video playsInline controls webkit-playsinline="true" x5-video-player-type="h5" autoPlay loop={true} src={isMobile ? videoSrcMob ? videoSrcMob && combineUrl(prefix, videoSrcMob):videoSrc && combineUrl(prefix, videoSrc):videoSrc && combineUrl(prefix, videoSrc)} ></video>
        </div>
      }

      {oneSlideOnly || <div slot="container-end" className={classNames('swiper-pagination', styles['swiper-pagination-custom'])}>
        <div className={styles['swiper-pagination-wrapper']}>
          <div className={styles['swiper-pagination-number']} ref={paginationEl} />
          <div className={styles['swiper-pagination-progress']} ref={progressEl}>
            <div className={classNames(styles['swiper-pagination-progress-line'], {
              [styles['progress-ani']]: prosShow
            })}></div>
          </div>
          <div className={styles['swiper-button']}>
            <div className={styles['swiper-custom-button-prev']} ref={navPrevEl} />
            <div className={styles['swiper-custom-button-next']} ref={navNextEl} />
          </div>
        </div>
      </div>}
    </Swiper>
    {
      promoShow && PromoMoreOverlay()
    }
    </>
  )
}

export default KvSlider
