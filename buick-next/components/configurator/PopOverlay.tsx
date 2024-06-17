import { formatPrice } from '@utils/helper'
import styles from '@styles/components/configurator-common.module.scss'
import type { SkuInfo } from './configurator'
import classNames from 'classnames'
import { trackEvent } from '@utils/tracking'

type OverlayType = {
  showType?:string
  datas?:SkuInfo
  price?:number
  onShow:(name:boolean)=>void
  onBack?:(data:string)=>void
}

export default function PopOverlay({showType = 'summary',datas,price = 0,onShow,onBack}:OverlayType) {
  return (
    <div className={styles['pop-overlay']}>
      {showType === 'summary' && datas && <div className={classNames(styles.box,styles.summary)}>
        <div className={styles.close} onClick={()=> onShow(false)}></div>
        <div className={styles.content}>
          <div className={styles.title}>配置明细</div>
          <div className={styles.list}>
            <div className={styles.item}>
              <p> {datas.skuName} </p>
              <p className={styles.price}>+&yen;{formatPrice(datas.attrList.PRICE_RANGE.attrValue)}</p>
            </div>
            <div className={styles.item}>
              <p>{datas.attrList.COLOR_ID.name}</p>
              <p className={styles.price}>
                { datas.attrList.COLOR_ID.price && datas.attrList.COLOR_ID.price != '0' ? 
                  <>{ datas.ticketFlag ? <><span className={styles.flag}>+&yen;{formatPrice(datas.attrList.COLOR_ID.price ?? 0)}</span><span>&yen;0</span></> : <span>+&yen;{formatPrice(datas.attrList.COLOR_ID.price ?? 0)}</span>}</>
                  : 
                  <>价格已包含</>
                } 
              </p>
            </div>
            {datas.attrList.INNER_COLOR.attrValue !== "" && <div className={styles.item}>
              <p>{datas.attrList.INNER_COLOR.name}</p>
              <p className={styles.price}>
                { datas.attrList.INNER_COLOR.price && datas.attrList.INNER_COLOR.price != '0' ? 
                  <>+&yen; {formatPrice(datas.attrList.INNER_COLOR.price ?? 0)}</>
                  : 
                  <>价格已包含</>
                }
              </p>
            </div>}
            {datas.attrList.WHEEL.attrValue !== "" && <div className={styles.item}>
              <p>{datas.attrList.WHEEL.name}</p>
              <p className={styles.price}>
                { datas.attrList.WHEEL.price && datas.attrList.WHEEL.price != '0' ? 
                  <>+&yen; {formatPrice(datas.attrList.WHEEL.price ?? 0)}</>
                  : 
                  <>价格已包含</>
                }
              </p>
            </div>}
            <div className={styles.item}>
              <p>选装包</p>
              <p className={styles.pkgs}>
                {
                  Object.keys(datas.attrList).some((el)=> datas.attrList[el].pkgShow) ?
                  Object.keys(datas.attrList).map((el,idx)=> datas.attrList[el].pkgShow && <span key={idx} className={styles.row}>
                  <span>{datas.attrList[el].name}</span>
                    <span className={styles.price}>+&yen;{formatPrice(datas.attrList[el].price ?? 0)}</span>
                  </span>)
                  :
                  <span className={styles.row}>
                    <span className={styles.price}>+&yen;0</span>
                  </span>
                }
              </p>
            </div>
          </div>
          <div className={styles.total}>
            <span>总价</span>
            <div className={styles.price}>&yen;<span>{formatPrice(price)}</span></div>
          </div>
        </div>
      </div>}
      { showType === 'dialog' && <div className={classNames(styles.box,styles.dialog)}>
        <div className={styles.title}></div>
        <div className={styles.content}>如果选择更换车型，<br/>您需要重新配置您的爱车</div>
        <div className={styles.buttons}>
          <div className={classNames(styles.btn,styles.cancel)} onClick={()=> onShow(false)}>取消</div>
          <div className={classNames(styles.btn,styles.confirm)} onClick={()=>{
            onShow(false)
            trackEvent('别克官网PC端-选配页-我的爱车结果页-重新配置')
            onBack && onBack('carType')
          }}>确认</div>
        </div>
      </div>}
    </div>
  )
}
