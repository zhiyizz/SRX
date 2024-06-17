import { draftMode } from 'next/headers'
import Guide from './comp'
import type { Metadata } from 'next'
import { getGuideData } from '.'

export const metadata: Metadata = {
  title: '用车指南',
}

export default async function GuidePage() {
  const { isEnabled } = draftMode()

  const data = await getGuideData(isEnabled)

  return <Guide data={data} />
}
