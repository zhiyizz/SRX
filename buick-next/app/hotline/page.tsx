import type { Metadata } from 'next'
import Hotline from './hotline'

export const metadata: Metadata = {
  title: '经销商热线',
}

export default function HotlinePage() {
  return <Hotline />
}
