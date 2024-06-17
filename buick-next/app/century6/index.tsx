'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import AliImage from '@components/AlImage'
import type { CenturyPageProperties, GalleryList, MediaEntity } from '~types/series'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import classNames from 'classnames';
// import BasePage from '@components/layouts/BasePage'
import styles from '@styles/series.module.scss'
import stylesCentury from '@styles/century6.module.scss'
import KvSlider from '@components/KvSlider';
import SeriesNavigation, { type OverlayModule } from '@components/SeriesNavigation'
import SvgIcon from '@components/icons';
import Part1Section from './Part1Section'
import Part2Section from './Part2Section'
import Part3Section from './Part3Section'
import Part4Section from './Part4Section'
import Testdrive from '@components/Testdrive'
import Overlay from './Overlay'
import AsideButtons from '@components/AsideButtons'
// import { useInitialMobile } from '@utils/hooks'
import { trackEvent, trackPv } from '@utils/tracking'
import { useInView } from 'react-intersection-observer'
import MediaViewer from '@components/MediaViewer'
import { hideNav, hideScrollbar, resetTd, setPosition, setTdInView, setXingyun, showNav, showScrollbar, useDispatch, useSelector } from 'lib/redux'
import { combineUrl } from '@utils/helper'

// const fbiData = [
//   { name: '弘阔气度' },
//   { name: '感官奢享' },
//   { name: '科技赋能' },
//   { name: '智慧互联' }
// ]
const pageName = "世纪CENTURY六座"

const Century: NextPage<CenturyPageProperties> = ({
  currentSeries, 
  data,
  loanPicList,
  prefix,
  draftMode,
}) => {

  const [hideGlobalNav, setHideGlobalNav] = useState(false)
  const [disableScroll, setDisableScroll] = useState(false)
  const [backTop, setBackTop] = useState(false)
  // const [showTd, setShowTd] = useState(false)
  const [fbiHideNav, setFbiHideNav] = useState(false)
  const [currentNav, setCurrentNav] = useState<OverlayModule>()
  
  const [fbiData,setFbiData] = useState<{name:string}[]>([]);

  const [fbiSubNavActive, setFbiSubNavActive] = useState<number>(0)
  const fbiSubNavRef = useRef<HTMLDivElement>(null!)
  const tdEle = useRef<HTMLDivElement | null>(null)
  const part1Ref = useRef<HTMLDivElement>(null!)
  const part2Ref = useRef<HTMLDivElement>(null!)
  const part3Ref = useRef<HTMLDivElement>(null!)
  const part4Ref = useRef<HTMLDivElement>(null!)
  const [type, setType] = useState<string>('')

  const [tdImages, setTdImages] = useState<{
    pc?: MediaEntity
    mob?: MediaEntity
  }>()

  const dispatch = useDispatch()
  const showTd = useSelector(state => state.nav.td)

  const [galleryList, setGalelryList] = useState<GalleryList>()
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    dispatch(setPosition('fixed'))
    return () => {
      dispatch(setPosition('static'))
    }
  }, [dispatch])

  const { ref: tdRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: '1000px 0px 0px 0px',
  })

  const showOverlay = useCallback((overlay?: OverlayModule) => {
    window.scrollTo(0, window.innerHeight)
    setHideGlobalNav(true)
    dispatch(hideNav())
    setCurrentNav(overlay)
  }, [dispatch])
  
  useEffect(() => {
    console.log(location.hash)
    if (location.hash) {
      const hash = location.hash.replace(/^#/, '') as OverlayModule
      const allowed: OverlayModule[] = ['exterior', 'finance', 'gallery', 'interior', 'specs']
      if (allowed.includes(hash)) {
        console.log('set default overlay')
      //  setDefaultOverlay(hash)
        showOverlay(hash)
      }
    }
  }, [showOverlay])

  useEffect(() => {
    const arr = data.century?.features?.map((item) => ({ name: item.nav })) || []
    // for (let i of data.century?.features!) {
    //   arr.push({
    //     name: i.nav,
    //   })
    // }
    setFbiData(arr)
  },[data])

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
    if (loanPicList) {
      window.loanPicList = loanPicList
    }
    return () => {
      delete window.loanPicList
    }
  }, [loanPicList])

  useLayoutEffect(() => {
    const kvTrigger = gsap.to('.kvTrigger', {
      scrollTrigger: {
        trigger: '.kvTrigger',
        start: 'top top',
        scrub: 2,
        onEnterBack() {
          setHideGlobalNav(false)
          dispatch(showNav())
          setFbiHideNav(false)
        },
        onLeave() {
          setHideGlobalNav(true)
          dispatch(hideNav())
          setFbiHideNav(true)
        },
      },
      yPercent: -100,
      ease: 'none',
      direction: 1.5,
    })
    let trackName = true;
   
    const part1TL = ScrollTrigger.create({
      trigger: part1Ref.current,
      pin: true,
      scrub: true,
      start: 'top top',
      end: `+=${window.innerHeight * 14}`,
      onUpdate:(self)=>{
        self.isActive && setFbiSubNavActive(0)
        const progress = Number(self.progress.toFixed(2)) * 100;
        if(trackName && progress > 1 && progress < 100){
          trackName = false
          trackPv(`车型页-${pageName}-${fbiData[0]?.name}`)
        }
        if(progress === 100 || progress <= 0){
          trackName = true;
        }
      }
    })

    const part2TL = ScrollTrigger.create({
      trigger: part2Ref.current,
      pin: true,
      scrub: true,
      start: 'top top',
      end: `+=${window.innerHeight * 21}`,
      onUpdate:(self)=>{
        self.isActive && setFbiSubNavActive(1)
        const progress = Number(self.progress.toFixed(2)) * 100;
        if(trackName && progress > 1 && progress < 100){
          trackName = false
          trackPv(`车型页-${pageName}-${fbiData[1].name}`)
        }
        if(progress === 100 || progress <= 0){
          trackName = true;
        }
      }
    })

    const part3TL = ScrollTrigger.create({
      trigger: part3Ref.current,
      pin: true,
      scrub: true,
      start: 'top top',
      end: `+=${window.innerHeight * 17}`,
      onUpdate:(self)=>{
        self.isActive && setFbiSubNavActive(2)
        const progress = Number(self.progress.toFixed(2)) * 100;
        if(trackName && progress > 1 && progress < 100){
          trackName = false
          trackPv(`车型页-${pageName}-${fbiData[2].name}`)
        }
        if(progress === 100 || progress <= 0){
          trackName = true;
        }
      }
    })

    const part4TL = ScrollTrigger.create({
      trigger: part4Ref.current,
      pin: true,
      scrub: true,
      start: 'top top',
      end: `+=${window.innerHeight * 11}`,
      onLeave: () => {
        setFbiHideNav(false)
      },
      onEnterBack: () => {
        setFbiHideNav(true)
      },
      onUpdate:(self)=>{
        self.isActive && setFbiSubNavActive(3)
        const progress = Number(self.progress.toFixed(2)) * 100;
        if(trackName && progress > 1 && progress < 100){
          trackName = false
          trackPv(`车型页-${pageName}-${fbiData[3].name}`)
        }
        if(progress === 100 || progress <= 0){
          trackName = true;
        }
      }
    })
    if(!fbiSubNavRef.current) return;
    const links = gsap.utils.toArray('div', fbiSubNavRef.current) as HTMLDivElement[];
    links.forEach((res, index) => {
      const element = eval(`part${index + 1}Ref`).current;
      const linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top"
      });
      ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center"
      });
      res.addEventListener("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTimeout(() => {
          const y = index === 0 ? window.outerHeight : linkST.start
          window.scrollTo(0, y)
          setFbiSubNavActive(index)
        }, 100);
      });
    });

    return () => {
      kvTrigger.scrollTrigger?.kill()
      part1TL.kill()
      part2TL.kill()
      part3TL.kill()
      part4TL.kill()
    }
  }, [currentSeries, dispatch, fbiData])


  const handleScrollTop = useCallback(() => {
    if (!backTop) {
      setBackTop(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setTimeout(setBackTop, 3000, false)
    }
  }, [backTop])

  // useEffect(() => {
  //   if (showTd && !disableScroll) {
  //     tdEle.current?.scrollIntoView({
  //       block: 'center',
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [disableScroll, showTd])

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

  useEffect(() => {
    if (type) {
      dispatch(hideScrollbar())
      // setDisableScroll(true)
    } else {
      dispatch(showScrollbar())
      // setDisableScroll(false)
    }
  }, [dispatch, type])

  const p = prefix || data.prefix
  const assetsPrefix = (p && combineUrl('https://static.buick.com.cn/assets/', draftMode ? 'preview' : undefined, p, currentSeries.code)) || `/img/${currentSeries.code}`

  useEffect(() => {
    if (data.xingyun?.url) {
      dispatch(setXingyun(combineUrl(assetsPrefix, data.xingyun.url)))
    } else {
      dispatch(setXingyun(currentSeries.code))
    }
    return () => {
      dispatch(setXingyun(undefined))
    }
  }, [assetsPrefix, currentSeries.code, data.xingyun, dispatch])

  useEffect(() => {
    dispatch(setTdInView(true))
    return () => {
      dispatch(setTdInView(false))
    }
  }, [dispatch])

  if (!data.century) {
    return null
  }

  return (
    // <BasePage className={stylesCentury.main} title={currentSeries.displayName || currentSeries.name} seriesData={series} code={code} categoryList={category} hideNav={hideNav} navPosition="fixed" hideScrollbar={disableScroll} smoothScroll={backTop || showTd} showIChat={showIChat} onNavTd={handleScrollTestdrive} onNavBuy={ebuickLink ? (() => {
    //   window.open(ebuickLink)
    // }) : undefined} onIChatClose={() => {
    //   setShowIChat(false)
    // }}>
    <main className={stylesCentury.main}>
      <SeriesNavigation
        code={currentSeries.code}
        viewer={data.show}
        specs={data.specs}
        name={currentSeries.name}
        displayName={currentSeries.displayName}
        vehiclePic={currentSeries.pic}
        show={hideGlobalNav}
        lockPageFn={setDisableScroll}
        onTop={handleScrollTop}
        flags={currentSeries.flags}
        pinned
        gallery={data.gallery}
        currentOverlay={currentNav}
        onOverlayChange={setCurrentNav}
        onGalleryShow={(list) => {
          setGalelryList(list)
          setShowGallery(true)
        }}
        prefix={assetsPrefix}
      />
      <AsideButtons tracking={pageName} onTop={handleScrollTop} hideTd={inView} showTop={!disableScroll && undefined} />

      <div className={classNames(stylesCentury.kv, 'kvTrigger')}>
        <KvSlider className={stylesCentury.container}
          slides={data.kv}
          prefix={assetsPrefix}>
        </KvSlider>
        <div className={stylesCentury['scroll-hint']}>
          <SvgIcon icon="angle-up" />
        </div>
        <SeriesNavigation
          className={stylesCentury.subnav}
          code={currentSeries.code}
          name={currentSeries.name}
          displayName={currentSeries.displayName}
          vehiclePic={currentSeries.pic}
          flags={currentSeries.flags}
          gallery={data.gallery}
          mirror
          currentOverlay={currentNav}
          onMenuClick={showOverlay}
        />
      </div>

      <section className={classNames(stylesCentury.partmod, stylesCentury.part1)} ref={part1Ref}>
        <Part1Section data={data.century?.features[0]} onOverlay={(type) => setType(type)} prefix={assetsPrefix} />
      </section>

      <section className={classNames(stylesCentury.partmod, stylesCentury.part2)} ref={part2Ref}>
        <Part2Section data={data.century?.features[1]} onOverlay={(type) => setType(type)} prefix={assetsPrefix} />
      </section>

      <section className={classNames(stylesCentury.partmod, stylesCentury.part3)} ref={part3Ref}>
        <Part3Section data={data.century?.features[2]} onOverlay={(type) => setType(type)} prefix={assetsPrefix} />
      </section>

      <section className={classNames(stylesCentury.partmod, stylesCentury.part4)} ref={part4Ref}>
        <Part4Section data={data.century?.features[3]} onOverlay={(type) => setType(type)} prefix={assetsPrefix} />
      </section>

      <div className={classNames(stylesCentury['fbi-subnav'], {
        [stylesCentury.show]: fbiHideNav
      })} ref={fbiSubNavRef}>
        {fbiData.map((res, index) => (<div key={index} className={classNames(stylesCentury.item, {
          [stylesCentury.active]: fbiSubNavActive === index
        })}
        onClick={()=>{
          trackEvent(`车型页-${pageName}-一级页面-${res.name}`)
        }}><span>{res.name}</span></div>))}
      </div>


      <div ref={el => {
        tdEle.current = el
        tdRef(el)
      }} className={classNames(styles.testdrive, styles.avenir)}>
        {tdImages && <figure className={classNames({
          [styles.dark]:data.testdrive?.theme === 'dark'
        })}>
          <div className="pc"><AliImage src={combineUrl(assetsPrefix, tdImages.pc?.url)} alt={tdImages.pc?.alt || '诚邀驾享体验'} fill priority /></div>
          <div className="m"><AliImage src={combineUrl(assetsPrefix, tdImages.mob?.url)} alt={tdImages.mob?.alt || '诚邀驾享体验'} width={tdImages?.mob?.width || 750} height={tdImages?.mob?.height || 560} /></div>
          <div className={styles.text}>
            <h3>诚邀驾享体验</h3>
            <small>即刻线上预约试驾</small>
          </div>
        </figure>}
        <div className={styles.container}>
          <h4>预约试驾</h4>
          <Testdrive styles={styles} series={currentSeries} tracking={`车型页-${pageName}`} />
        </div>
      </div>

      <Overlay prefix={assetsPrefix} type={type} show={type ? true : false} onClose={() => setType('')} data={data.century?.features} />
      {galleryList && <MediaViewer show={showGallery} prefix={assetsPrefix} index={galleryList.index} images={galleryList.list} onClose={() => setShowGallery(false)} />}
    </main>
  )
}

export default Century
