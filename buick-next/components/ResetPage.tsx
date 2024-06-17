'use client'

import { setScrollDisabled, showNav, useDispatch } from 'lib/redux'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ResetPage() {
  const pathname = usePathname()

  const dispatch = useDispatch()

  useEffect(() => {
    if (pathname) {
      dispatch(setScrollDisabled(false))
      dispatch(showNav())
      // dispatch(setPosition('static'))
    }
  }, [dispatch, pathname])

  return null
}
