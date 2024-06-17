import { type FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames' 

import styles from '../../styles/components/configurator-common.module.scss'
import AnimateSprite from '@its2easy/animate-sprite';
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
   * 判定限定色
   */
  ticketFlag:boolean
  /**
   * 选择外饰
   */
  onSelectColor:(data:MscAttr)=>void
}

const Viewer: FC<VehicleType> = ({show, name, datas, ticketFlag, onSelectColor}) =>{
  const spriteRef = useRef<HTMLDivElement>(null!);
  const [selectedColor, setSelectedColor] = useState(datas[0])

  useEffect(()=>{
    if(selectedColor.pic360){
      const sprite = new AnimateSprite(spriteRef.current, {
        width: 667,
        height: 375,
        frames: 36,
        cols: 6,
        loop: true,
        draggable: true
      })
      sprite.setFrame(28)
      return () => {
        sprite.destroy()
      }
    }
  },[selectedColor, show])
  useEffect(()=>{
    if(Array.isArray(datas)){
      const idx = datas.length > 1 ? datas.findIndex(el => el.valueAddition && parseInt(el.valueAddition) == 0) : 0;
      onSelectColor(datas[idx])
      setSelectedColor(datas[idx])
    }
  },[datas, onSelectColor])



  return (
    <div className={classNames(styles.viewer,{
      [styles.config]:show
    })}>
      <div className={styles.show}>
        <div className={styles.stage} >
          <span className={styles.name}>{name}</span>
          <div className={styles.sprite}>
            {selectedColor.pic360 && <div style={{
            backgroundImage:`url(${selectedColor.pic360[0]})`
          }} ref={spriteRef}></div>}
          </div>
        </div>
        <div className={styles.colors}>
          <div className={styles.content}>
            {datas.map(item => (
              <div key={item.attrValue} className={classNames(styles.item, {
                [styles.active]: selectedColor.attrValue === item.attrValue
              })} onClick={() => {
                setSelectedColor(item)
                onSelectColor(item)
                trackEvent(`别克官网PC端-选配页-外观-${item.showName}`)
              }}>
                {item.imgUrl && <figure><AliImage src={item.imgUrl} alt={item.showName} width={60} height={43} /></figure>}
                {item.showName && <span className={styles.label}>{divideByElement(item.showName)}</span>}
              </div>
            ))}
          </div>
          { selectedColor.valueAddition && selectedColor.valueAddition != '0' ? <div className={classNames(styles.price,{[styles.flag]:ticketFlag})}>+&yen;<span>{formatPrice(selectedColor.valueAddition)}</span>{ticketFlag && <i>限免</i>}</div> : null }
        </div>
      </div>
    </div>
  )
}
export default Viewer
