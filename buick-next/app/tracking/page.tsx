import { cookies } from 'next/headers'
import TrackingPage from './tracking'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '监测代码管理',
}

export default function Page() {
  const c = cookies().get('bn_tracking')

  return <TrackingPage tracking={c?.value} />
}
