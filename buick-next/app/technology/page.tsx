import type { Metadata } from 'next'
import Tech from './tech'

export const metadata: Metadata = {
  title: '别克科技',
}

export default function TechPage() {
  return <Tech />
}
