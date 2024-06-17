import BasePage from '@components/BasePage';
import SvgIcon from '@components/icons';
import styles from '@styles/selling.module.scss'
import TradeInfo from '@components/TradeInfo';
import { useEffect } from 'react';
import { trackPv } from '@utils/tracking';

const Selling = () => {
  useEffect(() => {
    trackPv('别克二手车-卖车')
  },[])
  return (
    <BasePage kv={'kv3'}>
      <div className={styles.selling}>
        <div className="container">
          <div className="wd">
            <div className="sub-title">卖车流程</div>
            <div className={styles.steps}>
              <ul>
                <li className={styles.right}>
                   <SvgIcon icon="phone" />
                   <p>电话回访</p>
                </li>
                <li className={styles.right}>
                   <SvgIcon icon="time" />
                   <p>确认进店时间</p>
                </li>
                <li className={styles.right}>
                   <SvgIcon icon="comein" />
                   <p>车主进店<br />确认出售意向</p>
                </li>
                <li className={styles.down}>
                   <SvgIcon icon="car" />
                   <p>车辆评估</p>
                </li>
                <li className={styles.down}>
                   <SvgIcon icon="money" />
                   <p>收款</p>
                </li>
                <li className={styles.left}>
                   <SvgIcon icon="confirm" />
                   <p>确认收购</p>
                </li>
                <li className={styles.left}>
                   <SvgIcon icon="cost" />
                   <p>相关费用认定</p>
                </li>
                <li className={styles.left}>
                   <SvgIcon icon="search" />
                   <p>历史数据查询</p>
                </li>
                <li className={styles.right}>
                   <SvgIcon icon="transfer" />
                   <p>车辆过户</p>
                </li>
                <li>
                   <SvgIcon icon="finish" />
                   <p>完成收购</p>
                </li>
  
              </ul>
            </div>
            <div className="sub-title">卖车信息</div>
            <TradeInfo  routerSource='sell' />
          </div>

        </div>
      </div>
    </BasePage>
  );
};

export default Selling;


export const getStaticProps = async () => {
   try {
      return {
        props:{},
        revalidate: 21600,
      }
   } catch (ex) {
     console.error(ex)
     return {
       props:{}
     }
   }
 }
 