'use client'

import React, { useRef, Fragment } from 'react';
import SeriesNavigation, { type OverlayModule } from '@components/SeriesNavigation'
import type { SeriesPageProperties } from '~types/series'
import KvSlider from '@components/KvSlider'
import classNames from 'classnames'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'
import dynamic from 'next/dynamic'

// import dataJson from './data.json';
import styles from '@styles/components/velite-common.module.scss'
import { type FC, useEffect, useState } from 'react'
import VeliteKv from '@components/features/VeliteKv'
// import VeliteFullPage from '@components/features/VeliteFullPage'
// import VeliteDiffer from '@components/features/VeliteDiffer'
// import VeliteEngine from '@components/features/VeliteEngine'
// import VeliteList from '@components/features/VeliteList'
// import VeliteSlider from '@components/features/VeliteSlider'
// import VeliteApp from '@components/features/VeliteApp'
import KvInfo from '@components/KvInfo'
import SvgIcon from '@components/icons'
import { trackPv } from '@utils/tracking'

const VeliteFullPage = dynamic(() => import('../../features/VeliteFullPage'), {
  loading: () => <p>正在加载...</p>,
})
const VeliteDiffer = dynamic(() => import('../../features/VeliteDiffer'), {
  loading: () => <p>正在加载...</p>,
})
const VeliteEngine = dynamic(() => import('../../features/VeliteEngine'), {
  loading: () => <p>正在加载...</p>,
})
const VeliteList = dynamic(() => import('../../features/VeliteList'), {
  loading: () => <p>正在加载...</p>,
})
const VeliteSlider = dynamic(() => import('../../features/VeliteSlider'), {
  loading: () => <p>正在加载...</p>,
})
// const VeliteApp = dynamic(() => import('../../features/VeliteApp'), {
//   loading: () => <p>正在加载...</p>,
// })

// import SubKv from './SubKv'
// import DrivingPc from './DrivingPc';
// import HorziontalItem from './HorizontalItem';
// import FullFbi from './FullFbi';
// import FbiItem from './FbiItem';
// import ImgComparison from './ImgComparison';
// import IbuickApp from './IbuickApp';
// import VeliteEngine from './VeliteEngine';

const VelitePage: FC<SeriesPageProperties> = ({ code, name, data, series, prefix, defaultOverlay, onPromoClick, onTop, onGalleryShow ,onScrollStateChange, onHasKvOverlay}) => {
  const [currentNav, setCurrentNav] = useState<OverlayModule>()
  const [lock, setLock] = useState(false)
  // const [hideNav, setHideNav] = useState(false)
  // const [fbiSubNavActive, setFbiSubNavActive] = useState<number>(0)
  const [fbiHideNav, setFbiHideNav] = useState<boolean>(false)
  const fbiSubNavRef = useRef<HTMLDivElement>(null!)
  const [kvload,setKvload] = useState<boolean>(false);
  function showOverlay(overlay?: OverlayModule) {
    if (window.scrollY < window.innerHeight) {
      window.scrollTo(0, window.innerHeight)
    }
    if (overlay) {
      setCurrentNav(overlay)
    }
    // setHideNav(true)
    setCurrentNav(overlay)
  }
  useEffect(() => {
    trackPv(`车型页-${name}-首页`)
  }, [name])
  useEffect(() => {
    onScrollStateChange?.(lock)
  }, [lock, onScrollStateChange])

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
      // This in case a scroll animation is active while the route is updated
      gsap.killTweensOf(window);
    };
  }, [])
  useEffect(() => {
    if (defaultOverlay) {
      showOverlay(defaultOverlay)
    }
  }, [defaultOverlay])
  
  useEffect(() => {
    if(!fbiSubNavRef.current) return;
    const links = gsap.utils.toArray('div', fbiSubNavRef.current) as HTMLDivElement[];
    let trackName = false;
    const linkArray: globalThis.ScrollTrigger[] = [];
    links.forEach((res, index) => {
      if(!kvload) return;
      const element = gsap.utils.toArray('.section' + index)[0] as HTMLElement;
      const linkST = ScrollTrigger.create({
        trigger: element,
       // start: slideMenuÇlick ? index === links.length-1  ? "top top":"top -150%":"top top",
        start: "top top",
        end: "bottom bottom",
        onLeave:() => {
          index === links.length -1 &&  setFbiHideNav(false);
        },
        onEnter:() => {
          (index === 0) && setFbiHideNav(true)
        },
        onLeaveBack:() => {
          (index === 0) && setFbiHideNav(false)
        },
        onEnterBack: () => {
          index === links.length -1 &&  setFbiHideNav(true);
        },
        // onToggle: (self) => { 
        //   self.isActive && setFbiSubNavActive(index)
        // },
        onUpdate: (self) => {
          const progress = Number(self.progress.toFixed(2)) * 100;
          // index === 0 && progress === 0  &&  setFbiHideNav(false)
          // index === 0 && progress >= 1  &&  setFbiHideNav(true)
          if (trackName && progress > 1 && progress < 100) {
            trackName = false
            // trackPv(`车型页-${pageName}-${fbiData[0].name}`)
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
          const y =  target ? index === links.length -1? linkST.start : linkST.start + (window.innerHeight*1.8):linkST.start;
          window.scrollTo(0, y)
          // setFbiSubNavActive(index)
        }, 100);
        
      });
    });
    return () => {
      linkArray.map(item => {
        item.kill()
      })
    }
  }, [kvload])


  if (!data.velite) return null

  const IMG_PREFIX = prefix

  return (
    <>
      {/* <script src="https://player.youku.com/jsapi" async></script> */}
      {/* <Script strategy="beforeInteractive"   src="/js/jsapi.js"></Script> */}
      <div className={styles['kv-wrapper']}>
        <KvSlider className={classNames(styles.kv, 'kvTrigger')} slides={data.kv} prefix={IMG_PREFIX} onPromoClick={onPromoClick} onFirstImageLoad={() => {
          console.log('ScrollTrigger refresh')
          //  ScrollTrigger.normalizeScroll(true)
          setKvload(true)
          ScrollTrigger.refresh()
        }} onHasKvOverlay={onHasKvOverlay}>
          {data.info && <KvInfo data={data.info} name={series.name} price={series.price} />}
        </KvSlider>
        <div className={styles['scroll-hint']}><SvgIcon icon="angle-up" /></div>
      </div>
      <SeriesNavigation name={series.name} code={code} currentOverlay={currentNav}
        viewer={data.show} specs={data.specs} vehiclePic={series.pic} displayName={series.displayName}
        flags={series.flags} gallery={data.gallery}
        prefix={IMG_PREFIX} tutorial={data.tutorial}
        onTop={onTop} onGalleryShow={onGalleryShow} onMenuClick={() => {
          showOverlay()
        }}
        className={classNames(!fbiHideNav?styles.hideNav:null)}
        lockPageFn={setLock}
      />
      <div className={classNames(styles.main)}>
        {data.velite.features.map((item, index) => (
          <div key={index}>
            <Fragment key={index}>
              <div className={`section${index}`}>
                <VeliteKv data={item.kv} prefix={IMG_PREFIX} />
              </div>
            </Fragment>
            {item.features?.map((f, idx) => {
              switch (f.type) {
                case 'full':
                  return <VeliteFullPage key={idx} data={f} prefix={IMG_PREFIX} />
                case 'diff':
                  return <VeliteDiffer key={idx} data={f} prefix={IMG_PREFIX} />
                case 'engine':
                  return <VeliteEngine key={idx} data={f} prefix={IMG_PREFIX} category={item.category} />
                case 'list':
                  return <VeliteList key={idx} data={f} name={name} prefix={IMG_PREFIX} category={item.category} />
                case 'slider':
                  return <VeliteSlider key={idx} data={f} name={name} prefix={IMG_PREFIX} category={item.category} />
                default:
                  break
              }
            })}
          </div>
        ))}
        {/* <div className={`section${data.velite.features.length}`}>
          <VeliteApp code={code} data={data.velite.app.features} />
        </div> */}
        {/* <div className={classNames(styles['fbi-subnav'], {
          [styles.show]: fbiHideNav
        })} ref={fbiSubNavRef}>
          {data.velite.features.map((res, index) => (
            <div key={index} className={classNames(styles.item, {
              [styles.active]: fbiSubNavActive === index
            })}
              onClick={() => {
                trackEvent(`车型页-${series.name}-一级页面-${res.category.text}`)
              }}>
              <span>{res.category.text}</span>
            </div>
          )
          )}
          <div className={classNames(styles.item, {
            [styles.active]: fbiSubNavActive === data.velite.features.length
          })}
            onClick={() => {
              trackEvent(`车型页-${series.name}-一级页面-智慧服务`)
            }}
          >
            <span>智慧服务</span>
          </div>

        </div> */}
      </div>

    </>
  )
}

export default VelitePage
