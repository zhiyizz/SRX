import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '@styles/century.module.scss'
import MediaComponent from '@components/MediaComponent'
import SvgIcon from '@components/icons'
import type { FeatureJson } from '~types/centruy'

export default function Part4Section({
  onOverlay,
  data,
  prefix,
}:{
  onOverlay: (type: string) => void
  data:FeatureJson
  prefix?: string
}) {
  const fbiRef = useRef<HTMLDivElement>(null!)
  const item1Ref = useRef<HTMLDivElement>(null!)
  const item2Ref = useRef<HTMLDivElement>(null!)
  const item3Ref = useRef<HTMLDivElement>(null!)
  const item4Ref = useRef<HTMLDivElement>(null!)
  const [arrowShow, setArrowShow] = useState<number>(0)
  const [img,setImg] = useState<boolean>();
  useEffect(() => {
    const arr = fbiRef.current.querySelectorAll('img');
    const len = arr[arr.length -1];
    if(len.height > 0){
      setImg(true)
    }
  },[data])
  useEffect(()=>{
    const timeLine = gsap.timeline({
      scrollTrigger:{
        trigger:fbiRef.current,
        end:`+=${window.innerHeight * 15}`,
        scrub:1.5
      }
    })
    const itemDiv = fbiRef.current.getElementsByClassName(styles.itemmod);
    gsap.set(itemDiv, {zIndex: (i, target, targets) => targets.length - i});
    timeLine
      .to(item1Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none"
      },'+=0.5') 
      .to(item1Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item2Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none",
        onStart:()=>{
          setArrowShow(1)
        },
        onReverseComplete:()=>{
          setArrowShow(0)
        }
      }) 
      .to(item2Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item3Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none"
      }) 
      .to(item3Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item4Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        delay:0.5,
        ease:"none"
      })

    return()=>{
      timeLine.scrollTrigger?.kill()
    }
  },[img])
  return (
    <div className={styles['fbi-container']} ref={fbiRef}>
      <div className={classNames(styles.itemmod,styles['part4-item-1'])} ref={item1Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.bottom)}>
            <h3>智慧互联，坐享从容</h3>
            <p className={styles.content}>VCS智能座舱、双车规级旗舰高通骁龙8155芯片，领衔智能科技，把控全局，驭见未来。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[0].media!} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part4-item-2'])} ref={item2Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>全新一代VCS智能座舱</h3>
            <p className={styles.content}>别克世纪采用别克全新一代VCS智能座舱，一体式纯净设计和一体化仪表板的造型简洁并极具设计感和科技感。全新一代的5G Tbox模块能够集成5G网络连接服务，为车辆带来更加安全、稳定和高速的数据支持。同时可支持整车FOTA功能，具有一定的性能冗余以满足未来功能体验的升级。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[1].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
              [styles.show]:arrowShow === 1
            })}
            onClick={() => onOverlay('cockpit')}>
              <span className={styles.copy}>
                <small>查看更多</small>
              </span>
              <span className={styles.arrow}>
                <SvgIcon icon="arrow-up" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part4-item-3'])} ref={item3Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.bottom,styles['theme-dark'])}>
            <h3>8吋智控屏</h3>
            <p className={styles.content}>座舱二排中央扶手配备8英寸智控屏，搭载车规级旗舰高通骁龙8155芯片，可实现整车控制与座椅调节等个性化设置，高效操作，安心自在。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[2].media!} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={styles.itemmod} ref={item4Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.bottom,styles['theme-dark'])}>
            <h3>iKey手机钥匙</h3>
            <p className={styles.content}>通过蓝牙与车主手机连接，实现手机遥控车辆，提升了用车的便捷性和安全性<br/><small>*别克品牌将持续拓展iKey手机钥匙的适用设备，当前可支持的智能设备，请咨询客服及当地经销商</small></p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[3].media!} prefix={prefix} />
          </div>
        </div>
      </div>
    </div>
  )
}
