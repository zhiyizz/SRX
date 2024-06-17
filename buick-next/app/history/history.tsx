'use client'

import { useState } from 'react'
import type { NextPage } from 'next'
import styles from '@styles/history.module.scss'
import classNames from 'classnames'
import MediaComponent from '@components/MediaComponent'
import AliImage from '@components/AlImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { trackPv } from '@utils/tracking'
import BackTop from '@components/BackTop'
import { combineUrl } from '@utils/helper'

// import required modules

const designList = [
  {
    year: 1904,
    content: '别克第一辆B型轿车，以奢华考究的外观设计，赢得了那个时代「经典豪华车」的美誉。'
  },
  {
    year: 1938,
    content: '世界第一款概念车别克Y-Job长而低的独特轮廓，对之后汽车设计有着深远影响。'
  },
  {
    year: 1951,
    content: '别克LeSabre概念车，率先采用了整块的弧形风挡玻璃，随后此技术迅速在业界普及。'
  },
  {
    year: 1951,
    content: 'XP-300被誉为「车轮上的实验室」，也因它的诞生，概念车设计迈上新台阶。'
  },
  {
    year: 2022,
    content: '别克ELECTRA-X概念车，带来了更安全、更智能、更电动，更舒适、更有温度的新能源出行体验。'
  }
]

const personanceList = [
  {
    year: 1998,
    title: '别克新世纪',
    content: '经济发展主要依靠国内市场的时代到来了。随着中央的方针出台，第一辆别克新世纪应运而生，开拓了国产中高档轿车市场。'
  },
  {
    year: 1999,
    title: 'GL8商务旅行车',
    content: '加强技术创新，实现产业化成为经济发展主旋律，与商业精英们同行，GL8商务旅行车问世，填补国产MPV空白。'
  },
  {
    year: 2000,
    title: '赛欧',
    content: '“十五计划”提出全面建设小康社会，别克赛欧的到来揭幕 「10万元家轿」新格局,成为中国私家车消费的划时代产品。'
  },
  {
    year: 2002,
    title: '君威',
    content: '随着中国加入世界贸易组织，别克作为中高档轿车的领导品牌，开启中国商务车新蓝海。'
  },
  {
    year: 2003,
    title: '凯越',
    content: '以强势品牌、全球同步科技，和别克关怀的优质服务，为中级车市场树立新标杆。'
  },
  {
    year: 2006,
    title: '君越',
    content: '国家增强自主创新能力的新一轮科技规划，给别克带来了一次全新的契机——由中国团队深度参与研发的君越，开启了中国汽车人开发全球产品的历史。'
  },
  {
    year: 2007,
    title: '林荫大道',
    content: '基于GRWD全球后驱平台打造，建立别克后驱豪华轿车标准。'
  },
  {
    year: 2008,
    title: '新君威',
    content: '别克成为博鳌亚洲论坛唯一指定贵宾用车，尽显领袖气质。'
  },
  {
    year: 2014,
    title: '昂科威',
    content: '高档中型SUV发布，全新设计语言和高能智慧科技成为核心产品竞争力，助力昂科威销量问鼎合资SUV市场。'
  },
  {
    year: 2018,
    title: 'GL8',
    content: '首届中国国际进口博览会开幕，别克自此成为历届进博会贵宾出行座驾。'
  },
  {
    year: 2022,
    title: '别克世纪',
    content: '站在新的历史起点上，为新时代行业领军者、文化名流与高净值家庭，打造旗舰私享MPV别克世纪开创豪华MPV出行的新纪元。'
  }
]

const PREFIX = 'https://static.buick.com.cn/assets/img/history'

const History: NextPage = () => {

  const [progress, setProgress] = useState<number>(0)
  const pv = ['1998','1999','2000','2002','2003','2006','2007','2008','2014','2018','2022']
  const pro = (num: { activeIndex: number; }) => {
    trackPv(`别克历史-同频共振-${pv[num.activeIndex]}`)
    let progress_num = 100 / (personanceList.length)
    if (num.activeIndex === 0) {
      progress_num = 100 / (personanceList.length)
    } else {
      progress_num = progress_num * (num.activeIndex + 1)
    }
    setProgress(progress_num)
  }

  return (
    // <BasePage className={styles.main} title="别克历史" seriesData={series} categoryList={category}  >
    <main className={styles.main}>
      <div className={styles.kv}>
        <MediaComponent media={[{ url: 'kv.jpg', device: 'pc' }, { url: 'kv_m.jpg', device: 'mob' }]} prefix={PREFIX} />
        {/* <picture>
          <source srcSet="/img/history/kv_m.jpg" media="(max-width: 768px)" />
          <img src="/img/history/kv.jpg" alt="" />
        </picture> */}
        {/* <div className={styles.contain}>
          <div className={styles.copy}>
          <h3>别克历史</h3>
          <p>别克百年进取时光</p>
          </div>
        </div> */}
      </div>

      <div className={styles.qulity} id="section-1">
        <div className={styles.container}>
          <div className={styles['titles-wrap']}>
            <div className={styles.en}>THE CAR OF QUALITY</div>
            <h3>品质之车</h3>
          </div>
          <div className={styles.content}>
            <MediaComponent media={[{ url: '/qulity.jpg', device: 'pc' }, { url: '/qulity_m.jpg', device: 'mob' }]} title={'1111'} prefix={PREFIX} />
            <div className={styles.text}>
              <h3>大卫 · 邓巴 · 别克<br />开创传奇</h3>
              <p className='m'>1903年5月19日，以他之名，别克的进取之路从此开启。同时，他也将“THE CAR OF QUALITY”镌刻在别克的金属铭牌之上，成为别克的基因。</p>
              <p className='pc'>1903年5月19日，以他之名，别克的进取之路从此开启。<br />同时，他也将“THE CAR OF QUALITY”镌刻在别克的金属铭牌之上，成为别克的基因。</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.design} id="section-2">
        <div className={styles.container}>
          <div className={classNames(styles['titles-wrap'], styles.sub)}>
            <div className="titles-main">
              <div className={styles.en}>ART AND DESIGN</div>
              <h3>艺术与设计</h3>
            </div>
            <div className={styles['titles-sub']}>
              艺术与设计的演变，是思想的进化。
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles['sub-kv']}>
              <AliImage src={combineUrl(PREFIX, '/kv1.jpg')} width={1140} height={550} />
            </div>
            <div className={styles.prolist}>
              {designList.map((item, idx) => {
                return (
                  <div className={styles.item} key={idx}>
                    <AliImage src={combineUrl(PREFIX, `/design_${(idx + 1)}.jpg`)} width={665} height={350} />
                    <div className={styles.text}>
                      <div className={styles['text-wrap']}>
                        <h3>{item.year}</h3>
                        <p>{item.content}</p>
                      </div>
                      <div className={styles.watermark}>{item.year}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pesonance} id="section-3">
        <div className={classNames(styles['titles-wrap'], styles.sub)}>
          <div className="titles-main">
            <div className={styles.en}>Co-frequency resonance </div>
            <h3>同频共振</h3>
          </div>
          <div className={styles['titles-sub']}>
            向前的每一步，都与中国同频共振。
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.swierMain}>
            <Swiper
              slidesPerView={1.2}
              spaceBetween={20}
              breakpoints={{
                320:{
                  slidesPerView:1.2,
                  spaceBetween:20,
                },
                769:{
                  slidesPerView:3.5,
                  spaceBetween:20,
                  navigation:{
                    nextEl: '.next',
                    prevEl: '.prev',
                  }
                }
              }}
              centeredSlides={true}
              keyboard={{
                enabled: true,
              }}
              
              modules={[Pagination,Navigation]}
              onSwiper={(swiper) => pro(swiper)}
              onSlideChangeTransitionStart={(swiper) => pro(swiper)}
              className='swiper-main'
            >
              {
                personanceList.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx} className={styles.item}>
                      <div className={styles.year}>{item.year}</div>
                      <div className={styles.content}>
                        <AliImage src={combineUrl(PREFIX, `/pesonance_${idx+1}.jpg`)} width={464} height={320} />
                        <div className={styles.text}>
                          <h3>{item.title}</h3>
                          <p>{item.content}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
            <div className={styles['swiper-pagination-progress']}>
              <div className={styles.btns}>
                <span className={classNames(styles.prev,'prev')} ></span>
                <span className={classNames(styles.next,'next')} ></span>
              </div>
              <div className={styles.line}>
                <span>{personanceList[0].year}</span>
                <div className={styles.now}>
                  <span className={styles.active} style={{ width: progress + '%' }}></span>
                </div>
                <span>{personanceList[personanceList.length - 1].year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackTop />
    </main>
  )
}

export default History
