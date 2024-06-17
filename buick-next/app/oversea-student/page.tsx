import { getSeries, uniqueOrder } from '@utils/libs'
import { draftMode } from 'next/headers'
import OverseasStudent from './oversea-student'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '留学生购车',
}

export default async function OverseasStudentPage() {
  const { isEnabled } = draftMode()
  
  const series = await getSeries(isEnabled)
  const order = uniqueOrder(series)

  return <OverseasStudent series={series} order={order} />
}
