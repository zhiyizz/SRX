'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import type { NextPage } from 'next'
import styles from '@styles/dealer.module.scss'

import { useDealerData, useDealerEv, useServiceData } from '@utils/request'
import type { DealerCity, DealerProvince, DealerType } from '~types/dealer'
import { distanceBetweenPoint, processDealerData } from '@utils/dealer'
import BaiduMapCom from '@components/BaiduMap'
import BaiduScript, { type BaiduLocation } from '@components/BaiduScript'
import SvgIcon from '@components/icons'

const DealerComp: NextPage = () => {
  const [dealers, setDealers] = useState<DealerProvince[]>()
  const [filterTag, setFilterTag] = useState<'service' | 'ev'>()
  const [province, setProvince] = useState<DealerProvince>()
  const [city, setCity] = useState<DealerCity>()
  const [dealer, setDealer] = useState<DealerType>()
  const [filtered, setFiltered] = useState<DealerType[]>()
  const [showMap,setShowMap] = useState(false)
  const [resultTotal,setResultTotal] = useState<number>(0) 
  const listRef = useRef<HTMLDivElement>(null!)
  const [mapH,setMapH] = useState<number>(0)

  const [pos, setPos] = useState<BaiduLocation>()

  const { data: rawData } = useDealerData()
  const { data: serviceRawData } = useServiceData(true)
  const { data: evRawData } = useDealerEv(true)

  const listItem = useRef<(HTMLDivElement | null)[]>([])

  const showMapFn = ()=>{
    if(pos?.point){
      !showMap ? setShowMap(true) : setShowMap(false)
    }else{
      alert('地图加载中')
    }
  }

  const scrollListFn = (index: number) => {
    // let current = listRef.current.children[0].clientHeight * index
    // listRef.current.scrollTo(0, current)
    if (listItem.current[index]) {
      listItem.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }

  const getProvince = useCallback((province:string, city?:string )=>{
    if (Array.isArray(dealers)) {
      const regexProv = new RegExp(`^${province}`)
      const prov = dealers.find(item => item.name == province || regexProv.test(item.name))
      if (prov) {
        setProvince(prov)
        if (city) {
          const regexCity = new RegExp(`^${city}`)
          const c = prov.city.find(item => item.name == city || regexCity.test(item.name))
          if (c) {
            setCity(c)
          } else {
            setCity(undefined)
          }
        } else {
          setCity(undefined)
        }
      }
    }
  }, [dealers])

  useEffect(() => {
    if (pos) {
      const { province, city } = pos
      console.log('find', province, city)
      getProvince(province, city)
    }
    setMapH(listRef.current.offsetHeight)
  }, [getProvince, pos])

  useEffect(() => {
    if (Array.isArray(rawData) && Array.isArray(serviceRawData) && Array.isArray(evRawData)) {
      const processed = processDealerData(rawData, serviceRawData, evRawData)
      setDealers(processed)
      setProvince(processed[0])
      // setDealersData(processed)
    }
  }, [rawData, serviceRawData, evRawData])

  useEffect(() => {
    let hasDistance = false
    const filtered = province?.dealer.filter(item => {
      if (city) {
        if (item.city != city.id) {
          return false
        }
      }
      if (filterTag && !item[filterTag]) {
        return false
      }
      if (pos?.point && window.BMapGL && item.lng && item.lat) {
        const point = new window.BMapGL.Point(item.lng, item.lat)
        item.distance = distanceBetweenPoint(pos.point, point)
        hasDistance = true
      }
      // TODO: search by keyword
      return true
    }) || []
    if (hasDistance) {
      filtered.sort((a, b) => a.distance! - b.distance!)
    }
    filtered.forEach((f, i) => {
      f.index = i
    })
    setFiltered(filtered)
    setResultTotal(filtered.length)
  }, [city, filterTag, pos?.point, province?.dealer, rawData])

  return (
    // <BasePage className={styles.main} title="网点查询" seriesData={series} categoryList={category} navPosition="fixed">
    <main className={styles.main}>
      <BaiduScript onPosition={l => {
        console.log('pos', l)
        setPos(l)
      }} />
      <div className={styles.container}>
        <div className={classNames(styles.map,{
          [styles.show]: showMap
        })} style={{height:`${mapH}px`}}>
          <BaiduMapCom styles={styles} data={filtered} currentData={dealer?.index} exteral onSelected={idx => {
            if (filtered) {
              setDealer(filtered[idx])
              scrollListFn(idx)
            }
          }} />
        </div>
        <div className={styles.content}>
          <div className={styles.form}>
            <h2 className={styles.title}>网点查询</h2>
            <div className={styles.group}>
            <label className={styles.label}>所在省份</label>
            {dealers ? <select onChange={(e) => {
              const index = Number(e.target.value)
              setProvince(dealers[index])
              setCity(null!)
              setDealer(null!)
            }} value={province?.index}>
              <optgroup label="省份">
                {dealers.map((p, idx) => <option key={idx} value={idx}>{p.name}</option>)}
              </optgroup>
            </select> : <select defaultValue="-1"><option disabled value="-1">正在加载</option></select>}
          </div> 
            <div className={styles.group}>
              <label className={styles.label}>所在城市</label>
              <select onChange={e => {
                const index = Number(e.target.value)
                setCity(province?.city[index])
                setDealer(null!)
              }} value={city?.index ?? -1}>
                <option value={-1}>全部</option>
                <optgroup label="城市">
                  {province?.city.map((c, idx) => <option key={idx} value={idx}>{c.name}</option>)}
                </optgroup>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>经销商</label>
              <select onChange={e => {
                const index = Number(e.target.value)
                if (filtered) {
                  setDealer(filtered[index])
                  scrollListFn(index)
                }
              }} value={dealer?.index ?? -1} required>
                <option className={styles.placeholder} value={-1} disabled>请选择经销商</option>
                {Array.isArray(filtered) && filtered.map((item, idx) => <option key={idx} value={idx}>{item.name}{item.distance ? `(${item.distance}km)` : null}</option>)}
              </select>
            </div>
            <div className={styles.footer}>
              <div className={styles['service-check']}>
                <label className={styles.ev}>
                  <input type="checkbox" checked={filterTag === 'ev'} onChange={(e) => {
                    if (e.target.checked) {
                      setFilterTag('ev')
                    } else {
                      setFilterTag(undefined)
                    }
                    // setCity(null!)
                    setDealer(undefined)
                  }} />
                  <span className={classNames(styles.mark, {
                    [styles['mark-checked']]: filterTag === 'ev'
                  })}></span>
                  <span className={styles.label}>在结果中搜索新能源经销商</span>
                </label>
                <label>
                  <input type="checkbox" checked={filterTag === 'service'} onChange={(e) => {
                    if (e.target.checked) {
                      setFilterTag('service')
                    } else {
                      setFilterTag(undefined)
                    }
                    // setCity(null!)
                    setDealer(undefined)
                  }} />
                  <span className={classNames(styles.mark, {
                    [styles['mark-checked']]: filterTag === 'service'
                  })}></span>
                  <span className={styles.label}>在结果中搜索特约维修站</span>
                </label>
              </div>
              <div className={styles.tools}>
                <div className={styles.tab}>
                  <div className={classNames(styles.item,{
                    [styles.active]: !showMap
                  })} onClick={()=>{
                    showMapFn()
                  }}>列表</div>
                  <div className={classNames(styles.item,{
                    [styles.active]: showMap
                  })} onClick={()=>{
                    showMapFn()
                  }}>地图</div>
                </div>
                <div className={styles.result}>
                  共找到<span>{resultTotal}</span>条结果
                </div>
                {typeof pos === 'undefined' && <div className="loading">
                  <SvgIcon icon="spin" />
                  <span>正在加载</span>
                </div>}
              </div>
            </div>
          </div>
          <div className={styles.list} ref={listRef}>
            <div className={styles.wrap}>
              { Array.isArray(filtered) && filtered.length > 0 && filtered.map((item,index) => 
                <div ref={ref => listItem.current[index] = ref} className={classNames(styles.item, {
                  [styles.active]: dealer?.index === index
                })} 
                  key={index}
                  onClick={()=>{
                    if (filtered) {
                      setDealer(filtered[index])
                      scrollListFn(index)
                    }
                  }}
                >
                  <div className={classNames(styles.title, {
                    [styles['title-nomap']]: !item.lat || !item.lng,
                  })}><h3>{item.name}</h3></div>
                  <div className={styles.info}>
                    <p>{item.address}</p>
                    {item.tel && !item.serviceTel && <p>服务热线：{item.tel}</p>}
                    {item.tel && item.serviceTel && <>
                      <p>销售服务热线：{item.tel}</p>
                      <p>售后服务热线：{item.serviceTel}</p>
                    </>}
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.icon}>{item.general && <span>经销商</span>}{item.ev && <span className={styles.ev}>新能源</span>}{item.service && <span>特约维修站</span>}</div>
                    {item.distance ? <div className={styles.distance}>距您{item.distance}km</div> : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DealerComp
