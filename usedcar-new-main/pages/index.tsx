import BasePage from '@components/BasePage'
import KvSlide from '@components/KvSlide';
import SubMenu from '@components/SubMenu';
import AliImage from '@components/AlImage';
import classNames from 'classnames';
import SvgIcon from '@components/icons';
import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import MoreCarList from '@components/MoreCarList';
import { GetStaticProps } from 'next';
import { getJsonFile } from '@utils/fs';
import BaiduScript,{BaiduLocation} from '@components/BaiduScript';
type provType = {
  province:{
    proid : string
    proname : string
    propy : string,
    citys : {
      cityid : string
      citypy :  string
      cityname :  string
      }[]
    }[]
}
export default function Home({provinceJson}:{provinceJson:provType}) {
  const [tab,setTab] = useState(0);
  const [pos,setPos] = useState<BaiduLocation>()

  return (
    <BasePage className={styles.main} kv={'kv'}>
       <BaiduScript onPosition={l => setPos(l)} />
      <div className="container">
        <div className={classNames(styles.section,styles.s1)}>
          <div className="wd">
            <div className="sub-title">关于官方认证二手车</div>
            <p>别克官方认证二手车，依托原厂坚实保障，严苛的车辆检测标准和规范化业务流程，奉上可靠、专业和便捷的一站式全方位服务。别克官方认证二手车值得信赖、讲究品质，每一辆交付给消费者的别克官方二手车，都将经过严格的品质检测和专业维修整备，焕然一新。无论买车、卖车，还是置换，都让顾客感受到物超所值，更为他们的美好生活带来增值。</p>
          </div>
        </div>
        <div className={classNames(styles.section,styles.s2)}>
          <div className={styles.main}>
            <div className="sub-title">产品卖点</div>
            <div className={styles['tab-wrapper']}>
              <ul>
                <li className={classNames(tab===0?styles.active:'')} onClick={() => setTab(0)}>
                  <SvgIcon icon="car" className={styles.icon} />
                  <p>7大类188项严苛检测</p>
                </li>
                <li className={classNames(tab===1?styles.active:'')} onClick={() => setTab(1)}>
                  <SvgIcon icon="shield" />
                  <p>1年/3万公里原厂质保</p>
                </li>
                <li className={classNames(tab===2?styles.active:'')} onClick={() => setTab(2)}>
                  <SvgIcon icon="money" />
                  <p>无忧贷专业金融贷款政策</p>
                </li>
                <li className={classNames(tab===3?styles.active:'')} onClick={() => setTab(3)}>
                  <SvgIcon icon="server" />
                  <p>专享放心售后服务</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles['tab-container']}>
            <div className={styles.main}>
            <div className={classNames(styles['tab-item'],tab===0?styles.active:'')}>
              <fieldset>
                <legend>7大类188项严苛检测   杜绝事故车</legend>
                <div className={styles.item1}>
                    <ul>
                      <li>
                        <AliImage src={'/img/i1_icon1.jpg'} width={127} height={106} alt="" />
                        <p>车辆历史检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon2.jpg'} width={127} height={106} alt="" />
                        <p>车辆历史检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon3.jpg'} width={127} height={106} alt="" />
                        <p>车辆内部检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon4.jpg'} width={127} height={106} alt="" />
                        <p>车辆机舱内部检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon5.jpg'} width={127} height={106} alt="" />
                        <p>车辆底盘检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon6.jpg'} width={127} height={106} alt="" />
                        <p>新能源部件检查</p>
                      </li>
                      <li>
                        <AliImage src={'/img/i1_icon7.jpg'} width={127} height={106} alt="" />
                        <p>车辆试路检查</p>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>
              <div className={classNames(styles['tab-item'],tab===1?styles.active:'')}>
              <fieldset>
                <legend>别克1年/3万公里原厂全国联保  驾驭后顾无忧</legend>
                <div className={styles.item2}>
                    <div className={styles.row}>
                      <div className={styles.title}>
                        <div className={styles.box}><h4>动力</h4><em>总成质保</em></div>
                        <i>动力总成质保标志</i>
                      </div>
                      <div className={styles.copy}>
                        <p><b>适用车型：</b>仅限于上汽通用汽车旗下别克品牌车辆</p>
                        <p><b>质保资格：</b>车龄大于5年小于等于7年，行驶里程数少于等于15万公里</p>
                        <p><b>质保范围：</b>发动机（新增涡轮增压器）、变速箱、传动系统</p>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.title}>
                        <div className={styles.box}><h4>综合</h4><em>质保</em></div>
                        <i>综合质保标志</i>
                      </div>
                      <div className={styles.copy}>
                        <p><b>适用车型：</b>仅限于上汽通用汽车旗下别克品牌车辆</p>
                        <p><b>质保资格：</b>车龄小于等于5年，行驶里程数少于等于15万公里</p>
                        <p><b>质保范围：</b>发动机、变速箱、传动和转向及制动、空调系统/燃油系统、模块及电气/电器、废气及排放系统、影音娱乐/导航/组合仪表灯具、离合器部件（离合器片除外）、涡轮增压部件、混合动力部件（参照新车质保标准）</p>
                      </div>
                    </div>
                </div>
                </fieldset>
              </div>
              <div className={classNames(styles['tab-item'],tab===2?styles.active:'')}>
              <fieldset>
                <legend>无忧贷专业金融贷款政策</legend>
                <div className={styles.item3}>
                  <p className={styles.title}>由上汽通用汽车联合上汽通用汽车金融有限责任公司（GMAC-SAIC）提供，一对一专员服务，让您购车进程更快更便捷，首付压力更低，付款方式更多样化，还款方式更灵活，全程无忧。</p>
                  <div className={styles.step}>
                    <div className={styles['p-item']}>
                      选择<br />金融方案
                    </div>
                    <div className={styles.arrow}><span></span></div>
                    <div className={styles['p-item']}>
                      电话<br />回访核实
                    </div>
                    <div className={styles.arrow}><span></span></div>
                    <div className={styles['p-item']}>
                      签署<br />贷款合同
                    </div>
                    <div className={classNames(styles.arrow,styles.down)}><span></span></div>
                    <div className={styles['p-item']}>办理<br />手续提车</div>
                    <div className={classNames(styles.arrow,styles.left)}><span></span></div>
                    <div className={styles['p-item']}>按时<br />结清贷款</div>
                  </div>
                  <div className={styles.table}>
                    <p className={styles.title}>别克认证二手车金融产品</p>
                    <ul>
                      <li>
                        <h4>产品</h4>
                        <p>别等“贷”</p>
                      </li>
                      <li>
                        <h4>利率</h4>
                        <p>11.9%</p>
                      </li>
                      <li>
                        <h4>贷款金额</h4>
                        <p>3-15万</p>
                      </li>
                      <li>
                        <h4>贷款期限</h4>
                        <p>1-3年</p>
                      </li>
                      <li>
                        <h4>提供资料</h4>
                        <p>两证一卡</p>
                      </li>
                      <li>
                        <h4>车龄</h4>
                        <p>8年</p>
                      </li>
                      <li>
                        <h4>附加品</h4>
                        <p>10%比例</p>
                      </li>
                    </ul>
                  </div>
                </div>
                </fieldset>
              </div>
              <div className={classNames(styles['tab-item'],tab===3?styles.active:'')}>
                <fieldset>
                  <legend>专享放心售后服务</legend>
                  <div className={styles.item4}>
                    <p>售后多重安心保障，服务遍及全国，便捷就在身边</p>
                    <b>全国服务热线：400-920-3535（免费）</b>
                    <div className={styles.server}>
                      <p className={styles.title}>免费增值服务，享受物超所值</p>
                      <div className={styles.type}>
                        <div className={styles.col}>
                          <SvgIcon icon="car" className={styles.svg}   />
                          <p>一次免费车辆检查</p>
                        </div>
                        <div className={styles.col}>
                            <AliImage className={styles.img}  src="/img/onstar-logo.jpg"  height={150} width={180}  alt={''} />
                            <p>6个月免费OnStar服务<br />（含OnStar功能车辆）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles.section,styles.s3)}>
          <div className="wd">
            <div className="sub-title">最新车源</div>
            <MoreCarList provinceJson={provinceJson} point={pos} />
          </div>
        </div>
      </div>
    </BasePage>
  )
}

export const getStaticProps: GetStaticProps<any> = async (context) => {
  try {
     const provinceJson:provType = getJsonFile(`data/province`)
     return {
        props: {
          provinceJson,
        },
        revalidate: 21600,
     }
  } catch (ex) {
     console.error(ex)
     return {
        props: {
          provinceJson: ''
        }
     }
  }
}

