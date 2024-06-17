import classNames from 'classnames'

import type { FeatureListType, FeatureMediaPrefix } from '~types/feature'
import { calculateHeight, combineUrl, divideByElement } from '@utils/helper'

import styles from '../../styles/components/fbi-common.module.scss'
import FeatureCaption from './FeatureCaption'
import YoukuPlayer from '../YoukuPlayer'
import AliImage from '@components/AlImage'

export default function FeatureList({ list, caption, prefix }: FeatureListType & FeatureMediaPrefix) {
  return (
    <div className={classNames(styles.group, styles['group-list'])}>
      <FeatureCaption caption={caption} />
      <div className={styles.wrapper}>
        {list.map((item, index) => <div key={index} className={styles.item}>
          {item.media.type === 'video' ?
            <div className={styles.video}>
              <YoukuPlayer controls id={`ykPlayer_fl_${prefix.replace(/[\/\\]/g, '')}_${index}`} vid={item.media.url} poster={item.media.poster && combineUrl(prefix, item.media.poster)} />
            </div>
            :
            <div className={styles.pic}>
              <AliImage src={combineUrl(prefix, item.media.url)} alt={item.media.alt || item.text.title || '亮点'} height={item.media.height || calculateHeight(item.media.width)} width={item.media.width} />
            </div>
          }
          <div className={styles.feature}>
            <h3 className={styles['feature-title']}>{divideByElement(item.text.title)} </h3>
            <p className={styles['feature-tx']}>{divideByElement(item.text.content)}</p>
          </div>
        </div>)}
      </div>
    </div>
  )
}
