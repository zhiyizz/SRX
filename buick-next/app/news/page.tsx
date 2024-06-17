import { draftMode } from 'next/headers'
import { getSeries } from '@utils/libs'
import NewsComp, { type NewsItem } from './news'
import { combineUrl } from '@utils/helper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新闻资讯',
}

export const revalidate = 604800

async function getData(draft?: boolean) {
  const res = await fetch(draft ? combineUrl(process.env.PREVIEW_API, '/newslist?count=20') : combineUrl(process.env.STATIC_HOST, '/resource/news.json'), { next: { tags: ['news'] } })
  const resData = await res.json()
  let newsList: NewsItem[]
  if (Array.isArray(resData)) {
    newsList = resData as NewsItem[]
  } else if (resData.code == 1000 && Array.isArray(resData.result)) {
    newsList = resData.result as NewsItem[]
  } else {
    newsList = []
  }
  return newsList
}

export default async function NewsPage() {
  const { isEnabled } = draftMode()

  const series = await getSeries(isEnabled)

  const data = await getData(isEnabled)

  return <NewsComp series={series} news={data} />
}
