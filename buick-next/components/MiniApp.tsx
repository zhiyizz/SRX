'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function MiniApp() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const mini = searchParams.get('from_mini')
    if (mini) {
      document.body.classList.add('mini-app')
    }
  }, [searchParams])

  return null
}
