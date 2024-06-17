import { type CSSProperties, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { ReactImageTurntable } from 'react-image-turntable';

import styles from '@styles/components/series-overlay.module.scss'

import SvgIcon from '@components/icons'
import Overlay, { type SeriesOverlayProps } from './Overlay'
import { combineUrl, divideByElement, increaseBrightness } from '@utils/helper'
import { trackEvent } from '@utils/tracking';
import AliImage from '@components/AlImage';

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
  /**
   * 十六进制色值（未指定则使用 `${code}.png` 作为图片URL）。
   */
  hex?: string
  /**
   * 图片高度（默认：43px）。
   */
  height?: number
  /**
   * 图片宽度（默认：60px）。
   */
  width?: number
  /**
   * 图片URL（通过数据CMS）。
   */
  url?: string
  /**
   * 图片替代文本。
   */
  alt?: string
}

export default function Viewer({ name, frameCount = 36, startFrame = 1, tips, type = 'png', initialFrame = 27, colors, iframeUrl, matchColor = false, prefix, ...rest }: SeriesOverlayProps & {
  /**
   * 车型名称。
   */
  name: string
  /**
   * 总帧数。
   */
  frameCount?: number
  /**
   * 起始帧。
   */
  startFrame?: number
  /**
   * 初始帧。
   */
  initialFrame?: number
  frameHeight?: number
  frameWidth?: number
  /**
   * 车色列表。
   */
  colors?: VehicleColor[]
  /**
   * 背景颜色匹配。
   */
  matchColor?: boolean
  /**
   * 图片类型。
   */
  type?: string
  /**
   * iframe嵌套页面URL。
   */
  iframeUrl?: string
  /**
   * 素材路径。
   */
  prefix?: string
  /**
   * 外观底部提示内容。
   */
  tips?: string
}) {
  const [frameSources, setFrameSources] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<VehicleColor | undefined>(colors?.[0])
  const [loaded, setLoaded] = useState(0)

  const loadedColor = useRef<Record<string, boolean>>({})

  // useEffect(() => {
  //   const onResize = () => {
  //     setIsMobile(window.innerWidth < 768)
  //   }
  //   window.addEventListener('resize', onResize)
  //   onResize()
  //   return () => {
  //     window.removeEventListener('resize', onResize)
  //   }
  // }, [])

  useEffect(() => {
    if (selectedColor?.code) {
      const frames = []
      let frame = startFrame
      while (frame < startFrame + frameCount) {
        const num = frame++
        frames.push(combineUrl(prefix, '360', selectedColor.code, `${String(num).padStart(2,'0')}.${type}`))
      }
      setFrameSources(frames)
    }
  }, [frameCount, prefix, selectedColor?.code, startFrame, type])

  useEffect(() => {
    let loaded = startFrame
    const loadColor = (color: string, index: number) => {
      const img = new Image()
      img.onload = () => {
        loaded++
        setLoaded(loaded - startFrame)
        if (loaded - startFrame === frameCount) {
          loadedColor.current[color] = true
        }
      }

      const url = combineUrl(prefix, '360', color, `${String(index).padStart(2, '0')}.${type}`)
     // let url = `/_next/image?url=${encodeURIComponent(`/img/${code}/360/${color}/${String(index).padStart(2, '0')}.png`)}&w=1920&q=75`
      img.src = url
    }
    if (rest.show && selectedColor?.code && !loadedColor.current[selectedColor.code]) {
      setLoaded(0)
      for (let i = 0; i < frameCount; i++) {
        const idx = i + startFrame
        loadColor(selectedColor.code, idx)
      }
      // setTimeout(loadColor, 200, selectedColor.code);
    }
  }, [rest.show, selectedColor?.code, frameCount, startFrame, type, prefix])

  const bgColor = matchColor && selectedColor?.hex ? {
    '--bg-gradient-color': increaseBrightness(selectedColor.hex, 50),
  } as CSSProperties : undefined

  return (
    <Overlay {...rest}>
      {iframeUrl && rest.show ? <iframe className={styles.show} src={iframeUrl} allowFullScreen></iframe> : (
        <div className={styles.show} style={bgColor}>
          <span className={styles.name}>{name}</span>
          <div className={styles.container}>
            <div className={styles.content}>
              {loaded < frameCount ? <div className={styles.loading}><SvgIcon icon="spin" /></div> : <div className={classNames(styles.stage)} >
                <div className={classNames({[styles.visible]: initialFrame})}>
                  <ReactImageTurntable initialImageIndex={initialFrame} images={frameSources} />
                </div>
              </div>}
              <div className={styles.colors}>
                {colors?.map(item => (
                  <div key={item.code} className={classNames(styles.item, {
                    [styles.active]: selectedColor?.code === item.code,
                  })} onClick={() => {
                    setSelectedColor(item)
                    trackEvent(`车型页-${name}-360外观-${item.name}`)
                  }}>
                    {item.hex ? <i style={{
                      background: `#${item.hex.replace(/^#/, '')}`
                    }}></i> : <figure><AliImage src={item.url ? combineUrl(prefix, item.url) : combineUrl(prefix, '360', `${item.code}.png`)} alt={item.alt || item.name} width={item.width || 60} height={item.height || 43} /></figure>}
                    <span className={styles.label}>{divideByElement(item.name)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.tips}>{divideByElement(tips!)}</div>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  )
}
