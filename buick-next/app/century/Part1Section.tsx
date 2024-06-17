import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '@styles/century.module.scss'
import MediaComponent from '@components/MediaComponent'
import SvgIcon from '@components/icons'
import type { FeatureJson } from '~types/centruy'

export default function Part1Section({
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
        end:`+=${window.innerHeight * 20}`,
        scrub:1.5
      }
    })
    const itemDiv = fbiRef.current.getElementsByClassName(styles.itemmod);
    gsap.set(itemDiv, {zIndex: (i, target, targets) => targets.length - i});

    gsap.set(item3Ref.current,{
      yPercent:99
    })
    gsap.set(item5Ref.current,{
      yPercent:99
    })

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
        y:0,
        opacity:1,
        direction:1,
        ease:"none"
      })
      .to(item2Ref.current.getElementsByClassName(styles.pic),{
        width:'100%',
        ease:"none"
      },'-=0.5')
      .to(item2Ref.current.getElementsByClassName(styles.specs),{
        opacity:1,
        ease:"none"
      })
      .to(item2Ref.current,{
        yPercent:-100,
        ease:"none"
      })
      .to(item3Ref.current,{
        yPercent:0,
        ease:"none"
      },'-=0.5')
      .to(item3Ref.current.getElementsByClassName(styles.info),{
        y:0,
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
      .to(item3Ref.current,{
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item4Ref.current.getElementsByClassName(styles.info),{
        y:0,
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
      .to(item4Ref.current,{
        yPercent:-100,
        ease:"none"
      })
      .to(item5Ref.current,{
        yPercent:0,
        ease:"none"
      },'-=0.5')
      .to(item5Ref.current.getElementsByClassName(styles.info),{
        y:0,
        opacity:1,
        direction:1,
        ease:"none"
      })
      .to(item5Ref.current.getElementsByClassName(styles.info),{
        y:'30%',
        ease:"none"
      }) 
      .to(item5Ref.current.getElementsByClassName(styles.pic),{
        opacity:1,
        ease:"none",
        delay:0.5
      })

    return()=>{
      timeLine.scrollTrigger?.kill()
    }
  },[img])
  return (
    <div className={styles['fbi-container']} ref={fbiRef}>
      <div className={styles.itemmod} ref={item1Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>弘阔气度，诠释豪华</h3>
            <p className={styles.content}>PURE Design纯粹设计理念、智慧幕墙系统、流星雨星空穹顶，无处不精心雕琢细节，造就豪华的私享之旅。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[0].media!} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part1-item-2'])} ref={item2Ref}>
        <div className={styles.container}>
          <div className={styles.background}>
          <MediaComponent className={styles.background} media={data.slides[1].slides![0].media} prefix={prefix} />
            
          </div>
          <div className={styles.info}>
            <h3>豪华大尺寸车身</h3>
            <p className={styles.content}>大尺寸车身，坐享越级豪华。座舱长宽高5230*1980*1867mm，3130mm超长轴距。座舱内部横向空间增加，宽大的车体带来宽裕的内部空间。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[1].slides![1].media} prefix={prefix} />
          </div>
          <div className={styles.specs}>
            <div className={styles.item}>
              <span>车长</span>
              <h4>5230 <sub>mm</sub></h4>
            </div>
            <div className={styles.item}>
              <span>车宽</span>
              <h4>1980 <sub>mm</sub></h4>
            </div>
            <div className={styles.item}>
              <span>车高</span>
              <h4>1867 <sub>mm</sub></h4>
            </div>
            <div className={styles.item}>
              <span>轴距</span>
              <h4>3130 <sub>mm</sub></h4>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part1-item-3'])} ref={item3Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles['theme-dark'])}>
            <h3>PURE设计</h3>
            <p className={styles.content}>别克世纪是别克PURE Design纯粹设计理念的最新呈现和细腻诠释。追求高效智能与真实自然的和谐统一，用更纯粹的方式创造无限意境。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[2].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
            className={classNames(styles.button,{
              [styles.show]:arrowShow === 1
            })}
            onClick={() => onOverlay('exterior')}>
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

      <div className={classNames(styles.itemmod,styles['part1-item-4'])} ref={item4Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>豪华智慧幕墙系统</h3>
            <p className={styles.content}>智慧幕墙系统集32吋可升降智能屏，13L礼宾冰箱、音响、收纳和香氛于一体。其中，智能屏可实现影音、娱乐等功能，支持多模式智能投屏，于一方天地纵览万千变局。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[3].media!} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
              [styles.show]:arrowShow === 2
            })}
            onClick={() => onOverlay('curtainwall')}>
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

      <div className={classNames(styles.itemmod,styles['part1-item-5'])} ref={item5Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.center)}>
            <h3>流星雨星空穹顶</h3>
            <p className={styles.content}>顶衬上点缀528个星点，构成366颗星星，及162个星点组成的2颗流星。银河、繁星等8大星空模式，带你仰观星汉无垠，亦能触手可及。</p>
          </div>
          <div className={styles.background}>
            <MediaComponent className={styles.background} media={data.slides[4].slides![0].media} prefix={prefix} />
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[4].slides![1].media} prefix={prefix} />
          </div>
        </div>
      </div>

    </div>
  )
}
