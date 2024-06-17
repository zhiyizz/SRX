import { type Dispatch, type FC, useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'

import styles from '@styles/components/series-overlay.module.scss'
import icon from '../../public/img/common/series/360-alt.png'

import Overlay, { type SeriesOverlayProps } from './Overlay'
import type { VehicleColor } from './Viewer'
import classNames from 'classnames'
import { combineUrl, divideByElement } from '@utils/helper'
import { trackEvent } from '@utils/tracking'
import AliImage from '@components/AlImage'

type PanoMedia = {
  url: string
  width?: number
  height?: number
}

export type PanoDataType = {
  type: 'sphere'
  media: PanoMedia
} | {
  type: 'cube'
  media: PanoMedia[]
}

/**
 * 内饰视角。
 */
type PanoView = {
  type: 'view'
  name?: string
  data: PanoDataType
}

/**
 * 内饰颜色。
 */
type PanoColor = Omit<VehicleColor, 'code'> & {
  type: 'color'
  name?: string
} & ({
  data: PanoDataType
  list?: never
} | {
  data?: never
  list: Required<PanoView>[]
})

/**
 * 内饰切换标签。
 */
type PanoTab = {
  type: 'tab'
  text: string
  sub?: string
} & ({
  bose?: never
  list?: never
  data: PanoDataType
} | {
  bose?: never
  list: Required<PanoColor>[] | Required<PanoView>[]
  data?: never
} | {
  /**
   * BOSE外挂包URL。
   */
  bose: string
  list?: never
  data?: never
})

/**
 * 内饰选择框。
 */
type PanoSelector = {
  type: 'selector'
  name?: string
  selected?: boolean
} & ({
  data: PanoDataType
  list: never
} | {
  data?: never
  list: Required<PanoTab>[] | Required<PanoColor>[] | Required<PanoView>[]
})

type PanoRoot = {
  type: 'root'
  list: PanoSelector[]
}

export type PanoStruct = (PanoRoot | PanoSelector | PanoTab | PanoColor | PanoView) & {
  tips?: string
}

export function isPanoStructData(val: unknown): val is PanoStruct {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return Array.isArray(val) || 'type' in val
  }
  return false
}

function isPanoView(val: unknown): val is PanoView {
  return isPanoStructData(val) && 'data' in val
}

function extractLabels(arr: PanoMedia[]) {
  if (arr.length === 6) {
    return arr.map(item => item.url.replace(/\.[^\.]+$/, '')).join('|')
  }
  return ''
}

function extractExtension(arr: PanoMedia[]) {
  if (arr.length) {
    let ext: string | undefined = undefined
    let equal = true
    arr.forEach(item => {
      const p = item.url.split('.')
      if (!ext) {
        ext = p[1]
      } else if (ext != p[1]) {
        equal = false
      }
    })
    if (equal) {
      return ext
    }
  }
  return ''
}

const V2_Pano: FC<SeriesOverlayProps & {
  /**
   * 车型名称。
   */
  name:string
  /*内饰底部提示文案*/
  tips?:string,
  data?: PanoStruct
  prefix?: string
}> = ({ name, tips, data, prefix, ...rest }) => {
  const [jsLoaded, setjsLoaded] = useState(false)
  const [pano, setPano] = useState<KrpanoInterface>()
  const [showData, setShowData] = useState<PanoDataType>()

  const [selectorData, setSelectorData] = useState<PanoSelector[]>()
  const [tabData, setTabData] = useState<PanoTab[]>()
  const [colorData, setColorData] = useState<PanoColor[]>()
  const [viewData, setViewData] = useState<PanoView[]>()

  const [selectedSelector, setSelectedSelector] = useState(0)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedView, setSelectedView] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)

  const [bose, setBose] = useState<string>()
  const [showBose, setShowBose] = useState(false)

  const [blobAssets, setBlobAssets] = useState(false)

  const panoEle = useRef<HTMLDivElement>(null)
  const inited = useRef(false)

  useEffect(() => {
    function goData(list?: PanoStruct[]) {
      const first = list?.[0]
      if (first) {
        if (first.type !== 'root' && first.data) {
          setShowData(first.data)
        } else {
          goData(first.list)
        }
      }
    }

    if (data) {
      const ROOT_DATA_FUNC: Record<Exclude<PanoStruct['type'], 'view'>, unknown> = {
        root: setSelectorData,
        selector: setTabData,
        tab: setColorData,
        color: setViewData,
        // 'view': undefined,
      }
      if (isPanoView(data)) {
        setShowData(data.data)
      } else {
        const func = ROOT_DATA_FUNC[data.type] as Dispatch<unknown>
        func(data.list)
        goData(data.list)
      }
      if (data.type === 'root') {
        const selected = data.list.findIndex(item => item.selected)
        if (~selected) {
          setSelectedSelector(selected)
        }
      }
    }
  }, [data])

  const setData = useCallback((obj?: PanoStruct) => {
    if (obj?.type !== 'root' && obj?.data) {
      setShowData(obj.data)
    } else {
      const first = obj?.list?.[0]
      if (first) {
        const action = (prev: number) => obj.list!.length > prev ? prev : 0
        switch (first.type) {
          case 'tab':
            setTabData(obj.list as PanoTab[])
            setSelectedTab(action)
            break
          case 'color':
            setColorData(obj.list as PanoColor[])
            setSelectedColor(action)
            break
          case 'view':
            setViewData(obj.list as PanoView[])
            setSelectedView(action)
            break
          default:
            return
        }
      }
    }
  }, [])

  useEffect(() => {
    if (selectorData?.length && typeof selectedSelector !== 'undefined') {
      const obj = selectorData[selectedSelector]
      setData(obj)
    }
  }, [selectedSelector, selectorData, setData])

  useEffect(() => {
    if (tabData?.length) {
      const b = tabData.find(item => item.bose)
      if (b) {
        setBose(b.bose)
        setTabData(tabData.filter(item => !item.bose))
      } else if (typeof selectedTab !== 'undefined') {
        const obj = tabData[selectedTab]
        setData(obj)
      }
    }
  }, [selectedTab, setData, tabData])

  useEffect(() => {
    if (colorData?.length && typeof selectedColor !== 'undefined') {
      const obj = colorData[selectedColor]
      setData(obj)
    }
  }, [colorData, selectedColor, setData])

  useEffect(() => {
    if (viewData?.length && typeof selectedView !== 'undefined') {
      const obj = viewData[selectedView]
      setData(obj)
    }
  }, [selectedView, setData, viewData])

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
    if (pano && showData) {
      const krpano = pano.get('global') as KrpanoGlobal
      let xml = '/pano/interior_cube.xml'
      console.log('pano code', krpano.actions.loadpanoimage)
      if (inited.current) {
        console.log('pano load image')
        krpano.image.reset()
        if (showData.type === 'sphere') {
          krpano.image.sphere = {
            url: `${combineUrl(prefix, showData.media.url)}${blobAssets ? '?image_process=resize,w_3072/quality,Q_95' : ''}`
          }
        } else if (showData.type === 'cube') {
          const ext = extractExtension(showData.media)
          krpano.image.cubelabels = extractLabels(showData.media)
          krpano.image.cube = {
            url: `${combineUrl(prefix, `%s.${ext}`)}${blobAssets ? '?image_process=resize,w_1024/quality,Q_95' : ''}`
          }
        }
        krpano.actions.loadpanoimage('MERGE')
      } else {
        let v: Record<string, string>
        if (showData.type === 'sphere') {
          v = { imgpath: combineUrl(prefix, showData.media.url) }
          xml = '/pano/interior_sphere.xml'
        } else if (showData.type === 'cube' && showData.media.length === 6) {
          const ext = extractExtension(showData.media)
          v = {
            labels: extractLabels(showData.media),
            imgpath: combineUrl(prefix, `%s.${ext}`),
          }
        } else {
          return
        }
        krpano.actions.loadpano(xml, v, 'PRELOAD')
        // inited.current = true
      }
    }
  }, [blobAssets, pano, prefix, showData])

  return (
    <Overlay {...rest}>
      <>
        <div className={styles.pano}>
          <div className={styles.controls}>
            {selectorData && <div className={styles.selector}>
              <select value={selectedSelector} onChange={(e) => {
                const idx = Number(e.target.value)
                const obj = selectorData[idx]
                setSelectedSelector(idx)
                // if (obj.list) {
                //   setTabData(obj.list)
                // }
                trackEvent(`车型页-${name}-360内饰-${obj.name}`)
              }}>
                {selectorData.map((item, index) => <option key={index} value={index}>{item.name}</option>)}
              </select>
            </div>}
            <div className={styles.right}>
              {bose ? (
                <div className={styles.bose}>
                  {showBose ? <button onClick={() => {
                    setShowBose(false)
                    trackEvent(`车型页-${name}-360内饰-返回`)
                  }}>返回</button> : <button onClick={() => {
                    setShowBose(true)
                    trackEvent(`车型页-${name}-360内饰-体验Bose尊悦音响系统`)
                  }}>体验Bose悦尊音响系统</button>}
                </div>
              ) :
              tabData && <div className={styles.seats}>
                {tabData.map((item, index) => <div key={index} className={classNames(styles.tab, {
                  [styles.active]: index === selectedTab,
                })} onClick={() => {
                  setSelectedTab(index)
                  // const obj = tabData[index]
                  // if (obj.list) {
                  //   setColorData(obj.list)
                  // } else if (obj.data) {
                  //   setShowData(obj.data)
                  // }
                  trackEvent(`车型页-${name}-360内饰-${item.text}${item.sub ?? ''}`)
                }}>{item.text}{item.sub && <sub>{item.sub}</sub>}</div>)}
              </div>}
            </div>
          </div>
          {showBose && <iframe className={styles.iframe} src={bose}></iframe>}
          <div className={classNames(styles.target, {
            [styles['target-hide']]: showBose,
          })}>
            <div className={styles.stage} ref={panoEle}></div>
            {viewData && <div className={styles.view}>
              {viewData.map((item, index) => <div key={index} className={classNames({
                [styles.active]: index === selectedView,
              })} onClick={() => {
                setSelectedView(index)
                // const obj = viewData[index]
                // if (obj.data) {
                //   setShowData(obj.data)
                // }
                trackEvent(`车型页-${name}-360内饰-${item.name}`)
              }}>{item.name}</div>)}
            </div>}
            {colorData && <div className={styles.colors}>
              {colorData.map((item, index) => (
                <div key={index} className={classNames(styles.item, {
                  [styles.active]: selectedColor === index,
                })} onClick={() => {
                  setSelectedColor(index)
                  // const obj = colorData[index]
                  // if (obj.list) {
                  //   setViewData(obj.list)
                  // } else if (obj.data) {
                  //   setShowData(obj.data)
                  // }
                  trackEvent(`车型页-${name}-360内饰-${item.name}`)
                }}>
                  {item.hex ? <i style={{
                    background: `#${item.hex.replace(/^#/, '')}`
                  }}></i> : item.url && <figure><AliImage src={combineUrl(prefix, item.url)} alt={item.name} layout="responsive" width={item.width || 60} height={item.height || 43} /></figure>}
                  <span className={styles.label}>{item.name && divideByElement(item.name)}</span>
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

export default V2_Pano
