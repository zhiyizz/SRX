import { type FC, useEffect, useState } from 'react'
import styles from '@styles/news.module.scss'
import classNames from 'classnames'
import { combineUrl, divideByElement } from '@utils/helper'
import type { OtaItem } from 'app/news/update/update'
import type { TagObject } from 'app/news/news'
import type { SeriesObject } from '~types/series'
import Link from 'next/link'

type NewsPagerProperties = {
  data?: OtaItem[]
  series?: SeriesObject[]
  prefix?: string
}

const NewsPager: FC<NewsPagerProperties> = ({ data, series, prefix }) => {
  const [year, setYear] = useState<string[]>()
  const [tags, setTags] = useState<TagObject[]>()

  const [selectedYear, setSelectedYear] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const [pageIndex, setPageIndex] = useState(1)
  const [pageTotal, setPageTotal] = useState(0)

  const [filtered, setFiltered] = useState<OtaItem[]>()
  const [pageData, setPageData] = useState<OtaItem[]>()

  useEffect(() => {
    if (data) {
      const filtered = data.filter(item => {
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
      setPageIndex(1)
      setPageTotal(Math.ceil(filtered.length / 4))

      setFiltered(filtered)
    }
  }, [data, selectedYear, selectedTag])

  useEffect(() => {
    if (filtered) {
      const paged = filtered.slice((pageIndex - 1) * 4, pageIndex * 4)
      setPageData(paged)
    }
  }, [filtered, pageIndex])

  useEffect(() => {
    if (data) {
      const yearList = new Set<string>()
      const codeList: string[][] = []
      data.forEach(item => {
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
    }
  }, [series, data])

  return (
    <div className={styles.content}>

      <div className={classNames(styles.tools,styles['bm-border'])}>
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

      <div className={styles.list}>

        {pageData && pageData.map(item => <div key={item.id} className={styles.item}>
          <div className={styles.title}>
            <h4><Link href={combineUrl(prefix, String(item.id))}>{divideByElement(item.title)}</Link></h4>
          </div>
          <div className={styles.info}>
            <div className={styles.types}>
              {item.vehicleModels && item.vehicleModels.map((m, idx) => <span key={idx}>{m}</span>)}
            </div>
            <div className={styles.data}>{item.publicationDate}</div>
          </div>
        </div>)}

      </div>

      {pageTotal > 1 && <div className={styles.pagination}>
        <div className={styles.number}><span className={styles.current}>{pageIndex}</span>/{pageTotal}</div>
        <div className={styles.button}>
          <div className={classNames(styles.prev, {
            [styles.disabled]: pageIndex === 1
          })} onClick={pageIndex > 1 ? () => {
            let idx = pageIndex - 1
            if (idx < 1) {
              idx = 1
            }
            setPageIndex(idx)
          } : undefined}></div>
          <div className={classNames(styles.next, {
            [styles.disabled]: pageIndex === pageTotal
          })} onClick={pageIndex < pageTotal ? () => {
            let idx = pageIndex + 1
            if (idx > pageTotal) {
              idx = pageTotal
            }
            setPageIndex(idx)
          } : undefined}></div>
        </div>
      </div>}

    </div>

  )
}

export default NewsPager
