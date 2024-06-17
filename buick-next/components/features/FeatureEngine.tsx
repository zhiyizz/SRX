import classNames from 'classnames'

import type { FeatureEngineType, FeatureMediaPrefix, GeneralContent } from '~types/feature'

import styles from '../../styles/components/fbi-common.module.scss'
import { combineUrl, divideByElement } from '@utils/helper'
import AliImage from '@components/AlImage'
import FeatureCaption from './FeatureCaption'
import { useEffect, useState } from 'react'

export default function FeatureEngine({ engine, media, align = 'left', text, prefix, extra, caption }: FeatureEngineType & FeatureMediaPrefix) {
  const [main, setMain] = useState<GeneralContent[]>()
  const [secondary, setSecondary] = useState<GeneralContent[]>()

  const { highlight, specs } = engine

  useEffect(() => {
    const other: GeneralContent[] = []
    const main = specs.filter(item => {
      if (item.highlight) {
        return true
      }
      other.push(item)
    })
    setMain(main)
    setSecondary(other)
  }, [specs])

  if (extra) {
    return (
      <div className={classNames(styles.group, styles.power, styles.power2, {
        [styles['power-reverse']]: align === 'right'
      })}>
        {/* <FeatureCaption caption={caption} /> */}
        <div className={styles.wrapper}>
          {extra.text && <div className={styles['power-copy']}>
            <p>{divideByElement(extra.text)}</p>
          </div>}
          <div className={classNames(styles['power-left'])}>
            {main && main.map((sp, index) => (
              <div key={index} className={classNames(styles.item, styles['border-left'], styles['col-2'])}>
                <h4>{sp.title}</h4>
                <span>{divideByElement(sp.content)}</span>
              </div>
            ))}
            <div className={styles['power-left-content']}>
              {secondary && <div className={styles['border-left']}>
                {secondary.map((sp, index) => <div key={index} className={styles.item}>{sp.title}<br/>{sp.content}</div>)}
              </div>}
              <div className={styles.pic}>
                <AliImage src={combineUrl(prefix, media.url)} alt={media.alt || '发动机'} height={media.height} width={media.width} />
              </div>
            </div>
          </div>
          <div className={styles['power-center']}>
            {highlight && (
              <div className={classNames(styles['border-left'],styles['col-2'])}>
                <h4>{highlight.title}</h4>
                <span>{divideByElement(highlight.content)}</span>
              </div>
            )}
            {extra.media && <div className={styles.pic}>
              <AliImage src={combineUrl(prefix, extra.media.url)} alt={extra.media.alt || '发动机'} height={extra.media.height} width={extra.media.width} />
            </div>}
          </div>

          {text && <div className={styles['power-copy']}>
            <FeatureCaption caption={caption} />
            <h3>{divideByElement(text.title)}</h3>
            <p>{divideByElement(text.content)}</p>
          </div>}
        </div>
      </div>
    )
  }
  return (
    <div className={classNames(styles.group, styles.power, {
      [styles['power-reverse']]: align === 'right'
    })}>
      <div className={styles.wrapper}>
        <div className={classNames(styles['power-left'], styles['border-left'])}>
          {specs.map((sp, index) => {
            if (sp.highlight) {
              return (
                <div key={index} className={classNames(styles.item, styles['col-2'])}>
                  <h4>{sp.title}</h4>
                  <span>{divideByElement(sp.content)}</span>
                </div>
              )
            }
            return <div key={index} className={styles.item}>{sp.title}<br/>{sp.content}</div>
          })}
        </div>
        <div className={styles['power-center']}>
          {highlight && (
            <div className={classNames(styles['border-left'],styles['col-2'])}>
              <h4>{highlight.title}</h4>
              <span>{divideByElement(highlight.content)}</span>
            </div>
          )}
          <div className={styles.pic}>
            <AliImage src={combineUrl(prefix, media.url)} alt={media.alt || '发动机'} height={media.height} width={media.width} />
          </div>
        </div>
        {text && <div className={styles['power-right']}>
          <FeatureCaption caption={caption} />
          <h3>{divideByElement(text.title)}</h3>
          <p>{divideByElement(text.content)}</p>
        </div>}
      </div>
    </div>
  )
}
