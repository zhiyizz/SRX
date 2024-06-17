import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata, NextPage } from 'next'
import type { CenturyPageProperties } from '~types/series'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import { getSeries } from '@utils/libs'
import SeriesGeneral from '../series'
import Century from 'app/century'
import Century6 from 'app/century6'
import CenturySpecial from 'app/centuryspecial'
import type { DataResponse } from '../page'

async function getDraft(id: string) {
  const res = await fetch(`${process.env.DATA_API}/api/series/preview/${id}`, { cache: 'no-store' })

  const json = await res.json() as DataResponse
  json.preview = true
  return json
}

export async function generateMetadata({ params }: { params: { series: string } }): Promise<Metadata> {
  const { isEnabled } = draftMode()

  const sd = await getSeries(isEnabled)
  const currentSeries = sd.find(s => !s.flags?.mock && (s.code === params.series || s.url?.replace(/^[\/\\]/, '') === params.series))

  if (currentSeries) {
    let title = currentSeries.displayName || currentSeries.name
    if (isEnabled) {
      title = `[预览]${title}`
    }
    return {
      title,
    }
  }

  return {
    title: '404',
  }
}

export default async function SeriesPage({ params, searchParams }: { params: { series: string }, searchParams: { id: string } }) {
  const { isEnabled } = draftMode()

  if (!isEnabled) {
    notFound()
  }

  const sd = await getSeries(isEnabled)

  const currentSeries = sd.find(s => !s.flags?.mock && (s.code === params.series || s.url?.replace(/^[\/\\]/, '') === params.series))

  if (!currentSeries) {
    notFound()
  }

  const res = await getDraft(searchParams.id)
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
      return <CenturyComponent currentSeries={currentSeries} loanPicList={loanPicList} data={data} prefix={prefix} draftMode />
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

  return <SeriesGeneral data={data} promo={promo} currentSeries={currentSeries} loanPicList={loanPicList} prefix={prefix} draftMode />
}
