import { type FC, useEffect, useRef, useState } from 'react'
import Script from 'next/script'

import styles from '@styles/components/configurator-common.module.scss'
import icon from '../../public/img/common/series/360-alt.png'
import iconFull from '../../public/img/common/series/360-fullscreen.png'

import classNames from 'classnames'
import { divideByElement, formatPrice } from '@utils/helper'
import { trackEvent } from '@utils/tracking'
import AliImage from '@components/AlImage'
import type { MscAttr } from './configurator'

type viewType = {
  name: string
  img: string
}


const viewData = [
  {
    name: '前排',
    img: ''
  },
  {
    name: '后排',
    img: ''
  }
]

const Pano: FC<{
  show: boolean
  /**
   * 内饰
   */
  datas: MscAttr[]
  /**
   * 选择内饰
   */
  onSelectInner: (data: MscAttr) => void
}> = ({ show, datas, onSelectInner }) => {
  const [jsLoaded, setjsLoaded] = useState(false)
  const [pano, setPano] = useState<KrpanoInterface>()
  const [imagePrefix, setImagePrefix] = useState('')
  const [selectedColor, setSelectedColor] = useState<MscAttr>(datas[0])
  const [view, setView] = useState<viewType[]>()
  const [selectedView, setSelectedView] = useState(0)
  const [isFull, setIsFull] = useState(false)

  const panoEle = useRef<HTMLDivElement>(null)
  const inited = useRef(false)

  const initPano = () => {
    console.log('try initPano')
    if (window.embedpano && panoEle.current && !inited.current) {
      console.log('initing Pano')
      inited.current = false
      window.embedpano({
        xml: null,
        target: panoEle.current,
        id: 'pano_360',
        html5: 'only+webgl',
        consolelog: process.env.NODE_ENV === 'development',
        onready: (krpano) => {
          setPano(krpano)
        },
        onerror: () => { }
      })
    }
    return () => {
      console.log('removepano')
      setPano(undefined)
      window.removepano?.('pano_360')
    }
  }


  useEffect(initPano, [])

  useEffect(initPano, [jsLoaded])


  useEffect(() => {
    if (Array.isArray(datas)) {
      const idx = datas.length > 1 ? datas.findIndex(el => el.valueAddition && parseInt(el.valueAddition) == 0) : 0;
      onSelectInner(datas[idx])
      setSelectedColor(datas[idx])
    }
  }, [datas, onSelectInner])


  useEffect(() => {
    if (selectedColor?.imgUrl) {
      const imgArr = selectedColor?.imgUrl?.split(',');
      let idx = 0;
      imgArr.forEach((item, index) => {
        if (index == 1 || index == imgArr.length - 1) {
          viewData[idx].img = item
          idx++;
        }
      })
      setView(viewData)
    }

  }, [selectedColor?.imgUrl])

  useEffect(() => {
    if (selectedColor?.imgUrl && view) {
      setImagePrefix(view[selectedView].img)
    }
  }, [selectedColor?.imgUrl, selectedView, view])



  useEffect(() => {
    if (pano && imagePrefix) {
      const krpano = pano.get('global') as KrpanoGlobal;
      const xml = '/pano/interior_sphere.xml'
      console.log('pano code', krpano.actions.loadpanoimage)

      krpano.actions.loadpano(xml, `imgpath=${imagePrefix}`, 'PRELOAD')
      inited.current = true
    }
  }, [imagePrefix, pano])

  return (
    <div className={classNames(styles.viewer, {
      [styles.config]: show
    })}>
      <div className={styles.pano}>
        <div className={classNames(styles.target,{
          [styles.full]:isFull
        })}>
          <div className={styles.stage} ref={panoEle}></div>
          {view && <div className={styles.view}>
            {view.map((item, index) => <div key={index} className={classNames({
              [styles.active]: index === selectedView
            })} onClick={() => {
              setSelectedView(index)
              // trackEvent(`车型页-${name}-360内饰-${item.name}`)
            }}>{item.name}</div>)}
          </div>}
          <div className={styles.colors}>
            <div className={styles.content}>
              {selectedColor && datas.map(item => (
                <div key={item.attrValue} className={classNames(styles.item, {
                  [styles.active]: selectedColor.attrValue === item.attrValue
                })} onClick={() => {
                  setSelectedColor(item)
                  onSelectInner(item)
                  trackEvent(`别克官网PC端-选配页-内饰-${item.showName}`)
                }}>
                  {item.imgUrl && <figure><AliImage src={item.imgUrl.split(',')[0]} alt={item.showName} width={60} height={43} /></figure>}
                  {item.showName && <span className={styles.label}>{divideByElement(item.showName)}</span>}
                </div>
              ))}
            </div>
            {selectedColor.valueAddition && selectedColor.valueAddition != '0' ? <div className={styles.price}>+&yen;<span>{formatPrice(selectedColor.valueAddition)}</span></div> : null}
          </div>
          <div className={styles.icon}>
            <AliImage src={icon} alt="360&deg;" />
          </div>
          { isFull ? <div className={styles.close} onClick={() => {setIsFull(false)}}></div> : <div className={styles.fullscreen} onClick={() => {setIsFull(true)}}><AliImage src={iconFull} alt="360&deg;" /></div>}
        </div>
      </div>
      <Script id="krpano" src="/pano/interior.js" onLoad={() => {
        setjsLoaded(true)
      }} />
    </div>
  )
}

export default Pano
