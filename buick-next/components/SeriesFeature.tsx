import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Scrollbar, Autoplay } from 'swiper'
import classNames from 'classnames'
import MediaComponent from './MediaComponent'
import type { FeatureJson } from '~types/feature'
import VideoAutoPlay from './VideoAutoPlay2'
import styles from '@styles/components/series-features.module.scss'
import { divideByElement } from '@utils/helper'
import { trackEvent } from '@utils/tracking'
import { useState } from 'react'

/**
 * 普通版车型页外层大图。
 * @param property 属性。 
 * @returns 元素。
 */
export default function SeriesFeature({ data, name, index, prefix, onMore }: {
  data: FeatureJson 
  /**
   * 车型名称。
   */
  name:string
  /**
   * 大图的索引（随 `onMore` 事件返回）。
   */
  index: string
  /**
   * 图片路径。
   */
  prefix?: string
  /**
   * 触发*查看更多*时的回调方法。
   */
  onMore?: (index: string) => void
}) {
  const [videoShow,setVideoShow] = useState(false);
  return (
    <div className={styles['fbi-item']}>
      <div className={styles['fbi-item-wrapper']}>
        {data.isScroll ? (
          <Swiper
            slidesPerView={"auto"}
            freeMode={{
              momentumBounce:false
            }}
            touchRatio={0.01}
            scrollbar={{
              hide:true,
              draggable:true
            }}
            speed={5000}
            autoplay
            modules={[FreeMode, Scrollbar, Autoplay]}
            className={classNames({
              [styles['fbi-item-scroll']]: data.isScroll
            })}
          >
            <SwiperSlide>
            <MediaComponent media={data.media} prefix={prefix} />
            </SwiperSlide>
          </Swiper>
        ) : Array.isArray(data.media) && data.media[0].type === 'video' ? <VideoAutoPlay styles={styles} prefix={prefix!} data={data.media} videoShow={videoShow} setVideoShow={setVideoShow} /> : <MediaComponent media={data.media} prefix={prefix} /> }
        <div className={styles['fbi-content']}>
          <div className={classNames(styles['fbi-info'], {
            [styles['fbi-info-dark']]: data.dark,
            [styles['fontBig']]: data?.fontSize === 'big',
          })}>
            {data.suptitle && <h4>{divideByElement(data.suptitle)}</h4>}
            <h3>{divideByElement(data.title)}</h3>
            <p>{divideByElement(data.content)}</p>
            <p className={styles.subcontent}>{divideByElement(data.subContent!)}</p>
            {Array.isArray(data.media) && data.media[0].overlay ? (
              <span className={styles.more} onClick={onMore && (()=> {
                // onMore(index)
                setVideoShow(true)
                trackEvent(`车型页-${name}-一级页面-${data.nav}-查看视频`)
              })}><i></i>查看视频</span>
            ) : (
              data.detail && (
                <span className={styles.more} onClick={onMore && (()=> {
                  onMore(index)
                  trackEvent(`车型页-${name}-一级页面-${data.nav}-查看更多`)
                })}><i></i>查看更多</span>
              )
            ) }
          </div>
        </div>
        <div className={styles.tips}>{divideByElement(data.tips!)}</div>
      </div>
    </div>
  )
}
