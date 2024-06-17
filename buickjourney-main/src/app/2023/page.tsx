
"use client";
import Link from "next/link";
import styles from "@styles/page.module.scss";
import NavigationCommon from "@components/Navigation";
import Subnav from "./Subnav";
import MotionDiv from "@components/MotionDiv";
import VideoPlayer from "@components/videoPlayer";
import Anchor from "@components/Anchor";
import { useEffect } from "react";
import { trackPv } from '@futian/buick-components'
export default function Home() {
  useEffect(() => {
    trackPv('寰行中国-2023-首页')
  },[])
  return (
    <main className={styles.main}>

      <div className={styles.kv}>
        <picture>
          <source srcSet="/act/buickjourney/img/2023/home/kv.jpg" media="(min-width:768px)" />
          <img src="/act/buickjourney/img/2023/home/mob/kv.jpg" alt="" />
        </picture>
      </div>
      <NavigationCommon year="2023" />
      <Subnav />
      <div className={styles.section}>
        <div className={styles.group}>
          <MotionDiv>
            <VideoPlayer poster="/act/buickjourney/img/2023/home/poster1.jpg" video="/act/buickjourney/img/2023/home/video/1.mp4" />
          </MotionDiv>
         
          <MotionDiv className={styles.container}>
              <div className={styles.title}>·
                <span className={styles.en}>PART ONE</span>
                <h4>溯源华夏</h4>
              </div>
              <div className={styles.text}>
                <p>九曲黄河万里沙，浩浩汤汤，蕴育出璀璨瑰丽的华夏文明。从始建于西秦的“世界文化遗产”炳灵寺石窟，到贺兰山下中国最后一座保存完整的边塞古城——永泰古城，这片伴生河西走廊的西北大地，因古华夏文明之源与东方丝路而响彻世界，如今更是在风能、水能、太阳能领域，成长为华夏的能源地标。</p>
              </div>
              <Link href="/2023/index1" className={styles.linkButton} >展开旅程</Link>
              
          </MotionDiv>
        </div>

        <div className={styles.group}>
          <MotionDiv>
          <VideoPlayer poster="/act/buickjourney/img/2023/home/poster2.jpg" video="/act/buickjourney/img/2023/home/video/2.mp4" />
          </MotionDiv>
          <MotionDiv className={styles.container}>
              <div className={styles.title}>
                <span className={styles.en}>PART TWO</span>
                <h4>琼海逐浪</h4>
              </div>
              <div className={styles.text}>
                <p>沿海岸自南而北逐浪而行，在热带雨林中披荆斩棘，在自然怀抱中探索发现，感受天涯海角的别样风情。</p>
              </div>
                <Link href="/2023/index2" className={styles.linkButton} >展开旅程</Link>
          </MotionDiv>
        </div>

        <div className={styles.group}>
          <MotionDiv>
          <VideoPlayer poster="/act/buickjourney/img/2023/home/poster3.jpg" video="/act/buickjourney/img/2023/home/video/3.mp4" />
          </MotionDiv>
          <MotionDiv className={styles.container}>
              <div className={styles.title}>
                <span className={styles.en}>PART THREE</span>
                <h4>炼道青城</h4>
              </div>
              <div className={styles.text}>
                <p>青石小巷，茶馆雅座，禅心之所，群山毓琇，高山融雪，悠久的历史、美味的川菜、宽阔的街巷感悟超越尘世的文艺之美。</p>
              </div>
                <Link href="/2023/index3" className={styles.linkButton} >展开旅程</Link>
          </MotionDiv>
        </div>

        <div className={styles.group}>
          <MotionDiv>
            <VideoPlayer poster="/act/buickjourney/img/2023/home/poster4.jpg" video="/act/buickjourney/img/2023/home/video/4.mp4" />
          </MotionDiv>
          <MotionDiv className={styles.container}>
              <div className={styles.title}>
                <span className={styles.en}>PART FOUR</span>
                <h4>驭雪而行</h4>
              </div>
              <div className={styles.text}>
                <p>雪峰挺拔，宛如仙境。冬季的银装素裹仿若诗意的仙境，每片雪花都是时间的记忆。温泉涌动如明珠，为这片神秘土地添上一抹温暖的色彩，勾勒出一幅美不胜收的自然画卷。</p>
              </div>
                <Link href="/2023/index4" className={styles.linkButton} >展开旅程</Link>
          </MotionDiv>
        </div>
        <Anchor />
      </div>
    </main>
  );
}
