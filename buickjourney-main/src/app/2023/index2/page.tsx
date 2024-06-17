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
import {trackPv} from '@futian/buick-components'
import Image from 'next/image';
const Page = () => {

  useEffect(() => {
    trackPv('寰行中国-2023-琼海逐浪')
  },[])
  return (
    <main className={styles.main}>
      <KvVideo meida={[
        {
          device: "pc",
          url: "/act/buickjourney/img/2023/index2/kv.jpg",
        },
        {
          device: "mob",
          url: "/act/buickjourney/img/2023/index2/mob/kv.jpg",
        }
      ]} video="/act/buickjourney/img/2023/home/video/2.mp4" />
      <NavigationCommon year="2023" />
      <Subnav />
      <div className={styles.section}>
        <div className={styles['section-text']}>
          <h4>琼海逐浪</h4>
          沿海岸自南而北逐浪而行，在热带雨林中披荆斩棘，在自然怀抱中探索发现，感受天涯海角的别样风情。
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
                  <source srcSet='/act/buickjourney/img/2023/index2/page-1-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-1-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-1-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-1-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-1-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-1-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-1-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-1-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从三亚出发，车程约1.5小时</div>
              <h4>神州半岛灯塔</h4>
            </div>
            <div className={styles.text}>
              <p>灯塔的弧形海堤延伸至大海，护堤东边浪潮汹涌，在阳光下波光粼粼，西边海浪被护堤保护，海面平静且深邃。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index2/page-2-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-2-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-2-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-2-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-2-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-2-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从三亚出发，车程约1.3小时</div>
              <h4>分界洲岛</h4>
            </div>
            <div className={styles.text}>
              <p>分界州岛是海南南北气候的分界线，岭北大雨滂沱，岭南却是阳光灿烂，亦是调换心情、感悟人生的 “心灵的分界线”。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index2/page-3-1.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-3-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-3-2.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-3-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-3-3.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-3-3.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-3-4.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-3-4.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index2/page-3-5.jpg' media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index2/mob/page-3-5.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从分界洲岛出发，车程约0.5小时</div>
              <h4>万宁隆苑咖啡庄园</h4>
            </div>
            <div className={styles.text}>
              <p>“万福骈臻、万家康宁”，隆苑咖啡庄园位于海南万宁兴隆华侨农场,是中国第一家有机咖啡生产的基地。 这里的咖啡从种植、采摘到加工,都是天然有机的方式,保留了咖啡特有的香醇。 </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </main>
  );
};

export default Page;