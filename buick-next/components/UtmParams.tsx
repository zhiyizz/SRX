'use client'

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export type UtmObject = {
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmContent?: string | null
  utmTerm?: string | null
}

export default function UtmParams({ onChange }: {
  onChange?: (params: UtmObject) => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = {
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
      utmTerm: searchParams.get('utm_term'),
    }
    onChange?.(params)
  }, [onChange, searchParams])

  return null
}
