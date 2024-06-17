'use client'

import { type FC, useEffect, useState } from 'react'

import styles from '@styles/components/aside.module.scss'

import classNames from 'classnames'
import SvgIcon from './icons'
import { trackEvent } from '@utils/tracking'
import { useRouter } from 'next/navigation'
import { showTd, useDispatch, useSelector } from 'lib/redux'
import { showIChat } from 'lib/redux/slices/global/globalSlice'

type AsideButtonsProps = {
  onBuy?: VoidFunction
  // onService?: VoidFunction
  // onTestdrive?: VoidFunction
  onTop?: VoidFunction
  tracking?:string
  showTop?: boolean
  /**
   * 隐藏手机端底部试驾按钮。
   */
  hideTd?: boolean
  /**
   * 显示选配按钮。
   */
  configurator?: string
}

const AsideButtons: FC<AsideButtonsProps> = ({ onTop, showTop: propShowTop, hideTd, configurator }) => {
  const [showTop, setShowTop] = useState(false)
  const router = useRouter()

  const dispatch = useDispatch()
  const { tdInView } = useSelector(state => state.nav)

  function triggerMzClick(name: string) {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-右侧-${name}`)
    }
  }

  function triggerMzMobClick(name: string) {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-底部-${name}`)
    }
  }

  useEffect(() => {
    const vh = window.innerHeight
    const handle = () => {
      if (window.scrollY > vh / 2) {
        setShowTop(true)
      } else {
        setShowTop(false)
      }
    }
    window.addEventListener('scroll', handle)
    return () => {
      window.removeEventListener('scroll', handle)
    }
  }, [])

  return (
    <>
      <aside className={styles.quicklink}>
        <ul>
          {configurator && <li className={styles.td} onClick={()=>{
            const old = location.search
            let param = `series=${configurator}`
            if (old.length > 1) {
              param = '&' + param
            } else if (old === '') {
              param = '?' + param
            }
            router.push(`/configurator${old}${param}`)
            triggerMzClick('立即定购')
          }}>
            <div className={styles.icon}><SvgIcon icon="xny" /></div>
            <span>立即定购</span>
          </li>}
          <li className={styles.td} onClick={() => {
            tdInView && dispatch(showTd())
            triggerMzClick('预约试驾')
          }}>
            <div className={styles.icon}><SvgIcon icon="testdrive" /></div>
            <span>预约试驾</span>
          </li>
          {/* onBuy && <li onClick={()=>{
            onBuy()
            triggerMzClick('立即购车')
          }}>
            <div className={styles.icon}><SvgIcon icon="cart" /></div>
            <span>在线购车</span>
          </li> */}
          <li onClick={()=>{
            dispatch(showIChat())
            triggerMzClick('在线客服')
          }}>
            <div className={styles.icon}><SvgIcon icon="online" /></div>
            <span>在线客服</span>
          </li>
          <li className={classNames({
            [styles['show-top']]: propShowTop ?? showTop,
          })} onClick={()=>{
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
            onTop && onTop()
            triggerMzClick('返回顶部')
          }}>
            <div className={styles.icon}><SvgIcon icon="top" /></div>
            <span>回到顶部</span>
          </li>
        </ul>
      </aside>

      {/* Mobile 试驾栏 */}
      <div className={classNames(styles.btnbar, {
        [styles['hidden']]: hideTd,
      })}>
        {configurator && <div className={classNames(styles['btnbar-btn'], styles['btnbar-xny'])} onClick={()=>{
          const old = location.search
          let param = `series=${configurator}`
          if (old.length > 1) {
            param = '&' + param
          } else if (old === '') {
            param = '?' + param
          }
          router.push(`/configurator${old}${param}`)
          triggerMzMobClick('立即定购')
        }}>
          <SvgIcon icon="xny" />
          <span>立即定购</span>
        </div>}
        <div className={classNames(styles['btnbar-btn'], styles['btnbar-try'])} onClick={() => {
          tdInView && dispatch(showTd())
          triggerMzMobClick('预约试驾')
        }}>
          <SvgIcon icon="testdrive" />
          <span>预约试驾</span>
        </div>
      </div>
    </>
  )
}

export default AsideButtons
