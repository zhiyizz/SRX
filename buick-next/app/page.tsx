import type { Metadata } from 'next'
import KvSlider from '@components/KvSlider'
import HomeBlock from './home'
import styles from '@styles/home.module.scss'
import { combineUrl } from '@utils/helper'
import type { KvSlide } from '~types/slider'
import { getSeries, uniqueOrder } from '@utils/libs'
import { draftMode } from 'next/headers'

export const metadata: Metadata = {
  title: {
    absolute: '别克汽车官网 - 心静 思远 智行千里',
  },
  other: {
    'baidu-site-verification': 'codeva-nyB5Iob0sn',
  },
}

export const revalidate = 86400

async function getKvData(preview?: boolean) {
  const res = await fetch(preview ? combineUrl(process.env.PREVIEW_API, '/indexkv') : `${process.env.STATIC_HOST}/resource/kv.json`, { next: { tags: ['homekv'] } })
  const resData = await res.json()
  let kvData: KvSlide[]
  if (Array.isArray(resData)) {
    kvData = resData as KvSlide[]
  } else if (resData.code == 1000 && Array.isArray(resData.result)) {
    kvData = resData.result as KvSlide[]
  } else {
    kvData = []
  }
  return kvData
}

export default async function Home() {
  const { isEnabled } = draftMode()

  const kvData = await getKvData(isEnabled)

  const series = await getSeries(isEnabled)
  const order = uniqueOrder(series)

  return (
    // <BasePage className={styles.main} seriesData={series} categoryList={category} navPosition="fixed" showIChat={showIChat} smoothScroll={showTd || showBuy} onNavBuy={handleScrollBuy} onNavTd={handleScrollTestdrive} onIChatClose={() => {
    //   setShowIChat(false)
    // }}>
    <main className={styles.main}>
      <KvSlider className={styles.kv} slides={kvData} size="home" />

      <HomeBlock series={series} seriesOrder={order} />
    </main>
    // </BasePage>
  )
}
