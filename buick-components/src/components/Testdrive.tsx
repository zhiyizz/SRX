import React, { useCallback, useEffect, useRef, useState, CSSProperties, FC } from 'react'

import classNames from 'classnames'
import { combineUrl } from '../utils/helper'
import type { DealerProvince, DealerRegion, DealerCity, DealerType } from '../utils/types/dealer'
import { distanceBetweenPoint, processDealerData } from '../utils/dealer'
// import type { BaiduMap, Point } from '../utils/types/baidu'
import { isSeriesProperty, SeriesProperty } from '../utils/types/series'
import { useDealerData, seriesData, useDealerEv } from '../utils/request'
import Iframe from './Iframe'
import { trackEvent, trackLeads, trackPv } from '../utils/tracking'
import useBaiduScript from './BaiduScript'
import "../styles/Testdrive.scss";

type TestdriveProperty = {
  /**
   * 是否固定在页面底部
   */
  fixed?: boolean
  /**
   * 组件的 CSS Modules 样式对象。
   */
  classNameType?: string
  /**
   * 经销商数据。
   */
  // data: DealerProvince[]
  /**
   * 单个车型数据
   */
  seriesCode?: string
  /**
  * 车型位置
  */
  seriesLaster?: boolean
  /**
  * 皮肤
  */
  theme?: "black" | "light"
  /**
   * 下拉框角标颜色
   */
  selectIconColor?: string
  /**
  /* 按钮颜色
 */
  btnStyle?: CSSProperties
  /**
   * 车型显示顺序。
   */
  seriesOrder?: string[]
  /**
    * 隐藏的车型
    */
  hideSeries?: string[]
  /**
   * 显示表单标签。
   */
  showLabel?: boolean
  /**
   * 隐藏 `性别` 字段。
   */
  hideGender?: boolean
  /**
   * 指定默认选中的车型。
   */
  defaultSeries?: string
  /**
   * 选定的经销商。
   */
  selectedDealerCode?: string[]
  /**
   * 深度试驾姓名
   */
  depthName?:string | boolean
  /**
   * 监测名称。
   */
  tracking?: string,
  /**
 * 自定义五要素
 */
  utm?: {
    utmSource: string,
    utmMedium: string,
    utmCampaign: string,
    utmContent: string,
    utmTerm: string,
  },
  /**
   * 线下活动独立接口
   */
  offline?: string,
  /**
   * 
    新能源经销商匹配
   */
  xny?: boolean,
  /**
   * 是否触发lbs
   */
  lbs?: boolean
  /**
   * 
      试驾按钮自定义名称
   */
  tdname?:string
  /**
   * 当地图组件就绪时触发事件。
   */
  // onMapReady?: (p?: Point) => void
  /**
   * 当选择的经销商改变时触发事件。
   */
  onDealerSelectedChange?: (index: number) => void
  /**
   * 当经销商列表改变时触发事件。
   */
  onDealerChange?: (dealerList?: DealerType[]) => void


  onLeadsSubmitSuccess?: (name?: string, mobild?: string, id?: string) => void
}

const PATTERN_NAME = '[\\u4e00-\\u9fa5a-zA-Z· ]+'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'
let timer;
const Testdrive: FC<TestdriveProperty> = ({ classNameType, offline, depthName, fixed = false, lbs = true,tdname, hideGender = true, hideSeries = [], showLabel = false, theme = "light", seriesLaster = false, btnStyle = theme === 'light' ? { background: "#fff", color: "#000" } : { background: "#000", color: "#fff" }, selectIconColor = theme === "light" ? "#fff" : '#000', seriesOrder, seriesCode, defaultSeries, selectedDealerCode, utm, tracking, xny = false, onDealerChange, onDealerSelectedChange, onLeadsSubmitSuccess }) => {
  // console.log(process.env.PUBLIC_API_PREFIX)
  const [province, setProvince] = useState<DealerProvince>()
  const [city, setCity] = useState<DealerCity>()
  const [district, setDistrict] = useState<DealerRegion>()
  const [dealer, setDealer] = useState<DealerType>()
  const [agree, setAgree] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [iframeShow, setIframeShow] = useState(false)
  const [isSucess, setIsSucess] = useState(false)
  const [filtered, setFiltered] = useState<DealerType[]>()
  const [seriesList, setSeriesList] = useState<SeriesProperty[]>()
  const [defaultSeriesVal, setDefaultSeriesVal] = useState('')
  // const series = useSeriesData();
  const [series, setSeries] = useState<SeriesProperty | SeriesProperty[] | { [code: string]: SeriesProperty }>();
  const [data, setData] = useState<DealerProvince[]>()
  const [ev, setEv] = useState<boolean>(false)
  const { data: rawData, isError: isDealerError } = useDealerData()
  const { data: evRawData } = useDealerEv(true)
  
  // 供表单提交

  const disabledMap = useRef(false);
  const [submitting, setSubmitting] = useState(false)
  const [checking, setChecking] = useState(false)
  const formEle = useRef<HTMLFormElement>(null)
  const [pos, setPos] = useState<any>();
  const posData = lbs ? useBaiduScript({}) : null;
  const [isXny, setIsXny] = useState<boolean>(false)
  const [selectedSeries, setSelectedSeries] = useState<SeriesProperty>(null!)

  const [showPhoneCode,setShowPhoneCode] = useState(false);
  const [code,setCode] = useState(false)
  const [currentTime,setCurrentTime] = useState<Number | null>(60);

  const [errMsg, setErrMsg] = useState<string>()


  useEffect(() => {
    //获取坐标
    posData && setPos(posData)
  }, [posData])



  useEffect(() => {

    if (Array.isArray(rawData) && Array.isArray(evRawData)) {
      const processed = processDealerData(rawData, [], evRawData, true)
      if (Array.isArray(selectedDealerCode)) {
        const selected_raw = rawData.filter(item => selectedDealerCode.includes(item.dealerCode))
        const selected_evRaw = evRawData.filter(item => selectedDealerCode.includes(item.dealerCode))
        const processed = processDealerData(selected_raw, [], selected_evRaw, true)
        if(selectedSeries){
          let filteredArray = processed.filter(function(obj) {
           return obj.dealer.some(function(detail) {
             return  selectedSeries.flags?.xnyDealer ? detail.ev : !detail.ev
           });
         });
         filteredArray.filter((item,index) => item.index = index )
         if(filteredArray.length) {
            setProvince(filteredArray[0])
            setCity(filteredArray[0].city[0])
            setData(filteredArray)
            setDealer(null);
        };
        }

      } else {
        setData(processed)
      }
    }

    //  if (Array.isArray(rawData) && !Array.isArray(evRawData) ) {
    //    processed = processDealerData(rawData)
    //  } else{
    //   processed = processDealerData(rawData, [], evRawData, true)
    // }
    //  setData(processed)
  }, [rawData, evRawData, selectedDealerCode,selectedSeries])

  useEffect(() => {
    const getSeries = async () => {
      const data = await seriesData();
      const code = data?.series.find(item => item.code === seriesCode);
      const remove = data?.series.filter(item => hideSeries?.indexOf(item.code) <= -1);
      if (code) {
        setSeries(code)
        //  code.flags.xnyDealer && setEv(true)
      } else if (hideSeries.length > 0) {
        setSeries(remove)
        //  setEv(true)
      } else {
        setSeries(data?.series)
        //  setEv(true)
      }

    };
    getSeries();
  }, [])

  useEffect(() => {

    if (pos && !disabledMap.current) {
      const { province, city } = pos
      if (Array.isArray(data)) {
        console.log('find', province, city)
        const regexProv = new RegExp(`^${province}`)
        const prov = data.find(item => item.name == province || regexProv.test(item.name))
        if (prov) {
          setProvince(prov)
          const regexCity = new RegExp(`^${city}`)
          const c = prov.city.find(item => item.name == city || regexCity.test(item.name))
          setCity(c!)
          setDealer(null);
        }
      }
    }
  }, [data, pos])

  useEffect(() => {
      if(selectedDealerCode || disabledMap.current) return;
      if (Array.isArray(data) && data.length && !province && !pos) {
        console.log('prov set to default')
          const prov = data[0]
          setProvince(prov)
          setCity(prov.city[0])
        }
  }, [data, pos, province,selectedDealerCode])

  // useEffect(() => { 
  //   if(Array.isArray(selectedDealerCode) && Array.isArray(data)){
  //     if(selectedSeries){
  //          let filteredArray = data.filter(function(obj) {
  //           return obj.dealer.some(function(detail) {
  //             return  selectedSeries.flags?.xnyDealer ? detail.ev : !detail.ev
  //           });
  //         });
  //         // const prov = filteredArray[0]
  //         // console.log(prov)
  //         // setProvince(prov)
  //         // setCity(prov.city[0])
  //         //setData(filteredArray)
  //     }

  //   }
  // },[selectedDealerCode,selectedSeries,data])

  useEffect(() => {
    let hasDistance = false;
    const filtered = province?.dealer.filter(item => {
      if (city) {
        if (item.city != city.id) {
          return false
        }
      }
      if ((isXny && !item.ev) || (!isXny && item.ev)) {
        return false
      }
      if (district) {
        if (item.district != district.id) {
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
  }, [city, district, isXny, pos?.point, province?.dealer])


  useEffect(() => {
    onDealerChange?.(filtered)
    if(disabledMap.current) return;
    // 根据距离自动选择最近经销商
   
    if (Array.isArray(filtered) && filtered.length && filtered[0].distance) {
      setDealer(filtered[0])
      onDealerSelectedChange?.(0)
    }
  }, [filtered, onDealerChange, onDealerSelectedChange])
  useEffect(() => {
    let seriesList: SeriesProperty[] = []
    if (Array.isArray(series)) {
      if (seriesOrder) {
        seriesList = seriesOrder?.map((key: any) => {
          let obj = series.find(item => item.code === key)
          return obj
        }).filter(isSeriesProperty)
      } else {
        if (seriesCode) {
          seriesList = series;
        } else {
          seriesList = series;
          //  console.warn('请添加车型列表参数=>seriesOrder')
        }
      }
    } else if (isSeriesProperty(series)) {
      //  selectedSeries.current = series
      setSelectedSeries(series)
    }
    seriesList = seriesList?.filter(item => item?.carID || item?.carId)
    console.log('td comp', seriesList)
    setSeriesList(seriesList)
  }, [series, seriesOrder])

  useEffect(() => {
    let defaultSeriesVal = ''
    if (defaultSeries && Array.isArray(seriesList)) {

      const ds = seriesList.find(item => item.name === defaultSeries || item.code === defaultSeries)
      if (ds) {
        defaultSeriesVal = ds.name
        setSelectedSeries(ds);
        setDefaultSeriesVal(defaultSeriesVal)
      }
    }
  }, [defaultSeries, seriesList])

  // useEffect(() => {
  //   if (Array.isArray(filtered)) {
  //     const dealer = filtered.find(item => item.code === selectedDealerCode)
  //     if (dealer) {
  //       setDealer(dealer)
  //     }
  //   }
  // }, [filtered, selectedDealerCode])

  useEffect(() => {
    if (selectedSeries) { 
      setIsXny(selectedSeries.flags?.xnyDealer ?? false)
    }
  }, [selectedSeries])


  useEffect(() => {
    if(!showPhoneCode){
      clearInterval(Number(timer))
    };
  },[showPhoneCode])
  
  async function phoneCode(data:string) {
    try {
      const response = await fetch(combineUrl(`/buickapi/officialsite/SgmApi/SecurityCodeSend?receiver=${data}`), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();  
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function isMobileDevice(strict?: boolean) {
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
    const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)
  
    if (strict) {
      return isMobileUA && isTouchDevice
    } else {
      return window.innerWidth < 768
    }
  }


  const getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }

  return (
    <div className={fixed ? 'testdrive-fixed' : ''}>
      <div className={classNames('testdrive-container', [theme, classNameType ? classNameType : false], {

      })}>
        {/* <div className='title'><img src={titlem} alt="" /></div> */}
        {/* <script src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=IB2AMoqKRaNVXUOfnu03Ds2Q8cHa7rco&callback=lbs"></script> */}
        <div className='tdform'>
          <form className="form" ref={formEle} onSubmit={(e) => {
            e.preventDefault()
            if (submitting) return
            let fd: any = new FormData(e.currentTarget)
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
            if (!agree) {
              setAgree(true)
              setIsAgree(true)
              return
            }
            if(dealer){
              const verify = province.dealer.find(item => item.code === dealer.code)
              if(!verify) {
                alert('经销商定位错误,请重新选择');
                setDealer(null)
                return;
              }
            }
  
            jsonData.carId = String(selectedSeries.carID || selectedSeries.carId)
            jsonData.tryCar = selectedSeries.name
            const Dname = typeof depthName === 'string' && depthName ? `（${depthName}）` : typeof depthName === 'boolean' && depthName ? '（深度试驾）' : ''
            jsonData.realName = jsonData.realName + Dname;
            let data = {
              province: province?.name,
              provinceId: province?.id,
              city: city?.name,
              cityId: city?.id,
              dealerId: dealer?.id ?? 0,
              dealerName: dealer?.name ?? '',
              dealerCode: dealer?.code ?? '',
              dealerAddress: dealer?.address ?? '',
              dealerTel: dealer?.tel ?? '',
              channelSource: tracking,
              utmSource: utm?.utmSource ? utm.utmSource : getQueryVariable('utm_source') ? getQueryVariable('utm_source') : '',
              utmMedium: utm?.utmMedium ? utm.utmMedium : getQueryVariable('utm_medium') ? getQueryVariable('utm_medium') : '',
              utmCampaign: utm?.utmCampaign ? utm.utmCampaign : getQueryVariable('utm_campaign') ? getQueryVariable('utm_campaign') : '',
              utmContent: utm?.utmContent ? utm.utmContent : getQueryVariable('utm_content') ? getQueryVariable('utm_content') : '',
              utmTerm: utm?.utmTerm ? utm.utmTerm : getQueryVariable('utm_term') ? getQueryVariable('utm_term') : '',
            }
            let params = Object.assign(jsonData, data)

            if(!isMobileDevice()) {

              if(showPhoneCode && jsonData.code === '' && code ){
                alert('请输入验证码')
                return;
              }
              if(!code){
                setSubmitting(true)
                phoneCode(jsonData.mobile).then(({data}) => {
                  if(data === 'Already Send'){
                    setShowPhoneCode(true);
                    setCode(true);
                    let time = 60;
                    timer = setInterval(() => {
                      time -= 1
                      time >= 0 && setCurrentTime(time)
                    }, 1000)
                    setIsAgree(false)
                  }else if(data === 'mobile valid'){
                    jsonData.code = '';
                    submitForm()
                  }else {
                    setShowPhoneCode(false)
                    setCode(false)
                    setErrMsg(data)
                    setIsAgree(false)
                  }
                }).catch(err => {
                  console.log(err)
                }).finally(() => {
                  setSubmitting(false);
                })
              } 
              if(!code) return;
            }
            submitForm();
            function submitForm(){
              setChecking(true)
              let res = fetch(combineUrl(offline?`/buickapi/officialsite/leads/offlineeventapply/eBuick_200/${offline}`:`/buickapi/officialsite/Leads/Apply`), {
                method: 'post',
                // mode:'cors',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(params)
              })
              res.then((response) => {
                response.json().then((data) => {
                  if (data.status === 1) {
                    setIsSucess(true)
                    formEle.current?.reset()
                    try {
                      const resData = JSON.parse(data.data)
                      onLeadsSubmitSuccess?.(jsonData.realName as string, jsonData.mobile as string, resData.TransmitId)
                      trackLeads(jsonData.realName as string, jsonData.mobile as string, resData.TransmitId)
                      if (tracking) {
                        trackPv(`${tracking}-底部预约试驾-提交-成功浮层`)
                      }
                      setIsAgree(false)
                      setCode(false)
                      setShowPhoneCode(false)
                    } catch (ex) {
                      console.error(ex)
                      const err = ex as any
                      setErrMsg((typeof data.data === 'string' && data.data) || err.message || err)
                    }
                  } else {
                    setCode(false)
                    setShowPhoneCode(false)
                    setErrMsg(data.message)
                  }
                 
                }), err => {
                  console.error(err)
                  setErrMsg(err.message || err)
                }
              }, (res) => {
                console.error(res)
                alert('提交失败，请稍后再试')
              }).finally(() => {
                setSubmitting(false);
                setChecking(false)
              })
            }
            
          }}>

            <div className={classNames("content", {
              "defaultSeries": seriesCode
            })}>
              <div className="group">
                {showLabel && <label className="label">您的姓名</label>}
                <input className="control" placeholder="请输入您的姓名" pattern={PATTERN_NAME} name="realName" maxLength={20} required />
              </div>
              {seriesList?.length && !hideGender ? (
                <div className="group">
                  {['先生', '女士'].map((item, idx) => (
                    <div className="radio" key={idx}>
                      <label>
                        <input type="radio" name="gender" value={item} defaultChecked={!idx} />
                        <span className="mark"></span>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="group">
                {showLabel && <label className="label">您的联系电话</label>}
                <input className="control" type="tel" placeholder="请输入您的手机号" pattern={PATTERN_MOBILE} name="mobile" maxLength={11} required />
              </div>
              {!seriesLaster && seriesList?.length ? (
                <div className="group">
                  {showLabel && <label className="label">意向车型</label>}
                  <select name="tryCar" defaultValue={defaultSeriesVal} onChange={(e) => {
                    let index = e.target.selectedIndex - 1
                    let selected = seriesList[index]
                    if (selected) {
                      // selectedSeries.current = selected
                      setSelectedSeries(selected)
                    }
                  }} required >
                    <option className="placeholder" value="" disabled>请选择车型</option>
                    {seriesList?.map(item => <option key={item.code} value={item.name}>{item.displayName || item.name}</option>)}
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                </div>
              ) : null
              }
                    <div className="group">
                      {showLabel && <label className="label">所在省份</label>}
                      {data ? <select onChange={(e) => {
                        let index = Number(e.target.value)
                        setProvince(data[index])
                        setCity(null!)
                        setDistrict(null!)
                        setDealer(null!)
                        disabledMap.current = true
                      }} value={province?.index}>

                        <optgroup label="省份">
                          {data.map((p, idx) => <option key={p.id} value={idx}>{p.name}</option>)}
                        </optgroup>
                      </select> : <select defaultValue="-1"><option disabled value="-1">正在加载</option></select>}
                      <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                    </div>

                    <div className="group">
                      {showLabel && <label className="label">所在城市</label>}
                      <select onChange={e => {
                        let index = Number(e.target.value)
                        setCity(province?.city[index])
                        setDistrict(null!)
                        setDealer(null!)
                        disabledMap.current = true
                      }} value={city?.index}>
                        <option value={-1}>全部</option>
                        <optgroup label="城市">
                          {province?.city.map((c, idx) => <option key={c.id} value={idx}>{c.name}</option>)}
                        </optgroup>
                      </select>
                      <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                    </div>
                    <div className="group">
                      {showLabel && <label className="label">所在区县</label>}
                      <select onChange={e => {
                        let index = Number(e.target.value)
                        setDistrict(city?.district[index])
                        setDealer(null!)
                        disabledMap.current = true
                      }} value={district?.index}>
                        <option value={-1}>全部</option>
                        {city ? (
                          <optgroup label="区县">
                            {city?.district.map((d, idx) => <option key={d.id} value={idx}>{d.name}</option>)}
                          </optgroup>
                        ) : null}
                      </select>
                      <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                    </div>
                    {filtered && filtered.length > 0 && (
                      <>
                        {Array.isArray(filtered) && filtered.length > 0 &&
                          <div className="group">
                            {showLabel && <label className="label">经销商</label>}
                            <select onChange={e => {
                              let index = Number(e.target.value)
                              disabledMap.current = true
                              if (filtered) {
                                setDealer(filtered[index])
                                onDealerSelectedChange?.(index)
                              }
                            }} value={dealer?.index ?? ''} required>
                              <option className="placeholder" value="" disabled>请选择经销商</option>
                              {Array.isArray(filtered) && filtered.map((item, idx) => <option key={idx} value={idx}>{item.name}{item.distance ? `(${item.distance}KM)` : null}</option>)}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                          </div>

                        }
                      </>

                    )
                    }


              {seriesLaster ?
                seriesList?.length ? (
                  <div className="group">
                    {showLabel && <label className="label">意向车型</label>}
                    <select name="tryCar" defaultValue={defaultSeriesVal} key={defaultSeriesVal} onChange={(e) => {
                      let index = e.target.selectedIndex - 1
                      let selected = seriesList[index]
                      if (selected) {
                        setSelectedSeries(selected)
                        // selectedSeries.current = selected
                      }
                    }} required >

                      <option className="placeholder" value="" disabled>请选择车型</option>
                      {seriesList.map(item => <option key={item.code} value={item.name}>{item.displayName || item.name}</option>)}

                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" className='select-base' fill={selectIconColor} viewBox="0 0 160 160"><polygon points="79.98 42.41 24.99 100.5 25.02 105.04 24.99 105.08 25.02 109.76 24.99 109.8 25.01 112.7 24.99 112.73 25.02 117.59 79.98 61.01 134.94 117.57 135.01 111.28 134.98 111.24 135.01 108.35 134.96 108.29 135.01 103.62 134.96 103.56 135.01 99.07 79.98 42.41" stroke="none" /></svg>
                  </div>
                ) : null
                : null}

            </div>
            <div className="footer">
              <div className="agreement">
                <label>
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                  <span className={classNames("mark", {
                    "mark-checked": agree
                  })}></span>
                  <span className="label">我已阅读并同意<a onClick={() => setIframeShow(true)}>《隐私政策》</a></span>
                </label>
              </div>
              <button className="btn" disabled={submitting || !data} type="submit" style={btnStyle} onClick={() => {
                if (tracking) {
                  trackEvent(`${tracking}-底部预约试驾-提交`)
                }
                
              }}>{submitting ? '正在提交' : (data ?  tdname??'立即预约' : '数据加载中…')} </button>
            </div>

            <div className={classNames('policyfloat', {
              'show': isAgree
            })}>
              <div className="wrap">
                <span className="close" onClick={() => setIsAgree(false)}><i className="icon-close"></i></span>
                <h3>您需要同意隐私政策才能继续</h3>
                <p>我已阅读并同意<a onClick={() => { setIframeShow(true); }}>《隐私政策》</a></p>
                <button className="btn" style={btnStyle} >{tdname??'立即预约'}</button>
              </div>
            </div>

            <div className={classNames('phonecode',{
              'show':showPhoneCode
            })}>
              <div className="wrap">
                <span className="close" onClick={() => {
                setShowPhoneCode(false)
                setCode(false)
                }}><i className="icon-close"></i></span>
                <h3>验证短信已发送</h3>
                <p>请将收到的验证码在下方进行填写，并点击“提交”以完成预约。</p>
                <div className='code'>
                  <input type='text' name="code"   placeholder='请输入短信验证码' />

                  <button className="current" onClick={() => {
                    setCode(false)
                  }} disabled={currentTime?true:false}>{currentTime ? <>{currentTime}</> : '获取验证码'}</button>
                </div>
                <button className="btn" disabled={submitting || checking}>{submitting ? '正在提交' : checking?'正在验证': '提交'}</button>
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
                    <p>服务拥堵中，请您稍后再试。</p>
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
            <Iframe onClose={() => setIframeShow(false)} show={iframeShow} url="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Testdrive