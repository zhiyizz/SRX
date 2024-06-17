import { combineUrl } from '@utils/helper'

export async function getGuideData(draft?: boolean) {
  const res = await fetch(draft ? combineUrl(process.env.STATIC_HOST, '/resource/vehicleUserGuideTesting.json') : combineUrl(process.env.STATIC_HOST, '/resource/vehicleUserGuide.json'), { next: { tags: ['guide'] } })

  return await res.json()
}
