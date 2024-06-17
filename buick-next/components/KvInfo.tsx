import classNames from 'classnames'
import type { FC } from 'react'

import { combineUrl, divideByElement, formatPrice } from '@utils/helper'
import type { ISeriesPrice } from '@utils/SeriesPrice'
import type { KvInfoType } from '~types/series'
import AliImage from './AlImage'
import { useSelector } from 'lib/redux'

import styles from '@styles/series.module.scss'

type KvInfoProps = {
  name: string
  data: KvInfoType[]
  price?: string | number | ISeriesPrice | ISeriesPrice[]
  prefix?: string
}

const KvInfo: FC<KvInfoProps> = ({ data, name, price, prefix }) => {

  const isMobile = useSelector(state => state.global.isMobile)

  if (!Array.isArray(data)) return null

  const hasPrice = data.some(item => item.price)
  const themeLight = data.some(item => item.theme === 'light')

  return (
    <div className={classNames('kv-info', styles['kv-info'], {
      [styles['has-price']]: hasPrice,
      [styles['theme-light']]: themeLight,
      [styles['align-left']]: data.length === 1,
      [styles['kv-info-col-2']]: data.length === 2,
    })}>
      {divideByElement(data.map((item, index) => {
        if (item.url) {
          return (
            <div key={index} className={styles.item}>
              <figure style={{
                width: isMobile ? `${(item.width || 0) / 750 * 100}vw` : `${(item.width || 0) / 1920 * 100}vw`
              }}>
                <AliImage alt={item.alt || item.title || name} src={combineUrl(prefix, item.url)} width={item.width} height={item.height} />
              </figure>
            </div>
          )
        } else {
          return (
            <div key={index} className={classNames(styles.item, {
              [styles['item-price']]: item.price,
            })}>
              <h4>{item.price && price ? (
                <>
                  {formatPrice(price)}<sub>元{Array.isArray(price) ? (price[0].start && '起') : '起'}</sub>
                </>
              ) : item.title}</h4>
              <p>{item.content || '官方指导价'}</p>
            </div>
          )
        }
      }), <i className={styles.line}></i>)}
    </div>
  )
}

export default KvInfo
