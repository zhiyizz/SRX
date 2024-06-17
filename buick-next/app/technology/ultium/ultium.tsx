'use client'

import style from '@styles/ultium.module.scss'

import type { NextPage } from 'next'
import classNames from 'classnames'
import type {
  SeriesJson,
} from '~types/series'

import AliImage from '@components/AlImage'

import MediaComponent from '@components/MediaComponent'
import KvSlider from '@components/KvSlider'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'

const carDate: SeriesJson = {
  kv: [
    {
      id: 1,
      name: '别克奥特能平台',
      media: [
        {
          device: 'mob',
          url: 'mob/kv_w.jpg',
        },
        {
          device: 'pc',
          url: 'kv_w.jpg',
        },
      ],
    },
  ],
}
type test = {
  text: string
  url: string | StaticImport
  w: number
  h: number
  type?: 'img' | 'video'
  highlight?: string
  poster?: string
}
const tests: test[] = [
  {
    type: 'img',
    highlight: '挤压试验：',
    text: '模拟车辆遭受正面或侧面撞击时电池包的受损情况。奥特能电池包满电状态下，受300kN挤压力下电池无异常，3倍于国标要求。',
    url: 'https://static.buick.com.cn/assets/img/ultium/mob/gb_1.png',
    w: 611,
    h: 96,
  },
  {
    type: 'img',
    highlight: '跌落试验：',
    text: '模拟车辆托底或是底部遭受石击等危及电池包的情况。奥特能电池包从2米高度跌落后无异常，2倍于国标要求。',
    url: 'https://static.buick.com.cn/assets/img/ultium/mob/gb_2.png',
    w: 581,
    h: 96,
  },
  {
    type: 'img',
    highlight: '针刺试验：',
    text: '模拟电芯内部短路的极端情况。奥特能电池包在针刺后无明火、不爆炸、无热失控，结果远超国标要求。',
    url: 'https://static.buick.com.cn/assets/img/ultium/mob/gb_3.png',
    w: 599,
    h: 235,
  },
]
type List = {
  title: string
  text: string
  sp?: string
}
const list: List[] = [
  {
    title: '超高强度钢井字形结构电池包',
    text: '钢筋铁骨，有效阻止异物撞击和挤压变形。',
  },
  {
    title: '独立式模组液冷板',
    text: '精准控温，确保电芯工作温度的状态一致。',
    sp: '（专利设计¹）',
  },
  {
    title: '高压元器件防拉弧设计',
    text: '特种材料，高温陶瓷化特性有效保持绝缘。',
  },
  {
    title: '纳米级气凝胶隔热墙',
    text: '隔热防火，阻止明火和热量在电芯间传递。',
    sp: '（专利设计²）',
  },
  {
    title: '包内快速排气通道',
    text: '预留通道，引导高压气体往出口快速转移。',
    sp: '（专利设计³）',
  },
  {
    title: '后置大面积高通量防爆阀',
    text: '排气畅通，快速高效释放包内的高温高压。',
  },
  {
    title: '「车-云」结合的电池健康监测系统',
    text: '云端监测，提前主动预知电池的健康状态。',
  },
]

const PREFIX = 'https://static.buick.com.cn/assets/img/ultium'

const Ultium: NextPage = () => {
  return (
    // <BasePage
    //   className={style.main}
    //   theme="blue"
    //   title="别克奥特能平台-别克汽车官网"
    //   seriesData={series}
    //   categoryList={category}
    // >
    <main className={classNames(style.main, 'theme-blue')}>
      <KvSlider className={style.kv} slides={carDate.kv} prefix={PREFIX}>
        <div className={style['kv-text']}>
          <div className={style['kv-logo']}>
            <AliImage src="logo.png" width="732" height="96" prefix={PREFIX}></AliImage>
          </div>
          <p>
            Ultium奥特能平台基于通用汽车电气化经验和前瞻技术优势，打造智能高效灵活的平台架构，具有更智能、更安全、更性能三大优势，带来更放心的电动出行体验。
          </p>
        </div>
      </KvSlider>
      <div className={style.wrap}>
        <div className={style.part1}>
          <MediaComponent
            className={style.bg}
            media={[
              { device: 'mob', url: 'mob/test_kv.jpg' },
              { device: 'pc', url: 'test_kv.jpg' },
            ]}
            prefix={PREFIX}
          />
          <div className={style.text}>
            <h4>
              远超国标的
              <br className={style.m} />
              开发和试验标准
            </h4>
            <p>
              奥特能平台的电池开发和测试严格遵循了通用汽车全球标准，高于当前的国标水平，具有更可靠的安全表现。
            </p>
          </div>
          <div className={style.test}>
            {tests?.map((item, index) => {
              return (
                <div className={style['test-item']} key={index}>
                  {item.type === 'img' && (
                    <>
                      <p>
                        <span className={style['test-hg']}>
                          {item.highlight}
                        </span>
                        <br className={style.pc} />
                        {item.text}
                      </p>
                      <div className={style['item-pic']}>
                        <AliImage
                          src={item.url}
                          width={item.w}
                          height={item.h}
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className={style.part2}>
          <MediaComponent
            media={[
              { device: 'mob', url: 'mob/defend_kv.jpg' },
              { device: 'pc', url: 'defend_kv.jpg' },
            ]}
            prefix={PREFIX}
          />
          <h4>7重防护 严防热失控</h4>
          <div className={style.tx}>
            {list.map((item, index) => {
              return (
                <div key={index} className={style['tx-wrap']}>
                  <h5>
                    <i className={style.mark}>{index + 1}</i>
                    {item.title}
                    {item.sp && <span>{item.sp}</span>}
                  </h5>
                  <p>{item.text}</p>
                </div>
              )
            })}
          </div>
            <div className={style['part2-zs']}>
            <p>
              1、中国实用新型专利，专利号CN211789201U
              <br />
              2、中国发明专利，专利号CN111725454A；中国发明专利，专利号CN111725455A
              <br />
              3、中国发明专利，专利号CN111769222A；中国实用新型专利，专利号CN212257503U
              <br />
            </p>
          </div>
        </div>
       
        <div className={style.part3}>
          <MediaComponent
            media={[
              { device: 'mob', url: 'mob/list-1.jpg' },
              { device: 'pc', url: 'list-1.jpg' },
            ]}
            prefix={PREFIX}
          />
          <div className={style['part3-tx']}>
            <h4>
              BEV HEAT <br className={style.m} /> 双热源热管理系统
            </h4>
            <p>
              以双热源热泵为系统核心，可综合利用空调、电池、
              {/* <br className={style.m} /> */}
              电驱动系统的热量，
              {/* <br className={style.pc} /> */}
              提供冬季低温下的续航保障。
            </p>
          </div>
        </div>
        <div className={style.part3}>
          <MediaComponent
            media={[
              { device: 'mob', url: 'mob/list-2.jpg' },
              { device: 'pc', url: 'list-2.jpg' },
            ]}
            prefix={PREFIX}
          />
          <div className={style['part3-tx']}>
            <h4>
              业内首创可无线连接的
              <br className={style.m} />
              电池管理系统
            </h4>
            <p>
              减少电池包内90%的线束和大量接插件，
              <br className={style.m} />
              并简化电池装配流程，提升生产质量，
              <br className={style.m} />
              降低电池模组故障率，
              <br className={style.pc} />
              <br className={style.m} />
              让电池健康防护更安全精准。
            </p>
          </div>
        </div>
        <div className={style.part3}>
          <MediaComponent
            media={[
              { device: 'mob', url: 'mob/list-3.jpg' },
              { device: 'pc', url: 'list-3.jpg' },
            ]}
            prefix={PREFIX}
          />
          <div className={style['part3-tx']}>
            <h4>高效模块化驱动系统</h4>
            <p>
              主驱电机实现了8合1的高集成设计，
              <br className={style.m} />
              包含电机、电控、减速器、充电控制器等8大模块。
              <br />
              电机采用了先进的扁线工艺，动力澎湃；
              <br className={style.m} /> 加之包裹了吸音材料、给顾客带来静谧、
              <br className={style.m} />
              舒适的驾乘感受。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Ultium
