import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '../../styles/components/avenir-common.module.scss'

import { combineUrl, divideByElement } from '@utils/helper'
import AliImage from '../AlImage'
import type { AvenirJson, FeatureMediaPrefix } from '~types/feature'

export default function AvenirExtra({ prefix, data }: {
  data: AvenirJson
} & FeatureMediaPrefix) {
  const containerRef = useRef<HTMLElement>(null!);
  const [swiperCurrent, setSwiperCurrent] = useState(0);
  const [gaspLoad, setGaspLoad] = useState(false)

  useLayoutEffect(() => {
    const itemTweenArr:gsap.core.Tween[] = [];
    if (Array.isArray(data.extra)) {
      const { length } = data.extra
      for (let i = 0; i < length; i++) {
        const slideItemDom = containerRef.current.getElementsByClassName('slider'+i)
        const itemTimeLine = gsap.to(slideItemDom,{
          scrollTrigger: {
            trigger: slideItemDom,
            start: 'center bottom',
            toggleActions: "play none none reverse"
          },
          startAt: { y: '15%' },
          opacity: 1,
          duration:1,
          y: 0
        })
        itemTweenArr.push(itemTimeLine)
      }
    }
    return () => {
      itemTweenArr.forEach(item =>{
        item.scrollTrigger?.kill()
      })
      setGaspLoad(true)
    }
  }, [data])

  useEffect (() => {
    if(gaspLoad){
      ScrollTrigger.refresh()
    }
  },[data,gaspLoad])

  if (!data.extra || !data.extra.length) return null

  return (
    <div>
      <section className={classNames(styles.fbimore, styles.fbipart)} ref={containerRef}>
        <div className={classNames(styles.item, styles.details)}>
          <div className={classNames(styles.content, {
            [styles.multiple]: data.extra.length > 2
          })}>
            <div className={styles.slider}>
              {
                data.extra?.map((item, index) => (
                  Array.isArray(item) ?
                    <div className={classNames(styles['slider-item'],'slider'+index)} key={index}>
                      <div className={styles.pic}>
                        <Swiper
                          modules={[Navigation]}
                          onTransitionStart={swiper => setSwiperCurrent(swiper.realIndex)}
                          navigation
                          loop
                        >
                          {
                            item.map((itemSwiper, indexSwiper) =>
                              <SwiperSlide key={indexSwiper}>
                                <AliImage src={combineUrl(prefix, itemSwiper.media.url)} alt={itemSwiper.media.alt} width={itemSwiper.media.width} height={itemSwiper.media.height} />
                              </SwiperSlide>
                            )
                          }
                        </Swiper>
                      </div>
                      <div className={styles.info}>
                        <h4>{divideByElement(item[swiperCurrent].text.title)}</h4>
                        <p>{divideByElement(item[swiperCurrent].text.content)}</p>
                      </div>
                    </div>
                    :
                    <div className={classNames(styles['slider-item'],'slider'+index)} key={index}>
                      <div className={styles.pic}><AliImage src={combineUrl(prefix, item.media.url)} alt={item.media.alt} width={item.media.width} height={item.media.height} /></div>
                      <div className={styles.info}>
                        <h4>{divideByElement(item.text.title)}</h4>
                        <p>{divideByElement(item.text.content)}</p>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
