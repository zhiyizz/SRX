import classNames from 'classnames'

import type { FeatureGeneralType, FeatureMedia, FeatureMediaPrefix, GeneralContent } from '~types/feature'
import { calculateHeight, combineUrl, divideByElement } from '@utils/helper'

import styles from '../../styles/components/fbi-common.module.scss'
import FeatureCaption from './FeatureCaption'
import YoukuPlayer from '@components/YoukuPlayer'
import AliImage from '@components/AlImage'

function FeatureBase({ media, text, prefix, index }: {
  prefix: string
  media: FeatureMedia
  text?: GeneralContent
  index?: number
}) {
  return <>
    {media.type === 'video' ? (
      <div className={styles.video}>
        <YoukuPlayer controls id={`ykPlayer_fg_${prefix.replace(/[\/\\]/g, '')}_${index || 0}`} vid={media.url} poster={media.poster && combineUrl(prefix, media.poster)} />
      </div>
    ) : (
      <div className={styles.pic}>
        <AliImage src={combineUrl(prefix, media.url)} alt={media.alt || text && text.title || '亮点'} height={media.height || calculateHeight(media.width)} width={media.width} />
      </div>
    )} 
    {text && (
      <div className={styles.feature}>
        <h3 className={styles['feature-title']}>{divideByElement(text.title)}</h3>
        <p className={styles['feature-tx']}>{divideByElement(text.content)}</p>
      </div>
    )}
  </>
}

export default function FeatureGeneral({ type = 'simple', media, text, size = 'small', align = 'left', extra, caption, prefix }: FeatureGeneralType & FeatureMediaPrefix) {
  return (
    <div className={classNames(styles.group, {
      [styles.medium]: size === 'large',
      [styles.large]: size === 'full',
      // [styles.left]: align === 'left',
      [styles.right]: align === 'right',
      [styles['group-col-2']]: type === 'dual',
      [styles['group-col-3']]: type === 'triple',
    })}>
      <FeatureCaption caption={caption} />
      <div className={styles.wrapper}>
        {type !== 'simple' ? <>
          <div className={styles[`group-col-${type === 'dual' ? 2 : 3}-left`]}>
            <FeatureBase media={media} text={text} prefix={prefix} />
          </div>
          <div className={styles[`group-col-${type === 'dual' ? 2 : 3}-right`]}>
            {type === 'dual' && extra && !Array.isArray(extra) && <FeatureBase media={extra.media} text={extra.text} prefix={prefix} />}
            {type === 'triple' && Array.isArray(extra) && extra.map((item, index) => <FeatureBase key={index} media={item} prefix={prefix} index={index} />)}
          </div>
        </> : <FeatureBase media={media} text={text} prefix={prefix} />}
      </div>
    </div>
  )
}
