'use client'

import Image, { type ImageProps } from 'next/image'
import { calculateHeight, combineUrl } from '@utils/helper'

export default function AliImage({ alt, src, height, width, loader, prefix, thumbnail, ...rest }: Omit<ImageProps, 'alt'> & {
  alt?: string
  thumbnail?: boolean | number | `${number}`
}) {
  if (typeof width === 'number' && !height) {
    height = calculateHeight(width)
  }
  let aliLoader = loader
  if (!aliLoader && typeof src === 'string') {
    if (/^http/.test(prefix || src)) {
      aliLoader = ({ src, width }) => {
        const w = thumbnail ? (thumbnail === true ? width * 0.5 : thumbnail) : width
        return `${src}?image_process=resize,w_${w}/quality,Q_95`
      }
    }
  }
  if (thumbnail && width && height) {
    if (thumbnail === true) {
      width = Math.ceil(Number(width) * 0.5)
      height = Math.ceil(Number(height) * 0.5)
    } else {
      height = Math.ceil(Number(height) * (Number(thumbnail) / Number(width)))
      width = thumbnail
    }
  }
  return <Image src={typeof src === 'string' && prefix ? combineUrl(prefix, src) : src} alt={alt ?? 'img'} height={height} width={width} loader={aliLoader} {...rest} />
}
