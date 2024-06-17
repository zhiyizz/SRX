'use client'

import { type FC, Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import dynamic from 'next/dynamic'

import styles from '@styles/components/avenir-common.module.scss'

import type { SeriesPageProperties } from '~types/series';
import SeriesNavigation, { type OverlayModule } from '../../SeriesNavigation'
import KvSlider from '../../KvSlider'
// import AvenirIntro from '../../features/AvenirIntro';
// import AvenirDetail from '../../features/AvenirDetail';
// import AvenirExtra from '../../features/AvenirExtra';
import KvInfo from '@components/KvInfo'
import SvgIcon from '@components/icons'
import { trackEvent } from '@utils/tracking'
import { hideScrollbar, showScrollbar, useDispatch } from 'lib/redux'

const AvenirIntro = dynamic(() => import('../../features/AvenirIntro'), {
  loading: () => <p>正在加载...</p>,
})
const AvenirDetail = dynamic(() => import('../../features/AvenirDetail'), {
  loading: () => <p>正在加载...</p>,
})
const AvenirDetailV2 = dynamic(() => import('../../features/AvenirDetail_v2'), {
  loading: () => <p>正在加载...</p>,
})
const AvenirExtra = dynamic(() => import('../../features/AvenirExtra'), {
  loading: () => <p>正在加载...</p>,
})

const AvenirPage: FC<SeriesPageProperties> = ({ code, series, data, prefix, defaultOverlay, draftMode, onNavChange, onPromoClick, onTop, onGalleryShow, onHasKvOverlay }) => {
  const [hideNav, setHideNav] = useState(false)
  const [currentNav, setCurrentNav] = useState<OverlayModule>()
  const [fbiSubNavActive, setFbiSubNavActive] = useState<number>(0)
  const [fbiHideNav, setFbiHideNav] = useState<boolean>(false)
  const fbiSubNavRef = useRef<HTMLDivElement>(null!)
  const [introEnd, setIntroEnd] = useState<boolean>(false)

  const dispatch = useDispatch()

  function showOverlay(overlay?: OverlayModule) {
    window.scrollTo(0, window.innerHeight)
    setHideNav(true)
    setCurrentNav(overlay)
  }


  useLayoutEffect(() => {
    const ins = gsap.to('.kvTrigger', {
      scrollTrigger: {
        trigger: '.kvTrigger',
        start: 'top top',
        scrub:1.5,
        onEnterBack() {
          setHideNav(false)
          onNavChange?.(false)
          setFbiHideNav(false)
        },
        onLeave() {
          setHideNav(true)
          onNavChange?.(true)
        },
      },
      y: '-100%',
      ease: 'none',
      direction:1.5,
    })
    return () => {
      ins.scrollTrigger?.kill()
    }
  }, [data.kv, onNavChange])

  useEffect(()=>{
    if(!fbiSubNavRef.current) return

    const links = gsap.utils.toArray('div', fbiSubNavRef.current) as HTMLDivElement[];
    let trackName = false;
    const linkArray:globalThis.ScrollTrigger[] = [];
    introEnd && setFbiHideNav(true)
    links.forEach((res, index) => {
      const element = gsap.utils.toArray('.section'+index)[0] as HTMLElement;
      if(!introEnd) return
      const linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end:"bottom bottom",
        onLeave: () => {
          index ===  (links.length - 1) && setFbiHideNav(false)
        },
        onEnterBack: () => {
          index ===  (links.length - 1) && setFbiHideNav(true)
        },
        onToggle: (self) => {
          self.isActive && setFbiSubNavActive(index)
        },
        onUpdate:(self)=>{
          const progress = Number(self.progress.toFixed(2)) * 100;
          if(trackName && progress > 1 && progress < 100){
            trackName = false
            // trackPv(`车型页-${pageName}-${fbiData[0].name}`)
          }
          if(progress === 100 || progress <= 0){
            trackName = true;
          }
        }
      });
      linkArray.push(linkST)
      res.addEventListener("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTimeout(() => {
          const y = index === 0 ? window.outerHeight : linkST.start
          window.scrollTo(0, y)
          setFbiSubNavActive(index)
        }, 100);
      });
    });
    return ()=>{
      linkArray.map(item =>{
        item.kill()
      })
    }
  },[introEnd])

  useEffect(()=>{
    if(data.version === '2.0' && fbiSubNavRef.current && data.avenir?.fillColor){
      fbiSubNavRef.current.style.setProperty('--subNavColor', data.avenir?.fillColor)
    }
  },[data.avenir?.fillColor, data.version])

  useEffect(() => {
    if (defaultOverlay) {
      showOverlay(defaultOverlay)
    }
  }, [defaultOverlay])

  useEffect(()=>{
    document.body.style.backgroundColor = '#000';
    return ()=>{
      document.body.style.backgroundColor = '';
    }
  },[])

  if (!data.avenir) return null
  const hasGallery = Array.isArray(data.gallery) && data.gallery.length > 0

  return (
    <>
      <SeriesNavigation code={code} displayName={series.displayName}
        viewer={data.show} specs={data.specs} vehiclePic={series.pic}
        prefix={prefix} tutorial={data.tutorial} draftMode={draftMode}
        name={series.name} flags={series.flags} show={hideNav} pinned gallery={data.gallery} currentOverlay={currentNav} lockPageFn={(lock) => {
          if (lock) {
            dispatch(hideScrollbar())
          } else {
            dispatch(showScrollbar())
          }
          // onScrollStateChange?.(lock)
        }}
        onOverlayChange={setCurrentNav} onTop={onTop} onGalleryShow={onGalleryShow} />
      <div className={classNames(styles.kv, 'kvTrigger')}>
        <KvSlider className={styles.container} slides={data.kv} prefix={prefix} onPromoClick={onPromoClick} onHasKvOverlay={onHasKvOverlay}>
          {data.info && <KvInfo data={data.info} name={series.name} price={series.price} />}
        </KvSlider>
        <div className={styles['scroll-hint']}><SvgIcon icon="angle-up" /></div>
        <SeriesNavigation className={styles.subnav} code={code} name={series.name} displayName={series.displayName} flags={series.flags} hasGallery={hasGallery} currentOverlay={currentNav} tutorial={data.tutorial} mirror onMenuClick={showOverlay} />
      </div>
      <AvenirIntro intro={data.avenir.intro} fillColor={data.avenir.fillColor} maskColor={data.avenir.maskColor} prefix={prefix} onIntroEnd={setIntroEnd} />
      {data.avenir.features.map((item, index) => 
        <Fragment key={index}>
          <div className={`section${index}`}>
            { data.version === '2.0' ? 
              <AvenirDetailV2 name={series.name} data={item} prefix={prefix} />
              :
              <AvenirDetail name={series.name} data={item} hideBg={index === 0} prefix={prefix} />
            }
            {Array.isArray(item.extra) && item.extra.length > 0 && <AvenirExtra data={item} prefix={prefix} />}
          </div>
        </Fragment>
      )}
      <div className={classNames(styles['fbi-subnav'], {
        [styles.show]: fbiHideNav
      })} ref={fbiSubNavRef}>
        {data.avenir.features.map((res, index) => (<div key={index} className={classNames(styles.item, {
          [styles.active]: fbiSubNavActive === index
        })}
        onClick={()=>{
          trackEvent(`车型页-${series.name}-一级页面-${res.category.text}`)
        }}><span>{res.category.text}</span></div>))}
      </div>
    </>
  )
}

export default AvenirPage
