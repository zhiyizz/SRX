import type { Metadata } from "next"
import Ibuick, { type IBuickAppData } from "./app"
import { getJsonData } from "@utils/backup"

export const metadata: Metadata = {
  title: '下载iBuick APP',
}

export async function getAppData() {
  try {
    if (process.env.FORCE_USE_BACKUP) {
      const res = await getJsonData('global-ibuick-app', 0, 'ibuick-app-snapshot')
      return await res.json() as GlobalDataResponse<IBuickAppData>
    } else {
      return await fetch(`${process.env.DATA_API}/api/global/data/ibuick-app`, { next: { tags: ['ibuick-app'] } }).then<GlobalDataResponse<IBuickAppData>>(res => res.json())
    }
  } catch (ex) {
    console.error(ex)
    const res = await getJsonData('global-ibuick-app', 0, 'ibuick-app-snapshot')
    return await res.json() as GlobalDataResponse<IBuickAppData>
  }
}

export default async function AppPage() {
  const res = await getAppData()

  return <Ibuick data={res.data} />
}
