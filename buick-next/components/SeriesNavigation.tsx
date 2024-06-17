'use client'

import classNames from 'classnames'
import { Suspense, useEffect, useState } from 'react'

import styles from '../styles/components/series-nav.module.scss'

import { type GalleryList, type SeriesFlags, type SeriesJson, isSeriesExteriorProperties } from '../types/series'
import SvgIcon from './icons'
import LoanOverlay from './series/Loan'
import { trackEvent, trackPv } from '@utils/tracking'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import V2_Pano, { isPanoStructData } from './series/V2_Pano'
import ConfiguratorButton from './configurator/NavButton'

const Specs = dynamic(() => import('./series/Specs'))

const Viewer = dynamic(() => import('./series/Viewer'))

const Pano = dynamic(() => import('./series/Pano'))

const Gallery = dynamic(() => import('./series/Gallery'))

const Custom = dynamic(() => import('./series/Custom'))

type OverlayType = {
  exterior: boolean
  interior: boolean
  specs: boolean
  custom: boolean
  finance: boolean
  gallery: boolean
}

export type OverlayModule = keyof OverlayType

type NavFeature = {
  name: string
  key?: keyof SeriesFlags
  comp?: OverlayModule
}

const listDefault: NavFeature[] = [
  {
    name: '360外观',
    key: 'exterior',
    comp: 'exterior',
  },
  {
    name: '360内饰',
    key: 'interior',
    comp: 'interior',
  },
  {
    name: '专属定制',
    comp: 'custom',
  },
  {
    name: '车型配置',
    key: 'spec',
    comp: 'specs',
  },
  {
    name: '金融购车',
    key: 'gmac',
    comp: 'finance',
  },
  {
    name: '精彩赏析',
    comp: 'gallery',
  }
]

export default function SeriesNavigation({ code, name, displayName, vehiclePic, className, flags, show = false, pinned = false, instant = false, currentOverlay, viewer, specs, hasGallery, gallery, mirror = false, prefix, tutorial, draftMode, lockPageFn, onOverlayChange, onTop, onGalleryShow, onMenuClick }: {
  code: string
  name: string
  displayName?: string
  vehiclePic?: string
  className?: string
  flags?: SeriesFlags
  /**
   * 显示导航条（仅当 `pinned` 属性为 `true` 时有效）。
   */
  show?: boolean
  /**
   * 固定在顶部。
   */
  pinned?: boolean
  /**
   * 指定显示动画是否立即开始。
   */
  instant?: boolean
  /**
   * 指定当前显示的弹层。
   */
  currentOverlay?: OverlayModule
  /**
   * 表示是否存在精彩赏析板块。
   */
  hasGallery?: boolean
  /**
   * 360外观配置。
   */
  viewer?: SeriesJson['show']
  specs?: SeriesJson['specs']
  gallery?: SeriesJson['gallery']
  mirror?: boolean
  prefix?: string
  tutorial?: string
  draftMode?: boolean
  lockPageFn?: (val: boolean) => void
  onOverlayChange?: (overlay?: OverlayModule) => void
  onTop?: VoidFunction
  onGalleryShow?: (list?: GalleryList) => void
  onMenuClick?: (overlay?: OverlayModule) => void
}) {
  const [overlay, setOverlay] = useState<OverlayModule | undefined>(currentOverlay)
  const [closing, setClosing] = useState(false)
  const [loanPics, setLoanPics] = useState<string[]>()

  useEffect(() => {
    setOverlay(currentOverlay)
  }, [currentOverlay])

  function close() {
    setClosing(true)
    if (lockPageFn) {
      lockPageFn(false)
    }
  }

  function closed() {
    if (closing) {
      setOverlay(undefined)
      setClosing(false)
      onOverlayChange?.()
    }
  }

  useEffect(() => {
    setLoanPics(window.loanPicList)
  }, [overlay])

  return (
    <div className={classNames(styles.nav, {
      [styles.pinned]: pinned,
      [styles.show]: show,
      [styles.instant]: instant,
    }, className)}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2 className={styles.name} onClick={overlay ? () => {
            close()
            onTop?.()
          } : onTop}>{displayName || name}</h2>
          <ul className={styles.navlist}>
            {listDefault.map((item, index) => {
              if (flags && item.key && flags[item.key] === false) {
                return null
              } else if (item.comp === 'gallery' && !gallery && !hasGallery) {
                return null
              } else if (item.comp === 'custom' && !/^envisions(gs)?$/.test(code)) {
                return null
              }
              return <li key={index} className={classNames({
                [styles.active]: overlay === item.comp
              })} onClickCapture={() => {
                if (item.comp) {
                  if (overlay !== item.comp) {
                    onOverlayChange?.(item.comp)
                  }
                  setOverlay(item.comp)
                  lockPageFn?.(true)
                  onMenuClick?.(item.comp)

                  trackPv(`车型页-${name}-${item.name}`)
                  trackEvent(`车型页-${name}-${item.name}`)
                }
              }}><a>{item.name}</a></li>
            })}
            {tutorial && <li><Link href={tutorial}>用车指南</Link></li>}
          </ul>
          <div className={styles.tools}>
            <Suspense>
              <ConfiguratorButton className={classNames(styles.btn, styles['xny-btn'])} code={code} hidden={!flags?.configurator} onClick={() => {
                trackEvent(`车型页-${name}-立即定购`)
              }} />
            </Suspense>
            {onTop && <div className={classNames(styles.btn,styles['scroll-top'])} onClick={overlay ? () => {
              close()
              onTop()
              trackEvent(`车型页-${name}-回到首屏`)
            } : onTop}>
              <div className={styles.icon}><SvgIcon icon="arrow-up" /></div>
              <span>回到首屏</span>
            </div>}
          </div>
        </div>
      </div>
      {mirror ? null : (
        <>
          {flags?.exterior !== false && ((isSeriesExteriorProperties(viewer) ? (viewer.colors && <Viewer show={overlay === 'exterior'} closing={closing} name={name}
            colors={viewer.colors} tips={viewer.tips} startFrame={viewer.start} initialFrame={viewer.initial} frameCount={viewer.count}
            frameHeight={viewer.height} frameWidth={viewer.width} matchColor={viewer.matchColor} prefix={prefix}
            onClose={close} onClosed={closed} />) : (viewer && <Viewer show={overlay === 'exterior'} closing={closing} name={name}
            tips={viewer.tips} iframeUrl={viewer.url} prefix={prefix} onClose={close} onClosed={closed} />)))}
          {flags?.interior !== false && (isPanoStructData(viewer?.pano) ?
            <V2_Pano name={name} show={overlay === 'interior'} closing={closing}
              data={viewer?.pano} prefix={prefix} tips={viewer?.pano?.tips} onClose={close} onClosed={closed} /> :
            <Pano name={name} show={overlay === 'interior'} closing={closing}
              selector={viewer?.pano?.selector} tabs={viewer?.pano?.tabs} colors={viewer?.pano?.colors} tips={viewer?.pano?.tips} view={viewer?.pano?.view}
              bose={viewer?.pano?.bose} prefix={prefix}
              onClose={close} onClosed={closed} />)}
          {/^envisions(gs)?$/.test(code) && <Custom show={overlay === 'custom'} closing={closing} onClose={close} onClosed={closed} />}
          {flags?.spec !== false && <Specs show={overlay === 'specs'} closing={closing} code={specs?.tabs || code} series={code} shared={specs?.shared} remark={specs?.remark} declaration={specs?.declaration} draftMode={draftMode} onClose={close} onClosed={closed} />}
          {flags?.gmac !== false && <LoanOverlay show={overlay === 'finance'} closing={closing} code={code} name={name} pic={loanPics || vehiclePic} onClose={close} onClosed={closed} reverseModel={code === 'gl8_avenir' || code === 'century'} />}
          {hasGallery !== false && gallery && <Gallery show={overlay === 'gallery'} closing={closing} code={code} data={gallery} prefix={prefix} onClose={close} onClosed={closed} onImageClick={onGalleryShow} />}
        </>
      )}
    </div>
  )
}
