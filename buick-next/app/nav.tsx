import { draftMode } from 'next/headers'
import Navigation, { type EventObject, type NavigationProperties } from '@components/layouts/Navigation'
import { getCategory, getSeries } from '@utils/libs'
import { combineUrl } from '@utils/helper'
import { getJsonData } from '@utils/backup'

async function getCampaign(category: 'official' | 'promo') {
  try {
    if (process.env.FORCE_USE_BACKUP) {
      const res = await getJsonData(`camp-${category}`, 86400 * 7, `camp-${category}-snapshot`)
      return await res.json() as EventObject[]
    } else {
      const res = await fetch(combineUrl(process.env.DATA_API, `/api/camp/all?cat=${category}`), { next: { revalidate: 86400, tags: [`camp-${category}`] } }).then<GlobalDataResponse<EventObject[]>>(res => res.json())
      if (res.status === 'ok') {
        return res.data
      }
    }
  } catch (ex) {
    console.error(ex)
    console.warn('fallback to load from blob', combineUrl(process.env.STATIC_HOST, `/assets/backups/camp-${category}.json`))
    const res = await getJsonData(`camp-${category}`, 86400 * 7, `camp-${category}-snapshot`)
    const data = await res.json() as EventObject[]
    return data
  }
}

export default async function Nav(props: Omit<NavigationProperties, 'seriesData' | 'categoryList' | 'eventList'>) {
  const { isEnabled } = draftMode()

  const series = await getSeries(isEnabled)
  const category = await getCategory(isEnabled)

  const activities = await getCampaign('official')
  const promotions = await getCampaign('promo')

  return <Navigation seriesData={series} categoryList={category} eventList={activities} promoList={promotions} {...props} />
}
