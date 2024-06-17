'use client'

import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import { Pagination ,EffectFade} from 'swiper'
import AliImage from '@components/AlImage'
import Canvas1 from './canvas1'
import Canvas2 from './canvas2'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import styles from '@styles/tech.module.scss'
import { trackPv, trackEvent } from '@utils/tracking'
import MediaComponent from '@components/MediaComponent'
import { combineUrl } from '@utils/helper'

const nav_track = [{name:'安全',en:'/safety'},{name:'质感',en:'/sophistication'},{name:'舒适',en:'/comfort'}]

const PREFIX = 'https://static.buick.com.cn/assets/img/tech'

const Tech:NextPage = ()  => {
  const [userAgent, setuserAgent] = useState<boolean>()
  const [desktop,setDesktop] = useState<boolean>()
  const [idx,setIdx] = useState(0)
  const [active,setActive] = useState<boolean | number>(0)

  useEffect(() => {
    const video_list = document.getElementsByClassName(styles['video-list']) as HTMLCollectionOf<HTMLVideoElement>;

    const autoplay = () => {
      for(const i in video_list){
        video_list[i].play()
      }
    }
    if (typeof window.WeixinJSBridge === "undefined") {
      //未执行WeixinJSBridge 开始监听 WeixinJSBridge
      document.addEventListener('WeixinJSBridgeReady', () => {
        autoplay()
      }, false)
    } else {
      //已经执行 使用 getNetworkType 调用获取网络类型后执行
      window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
        autoplay()
      })
    }

  }, [])

  useEffect(() => {
    function resize(){
      const u = navigator.userAgent
      const android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

      if (android) {
        setuserAgent(true)
      }else{
        setuserAgent(false)
      }
      const wW = window.innerWidth
      if(wW >= 769){
        setDesktop(true)
      }else{
        setDesktop(false)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  },[])
  
  useEffect(() => {
    const main = document.getElementsByClassName(styles['swiper-main'])[0] as Element & {
      swiper: SwiperType
    };
    const swiper = main.swiper;
    swiper.on('slideChange', function (swiper: { activeIndex: number ; }) {
      trackPv('别克科技-'+nav_track[swiper.activeIndex].name,nav_track[swiper.activeIndex].en)
    });
    // const sub_nav:any = document.getElementsByClassName(styles['sub-nav-container'])[0].querySelectorAll('span')
    // sub_nav.forEach((item: { onclick: () => void; },i:number) => {
    //   item.onclick = () => {
    //     console.log(i)
    //     trackEvent(`别克科技-导航栏-${nav_track[i].name}`)
    //   }
    // })
    // const swiper_sub_main = document.querySelectorAll(styles['swiper-sub-main']);
    //  swiper_sub_main.forEach((item:any,index) => {
    //   const swiper  = item.swiper
    //    swiper.on('slideChange', (swiper: { activeIndex: number; }) =>{
    //     trackEvent(`别克科技-${nav_track[index].name}-轮播${swiper.activeIndex+1}`)
    //    })
    //  })
  },[])

  useEffect(() => {
    const main = document.getElementsByClassName(styles['swiper-main'])[0] as Element & {
      swiper: SwiperType
    }
    const swiper = main.swiper
    const sub_nav = document.getElementsByClassName(styles['sub-nav-container'])[0].querySelectorAll('span')
    sub_nav.forEach((item,index) => {
      item.onclick = () => {
        swiper.slideTo(index)
        trackEvent(`别克科技-导航栏-${nav_track[index].name}`)
      }
    })
  },[])

    return (
      // <BasePage className={classNames(styles['tech'],styles.main)} title="别克科技" seriesData={series} categoryList={category}>
      <main className={classNames(styles['tech'], styles.main)}>
      <div className={styles.kv}>
        <MediaComponent
          media={[
            { device: 'mob', url: 'kv_m.jpg' },
            { device: 'pc', url: 'kv.jpg' },
          ]}
          prefix={PREFIX}
        />

        <div className={styles.copy}>
          <p>科技赋能 驾乘体验全面升级</p>
          <h3>智电新生 驾享新境</h3>
        </div>
      </div>

      <div className={styles.container}>

        <div className={styles['swiper-box']}>
        {/* <div className={active ||  idx === 0?'sub-nav active':'sub-nav'}> */}
        <div className={classNames(styles['sub-nav'],{
          [styles.active]:active ||  idx === 0
        })}>
          <MediaComponent
            media={[
              { device: 'mob', url: `s${idx + 1}_title.png` },
              { device: 'pc', url: `s${idx + 1}_title.png` },
            ]}
            prefix={PREFIX}
          />
          <MediaComponent
            className={styles.text}
            media={[
              { device: 'mob', url: `s${idx + 1}_title_text.png` },
              { device: 'pc', url: `s${idx + 1}_title_text.png` },
            ]}
            prefix={PREFIX}
          />

         {/* <picture >
          <source srcSet={'/img/tech/s'+(idx+1)+'_title.png'} media="(max-width: 768px)" />
            <img src={'/img/tech/s'+(idx+1)+'_title.png'} alt="" />
        </picture>
        <picture >
          <source srcSet={'/img/tech/s'+(idx+1)+'_title_text.png'} media="(max-width: 768px)" />
            <img src={'/img/tech/s'+(idx+1)+'_title_text.png'} alt="" className={styles.text} />
        </picture> */}
        {/* <img src={require('../img/s1_title.png')} alt="" /> */}
        <div className={styles['sub-nav-container']} >
          <span className={idx===0?classNames((styles.nav1,styles.active)):''}></span>
          <span className={idx===1?classNames((styles.nav2,styles.active)):''}></span>
          <span className={idx===2?classNames((styles.nav3,styles.active)):''}></span>
        </div>

      </div>
        <Swiper
         modules={[Pagination]}
         onSlideChangeTransitionStart={() => {setActive(false)}}
         onSlideChangeTransitionEnd={(index) => {setIdx(index.activeIndex);setActive(index.activeIndex)}}
         className={styles['swiper-main']}
        >
          <SwiperSlide className={styles.slide}>
            {/* <picture >
              <source srcSet={s1_title_m} media="(max-width: 768px)" />
                <img src={s1_title} alt="" className="title"   />
            </picture> */}
            {/* <img src={s1_title} alt="" className="title"  /> */}
            <div className={styles.liner}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Swiper
            className={styles['swiper-sub-main']}
            // effect={'fade'}
            direction={desktop?"vertical":'horizontal'}
            autoHeight
            pagination={{
              clickable: true,
            }}
            modules={[Pagination,EffectFade]}
          >
            <SwiperSlide>
              <div className={styles['sub-slide-container']}>
                {/* <div className={userAgent?{classNames(styles.pic,styles.android)}:'pic'}> */}
                <div className={classNames(styles.pic,{
                  [styles.android]:userAgent
                })}>

                   {userAgent?(
                    <AliImage src="s1_video1.webp" alt="" className={styles.webp} width={1048} height={588} prefix={PREFIX} />
                  ):(
                    <video muted loop playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay className={styles['video-list']}  >
                    <source src={combineUrl(PREFIX, 's1_video1.mp4')} />
                  </video>
                  )}

                </div>
                <div className={styles.copy}>
                  <h3>
                    航天级数据安全
                    </h3>
                  <p>从云、管、端全面满足智能驾驶时代巨量数据运行环境下的车辆信息传输、交互与存储安全</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles['sub-slide-container']}>
              <div className={classNames(styles.pic,{
                  [styles.android]:userAgent
                })}>
                  {userAgent?(
                    <AliImage src="s1_video3.webp" alt="" className={styles.webp} width={1048} height={588} prefix={PREFIX} />
                  ):(
                    <video muted loop playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay className={styles['video-list']}  >
                    <source src={combineUrl(PREFIX, 's1_video3.mp4')} />
                  </video>
                  )}
                </div>
                <div className={styles.copy}>
                  <h3>车身安全</h3>
                  <p>被动安全、主动安全到电池管理的整车系统安全以远远超越行业标准的高冗余度保障行驶安全</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
            <div className={classNames(styles.pic,{
                  [styles.android]:userAgent
                })}>
                  {userAgent?(
                    <AliImage src="s1_video2.webp" alt="" className={styles.webp} width={1048} height={588} prefix={PREFIX} />
                  ):(
                    <video muted loop playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay className={styles['video-list']}  >
                     <source src={combineUrl(PREFIX, 's1_video2.mp4')} />
                  </video>
                  )}
                </div>
                <div className={styles.copy}>
                  <h3>
                    Super Cruise
                    </h3>
                  <p>全球用户累计行驶超3000万公里，安全0事故保障的超级辅助驾驶系统带来安全、轻松、智能的崭新驾乘体验</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Canvas1 />
             <Swiper
            className={styles['swiper-sub-main']}
            direction={desktop?"vertical":'horizontal'}
            autoHeight
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                  <AliImage src='s2_3.jpg' width={1048} height={588} prefix={PREFIX} />
                </div>
                <div className={styles.copy}>
                  <h3>UI界面</h3>
                  <p>基于行业领先的高算力平台与智能电子架构，开发不断进化更懂你的人性化UI交互系统</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                  <AliImage src='s2_2.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>氛围灯光</h3>
                  <p>无限接近自然光谱的高饱和度动态氛围灯，打造柔和纯净与色彩饱满兼而有之的仿生光感空间</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s2_4.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>新材料的应用</h3>
                  <p>以可持续发展循环利用为理念，基于行业领先的精湛制造工艺和高科技环保材料，创造极致的座舱质感</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s2_1.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>超高清大屏</h3>
                  <p>超高清大屏搭载行业领先的算力平台带来视网膜级别清晰视野与丝滑触控感受</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            {/* <picture >
              <source srcSet={s3_title_m} media="(max-width: 768px)" />
                <img src={s3_title} alt="" className="title"   />
            </picture> */}
             <Canvas2 /> 
             <Swiper
            className={styles['swiper-sub-main']}
            direction={desktop?"vertical":'horizontal'}
            autoHeight
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>
              <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                  <AliImage src='s3_4.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>听 感</h3>
                  <p>别克引以为傲的静音科技配合专业品牌音响定制的声学系统环境，带来歌剧院音效相结合的听觉享受</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s3_5.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>触 感</h3>
                  <p>坚持工匠精神的精湛技艺与智能制造加持，基于创新材质而打造出的别克专属触感</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s3_1.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>坐 感</h3>
                  <p>结合人体工程与高级材质开发的多功能座椅，提供媲美头等舱的舒适乘坐体验</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s3_3.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>嗅 感</h3>
                  <p>森林级车内空气净化生态系统搭配品牌专属特调香氛，精致呵护乘客的每一次呼吸</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles['sub-slide-container']}>
                <div className={styles.pic}>
                <AliImage src='s3_2.jpg' width={1048} height={588} prefix={PREFIX} />  
                </div>
                <div className={styles.copy}>
                  <h3>交互感</h3>
                  <p>融合空间管理、人体工学、视觉识别、声学系统、即时计算的座舱环境设计为车内乘员创造愉悦的交流互动移动空间</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          </SwiperSlide>
        </Swiper>
        </div>
      </div>
      </main>
    )
}

export default Tech
