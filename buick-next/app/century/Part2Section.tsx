import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '@styles/century.module.scss'
import MediaComponent from '@components/MediaComponent'
import SvgIcon from '@components/icons'
import type { FeatureJson } from '~types/centruy'

export default function Part2Section({
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
  const item5Ref = useRef<HTMLDivElement>(null!)
  const [img,setImg] = useState<boolean>();
  const [arrowShow, setArrowShow] = useState<number>(0)

  useEffect(() => {
    const arr = fbiRef.current.querySelectorAll('img');
    const len = arr[arr.length -1];
    if(len.height > 0){
      setImg(true)
    }
  },[data])
  useEffect(()=>{
    if(!img) return;
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
        y:0,
        opacity:1,
        direction:1,
        ease: "none",
          onStart:()=>{
          setArrowShow(5)
        },
        onReverseComplete:()=>{
          setArrowShow(1)
        }
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
          setArrowShow(5)
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
        ease:"none",
        onStart:()=>{
          setArrowShow(2)
        },
        onReverseComplete:()=>{
          setArrowShow(1)
        }
      }) 
      .to(item3Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item4Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        ease:"none",
        onStart:()=>{
          setArrowShow(3)
        },
        onReverseComplete:()=>{
          setArrowShow(2)
        }
      }) 
      .to(item4Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item5Ref.current.getElementsByClassName(styles.info),{
        opacity:1,
        direction:1,
        delay:0.5,
        ease:"none",
        onStart:()=>{
          setArrowShow(4)
        },
        onReverseComplete:()=>{
          setArrowShow(3)
        }
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
            <h3>感官奢享，定义舒适</h3>
            <p className={styles.content}>160度云感座椅、Bose® Executive Edition悦尊音响系统，配合静谧空间，沉浸感官奢享之境，感受舒适乘坐体验。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[0].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 5
              })}
              onClick={() => onOverlay('internal')}>
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

      <div className={styles.itemmod} ref={item2Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>160度云感座椅</h3>
            <p className={styles.content}>Fine Nappa半苯胺高级真皮包裹，18向全电动调节、一体翻转式脚踏，18点分区指感按摩及石墨烯颈托/脚踏加热等功能，让你坐享恣意之旅。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[1].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 1
              })}
              onClick={() => onOverlay('seat')}>
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
          <div className={classNames(styles.info)}>
            <h3>21扬声器<br/>Bose Executive Edition悦尊音响系统</h3>
            <p className={styles.content}>Bose奢华级音响系统，以21只高性能扬声器环绕座舱。后席双头枕内置UltraNearfield超近场扬声器，营造交响音乐厅般的超强空间感。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[2].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 2
              })}
              onClick={() => onOverlay('bose')}>
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


      <div className={styles.itemmod} ref={item4Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>别克QuietTunning图书馆静音科技</h3>
            <p className={styles.content}>世纪采用别克QuietTunning图书馆静音科技，配备5mm双层声学玻璃，Bose ANC主动降噪技术，静音轮胎等，大大降低日常驾驶过程中的发动机噪音，无论在停驻或行进时，都能时刻享受新“静界”。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[3].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 3
              })}
              onClick={() => onOverlay('tech')}>
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


      <div className={styles.itemmod} ref={item5Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>驾驭澎湃，稳健前行</h3>
            <p className={styles.content}>全新一代智能驱动系统，澎湃动力、平顺输出，配合后五连杆独立悬挂，进一步提高驾驶的驱动性能。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[4].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 4
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
