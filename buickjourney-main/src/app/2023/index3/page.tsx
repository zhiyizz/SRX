"use client";
import React, { useState,useEffect } from 'react';
import styles from '@styles/page.module.scss';
import NavigationCommon from '@components/Navigation';
import Subnav from '../Subnav';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MotionDiv from '@components/MotionDiv';
import { Pagination, Navigation } from 'swiper/modules';
import KvVideo from '@components/KvVideo';
import { trackPv } from '@futian/buick-components';
const Page = () => {

  useEffect(() => {
    trackPv('寰行中国-2023-炼道青城')
  },[])
  return (
    <main className={styles.main}>
      <KvVideo meida={[
        {
          device: "pc",
          url: "/act/buickjourney/img/2023/index3/kv.jpg",
        },
        {
          device: "mob",
          url: "/act/buickjourney/img/2023/index3/mob/kv.jpg",
        }
      ]} video="/act/buickjourney/img/2023/home/video/3.mp4" />
      <NavigationCommon year="2023" />
      <Subnav />
      <div className={styles.section}>
        <div className={styles['section-text']}>
          <h4>炼道青城</h4>
          青石小巷，茶馆雅座，禅心之所，群山毓琇，高山融雪，悠久的历史、美味的川菜、宽阔的街巷感悟超越尘世的文艺之美。
        </div>
        <div className={styles.group}>
          <MotionDiv className={styles.swiperGroup}>
            <Swiper
              centeredSlides={true}
              navigation
              modules={[Pagination, Navigation]}
              pagination
              slidesPerView={1.15}
              spaceBetween={20}
              loop
              breakpoints={{
                767.98: {
                  slidesPerView: 1,
                  centeredSlides: false,
                  spaceBetween: 0,
                }
              }}
    
            >
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-1-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-1-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-1-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-1-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-1-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-1-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-1-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-1-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-1-5.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-1-5.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从都江堰出发，车程约0.5小时</div>
              <h4>青城山</h4>
            </div>
            <div className={styles.text}>
              <p>群峰环绕起伏、林木葱茏幽翠，享有“青城天下幽”的美誉。全山林木青翠，四季常青，诸峰环峙，状若城廓，丹梯千级，曲径通幽，以幽洁取胜。</p>
            </div>
          </MotionDiv>
        </div>
        <div className={styles.group}>
          <MotionDiv className={styles.swiperGroup}>
            <Swiper
              centeredSlides={true}
              navigation
              modules={[Pagination, Navigation]}
              pagination
              slidesPerView={1.15}
              spaceBetween={20}
              loop
              breakpoints={{
                767.98: {
                  slidesPerView: 1,
                  centeredSlides: false,
                  spaceBetween: 0,
                }
              }}
     
            >
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-2-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-2-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-2-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-2-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-2-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-2-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-2-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-2-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从青城山出发，车程约1小时</div>
              <h4>蒲虹路</h4>
            </div>
            <div className={styles.text}>
              <p>181个回头弯，山高、谷深、坡陡，全线相对高差达800余米，拥有美丽的自然风光，可以直接眺望赵公山和四姑娘山。同时，在垭口的藤原豆腐店让蒲虹路成为了一个独特的文化和社交中心。</p>
            </div>
          </MotionDiv>
        </div>

        <div className={styles.group}>
          <MotionDiv className={styles.swiperGroup}>
            <Swiper
              centeredSlides={true}
              navigation
              modules={[Pagination, Navigation]}
              pagination
              slidesPerView={1.15}
              spaceBetween={20}
              loop
              breakpoints={{
                767.98: {
                  slidesPerView: 1,
                  centeredSlides: false,
                  spaceBetween: 0,
                }
              }}
    
            >
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-3-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-3-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-3-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-3-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index3/page-3-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index3/mob/page-3-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从蒲虹路出发，车程约0.3小时</div>
              <h4>虹口漂流</h4>
            </div>
            <div className={styles.text}>
              <p>素有“西部第一漂”之称的虹口漂流，全长10公里，落差明显，不仅可以感受远喧嚣而返林、近山野而归真的生态魅力，更能享受“与浪共舞，激情飞扬”的惊险乐趣。 </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </main>
  );
};

export default Page;