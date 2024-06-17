'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames'
import type { NextPage } from 'next'

import AliImage from '@components/AlImage'
import Iframe from '@components/Iframe'
import { trackEvent } from '@utils/tracking'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import 'swiper/scss'
import 'swiper/scss/pagination'

import styles from '@styles/app.module.scss'
import MediaComponent from '@components/MediaComponent'
import bt1 from '../../public/img/ibuick/button1.png'
import bt2 from '../../public/img/ibuick/button2.png'
import bt3 from '../../public/img/ibuick/button3.png'
import bt4 from '../../public/img/ibuick/button4.png'
import caricon from '../../public/img/ibuick/carIcon.png'
import logo from '../../public/img/ibuick/icon/logo_m.png'
import found from '../../public/img/ibuick/icon/found_m.png'
import footp from '../../public/img/ibuick/icon/footprint_m.png'
import cars from '../../public/img/ibuick/icon/car_m.png'
import ship from '../../public/img/ibuick/icon/shop_m.png'
import { divideByElement } from '@utils/helper'
import { hideFooterApp, showDownloadPopup, showFooterApp, useDispatch } from 'lib/redux'

type AppData = {
  url: string;
  version: string;
}

export type IBuickAppData = {
  ios?: AppData
  android?: AppData
}

gsap.registerPlugin(ScrollTrigger)

const Ibuick: NextPage<{
  data?: IBuickAppData
}> = ({ data }) => {
  const [current, setCurrent] = useState<number>(0)
  const [iframeShow, setIframeShow] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  // const [show, setShow] = useState<boolean>(false)

  const dispatch = useDispatch()

  const list: string[] = [
    '推荐内容每日更新，精彩生活从这里开始',
    '车主的社交天地，加入大家一起畅聊用车生活',
    '集合分类最全的官方讯息，你想了解的这里全都有'
  ]
  const urls: string[] = [
    'https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/applicationList.html',
    'https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html',
  ]

  useEffect(() => {
    dispatch(hideFooterApp())
    return () => {
      dispatch(showFooterApp())
    }
  }, [dispatch])

  useLayoutEffect(() => {
    const partCar = document.getElementsByClassName(styles['part-car'])[0]
    const car = document.getElementsByClassName(styles['car-copy'])[0]
    const cur = gsap.to(car, {
      scrollTrigger: {
        trigger: partCar,
        scrub: 3,
        invalidateOnRefresh: true,
        start: 'top 80%',
        end: 'bottom bottom',
      },
      x: 130,
      direction: 2,
      opacity: 1,
    })

    return () => {
      cur.scrollTrigger?.kill()
    }
  }, [])

  const onPopShow = useCallback((url?: string, trackName?: string) => {
    if (!url || !trackName) {
      return
    }
    const isWechat = /MicroMessenger/i.test(window.navigator.userAgent);
    
    trackEvent(trackName)
    if (isWechat) {
      dispatch(showDownloadPopup())
    } else {
      window.open(url)
    }
  }, [dispatch])

  return (
    // <BasePage
    //   className={styles.main}
    //   title="别克iBuick下载"
    //   seriesData={series}
    //   categoryList={category}
    //   hideApp
    //   popupShow={show}
    //   onPopupHide={()=> setShow(false)}
    // >
    <main className={styles.main}>
      <div className={styles.wrap}>
        <div className={classNames(styles.block, styles['pc-part1'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg1.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg1_m.jpg" alt="" />
          </picture>

          <div className={styles.content}>
            <div className={styles.logo}>
              <AliImage src={logo} width={156} height={178} />
            </div>

            <h2>一键开启 智慧用车生活</h2>
            <p>
              iBuick超级App升级进化，通过深度整合线上应用与线下服务，并融合全新的UI交互设计、更丰富的车主社区平台
              和更完善的会员成长体系，打造了集看车、购车、用车、售后、咨讯、社交、即时服务于一体的智慧服务生态圈，全方位满足用户的各类用车于社交需求。
            </p>
            {data && <div className={styles.btns}>
              <a
                onClick={() => {
                  onPopShow(data.ios?.url,'iBuick APP-苹果版下载')
                }}
                // href={iosData.path}
                target="_blank"
                rel="noreferrer"
              >
                <AliImage src={bt1} />
              </a>
              <a
                onClick={() => {
                  onPopShow(data.android?.url,'iBuick APP-安卓版下载')
                }}
                // href={androidData.path}
                target="_blank"
                rel="noreferrer"
              >
                <AliImage src={bt2} />
              </a>
            </div>}
          </div>
        </div>

        <div className={classNames(styles.block, styles['pc-part2'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg2.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg2_m.jpg" alt="" />
          </picture>
          <div className={classNames(styles.part, styles['pc-part2-content'])}>
            <div className={styles.left}>
              <h2>
                <span>发现</span>
                <span className={styles.icon}>
                  <AliImage src={found} width={52} height={52} />
                </span>
              </h2>
              <p className={styles['part2-tx']}>
              最新的官方资讯，最丰富的同城活动，最真挚的车主声音，每天来看都有新发现
              </p>
            </div>

            <div className={styles.right}>
              <Swiper
                onInit={(swiper) => console.log('init', swiper.realIndex)}
                onTransitionStart={(swiper) => setCurrent(swiper.realIndex)}
                modules={[Pagination]}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'bullets',
                  clickable: true,
                  bulletClass: 'swiper-btn',
                  bulletActiveClass: 'swiper-btn-active',
                  renderBullet(index, className) {
                    let text: string = ''
                    switch (index) {
                      case 0:
                        text = '推荐'
                        break
                      case 1:
                        text = '此刻'
                        break
                      case 2: 
                        text = '资讯'
                        break
                    }
                    return '<div class="' + className + '">' + text + '</div>'
                  },
                }}
              >
                <SwiperSlide
                  className={classNames(styles['swiper-content'], 'swiper1')}
                  key="0"
                >
                  <MediaComponent
                    prefix="img/ibuick"
                    media={[{ device: 'mob', url: 'part1a_m.png' }]}
                  />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-content']} key="1">
                  <MediaComponent
                    prefix="img/ibuick"
                    media={[{ device: 'mob', url: 'part1b_m.png' }]}
                  />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-content']} key="1">
                  <MediaComponent
                    prefix="img/ibuick"
                    media={[{ device: 'mob', url: 'part1c_m.png' }]}
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className={styles['swiper-tx']}>
              <p>{list[current]}</p>
            </div>

            <div
              className={classNames('swiper-pagination', styles['swiper-btns'])}
            ></div>
          </div>
        </div>

        <div className={classNames(styles.block, styles['pc-part3'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg3.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg3_m.jpg" alt="" />
          </picture>

          <div className={classNames(styles.part, styles['pc-part3-content'])}>
            <div className={styles.left}>
              <h2>
                <span>足迹</span>
                <span className={styles.icon}>
                  <AliImage src={footp} width={52} height={52} />
                </span>
              </h2>
              <p>
              涵盖附近充电站、纯电空间/专区、加油站、经销商，收藏常用地址，还能显示车辆定位！你能用上的，全都安排!
              </p>
            </div>

            <div className={styles.part1}>
              <MediaComponent
                prefix="img/ibuick"
                media={[{ device: 'mob', url: 'part2_m.png' }]}
              />
            </div>
          </div>
        </div>

        <div className={classNames(styles.block, styles['part-car'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg4.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg4_m.jpg" alt="" />
          </picture>
          <div className={styles.part}>
            <h2>
              <span>爱车</span>
              <span className={styles.icon}>
                <AliImage src={cars} width={52} height={52} />
              </span>
            </h2>
            <p>掌握车控车况，尊享爱车服务，让爱车更温馨</p>

            <div className={styles.carIcon}>
              <AliImage src={caricon} width="287" height="235" />
            </div>
            <div className={classNames(styles.part1, styles['car'])}>
              <MediaComponent
                prefix="img/ibuick"
                media={[{ device: 'mob', url: 'car_m.png' }]}
              />
            </div>
            <div className={classNames(styles.car, styles['car-copy'])}>
              <MediaComponent
                prefix="img/ibuick"
                media={[{ device: 'mob', url: 'car1_m.png' }]}
              />
            </div>

            <div className={styles['part1-text']}>
              <h3>车主会员</h3>
              <p>
                {divideByElement('· 随时查看车况，掌握电量剩余、续航里程以及胎压情况。\n · 畅用iKey蓝牙钥匙，完成车辆远程启停、上锁解锁、开闭天窗等动作。\n· 尽享车主服务，享受预约维保、道路救援、上门取送车等服务。')}
              </p>
            </div>
          </div>
        </div>

        <div className={classNames(styles.block, styles['pc-part4'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg5.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg5_m.jpg" alt="" />
          </picture>
          <div className={classNames(styles.part, styles['pc-part4-content'])}>
            <div className={classNames(styles.part1, styles['part1-pic'])}>
              <MediaComponent
                prefix="img/ibuick"
                media={[{ device: 'mob', url: 'part3_m.png' }]}
              />
            </div>
            <div className={styles['part1-text']}>
              <h3>粉丝会员</h3>
              <p>集结全系车型购车礼遇，更多新车资讯一手掌握尽享多重豪礼。</p>
            </div>
          </div>
        </div>

        <div className={classNames(styles.block, styles['pc-part5'])}>
          <picture className={styles.pic}>
            <source srcSet="img/ibuick/bg6.jpg" media="(min-width:768px)" />
            <img src="img/ibuick/bg6_m.jpg" alt="" />
          </picture>
          <div className={styles.part}>
            <h2>
              <span>商城</span>
              <span className={styles.icon}>
                <AliImage src={ship} width={52} height={52} />
              </span>
            </h2>
            <p>{divideByElement('积分超值换购，优选商品选购，多重好物惊喜不断；\n更有别克ELECTRA专区等你探索，别样好礼等你来兑')}</p>

            <div className={classNames(styles['pc-part5-content'])}>
              <div className={styles['part5-pic']}>
                <MediaComponent
                  prefix="img/ibuick"
                  media={[{ device: 'mob', url: 'part4_m.png' }]}
                />
              </div>

              <p className={styles['part5-text']}>
                原厂附件，精选周边任你选，更有积分抽奖、积分抵现等超值活动等你来参与。
              </p>
            </div>
          </div>
        </div>

        <div className={styles.foot}>
          <h3>随时掌握别克一手资讯</h3>
          {data && <div className={styles.btns}>
            <a
              onClick={() => {
                onPopShow(data.ios?.url,'iBuick APP-苹果版下载')
              }}
              // href={iosData.path}
              // target="_blank"
              rel="noreferrer"
            >
              <AliImage src={bt3} />
            </a>
            <a
              onClick={() => {
                onPopShow(data.android?.url,'iBuick APP-安卓版下载')
              }}
              // href={androidData.path}
              // target="_blank"
              rel="noreferrer"
            >
              <AliImage src={bt4} />
            </a>
          </div>}
          {data && <div className={styles['foot-text']}>
            <div className={styles.ios}>
              <h4>IOS:</h4>
              <p>开发者名称:上汽通用汽车销售有限公司</p>
              <p>版本号（当前最新版本）：{data.ios?.version}</p>
              <p>
                应用权限说明：
                <a
                  onClick={() => {
                    setIframeShow(true)
                    setIndex(0)
                  }}
                >
                  点击查看
                </a>
              </p>
              <p>
                个人信息保护政策：
                <a
                  onClick={() => {
                    setIframeShow(true)
                    setIndex(1)
                  }}
                >
                  点击查看
                </a>
              </p>
            </div>
            <div className={classNames(styles.ios, styles['az'])}>
              <h4>ANDROID:</h4>
              <p>开发者名称:上汽通用汽车销售有限公司</p>
              <p>版本号（当前最新版本）：{data.android?.version}</p>
              <p>
                应用权限说明：
                <a
                  onClick={() => {
                    setIframeShow(true)
                    setIndex(0)
                  }}
                >
                  点击查看
                </a>
              </p>
              <p>
                个人信息保护政策：
                <a
                  onClick={() => {
                    setIframeShow(true)
                    setIndex(1)
                  }}
                >
                  点击查看
                </a>
              </p>
            </div>
          </div>}

          <div className={styles['foot-pic']}>
            <MediaComponent
              prefix="img/ibuick"
              media={[
                {
                  device: 'mob',
                  url: 'foot_m.jpg',
                },
                {
                  device: 'pc',
                  url: 'foot.jpg',
                },
              ]}
            />
          </div>
        </div>
      </div>
      <Iframe
        url={urls[index]}
        show={iframeShow}
        onClose={() => setIframeShow(false)}
      />
    </main>
  )
}

export default Ibuick
