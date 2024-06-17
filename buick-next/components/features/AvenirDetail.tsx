import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '../../styles/components/avenir-common.module.scss'

import { divideByElement } from '@utils/helper'
import type { AvenirJson, FeatureMediaPrefix } from '~types/feature'
import MediaComponent from '../MediaComponent'
import { trackPv } from '@utils/tracking'

export default function AvenirDetail({
  name,
  prefix, data,
  hideBg = false
}: {
  /**
   * 车型名称。
   */
  name:string
  data: AvenirJson
  hideBg?: boolean
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
        start: 'center bottom-=20vh',
        toggleActions: "play none none reverse"
      }
    })
    introTimeLine
      .to(containerRef.current.getElementsByClassName(styles['intro-title']), {
        startAt: {y: -180 },
        y: 0,
        opacity: 1
      })
      .to(containerRef.current.getElementsByClassName(styles['intro-tx']), {
        startAt: {y: 180 },
        y: 0,
        opacity: 1
      }, '-=0.5')
      .to(containerRef.current.getElementsByClassName(styles['intro-content']), {
        background: 'rgba(0,0,0,0.4)'
      }, '-=0.3')
    

    const titleTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current.getElementsByClassName('itemTrigger-title'),
        start: 'top center',
        toggleActions: "play none none reverse"
      }
    })

    const itemTimeLineArr:gsap.core.Timeline[] = [];
    if (Array.isArray(data.detail)) {
      const { length } = data.detail
      for (let i = 0; i < length; i++) {
        const titleDom = containerRef.current.getElementsByClassName('itemTrigger-title')
        const wrapperDom = containerRef.current.getElementsByClassName('itemTrigger-wrapper' + i)
        const infoDom = containerRef.current.getElementsByClassName('itemTrigger-info' + i)
        const itemTimeLine = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperDom,
            start: 'center center',
            toggleActions: "play none none reverse"
          }
        })
        itemTimeLineArr.push(itemTimeLine)
        if(i === 0){
          titleTimeLine
            .to(titleDom, {
              startAt: { y: -80 },
              y: 0,
              opacity: 1
            })
            .to(infoDom, {
              startAt: { y: 80 },
              y: 0,
              opacity: 1
            },'-=0.5')
        }else{
          itemTimeLine
            .to(infoDom, {
              startAt: { y: 80 },
              y: 0,
              opacity: 1
            },'-=0.5')
        }
      }
    }
    

    return () => {
      timeLine.scrollTrigger?.kill()
      introTimeLine.scrollTrigger?.kill()
      titleTimeLine.scrollTrigger?.kill()
      itemTimeLineArr.forEach(item =>{
        item.scrollTrigger?.kill()
      })
      setGaspLoad(true)
    }
  }, [data.category.text, data.detail, name])
  useEffect (() => {
    if(gaspLoad){
      ScrollTrigger.refresh()
    }
  },[data.detail,gaspLoad])

  console.log('avenir detail:', data)

  return (
    <div>
      <section className={classNames(styles.partmod, styles.fbipart)} ref={containerRef}>
        <div className={classNames(styles.item, styles.intro)}>
          {
            !hideBg && <MediaComponent media={data.media} prefix={prefix} title={data.category.text} />
          }

          <div className={styles['intro-content']}>
            <div className={styles['intro-title']}>
              <span>{divideByElement(data.title.en)}</span>
              <h2>{divideByElement(data.title.text)}</h2>
            </div>
            <div className={styles['intro-tx']}>{divideByElement(data.content)}</div>
          </div>
        </div>
        <div className={styles['details-container']}>
          <div className={classNames(styles.title, 'itemTrigger-title')}>
            <span>{divideByElement(data.category.en)}</span>
            <h3>{divideByElement(data.category.text)}</h3>
          </div>
          {
            data.detail &&
              data.detail.map((item, index) => (
                <div className={classNames(styles.item, styles.details)} key={index}>
                  <div className={classNames(styles.wrapper, 'itemTrigger-wrapper' + index)}>
                    <MediaComponent className={styles.pic} media={item.media} prefix={prefix} title={item.text.title} />
                    <div className={styles.content}>
                      <div className={classNames(styles.info, 'itemTrigger-info' + index)}>
                        <h4>{divideByElement(item.text.title)}</h4>
                        <p>{divideByElement(item.text.content)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          }
        </div>
      </section>
    </div>
  )
}
