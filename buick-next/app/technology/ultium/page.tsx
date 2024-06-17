import type { Metadata } from 'next'
import Ultium from './ultium'

export const metadata: Metadata = {
  title: '别克奥特能平台',
}

export default function UltiumPage() {
  return <Ultium />
}
