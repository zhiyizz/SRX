import type { Metadata } from 'next'
import Monitor from '@components/Monitor'
import Nav from './nav'
import Footer from '@components/layouts/Footer'
import { Providers } from 'lib/provider'
import IChatPopup from '@components/IChatPopup'
import BodyScroll from '@components/BodyScroll'
import Tracking from '@components/Tracking'
import ResetPage from '@components/ResetPage'
import { getSeries } from '@utils/libs'
import { getAppData } from './app/page'
import type { FeatureMedia } from '~types/feature'

import 'animate.css'

import '@styles/globals.scss'

export const metadata: Metadata = {
  title: {
    template: '%s - 别克汽车官网',
    default: '别克汽车官网',
  },
  description: '欢迎访问上汽通用别克品牌中国官方网站。在这里，您将可以了解别克全线车型，品牌最新动态新闻，市场活动，及全国授权经销商。',
  keywords: '别克汽车,别克官网,别克轿车,别克SUV',
  icons: '/favicon.ico',
}

export const revalidate = 172800 // 2 days

async function getDefaultXingyun() {
  try {
    if (process.env.FORCE_USE_BACKUP) {
      return
    }
    return await fetch(`${process.env.DATA_API}/api/global/data/mini-default`, { next: { tags: ['mini-default'] } }).then<GlobalDataResponse<{ media?: FeatureMedia }>>(res => res.json())
  } catch {
    return
  }
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const series = await getSeries()
  const app = await getAppData()
  const xingyun = await getDefaultXingyun()

  return (
    <Providers>
      <html lang="zh">
        <body>
          <Nav />
          {children}
          <Footer appData={app.data} defaultMp={xingyun} />
          <IChatPopup />
          <BodyScroll />
          <Monitor />
          <Tracking series={series} />
          <ResetPage />
        </body>
      </html>
    </Providers>
  )
}
