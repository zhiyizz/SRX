'use client'

import { useState, useEffect } from 'react'
import classNames from 'classnames'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '@styles/news.module.scss'

import type { SeriesObject } from '~types/series'
import { combineUrl } from '@utils/helper'
import AliImage from '@components/AlImage'
import KvSlider from '@components/KvSlider'
import NewsPager from '@components/NewsPager'
import BackTop from '@components/BackTop'

export type OtaItem = {
  id: number
  pic: string
  title: string
  subTitle?: string
  category: 'OTA' | '电子系统'
  vehicleModels?: string[]
  vehicleSeries?: string[]
  publicationDate: string
}

const Notice: NextPage<{
  data?: OtaItem[]
  series?: SeriesObject[]
}> = ({ series, data }) => {
  const [otaData, setOtaData] = useState<OtaItem[]>()
  const [sysData, setSysData] = useState<OtaItem[]>()

  useEffect(() => {
    if (data) {
      const ota: OtaItem[] = []
      const sys = data.filter(item => {
        if (item.category === 'OTA') {
          ota.push(item)
          return false
        }
        return true
      })
      setOtaData(ota)
      setSysData(sys)
    }
  }, [data])

  return (
    // <BasePage className={styles.main} title="OTA及电子系统升级公告" seriesData={series} categoryList={category} smoothScroll={backTop}>
    <main className={styles.main}>
      <KvSlider className={styles.kv} slides={[{
        id: 1,
        name: '新闻及公告',
        media: [{ url: '/img/news/kv.jpg', device: 'pc', align: 'middle' },{ url: '/img/news/mobile/kv.jpg', device: 'mob', align: 'middle' }],
      }]} />

      {/* 子导航 */}
      <div className={styles.subnav}>
        <ul className={styles.navlist}>
          <li><Link href="/news">新闻资讯</Link></li>
          <li className={styles.active}>OTA及电子系统升级公告</li>
        </ul>
      </div>

      <div className={classNames(styles.container,styles['notice-container'])}>

        {/* notice-group */}
        <div className={styles['notice-group']}>
          <div className={styles.pic}>
            <AliImage src={combineUrl('/', "img/news/pic_1.jpg")} width={666} height={352} />
          </div>
          <NewsPager data={otaData} series={series} prefix="/news/update" />
        </div>

        {/* notice-group */}
        <div className={styles['notice-group']}>
          <div className={styles.pic}>
            <AliImage src={combineUrl('/', "img/news/pic_2.jpg")} width={666} height={352} />
          </div>
          <NewsPager data={sysData} series={series} prefix="/news/update" />
        </div>
      </div>

      <BackTop />
    </main>
  )
}

export default Notice
