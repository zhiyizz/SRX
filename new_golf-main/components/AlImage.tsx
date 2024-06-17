import Image, { ImageProps } from 'next/image'
import { calculateHeight } from '@/utils/helper'

export default function AliImage({ alt,  src, height, loader, ...rest }: ImageProps) {
  if (typeof rest.width === 'number' && !height) {
    height = calculateHeight(rest.width)
  }
  let aliLoader = loader
  if (!aliLoader && typeof src === 'string') {
    if (/^http/.test(src)) {
      aliLoader = ({ src, width, quality }) => {
        return `${src}?image_process=resize,w_${width}/quality,Q_95`
      }
    }
  }

  return <Image src={`/golf/2023${src}`} alt={alt} width={rest.width} height={height} loader={aliLoader} {...rest} />
}
