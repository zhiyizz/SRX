'use client'

import type { FC } from 'react'
import styles from '@styles/components/ichat.module.scss'
import classNames from 'classnames'
import { hideIChat, useDispatch, useSelector } from 'lib/redux'

const IChatPopup: FC = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.global.showIChat)

  return (
    <div className={classNames(styles.popup, {
      [styles.show]: show,
      'animate__animated': show,
      'animate__slideInUp': show,
      'animate__fast': show,
    })}>
      <div className={styles.title}>
        <h3>在线客服</h3>
        <div className={styles.action}>
          <div className={styles.close} onClick={() => {
            dispatch(hideIChat())
          }}>
            <i className="icon-close icon-close-light"></i>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {show && <iframe src="https://ichat.saic-gm.com/buick-ichat-web/iframe.html?&utmsource=&utmmedium=&utmcampaign=&utmterm=&utmfilter="></iframe>}
      </div>
    </div>
  )
}

export default IChatPopup
