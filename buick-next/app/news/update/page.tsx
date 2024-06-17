import { combineUrl } from "@utils/helper";
import Notice, { type OtaItem } from "./update";
import { getSeries } from "@utils/libs";
import { draftMode } from "next/headers";
import type { Metadata } from "next";

async function getData(draft?: boolean) {
  const res = await fetch(draft ? combineUrl(process.env.PREVIEW_API, '/otalist') : combineUrl(process.env.STATIC_HOST, '/resource/ota.json'), { next: { tags: ['ota'] } })
  const resData = await res.json()
  let allData: OtaItem[]
  if (Array.isArray(resData)) {
    allData = resData as OtaItem[]
  } else if (resData.code == 1000 && Array.isArray(resData.result)) {
    allData = resData.result as OtaItem[]
  } else {
    allData = []
  }
  return allData
}

export const metadata: Metadata = {
  title: 'OTA及电子系统升级公告',
}

export const revalidate = 604800

export default async function OtaPage() {
  const { isEnabled } = draftMode()

  const data = await getData(isEnabled)
  const series = await getSeries(isEnabled)

  return <Notice data={data} series={series} />
}
