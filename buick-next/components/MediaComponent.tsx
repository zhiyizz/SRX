'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { combineUrl } from '@utils/helper'
import { trackEvent } from '@utils/tracking'
import { useSelector } from 'lib/redux'

import styles from '@styles/components/media.module.scss'

type MultipleMedia = {
  url: string
  device?: 'pc' | 'mob'
  alt?: string
  align?: 'middle' | 'top' | 'bottom'
  link?: string
  poster?: string
  type?: 'video' | 'image'
}

function process(src?: string) {
  if (src && /^https:\/\/static.buick.com.cn/.test(src)) {
    return `${src}?image_process=quality,Q_85`
  }
  return src
}

const SIZES = [
  {
    s: 1920,
    q: 1200
  }, {
    s: 1200,
    q: 828
  }, {
    s: 828,
    q: 768
  }
]

export default function MediaComponent({ media, normal = false, className, title, prefix, onLoad }: {
  media: MultipleMedia | MultipleMedia[]
  normal?: boolean
  className?: string
  title?: string
  prefix?: string,
  onLoad?: VoidFunction
}) {

  const isMobile = useSelector(state => state.global.isMobile)

  const triggerMzClick = useCallback(() => {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-轮播图-${title}`)
    }
  }, [title])

  const data = useMemo(() => {
    let pcSrc: string | undefined
    let mobSrc: string | undefined
    let pcAlign: string | undefined
    let mobAlign: string | undefined
    let pcLink: string | undefined
    let mobLink: string | undefined
    let pcAlt: string | undefined
    let mobAlt: string | undefined
  
    let blobAssets = false

    let m = media
    if (Array.isArray(m) && m.length === 1) {
      m = m[0]
    }
  
    if (Array.isArray(m)) {
      const pc = m.find(m => m.device === 'pc')
      if (pc) {
        pcSrc = pc.url
        pcAlign = pc.align
        pcLink = pc.link
        pcAlt = pc.alt
      }
      const mob = m.find(m => m.device === 'mob')
      if (mob) {
        mobSrc = mob.url
        mobAlign = mob.align
        mobLink = mob.link
        mobAlt = mob.alt
      }
    } else {
      mobSrc = m.url
      pcAlign = m.align
      pcLink = m.link
      pcAlt = m.alt
    }
    if (prefix) {
      pcSrc = pcSrc && combineUrl(prefix, pcSrc)
      mobSrc = mobSrc && combineUrl(prefix, mobSrc)
      blobAssets = /https:\/\/static\.buick\.com\.cn/.test(prefix)
    } else {
      pcSrc = process(pcSrc)
      mobSrc = process(mobSrc)
    }

    return {
      pc: {
        src: pcSrc,
        align: pcAlign,
        alt: pcAlt,
        link: pcLink,
      },
      mob: {
        src: mobSrc,
        align: mobAlign,
        alt: mobAlt,
        link: mobLink,
      },
      blob: blobAssets,
    }
  }, [media, prefix])

  if (data.mob.src || data.pc.src) {
    const picture = (
      <picture className={classNames({
        [styles['full-page']]: !normal,

        [styles.middle]: (!data.mob.align && data.mob.align === 'middle') || (data.mob.align !== 'top' && data.mob.align !== 'bottom'),
        [styles.top]: data.mob.align === 'top',
        [styles.bottom]: data.mob.align === 'bottom',

        [styles['middle-pc']]: (!data.pc.align && data.pc.align === 'middle') || (data.pc.align !== 'top' && data.pc.align !== 'bottom'),
        [styles['top-pc']]: data.pc.align === 'top',
        [styles['bottom-pc']]: data.pc.align === 'bottom',
      }, className)}>
        {data.pc.src && data.mob.src && (data.blob ? SIZES.map((o, i) => <source key={i} srcSet={`${data.pc.src}?image_process=resize,w_${o.s}/quality,Q_85`} media={`(min-width:${o.q}px)`} />)
          : <source srcSet={data.pc.src} media="(min-width:768px)" />)}
        <img src={`${data.mob.src || data.pc.src}${data.blob ? `?image_process=resize,w_${data.pc.src && data.mob.src ? 768 : 1920}/quality,Q_85` : ''}`} alt={data.mob.alt || data.pc.alt || title} onLoadCapture={onLoad} />
      </picture>
    )

    if (data.pc.link || data.mob.link) {
      let link = data.mob.link
      if (!isMobile || !link) {
        link = data.pc.link
      }
      if (link) {
        const external = /^https?:\/\//.test(link)
        if (external) {
          return <a href={link} target="_blank" rel="noreferrer" onClick={triggerMzClick}>{picture}</a>
        } else {
          return <Link href={link} onClick={triggerMzClick}>{picture}</Link>
        }
      }
    }
    return picture
  }
  return null
}
