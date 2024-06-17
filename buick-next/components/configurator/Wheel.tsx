import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames' 

import styles from '../../styles/components/configurator-common.module.scss'
import type { MscAttr } from './configurator';
import AliImage from '@components/AlImage';
import { divideByElement, formatPrice } from '@utils/helper';
import { trackEvent } from '@utils/tracking';

type VehicleType = {
  show:boolean
  /**
   * 车型名称。
   */
  name:string
  /**
   * 外饰
   */
  datas:MscAttr[]
  /**
   * 选择外饰
   */
  onSelectWheel?:(data:MscAttr)=>void
}

const Wheel: FC<VehicleType> = ({show, name, datas, onSelectWheel}) =>{
  const [selectedColor, setSelectedColor] = useState(datas[0])

  useEffect(()=>{
    
  },[show])
  useEffect(()=>{
    if(Array.isArray(datas)){
      const idx = datas.length > 1 ? datas.findIndex(el => el.valueAddition && parseInt(el.valueAddition) == 0) : 0;
      onSelectWheel?.(datas[idx])
      setSelectedColor(datas[idx])
    }
  },[datas, onSelectWheel])



  return (
    <div className={classNames(styles.viewer,styles.wheel,{
      [styles.config]:show
    })}>
      <div className={styles.show}>
        <div className={styles.stage} >
          <span className={styles.name}>{name}</span>
          <div className={styles.pic}>{ selectedColor.carPic && <AliImage src={selectedColor.carPic} alt={selectedColor.showName} width={1500} height={800} /> }</div>
        </div>
        <div className={styles.colors}>
          <div className={styles.content}>
            {datas.map(item => (
              <div key={item.attrValue} className={classNames(styles.item, {
                [styles.active]: selectedColor.attrValue === item.attrValue
              })} onClick={() => {
                setSelectedColor(item)
                onSelectWheel?.(item)
                trackEvent(`别克官网PC端-选配页-外观-${item.showName}`)
              }}>
                {item.imgUrl && <figure><AliImage src={item.imgUrl} alt={item.showName} width={180} height={180} /></figure>}
                {item.showName && <span className={styles.label}>{divideByElement(item.showName)}</span>}
              </div>
            ))}
          </div>
          { selectedColor.valueAddition && selectedColor.valueAddition != '0' ? <div className={styles.price}>+&yen;<span>{formatPrice(selectedColor.valueAddition)}</span></div> : null }
        </div>
      </div>
    </div>
  )
}
export default Wheel
