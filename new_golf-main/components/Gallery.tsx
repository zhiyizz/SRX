import React, { useEffect, useRef, useState } from 'react';
import { GalleryType } from '@/utils/types/home';
import AliImage from './AlImage';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '@/styles/components/gallery.module.scss';
import SwiperCore, { Navigation, Autoplay, } from "swiper";
import classNames from 'classnames';

const Gallery = ({ data }: { data: GalleryType[] }) => {
  const navPrevEl = useRef<HTMLDivElement>(null!);
  const navNextEl = useRef<HTMLDivElement>(null!);
  const [prev, setPrev] = useState<HTMLDivElement>()
  const [loop,setLoop] = useState(false);
  useEffect(() => {
    setPrev(navPrevEl.current);
  }, [])

  return (
    <div className={styles.gallery}>
      <h4>精彩鉴赏</h4>
      <div className={styles.swiper}>
        
        <Swiper
          centeredSlides={true}
          navigation={{
            nextEl: navNextEl.current!,
            prevEl: prev
          }}
          modules={[Navigation]}
          slidesPerView={1.15}
          spaceBetween={20}
          loop={loop}
          breakpoints={{
            767.98: {
              slidesPerView:  3,
              centeredSlides: false
            }
          }}
          onTransitionStart={() => {
            setLoop(true);
          }}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={'gallery-'+idx}>
              <AliImage src={`/img/${item.url}`} width={item.width} height={item.height} alt="精彩鉴赏" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles.prev, 'prev')} ref={navPrevEl}></div>
          <div className={classNames(styles.next, 'next')} ref={navNextEl}></div>
        </div>
      </div>


    </div>
  );
};

export default Gallery;