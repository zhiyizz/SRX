'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function FinanceApply({ onApply }: {
  onApply?: (series: string) => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const apply = searchParams.get('apply')
    if (apply) {
      onApply?.(apply)
    }
  }, [onApply, searchParams])

  return null
}
