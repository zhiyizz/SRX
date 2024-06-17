import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import type { DealerProvince } from '~types/dealer'
import {  processDealerData } from '@utils/dealer'
import { isSeriesProperty, type SeriesProperty } from '~types/series'
import { useDealerData } from '@utils/request'
import Iframe from './Iframe'
import { combineUrl } from '@utils/helper'
import { trackEvent, trackPv } from '@utils/tracking'
import BaiduScript, { type BaiduLocation } from './BaiduScript'

type TestdriveProperies = {
  /**
   * 组件的 CSS Modules 样式对象。
   */
  styles: { readonly [key: string ]: string }
  /**
   * 经销商数据。
   */
  // data: DealerProvince[]
  /**
   * 车型数据。（可以为单个车型，也可以是车型的数组/对象）
   */
  series?: SeriesProperty | SeriesProperty[] | {[code: string]: SeriesProperty}
  /**
   * 车型显示顺序。
   */
  seriesOrder?: string[]
  /**
   * 指定默认选中的车型。
   */
  defaultSeries?: string
  /**
   * 选定的经销商。
   */
  selectedDealerCode?: string
}


const Testdrive = ({ styles, series, seriesOrder, defaultSeries }: TestdriveProperies) => {
  const [province, setProvince] = useState<DealerProvince>()
  // const [dealer, setDealer] = useState<DealerType>()

  const [pos, setPos] = useState<BaiduLocation>()

  // const [filtered, setFiltered] = useState<DealerType[]>()
  const [seriesList, setSeriesList] = useState<SeriesProperty[]>()
  const [defaultSeriesVal, setDefaultSeriesVal] = useState('')
  const [agree, setAgree] = useState(false)
  const [iframeShow, setIframeShow] = useState(false)

  const [data, setData] = useState<DealerProvince[]>()
  const { data: rawData } = useDealerData()
  const submitting = useRef(false)
  const formEl = useRef<HTMLFormElement>(null)

  // 供表单提交
  const selectedSeries = useRef<SeriesProperty>(null!)
  // const selectedCarID = useRef('')

  useEffect(() => {
    if (Array.isArray(rawData)) {
      const processed = processDealerData(rawData)
      setData(processed)
    }
  }, [rawData])

  useEffect(() => {
    if (pos) {
      const { province, city } = pos
      if (Array.isArray(data)) {
        console.log('find', province, city)
        const regexProv = new RegExp(`^${province}`)
        const prov = data.find(item => item.name == province || regexProv.test(item.name))
        if (prov) {
          setProvince(prov)
        }
      }
    }
  }, [data, pos])

  // useEffect(() => {
  //   let hasDistance = false
  //   const filtered = province?.dealer.filter(item => {
  //     if (pos?.point && window.BMapGL) {
  //       let point = new window.BMapGL.Point(item.lng, item.lat)
  //       item.distance = distanceBetweenPoint(pos.point, point)
  //       hasDistance = true
  //     }
  //     // TODO: search by keyword
  //     return true
  //   }) || []
  //   if (hasDistance) {
  //     filtered.sort((a, b) => a.distance! - b.distance!)
  //   }
  //   filtered.forEach((f, i) => f.index = i)
  //   setFiltered(filtered)
  // }, [pos?.point, province?.dealer])

  useEffect(() => {
    let seriesList: SeriesProperty[] = []
    if (Array.isArray(series)) {
      if (seriesOrder) {
        seriesList = seriesOrder.map(key => {
          const obj = series.find(item => item.code === key)
          return obj
        }).filter(isSeriesProperty)
      } else {
        seriesList = series
      }
    } else if (isSeriesProperty(series)) {
      selectedSeries.current = series
      // selectedCarID.current = String(series.carID)
    } else if (series) {
      if (seriesOrder) {
        seriesList = seriesOrder.map(key => series[key])
      } else {
        seriesList = Object.keys(series).map(k => series[k])
      }
    }
    seriesList = seriesList.filter(item => (item.carID || item.carId) && item.flags?.testdrive !== false)
    setSeriesList(seriesList)
  }, [series, seriesOrder])

  useEffect(() => {
    let defaultSeriesVal = ''
    if (defaultSeries && Array.isArray(seriesList)) {
      const ds = seriesList.find(item => item.name === defaultSeries || item.code === defaultSeries)
      if (ds) {
        defaultSeriesVal = ds.name
        selectedSeries.current = ds
        // selectedCarID.current = String(ds.carID)
        setDefaultSeriesVal(defaultSeriesVal)
      }
    }
  }, [defaultSeries, seriesList])

  return (
    <>
      <form ref={formEl} className={styles.form} onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const jsonData = Object.fromEntries(fd.entries())
        if(province){
          jsonData.province = province.name
        }
        if(!agree) return alert('请阅读并同意《隐私政策》')
        if(submitting.current) return
        submitting.current = true;
        const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/OverSeasStudent/Apply'), {
          method: 'post',
          // mode:'cors',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(jsonData)
        })
        res.then((response) => {
          response.json().then((data)=>{
              if(data.status == 1){
                trackPv('留学生购车-成功浮层')
                formEl.current?.reset()
                alert('提交成功')
              }else{
                alert(data.message)
              }
          })
        },(res)=>{
          console.error(res)
        }).finally(()=>{
          submitting.current = false;
        })
      }}>
        <BaiduScript onPosition={l => setPos(l)} />
        <div className={styles.content}>
          <div className={styles.group}>
            <label className={styles.label}>您的姓名</label>
            <input className={styles.control} placeholder="请输入您的姓名" name="name" required />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>您的联系电话</label>
            <input className={styles.control} type="tel" placeholder="请输入您的手机号" name="mobile" maxLength={11} required />
          </div> 
          {seriesList?.length ? (
            <div className={styles.group}>
              <label className={styles.label}>意向车型</label>
              <select name="vehicleSeries" defaultValue={defaultSeriesVal} onChange={(e) => {
                const index = e.target.selectedIndex - 1
                const selected = seriesList[index]
                if (selected) {
                  selectedSeries.current = selected
                }
              }} required>
                <option className={styles.placeholder} value="" disabled>请选择车型</option>
                {seriesList.map(item => <option key={item.code} value={item.name}>{item.displayName || item.name}</option>)}
              </select>
            </div>
          ) : null}
          <div className={styles.group}>
            <label className={styles.label}>所在地区</label>
            {data ? <select name="province" onChange={(e) => {
              const index = Number(e.target.value)
              setProvince(data[index])
            }} value={province?.index} required >
              <optgroup label="省份">
                {data.map((p, idx) => <option key={p.id} value={idx}>{p.name}</option>)}
              </optgroup>
            </select> : <select defaultValue="-1" required><option disabled value="-1">正在加载</option></select>}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.agreement}>
            <label>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span className={classNames(styles.mark, {
                [styles['mark-checked']]: agree
              })}></span>
              <span className={styles.label}>我已阅读并同意<a onClick={()=>setIframeShow(true)}>《隐私政策》</a></span>
            </label>
          </div>
          <button className="btn" type="submit" onClick={()=>{
            trackEvent('留学生购车-提交预约')
          }}>立即预约</button>
        </div>
      </form>

      <Iframe onClose={()=>setIframeShow(false)} show={iframeShow} url="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html" />
    </>
  )
}

export default Testdrive
