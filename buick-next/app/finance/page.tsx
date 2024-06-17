import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getCategory, getSeries } from '@utils/libs'
import Finance from './finance'

export const metadata: Metadata = {
  title: '金融购车',
}

export default async function FinancePage() {
  const { isEnabled } = draftMode()

  const series = await getSeries(isEnabled)
  const category = await getCategory(isEnabled)

  return <Finance series={series} category={category} />
}
