import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '../../styles/components/avenir-common.module.scss'

import { calculateHeight, combineUrl, divideByElement } from '@utils/helper'
import type { AvenirJson, FeatureMediaPrefix, PictureResourceSlideType } from '~types/feature'
import MediaComponent from '../MediaComponent'
import { trackPv } from '@utils/tracking'
import AliImage from '@components/AlImage'
import YoukuPlayer from '@components/YoukuPlayer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

export default function AvenirDetailV2({
  name,
  prefix, 
  data
}: {
  /**
   * 车型名称。
   */
  name:string
  data: AvenirJson
} & FeatureMediaPrefix) {
  const containerRef = useRef<HTMLElement>(null!);
  const [gaspLoad, setGaspLoad] = useState(false)
  useLayoutEffect(() => {
    let trackName = true;
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center bottom',
        end: 'center center',
        onUpdate: (self) => {
          const progress = Number(self.progress.toFixed(2)) * 100;
          if (trackName && progress > 1 && progress < 100) {
            trackName = false
            trackPv(`车型页-${name}-${data.category.text}`)
          }
          if (progress === 100 || progress <= 0) {
            trackName = true;
          }
        }
      }
    })

    const introTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current.getElementsByClassName(styles.intro),
        start:"center-=20% center",
        toggleActions: "play none none reverse"
      }
    })

    introTimeLine
      .to(containerRef.current.getElementsByClassName(styles['intro-content']), {
        background: 'linear-gradient(0deg, rgba(0,0,0,.8), transparent 40%)'
      })
      .to(containerRef.current.getElementsByClassName(styles['intro-tx']), {
        startAt: {y: 80 },
        y: 0,
        opacity: 1
      }, '-=0.5')
      .to(containerRef.current.getElementsByClassName(styles['intro-title']), {
        startAt: {y: 80 },
        y: 0,
        opacity: 1
      }, '-=0.4')


      const itemTimeLineArr:gsap.core.Timeline[] = [];
      if (Array.isArray(data.detailV2)) {
        const { length } = data.detailV2
        for (let i = 0; i < length; i++) {
          const wrapperDom = containerRef.current.getElementsByClassName('itemTrigger-wrapper' + i)
          const infoDom = containerRef.current.getElementsByClassName('itemTrigger-info' + i)
          const picDom = containerRef.current.getElementsByClassName('itemTrigger-pic' + i)
          const itemTimeLine = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperDom,
              start: 'top-=20% center',
              toggleActions: "play none none reverse"
            }
          })
          itemTimeLineArr.push(itemTimeLine)
          itemTimeLine
            .to(infoDom, {
              startAt: { y: 80 },
              y: 0,
              opacity: 1
            },'-=0.5')
            .to(picDom, {
              startAt: { y: 80 },
              y: 0,
              opacity: 1
            },'-=0.3')
        }
      }
      return () => {
        timeLine.scrollTrigger?.kill()
        introTimeLine.scrollTrigger?.kill()
        itemTimeLineArr.forEach(item =>{
          item.scrollTrigger?.kill()
        })
        setGaspLoad(true)
      }
  }, [data.category.text, data.detailV2, name])

  useEffect (() => {
    if(gaspLoad){
      ScrollTrigger.refresh()
    }
  },[data.detailV2,gaspLoad])

  console.log('avenir detail:', data)
  return (
    <div>
      <section className={classNames(styles.partmod, styles.fbipart,styles.fbipartV2)} ref={containerRef}>
        <div className={classNames(styles.item, styles.intro)}>
          <MediaComponent media={data.media} prefix={prefix} title={data.category.text} />
          <div className={styles['intro-content']}>
            <div className={styles['intro-tx']}>{divideByElement(data.content)}</div>
            <div className={styles['intro-title']}>
              <h2>{divideByElement(data.title.text)}</h2>
            </div>
          </div>
        </div>
        <div className={styles['details-container']}>
          {
            data.detailV2 && data.detailV2.map((item, index) => (
                <Fragment key={index}>
                  {item.type !== 'slider' && (<div className={classNames(styles.item, styles.details)}>
                    <div className={classNames(styles.wrapper, 'itemTrigger-wrapper' + index)}>
                      <div className={styles.content}>
                        <div className={classNames(styles.info, 'itemTrigger-info' + index)}>
                          <h4>{divideByElement(item.text.title)}</h4>
                          {item.text.subTitle && <h5>{divideByElement(item.text.subTitle)}</h5>}
                          <p>{divideByElement(item.text.content)}</p>
                        </div>
                      </div>
                      <div className={classNames(styles.pic, 'itemTrigger-pic' + index)}>
                        {item.media.type === 'video' ?
                          ( /\.mp4$/.test(item.media.url) ?
                            <video 
                              width="100%" 
                              height="100%" 
                              controls 
                              preload="none"  
                              webkit-playsinline="true" 
                              x5-playsinline="true" 
                              x5-video-player-type="h5" 
                              x5-video-player-fullscreen="false" 
                              src={item.media.url && combineUrl(prefix, item.media.url)} 
                              poster={item.media.poster && combineUrl(prefix, item.media.poster)}
                              ></video>
                            :
                            <YoukuPlayer controls id={`ykPlayer_fl_${prefix.replace(/[\/\\]/g, '')}_${index}`} vid={item.media.url} poster={item.media.poster && combineUrl(prefix, item.media.poster)} />
                          )
                          :
                          <AliImage src={combineUrl(prefix, item.media.url)} alt={item.media.alt || item.text.title || '亮点'} height={item.media.height || calculateHeight(item.media.width)} width={item.media.width} />
                        }
                      </div>
                    </div>
                  </div> )}
                  
                  {item.type === 'slider' && <SliderDom {...item} index={index} prefix={prefix} />}
                </Fragment>

            ))
          }
        </div>
      </section>
    </div>
  )
}


export function SliderDom({media,slides,index,prefix}:PictureResourceSlideType & FeatureMediaPrefix & {
  index:number
}){
  const [current, setCurrent] = useState(0)
  return(
    media ? (
      <>
        <div className={classNames(styles.item, styles.details)} key={index}>
          <div className={classNames(styles.wrapper, 'itemTrigger-wrapper' + index)}>
            <div className={styles.content}>
              <div className={classNames(styles.info, 'itemTrigger-info' + index)}>
                <Swiper
                  className={styles.swiper}
                  modules={[Pagination]}
                  autoHeight
                  loop
                  pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                      return `<span class="${className}">${(index + 1)}</span>`;
                    },
                  }}
                >
                  {slides.map((item, index) => <SwiperSlide key={index}>
                    <h4>{divideByElement(item.title)}</h4>
                    {item.subTitle && <h5>{divideByElement(item.subTitle)}</h5>}
                    <p>{divideByElement(item.content)}</p>
                  </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </div>
            <div className={classNames(styles.pic, 'itemTrigger-pic' + index)}>
              {media.type === 'video' ?
                ( /\.mp4$/.test(media.url) ?
                <video 
                  width="100%" 
                  height="100%" 
                  controls 
                  preload="none"  
                  webkit-playsinline="true" 
                  x5-playsinline="true" 
                  x5-video-player-type="h5" 
                  x5-video-player-fullscreen="false" 
                  src={media.url && combineUrl(prefix, media.url)} 
                  poster={media.poster && combineUrl(prefix, media.poster)}
                  ></video>
                  :
                  <YoukuPlayer controls id={`ykPlayer_fl_${prefix.replace(/[\/\\]/g, '')}_${index}`} vid={media.url} poster={media.poster && combineUrl(prefix, media.poster)} />
                )
                :
                <AliImage src={combineUrl(prefix, media.url)} alt={media.alt || slides[0].title || '亮点'} height={media.height || calculateHeight(media.width)} width={media.width} />
              }
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        {slides && <div className={classNames(styles.item, styles.details)} key={index}>
          <div className={classNames(styles.wrapper, 'itemTrigger-wrapper' + index)}>
            <div className={styles.content}>
              <div className={classNames(styles.info, 'itemTrigger-info' + index)}>
                <h4>{divideByElement(slides[current].text.title, <br />)}</h4>
                {slides[current].text.subTitle && <h5>{divideByElement(slides[current].text.subTitle ?? '', <br />)}</h5>}
                <p>{divideByElement(slides[current].text.content, <br />)}</p>
              </div>
            </div>
            <div className={classNames(styles.pic, 'itemTrigger-pic' + index)}>
              <Swiper
                className={styles.swiper}
                modules={[Pagination, Navigation]}
                loop
                navigation
                pagination={{
                  clickable: true,
                  renderBullet: function (index, className) {
                    return `<span class="${className}">${(index + 1)}</span>`;
                  },
                }}
                onInit={swiper => setCurrent(swiper.realIndex)}
                onTransitionStart={swiper => setCurrent(swiper.realIndex)}
              >
                {slides.map((sitem, idx) => (
                  <SwiperSlide key={idx}>
                    {sitem.media.type === 'video' ?
                      ( /\.mp4$/.test(sitem.media.url) ?
                      <video 
                        width="100%" 
                        height="100%" 
                        controls 
                        preload="none"  
                        webkit-playsinline="true" 
                        x5-playsinline="true" 
                        x5-video-player-type="h5" 
                        x5-video-player-fullscreen="false" 
                        src={sitem.media.url && combineUrl(prefix, sitem.media.url)} 
                        poster={sitem.media.poster && combineUrl(prefix, sitem.media.poster)}
                        ></video>
                        :
                        <YoukuPlayer controls id={`ykPlayer_fl_${prefix.replace(/[\/\\]/g, '')}_${index}`} vid={sitem.media.url} poster={sitem.media.poster && combineUrl(prefix, sitem.media.poster)} />
                      )
                      :
                      <AliImage src={combineUrl(prefix, sitem.media.url)} alt={sitem.media.alt || sitem.text.title} height={sitem.media.height} width={sitem.media.width} />
                    }
                    
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div> }
      </>
    )
  )

}
