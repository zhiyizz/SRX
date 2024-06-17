'use client'

import { useState, useLayoutEffect} from 'react'
import classNames from "classnames"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styles from '@styles/electra_x.module.scss'
import VideoAutoPlay from '../../components/VideoAutoPlay'
import type { NextPage } from 'next'
import AliImage from '@components/AlImage'
import MediaComponent from '@components/MediaComponent'
import { combineUrl } from '@utils/helper'

gsap.registerPlugin(ScrollTrigger);

const exteriorData = [
  {
    url: '1',
    title: '别克全新飞檐展翼前脸',
    text: '以极致纯净的方式<br />重新演绎别克经典展翼元素'
  },
  {
    url: '2',
    title: '晶鳞点阵格栅',
    text: '丰富的双层几何型面<br />与背后阵列律动LED光线交相呼应<br />带来通透璀璨，变幻莫测的视觉光效'
  },
  {
    url: '3',
    title: '全LED阵列律动灯光',
    text: '灯光如琴键般动态流转变化<br />呈现富有韵律又张力十足的势能扭转光迹'
  },
  {
    url: '4',
    title: '21吋蝶翼动态低阻轮毂',
    text: '一体式低风阻设计<br />轮毂上的GS专属图案营造向外扩张的视觉感受<br />纹理中配备的呼吸灯光可显示轮胎健康状态'
  },
  {
    type: 'jpg',
    url: '5',
    title: '光感全景天幕',
    text: '可变全景天幕前后一体贯穿<br />内外无界，拓宽视野一览无余'
  },
  {
    url: '6',
    title: '全新迭代的别克GS潮流运动设计<br />',
    text: `GS专属零重力运动座椅<span>抗风阻运动变形模式<br/><i>&bull; GS动态气流套件 &bull; 可调节扩散器 &bull; 动态平衡尾翼</i></span>GS限定纹样`
  }
]
const interiorData = [
  {

    type: 'jpg',
    url: '1',
    title: '灵犀动态氛围灯',
    text: '根据场景智能切换氛围<br />与音乐联动，灯光跟随旋律展示不同效果'
  },
  {
    url: '2',
    title: 'iKey手机钥匙',
    text: '开锁、控车、泊车、借车，一部手机全搞定'
  },
  {
    url: '3',
    title: '全景HUD',
    text: '超宽幅实时路况反馈<br />带来自在无界的交互体验'
  },
  {
    type: 'gif',
    url: '4',
    title: `语音控制<br />自定义功能组合`,
    text: '语音指令分区<br />近50项情景功能随心而动'
  }
]

const PREFIX = 'https://static.buick.com.cn/assets/img/electra_x'

const Electra_x: NextPage = () => {
  const [player, setPlayer] = useState<boolean>(false)

  const playerFn = () => {
    const tvc_player = document.getElementById('tvc_player') as HTMLVideoElement
    tvc_player.play()
    setPlayer(true)
  }

  const palyerStop = () => {
    const tvc_player = document.getElementById('tvc_player') as HTMLVideoElement
    tvc_player.pause()
    setPlayer(false)
  }

  useLayoutEffect(() => {
    //part2 
     ScrollTrigger.refresh();
     ScrollTrigger.sort();
    const part2 = document.getElementsByClassName(styles.part2)[0];
    const en = part2.getElementsByClassName(styles.en)
    const title = part2.getElementsByTagName('h3')
    const cn = part2.getElementsByClassName(styles.cn)
    const cur =  gsap.timeline({
      scrollTrigger: {
        trigger: part2,
        scrub: true,
        invalidateOnRefresh: true,
     
        start: () => 'top 60%',
        end: () => 'bottom bottom'
      }
    })
      .to(en,  { y: 0, opacity:1,duration: 1 })
      .to(title,  { y: 0,opacity:1, duration: 1 })
      .to(cn,  { y: 0,opacity:1, duration: 1 })

    return () => {
      cur.scrollTrigger?.kill()
    }
  }, []);
  useLayoutEffect(() => {
     //part3 
     ScrollTrigger.refresh();
     ScrollTrigger.sort();
     const part3 = document.getElementsByClassName(styles.part3)[0];
     const part3_en = part3.getElementsByClassName(styles.en)[0];
     const part3_title = part3.getElementsByClassName('title')[0];
     const p3_idea = part3.getElementsByClassName(styles.idea)[0]
     const p3_idea_copy = part3.getElementsByClassName(styles['idea_copy'])[0]
     const cur = gsap.timeline({
       scrollTrigger: {
         trigger: part3,
         scrub: true,
      
         invalidateOnRefresh: true,
         start: () => 'top 60%',
         end: () => 'bottom bottom'
       }
     })
       .to(part3_en,  { y: 0, opacity:1, duration: 1 })
       .to(part3_title,  { y: 0, opacity:1, duration: 1 })
     const wrap = gsap.timeline({
       scrollTrigger: {
         trigger: part3,
         scrub: true,
         pin: true,
         invalidateOnRefresh: true,
         end: () => '+=200%',
       }
     })
     wrap.to(p3_idea, {
       y: 0, duration: 2, delay: 1, onComplete: () => {
         wrap.to([part3_en, part3_title], { opacity: 0 })
       }
     })
       .to(p3_idea_copy, { opacity: 1, duration: 1 })

       return () => {
         wrap.scrollTrigger?.kill()
         cur.scrollTrigger?.kill()
       }
   }, []);



   useLayoutEffect(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.sort();
       const element = document.getElementsByClassName('part4')[0];
       const container = element.getElementsByClassName(styles.container)[0];
     
       const scroll = element.getElementsByClassName(styles['scroll-item'])[0];
       const title = element.getElementsByClassName(styles['titles'])[0];
       let wrap:gsap.core.Timeline,cur: gsap.core.Timeline;

       const switchMedia = gsap.matchMedia();
       switchMedia.add("(min-width: 769px)", () => {
        gsap.set(container, { x: window.innerWidth / 1920 * 340 });
        cur =  gsap.timeline({
           scrollTrigger: {
             trigger: container,
             scrub: 1,
          
             end: () => "+=" + window.innerHeight
           }
         }).from(title, { y: 100, opacity: 0, duration: 1 }).from(scroll, { y: 100, opacity: 0, duration: 1 })
         wrap = gsap.timeline({
           scrollTrigger: {
             pin: true,
             scrub: 1,
          
             trigger: element,
             invalidateOnRefresh: true,
             end: () => '+=' + window.innerHeight * exteriorData.length
           },
           defaults: { ease: "none", duration: 1 }
         })
         wrap.to('.itemAni', {
           x: () => -(scroll.scrollWidth - document.documentElement.clientWidth * 0.4) + 'px'
         },0)
           .to('.titleAni', {
             y: 0,
             duration: 0.2,
             stagger: {
               amount: 0.8
             }
           }, 0)
           .to('.textAni', {
             y: 0,
             duration: 0.2,
             stagger: {
               amount: 0.8
             }
           }, 
           '-=1')
       })
       switchMedia.add("(max-width: 768px)", () => {
        const left = window.innerWidth / 750 * 60
        gsap.set(container, { x: left });
       cur =  gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: 1,
         
            end: () => "+=" + window.innerHeight,
          }
        }).from(scroll, { y: 100, opacity: 0, duration: 1 })
        wrap = gsap.timeline({
          scrollTrigger: {
            pin: true,
            scrub: 1,
         
            trigger: element,
            invalidateOnRefresh: true,
            end: () => '+=' + ((window.innerHeight * exteriorData.length))
          },
          defaults: { ease: "none", duration: 1 }
        })
        wrap.to('.itemAni', {
          x: () => -(scroll.scrollWidth - (document.documentElement.clientWidth * 0.8)) + (left / 2) + 'px'
        },
          0
        )
          .to('.titleAni', {
            y: 0,
            duration: 0.2,
            stagger: {
              amount: 0.8
            }
          }, 0)
          .to('.textAni', {
            y: 0,
            duration: 0.2,
            stagger: {
              amount: 0.8
            }
          }, '-=1')
       })


       return () => {
        
         cur.scrollTrigger?.kill();
         wrap.scrollTrigger?.kill();
         switchMedia?.kill(true);
       
       }
     }, [])
     useLayoutEffect(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.sort();
      //part5_1 
      const part5 = document.getElementsByClassName(styles.part5)[0];
      const clump = document.getElementsByClassName(styles.clump)[0];
      const part5_sub = document.getElementsByClassName(styles.part5_sub)[0];
      const en = part5.getElementsByClassName(styles.en)
      const title = part5.getElementsByTagName('h3')
      const cn = part5.getElementsByClassName(styles.cn)
      const cur = gsap.timeline({
        scrollTrigger: {
          trigger: part5,
          scrub: true,
       
          invalidateOnRefresh: true,
          start: () => 'top 60%',
          end: () => 'bottom bottom'
        }
      })
        .to(en,  { y: 0,opacity:1, duration: 1 })
        .to(title,  { y: 0,opacity:1, duration: 1 })
        .to(cn,  { y: 0,opacity:1, duration: 1 })
      const main = gsap.timeline({
        scrollTrigger: {
          trigger: clump,
          pin: true,
          scrub: 1,
       
          invalidateOnRefresh: true,
          start: () => 'top top',
          end: () => '+=300%'
        }
      })
      main.to(part5, { yPercent: -100, duration: 3, delay: 1 })
        .to('.pro1,.t1', { y: 100, opacity: 0, duration: 3 })
        .to([part5_sub.getElementsByClassName(styles.t2)[0], part5_sub.getElementsByClassName(styles.pro2)[0]], { y: 0, opacity: 1, duration: 3 })

        return () => {
          cur.scrollTrigger?.kill();
          main.scrollTrigger?.kill();
        }
    }, [])
    useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const part6 = document.getElementsByClassName(styles.part6)[0];
     const p6_h = part6.getElementsByTagName('h3')
     const p6_cn = part6.getElementsByTagName('p')
     const cur =  gsap.timeline({
       scrollTrigger: {
         trigger: part6,
         scrub: true,
      
         invalidateOnRefresh: true,
         start: () => "top 70%",
         end: () => "+=70%",
       }
     })
       .to(p6_h, { y: 0, opacity:1,duration: 1 })
       .to(p6_cn,  { y: 0,opacity:1, duration: 1 })

       return () => {
         cur.scrollTrigger?.kill();
       }
   }, [])


   useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const part7 = document.getElementsByClassName(styles.part7)[0];
     const img_scroll = part7.getElementsByClassName(styles.img_scroll)[0]
     const en = part7.getElementsByClassName(styles.en)
     const title = part7.getElementsByTagName('h3')
     const cn = part7.getElementsByClassName(styles.cn)
     const cur = gsap.timeline({
       scrollTrigger: {
         trigger: part7,
         scrub: true,
      
         invalidateOnRefresh: true,
         start: () => 'top 60%',
         end: () => 'bottom bottom'
       }
     })
       .to(en,  { y: 0, opacity:1, duration: 1 })
       .to(title, { y: 0,  opacity:1,duration: 1 })
       .to(cn, { y: 0, opacity:1, duration: 1 })
     const main = gsap.timeline({
       scrollTrigger: {
         trigger: part7,
         pin: true,
         scrub: 1,
      
         invalidateOnRefresh: true,
         end: () => "=+200%"
       }
     })
     main.to(img_scroll, {
       x: () => -(img_scroll.scrollWidth - document.documentElement.clientWidth) + 'px'
     },
       0
     )

     return () => {
       cur.scrollTrigger?.kill();
       main.scrollTrigger?.kill();
     }
   }, [])

   useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const part8 = document.getElementsByClassName(styles.part8)[0];
     const p8_h = part8.getElementsByTagName('h3')
     const p8_video = part8.getElementsByClassName(styles['video-wrap'])
     const p8_param = part8.getElementsByClassName(styles['param'])
     const p8_p = part8.getElementsByClassName(styles.cn);
     /*
         start: "top 70%", 目标顶点距离屏幕顶部的位置
         end: "+=70%", 结束的位置减去顶部溢出的位置
     */
     const cur = gsap.timeline({
       scrollTrigger: {
         trigger: part8,
         scrub: true,
      
         invalidateOnRefresh: true,
         start: () => "top 70%",
         end: () => "+=70%",

       }
     })
       .to(p8_h,  { y: 0, opacity: 1, duration: 2 })
       .to(p8_video, { opacity: 1, duration: 2 })
       .to(p8_param, { y: 0, opacity: 1, duration: 2,delay:1 })
       .to(p8_p, { y: 0, opacity: 1, duration: 2 ,delay:1})

       return () => {
         cur.scrollTrigger?.kill();
       }
   }, [])


   useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const part9 = document.getElementsByClassName(styles.part9)[0];
     const light = part9.getElementsByClassName(styles.light)[0];
     const p9_h = part9.getElementsByTagName('h3')
     const p9_p = part9.getElementsByClassName(styles.cn)[0];
     const cur = gsap.timeline({
       scrollTrigger: {
         trigger: part9,
         scrub: true,
         pin: true,
      
         invalidateOnRefresh: true,
         end: () => "+=150%",

       }
     })
       .to(light,  { y: 0, opacity: 1, duration: 1, delay: 1 })
       .to([p9_h, p9_p],{ y: 0, opacity: 1, duration: .5 }, '-=1')

       return () => {
         cur.scrollTrigger?.kill();
       }
   }, [])
   useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const element = document.getElementsByClassName('part10')[0];
     const container = element.getElementsByClassName(styles.container)[0];
     const scroll = element.getElementsByClassName(styles['scroll-item'])[0];
     let tl:gsap.core.Timeline,cur: gsap.core.Timeline;

     const switchMedia = gsap.matchMedia();
     switchMedia.add("(min-width: 769px)", () => {
      gsap.set(container, { x: window.innerWidth / 1920 * 340 });
      cur = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: 1,
       
          end: () => "+=" + window.innerHeight
        }
      }).from(scroll, { y: 100, opacity: 0, duration: 1 })
       tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          scrub: 1,
          trigger: element,
       
          invalidateOnRefresh: true,
          end: () => '+=' + window.innerHeight * interiorData.length
        },
        defaults: { ease: "none", duration: 1 }
      })
      tl.to('.itemAni2', {
        x: () => -(scroll.scrollWidth - document.documentElement.clientWidth * 0.4) + 'px'
      },
        0
      )
        .to('.titleAni2', {
          y: 0,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, 0)
        .to('.textAni2', {
          y: 0,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, '-=1')
     })
     switchMedia.add("(max-width: 768px)", () => {
      const left = window.innerWidth / 750 * 60
      gsap.set(container, { x: left });
      cur =  gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: 1,
       
          end: () => "+=" + window.innerHeight,
        }
      }).from(scroll, { y: 100, opacity: 0, duration: 1 })
       tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          scrub: 1,
          trigger: element,
       
          invalidateOnRefresh: true,
          end: () => '+=' + ((window.innerHeight * interiorData.length))
        },
        defaults: { ease: "none", duration: 1 }
      })
      tl.to('.itemAni2', {
        x: () => -(scroll.scrollWidth - (document.documentElement.clientWidth * 0.8)) + (left / 2) + 'px'
      },
        0
      )
        .to('.titleAni2', {
          y: 0,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, 0)
        .to('.textAni2', {
          y: 0,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, '-=1')

     })


    //  matchMedia.add("(min-width: 769px)", () => {
      
    //  });
    //  matchMedia.add("(max-width: 768px", () => {
      
    //  });
     return () => {
       tl.scrollTrigger?.kill(true);
       cur.scrollTrigger?.kill();
       switchMedia?.kill(true);
     }
   }, [])
   useLayoutEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
     const part11 = document.getElementsByClassName(styles.part11)[0];
     const part11_container = part11.getElementsByClassName(styles.container)[0];
     const part11_h3 = part11.getElementsByTagName('h3');
     const part11_cn = part11.getElementsByClassName(styles.cn)[0];
     const part11_car = part11.getElementsByClassName(styles.car)[0];
     const part11_copy = part11.getElementsByClassName(styles.copy)[0];
     let tl:gsap.core.Timeline,cur: gsap.core.Timeline;
     const switchMedia = gsap.matchMedia(),
      breakPoint = 769;

    switchMedia.add({
      // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,

    }, (context) => {

      // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
      const { isDesktop } = context.conditions!;

       tl = gsap.timeline({
        scrollTrigger: {
          trigger: part11,
          scrub: 1,
          pin: true,
       
          invalidateOnRefresh: true,
          start: () => 'top top',
          end: () => '+=100%'
        }
      })
 
       cur = gsap.timeline({
        scrollTrigger: {
          trigger: part11_container,
          scrub: 1,
       
          invalidateOnRefresh: true,
          start: () => 'top 70%',
          end: () => '+=40%'
        }
      }).to(part11_h3,  { y: 0, opacity:1, duration: 1 })
        .to(part11_cn,  { y: 0,opacity:1, duration: 1 })
        tl.to(part11_car, { y: 0, duration: 1 })
        .to(part11_copy, { top: isDesktop?'5vh':'8vh', scale: isDesktop?'.45':'.85', duration: 1 }, '-=1')
 
      return () => {
        // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      }
    });


       return () => {
         tl.scrollTrigger?.kill()
         cur.scrollTrigger?.kill()
       } 

   }, [])

   useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
      // This in case a scroll animation is active while the route is updated
      gsap.killTweensOf(window);
    };
  },[])
  // useLayoutEffect(() => {
  //   ScrollTrigger.refresh();
  //   ScrollTrigger.sort();
  // },[])
  return (
    <main className={classNames(styles['electra_x'],styles.main)}>
    {/* <BasePage className={classNames(styles['electra_x'],styles.main)} title="ELECTRA-X" seriesData={series} categoryList={category} hideNav={hideNav} disableScroll={disableScroll} > */}
        <div className={classNames(styles['full-page-wrapper'])}>
          {/* <!-- part1  start--> */}
          <section className={classNames(styles['full-page'], styles['part1'])}>
            <div className={classNames(styles.bg)}>
              <VideoAutoPlay data={{ pc: combineUrl(PREFIX, 'tvc_trivia'), m: combineUrl(PREFIX, 'tvc_m_trivia') }} />
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles['img_rel'])}>
                <MediaComponent className={styles.p1_logo}
                  media={[
                    { device: 'mob', url: 'p1_m_logo.png' },
                    { device: 'pc', url: 'p1_logo.png' },
                  ]}
                  prefix={PREFIX}
                />
                <div className={classNames(styles.more)} onClick={() => playerFn()} >观看视频</div>
              </div>
            </div>
          </section>
          {/* <!-- part1  end--> */}
          {/* <!-- part2 start --> */}
          <section className={classNames(styles['full-page'], styles['part2'])}>
            <div className={classNames(styles.bg)}>
              <VideoAutoPlay data={{ pc: combineUrl(PREFIX, 'p2_video'), m: combineUrl(PREFIX, 'p2_m_video') }} />
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.copy)}>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.en)}>Innovation & Stronger</p>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <h3>生来更强&nbsp;&nbsp;智电新生</h3>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.cn)}>
                    诞生于业界领先的全新电动车平台<span>ULTIUM</span>奥特能<br />
                    别克首款<span>ULTIUM</span>奥特能平台纯电概念<span>SUV ELECTRA-X</span><br />
                    让未来出行畅享自由
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- part2 end --> */}
          {/* <!-- part3 start --> */}
          <section className={classNames(styles['full-page'], styles['part3'])}>
            <div className={classNames(styles.bg)}>
              <VideoAutoPlay data={{ pc: combineUrl(PREFIX, 'p3_video'), m: combineUrl(PREFIX, 'p3_m_video') }} />
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.copy)}>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.en)}>Natural & Creative</p>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <h3 className='title'>自然之美&nbsp;&nbsp;创生蝶变</h3>
                </div>
              </div>
              <div className={classNames(styles.idea)}>
                <div className={classNames(styles['idea_copy'])}>
                  <div className={classNames(styles.left)}>
                    <h3>
                      全新别克<br />
                      PURE Design<br />
                      纯粹设计理念<br />
                    </h3>
                  </div>
                  <div className={classNames(styles.right)}>
                    <p>
                      <span>纯粹</span>
                      <b>P</b>urity
                    </p>
                    <p>
                      <span>超越</span>
                      <b>U</b>nconventional
                    </p>
                    <p>
                      <span>精致</span>
                      <b>R</b>efined
                    </p>
                    <p>
                      <span>动容</span>
                      <b>E</b>xpressive
                    </p>
                    <p>以纯净，回应初心。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- part3 end --> */}
          {/* <!-- part4 start --> */}
          <section className={classNames(styles['full-page'], styles['horziontalSlide-list'], 'horziontalSlide', 'part4')} >
            <div className={classNames(styles.bg)}>
              <div className={classNames(styles.gradient)}></div>
            </div>
            <div className={classNames(styles['container'])}>
              {exteriorData ? (
                <h3 className={classNames(styles['titles'])}>PURE Design</h3>
              ) : null}
              <div className={classNames(styles['scroll-item'])}>
                {exteriorData?.map((item, i) => (
                  <div key={i} className={classNames(styles.item, 'itemAni')}>
                    <figure>
                      {item.type ? (
                        <MediaComponent
                          media={[
                            { device: 'mob', url: `exterior/${item.url}_m.${item.type}` },
                            { device: 'pc', url: `exterior/${item.url}.${item.type}` },
                          ]}
                          prefix={PREFIX}
                        />
                      ) : (
                        <VideoAutoPlay data={{ pc: combineUrl(PREFIX, `exterior/${item.url}`), m: combineUrl(PREFIX, `exterior/${item.url}_m`) }} width={630} height={610} />
                      )}
                    </figure>
                    <div className={classNames(styles.text, 'text-copy')}>
                      <div className={classNames(styles.textwrap)}>
                        <h3 className={classNames(styles['item-title'], i === 0 ? '' : ('titleAni'))} dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                      </div>
                      <div className={classNames(styles.textwrap)}>
                        <p className={classNames(styles['item-text'], i === 0 ? '' : ('textAni'))} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </section>
          {/* <!-- part4 end --> */}

          {/* <!-- part5 start --> */}
          <div className={classNames(styles.clump)}>
            <section className={classNames(styles['full-page'], styles['part5'])}>
              <div className={classNames(styles.bg)}>
                <MediaComponent
                  media={[
                    { device: 'mob', url: 'p5_m_bg.jpg' },
                    { device: 'pc', url: 'p5_bg.jpg' },
                  ]}
                  prefix={PREFIX}
                />
              </div>
              <div className={classNames(styles['container'])}>
                <div className={classNames(styles.copy)}>
                  <div className={classNames(styles.textwrap)}>
                    <p className={classNames(styles.en)}>Electric & Safety</p>
                  </div>
                  <div className={classNames(styles.textwrap)}>
                    <h3>纯电之势&nbsp;&nbsp;智驾安心</h3>
                  </div>
                  <div className={classNames(styles.textwrap)}>
                    <p className={classNames(styles.cn)}>
                      <span>ULTIUM</span>奥特能电动车平台原生打造<br />
                      搭载新一代Super Cruise超级辅助驾驶系统<br />
                      用科技，赋能想象
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className={classNames(styles['full-page'], styles['part5_sub'])}>
              <div className={classNames(styles.bg)}>
                <MediaComponent
                  media={[
                    { device: 'mob', url: 'p5_sub_m_bg.jpg' },
                    { device: 'pc', url: 'p5_sub_bg.jpg' },
                  ]}
                  prefix={PREFIX}
                />
              </div>
              <div className={classNames(styles['container'])}>
                <div className={styles['p-logo']}>
                  <AliImage src='ultium-logo.png' alt="" width={317} height={41} prefix={PREFIX} />
                </div>
                <MediaComponent className={classNames(styles.pro, 'pro1')}
                  media={[
                    { device: 'mob', url: 'p5_m_dc2.png' },
                    { device: 'pc', url: 'p5_dc2.png' },
                  ]}
                  prefix={PREFIX}
                />
                <MediaComponent className={classNames(styles.pro, styles.pro2)}
                  media={[
                    { device: 'mob', url: 'p5_m_dc1.png' },
                    { device: 'pc', url: 'p5_dc1.png' },
                  ]}
                  prefix={PREFIX}
                />
                <div className={classNames(styles.copy)}>
                  <div className={classNames(styles.text, 't1')}>
                    <h3>电池安全技术</h3>
                    <p className={classNames(styles.cn, 'pc')}>
                      从专属电芯配方到信号采集与控制系统，以及严苛的开发、测试标准<br />
                      秉持安全至上，赋能每一段愉悦出行
                    </p>
                    <p className={classNames(styles.cn, 'm')}>
                      从专属电芯配方到信号采集与控制系统<br />
                      以及严苛的开发、测试标准<br />
                      秉持安全至上，赋能每一段愉悦出行
                    </p>
                  </div>
                  <div className={classNames([styles.text, styles.t2])}>
                    <h3>无线电池管理系统</h3>
                    <p className={classNames(styles.cn, 'pc')}>采用业内首创的可实现无线连接的电池管理系统<br />
                      去除几乎90%的线束，更多电芯空间助力提升续航里程<br />
                      同步减少大量连接器和接插件<br />
                      从而减少传统线束老化带来的风险</p>
                    <p className={classNames(styles.cn, 'm')}>
                      采用业内首创的可实现无线连接的电池管理系统<br />
                      去除几乎90%的线束<br />
                      更多电芯空间助力提升续航里程<br />
                      同步减少大量连接器和接插件<br />
                      从而减少传统线束老化带来的风险</p>
                  </div>


                </div>

              </div>
            </section>
          </div>
          {/* <!-- part5 end --> */}
          {/* <!-- part6 start --> */}
          <section className={classNames(styles['full-page'], styles['part6'])}>
            <div className={classNames(styles.bg)}>
              <VideoAutoPlay data={{ pc: combineUrl(PREFIX, 'p6_video'), m: combineUrl(PREFIX, 'p6_m_video') }} />
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.copy)}>
                <div className={classNames(styles.textwrap)}>
                  <h3>新一代<br />Super Cruise<br />超级辅助驾驶系统</h3>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.cn, 'pc')}>
                    全球首款可在封闭高速公路实现轻松、智能、安全行驶的智能辅助驾驶系统<br />
                    凭借独创的驾驶员注意力监测系统和厘米级的高精度地图数据系统两大核心技术<br />
                    辅以高精度GPS定位及OnStar安吉星全天候保障<br />
                    为用户提供Super Cruise超级辅助驾驶系统、交通拥堵辅助和智能泊车辅助等安全、便利的智能驾驶功能<br />
                    更以OTA迭代升级能力为基础，为驾驶者带来安全、轻松、智能的崭新驾乘体验
                  </p>
                  <p className={classNames(styles.cn, 'm')}>
                    全球首款可在封闭高速公路实现轻松、智能、安全行驶的智能辅助驾驶系统。凭借独创的驾驶员注意力监测系统和厘米级的高精度地图数据系统两大核心技术，辅以高精度GPS定位及OnStar安吉星全天候保障，为用户提供Super Cruise超级辅助驾驶系统、交通拥堵辅助和智能泊车辅助等安全、便利的智能驾驶功能。更以OTA迭代升级能力为基础，为驾驶者带来安全、轻松、智能的崭新驾乘体验。
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- part6 end --> */}

          {/* <!-- part7 start --> */}
          <section className={classNames(styles['full-page'], styles['part7'])}>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.copy)}>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.en)}>Intelligent & Comprehensive</p>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <h3>智造之极&nbsp;&nbsp;无所不及</h3>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.cn)}>
                    全新一代VCS智能座舱<br />
                    共感未来想象，进阶感官世界
                  </p>
                </div>
              </div>

              <div className={classNames(styles.img_scroll)}>
                <MediaComponent
                  media={[
                    { device: 'mob', url: 'p7_m_bg.jpg' },
                    { device: 'pc', url: 'p7_bg.jpg' },
                  ]}
                  prefix={PREFIX}
                />
              </div>
            </div>
          </section>
          {/* <!-- part7 end --> */}

          {/* <!-- part8 start --> */}
          <section className={classNames(styles['part8'])}>
            <div className={classNames(styles['bg'])}>
              <MediaComponent
                media={[
                  { device: 'mob', url: 'p8_video_m_bg.png' },
                  { device: 'pc', url: 'p8_video_bg.png' },
                ]}
                prefix={PREFIX}
              />

            </div>
            <div className={classNames(styles['container'])}>


              <h3 className='pc'>EYEMAX 30吋一体弧面6K屏</h3>
              <h3 className='m'>EYEMAX 30吋<br />一体弧面6K屏</h3>
              <div className={classNames(styles['video-wrap'])}>
                <VideoAutoPlay data={{ pc: combineUrl(PREFIX, 'p8_video'), m: combineUrl(PREFIX, 'p8_m_video') }} width={750} height={116} />
              </div>
              <div className={classNames(styles['copy-wrap'])}>
                <div className={classNames(styles.param)}>
                  <div className={classNames(styles.item)}>
                    <span><b>6</b>K</span>
                    <p>分辨率</p>
                  </div>
                  <div className={classNames(styles.item)}>
                    <span><b>10</b>亿</span>
                    <p>色 深</p>
                  </div>
                  <div className={classNames(styles.item)}>
                    <span><b>5</b>G</span>
                    <p>高速链接</p>
                  </div>
                </div>
                <p className={classNames(styles.cn, 'pc')}>“别克鹰眼屏”采用一体式弧面造型设计，配合独有的分区背光显示，还原色彩本真<br />
                  无限接近人眼的精细度极限，带来精妙绝伦的极致观感</p>
                <p className={classNames(styles.cn, 'm')}>
                  “别克鹰眼屏”采用一体式弧面造型设计<br />
                  配合独有的分区背光显示<br />
                  还原色彩本真<br />
                  无限接近人眼的精细度极限<br />
                  带来精妙绝伦的极致观感
                </p>
              </div>

            </div>
          </section>
          {/* <!-- part8 end --> */}
          {/* <!-- part9 start --> */}
          <section className={classNames(styles['full-page'], styles['part9'])}>

            <div className={classNames(styles.bg)}>
              <MediaComponent
                media={[
                  { device: 'mob', url: 'p9_m_bg.jpg' },
                  { device: 'pc', url: 'p9_bg.jpg' },
                ]}
                prefix={PREFIX}
              />
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.light)}>
                <MediaComponent
                  media={[
                    { device: 'mob', url: 'p9_m_light.png' },
                    { device: 'pc', url: 'p9_light.png' },
                  ]}
                  prefix={PREFIX}
                />
              </div>
              <div className={classNames(styles.copy)}>

                <div className={classNames(styles.textwrap)}>
                  <h3>高通骁龙<span>8155</span>芯片</h3>
                </div>
                <div className={classNames(styles.textwrap)}>
                  <p className={classNames(styles.cn)}>
                    高性能车规级芯片，算力高达105K DMIPS
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- part9 end --> */}

          {/* <!-- part10 start --> */}
          <section className={classNames(styles['full-page'], styles['horziontalSlide-list'], 'horziontalSlide', 'part10')}>
            <div className={classNames(styles.bg)}>
              <div className={classNames(styles.gradient)}></div>
            </div>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles['scroll-item'])}>
                {interiorData?.map((item, i) => (
                  <div key={i} className={classNames(styles.item, 'itemAni2')}>
                    <figure>
                      {item.type ? (
                        <MediaComponent
                          media={[
                            { device: 'mob', url: `interior/${item.url}_m.${item.type}` },
                            { device: 'pc', url: `interior/${item.url}.${item.type}` },
                          ]}
                          prefix={PREFIX}
                        />
                      ) : (
                        <VideoAutoPlay data={{ pc: combineUrl(PREFIX, `interior/${item.url}`), m: combineUrl(PREFIX, `interior/${item.url}_m`) }} width={630} height={610} />
                      )}
                    </figure>
                    <div className={classNames(styles.text, 'text-copy')}>
                      <div className={classNames(styles.textwrap)}>
                        <h3 className={classNames(styles['item-title'], i === 0 ? '' : ('titleAni2'))} dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                      </div>
                      <div className={classNames(styles.textwrap)}>
                        <p className={classNames(styles['item-text'], i === 0 ? '' : ('textAni2'))} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </section>

          {/* <!-- part10 end --> */}
          {/* <!-- part11 start --> */}
          <section className={classNames(styles['full-page'], styles['part11'])}>
            <div className={classNames(styles['container'])}>
              <div className={classNames(styles.car)}>
                <MediaComponent
                  media={[
                    { device: 'mob', url: 'p11_m_car.jpg' },
                    { device: 'pc', url: 'p11_car.jpg' },
                  ]}
                  prefix={PREFIX}
                />

              </div>
              <div className={classNames(styles.copy)}>
                <div className={classNames(styles.textwrap)}>
                  <h3>新别克&nbsp;&nbsp;智电新生</h3>
                </div>
                <p className={classNames(styles.cn)}>
                  别克<span>ULTIUM</span>奥特能平台纯电概念SUV ELECTRA-X
                </p>
              </div>
            </div>
          </section>
          {/* <!-- part11 end --> */}
        </div>

      <div className={classNames(styles['video-popup'], { [styles.open]: player })}>
        <span className={classNames(styles.close)} onClick={() => palyerStop()}><AliImage src="close.png" width={300} height={300} alt="" prefix={PREFIX} /></span>
        <video id="tvc_player" autoPlay={true} muted={true} loop={true} controls x5-video-player-type="h5" playsInline webkit-playsinline="true">
          <source src={combineUrl(PREFIX, 'tvc.mp4')} />
        </video>
      </div>
    </main>
  );
};

export default Electra_x;
