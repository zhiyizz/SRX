import { notFound } from 'next/navigation'
import type { Metadata, NextPage } from 'next'
import type { CenturyPageProperties, SeriesJson, SeriesObject } from '~types/series'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import { getSeries } from '@utils/libs'
import SeriesGeneral from './series'
import { combineUrl } from '@utils/helper'
import Century from 'app/century'
import Century6 from 'app/century6'
import CenturySpecial from 'app/centuryspecial'
import { getJsonData } from '@utils/backup'

export type DataResponse = {
  status?: 'ok'
  err?: string
  code?: number
  data?: SeriesJson
  prefix?: string
  preview?: boolean
  ts?: number
}

async function getBackup(code: string): Promise<DataResponse> {
  const res = await getJsonData(code, 3600, `series-${code}-snapshot`)
  const data = await res.json()
  const ts = res.headers.get('x-ms-meta-save') ?? 0
  return {
    status: 'ok',
    data,
    prefix: res.headers.get('x-ms-meta-prefix') ?? undefined,
    ts: Number(ts),
  }
}

async function getData(code: string): Promise<DataResponse> {
  try {
    if (process.env.FORCE_USE_BACKUP) {
      return await getBackup(code)
    } else {
      const res = await fetch(`${process.env.DATA_API}/api/series/${code}`, { next: { tags: [`series-${code}`, 'series-pages'] } })
      return await res.json()
    }
  } catch (ex) {
    console.error(ex)
    console.warn('fallback to load from blob:', combineUrl(process.env.STATIC_HOST, `/assets/backups/${code}.json`))
    return await getBackup(code)
  }
}

export const revalidate = 7200

export async function generateMetadata({ params }: { params: { series: string } }): Promise<Metadata> {
  const sd = await getSeries()
  const currentSeries = sd.find(s => !s.flags?.mock && (s.code === params.series || s.url?.replace(/^[\/\\]/, '') === params.series))

  if (currentSeries) {
    const title = currentSeries.displayName || currentSeries.name
    return {
      title,
    }
  }

  return {
    title: '404',
  }
}

export default async function SeriesPage({ params }: { params: { series: string } }) {
  const sd = await getSeries()
  const currentSeries = sd.find(s => !s.flags?.mock && (s.code === params.series || s.url?.replace(/^[\/\\]/, '') === params.series))
  if (!currentSeries) {
    notFound()
  }

  const res = await getData(currentSeries.code)
  const { data, prefix } = res
  if (res.status !== 'ok' || res.err || !data) {
    notFound()
  }

  let promo: string | undefined = undefined
  if (data.promo?.markdown) {
    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(data.promo.markdown)
    const htmlString = processedContent.toString()
    // 外部链接添加 `target=_blank`
    promo = htmlString.replace(/<a (.*)href="http/g, '<a $1target="_blank" href="http')
  }

  let loanPicList: string[] | undefined = undefined
  if (/^century/.test(currentSeries.code)) {
    const century = sd.find(item => item.code === 'century')
    const century6 = sd.find(item => item.code === 'century6')
    const century7 = sd.find(item => item.code === 'century7')
    const centuryspecial = sd.find(item => item.code === 'centuryspecial')
    if (century && century6 && century7 && centuryspecial) {
      const list = [century.pic, century.pic, century6.pic,century7.pic,centuryspecial.pic]
      if (params.series !== 'century') {
        list.reverse()
      }
      loanPicList = list
    }

    const cm: Record<string, NextPage<CenturyPageProperties>> = {
      century: Century,
      century6: Century6,
      centuryspecial: CenturySpecial
    }
    const CenturyComponent = cm[params.series]
    if (CenturyComponent) {
      return <CenturyComponent currentSeries={currentSeries} loanPicList={loanPicList} data={data} prefix={prefix} draftMode={res.preview} />
    }
  } else if (/^gl8_avenir/.test(currentSeries.code)) {
    const s4 = sd.find(item => item.code === 'gl8_avenir')
    const s67 = sd.find(item => item.code === 'gl8_avenir6_7')
    if (s4 && s67) {
      const list = [s67.pic, s67.pic, s4.pic]
      if (currentSeries.code === 'gl8_avenir') {
        loanPicList = list.reverse()
      } else {
        loanPicList = list
      }
    }
  }

  return <SeriesGeneral data={data} promo={promo} currentSeries={currentSeries} loanPicList={loanPicList} prefix={prefix} draftMode={res.preview} />
}

function findSeriesPath(series: SeriesObject[], code: string) {
  const seriesObj = series.find(s => s.code === code && !s.flags?.mock)
  // let url: string | undefined
  if (seriesObj) {
    return seriesObj.url?.replace(/^[\/\\]/, '') || code
  }
}

function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export async function generateStaticParams() {
  let codes: string[] = []
  let json: Record<string, unknown>
  try {
    if (process.env.FORCE_USE_BACKUP) {
      const res = await getJsonData('_sereis-urls', false)
      return await res.json()
    } else {
      json = await fetch(combineUrl(process.env.DATA_API, '/api/series/available'), { cache: 'no-store' }).then(res => res.json())
    }
  } catch (ex) {
    console.warn('fallback to load from blob', ex)
    const res = await getJsonData('_sereis-urls', false)
    const data = await res.json()
    return data
  }

  const series = await getSeries()

  if (json.status === 'ok' && json.data) {
    codes = (json.data as { code: string }[]).map(item => findSeriesPath(series, item.code)).filter(isString)
    console.log('\navailable', codes, codes.length, '\n')
  }

  const params = codes.map(c => ({
    series: c,
  }))

  return params
}
