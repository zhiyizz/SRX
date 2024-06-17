
import classNames from 'classnames'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '../../styles/components/avenir-common.module.scss'

import MediaComponent from '../MediaComponent'
import type { KvMediaType } from '~types/slider'
import type { FeatureMediaPrefix } from '~types/feature'

export default function AvenirIntro({ className, prefix, intro, fillColor="#000",maskColor,onIntroEnd }: {
  className?: string
  intro: KvMediaType[],
  fillColor?:string
  maskColor:string,
  onIntroEnd:(event: boolean) => void
} & FeatureMediaPrefix) {
  const containerRef = useRef<HTMLElement>(null!)

  useLayoutEffect(() => {
    const itemLength = containerRef.current.getElementsByClassName(styles.item).length
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub:true,
        end: `+=${100 * (itemLength * 3) }%`,
        onEnterBack() {
          onIntroEnd(false)
        },
        onLeave() {
          onIntroEnd(true)
        },
      }
    })
    timeLine
      .to(containerRef.current.getElementsByClassName(styles.pic), {
        scale: 2,
        ease: 'none',
        duration: 1.5,
      }, `+=1.5`)
      .to(containerRef.current.getElementsByClassName(styles.mask), {
        startAt: { scale: 10 },
        ease: 'none',
        keyframes: [
          { opacity: 1, scale: 1, duration: 1 }
        ]
      }, '-=0.5')
      .to(containerRef.current.getElementsByClassName(styles.fill), {
        ease: 'none',
        keyframes: [
          { backgroundColor: maskColor, duration:1 },
          { backgroundColor: fillColor, duration:0.5 }
        ]
      })

    return () => {
      timeLine.scrollTrigger?.kill()
    }
  }, [containerRef, maskColor, intro, onIntroEnd, fillColor])
  useEffect (() => { 
    ScrollTrigger.refresh (); 
  },[intro])
  return (
    <div className={className}>
      <section className={classNames(styles.partmod, styles.part1)} ref={containerRef}>
        <div className={classNames(styles.item, styles.pic)}>
          <MediaComponent media={intro} prefix={prefix} />
        </div>
        <div className={classNames(styles.item,styles.fill)}>
          <span className={styles.mask} style={{backgroundColor:fillColor}}></span>
        </div>
      </section>
    </div>
  )
}
