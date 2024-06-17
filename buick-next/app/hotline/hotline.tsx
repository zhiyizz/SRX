'use client'

import AliImage from '@components/AlImage'
import SvgIcon from '@components/icons'
import styles from '@styles/hotline.module.scss'
import { type DealerObject, distanceBetweenPoint } from '@utils/dealer'
import { combineUrl } from '@utils/helper'
import { type HotlineObject, useOnlineDealer } from '@utils/request'
import { trackEvent } from '@utils/tracking'
import type { DealerType } from '~types/dealer'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import imgKv from '../../public/img/hotline/kv.jpg'
import BaiduScript, { type BaiduLocation } from '@components/BaiduScript'

type TownObject = {
  townId: string
  townName: string
  dealers: DealerObject[]
}

const Hotline: NextPage = () => {
  const { data, isLoading } = useOnlineDealer()

  const [pos, setPos] = useState<BaiduLocation>()

  const [province, setProvince] = useState<HotlineObject>()
  const [city, setCity] = useState<{
    cityId: string
    cityName: string
    towns: TownObject[]
  }>()
  const [town, setTown] = useState<TownObject>()
  const [dataList, setDataList] = useState<DealerType[]>()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (pos) {
      const { province, city } = pos
      if (Array.isArray(data) && /上海/.test(province)) {
        console.log('find', province, city)
        const regexProv = new RegExp(`^${province}`)
        // const prov = data[0]
        const prov = data.find(item => item.provinceName == province || regexProv.test(item.provinceName))
        if (prov) {
          setProvince(prov)
          const regexCity = new RegExp(`^${city}`)
          const c = prov.citys.find(item => item.cityName == city || regexCity.test(item.cityName))
          setCity(c!)
        }
      }
    }
  }, [data, pos])

  // useEffect(() => {
  //   if (data && !province) {
  //     setProvince(data[0])
  //   }
  // }, [data, province])

  useEffect(() => {
    let hasDistance = false
    let list: DealerObject[]
    if (town) {
      list = town.dealers
    } else if (city) {
      list = city.towns.flatMap(item => item.dealers)
    } else {
      setDataList(undefined)
      return
    }
    const pData = list.map<DealerType>(item => {
      let dist = 0
      if (pos?.point && window.BMapGL) {
        const point = new window.BMapGL.Point(item.lng, item.lat)
        dist = distanceBetweenPoint(pos.point, point)
        hasDistance = true
      }
      return {
        address: item.address,
        code: item.dealerCode,
        city: 0,
        cityName: item.cityName,
        district: 0,
        lat: item.lat,
        lng: item.lng,
        name: item.dealerName,
        tel: item.dealerTelephone!,
        ext: item.dealerExtensionNumber,
        distance: dist,
      }
    })
    if (hasDistance) {
      pData.sort((a, b) => a.distance! - b.distance!)
    }
    setDataList(pData)
  }, [city, pos?.point, town])

  const CITY_BYPASS = province?.citys.length === 1

  return (
    // <BasePage className={styles.main} title="经销商热线" seriesData={series} categoryList={category}>
    <main className={styles.main}>
      <BaiduScript onPosition={l => setPos(l)} />
      <div className={styles.kv}>
        <AliImage src={imgKv} alt="经销商热线" />
      </div>
      <div className={styles.content}>
        <div className={styles.desc}>
          <h2>购车询价请联系附近地经销商</h2>
          <p>*为了保护您的隐私，您的电话将由上海总部自动转接经销商客服。</p>
        </div>
        <div className={styles.location}>
          <h3>请选择您所在的地区：</h3>
          {data?.length === 1 && <p>目前仅支持上海地区经销商，其它区域将陆续开放。</p>}
          <div className={styles.field}>
            <div className={styles.control}>
              <select value={province?.provinceId || ''} onChange={(e) => {
                const prov = data?.find(item => item.provinceId === e.target.value)
                setProvince(prov)
                setCity(prov?.citys?.[0])
                setTown(undefined)
              }}>
                <option value="" disabled>请选择</option>
                {data?.map(item => <option key={item.provinceId} value={item.provinceId}>{item.provinceName}</option>)}
              </select>
            </div>
            <div className={styles.control}>
              <select value={(CITY_BYPASS ? town?.townId : city?.cityId) || ''} onChange={(e) => {
                if (CITY_BYPASS) {
                  const town = city?.towns.find(item => item.townId === e.target.value)
                  setTown(town)
                } else {
                  const city = province?.citys.find(item => item.cityId === e.target.value)
                  setCity(city)
                  setTown(undefined)
                }
              }}>
                {(CITY_BYPASS || !dataList) && <option value="">全部</option>}
                {CITY_BYPASS ?
                  city?.towns.map(item => <option key={item.townId} value={item.townId}>{item.townName}</option>) :
                  province?.citys.map(item => <option key={item.cityId} value={item.cityId}>{item.cityName}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {dataList && !dataList?.length && <div className={styles.empty}>
            <p>当前地区暂无经销商。</p>
          </div>}
          {dataList?.map(item => <div key={item.code} className={styles.item}>
            <div className={styles.info}>
              <h4>
                <span>{item.name}</span>
                {typeof item.distance === 'number' && item.distance > 0 && <small className={styles.dist}>({item.distance}KM)</small>}
              </h4>
              <div className={styles.address}>
                <SvgIcon icon="location-dot" />
                <span>{item.address}</span>
              </div>
            </div>
            <button className='btn btn-block' onClick={() => {
              if (submitting) return

              const params = {
                dealerCode: item.code,
                dealerTel: item.tel,
                dealerExtensionNumber: item.ext,
              }
              setSubmitting(true)
              fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/ISaleApply'), {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify(params),
              }).then(res => {
                if (res.ok) {
                  res.json().then((json) => {
                    console.log(json)
                    if (json.status == 1) {
                      try {
                        window.location.href = `tel:${item.tel},${item.ext}${json.data}`
                      } catch {
                        alert('呼叫失败，请稍候再试')
                      }
                    } else {
                      alert('呼叫失败，请稍候再试')
                    }
                  })
                }
              }, (err) => {
                console.error(err)
              }).finally(() => {
                setSubmitting(false)
              })
              trackEvent('经销商热线-一键呼叫')
            }}>一键呼叫</button>
          </div>)}
        </div>
      </div>

      {(isLoading || !dataList || submitting) && <div className="loading">
        <SvgIcon icon="spin" />
        <span>正在加载</span>
      </div>}

    </main>
  )
}

export default Hotline
