import classNames from 'classnames'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper'

import type { FeatureMediaPrefix, FeatureSlideType } from '~types/feature'

import styles from '../../styles/components/fbi-common.module.scss'
import { combineUrl, divideByElement } from '@utils/helper'
import FeatureCaption from './FeatureCaption'
import YoukuPlayer from '@components/YoukuPlayer'
import AliImage from '@components/AlImage'

export default function FeatureSlider({ media, slides, align, size, caption, prefix }: FeatureSlideType & FeatureMediaPrefix) {
  const [current, setCurrent] = useState(0)

  return (
    <div className={classNames(styles.group, {
      [styles.medium]: size === 'large',
      [styles.large]: size === 'full',
      // [styles.left]: align === 'left',
      [styles.right]: align === 'right',
      [styles['swiper-tx']]: media,
    })}>
      <FeatureCaption caption={caption} />
      <div className={styles.wrapper}>
        {media ? (
          <>
            <div className={styles.pic}>
              <AliImage src={`${prefix}/${media.url.replace(/^\.*\//, '')}`} alt={media.alt || slides[0]?.title || '亮点'} height={media.height} width={media.width} />
            </div>
            <div className={styles.feature}>
              <Swiper
                className={styles['fbi-detail-swiper']}
                modules={[Pagination, Autoplay]}
                autoHeight
                loop
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false
                }}
                pagination={{
                  clickable: true,
                  renderBullet: function (index, className) {
                    return `<span class="${className}">${(index + 1)}</span>`;
                  },
                }}
                onInit={swiper => setCurrent(swiper.realIndex)}
                onTransitionStart={swiper => setCurrent(swiper.realIndex)}
              >
                {slides.map((item, index) => <SwiperSlide key={index}>
                  <h3 className={styles['feature-title']}>{divideByElement(item.title)}</h3>
                  <p className={styles['feature-tx']}>{divideByElement(item.content)}</p>
                </SwiperSlide>
                )}
              </Swiper>
            </div>

          </>
        ) : (
          <>
            <div className={styles.pic}>
              <Swiper
                className={styles['fbi-detail-swiper']}
                modules={[Pagination, Autoplay, Navigation]}
                loop
                // autoplay={{
                //   delay: 4000,
                //   disableOnInteraction: false
                // }}
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
                {slides.map((item, index) => (
                  <SwiperSlide key={index}>
                    {item.media.type === 'video' ?
                      ( /\.mp4$/.test(item.media.url) ?
                        <video width="100%" height="100%" controls preload="none"  webkit-playsinline="true" x5-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" src={item.media.url && combineUrl(prefix, item.media.url)} poster={item.media.poster && combineUrl(prefix, item.media.poster)}></video>
                        :
                        <YoukuPlayer controls id={`ykPlayer_fl_${prefix.replace(/[\/\\]/g, '')}_${index}`} vid={item.media.url} poster={item.media.poster && combineUrl(prefix, item.media.poster)} />
                      )
                      :
                      <AliImage src={`${prefix}/${item.media.url.replace(/^\.*\//, '')}`} alt={item.media.alt || item.text.title} height={item.media.height} width={item.media.width} />
                    }
                    
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.feature}>
              <h3 className={styles['feature-title']}>{divideByElement(slides[current].text.title, <br />)}</h3>
              <p className={styles['feature-tx']}>{divideByElement(slides[current].text.content, <br />)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
