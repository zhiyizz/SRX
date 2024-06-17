import type { Metadata } from 'next'
import DealerComp from './dealer'

export const metadata: Metadata = {
  title: '网点查询',
}

export default async function DealerPage() {
  return <DealerComp />
}
