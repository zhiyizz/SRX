import type { FeatureCaptionType } from '~types/feature'

import styles from '../../styles/components/fbi-common.module.scss'
import { divideByElement } from '@utils/helper'

export default function FeatureCaption({ caption }: FeatureCaptionType) {
  if (caption) {
    return (
      <div className={styles['title-light']}>
        <h3>{caption.title}</h3>
        {caption.content && <p>{divideByElement(caption.content)}</p>}
      </div>
    )
  }
  return null
}
