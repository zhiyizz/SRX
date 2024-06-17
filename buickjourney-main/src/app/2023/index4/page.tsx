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
    trackPv('寰行中国-2023-驭雪而行')
  },[])
  return (
    <main className={styles.main}>
      <KvVideo meida={[
        {
          device: "pc",
          url: "/act/buickjourney/img/2023/index4/kv.jpg",
        },
        {
          device: "mob",
          url: "/act/buickjourney/img/2023/index4/mob/kv.jpg",
        }
      ]} video="/act/buickjourney/img/2023/home/video/4.mp4" />
      <NavigationCommon year="2023" />
      <Subnav />
      <div className={styles.section}>
        <div className={styles['section-text']}>
          <h4>驭雪而行</h4>
          雪峰挺拔，宛如仙境。冬季的银装素裹仿若诗意的仙境，每片雪花都是时间的记忆。温泉涌动如明珠，为这片神秘土地添上一抹温暖的色彩，勾勒出一幅美不胜收的自然画卷。
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
                  <source srcSet='/act/buickjourney/img/2023/index4/page-1-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-1-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-1-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-1-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-1-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-1-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-1-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-1-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从华美胜地出发，车程约1.6小时</div>
              <h4>长白山</h4>
            </div>
            <div className={styles.text}>
              <p>长白峰耸入云，冰雪皑皑如银屯，长白山是欧亚大陆北半部最具有代表性的典型自然综合体，是世界少有的“物种基因库”和“天然博物馆”。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index4/page-2-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-2-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-2-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-2-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-2-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-2-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-2-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-2-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从长白山出发，车程约2小时</div>
              <h4>抚松县</h4>
            </div>
            <div className={styles.text}>
              <p>东倚壮美辽阔的长白山，近可眺长白林海，远可观巍峨雪山，是悠度惬意时光的理想之地。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index4/page-3-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-3-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-3-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-3-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-3-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-3-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index4/page-3-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index4/mob/page-3-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从抚松县出发，车程约1小时</div>
              <h4>长白山华美胜地</h4>
            </div>
            <div className={styles.text}>
              <p>位于长白山“西坡”，得天独厚的地理位置，四周森林环绕，可直接眺望长白山主峰，景色怡人。 </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </main>
  );
};

export default Page;