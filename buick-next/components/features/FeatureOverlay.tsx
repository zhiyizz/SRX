import classNames from 'classnames'
import { type ForwardedRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'
import { divideByElement } from '@utils/helper'
import styles from '../../styles/components/fbi-overlay.module.scss'
import type { Feature, FeatureCategory } from '~types/feature'

// import FeatureEngine from './FeatureEngine'
// import FeatureGeneral from './FeatureGeneral'
// import FeatureList from './FeatureList'
// import FeatureSlider from './FeatureSlider'

const FeatureEngine = dynamic(() => import('./FeatureEngine'), {
  loading: () => <p>正在加载...</p>,
})
const FeatureGeneral = dynamic(() => import('./FeatureGeneral'), {
  loading: () => <p>正在加载...</p>,
})
const FeatureList = dynamic(() => import('./FeatureList'), {
  loading: () => <p>正在加载...</p>,
})
const FeatureSlider = dynamic(() => import('./FeatureSlider'), {
  loading: () => <p>正在加载...</p>,
})
const FeatureCommon = dynamic(() => import('./FeatureCommon'), {
  loading: () => <p>正在加载...</p>,
})
function FeatureOverlay({ code,common, category, data, index, prefix,layout, show = false, onClose }: {
  code: string
  category: FeatureCategory
  common?:boolean
  data: Feature[]
  index: string
  show?: boolean
  prefix?: string
  layout?: string
  onClose?: (index: string) => void
}, ref: ForwardedRef<HTMLDivElement>) {
  if (!category) {
    return null
  }
  return (
    <div className={classNames(styles['fbi-detail'], {
      [styles.common]:common,
      [styles.show]: show,
      [styles.narrow]: layout,
    })}>
      <div className={styles['fbi-detail-wrapper']}>
        <div className={styles.close} onClick={onClose && (() => onClose(index))}><i className="icon-close icon-close-light"></i></div>
        <div className={styles['scroll-container']} ref={ref}>
          <div className={styles.content}>
            <div className={styles.title}>
              <p className={styles.en}>{category.en}</p>
              <p className={styles.cn}>{divideByElement(category.text)}</p>
            </div>
            {Array.isArray(data) && data.map((item, index) => {
              if (item.type === 'engine') {
                return <FeatureEngine key={index} prefix={prefix || `/img/${code}`} {...item} />
              } else if (item.type === 'slider') {
                return <FeatureSlider key={index} prefix={prefix || `/img/${code}`} {...item} />
              } else if (item.type === 'list') {
                  return <FeatureList key={index} prefix={prefix || `/img/${code}`} {...item} />
              } else if (common) {
                return <FeatureCommon key={index}  prefix={prefix || `/img/${code}`} {...item} /> 
              } else {
                return <FeatureGeneral key={index} prefix={prefix || `/img/${code}`} {...item} />
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

FeatureOverlay.displayName = 'FeatureOverlay'

export default forwardRef(FeatureOverlay)
