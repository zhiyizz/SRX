import { type FC, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import { Navigation } from 'swiper'

import styles from '@styles/components/media-viewer.module.scss'

import AliImage from './AlImage'
import SvgIcon from './icons'
import type { FeatureMediaPrefix } from '~types/feature'
import { combineUrl } from '@utils/helper'
import classNames from 'classnames'

type MediaViewerProperties = FeatureMediaPrefix & {
  show?: boolean
  images: string[]
  index?: number
  onClose?: VoidFunction
}

const MediaViewer: FC<MediaViewerProperties> = ({ show, images, prefix, index, onClose }) => {
  const [current, setCurrent] = useState(0)

  const swiper = useRef<SwiperType>()

  // const nextEl = useRef<HTMLDivElement>(null)
  // const prevEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(()=>{
      if (swiper.current && typeof index !== 'undefined') {
        swiper.current.slideTo(index,0)
      }
    },100)
  }, [index])

  if (!show) return null

  return (
    <div className={classNames(styles.main, 'animate__animated', 'animate__fadeIn', 'animate__fast')}>
      <div className={styles.close} onClick={onClose}><i className="icon-close icon-close-light" /></div>
      <div className={styles.wrapper}>
        <Swiper className={styles.slider}
          modules={[Navigation]}
          navigation
          onSwiper={(s) => {
            swiper.current = s
          }}
          onSlideChangeTransitionStart={(swiper) => {
            setCurrent(swiper.activeIndex)
          }}
        >
          {images.map((url, index) => <SwiperSlide key={index}>
            <figure>
              <AliImage alt="精彩鉴赏" src={combineUrl(prefix, url)} fill />
            </figure>
          </SwiperSlide>)}
          {/* <div className={styles.nav}>
            <div className={styles.prev} ref={prevEl}><SvgIcon icon="back" /></div>
            <div className={styles.next} ref={nextEl}><SvgIcon icon="back" /></div>
          </div> */}
        </Swiper>
        <div className={styles.controls}>
          <div className={styles.download}><a href={combineUrl(prefix, images[current])} title="下载图片" download><SvgIcon icon="top" /></a></div>
        </div>
      </div>
    </div>
  )
}

export default MediaViewer
