'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import type { DealerProvince, DealerRegion, DealerCity, DealerType } from '../types/dealer'
import { distanceBetweenPoint, processDealerData } from '../utils/dealer'
import { isSeriesProperty, type SeriesProperty } from '~types/series'
import { useDealerData, useDealerEv } from '@utils/request'
import Iframe from './Iframe'
import { combineUrl } from '@utils/helper'
import { trackEvent, trackLeads, trackPv } from '@utils/tracking'
import BaiduScript, { type BaiduLocation } from './BaiduScript'
import UtmParams, { type UtmObject } from './UtmParams'
import SvgIcon from './icons'
import { useSelector } from 'lib/redux'

type TestdriveProperty = {
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
   * 显示表单标签。
   */
  showLabel?: boolean
  /**
   * 隐藏 `性别` 字段。
   */
  hideGender?: boolean
  /**
   * 显示所选的经销商地址。
   */
  showAddress?: boolean
  /**
   * 使用经销商简称。
   */
  shortDealerName?: boolean
  /**
   * 指定默认选中的车型。
   */
  defaultSeries?: string
  /**
   * 选定的经销商。
   */
  selectedDealerCode?: string
  /**
   * 选定的经销商（索引）。
   */
  selectedDealerIndex?: number
  /**
   * 监测名称。
   */
  tracking?: string
  /**
   * 当地图组件就绪时触发事件。
   */
  onMapReady?: (p?: BMapGL.Point) => void
  /**
   * 当选择的经销商改变时触发事件。
   */
  onDealerSelectedChange?: (index: number) => void
  /**
   * 当经销商列表改变时触发事件。
   */
  onDealerChange?: (dealerList?: DealerType[]) => void
}

const PATTERN_NAME = '[\\u4e00-\\u9fa5a-zA-Z· ]+'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'

const Testdrive = ({ styles, series, seriesOrder, hideGender = false, showLabel = false, showAddress = false, shortDealerName = false, defaultSeries, selectedDealerCode, selectedDealerIndex, tracking, onMapReady, onDealerChange, onDealerSelectedChange }: TestdriveProperty) => {
  const [province, setProvince] = useState<DealerProvince>()
  const [city, setCity] = useState<DealerCity>()
  const [district, setDistrict] = useState<DealerRegion>()
  const [dealer, setDealer] = useState<DealerType>()
  const [agree, setAgree] = useState(false)
  const [showAgree, setShowAgree] = useState(false)
  const [iframeShow, setIframeShow] = useState(false)
  const [isSucess, setIsSucess] = useState(false)
  const [errMsg, setErrMsg] = useState<string>()

  const [countdown, setCountdown] = useState<number>()

  const isMobile = useSelector(state => state.global.isMobile)

  const [utmParams, setUtmParams] = useState<UtmObject>({})

  const [pos, setPos] = useState<BaiduLocation>()

  const [filtered, setFiltered] = useState<DealerType[]>()
  const [seriesList, setSeriesList] = useState<SeriesProperty[]>()
  const [defaultSeriesVal, setDefaultSeriesVal] = useState('')

  const isEv = useRef(false)

  const [data, setData] = useState<DealerProvince[]>()

  const { data: rawData, isError: isDealerError } = useDealerData()
  const { data: evRawData } = useDealerEv(true)

  const [submitting, setSubmitting] = useState(false)
  const [codeSending, setCodeSending] = useState(false)
  // 供表单提交
  const [selectedSeries, setSelectedSeries] = useState<SeriesProperty>()
  // const submitting = useRef(false)
  const formEle = useRef<HTMLFormElement>(null)
  // const selectedCarID = useRef('')
  const userInteractive = useRef(false)

  useEffect(() => {
    let t: NodeJS.Timeout
    if (countdown && countdown > 0) {
      t = setTimeout(setCountdown, 1000, countdown - 1)
    }
    return () => {
      clearTimeout(t)
    }
  }, [countdown])

  useEffect(() => {
    if (Array.isArray(rawData) && Array.isArray(evRawData)) {
      const processed = processDealerData(rawData, [], evRawData, true)
      setData(processed)
    }
  }, [rawData, evRawData])

  const findDealer = useCallback((dealers = province?.dealer, cityId = city?.id, districtId = district?.id) => {
    let hasDistance = false
    console.log('findDealer', cityId, districtId)
    const filtered = dealers?.filter(item => {
      if (cityId) {
        if (item.city != cityId) {
          return false
        }
      }
      if (isEv.current !== Boolean(item.ev)) {
        return false
      }
      if (districtId) {
        if (item.district != districtId) {
          return false
        }
      }
      if (pos?.point && window.BMapGL?.Point) {
        const { Point } = window.BMapGL
        const point = new Point(item.lng, item.lat)
        item.distance = distanceBetweenPoint(pos.point, point)
        hasDistance = true
      }
      // TODO: search by keyword
      return true
    }) || []

    if (hasDistance) {
      filtered.sort((a, b) => a.distance! - b.distance!)
    }
    filtered.forEach((f, i) => f.index = i)
    setFiltered(filtered)
    setDealer(undefined)
    onDealerChange?.(filtered)
  }, [city?.id, district?.id, onDealerChange, pos?.point, province?.dealer])

  useEffect(() => {
    if (pos && !userInteractive.current) {
      const { province, city } = pos
      if (Array.isArray(data)) {
        console.log('find', province, city)
        const regexProv = new RegExp(`^${province}`)
        const prov = data.find(item => item.name == province || regexProv.test(item.name))
        if (prov) {
          setProvince(prov)
          const regexCity = new RegExp(`^${city}`)
          const c = prov.city.find(item => item.name == city || regexCity.test(item.name))
          setCity(c)
          findDealer(prov.dealer, c?.id)
        }
      }
    } else if (!province) {
      if (Array.isArray(data) && data.length) {
        console.log('prov set to default')
        const prov = data[0]
        setProvince(prov)
        // setCity(prov.city[0])
        findDealer(prov.dealer)
      }
    }
  }, [data, findDealer, pos, province])

  useEffect(() => {
    if (userInteractive.current) {
      return
    }

    // 根据距离自动选择最近经销商
    if (Array.isArray(filtered) && filtered.length && filtered[0].distance) {
      setDealer(filtered[0])
      onDealerSelectedChange?.(0)
    }
  }, [filtered, onDealerSelectedChange])

  useEffect(() => {
    if (typeof selectedDealerIndex === 'number' && filtered) {
      setDealer(filtered[selectedDealerIndex])
    }
  }, [filtered, selectedDealerIndex])

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
      setSelectedSeries(series)
      isEv.current = series.flags?.xnyDealer ?? false
      // selectedCarID.current = String(series.carID)
    } else if (series) {
      if (seriesOrder) {
        seriesList = seriesOrder.map(key => series[key])
      } else {
        seriesList = Object.keys(series).map(k => series[k])
      }
    }
    seriesList = seriesList.filter(item => (item.carID || item.carId) && item.flags?.testdrive !== false)
    console.log('td comp', seriesList)
    setSeriesList(seriesList)
  }, [series, seriesOrder])

  useEffect(() => {
    let defaultSeriesVal = ''
    if (defaultSeries && Array.isArray(seriesList)) {
      const ds = seriesList.find(item => item.name === defaultSeries || item.code === defaultSeries)
      if (ds) {
        defaultSeriesVal = ds.name
        setSelectedSeries(ds)
        isEv.current = ds.flags?.xnyDealer ?? false
        findDealer()
        // selectedCarID.current = String(ds.carID)
        setDefaultSeriesVal(defaultSeriesVal)
      }
    }
  }, [defaultSeries, findDealer, seriesList])

  useEffect(() => {
    if (Array.isArray(filtered)) {
      const dealer = filtered.find(item => item.code === selectedDealerCode)
      if (dealer) {
        setDealer(dealer)
      }
    }
  }, [filtered, selectedDealerCode])

  useEffect(() => {
    if (isDealerError) {
      console.error(isDealerError)
    }
  }, [isDealerError])

  const sendSmsCode = useCallback(async () => {
    if (!formEle.current) {
      return
    }
    if (codeSending) {
      return
    }

    const fd = new FormData(formEle.current)
    const mobile = fd.get('mobile')
    if (mobile) {
      setCodeSending(true)
      try {
        const res = await fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, `/SgmApi/SecurityCodeSend?receiver=${mobile}`), {
          method: 'post',
        }).then(res => res.json())
        if (res.data === 'Already Send' || res.data === 'SMS send frequency limited') {
          setCountdown(60)
        } else if (res.data === 'mobile valid') {
          formEle.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        } else {
          alert('验证短信发送失败，请稍后再试')
        }
      } catch (ex) {
        console.error(ex)
        alert('验证短信发送失败，请稍后再试')
      }
      setCodeSending(false)
    } else {
      formEle.current.reportValidity()
    }
  }, [codeSending])

  const handleClick = useCallback(() => {
    tracking && trackEvent(`${tracking}-提交预约`)
    if (isMobile) {
      formEle.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      return
    }
    if (formEle.current) {
      sendSmsCode()
    }
  }, [isMobile, sendSmsCode, tracking])

  return (
    <>
    <form className={styles.form} ref={formEle} onSubmit={(e) => {
      e.preventDefault()

      if (submitting) return

      setCountdown(undefined)

      const fd = new FormData(e.currentTarget)
      const jsonData = Object.fromEntries(fd.entries())
      if (typeof jsonData.realName === 'string') {
        if (!RegExp(PATTERN_NAME).test(jsonData.realName)) {
          alert('姓名格式不匹配')
          return
        }
      } else {
        alert('请输入您的姓名')
        return
      }
      if (typeof jsonData.mobile === 'string') {
        if (!RegExp(PATTERN_MOBILE).test(jsonData.mobile)) {
          alert('手机号格式不匹配')
          return
        }
      } else {
        alert('请输入您的手机号')
        return
      }
      if(!agree){
        setAgree(true)
        setShowAgree(true)
        return
      }
      if (!selectedSeries) {
        alert('未选择车型')
        return
      }
      if (!dealer) {
        alert('未选择经销商')
        return
      }
      jsonData.carId = String(selectedSeries.carID || selectedSeries.carId)
      jsonData.tryCar = selectedSeries.name
      const data = {
        ...utmParams,
        province: province?.name,
        provinceId: province?.id,
        city: city?.name,
        cityId: city?.id,
        dealerId: dealer.id ?? 0,
        dealerName: dealer.name ?? '',
        dealerCode: dealer.code ?? '',
        dealerAddress: dealer.address ?? '',
        dealerTel: dealer.tel ?? '',
        channelSource: "官网",
        // memo: `${((window.initialMobile && 'mob') ?? 'unknown') || 'pc'}|${window.innerWidth}`,
      }
      const params = Object.assign(jsonData, data)
      setSubmitting(true)
      const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/Apply'), {
        method: 'post',
        // mode:'cors',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(params)
      })
      setShowAgree(false)
      res.then((response) => {
        response.json().then((data) => {
          if (data.status == 1) {
            try {
              const resData = JSON.parse(data.data)
              if (resData.TransmitId) {
                formEle.current?.reset()
                setAgree(false)
                trackLeads(jsonData.realName as string, jsonData.mobile as string, resData.TransmitId)
                tracking && trackPv(`${tracking}-成功浮层`)
                findDealer()
              }
              setIsSucess(true)
            } catch (ex) {
              console.error(ex)
              const err = ex as Error
              setErrMsg((typeof data.data === 'string' && data.data) || err.message || err)
            }
          } else {
            setErrMsg(data.data || data.message)
          }
        }, err => {
          console.error(err)
          setErrMsg(err.message || err)
        })
      }, (res) => {
        console.error(res)
        setErrMsg(res.message || res)
      }).finally(() => {
        setSubmitting(false)
      })
    }}>
      <BaiduScript onPosition={l => {
        setPos(l)
        onMapReady?.(l.point)
      }} />
      <Suspense>
        <UtmParams onChange={setUtmParams} />
      </Suspense>
      <div className={styles.content}>
        <div className={styles.group}>
          {showLabel && <label className={styles.label}>您的姓名</label>}
          <input className={styles.control} placeholder="请输入您的姓名" pattern={PATTERN_NAME} name="realName" maxLength={20} required />
        </div>
        {seriesList?.length && !hideGender ? (
          <div className={styles.group}>
            {['先生', '女士'].map((item, idx) => (
              <div className={styles.radio} key={idx}>
                <label>
                  <input type="radio" name="gender" value={item} defaultChecked={!idx} />
                  <span className={styles.mark}></span>
                  {item}
                </label>
              </div>
            ))}
          </div>
        ) : null}
        <div className={styles.group}>
          {showLabel && <label className={styles.label}>您的联系电话</label>}
          <input className={styles.control} type="tel" placeholder="请输入您的手机号" pattern={PATTERN_MOBILE} name="mobile" maxLength={11} required />
        </div> 
        {seriesList?.length ? (
          <div className={styles.group}>
            {showLabel && <label className={styles.label}>意向车型</label>}
            <select name="tryCar" defaultValue={defaultSeriesVal} onChange={(e) => {
              const index = e.target.selectedIndex - 1
              const selected = seriesList[index]
              if (selected) {
                setSelectedSeries(selected)
                isEv.current = selected.flags?.xnyDealer ?? false
                findDealer()
                // selectedCarID.current = String(selected.carID)
              }
            }} required >
              <option className={styles.placeholder} value="" disabled>请选择车型</option>
              {seriesList.map(item => <option key={item.code} value={item.name}>{item.displayName || item.name}</option>)}
            </select>
          </div>
        ) : null}

        <div className={styles.group}>
          {showLabel && <label className={styles.label}>所在省份</label>}
          {data ? <select onChange={(e) => {
            userInteractive.current = true
            const index = Number(e.target.value)
            setProvince(data[index])
            setCity(undefined)
            setDistrict(undefined)
            setDealer(undefined)
            findDealer(data[index].dealer, 0, 0)
          }} value={province?.index}>
            <optgroup label="省份">
              {data.map((p, idx) => <option key={p.id} value={idx}>{p.name}</option>)}
            </optgroup>
          </select> : <select defaultValue=""><option disabled value="">数据加载中…</option></select>}
          {!pos && !userInteractive.current && <div className="loading"><SvgIcon icon="spin" />{' '}自动定位中</div>}
        </div>
        <div className={styles.group}>
          {showLabel && <label className={styles.label}>所在城市</label>}
          <select onChange={e => {
            userInteractive.current = true
            const index = Number(e.target.value)
            setCity(province?.city[index])
            setDistrict(undefined)
            setDealer(undefined)
            findDealer(undefined, province?.city[index]?.id || 0, 0)
          }} value={city?.index}>
            <option value={-1}>全部</option>
            <optgroup label="城市">
              {province?.city.map((c, idx) => <option key={c.id} value={idx}>{c.name}</option>)}
            </optgroup>
          </select>
        </div> 
        <div className={styles.group}>
          {showLabel && <label className={styles.label}>所在区县</label>}
          <select onChange={e => {
            userInteractive.current = true
            const index = Number(e.target.value)
            setDistrict(city?.district[index])
            setDealer(undefined)
            findDealer(undefined, undefined, city?.district[index]?.id || 0)
          }} value={district?.index}>
            <option value={-1}>全部</option>
            {city ? (
              <optgroup label="区县">
                {city?.district.map((d, idx) => <option key={d.id} value={idx}>{d.name}</option>)}
              </optgroup>
            ) : null}
          </select>
        </div>
        { Array.isArray(filtered) && filtered.length > 0 && <div className={styles.group}>
          {showLabel && <label className={styles.label}>经销商</label>}
          <select onChange={e => {
            userInteractive.current = true
            const index = Number(e.target.value)
            if (filtered) {
              setDealer(filtered[index])
              onDealerSelectedChange?.(index)
            }
          }} value={dealer?.index ?? ''} required>
            <option className={styles.placeholder} value="" disabled>请选择经销商</option>
            {Array.isArray(filtered) && filtered.map((item, idx) => <option key={item.id || item.code} value={idx}>{shortDealerName && item.referred || item.name}{item.distance ? `(${item.distance}km)` : null}</option>)}
          </select>
          {showAddress && dealer && <span className={styles.address}>{dealer.address}</span>}
        </div>}
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
        <button className="btn" disabled={submitting || codeSending || !data} type="button" onClick={handleClick}>{submitting ? '正在提交' : (data ? '立即预约' : '数据加载中…')}</button>
      </div>

      <div className={classNames('testdrive-verify', {
        'show': typeof countdown === 'number',
      })}>
        <div className="wrap">
          <span className="close" onClick={() => {
            setCountdown(undefined)
          }}><i className="icon-close"></i></span>
          <h3>验证短信已发送</h3>
          <p>请输入短信中的验证码，并点击“提交”以完成预约。</p>
          <div className="form-group">
            <input type="tel" name="code" maxLength={6} autoFocus={typeof countdown === 'number'} placeholder="请输入验证码" required={typeof countdown === 'number'} />
            <button disabled={countdown ? countdown > 0 : false} type="button" onClick={sendSmsCode}>{countdown && countdown > 0 ? `${countdown}秒后可重新发送` : '重新发送验证码'}</button>
          </div>
          <button type="submit" className="btn" onClick={() => {
            tracking && trackEvent(`${tracking}-提交验证`)
          }}>提交</button>
        </div>
      </div>

      <div className={classNames('policyfloat',{
        'show':showAgree
      })}>
        <div className="wrap">
          <span className="close" onClick={() => {
            setAgree(false)
            setShowAgree(false)
          }}><i className="icon-close"></i></span>
          <h3>您需要同意隐私政策才能继续</h3>
          <p>我已阅读并同意<a onClick={()=>setIframeShow(true)}>《隐私政策》</a></p>
          <button className="btn">立即预约</button>
        </div>
      </div>

      <div className={classNames('testdrive-result', {
        'show': isSucess || errMsg,
        'has-error': Boolean(errMsg),
      })}>
        <div className="wrap">
          <span className="close" onClick={() => {
            setIsSucess(false)
            setErrMsg(undefined)
          }}><i className="icon-close"></i></span>
          <h3>{isSucess ? '预约成功' : '预约失败'}</h3>
          {errMsg ? (
            <>
              {errMsg === '验证失败' ? <p>验证码错误，请检查后再试</p> : <p>服务拥堵中，请您稍后再试。</p>}
              <p className="code">{errMsg}</p>
            </>
          ) : (
            <>
              <p>我们已收到您的预约信息，将会在48小时内与您联系。</p>
              <p>感谢您对别克的关注！</p>
            </>
          )}
        </div>
      </div>
      
    </form>
    <Iframe onClose={()=>setIframeShow(false)} show={iframeShow} url="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html" />
    </>
  )
}

export default Testdrive
