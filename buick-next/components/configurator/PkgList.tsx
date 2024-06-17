import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from '@styles/components/configurator-common.module.scss'
import AliImage from '@components/AlImage'

import { formatPrice } from '@utils/helper'
import type { AdditionalPkg } from './configurator'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { trackEvent } from '@utils/tracking'


type PkgTypes = {
  show:boolean
  datas:AdditionalPkg[]
  onSelecPkg:(data:AdditionalPkg[])=>void
}


 const PkgList: FC<PkgTypes> = ({show,datas,onSelecPkg}) => {
  const [pkgsData,setPkgsData] = useState<AdditionalPkg[]>()

  useEffect(()=>{
    const data = datas.filter(el=> el.attrValue = '0')
    setPkgsData(data)
    onSelecPkg(data)
  },[datas, onSelecPkg])


  return (
    <div className={classNames(styles.viewer,{
      [styles.config]:show
    })}>
      <div className={styles.pkg}>
        { pkgsData && pkgsData.length > 0 ? pkgsData.map((item,index)=> (
          <div key={index} className={classNames(styles.item,{
            [styles.active]: item.attrValue == '1'
          })} onClick={()=>{
            pkgsData[index].attrValue = item.attrValue == '0' ? '1':'0';
            pkgsData[index].attrValue == '1' && trackEvent(`别克官网PC端-选配页-选装包-${item.attrName}`)
            onSelecPkg([...pkgsData])
          }}>
            <Swiper className={styles.pgkswipr} modules={[Navigation]} navigation>
              {item.imgUrls && item.imgUrls.map((img,idx)=> (
                <SwiperSlide key={idx}><AliImage src={img} alt={item.attrName} width={880} height={497} /></SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.content}>
              <div className={styles.checked}></div>
              <div className={styles.title}>{item.attrName}</div>
              <div className={styles.price}>+&yen;<span>{formatPrice(item.price)}</span></div>
              <div className={styles.intro}>
                <ol>
                  {item.showName.split(',').map((item,index)=>(<li key={index}>{item}</li>))}
                </ol>
              </div>
            </div>
          </div>
          )) 
        :
          <div className={styles.empty}>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 680.88"><defs><clipPath id="a"><rect width="660" height="680.88" fill="none"/></clipPath></defs><g opacity="0.4"><g clipPath="url(#a)"><path d="M0,639c0,22.62,146.71,41,327.68,41s327.68-18.34,327.68-41-146.71-41-327.68-41S0,616.34,0,639Z" /><path d="M11.47,223.63a12.06,12.06,0,0,0,12.29,12.28,12.29,12.29,0,0,0,0-24.57,12.59,12.59,0,0,0-12.29,12.29Zm648,364.13c-15.57,4.1-18.85,7.37-22.53,22.53-4.1-15.57-7.38-18.84-22.53-22.53,15.15-4.1,18.84-7.37,22.53-22.53,3.68,15.16,7,18.84,22.53,22.53ZM79.87,180.62C59.8,185.94,55.71,190,50.38,210.11,45.05,190,41,185.94,20.89,180.62c20.07-5.33,24.16-9.83,29.49-29.49,4.92,20.07,9.42,24.16,29.49,29.49Zm491.52-70.45c-12.29,3.28-14.74,5.73-18,18-3.28-12.29-5.73-14.74-18-18,12.29-3.28,14.74-5.74,18-18,2.87,12.29,5.73,14.75,18,18Zm52.84-63.08c-32,8.19-38.5,15.15-47.11,47.1C568.93,62.24,562,55.69,530,47.09c32-8.2,38.5-15.16,47.1-47.11,8.2,31.54,15.16,38.51,47.11,47.11Z" /></g></g><path d="M606.21,363.71v-.82c0-.82-.41-1.23-.41-2.05v-.41L517.73,130.65A94.17,94.17,0,0,0,428,65.52H227.74A94.19,94.19,0,0,0,138,130.65L50,360.43v.41a3.7,3.7,0,0,0-.41,2.05V528.37a94.22,94.22,0,0,0,94.21,94.21H512.41a94.22,94.22,0,0,0,94.21-94.21V364.53c-.41-.41-.41-.41-.41-.82ZM161,139.25a.4.4,0,0,1,.41-.41A69,69,0,0,1,227.74,90.1H427.62a70,70,0,0,1,66.77,48.33.4.4,0,0,0,.41.41l81.51,213H389.12a12.08,12.08,0,0,0-12.29,12.29,49.15,49.15,0,1,1-98.3,0,12.08,12.08,0,0,0-12.29-12.29H79.46ZM581.63,528.37A69.57,69.57,0,0,1,512,598H143.36a69.57,69.57,0,0,1-69.63-69.63V376.82H255.18a73.5,73.5,0,0,0,145,0H581.63Z" /><path d="M327.68,385a20.28,20.28,0,0,1-20.48-20.48v-41H120.83L188,148.26l.4-.82a41.32,41.32,0,0,1,39.33-28.67H427.62A41.33,41.33,0,0,1,467,147.44l.41.82,67.17,175.31H348.16v41A20.28,20.28,0,0,1,327.68,385Z" opacity="0.4"/></svg>
            </div>
            <div className={styles.desc}>该版本车型暂不支持选装升级</div>
          </div>
        }
      </div>
    </div>
  )
}
export default PkgList
