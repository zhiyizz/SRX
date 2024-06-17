'use client'

import { useMemo, type FC } from 'react'
import Link from 'next/link'

import styles from '@styles/components/monitor.module.scss'
import { usePathname } from 'next/navigation'
import { useSelector } from 'lib/redux'

const Monitor: FC = () => {
  const pathname = usePathname()

  const tracking = useSelector(state => state.global.tracking)

  const show = useMemo(() => tracking && pathname !== '/tracking', [pathname, tracking])

  if (show) {
    return (
      <div className={styles.float}><Link href="/tracking">&lt;返回监测</Link></div>
    )
  }
  return null
}

export default Monitor
