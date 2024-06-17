'use client'

import { type FC, useState } from 'react'
import classNames from 'classnames'
import styles from '@styles/testdrive.module.scss'

import Testdrive from '@components/Testdrive'
import type { SeriesObject } from '~types/series'
import type { DealerType } from '~types/dealer'
import type { KvMediaType } from '~types/slider'
import MediaComponent from '@components/MediaComponent'
import BaiduMap from '@components/BaiduMap'
import Icons from '@components/icons'

const TestdriveComp: FC<{
  series?: SeriesObject[]
  order?: string[]
}> = ({ series, order }) => {
  const [isMapReady,setIsMapReady] = useState<BMapGL.Point>()
  const [dealerData,setDealerData] = useState<DealerType[]>()
  const [currentDealer,setCurrentDealer] = useState<number>()
  const background: KvMediaType[] = [
    {
      "device": "pc",
      "url": "background.jpg"
    }
  ]
  const [showMap,setShowMap] = useState(false)
  const showMapFn = ()=>{
    if(isMapReady){
      setShowMap(!showMap)
    }
  }
  return (
    // <BasePage className={styles.main} title="预约试驾" seriesData={series} categoryList={category} navPosition="fixed">
    <main className={styles.main}>
      <MediaComponent className={styles.background} media={background} prefix={'/img/testdrive'} />
      <div className={styles.container}>
        <div className={classNames(styles.map,{
          [styles.show]: showMap
        })}>
          <BaiduMap styles={styles} point={isMapReady} data={dealerData} currentData={currentDealer} onSelected={setCurrentDealer} exteral />
        </div>
        <div className={styles.tdform}>
          <h2 className={styles.title}>预约试驾</h2>
          <Testdrive styles={styles} hideGender showLabel series={series} seriesOrder={order} selectedDealerIndex={currentDealer} tracking="预约试驾页" onMapReady={setIsMapReady} onDealerChange={setDealerData} onDealerSelectedChange={setCurrentDealer} />
          {isMapReady && <div className={styles.mapbtn} onClick={showMapFn}><Icons icon="search" />{showMap ? '关闭地图查找' : '打开地图查找'}</div>}
        </div>
      </div>
    </main>
  )
}

export default TestdriveComp
