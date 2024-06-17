'use client'

import { useCallback } from 'react'
import SvgIcon from './icons'
import classNames from 'classnames'
import styles from '@styles/components/back-top.module.scss'

export default function BackTop({ className, onClick }: {
  className?: string
  onClick?: VoidFunction
}) {
  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    onClick?.()
  }, [onClick])

  return (
    <div className={classNames(styles['scroll-top'], className)} onClick={handleScrollTop}>
      <SvgIcon icon="arrow-up" />
      <span>返回顶部</span>
    </div>
  )
}
