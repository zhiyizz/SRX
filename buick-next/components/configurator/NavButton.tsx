'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavButton({ className, code, hidden, onClick }: {
  className?: string
  code: string
  hidden?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  const [buildParams, setBuildParams] = useState<string>()

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('series', code)
    setBuildParams(params.toString())
  }, [code, searchParams])

  if (hidden) {
    return null
  }

  return (
    <div className={className} onClick={(e) => {
      router.push(`/configurator?${buildParams}`)
      onClick?.(e)
    }}>
      <span>立即定购</span>
    </div>
  )
}
