import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '@styles/centuryspecial.module.scss'
import MediaComponent from '@components/MediaComponent'
import SvgIcon from '@components/icons'
import type { FeatureJson } from '~types/centruy'

export default function Part2Section({
  onOverlay,
  data,
  prefix,
}:{
  onOverlay: (type:string) => void
  data:FeatureJson
  prefix?: string
}) {
  const fbiRef = useRef<HTMLDivElement>(null!)
  const item1Ref = useRef<HTMLDivElement>(null!)
  const item2Ref = useRef<HTMLDivElement>(null!)
  const item3Ref = useRef<HTMLDivElement>(null!)
  const item4Ref = useRef<HTMLDivElement>(null!)
  const item5Ref = useRef<HTMLDivElement>(null!)
  const item6Ref = useRef<HTMLDivElement>(null!)
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
        end:`+=${window.innerHeight * 21}`,
        scrub:1.5
      }
    })
    const itemDiv  = fbiRef.current.getElementsByClassName(styles.itemmod);
    gsap.set(itemDiv, {zIndex: (i, target, targets) => targets.length - i});

    timeLine
      .to(item1Ref.current.getElementsByClassName(styles.info),{
        y:0,
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
        ease:"none"
      }) 
      .to(item4Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item5Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none"
      })
      .to(item5Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item6Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none",
        onStart:()=>{
          setArrowShow(2)
        },
        onReverseComplete:()=>{
          setArrowShow(1)
        }
      })
      .to(item6Ref.current,{
        delay:0.5,
        ease:"none"
      })
    return()=>{
      timeLine.scrollTrigger?.kill()
    }
  },[img])
  return (
    <div className={styles['fbi-container']} ref={fbiRef}>
      <div className={classNames(styles.itemmod,styles['part2-item-1'])} ref={item1Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>奢适空间，演绎格调</h3>
            <p className={styles.content}>预设7种座椅一键联动模式，打造多场景宽适空间，第二排航空座椅与第三排剧院式座椅满足空间舒适、乘坐舒适、触觉舒适、功能舒适和操作舒适五大维度，营造全方位尊享体验。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[0].media} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={styles.itemmod} ref={item2Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>宽阔灵活与丰富便利的储物空间</h3>
            <p className={styles.content}></p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[1].media} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 1
              })}
              onClick={() => onOverlay('space')}>
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

      <div className={styles.itemmod} ref={item3Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>第二排航空座椅</h3>
            <p className={styles.content}>第二排带豪华大包围扶手的高级打孔真皮航空座椅，配备了靠背，腿托，腰托，脚踏和前后调节，共计14向电动调节功能，提供丰富的坐姿选择。十点式按摩功能，覆盖了肩部、背部、腰部，八种模式调节，三挡强度调节，置身其中，即可享受到头等舱般的坐乘体验。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[2].media} prefix={prefix} />
          </div>
        </div>
      </div>


      <div className={styles.itemmod} ref={item4Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.bottom)}>
            <h3>第三排剧院式座椅</h3>
            <p className={styles.content}>第三排座椅发泡厚度达160mm，接触面均采用高级打孔真皮，打造舒适尊贵的第三排乘坐体验。通过电动6：4分剧院式翻折功能，满足更多用车场景需求。同时，Isofix儿童座椅接口、Type A+Type C 的USB充电接口等，完美诠释了乘坐与功能的平衡。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[3].media} prefix={prefix} />
          </div>
        </div>
      </div>


      <div className={styles.itemmod} ref={item5Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>别克QuietTunning图书馆静音科技</h3>
            <p className={styles.content}>世纪采用别克QuietTunning图书馆静音科技，Bose ANC主动降噪技术，静音轮胎等，大大降低日常驾驶过程中的发动机噪音，无论在停驻或行进时，都能时刻享受新“静界”。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[4].media} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={styles.itemmod} ref={item6Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info)}>
            <h3>驾驭澎湃，稳健前行</h3>
            <p className={styles.content}>全新一代智能驱动系统，澎湃动力、平顺输出，配合后五连杆独立后悬，进一步提高驾驶的驱动性能。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[5].media} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 2
              })}
              onClick={() => onOverlay('quality')}>
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
    </div>
  )
}
