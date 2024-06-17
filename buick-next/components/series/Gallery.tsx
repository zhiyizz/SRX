import AliImage from '@components/AlImage'
import SvgIcon from '@components/icons'
import YoukuPlayer from '@components/YoukuPlayer'
import styles from '@styles/components/series-overlay.module.scss'
import type { GalleryList, SeriesGallery } from '~types/series'
import classNames from 'classnames'
import { type FC, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Overlay, { type SeriesOverlayProps } from './Overlay'
import { combineUrl } from '@utils/helper'
import { useSelector } from 'lib/redux'

type GalleryProperties = SeriesOverlayProps & {
  code: string
  data: SeriesGallery[]
  prefix?: string
  onImageClick?: (list?: GalleryList) => void
}

function GalleryMedia({ code, data, index, show, prefix }: {
  code: string
  data: SeriesGallery
  index: number
  show: boolean
  prefix?: string
}) {
  if (data.type === 'video') {
    return /youku\.com/.test(data.url) ?
      <YoukuPlayer rebuild={!show} id={`${code}_gallery_${index}`} vid={data.url} poster={combineUrl(prefix, data.poster || data.thumbnail)} />
    :
      <video playsInline controls webkit-playsinline="true" x5-video-player-type="h5" preload="none" src={combineUrl(prefix, data.url)} poster={combineUrl(prefix, data.thumbnail || data.poster)} ></video>
  }
  return <AliImage src={combineUrl(prefix, data.thumbnail || data.url)} alt={data.alt || data.title || ''} width={data.width || 460} height={data.height || 258} thumbnail={460} />
}

const Gallery: FC<GalleryProperties> = ({ code, data, prefix, onImageClick, ...rest }) => {
  const [pageData, setPageData] = useState<SeriesGallery[][]>()
  const [list, setList] = useState<string[]>(null!)
  const [videoLen, setVideoLen] = useState(0)

  const navNextEl = useRef<HTMLDivElement>(null)
  const navPrevEl = useRef<HTMLDivElement>(null)

  const isMobile = useSelector(state => state.global.isMobile)

  useEffect(() => {
    const list = data.filter(item => item.type !== 'video').map(item => item.url)
    setVideoLen(data.length - list.length)
    setList(list)
  }, [data])

  useEffect(() => {
    if (!isMobile) {
      const arr: SeriesGallery[][] = []
      data.forEach((item, i) => {
        const idx = Math.floor(i / 6)
        if (i % 6 === 0) {
          arr[idx] = []
        }
        arr[idx].push(item)
      })
      setPageData(arr)
      console.log(arr)
    }
  }, [data, isMobile])

  useEffect(() => {
    const videos = document.querySelectorAll('video');
    if(!rest.show && videos.length !== 0){
      videos.forEach( item =>{
        item.currentTime = 0;
        item.pause()
        setTimeout(()=>{
          item.src = item.src;
        },10)
      })
    }
  }, [rest.show])

  return (
    <Overlay {...rest}>
      <div className={styles.gallery}>
        <h2>精彩赏析</h2>
        <div className={styles.container}>
          {isMobile ? 
          <div className={styles.list}>
            {data.map((item, index) => <div key={index} className={styles.item}>
              <GalleryMedia show={rest.show || false} code={code} data={item} index={index} prefix={prefix} />
            </div>)}
          </div>
          :
          (rest.show && ((navNextEl.current && navNextEl.current) || pageData?.length === 1) && <Swiper
            className={styles.pager}
            modules={[Navigation]}
            navigation={{
              nextEl: navNextEl.current,
              prevEl: navPrevEl.current,
            }}
            spaceBetween={8}
          >
            {pageData?.map((paged, index) => <SwiperSlide key={index}>
              <div className={styles.list}>
                {paged.map((item, itemIdx) => <div key={itemIdx} className={styles.item} onClick={item.type !== 'video' ? () => {
                  onImageClick?.({list, index: (index * 6) + itemIdx  - videoLen})
                } : undefined}>
                  <GalleryMedia show={rest.show || false} code={code} data={item} index={itemIdx} prefix={prefix} />
                </div>)}
              </div>
            </SwiperSlide>)}
          </Swiper>)}
        </div>
        {pageData && pageData?.length > 1 && <div className={classNames(styles['nav-btns'], 'pc')}>
          <div ref={navPrevEl} className={classNames(styles.btn, styles['btn-prev'])}>
            <SvgIcon icon="chevron-right" />
          </div>
          <div ref={navNextEl} className={classNames(styles.btn, styles['btn-next'])}>
            <SvgIcon icon="chevron-right" />
          </div>
        </div>}
      </div>
    </Overlay>
  )
}

export default Gallery
