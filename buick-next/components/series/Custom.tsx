import AliImage from '@components/AlImage'
import { combineUrl, divideByElement } from '@utils/helper'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper'
import styles from '../../styles/components/series-overlay.module.scss'
import Overlay, { type SeriesOverlayProps } from './Overlay'
import { useEffect, useState } from 'react'

/**
 * 表示车色的对象。
 */
export type VehicleColor = {
  /**
   * 车色代码（同图片的目录名）。
   */
  code: string
  /**
   * 车色名称。
   */
  name: string
}

type infoListType = {
  url:string
  width:number
  height:number
  tx?:string
}
type infoType = {
  title:string
  list:infoListType[]
}
type swiperDataType = {
  url:string
  width:number
  height:number
  title?:string
  tx?:string
}
type customDataType = {
  tabName:string
  icon:string
  iconWidth:number
  iconHeight:number
  info:infoType,
  swiperData:swiperDataType[]
}
const prefix = '/img/common/series/custom'
const customData:customDataType[] = [
  {
    tabName:'定制内饰',
    icon:'tab_icon_1.png',
    iconWidth:28,
    iconHeight:36,
    info:{
      title:'内饰颜色',
      list:[
        {
          url:'interior_color.png',
          width:59,
          height:59,
          tx:'红丝绒款Alcantara\n红黑麂皮内饰'
        }
      ]
    },
    swiperData:[
      {
        url:'interior_img_1.jpg',
        width:1107,
        height:516,
        title:'红丝绒款\nAlcantara红黑麂皮内饰',
        tx:'翻毛皮材质红黑撞色搭配，更显时尚动感气质。个性化定制方向盘，前舱中控台，扶手箱，前后座椅独立定制。触感丝绒，驾享舒适，在强劲动感氛围中，赋予细腻高级的质感，并同时满足个性化品味追求。 '
      },
      {
        url:'interior_img_2.jpg',
        width:1107,
        height:516,
      },
      {
        url:'interior_img_3.jpg',
        width:1107,
        height:516,
      },
      {
        url:'interior_img_4.jpg',
        width:1107,
        height:516,
      }
    ]
  },
  {
    tabName:'定制轮毂',
    icon:'tab_icon_2.png',
    iconWidth:31,
    iconHeight:31,
    info:{
      title:'轮毂样式',
      list:[
        {
          url:'lun_img_1.jpg',
          width:116,
          height:105
        },
        {
          url:'lun_img_2.jpg',
          width:116,
          height:105
        },
        {
          url:'lun_img_3.jpg',
          width:116,
          height:105
        },
        {
          url:'lun_img_4.jpg',
          width:116,
          height:105
        }
      ]
    },
    swiperData:[
      {
        url:'exterior_img_1.jpg',
        width:1107,
        height:515,
        title:'18吋漩涡双色铝合金轮毂',
      },
      {
        url:'exterior_img_2.jpg',
        width:1107,
        height:515,
        title:'18吋双旋双色铝合金轮毂',
      },
      {
        url:'exterior_img_3.jpg',
        width:1107,
        height:515,
        title:'20吋极刃双色铝合金轮毂',
      },
      {
        url:'exterior_img_4.jpg',
        width:1107,
        height:515,
        title:'20吋星耀双色铝合金轮毂',
      }
    ]
  }
]

export default function Custom({...rest}: SeriesOverlayProps) {
  const [tabIdx,setTabIdx] = useState<number>(0)
  const [current,setCurrent] = useState<number[]>([])
  const [title, setTitle] = useState<string>()
  const [text, setText] = useState<string>()
  const [swiperObj,setSwiperObj] = useState<SwiperType[]>([])
  useEffect(()=>{
    const data = customData[tabIdx].swiperData;
    const title = data[current[tabIdx]]?.title ? data[current[tabIdx]].title : data[0]?.title
    const text = data[current[tabIdx]]?.tx ? data[current[tabIdx]].tx : data[0]?.tx
    setTitle(title)
    setText(text)
  },[tabIdx,current])
  return (
    <Overlay {...rest}>
      <div className={styles.custom}>
        <h2>专属定制</h2>
        <div className={styles.container}>
            <div className={styles.tabs}>
              { customData.map((item,index) => 
                <div key={index} className={classNames(styles.item,{
                  [styles.active]:tabIdx === index
                })} onClick={()=>setTabIdx(index)}>
                  <AliImage src={combineUrl(prefix,item.icon)} width={item.iconWidth} height={item.iconHeight} />
                  <p>{item.tabName}</p>
                </div>)
              }
            </div>
            { customData.map((item,index) => {
              return <div key={index} className={classNames(styles.group,{
                [styles.active]:tabIdx === index,
                [styles.interior]: index === 0
              })}>
                <div className={styles.info}>
                  <h3>{item.info.title}</h3>
                  <div className={styles.wrap}>
                    { item.info.list.map((infoItem,infoIdx) => 
                      <div key={infoIdx} className={styles.item}>
                        <div className={classNames(styles.pic,{
                          [styles.active]:current[1] === infoIdx && index === 1
                        })} onClick={()=> {
                          tabIdx === 1 && swiperObj[tabIdx].slideTo(infoIdx)
                        }}><AliImage src={combineUrl(prefix,infoItem.url)} width={infoItem.width} height={infoItem.height} /></div>
                        { infoItem.tx && <p>{divideByElement(infoItem.tx)}</p> }
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles['swiper-item']}>
                  <Swiper
                    className={styles['custom-swiper']}
                    modules={[Pagination, Autoplay, Navigation]}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false
                    }}
                    pagination={{
                      clickable: true,
                      renderBullet: function (index, className) {
                        return `<span class="${className}">${(index + 1)}</span>`;
                      },
                    }}
                    navigation
                    onSwiper={swiper=> {
                      swiperObj[index] = swiper
                      setSwiperObj([...swiperObj])
                    }}
                    onInit={swiper => {
                      current[index] = swiper.activeIndex
                      setCurrent([...current])
                    }}
                    onSlideChangeTransitionStart={swiper => {
                      current[index] = swiper.activeIndex
                      setCurrent([...current])
                    }}
                  >
                    {item.swiperData.map((swiperItem, index) => <SwiperSlide key={index}>
                      <AliImage src={combineUrl(prefix,swiperItem.url)} width={swiperItem.width} height={swiperItem.height} />
                      </SwiperSlide>
                    )}
                  </Swiper>
                  
                  <div className={styles.content}>
                    <h4>{title && divideByElement(title)}</h4>
                    <p>{text && divideByElement(text)}</p>
                  </div>
                </div>

              </div>
          })}
        </div>
      </div>
    </Overlay>
  )
}
