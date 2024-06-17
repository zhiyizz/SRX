'use client'

import AliImage from '@components/AlImage'
import FinanceCom from '@components/Finance'
import FinanceApply from '@components/FinanceApply'
import KvSlider from '@components/KvSlider'
import { useScrollspy } from '@components/ScrollAnchor'
import SeriesPriceComponent from '@components/SeriesPriceComponent'
import styles from '@styles/finance.module.scss'
import { divideByElement } from '@utils/helper'
import { useGmacLoan } from '@utils/request'
import { trackEvent, trackPv } from '@utils/tracking'
import classNames from 'classnames'
import { useEffect, useMemo, useState, type FC, useCallback, Suspense } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { LoanCarInfo } from '~types/gmac'
import { isSeriesObject, type SeriesCategory, type SeriesObject } from '~types/series'

const answerJson = [
  [
    {
      'title': '为什么选择上汽通用汽车金融办理汽车贷款',
      'content': '源于上汽集团和通用汽车的实力保证<br />灵活多样的产品组合，满足各类用户的购车贷款需求<br />覆盖全国8000多家逾300个城市的汽车合作经销商随时为您服务<br />高效、快捷的审批流程让您在第一时间获得爱车<br />切实保障您的个人信息安全'
    },
    {
      'title': '上汽通用汽车金融的个人贷款首付款是多少？期限是多少？',
      'content': '首付最低20%（新能源车15%起），最长期限可达60个月。'
    },
    {
      'title': '为什么选择上汽通用融资租赁办理汽车融租？',
      'content': '由上海汽车集团金控管理有限公司、通用汽车金融有限公司和上汽通用汽车有限公司共同出资设立，实力有保障；<br />最低至0首付，零压力开走爱车；<br />月供压力小，最大化使用现金流；<br />高效、快捷的审批流程；<br />一站式服务体验，最快当天提车；<br />合同到期可灵活选择留购或者是还车；<br />建立为消费者租赁期满后更新换代提供全生命用车周期；<br />专业诚信，切实保障您的个人信息安全。'
    },
    {
      'title': '上汽通用融租方案首付款是多少？期限是多少？',
      'content': '优新享融租方案首付款有两种选择：首付0%和首付20%，期限有12期24期36期供您选择。'
    }
  ],
  [
    {
      'title': '我需要携带哪些材料办理上汽通用汽车金融车贷业务？',
      'content': '您需要携带本人身份证、驾驶证、银行卡等相关材料。'
    },
    {
      'title': '我需要携带哪些材料办理上汽通用汽车融租业务？',
      'content': '您需要携带身份证、扣款银行卡、收入类证明。'
    },
    {
      'title': '一般购车贷款需要什么申请条件？',
      'content': '1. 具有完全民事行为能力的自然人；<br />2. 具有合法有效的身份证明、户籍证明，或有效居留证明、婚姻证明；<br />3. 具有良好的信用记录和还款意愿；<br />4. 具有稳定的合法收入来源和按时足额偿还贷款本息的能力；<br />5. 持有与特约经销商签订的购车协议或购车合同；<br />6. “上汽通用汽车金融”规定的其他条件。'
    },
    {
      'title': '一般融租产品需要什么申请条件？',
      'content': '1. 中国大陆居民或在中国境内连续居住不少于一年的港澳台或外国人；<br />2. 18-65周岁，身体健康；<br />3. 本人、或我司认可的驾驶人员可提供驾驶证；<br />4. 有合法稳定的工作和收入；<br />5. 有固定的住所；<br />6. 具有合理的用车目的；<br />7. “上汽通用融资租赁”规定的其他条件'
    }
  ],
  [
    {
      'title': '我第一次向上汽通用金融还款什么时候开始，如何查询我的合同编号、贷款金额、还款期数等信息？',
      'content': '您需要在贷款放款后的第二个月开始还款，您可通过以下方式查询还款计划及合同信息：<br />1) 关注“上汽通用汽车金融客服号”官方微信号并成功绑定：点击菜单“快捷查询”-“还款计划”或 “合同详情”查询。<br />2) 拨打官方客户服务及投诉热线400-8816-336进行查询。'
    },
    {
      'title': '我第一次向上汽通用融资租赁还款什么时候开始，如何查询我的合同编号、贷款金额、还款期数等信息？',
      'content': '您可通过以下三种方式进行查询：<br />1) 关注上汽通用融资租赁微信公众号，点击[客户专享]-[我的订单]进行查询；<br />2) 或在工作日08:30至18:00期间联系微信在线客服申请查询；<br />3) 或在工作日08:30至18:00期间拨打客户服务热线：400-821-6338 申请查询。'
    },
    {
      'title': '我如何向上汽通用金融申请提前还款？',
      'content': '贷款未到期前，您可通过以下方式申请提前还款：<br />1) 关注“上汽通用汽车金融客服号”官方微信号并成功绑定后，点击菜单“业务办理”-“提前还款”申请。<br />2) 拨打官方客户服务及投诉热线400-8816-336申请。'
    },
    {
      'title': '使用上汽通用汽车金融贷款后如何还款？',
      'content': '您只需在每个还款日之前将足够款项存入您的扣款银行卡中，并确保您的银行卡有效可用，我司将在约定的扣款日从您卡中进行扣款。如因银行卡问题无法扣款，您可通过如下方式汇款，并尽快联系我司进行汇款确认。<br /><br /> <b>1) 我司账号信息：</b><br />户名：上汽通用汽车金融有限责任公司<br /> 账号：1001215509300179887<br />开户行：工商银行上海分行天目东路支行<br />备注：贷款合同编号（可参考Q1获得）<br /><b><br />2) 请您在汇款后的当天（最迟3天内），通过如下方式及时联系我司进行汇款确认：</b><br /> Ø 关注“上汽通用汽车金融客服号”官方微信号并成功绑定后，点击菜单“业务办理”- “汇款凭证”上传。<br /> Ø 拨打官方客户服务及投诉热线400-8816-336告知具体汇款信息。<br /><br /><b>温馨提示：</b><br />1）上述公司账号是我司唯一收款账户，请您核对正确后汇款；我司不会授权第三方公司或个人收取您的还款，请您谨防第三方欺诈，避免向非我司公司账户或其他个人账户还款；<br />2）您的实际还款日以我司收到汇款确认后的入账日为准，由于汇款信息备注错误或延迟通知所产生的逾期记录及逾期罚息需要您自行承担，故请您汇款后请注意及时通知我司进行确认。谢谢您的理解和配合。'
    },
    {
      'title': '如何向上汽通用融资租赁还款，你们的对公账号是什么？',
      'content': '您可以通过向我司对公账号转账汇款的方式进行还款，请注意，采用此种方式还款，您必须在汇款备注中注明您的合同号，并在汇款完成后，通过邮件(我司客服邮箱地址: cs@salcgmf.com)或微信公众号汇款凭证上传功能，上传您的汇款凭证。<br />对公账户信息如下:<br />上汽通用融资租赁账号: 121930299510102<br />开户行:招商银行上海长阳支行<br />公司名称:上汽通用融资租赁有限公司<br /><br /><b>温馨提示:</b><br />请您注意在汇款备注中注明合同号，并在汇款后及时告知具体汇款信息，否则将无法对汇款操作入账，因此产生的到期记录，逾期记录及逾期罚息需要由您自行承担，感谢配合!'
    },
    {
      'title': '我向上汽通用金融还款的银行卡换卡了怎么办？',
      'content': '1）如您的银行卡号不变，我司仍会自动从您的银行卡中进行扣款。<br />2）如您的银行卡号有变更，请及时联系我司办理换卡手续。目前我司接收农业银行、工商银行和招商银行的借记卡<br />如需更改为工商银行卡和招商银行卡，请在微信公众号“上汽通用汽车金融客服号”中完成身份绑定后，点击“业务办理”-“还款卡更换”自助办理；如需更改为农业银行卡，请发送邮件至RTCS-GK@saicgmac.com 咨询办理。<br />换卡授权完成之前需要您通过汇款方式进行还款，汇款信息请参考Q4，故请您提前安排相关事宜以免产生逾期记录及逾期费用，最终可能影响您的个人信用记录。<br />如有任何问题，请拨打官方客户服务及投诉热线400-8816-336或在微信公众号“上汽通用汽车金融客服号”中输入“人工”咨询。'
    },
    {
      'title': '我向上汽通用融资租赁还款的银行卡变更如何办理？',
      'content': '请携带您本人的身份证以及新的银行卡至您当时购车的经销商处办理扣款授权。'
    },
    {
      'title': '我的车子出险了（上汽通用金融），保险公司需要理赔函怎么办？',
      'content': '请您准备以下资料，我司收到并审核无误后，会将理赔函通过快递方式邮寄给您。<br />1) 资料如下：<br />行驶证<br />贷款车辆定损单<br />交警事故认定书（如为单方事故可不提供）<br />2) 上述资料请发送邮箱：RTCS-BX@saicgmac.com，并请注明理赔函快递的收件人，收件地址和联系电话。<br />3) 如您的车辆遇到全损或被盗的情况，根据合同约定，您需要进行提前还款后自行联系保险公司理赔。'
    },
    {
      'title': '贷款期间我的联系方式换了，该如何通知上汽通用金融？',
      'content': '1） 关注“上汽通用汽车金融客服号”官方微信号并成功绑定后，点击菜单“业务办理”-“信息修改”修改。<br />2） 拨打官方客户服务及投诉热线400-8816-336办理。'
    },
    {
      'title': '如何向上汽通用融资租赁更改我的手机号码/通讯地址？',
      'content': '您可通过以下两种方式进行更改：<br />1) 您可以在工作日08:30至18:00期间联系微信在线客服申请办理。<br />2) 或在工作日08:30至18:00期间拨打客户服务热线: 400- 821- 6338申请办理。<br />更改地址需提供相应的地址证明的扫描件(例如银行卡账单，水电煤气账单，房屋产权证明，租房合同等》，并发送至cs@saicgmf.com。'
    },
    {
      'title': '上汽通用融资租赁合同生效后，我可以添加、更改或者删除承租人、联合承租人和担保人吗？',
      'content': '我司暂不支持对承租人、联合承租人和担保人的变更。'
    },
    {
      'title': '上汽通用融资租赁租赁期间我的车辆可以过户吗？',
      'content': '租赁期间您的车辆无法办理过户手续，您可选择将车款结清后再进行办理。'
    },
    {
      'title': '我如何向上汽通用金融获得利息或费用发票？',
      'content': '您可致电我司客户服务热线400-8816-336留下您的开票信息，我司将在3-5个工作日内为您开具并发送给您，谢谢。'
    }
  ],
  [
    {
      'title': '车款向上汽通用融资租赁还清了，如何拿回产证？',
      'content': '如果您的车款已结清，我们会在您合同结清后5个工作日内寄出结清资料<br />（即机动车登记证书、结清证明、解抵押委托书等）。 <br />结清材料会寄至您当时购车的经销商，经销商收到结清资料后会协助您办理后续手续:若对方长时间未联系您，您可以 <br />1) 在工作日08:30至18:00期间联系微信在线客服咨询进度 <br />2) 或在工作日08:30至18:00期间拨打客户服务热线：400-821-6338查询进度。'
    }, {
      'title': '车辆全损/盗抢了（上汽通用融资租赁），该如何处理？',
      'content': '如果车辆发生了全损/盗抢，您需要及时告知我司，处理与我司的融资租赁合同。<br />请先与我司进行协商，可以选择以下两种处理方法：<br />1) 保险公司将理赔款汇入上汽通用融资租赁对公账户，若理赔款不足支付提前结清费用，则由您将差额补足:若有余款，则在结清后，由我司发起后续退款。<br />2) 您先向上汽通用融资租赁申请提前还款，我司按照约定时间进行扣款，保险公司后续将理赔金额支付给您。'
    }
  ]
]

const Finance: FC<{
  category?: SeriesCategory[]
  series?: SeriesObject[]
}> = ({ series, category }) => {
  const [seriesList, setSeriesList] = useState<SeriesObject[]>()
  const [categoryType, setCategoryType] = useState<string[]>()
  const [activeSeries, setActiveSeries] = useState<SeriesObject | undefined | null>()
  const [categoryActive, setCategoryActive] = useState<number | null>(null)
  const [apply, setApply] = useState<string>()
  const { list } = useGmacLoan()

  useEffect(() => {
     /**
      * 通过seriescategorylist接口返回的数据匹配车贷方案的车型选择列表
      * @returns 
      * setCategoryType:Array 返回车系列表
      * setSeriesList:Array 返回车型列表 
      */
    const arr: string[] = [];
    const _seriesList: SeriesObject[] = [];
    category?.forEach(category_series => {
      category_series.series?.forEach((item_car:string) => {
         series?.forEach(car => {
            if(car.code === item_car && car.flags?.gmac){
             arr.push(category_series.name);
             _seriesList.push(car);
            }
         })
      });
     const navResult = Array.from(new Set(arr))
     setCategoryType(navResult);
     setSeriesList(_seriesList)
    })
  },[category,series])

  const carListEvent = (idx: number) => {
    let models: LoanCarInfo[] = null!
    if (seriesList) {
      const obj = seriesList[idx];
       
      if (list?.IsSuccess) {
        const reg = new RegExp(`${obj.name.replace(/\s+/g, '')}$`, 'i')
        models = list.data.filter(item => reg.test(item.parent_car_desc.replace(/\s+/g, '')))
        if(models && models.length){
          setActiveSeries(obj);
        }else{
          setActiveSeries(null);
          alert('gmac返回数据中没有金融方案！');
        }
      }
    }
  }

  useEffect(() => {
    // 车型页跳转定位
    if (seriesList && apply) {
      const obj = seriesList.find(item => apply === item.code);
      const height = document.getElementsByClassName('subnav')[0].clientHeight
      setActiveSeries(obj)
      setTimeout(() => {
        const target = window.document.getElementById('gmacLoanTd')
        if (target) {
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition - height + 1
          window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 500)
    }
  },[apply, seriesList])

  const categoryNavEvent = useCallback((idx: number) => {
    if (category && categoryType) {
      //通过后台接口获取车型匹配
      setActiveSeries(null)
      setCategoryActive(idx)
      //通过category匹配当前选中
      const categoryCurrentSeries = category.find(cat => cat.name === categoryType[idx])
      if (categoryCurrentSeries) {
        const seriesCurrentList = categoryCurrentSeries.series?.map((code) => series?.find((item) => code === item.code  )).filter(isSeriesObject)
        setSeriesList(seriesCurrentList)
      }
    }
  }, [category, categoryType, series])

  const [questionCur, setQuertionCur] = useState(0)
  const questionType = (idx: number) => {
    setQuertionCur(idx)
  }

  const ids = ["section-1", "section-2", "section-3","section-4"]
  const nav = useMemo(() =>  ['产品介绍','车贷方案','车贷指南','公司介绍'],[]) 
  const activeId = useScrollspy(ids,'.subnav')

  useEffect(() => {
    trackPv(`金融购车-${nav[activeId?activeId:0]}`)
  }, [activeId, nav])

  return (
    // <BasePage className={styles.main} title="金融购车" seriesData={series} categoryList={category} >
    <main className={styles.main}>
      <Suspense>
        <FinanceApply onApply={setApply} />
      </Suspense>
      <KvSlider className={styles.kv} slides={[{
        id: 1,
        name: '金融购车',
        media: [{ url: '/img/gmac/kv.jpg', device: 'pc' }, { url: '/img/gmac/kv_m.jpg', device: 'mob' }],
        text: {
          title: '',
          subTitle: '',
          theme:'dark'
        }
      }]} />
      <div className={styles.finance}>
        <div className={classNames(styles['sub-nav'],'subnav')}>
        <ul className="menu">
            {ids.map((id,idx) => (
              <li key={idx}     
              className={classNames(
                "menu-link",
                idx === activeId && styles.active
              )}
              onClick = {
                () => {
                  trackEvent(`金融购车-${nav[idx]}`)
                }
              }
              >
                <a href={`#${id}`}>
                  <span>
                  {(nav[idx])}
                  </span>
                </a>
              </li>
            ))}
          </ul>

        </div>
        <div data-scroll-target="doubleScrollAgent">
        <div className={classNames(styles.product, styles.section)} id='section-1'>
          <div className={styles.container}>
            <div className={styles['titles-wrap']}>
              <div className={styles.en}>APPLICATION</div>
              <h3>产品介绍</h3>
            </div>
            <div className={styles.title}>
              网上车贷业务
            </div>
            <div className={styles.itemWrap}>
              <div className={styles.item}>
                <h6><span>1</span>灵活贷</h6>
                <p>首付20%起（新能源车15%起），每期还款金额相同，最长可贷60期，部分车型最低可享0利率，轻松月供无压力，一步到位，养车用车均无忧。</p>
              </div>
              <div className={styles.item}>
                <h6><span>2</span>智慧贷</h6>
                <p>首付20%起，最后一期尾款灵活，月供较低，在贷款期限结束时有两种选择：全额付清尾款，二手车置换。</p>
              </div>
              <div className={styles.item}>
                <h6><span>3</span>5050气球贷</h6>
                <p>“贷一半，付一半”；贷款期末还款50%，在贷款期限结束时有两种选择：全额付清尾款，二手车置换。</p>
              </div>
              <div className={styles.item}>
                <h6><span>4</span>优新享</h6>
                <p>低首付、低月供，车辆高余值保障，期末可买可还可置换，享受灵活用车生活。</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chedai}  id='section-2'>
          <div className={styles.container}>
            <div className={styles['titles-wrap']}>
              <div className={styles.en}>APPLICATION</div>
              <h3>车贷方案</h3>
            </div>
            <div className={styles.title}>
              车型选择
              <div className={styles.category_nav}>
                {categoryType?.map((item: string, idx: number) => {
                  return (
                    <span key={idx} className={categoryActive === idx ? styles.active : ''} onClick={() => categoryNavEvent(idx)}>
                      {item}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className={styles.carList}>
              <Swiper
                observer={true}
                observeParents={true}
                className={styles['swiper-box']}
                breakpoints={{
                  320: {
                    slidesPerView: 1.75,
                    spaceBetween: 10
                  },
                  767.98: {
                    slidesPerView: 4
                  },
                  991.98: {
                    slidesPerView: 5
                  },
                  1199.98: {
                    slidesPerView: 6
                  }
                }}
              >
                
                {seriesList?.map((item, idx) => {
                  
                  if(item.flags?.gmac !== false){
                    return (
                      <SwiperSlide key={idx} className={styles.slide} onClick={() => { 
                        carListEvent(idx) 
                        trackEvent(`金融方案-车贷方案-车型选择-${item.name}`)
                        }}>
                        <div className={styles.pic}><AliImage src={item.pic} alt={item.name} width={800} height={640} /></div>
                        <div className={styles.inner}>
                          <div className={styles.name}>{item.displayName || item.name}</div>
                          {item.price !== undefined && <SeriesPriceComponent className={styles.price} price={item.price} gmac={true} />}
                        </div>
                        <div className={styles.btn}>金融计算器</div>
                      </SwiperSlide>
                    )
                  }

                })}
              </Swiper>
            </div>

          </div>
          <div id="gmacLoan">
            {activeSeries ? (
            <FinanceCom  series={activeSeries} seriesList={series} />
            ) : null}
          </div>

        </div>
        <div className={styles.guide}  id='section-3'>
          <div className={styles.container}>
            <div className={styles['titles-wrap']}>
              <div className={styles.en}>APPLICATION</div>
              <h3>车贷指南</h3>
            </div>
            <div className={styles.title}>车贷流程</div>
            <div className={styles.stepWrap}>
              <div className={styles.step}>
                <div className={styles.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.39 82.37"><rect x="1.5" y="1.5" width="35.69" height="35.69" rx="2.83" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><rect x="50.2" y="1.5" width="35.69" height="35.69" rx="2.83" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><rect x="1.5" y="45.17" width="35.69" height="35.69" rx="2.83" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><rect x="50.2" y="45.17" width="35.69" height="35.69" rx="2.83" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>
                </div>
                <p>选择车贷产品</p>
              </div>
              <div className={styles.arrow}></div>
              <div className={styles.step}>
                <div className={styles.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.23 82.47"><path d="M65.79,73.38v2A5.66,5.66,0,0,1,60.15,81h-53A5.66,5.66,0,0,1,1.5,75.33V7.14A5.66,5.66,0,0,1,7.14,1.5h53a5.66,5.66,0,0,1,5.64,5.64V31.75" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><line x1="10.59" y1="19.45" x2="57.34" y2="19.45" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="10.59" y1="37.53" x2="35.34" y2="37.53" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="10.59" y1="58.58" x2="31.34" y2="58.58" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><path d="M65.22,31.75a20.51,20.51,0,1,1-20.5,20.51,20.51,20.51,0,0,1,20.5-20.51" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><polyline points="53.13 51.99 63.55 60.86 77.63 45.47" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>
                </div>
                <p>在线车贷申请</p>
              </div>
              <div className={styles.arrow}></div>
              <div className={styles.step}>
                <div className={styles.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.64 82.47"><path d="M84.29,66.38v9C84.29,78.43,81,81,77,81H8.76c-4,0-7.26-2.54-7.26-5.64V7.14C1.5,4,4.77,1.5,8.76,1.5H77c4,0,7.26,2.54,7.26,5.64V33.75" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><line x1="1.59" y1="20.45" x2="84.34" y2="20.45" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><path d="M71.22,29.75a20.51,20.51,0,1,1-20.5,20.51,20.51,20.51,0,0,1,20.5-20.51" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="9.95" y1="10.14" x2="18.71" y2="10.14" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="23.75" y1="10.14" x2="32.51" y2="10.14" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="37.56" y1="10.14" x2="46.31" y2="10.14" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><line x1="86.13" y1="64.33" x2="102.14" y2="80.97" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>
                </div>
                <p>车贷审核批复</p>
              </div>
              <div className={styles.arrow}></div>
              <div className={styles.step}>
                <div className={styles.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.75 84.3"><path d="M22,21.88a20.51,20.51,0,1,0,20.5,20.51A20.51,20.51,0,0,0,22,21.88" fill="none" stroke="#323233" strokeMiterlimit="10" strokeWidth="3" /><polyline points="12.71 42.47 20.33 48.68 31.98 37.91" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><path d="M33,23.77l6-16.62S40.83,1.5,48.09,1.5H98.64s5.65,1,7.48,8.64,6.81,19.61,6.81,19.61,1.4,3.73,2.5,4.91c1.94,2.09,5.82,2.75,5.82,2.75v40.9s-.83,4.49-4.33,4.49H104s-3.69,0-5.24-7.82H44.6s-1.83,7.82-4.82,7.82H25.64A3.9,3.9,0,0,1,22,78.64c0-4,0-15.75,0-15.75" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><line x1="58.01" y1="16.24" x2="69.1" y2="26.88" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><line x1="73.81" y1="16.24" x2="84.89" y2="26.88" fill="none" stroke="#323233" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>
                </div>
                <p>门店签约提车</p>
              </div>
            </div>
            <div className={styles.title}>常见问题</div>
            <div className={styles.question}>
              <div className={styles.tabBar}>
                <span className={questionCur === 0 ? styles.active : ''} onClick={() => {
                  questionType(0)
                  trackEvent('金融购车-常见问题-关于汽车金融')
                }}>关于汽车金融</span>
                <span className={questionCur === 1 ? styles.active : ''} onClick={() => {
                  questionType(1)
                  trackEvent('金融购车-常见问题-申请资质')
                }}>申请资质</span>
                <span className={questionCur === 2 ? styles.active : ''} onClick={() => {
                  questionType(2)
                  trackEvent('金融购车-常见问题-还款相关问题')
                }}>还款相关问题</span>
                <span className={questionCur === 3 ? styles.active : ''} onClick={() => {
                  questionType(3);
                  trackEvent('金融购车-常见问题-其它问题')
                }}>其它问题</span>
              </div>
              <div className={styles.answer}>
                <Answer data={answerJson[questionCur]}  />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.aboutus} id='section-4'>
          <div className={styles.container}>
            <div className={styles['titles-wrap']}>
              <div className={styles.en}>APPLICATION</div>
              <h3>公司介绍</h3>
            </div>
            <div className={styles.aboutusWrap}>
              <div className={styles.row}>
                <div className={styles.pic}>
                  <picture>
                    <source srcSet="/img/gmac/gmac_m.jpg" media="(max-width: 768px)" />
                    <img src="/img/gmac/gmac.jpg" alt="" />
                  </picture>
                </div>
                <div className={styles.content}>
                  <h4>上汽通用汽车金融</h4>
                  <p>上汽通用汽车金融有限责任公司（SAIC-GMAC），成立于2004年，由上汽集团财务有限公司、GMAC UK PLC（通用汽车全资子公司）和上汽通用汽车有限公司共同出资组建，专注于为全国汽车经销商和汽车消费者提供方便、快捷、优质的汽车金融服务。</p>
                  <div className={styles.good}>
                    <h5>产品优势：</h5>
                    <p>全球专业服务标准 随时随地 网上申请 众多套餐 随心选择 全程导购 贴心服务 流程便捷 审批迅速 首付最低20%  信息安全 多重保障</p>
                  </div>
                  <div className={styles.phone}>
                    <span><b>全国车贷申请热线：</b>400-8833-060</span><span><b>全国车贷客服热线：</b>400-8816-336</span>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.pic}>
                  <picture>
                    <source srcSet="/img/gmac/gmf_m.jpg" media="(max-width: 768px)" />
                    <img src="/img/gmac/gmf.jpg" alt="" />
                  </picture>
                </div>
                <div className={styles.content}>
                  <h4>上汽通用融资租赁</h4>
                  <p>上汽通用融资租赁有限公司（SAIC-GMF），成立于2018年，由上海汽车集团金控管理有限公司、通用汽车金融有限公司和上汽通用汽车有限公司共同出资设立的中外合资融资租赁公司，旨在为中国汽车市场带来更多元化的汽车融资租赁产品和服务，进一步促进二手车业务发展。</p>
                  <div className={styles.good}>
                    <h5>产品优势：</h5>
                    <p>最低至0首付 超低月供 一站式服务体验 最快当天提车<br />微信小程序、移动端快捷操作 全新车辆消费体验 车辆常换常新<br />合同期末到期可选择留购或还车 12/24/36 期限 余值保障 置换无忧</p>
                  </div>
                  <div className={styles.phone}>
                    <span><b>客户服务热线：</b>400-821-6338</span><span><b>客服邮箱地址：</b>cs@saicgmf.com</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>
    </main>
  )
}

export default Finance

const Answer = ({ data }: { data: { title: string, content: string }[]}) => {
  const [qaOpen,setQaOpen] = useState<boolean[]>([])
 useEffect(() => {
  setQaOpen([]);
 },[data])
  return (

    <div className={styles.content}>
          <ul>
            { data.map((item,index) => 
              <li key={index} 
                className={classNames({
                  [styles.active]: qaOpen[index]
                })}
                onClick={()=>{
                  qaOpen[index] = !qaOpen[index];
                  setQaOpen([...qaOpen])
                }}
              >
                <h4><i>Q：</i><span>{divideByElement(item.title)}</span></h4>
                <p ><span dangerouslySetInnerHTML={{ __html: `${item.content}` }}></span></p>
              </li>
            )}
          </ul>
        </div>
    // <dl className={styles.item}>
    //   {
    //     data?.map((item, idx) => {
    //       return (
    //         <Fragment key={idx}>
    //           <dt className={answerTab === idx ? styles.active : ''} onClick={() => toggleTab(idx)}>
    //             <span>Q：</span>{item.title}
    //           </dt>
    //           <dd className={answerTab === idx ? styles.active : ''} dangerouslySetInnerHTML={{ __html: `<span>A：</span>${item.content}` }}></dd>
    //         </Fragment>
    //       )
    //     })
    //   }
    // </dl>
  )
}
