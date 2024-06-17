import styles from '@styles/news.module.scss'
import SvgIcon from '@components/icons'
import Link from 'next/link'
import { combineUrl } from '@utils/helper'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import BackTop from '@components/BackTop'
import type { Metadata } from 'next'
import type { NewsItem } from 'app/news/news'

type NewsDetail = {
  id: number
  title: string
  subTitle?: string
  vehicleSeries?: string[]
  content: string
  publicationDate: string
}

async function getData(id: string, draft?: boolean) {
  const res = await fetch(draft ? combineUrl(process.env.PREVIEW_API, `/otadetail?id=${id}&islaunch=false`) : combineUrl(process.env.BUICK_API, '/ota/', id))
  const newsDetail = await res.json() as {
    status: number
    message: string
    data?: NewsDetail
    code?: number
    /**
     * preview only
     */
    result?: NewsDetail
  }
  if ((!newsDetail.result && !newsDetail.data) || (draft && newsDetail.code !== 1000)) {
    return
  }

  return newsDetail.result || newsDetail.data
}

export const metadata: Metadata = {
  title: 'OTA及电子系统升级公告',
}

export const revalidate = 604800

export default async function NoticeDetail({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode()

  const data = await getData(params.id, isEnabled)
  if (!data) {
    notFound()
  }

  return (
    // <BasePage className={styles.main} title="OTA及电子系统升级公告" seriesData={series} categoryList={category} smoothScroll={backTop}>
    <main className={styles.main}>
      <div className={styles.detail}>
        <div className={styles.header}>
          <h1>{data.title}</h1>
          <h2>{data.subTitle}</h2>
          <Link href="/news/update" className={styles.back}><SvgIcon icon="back" /><span>返回列表</span></Link>
        </div>
        <div className={styles.article} dangerouslySetInnerHTML={{__html: data.content}}></div>
      </div>

      <BackTop />
    </main>
  )
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.STATIC_HOST}/resource/ota.json`, { cache: 'no-store' })
  const newsList = await res.json() as NewsItem[]

  return newsList.map(item => ({
    id: String(item.id),
  }))
}
