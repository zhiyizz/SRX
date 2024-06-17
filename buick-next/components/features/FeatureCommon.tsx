import React, { useState } from 'react'
import type { FeatureMediaPrefix, FeatureMedia, GeneralContent, FeatureGeneralType } from '~types/feature'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import AliImage from '@components/AlImage'
import { combineUrl, divideByElement } from '@utils/helper'
import styles from '../../styles/components/fbi-common.module.scss'
import classNames from 'classnames'
const FeatureCommon = ({ media, tips, slides, text, prefix, type }: {
  media?: FeatureMedia
  slides?: {
    media: FeatureMedia
    text?: GeneralContent
  } | GeneralContent
  text?: GeneralContent
  tips?: string
}& FeatureGeneralType & FeatureMediaPrefix) => {
  const [current, setCurrent] = useState(0)
  return (
    <>
      {type === 'triple' ? (
        <div className={classNames( {[styles['newv2-col-3']]: type === 'triple'})}>
            {Array.isArray(slides) && slides.map((item,index) => (
               <div className={classNames(styles.group, styles['group-common'])} key={index}>
              <div className={styles.wrapper}>
                <div className={styles.feature}>
                  <h3 className={styles['feature-title']}>{divideByElement(item.text.title)}</h3>
                  <div className={styles.content}>
                    {item.text.subTitle && <h4 className={styles['feature-subtitle']}>{divideByElement(item.text.subTitle)}</h4>}
                    <p className={styles['feature-tx']}>{divideByElement(item.text.content)}</p>
                  </div>
                </div>
                <AliImage src={`${prefix}/${item.media.url.replace(/^\.*\//, '')}`} alt={item.media.alt || item.text?.title} height={item.media.height} width={item.media.width} />
              </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={classNames(styles.group, styles['group-common'])}>
          <div className={classNames(styles.wrapper,{
            [styles['text-img']]:media?.textImage
          })}>
            <div className={styles.feature}>
              {text ? (
                <>
                  <h3 className={styles['feature-title']}>{divideByElement(text.title)}</h3>
                  <div className={styles.content}>
                    {text.subTitle && <h4 className={styles['feature-subtitle']}>{divideByElement(text.subTitle)}</h4>}
                    <p className={styles['feature-tx']}>{divideByElement(text.content)}</p>
                  </div>
                </>
              ) :
                Array.isArray(slides) && slides[current].text && (
                  <>
                    <h3 className={styles['feature-title']}>{divideByElement(slides[current].text?.title)}</h3>
                    <div className={styles.content}>
                      <h4 className={styles['feature-subtitle']}>{divideByElement(slides[current].text?.subTitle)}</h4>
                      <p className={styles['feature-tx']}>{divideByElement(slides[current].text?.content)}</p>
                    </div>
                  </>
                )
              }
            </div>
            {media ? (
              media.type === 'video' ?
                <video width="100%" height="100%" controls preload="none" webkit-playsinline="true" x5-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" src={media.url && combineUrl(prefix, media.url)} poster={media.poster && combineUrl(prefix, media.poster)}></video>
                :
                <AliImage src={`${prefix}/${media.url.replace(/^\.*\//, '')}`} alt={media.alt || text?.title} height={media.height} width={media.width} />
            ) : null}

            {Array.isArray(slides) && (
              <>
                <div className={styles.pic}>
                  {Array.isArray(slides) && (
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
                            <video width="100%" height="100%" controls preload="none" webkit-playsinline="true" x5-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" src={item.media.url && combineUrl(prefix, item.media.url)} poster={item.media.poster && combineUrl(prefix, item.media.poster)}></video>
                            :
                            <AliImage src={`${prefix}/${item.media.url.replace(/^\.*\//, '')}`} alt={item.media.alt || item.text?.title ? item.text.title : text?.title} height={item.media.height} width={item.media.width} />
                          }
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}

                </div>
              </>
            )
            }
          </div>
          <div className={styles.tips}>{tips}</div>
        </div>
      )}
      
    </>

  );
};

export default FeatureCommon
