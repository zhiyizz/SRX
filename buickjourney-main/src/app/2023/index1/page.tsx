"use client";
import React,{useEffect, useState} from 'react';
import styles from '@styles/page.module.scss';
import NavigationCommon from '@components/Navigation';
import Subnav from '../Subnav';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MotionDiv from '@components/MotionDiv';
import { Pagination,Navigation } from 'swiper/modules';
import KvVideo from '@components/KvVideo';
import { trackPv  } from '@futian/buick-components'
const Page = () => {

  useEffect(() => {
    trackPv('寰行中国-2023-投资人线')
  },[])
  return (
    <main className={styles.main}>
      <KvVideo  meida={[
        {
          device:"pc",
          url:"/act/buickjourney/img/2023/index1/kv.jpg",
        },
        {
          device:"mob",
          url:"/act/buickjourney/img/2023/index1/mob/kv.jpg",
        }
      ]} video="/act/buickjourney/img/2023/home/video/1.mp4" />
      <NavigationCommon year="2023" />
      <Subnav />
      <div className={styles.section}>
        <div className={styles['section-text']}>
          <h4>溯源华夏</h4>
          九曲黄河万里沙，浩浩汤汤，蕴育出璀璨瑰丽的华夏文明。从始建于西秦的“世界文化遗产”炳灵寺石窟，到贺兰山下中国最后一座保存完整的边塞古城——永泰古城，这片伴生河西走廊的西北大地，因古华夏文明之源与东方丝路而响彻世界，如今更是在风能、水能、太阳能领域，成长为华夏的能源地标。
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
                  <source srcSet='/act/buickjourney/img/2023/index1/page-1-1.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-1-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
              <picture>
                  <source srcSet='/act/buickjourney/img/2023/index1/page-1-2.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-1-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从兰州出发，车程约1.5小时</div>
              <h4>黄河文化博物馆/刘家峡水库</h4>
            </div>
            <div className={styles.text}>
              <p>黄河文化博物馆是目前全国唯一的治水文化主题景区和全国唯一的水电博览中心，该馆以黄河为宏大的叙事背景，将黄河文化、黄河治理、黄河水电、黄河风光等内容精心编排，在展示源远流长的黄河文化的同时，也展现了一代又一代的华夏儿女在黄河治理上所取得的卓越成就，深刻承载着黄河流域的风土人情。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index1/page-2-1.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-2-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index1/page-2-2.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-2-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从刘家峡水库沿水路，船程约1小时</div>
              <h4>炳灵国家地质公园</h4>
            </div>
            <div className={styles.text}>
              <p>黄河峡谷地貌、炳灵石窟与刘家峡水库，让炳灵国家地质公园 “天下第一奇观”的美誉实至名归，宏大的地质遗迹与极具地学研究价值的北地石林景观让这里声名远播。而作为中国六大石窟之一的炳灵寺石窟，更是在宗教发展与人文技艺方面，为这里赋予了更多令人神往的神秘色彩。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index1/page-3-1.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-3-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index1/page-3-2.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-3-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从白银出发，路程约2.5小时</div>
              <h4>永泰古城遗址</h4>
            </div>
            <div className={styles.text}>
              <p>永泰古城，因形似神龟，又名永泰龟城，坐落于景泰县寺滩乡老虎山北麓，是古丝绸之路要隘。据传，汉武帝时期，卫青、霍去病收复河西后曾在此地复建城池屯兵设防，为这座由明代兵备副使邢云路督工建造的边塞古城增添了更多传奇色彩。古城始建于万历三十六年（1607年）春，于三十七年（1608年）夏落成，已有400多年的历史，是明政府为防御北方的少数民族入侵而修建，建成后即成为军事要塞，《读史方舆纪要》中记述：“明时自兰州以北，常为寇冲，往往设置重兵驻于此（即景泰），保障西陲”。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index1/page-4-1.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-4-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index1/page-4-2.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-4-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从景泰出发，车程约2小时</div>
              <h4>沙坡头国家级自然保护区</h4>
            </div>
            <div className={styles.text}>
              <p>被世人誉为“沙都”的沙坡头国家级自然保护区是中国第一个国家级的沙漠生态自然保护区，也是中国三大鸣沙——沙坡鸣钟所在地；“大漠孤烟直，长河落日圆”——这里诞生了唐代边塞诗人王维那首脍炙人口的《使至塞上》，黄河奔涌向东，于此邂逅腾格里沙漠，在即将进入“几”字弯时，划出一道完美的半圆，圆弧外，是浩瀚无垠的金色沙海，圆弧内，是河水滔滔与满目苍翠。入夜后，这里更是星河璀璨。置身沙海，仰望星空，仿佛星辰触手可及。</p>
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
                  <source srcSet='/act/buickjourney/img/2023/index1/page-5-1.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-5-1.jpg" alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <picture>
                  <source srcSet='/act/buickjourney/img/2023/index1/page-5-2.jpg'  media="(min-width:768px)" />
                  <img src="/act/buickjourney/img/2023/index1/mob/page-5-2.jpg" alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
          </MotionDiv>
          <MotionDiv className={styles.container}>
            <div className={styles.title}>
              <span className={styles.en}>TRIP HIGHLIGHTS</span>
              <div className={styles.subTitle}>从沙坡头出发，车程约1小时</div>
              <h4>腾格里光伏基地</h4>
            </div>
            <div className={styles.text}>
              <p>作为最具代表性的国家新能源战略重点配套工程，宁夏腾格里沙漠3GW新能源基地光伏复合项目，建成于2023年4月，是国家规划建设的千万千瓦级“沙戈荒”新能源基地，也是国家第一条以开发沙漠光伏大基地、输送新能源为主的特高压输电通道——“宁电入湘”工程重点配套项目。项目规划容量3GW，总投资超150亿元。投产后，年发电量达57.8亿千瓦时。每年可节约标准煤192万吨，减少二氧化碳排放466万吨、二氧化硫排放3.39万吨、氮氧化物排放5万吨。项目围绕沙漠化程度、生态环境及植被类型等实际情况，立足现有流动沙丘固沙、治沙经验和荒漠化土地生态修复技术，以治沙为核心，边建设边修复，实现了项目区社会、经济、生态效益的最大化。对推动构建清洁低碳、安全高效的能源体系具有重要意义。</p>
            </div>
          </MotionDiv>
        </div>


      </div>
    </main>
  );
};

export default Page;