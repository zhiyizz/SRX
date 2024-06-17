'use client'

import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import classNames from 'classnames'
import styles from '@styles/news.module.scss'

import type { SeriesObject } from '~types/series'
import { divideByElement } from '@utils/helper'
import AliImage from '@components/AlImage'
import KvSlider from '@components/KvSlider'
import BackTop from '@components/BackTop'

export type NewsItem = {
  id: number
  pic: string
  title: string
  subTitle?: string
  vehicleSeries?: string[]
  publicationDate: string
}

export type TagObject = {
  name: string
  code: string
}

const NewsComp: NextPage<{
  series: SeriesObject[]
  news: NewsItem[]
}> = ({ series, news }) => {

  const [year, setYear] = useState<string[]>()
  const [tags, setTags] = useState<TagObject[]>()

  const [selectedYear, setSelectedYear] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const [filtered, setFiltered] = useState<NewsItem[]>()

  useEffect(() => {
    const filtered = news.filter(item => {
      let ok = true
      if (selectedYear) {
        const reg = new RegExp(`^${selectedYear}`)
        ok = ok && reg.test(item.publicationDate)
      }
      if (selectedTag) {
        if (item.vehicleSeries) {
          ok = ok && item.vehicleSeries.includes(selectedTag)
        } else {
          return false
        }
      }
      return ok
    })
    setFiltered(filtered)
  }, [news, selectedYear, selectedTag])

  useEffect(() => {
    const yearList = new Set<string>()
    const codeList: string[][] = []
    news.forEach(item => {
      if (!item.publicationDate) {
        console.log(item)
      }
      const [year] = item.publicationDate.split('/')
      yearList.add(year)
      if (item.vehicleSeries) {
        codeList.push(item.vehicleSeries)
      }
    })

    const year = Array.from(yearList).sort((a, b) => {
      if (a > b) {
        return -1
      } else if (b > a) {
        return 1
      }
      return 0
    })
    setYear(year)

    if (series) {
      const uniqueTags = new Set(codeList.flat())

      const tags = Array.from(uniqueTags).map<TagObject>(code => {
        const obj = series.find(s => s.code === code)
        if (obj) {
          return {
            name: obj.displayName || obj.name,
            code: code,
          }
        }
        return {
          name: '',
          code: '',
        }
      }).filter(item => item.name && item.code)
      setTags(tags)
    }
  }, [series, news])

  return (
    // <BasePage className={styles.main} title="新闻资讯" seriesData={series} categoryList={category} smoothScroll={backTop}>
    <main className={styles.main}>
      <KvSlider className={styles.kv} slides={[{
        id: 1,
        name: '新闻及公告',
        media: [{ url: '/img/news/kv.jpg', device: 'pc', align: 'middle' },{ url: '/img/news/mobile/kv.jpg', device: 'mob', align: 'middle' }],
      }]} />

      {/* 子导航 */}
      <div className={styles.subnav}>
        <ul className={styles.navlist}>
          <li className={styles.active}>新闻资讯</li>
          <li><Link href="/news/update">OTA及电子系统升级公告</Link></li>
        </ul>
      </div>


      <div className={styles.container}>

        <div className={styles.topbar}>
          <div className={classNames(styles.title,styles['bm-border'])}><h2>新闻资讯</h2></div>
          <div className={styles.tools}>
            <div className={styles.select}>
              <select value={selectedYear} onChange={(e) => {
                setSelectedYear(e.target.value)
              }}>
                <option value="">时间</option>
                {year && year.map(item => <option key={item} value={item}>{item}年</option>)}
              </select>
            </div>
            <div className={styles.select}>
              <select value={selectedTag} onChange={(e) => {
                setSelectedTag(e.target.value)
              }}>
                <option value="">车型</option>
                {tags && tags.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* 新闻列表 */}
        <div className={styles['news-wrap']}>
          <div className={styles.content}>
            {filtered && filtered.map(item => <div key={item.id} className={styles.item}>
              <div className={styles.pic}>
                <Link href={`/news/${item.id}`}><AliImage src={item.pic} fill /></Link>
              </div>
              <div className={styles.details}>
                <Link href={`/news/${item.id}`} className={styles.info}>
                  <h4 title={item.title}>{divideByElement(item.title)}</h4>
                  {item.subTitle && <p>{divideByElement(item.subTitle)}</p>}
                </Link>
                <div className={styles.data}>{item.publicationDate}</div>
              </div>
            </div>)}
          </div>
          {/* <div className={styles.spin}>正在加载</div> */}
        </div>
      </div>

      <BackTop />
    </main>
  )
}

export default NewsComp
