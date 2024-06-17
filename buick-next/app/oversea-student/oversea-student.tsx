'use client'

import type { NextPage } from 'next'
import styles from '@styles/overseasStudent.module.scss'

import type { SeriesObject } from '~types/series'
import { combineUrl, divideByElement } from '@utils/helper'
import AliImage from '@components/AlImage'
import KvSlider from '@components/KvSlider'
import classNames from 'classnames'
import OverseaStudentForm from '@components/OverseaStudentForm'
import { useEffect, useMemo, useState } from 'react'
import {useScrollspy} from '@components/ScrollAnchor'
import { trackEvent, trackPv } from '@utils/tracking'
import BackTop from '@components/BackTop'

const qaData = [
  {title:'哪些人可以申请购买免税车？',tx:'出国攻读学位，学成后立即回国并在回国后一年内提出购买免税车的申请。（如果回国时间超过了一年，建议客户向居住地海关咨询是否符合购买免税车的条件。）'},
  {title:'免税车免除的是哪个税种？',tx:'免税车免除的是购置附加税，这是国家给予留学归国人员的优惠政策。'},
  {title:'我想购买你们的免税车，应该需要哪些材料？',tx:'1. 海关批准后出具《购车准购单》关封原件。\n2. 身份证正反面复印件 \n3. 留学期间所使用的护照照片页复印件\n4.《留学回国人员证明》复印件'},
  {title:'购买免税车的有效期是多久？',tx:'办完关封后，向我司提出购买免税车的有效期是海关准购单上的有效期，一般为办理准购单时开始算，三个月内开票都有效。'},
  {title:'上汽通用生产的哪些车型不可以享受免税车政策？',tx:'进口车型不能享受免税车政策。您还可以与上汽通用免税车负责人联系，确认您想购买的车型是否在免税车销售范围内。'},
  {title:'是否可以免交国产汽车主要进口部件的关税、消费税和增值税？',tx:'这些优惠政策就包括在厂方指导价提供的优惠折扣范围内了。'},
  {title:'当地特约经销商正在开展促销活动，优惠有（若干），请问购买免税车可以享受此优惠吗？',tx:'这是当地经销商的个别行为而非厂家优惠，免税车由上汽通用直销，与经销商（4S店）的促销优惠活动无关。免税车价格已执行了免税车优惠政策。'},
  {title:'免税车能否享受国家节能惠民的3000元补贴？',tx:'在国家节能惠民补贴清单中的车型，均可享受。'},
  {title:'购买免税车是否可以办理贷款?',tx:'免税车是厂家直销业务，目前厂家尚不提供办理贷款的服务。'},
  {title:'我来签合同的时候需要付全款（或定金）吗？',tx:'不需要当场支付。免税车款项一律通过银行转账的方式转入上汽通用汽车有限公司指定的账户。具体为：\n开户名 上汽通用汽车销售有限公司\n开户行 工商银行上海市天目东路支行\n银行账号1001 2155 1930 0293 759'},
  {title:'上汽通用的免税车负责人联系方式？',tx:'免税车联系人：赵皓\n咨询电话：021-28902327 \n电话咨询时间为：周一至周五上午9:30-11:30，下午13:30-16:00。'},
  {title:'到经销商（4S店）提车时要准备哪些手续？',tx:'由上汽通用寄出的全套发票（三联），本人身份证原件。委托办理的需要委托人和受托人的身份证原件和委托书原件。'},
  {title:'经销商是否在交车前对车辆进行了PDI检测？购买免税车与通常在经销商展厅处购买新车，手续上有何不同？',tx:'经销商在交车前会对车辆进行PDI检测。经销商在交付给用户免税车时，会履行与展厅车辆一样的交接手续。'},
  {title:'客户申请购买免税车，并且已经提车，接下来应该如何办理免税？',tx:'请带好上汽通用给您出具的购车发票前往当地海关，凭购车发票，可以领取一份免税凭证。凭该证和发票，前往路政部门上牌，即可免除车辆购置附加税。'}
]

const OverseasStudent: NextPage<{
  series?: SeriesObject[]
  order?: string[]
}> = ({ series, order }) => {
  const [qaOpen,setQaOpen] = useState<boolean[]>([])
  const ids = ["section-1", "section-2", "section-3","section-4"];
  const nav = useMemo(() => ['申请入口','政策背景','申请资质','Q&A'],[])
  const activeId = useScrollspy(ids,'.subnav'); 
  useEffect(()=>{
    trackPv(`留学生购车-${nav[activeId?activeId:0]}`)
  },[nav,activeId])
  return (
    // <BasePage className={styles.main} title="留学生购车" seriesData={series} categoryList={category} >
    <main  className={styles.main}>
      <KvSlider className={styles.kv} slides={[{
        id: 1,
        name: '新闻及公告',
        media: [{ url: '/img/overseas_student/kv.jpg', device: 'pc', align: 'middle' },
        { url: '/img/overseas_student/mobile/kv.jpg', device: 'mob', align: 'middle' }],
      }]} />

      {/* 子导航 */}
      <div className={styles.subnav}>
        <ul className={classNames(styles.navlist,'subnav')}>
          {ids.map((id,idx) => (
            <li key={idx}      
            className={classNames(
              "menu-link",
              idx === activeId && styles.active
            )}
            onClick={()=>{
              trackEvent(`留学生购车-${nav[idx]}`)
            }}>
              <a
                href={`#${id}`}
              >{(nav[idx])}</a>
            </li>
          ))}
        </ul>
      </div>


      <div className={classNames(styles.group,styles.entrance)} id="section-1">
        <div className={styles.title}>
          <p>APPLICATION</p>
          <h3>申请入口</h3>
        </div>
        <div className={styles.contact}>
          <div className={styles.item}>
            <div className={styles.left}>
              <div className={styles.tx}>
                <i className={styles.icon}></i>
                购车联系电话
              </div>
            </div>
            <div className={styles.right}>
              <p className={styles.call}><span>别克官方热线</span>400-820-2020</p>
              <p className={styles.call}><span className={styles.spacing}>免税车热线</span>021-28902327</p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.left}>
              <div className={styles.tx}>
                <i className={classNames(styles.icon,styles.icon2)}></i>
                留下您的信息
              </div>
            </div>
            <div className={styles.right}>
              <p>如果您计划购买上汽通用留学生免税车或希望了解更多关于上汽通用留学生免税车的信息，可以留下您的姓名、联系方式等信息，我们将第一时间联系您，为您答疑解惑，并协助您办理上汽通用留学生免税车的相关手续。同时，在此过程中您的个人信息将受到保护。</p>
            </div>
          </div>
        </div>
        <div className={styles['form-container']}>
          <AliImage className={styles.pic} src={combineUrl('/', 'img/overseas_student/img_1.jpg')} width={937} height={377} />
          <OverseaStudentForm styles={styles} series={series} seriesOrder={order} />
        </div>
      </div>

      <div className={classNames(styles.group,styles.policy)} id="section-2">
        <div className={styles.title}>
          <p>POLICY BACKGROUND</p>
          <h3>政策背景</h3>
        </div>
        <div className={styles.content}>
          <p>在1992年10月，海关总署、国家计委、国务院经贸办公室、财政部、交通部、国家税务总局、中国汽车工业总公司就联合发布了《关于回国服务的在外留学人员用现汇购买个人自用国产小汽车有关问题的通知》，规定凡在国外正规大学(学院)注册学习毕(结)业和进修期限在一年以上的留学人员，在其免税限量和从境外带进的外汇额度内，可用现汇购买国产免税汽车一辆，以鼓励在外留学人员回国工作。</p>
          <p>上汽通用销售部积极响应国家号召，在国家免税政策优惠之外，再给予一定购车政策优惠，专门开展了面向归国留学生群体的上汽通用留学生免税车服务。</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles.apply)} id="section-3">
        <div className={styles.title}>
          <p>QUALIFICATIONS</p>
          <h3>申请资质</h3>
        </div>
        <div className={styles.content}>
          <p>根据国家相关规定，符合以下条件的留学回国人员可以购买国产免税轿车：</p>
          <ul>
            <li>以学习和进修为目的，无论公派或自费在国外（含港澳地区）正规大学（学院）注册学习毕（结）业或进修（包括合作研究、访问学者、企事业海外研修人员）一年以上</li>
            <li>完成学业或进修结束后两年内回国定居工作</li>
            <li>毕业或进修结束后首次入境未超过一年</li>
          </ul>
          <p className={styles.info}>（该规定如有调整，以国家相关规定为准）</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles.qa)} id="section-4">
        <div className={styles.title}>
          <h3>Q&A</h3>
        </div>
        <div className={styles.content}>
          <ul>
            { qaData.map((item,index) => 
              <li key={index} 
                className={classNames({
                  [styles.active]:qaOpen[index]
                })}
                onClick={()=>{
                  qaOpen[index] = !qaOpen[index];
                  setQaOpen([...qaOpen])
                }}
              >
                <h4><i>Q：</i><span>{divideByElement(item.title)}</span></h4>
                <p><span>{divideByElement(item.tx)}</span></p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <BackTop />
    </main>
  )
}

export default OverseasStudent
