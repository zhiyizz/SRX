'use client'

import { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import classNames from 'classnames'
import styles from '@styles/electra.module.scss'
import type { NextPage } from 'next'
import type { featuresType, subkvType,mediaType} from '~types/electra'
import { trackPv, trackEvent } from '@utils/tracking'
import KvSlider from '@components/KvSlider'
import MediaComponent from '@components/MediaComponent'
import KvInfo from '@components/KvInfo'
import AvenirIntro from '@components/features/AvenirIntro'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ElectraOverlay from '@components/features/ElectraOverlay'
import { combineUrl, divideByElement, formatPrice } from '@utils/helper'
import SeriesNavigation, { type OverlayModule } from '@components/SeriesNavigation'
import type { SeriesPageProperties, GalleryList } from '~types/series'
import MediaViewer from '@components/MediaViewer'
import { useSelector } from 'lib/redux'
gsap.registerPlugin(ScrollTrigger)

const ElectraPage: NextPage<SeriesPageProperties> = ({promo, code, data, series, prefix, defaultOverlay, draftMode, onPromoClick, onScrollStateChange, onHasKvOverlay }) => {
  const [backTop, setBackTop] = useState(false)
  const [fbiHideNav, setFbiHideNav] = useState(false)
  const [overlayShow, setOverlayShow] = useState<boolean>();
  const [overlayData, setOverlayData] = useState<featuresType>()
  const [overlayCurrentData, setOverlayCurrentData] = useState<subkvType>()
  // const [isBdMini, setIsbdMini] = useState(false)
  const [fbiSubNavActive, setFbiSubNavActive] = useState<number>(0)
  const fbiSubNavRef = useRef<HTMLDivElement>(null!)
  const [currentNav, setCurrentNav] = useState<OverlayModule>()
  const [kvload, setKvload] = useState<boolean>(false);
  const [introEnd, setIntroEnd] = useState<boolean>(false)
  const [isWeChat, setisWechat] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState(false)
  const [galleryList, setGalelryList] = useState<GalleryList>()
  const [lock, setLock] = useState(false)
  const [videoShow,setVideoShow] = useState<boolean>(false)
  const [videoData, setVideoData] = useState<mediaType[]>();

  const isMobile = useSelector(state => state.global.isMobile)

  useEffect(() => {
    onScrollStateChange?.(lock)
  }, [lock, onScrollStateChange])

  useEffect(() => {
    let introTimeLine: gsap.core.Timeline
    if(introEnd){
    
      const intro = document.getElementsByClassName(styles.intro);

      if(intro.length > 0){
        introTimeLine = gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: 'center bottom-=20vh',
            toggleActions: "play none none reverse"
          }
        })
        introTimeLine
          .to(document.getElementsByClassName(styles['intro-title']), {
            startAt: { y: -180 },
            y: 0,
            opacity: 1
          })
          .to(document.getElementsByClassName(styles['intro-tx']), {
            startAt: { y: 180 },
            y: 0,
            opacity: 1
          }, '-=0.5')
          .to(document.getElementsByClassName(styles['intro-content']), {
            // background: 'rgba(0,0,0,0.4)'
          }, '-=0.3')
      }
      return () => {
        introTimeLine.kill()
        // This in case a scroll animation is active while the route is updated
        gsap.killTweensOf(window);
      }
    }
  },[introEnd])
  const handleScrollTop = useCallback(() => {
    if (!backTop) {
      setBackTop(true)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100);
      setTimeout(setBackTop, 3000, false)
    }
  }, [backTop])

  const showOverlay = useCallback((overlay?: OverlayModule) => {
    if (window.scrollY < window.innerHeight) {
      window.scrollTo({
        top: window.innerHeight,
      })
    }
    if (overlay) {
      setCurrentNav(overlay)
    }
  }, [])

  useEffect(() => {
    if (defaultOverlay) {
      showOverlay(defaultOverlay)
    }
  }, [defaultOverlay, showOverlay])
  // useLayoutEffect(() => {


  // }, [code])
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray('.aniItem') as HTMLElement[]
    let scrollTarget;
   
    if(sections.length){
      sections.forEach((item, i) => {
        const copy = item.querySelector('.ani');
        const specs = item.querySelector('.specs');
        const btn = item.querySelector('.more');
        (copy || specs) && gsap.set([copy, specs], { opacity: 0, y: 100 })
        btn && gsap.set(btn, { opacity: 0, y: 0 });
          
        scrollTarget = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: i === 1 ? 'top 60%' : 'top 40%',
            end: () => '+=' + (i === 1 ? window.innerHeight * 0.6 : window.innerHeight * 0.4),
            scrub: 1,
  
          }
        }).to(copy, { opacity: 1, y: 0, duration: 1})
        btn && scrollTarget.to(btn, { opacity: 1, y: 0, duration: 1 },)
        specs && scrollTarget.to(specs, { opacity: 1, y: 0, duration: 3, delay: 3 })
  
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
      // This in case a scroll animation is active while the route is updated
      gsap.killTweensOf(window);
    }
  }, [data])

  useLayoutEffect(() => {
    if(!fbiSubNavRef.current) return;
    const links = gsap.utils.toArray('div', fbiSubNavRef.current) as HTMLDivElement[];
    let trackName = false;
    const linkArray: globalThis.ScrollTrigger[] = [];
     links.forEach((res, index) => {
      if (!kvload) return;
      const element = gsap.utils.toArray('.navmap')[index] as HTMLElement;
      const linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        onLeave: () => {
          index === links.length - 1 && setFbiHideNav(false);
        },
        onEnter: () => {
          (index === 0) && setFbiHideNav(true)
        },
        onLeaveBack: () => {
          (index === 0) && setFbiHideNav(false)
        },
        onEnterBack: () => {
          index === links.length - 1 && setFbiHideNav(true);
        },
        onToggle: self => {
          self.isActive && setFbiSubNavActive(index)
          self.isActive && trackPv(`车型页-${code}-${data.electra?.fbinav[index]}`)
        },
        onUpdate: (self) => {
          const progress = Number(self.progress.toFixed(2)) * 100;
          if (trackName && progress > 1 && progress < 100) {
            trackName = false
          }
          if (progress === 100 || progress <= 0) {
            trackName = true;
          }
        }
      });
      linkArray.push(linkST)
      let target = false;
      res.addEventListener("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        target = true;
        setTimeout(() => {
          //let y = index === 0 ? window.outerHeight : linkST.start
          const y = target ? index === links.length - 1 ? linkST.start : linkST.start : linkST.start;
          window.scrollTo(0, y)
          setFbiSubNavActive(index)
        }, 100);

      });
    });
    return () => {
      linkArray.map(item => {
        item.kill()
      })
    }
  }, [kvload,code,data])

  useEffect(() => {
    const ua = navigator.userAgent;
    const android = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //安卓终端
    const isWeixin = ua.toLowerCase().indexOf('micromessenger') != -1;
    const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    android ? setIsAndroid(true) : setIsAndroid(false);
    isMobile && isIos && isWeixin && setisWechat(true)
  }, [isMobile])

  

  if (!data.electra) return null
  return (
    <div className={styles[series.code]}>
      <KvSlider className={classNames(styles.kv, 'kvTrigger')} promo={promo!} slides={data.kv} prefix={prefix} onPromoClick={onPromoClick} onFirstImageLoad={() => {
        console.log('ScrollTrigger refresh')
        //  ScrollTrigger.normalizeScroll(true)
        setKvload(true)
        ScrollTrigger.refresh()
      }} onHasKvOverlay={onHasKvOverlay}>
        {data.info && <KvInfo name={'别克ELECTRA E5'} data={data.info} />}
      </KvSlider>
      {series && <SeriesNavigation
        name={series.name}
        code={code}
        viewer={data.show}
        currentOverlay={currentNav}
        specs={data.specs}
        vehiclePic={series.pic}
        displayName={series.displayName}
        flags={series.flags}
        onTop={handleScrollTop}
        prefix={prefix}
        gallery={data.gallery}
        draftMode={draftMode}
        onGalleryShow={(list) => {
          setGalelryList(list)
          setShowGallery(true)
        }}
        lockPageFn={setLock}
        onMenuClick={showOverlay}
      />}
      <div className={styles.electra_e5_avenir} >
        {data.electra.electra_avenir && <AvenirIntro intro={data.electra.electra_avenir.intro} className={'electra_e5_avenir'} fillColor={data.electra.electra_avenir.maskColor} maskColor={data.electra.electra_avenir.maskColor} prefix={prefix} onIntroEnd={setIntroEnd} />}
      </div>
      {data.electra.features.map((item, idx) => {
        return <div className="navmap" key={'navmap' + idx}>
          {item.subkv.map((kvitem, kvidx) => {
            return kvitem.slide ?
              <div className={classNames(styles.section, 'aniItem',{
                [styles[kvitem.classname!]]: kvitem.classname
              })} key={'item1' + kvidx}>
                <SwiperList slide={kvitem} code={code} overlayData={item} prefix={prefix} setOverlayShow={setOverlayShow} setOverlayData={setOverlayData} />
                <div className={styles.info}>
                  <div className={classNames('ani', styles.copy, {
                    [styles.bottom]: kvitem.pos
                  })}>
                    <h3 className={styles.title}>{divideByElement(kvitem.title)}</h3>
                    <p>{divideByElement(kvitem.content)}</p>
                    {kvitem.overlay && (
                      <div className={classNames(styles.moreBtn, 'more')} onClick={() => {
                        setOverlayShow(true)
                        setOverlayData(item)
                        setOverlayCurrentData(kvitem);
                      }}>
                        查看更多
                      </div>
                    )}
                     {kvitem.videoOverlay && (
                        <div className={classNames(styles.moreBtn, 'more')} onClick={() => {
                          setVideoShow(true)
                          setVideoData(kvitem.videoOverlay)
                        }}>
                          点击查看视频
                        </div>
                       )}
                  </div>
                  {kvitem.specs && (
                    <div className={classNames(styles.specs, 'specs')}>
                      {kvitem.specs?.map((spec, spidx) => {
                        return (
                          <div className={styles.item} key={'spec' + spidx}>
                            <span>{spec.title}</span>
                            <h4>{formatPrice(spec.num)}<sub>{spec.unit}</sub></h4>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                <p className={styles.declaration}>{kvitem.declaration}</p>
              </div>
              :
              kvitem.intro ?
                <div className={classNames(styles.section, styles.intro,{
                  [styles[kvitem.classname!]]: kvitem.classname
                })} key={'item' + kvidx}>
                  <div className={styles['intro-content']}>
                    <div className={styles['intro-title']}>
                      <span>{divideByElement(kvitem.en!)}</span>
                      <h2>{divideByElement(kvitem.title)}</h2>
                    </div>
                    <div className={styles['intro-tx']}>{divideByElement(kvitem.content)}</div>
                  </div>
                </div>
                :
                <div className={classNames(styles.section, 'aniItem',{
                  [styles[kvitem.classname!]]: kvitem.classname
                })} key={'item' + kvidx}>
                  {kvitem.type === 'video' ?
                    <>
                      {typeof isMobile === 'boolean' && <video src={combineUrl(prefix, isMobile ? `${kvitem.media![1].url}.mp4` : `${kvitem.media![0].url}.mp4`)} poster={isMobile ? isWeChat && !isAndroid ? combineUrl(prefix, `${kvitem.media![1].url}.mp4`) :  combineUrl(prefix, `${kvitem.media![1].url}.webp`) : undefined} playsInline muted autoPlay loop></video>}
                    </>
                    : (
                      <MediaComponent media={kvitem.media!} prefix={prefix} />
                    )
                  }
                  {/* {kvitem.media && <MediaComponent media={kvitem.media} prefix={prefix} />} */}
                  <div className={styles.info}>
                    <div className={classNames('ani', styles.copy, {
                      [styles.bottom]: kvitem.pos,
                      // [styles[kvitem.classname!]]: kvitem.classname
                    })}>
                      <h3 className={styles.title}>{divideByElement(kvitem.title)}</h3>
                      <p>{divideByElement(kvitem.content)}</p>
                      {kvitem.overlay && (
                        <div className={classNames(styles.moreBtn, 'more')} onClick={() => {
                          setOverlayShow(true)
                          setOverlayData(item)
                          setOverlayCurrentData(kvitem);
                        }}>
                          查看更多
                        </div>
                      )}
                       {kvitem.videoOverlay && (
                        <div className={classNames(styles.moreBtn, 'more')} onClick={() => {
                          setVideoShow(true)
                          setVideoData(kvitem.videoOverlay)
                        }}>
                          点击查看视频
                        </div>
                       )}
                    </div>
                    {kvitem.specs && (
                      <div className={classNames(styles.specs, 'specs')}>
                        {kvitem.specs?.map((spec, spidx) => {
                          return (
                            <div className={styles.item} key={'spec' + spidx}>
                              <span>{spec.title}</span>
                              <h4>{formatPrice(spec.num)}<sub>{spec.unit}</sub></h4>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <p className={styles.declaration}>{kvitem.declaration}</p>
                </div>
          })
          }
        </div>
      })}
      <div className={classNames(styles.section, styles.ultium, 'aniItem', 'navmap')}>
        <MediaComponent media={data.electra.ultium.media} prefix={prefix} />
        <div className={styles.info}>
          <div className={classNames(styles.copy, 'ani')}>
            <h3 className={styles.title}>{data.electra.ultium.title}</h3>
            <div className={classNames(styles.moreBtn, 'more')}>
              <a href={'/technology/ultium'} target='_blank' rel="noreferrer">
                点击查看详情
              </a>
              <div className={classNames(styles.specs, 'specs')}></div>
            </div>
          </div>
        </div>
      </div>
      {data.electra.preview && <>
        {
          data.electra.preview.map((item,index) => {
            return (
              <div className={classNames(styles.section, styles.preview, 'aniItem', 'navmap')} key={index}>
                <MediaComponent media={item.media} prefix={prefix} />
                <div className={styles.info}>
                <div className={classNames(styles.copy, 'ani')}>
                  <h3 className={styles.title}>{divideByElement(item.title)}</h3>
                  <p>{divideByElement(item.content)}</p>
                </div>
              </div>
              </div>
            )
          })
        }
      </>}

      <div className={classNames(styles['fbi-subnav'], {
        [styles.show]: fbiHideNav
      })} ref={fbiSubNavRef}>
        {data.electra.fbinav.map((res, index) => (
          <div key={index} className={classNames(styles.item, {
            [styles.active]: fbiSubNavActive === index
          })}
            onClick={() => {
              trackEvent(`车型页-${code}-一级页面-${res}`)
            }}>
            <span>{res}</span>
          </div>
        )
        )}
      </div>
      <ElectraOverlay data={overlayCurrentData?.detail || overlayData?.detail} category={overlayData?.category} code={code} overlay={overlayShow!} prefix={prefix} setOverlayShow={setOverlayShow} />
      {galleryList && series && <MediaViewer show={showGallery} prefix={prefix} index={galleryList.index} images={galleryList.list} onClose={() => setShowGallery(false)} />}
      {videoShow && videoData && <VideoOverlay data={videoData} isMobile={isMobile} code={code} prefix={prefix} setVideoShow={setVideoShow} />}
    </div>
  )
}

const SwiperList = ({
  slide: kvitem,
  overlayData,
  prefix,
  setOverlayShow,
  setOverlayData
}: {
  slide: subkvType
  code: string
  overlayData: featuresType
  prefix?: string
  setOverlayShow: (show: boolean) => void
  setOverlayData: (data: featuresType) => void
}) => {
  const navPrevEl = useRef<HTMLDivElement>(null)
  const navNextEl = useRef<HTMLDivElement>(null)
  const paginationEl = useRef<HTMLDivElement>(null)
  const progressEl = useRef<HTMLDivElement>(null)
  const [prosShow, setPros] = useState(false)
  const [curnum, setCur] = useState<number>()
  return (
    <>
      {kvitem && (
        <>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={{
              type: 'fraction',
              el: paginationEl.current
            }}
            navigation={{
              nextEl: navNextEl.current,
              prevEl: navPrevEl.current,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}
            loop
            // onBeforeInit={onBeforeInit}
            onTransitionStart={() => {
              setPros(false)
            }}
            onTransitionEnd={(e) => {
              setCur(e.realIndex)
              setPros(true)
            }}
          >
            {kvitem.media?.map((slide, idx2: number) => {
              return (
                <SwiperSlide key={idx2} className="aniItem">
                  <MediaComponent media={slide} prefix={prefix} />
                  {Array.isArray(slide) && slide[0].title && (
                    <div className={styles.info}>
                      <div className={classNames("ani", styles.copy, {
                        [styles.bottom]: kvitem.pos,
                      })}>
                        <h3 className={styles.title}>{divideByElement(slide[idx2].title)}</h3>
                        <p>{divideByElement(slide[idx2].content)}</p>
                        {slide[idx2].overlay && (
                          <div className={classNames(styles.moreBtn)} onClick={() => {
                            setOverlayShow(true)
                            setOverlayData(overlayData)
                          }}>
                            查看更多
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              )
            })}
            {<div slot="container-end" className={classNames('swiper-pagination', styles['swiper-pagination-custom'])}>
              <div className={styles['swiper-pagination-wrapper']}>
                <div className={styles['swiper-pagination-number']} ref={paginationEl}>
                  <span className={styles['swiper-pagination-current']}>{(curnum! + 1).toString()}</span>
                  /
                  <span className={styles['swiper-pagination-total']}>{kvitem.media?.length}</span>
                </div>
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
        </>
      )}
    </>
  )
}
// declare const window: Window & { WeixinJSBridge: any }
const VideoOverlay = ({data, isMobile, prefix, setVideoShow}: {
  data: mediaType[]
  isMobile?: boolean
  code: string
  prefix?: string
  setVideoShow: (arg:boolean) => void
}) => {
  const [show,setShow] = useState(Boolean)
  //const videoEl =  useRef<HTMLVideoElement>(null!)
  useEffect(() => {
    if(data){
      setTimeout(() => {
        setShow(true)
      }, 200)
    }
  }, [data])

  //  const autoplay = () => {
  //   videoEl &&
  //     videoEl.current &&
  //     videoEl.current.play().catch((error: any) => {
  //       console.log("Error attempting to play" + error);
  //     });
  // }
  // if (typeof window.WeixinJSBridge === "undefined") {
  //   //未执行WeixinJSBridge 开始监听 WeixinJSBridge
  //   document.addEventListener('WeixinJSBridgeReady', () => {
  //     autoplay();
  //   }, false);
  // } else {
  //   //已经执行 使用 getNetworkType 调用获取网络类型后执行
  //   window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
  //     autoplay();
  //   });
  // }

  return (
    <div className={classNames(styles.videoOverlay,{
      [styles.open]:show
    })}>
      <div className={styles.close} onClick={() => {
        setShow(false)
        setTimeout(() => {
          setVideoShow(false)
        }, 500)
      }}></div>
      <video playsInline controls webkit-playsinline="true" x5-video-player-type="h5" autoPlay loop={true} src={combineUrl(prefix, isMobile ? `${data[1].url}` : `${data[0].url}`)} ></video>
    </div>
  )
}


export default ElectraPage;
