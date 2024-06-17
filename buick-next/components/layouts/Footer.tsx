'use client'

import AliImage from '@components/AlImage'
import Iframe from '@components/Iframe'
import { trackEvent } from '@utils/tracking'
import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { hideDownloadPopup, useDispatch, useSelector } from 'lib/redux'
import type { IBuickAppData } from 'app/app/app'
import { combineUrl } from '@utils/helper'
import type { FeatureMedia } from '~types/feature'

import styles from '../../styles/layouts/footer.module.scss'

type FooterProperties = {
  appData?: IBuickAppData
  defaultMp?: GlobalDataResponse<{ media?: FeatureMedia }>
  onPopupHide?: (show: boolean) => void
}

export default function Footer({ appData, defaultMp, onPopupHide }: FooterProperties) {
  const infoData = [
    {
      name:'隐私协议',
      url:'https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html'
    },
    {
      name:'应用权限说明',
      url:'https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/applicationList.html'
    }
  ]

  const [iframeShow, setIframeShow] = useState(false)
  const [iframeIdx,setIframeIdx] = useState(0)
  const [qrCode,setQrCode] = useState(false)
  const [show,setShow] = useState(false)

  const dispatch = useDispatch()
  const xingyun = useSelector(state => state.global.xingyun)
  const dlPopup = useSelector(state => state.global.showDownload)
  const hideApp = useSelector(state => state.global.hideAppDl)

  function triggerMzClick(name: string) {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-底部-${name}`)
    }
  }

  const openPopup = (url?: string) => {
    if (!url) return

    const isWechat = /MicroMessenger/i.test(window.navigator.userAgent);
    if (isWechat) {
      setShow(true)
    } else {
      window.open(url)
    }
  }

  return (
    <footer className={styles.footer}>
      {!hideApp && <div className={styles.app}>
        <div className={styles.download}>
          <div className={styles.xingyun}>
            <AliImage src={xingyun && (/^http/.test(xingyun) ? xingyun : combineUrl(process.env.NEXT_PUBLIC_XINGYUN_PREFIX, `${xingyun}.jpg`)) || combineUrl(process.env.NEXT_PUBLIC_XINGYUN_PREFIX, defaultMp?.data?.media?.url || 'home.jpg')} alt="别克Buick小程序" width={122} height={122} />
            <p>别克Buick小程序</p>
          </div>
          <div className={styles.qrcode}>
            <AliImage src="/img/common/app.jpg" alt="下载ibuick app" width={122} height={122} />
          </div>
          <div className={styles.content}>
            <h3>即刻下载iBuick APP<br />您的掌上出行服务平台</h3>
            <div className={styles.btns}>
              <a target="_blank" rel="noreferrer" onClick={() => {
                triggerMzClick('下载APP-App Store')
                openPopup(appData?.ios?.url)
              }}>
                <i>Available on the</i>
                <b>App Store</b>
              </a>
              <a target="_blank" rel="noreferrer" onClick={() => {
                triggerMzClick('下载APP-Android')
                openPopup(appData?.android?.url)
              }}>
                <i>Available on the</i>
                <b>Android</b>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles['auto-width']}><strong>应用名称: </strong>iBuick<Link href="/app" className={styles.gap}>功能介绍</Link></div>
          <div className={styles.info}>
            <div>
              <h4>iOS:</h4>
              <p>开发者名称: 上汽通用汽车销售有限公司</p>
              <p>版本号（当前最新版本）: { appData?.ios?.version }</p>
              <p>应用权限说明: <a onClick={()=>{
                setIframeIdx(1)
                setIframeShow(true)
                triggerMzClick('应用权限说明-IOS')
              }}>点击查看</a></p>
              <p>个人信息保护政策: <a onClick={()=>{
                setIframeIdx(0)
                setIframeShow(true)
                triggerMzClick('个人信息保护政策-IOS')
              }}>点击查看</a></p>
            </div>
            <div>
              <h4>Android:</h4>
              <p>开发者名称: 上汽通用汽车有限公司</p>
              <p>版本号（当前最新版本）: { appData?.android?.version }</p>
              <p>应用权限说明: <a onClick={()=>{
                setIframeIdx(1)
                setIframeShow(true)
                triggerMzClick('应用权限说明-ANDROID')
              }}>点击查看</a></p>
              <p>个人信息保护政策: <a onClick={()=>{
                setIframeIdx(0)
                setIframeShow(true)
                triggerMzClick('个人信息保护政策-ANDROID')
              }}>点击查看</a></p>
            </div>
          </div>
        </div>
      </div>}
      
      <div className={styles.links}>
        <div className={classNames('m', styles.contact)}>
          <h5>关注我们</h5>
          <div className={styles.icons}>
            <a className={styles.tel} href="tel:4008202020" onClick={() => triggerMzClick('关注我们-电话')}></a>
            <a className={styles.wechat} onClick={() => {
              setQrCode(true)
              triggerMzClick('关注我们-微信')
            }}></a>
            <a className={styles.weibo} href="https://weibo.com/sgmbuick" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('关注我们-微博')}></a>
            <Link href="/app" className={styles.ibuick} onClick={() => triggerMzClick('关注我们-APP')}></Link>
          </div>
        </div>
        <ul>
          <li><Link href="/contact-us" onClick={() => triggerMzClick('联系我们')}>联系我们</Link></li>
          <li><a onClick={()=>{
              setIframeIdx(0)
              setIframeShow(true)
              triggerMzClick('隐私政策')
            }}>隐私政策</a></li>
        </ul>
        <div className={classNames('pc', styles.social)}>
          <div className={styles.wechat} onClick={() => {
            setQrCode(true)
            triggerMzClick('别克微信公众号')
          }}><a title="别克微信公众号"></a></div>
          <div className={styles.weibo}><a href="https://weibo.com/sgmbuick" target="_blank" title="别克官方微博" rel="noreferrer" onClick={() => triggerMzClick('别克官方微博')}></a></div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span className="pc-inline">Copyright &copy; 2022 SAIC General Motors Co., Ltd. All Rights Reserved.</span>
        <span className="m">Copyright &copy; 2022 Buick All Rights Reserved.</span>
        <a href="http://beian.miit.gov.cn/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('ICP备案')}>沪ICP备05015204号-7</a>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=*********" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('公网安备')}>
          <AliImage src="/img/icon/police.jpg" alt="公网安备" width={20} height={20} />
          沪公网安备31011502203277号
        </a>
      </div>

      {iframeShow && <Iframe onClose={()=>setIframeShow(false)} show={iframeShow} url={infoData[iframeIdx].url} />}

      <div className={classNames(styles['wechat-qrcode'],{
        [styles.show]:qrCode
      })}>
        <a className={styles.close} onClick={() => {
          setQrCode(false)
          triggerMzClick('别克微信公众号-关闭')
        }}><i className="icon-close"></i></a>
        <AliImage src="/img/contact/wechat.jpg" alt="微信二维码" width={310} height={310} />
        <div className={styles.info}>
          <h4>方法一</h4>
          <p>长按QR码保存到图片库，通过微信扫描二维码关注别克官方微信订阅号。</p>
          <h4>方法二</h4>
          <p>微信公众账号搜索“别克”，以关注别克官方微信订阅号。</p>
        </div>
      </div>



      {(dlPopup || show) && (
        <div className={styles['popup-open']}>
          <div className={styles['popup-content']}>
            <i className={styles['close']} onClick={() => {
              if (dlPopup) {
                dispatch(hideDownloadPopup())
                onPopupHide?.(false)
              }
              setShow(false)
            }} />
            <p>若无法自动下载，请点击右上角按钮选择</p>
            <p>【在浏览器中打开】即可正常下载</p>
          </div>
        </div>
      )}
    </footer>
  )
}
