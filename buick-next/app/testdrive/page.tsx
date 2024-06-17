import { draftMode } from 'next/headers'
import TestdriveComp from './testdrive'
import { getSeries, uniqueOrder } from '@utils/libs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '预约试驾',
}

export default async function Testdrive() {
  const { isEnabled } = draftMode()

  const series = await getSeries(isEnabled)
  const order = uniqueOrder(series)

  return <TestdriveComp series={series} order={order} />
}
