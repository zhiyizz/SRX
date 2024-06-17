import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import styles from '@styles/century6.module.scss'
import MediaComponent from '@components/MediaComponent'
import SvgIcon from '@components/icons'
import AliImage from '@components/AlImage'

import type { FeatureJson } from '~types/centruy'
import { combineUrl } from '@utils/helper'

export default function Part3Section({
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
  const item6Ref = useRef<HTMLDivElement>(null!)
  const [arrowShow, setArrowShow] = useState<number>(0)
  const [detailsShow,setDetailsShow] = useState<boolean>(false)
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
        end:`+=${window.innerHeight * 17}`,
        scrub:1.5
      }
    })
    const itemDiv = fbiRef.current.getElementsByClassName(styles.itemmod);
    gsap.set(itemDiv, {zIndex: (i, target, targets) => targets.length - i});
    gsap.set(item1Ref.current.getElementsByClassName(styles.color), {background: '#000000'});
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
        y:0,
        opacity:1,
        direction:1,
        ease:"none",
        onStart:()=>{
          setDetailsShow(true)
        },
        onReverseComplete:()=>{
          setDetailsShow(false)
        }
      }) 
      .to(item2Ref.current,{
        height:0,
        delay:0.5
      })
      .to(item3Ref.current.getElementsByClassName(styles.info),{
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
        height:0,
        delay:0.5,
        ease:"none"
      })
      .to(item5Ref.current.getElementsByClassName(styles.info),{
        y:0,
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
        y:0,
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
      <div className={classNames(styles.itemmod,styles['part3-item-1'])} ref={item1Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.white)}>
            <h3>科技赋能，守护安全</h3>
            <p className={styles.content}>世纪兼顾被动安全、主动安全与健康安全，高强度车身与智能科技珠联璧合，更全面地守护驾乘者的安心之旅。可达到L2+级别的eCruise Pro智能辅助驾驶系统守护驾乘者的安心之旅。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[0].media} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part3-item-2'])} ref={item2Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>被动安全</h3>
            <p className={styles.content}>安全的每一分，都值得全力以赴拿高分。别克世纪获得2023中保研C-IASI乘员安全指数四项核心安全项目测试科目全G殊荣。</p>
          </div>
          <div className={classNames(styles.pic,{
            [styles.show]:detailsShow
          })}>
            <AliImage src={combineUrl(prefix, data.slides[1].slides![0].media.url)} alt={data.slides[1].slides![0].media.alt || '被动安全'} width={data.slides[1].slides![0].media.width} height={data.slides[1].slides![0].media.height} />
            <div className={styles.line}></div>
            <div className={styles.details}><AliImage src={combineUrl(prefix, data.slides[1].slides![1].media.url)} alt={data.slides[1].slides![1].media.alt || '被动安全'} width={data.slides[1].slides![1].media.width} height={data.slides[1].slides![1].media.width} /></div>
            <div className={styles.copy}>
              <h4>马牌ContiSeal自修补轮胎</h4>
              <p>马牌公司潜心研发，当胎面被直径不超过5毫米的异物刺穿时，胎内涂层覆膜会立刻将刺孔密封，防止漏气瘪胎，确保安全无忧前行，一路轻松从容。</p>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.itemmod,styles['part3-item-3'])} ref={item3Ref}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>主动安全</h3>
            <p className={styles.content}>别克世纪配备eCruise Pro高级智能辅助驾驶系统，以尖端科技引领豪华MPV智慧安全出行。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[2].media} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 1
              })} 
              onClick={() => onOverlay('safety')}>
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
            <h3>健康安全-BioCare智能生物净舱系统</h3>
            <p className={styles.content}>用智能读懂空气，让健康唾手可得。应对日益加剧的空气污染，世纪CENTURY以BioCare智能生物净舱系统为用户架起一道智能健康屏障。搭载多项智能空气质量管理系统，从防护、监测、过滤、到净化四个步骤，有效提升车内空气质量。确保给予用户更清新、更健康的车内环境。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[3].media} prefix={prefix} />
          </div>
          <div className={styles['button-container']}>
            <button  
              className={classNames(styles.button,styles.white,{
                [styles.show]:arrowShow === 2
              })} 
              onClick={() => onOverlay('health')}>
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
          <div className={classNames(styles.info,styles.bottom)}>
            <h3>OnStar安吉星系统</h3>
            <p className={styles.content}>世纪车型搭载OnStar安吉星全时在线助理，为车主提供涵盖智能安全、远程控制、车况养护、出行向导、车主助手、娱乐互联及车友社交等多项服务，安心随行，安全每刻。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[4].media} prefix={prefix} />
          </div>
        </div>
      </div>

      <div className={styles.itemmod} ref={item6Ref}>
        <div className={styles.container}>
          <div className={classNames(styles.info,styles.bottom)}>
            <h3>Babyfirst儿童安全座椅安全警示功能</h3>
            <p className={styles.content}>独创智能互联技术HUGGINGO安极芯，全程智能安全看护系统，智能硬件+APP，通过智能科技实现三大座椅主动安全预警功能：座椅误安装预警，入离座预警和遗忘预警，“保姆级”行车看护，安全省心。</p>
          </div>
          <div className={styles.pic}>
            <MediaComponent className={styles.media} media={data.slides[5].media} prefix={prefix} />
          </div>
        </div>
      </div>

    </div>
  )
}
