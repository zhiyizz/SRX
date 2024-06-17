import AliImage from '@components/AlImage'
import type { FC } from 'react'
import styles from '@styles/contact.module.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '联系我们',
}

const ContactUS: FC = () => {
  return (
    // <BasePage className={styles.main} seriesData={series} categoryList={category} navPosition="fixed">
    <main className={styles.main}>
      <div className={styles.contact}>
        <h1>联系我们</h1>
        <p>如果您有任何需要或问题，欢迎拨打别克客户服务中心热线电话</p>
        <p className={styles.number}>800-820-2020 | 400-820-2020</p>
        <p>与我们联系</p>
        <p>或直接与<b><i><AliImage src="/img/contact/icon.jpg" width={34} height={32} /></i>在线客服</b>沟通</p>
        <div className={styles.more}>
          <p>您还可通过如下方式了解更多别克资讯：</p>
          <div className={styles.wechat}>
            <i><AliImage src="/img/contact/wechat.jpg" width={103} height={103} /></i>
            <p>关注别克官方微信</p>
          </div>
          <div className={styles.weibo}>
            <a href="//weibo.com/sgmbuick" target="_blank" rel="noreferrer">
              <i><AliImage src="/img/contact/weibo.jpg" width={52} height={42} /></i>
              <p>关注别克官方微博</p>
            </a>
          </div>
          <div className={styles.app}>
            <i><AliImage src="/img/contact/app.jpg" width={104} height={103} /></i>
            <p>下载iBuick手机APP</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactUS
