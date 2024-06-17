import Image, { ImageProps } from 'next/image'
import { calculateHeight } from '../utils/helper'

export default function AliImage({ alt, src, height, loader,className, ...rest }: ImageProps) {
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
  let https  = src.toString().slice(0,5);
  return https==='https'? <Image src={src} alt={alt} className={className}  height={height} loader={aliLoader} {...rest} />:<Image src={'/usedcar'+src} alt={alt} className={className}  height={height} loader={aliLoader} {...rest} />
}
