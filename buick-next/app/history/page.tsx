import type { Metadata } from 'next'
import History from './history'

export const metadata: Metadata = {
  title: '别克历史',
}

export default function HistoryPage() {
  return <History />
}
