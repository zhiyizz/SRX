import { combineUrl } from '@utils/helper'
import { notFound } from 'next/navigation'
import Inter from './comp'
import type { Metadata } from 'next'
import { getGuideData } from '..'

async function getData(id: string) {
  const res = await fetch(combineUrl(process.env.BUICK_API, `/VehicleUserGuide/${id}`), { next: { tags: ['guide'] } })
  return await res.json()
}

export const metadata: Metadata = {
  title: '用车指南',
}

export default async function GuideDetail({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  
  if (data.status !== 1) {
    notFound()
  }

  return <Inter data={data.data} />
}

export async function generateStaticParams() {
  const resData = await getGuideData()
  const arr = [];
  for (const c in resData.categories) {
    for (const c1 in resData.categories[c]) {
      for (const c2 in resData.categories[c][c1]) {
        const d = resData.categories[c][c1][c2]
        if (Array.isArray(d)) {
          arr.push(...d)
        } else {
          arr.push(d)
        }
      }
    }
  }
  for (const v in resData.vehicleSeries) {
    for (const v1 in resData.vehicleSeries[v]) {
      arr.push(resData.vehicleSeries[v][v1])
    }
  }

  return arr.map(item => ({
    id: String(item.id),
  }))
}
