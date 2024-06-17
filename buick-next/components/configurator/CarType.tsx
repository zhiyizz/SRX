import { type FC, useState } from 'react'
import classNames from 'classnames'
import styles from '@styles/components/configurator-common.module.scss'
import AliImage from '@components/AlImage'

import { formatPrice } from '@utils/helper'
import type { SpuInfo } from './configurator'
import { trackEvent } from '@utils/tracking'


type CarTypePage = {
  show:boolean
  datas:SpuInfo[]
  onCurrent: (index: number) => void
}

 const CarType: FC<CarTypePage> = ({show,datas,onCurrent}) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  return (
    <div className={classNames(styles.viewer,{
      [styles.config]:show
    })}>
      <div className={styles.cartype}>
        {datas.map((item,index)=> (
          <div key={index} className={classNames(styles.item,{
            [styles.active]:index === currentIdx
          })} onClick={()=>{
            setCurrentIdx(index)
            onCurrent(index)
            trackEvent(`别克官网PC端-选配页-${item.spuName}`)
          }}>
            <div className={styles.img}><AliImage src={item.picList[0]} alt={item.spuName} width={1500} height={800} /></div>
            <div className={styles.content}>
              <div className={styles.title}>{item.spuName}</div>
              {/* <div className={styles.desc}>平台尊享</div> */}
              { item.rangePrice && <div className={styles.price}>&yen;<span>{formatPrice(item.rangePrice)}</span>起</div> }
              <div className={styles.intro}>
                <ol>
                  {item.basicConfig.split(',').map((item,index)=>(<li key={index}>{item}</li>))}
                </ol>
              </div>
              {item.deliveryTime && <div className={styles.waitdate}>交付时间  {item.deliveryTime}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CarType
