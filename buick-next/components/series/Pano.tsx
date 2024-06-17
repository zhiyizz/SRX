import { type FC, useEffect, useRef, useState } from 'react'
import Script from 'next/script'

import styles from '@styles/components/series-overlay.module.scss'
import icon from '../../public/img/common/series/360-alt.png'

import Overlay, { type SeriesOverlayProps } from './Overlay'
import type { VehicleColor } from './Viewer'
import classNames from 'classnames'
import { combineUrl, divideByElement } from '@utils/helper'
import { trackEvent } from '@utils/tracking'
import AliImage from '@components/AlImage'

const Pano: FC<SeriesOverlayProps & {
  /**
   * 车型名称。
   */
  name:string
  selector?: {
    name: string
    value: string
    selected?: boolean
  }[]
  tabs?: {
    code: string
    text: string
    /**
     * 右侧小字。
     */
    sub?: string
  }[]
  /**
   * 内饰视角。
   */
  view?: {
    code: string
    name: string
  }[]
  colors?: VehicleColor[]
  /*内饰底部提示文案*/
  tips?: string
  /**
   * BOSE外挂包URL（将覆盖 `tabs` 配置）。
   */
  bose?: string
  prefix?: string
}> = ({ name, selector, tabs, view, colors,tips, bose, prefix, ...rest }) => {
  const [jsLoaded, setjsLoaded] = useState(false)
  const [pano, setPano] = useState<KrpanoInterface>()
  const [imagePrefix, setImagePrefix] = useState('')

  const [selectedSelector, setSelectedSelector] = useState(selector?.[0])
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedView, setSelectedView] = useState(0)
  const [selectedColor, setSelectedColor] = useState(colors?.[0])

  const [showBose, setShowBose] = useState(false)

  const [blobAssets, setBlobAssets] = useState(false)

  const panoEle = useRef<HTMLDivElement>(null)
  const inited = useRef(false)

  const initPano = () => {
    console.log('try initPano')
    let pano: KrpanoInterface
    if (window.embedpano && panoEle.current && !inited.current) {
      console.log('initing Pano:')
      window.embedpano({
        xml: null,
        target: panoEle.current,
        id: 'pano_360',
        html5: 'only+webgl',
        consolelog: process.env.NODE_ENV === 'development',
        // initvars: {
        //   imgpath: `/img/${code}/360/pano/`
        // },
        vars: {
          'view.vlookat': 5,
          'view.fov': 90,
          'view.fovmax': 120,
          'view.fovtype': 'MFOV',
          'view.mfovratio': 1.66667,
          'view.maxpixelzoom': 1.5,
          'view.limitview': 'auto',
        },
        onready: (krpano) => {
          pano = krpano
          const p = pano.get('global') as KrpanoGlobal
          // p.customParsePath = (url: string) => {
          //   console.log('pano url:', url)
          //   return url
          // }
          p.actions.includexml('/pano/skin/defaultskin.xml')
          console.log('pano global', p)
          setPano(krpano)
          inited.current = true
        },
        onerror: (err) => {
          console.error(err)
        }
      })
    // } else {
    //   clearTimeout(timer)
    //   timer = setTimeout(func, 1000)
    }
    return () => {
      console.log('removepano')
      inited.current = false
      setPano(undefined)
      if (pano) {
        pano.unload()
      } else {
        window.removepano?.('pano_360')
      }
    }
  }

  // useEffect(initPano, [id])

  useEffect(initPano, [jsLoaded])

  useEffect(() => {
    if (prefix) {
      setBlobAssets(/https:\/\/static\.buick\.com\.cn/.test(prefix))
    }
    if (pano) {
      const krpano = pano.get('global') as KrpanoGlobal
      krpano.actions.lookat(0, 5, 90)
    }
  }, [pano, prefix])

  useEffect(() => {
    if (selector && selector.length) {
      setSelectedSelector(prev => prev || selector[0])
    } else {
      setSelectedSelector(undefined)
    }
  }, [selector])

  useEffect(() => {
    if (colors && colors.length) {
      setSelectedColor(prev => prev || colors[0])
    } else {
      setSelectedColor(undefined)
    }
  }, [colors])

  useEffect(() => {
    const url = combineUrl(prefix, '/360/pano')
    const arr = [url]
    if (selectedSelector?.value) {
      arr.push(selectedSelector.value)
    }
    if (tabs && tabs[selectedTab].code) {
      arr.push(tabs[selectedTab].code)
    }
    if (view && view[selectedView].code) {
      arr.push(view[selectedView].code)
    }
    if (selectedColor?.code) {
      arr.push(selectedColor.code)
    }
    console.log('prefix', arr)
    setImagePrefix(arr.join('/') + '/')
  }, [tabs, view, selectedSelector?.value, selectedTab, selectedView, selectedColor?.code, prefix])

  useEffect(() => {
    if (pano && imagePrefix) {
      const krpano = pano.get('global') as KrpanoGlobal
      const xml = '/pano/interior.xml'
      console.log('pano code', krpano.actions.loadpanoimage)
      if (inited.current) {
        console.log('pano load image')
        krpano.image.reset()
        krpano.image.cube = {
          url: `${imagePrefix}mobile_%s.jpg${blobAssets ? '?image_process=resize,w_1024/quality,Q_95' : ''}`
        }
        krpano.actions.loadpanoimage('MERGE')
      } else {
        krpano.actions.loadpano(xml, { imgpath: imagePrefix}, 'PRELOAD')
        // inited.current = true
      }
    }
  }, [blobAssets, imagePrefix, pano])

  return (
    <Overlay {...rest}>
      <>
        <div className={styles.pano}>
          <div className={styles.controls}>
            {selector && <div className={styles.selector}>
              <select defaultValue={selector.find(item => item.selected)?.value} value={selectedSelector?.value} onChange={(e) => {
                const selected = selector.find(item => item.value === e.target.value)
                setSelectedSelector(selected)
              }}>
                {selector.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)}
              </select>
            </div>}
            <div className={styles.right}>
              {bose && (
                <div className={styles.bose}>
                  {showBose ? <button onClick={() => {
                    setShowBose(false)
                    trackEvent(`车型页-${name}-360内饰-返回`)
                  }}>返回</button> : <button onClick={() => {
                    setShowBose(true)
                    trackEvent(`车型页-${name}-360内饰-体验Bose尊悦音响系统`)
                  }}>体验Bose悦尊音响系统</button>}
                </div>
              )}
              {tabs && <div className={styles.seats}>
                {tabs.map((item, index) => <div key={index} className={classNames(styles.tab, {
                  [styles.active]: index === selectedTab,
                })} onClick={() => {
                  setSelectedTab(index)
                  trackEvent(`车型页-${name}-360内饰-${item.text}${item.sub && item.sub}`)
                }}>{item.text}{item.sub && <sub>{item.sub}</sub>}</div>)}
              </div>}
            </div>
          </div>
          {showBose && <iframe className={styles.iframe} src={bose}></iframe>}
          <div className={classNames(styles.target, {
            [styles['target-hide']]: showBose,
          })}>
            <div className={styles.stage} ref={panoEle}></div>
            {view && <div className={styles.view}>
              {view.map((item, index) => <div key={index} className={classNames({
                [styles.active]: index === selectedView
              })} onClick={() => {
                setSelectedView(index)
                trackEvent(`车型页-${name}-360内饰-${item.name}`)
              }}>{item.name}</div>)}
            </div>}
            {colors && <div className={styles.colors}>
              {colors.map(item => (
                <div key={item.code} className={classNames(styles.item, {
                  [styles.active]: selectedColor?.code === item.code
                })} onClick={() => {
                  setSelectedColor(item)
                  trackEvent(`车型页-${name}-360内饰-${item.name}`)
                }}>
                  {item.hex ? <i style={{
                    background: `#${item.hex.replace(/^#/, '')}`
                  }}></i> : <figure><AliImage src={item.url ? combineUrl(prefix, item.url) : combineUrl(prefix, '/360/pano', `${item.code}.png`)} alt={item.name} layout="responsive" width={item.width || 60} height={item.height || 43} /></figure>}
                  <span className={styles.label}>{divideByElement(item.name)}</span>
                </div>
              ))}
            </div>}
            <div className={styles.icon}>
              <AliImage src={icon} alt="360&deg;" />
            </div>
          </div>
          {tips && <p className={styles.tips}>{tips}</p>}
        </div>
        <Script id="krpano" src="/pano/interior.js" onLoad={() => {
          setjsLoaded(true)
        }} />
      </>
    </Overlay>
  )
}

export default Pano
