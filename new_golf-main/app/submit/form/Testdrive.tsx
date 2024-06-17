import React, { useEffect, useState } from 'react';
import { processDealerData, distanceBetweenPoint } from '@/utils/dealer';
import { DealerCity, DealerRegion, DealerType } from '@/utils/types/dealer';
import { DealerProvince } from '@/utils/types/dealer';
import BaiduScript, { BaiduLocation } from '@/components/BaiduScript';
import styles from '@/styles/submit.module.scss'
import { useDealerData, useDealerEv } from '@/utils/require';
import { SeriesProperty, isSeriesProperty, SeriesObject } from '@/utils/types/series';

const PATTERN_NAME = '[\\u4e00-\\u9fa5a-zA-Z· ]+'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'
type TestdriveType = {
  /**
   * 重置表单
   */
  reset:boolean,
  /**
   * 来源
   */
  source:string,
  /**
   * 车型显示顺序。
   */
  seriesOrder?: string[]
  /**
 * 指定默认选中的车型。
 */
  defaultSeries?: string
  /**
   * 使用经销商简称。
   */
  shortDealerName?: boolean
  /**
 * 显示所选的经销商地址。
 */
  showAddress?: boolean
  /**
* 选定的经销商。
*/
  selectedDealerCode?: string
  /**
  * 车型数据。（可以为单个车型，也可以是车型的数组/对象）
  */
  series: SeriesProperty | SeriesProperty[] | { [code: string]: SeriesProperty }
  /**
   * 当选择的经销商改变时触发事件。
   */
  onDealerSelectedChange?: (index: number) => void
  /**
 * 当经销商列表改变时触发事件。
 */
  onDealerChange?: (dealerList?: DealerType[]) => void
  /**
   * 返回试驾信息
   */
  setTestdrive?:Function
  /**
   * 返回车型信息
   */
  setTestdriveCar:Function
  /**
   * 团队赛经试驾信息
   */
  setTeamTestdrive?:Function
}
const Testdrive = ({reset, series,source, seriesOrder, defaultSeries, shortDealerName = false, showAddress = false, setTestdriveCar,selectedDealerCode,setTestdrive,setTeamTestdrive, onDealerChange, onDealerSelectedChange }: TestdriveType) => {
  const [province, setProvince] = useState<DealerProvince>()
  const [city, setCity] = useState<DealerCity>()
  const [district, setDistrict] = useState<DealerRegion>()
  const [dealer, setDealer] = useState<DealerType>()
  const [pos, setPos] = useState<BaiduLocation>()
  const [filtered, setFiltered] = useState<DealerType[]>()
  const [seriesList, setSeriesList] = useState<SeriesProperty[]>()
  const [defaultSeriesVal, setDefaultSeriesVal] = useState('')
  const [isXny, setIsXny] = useState<boolean>(false)
  const [data, setData] = useState<DealerProvince[]>()
  const { data: rawData, isError: isDealerError } = useDealerData()
  const { data: evRawData } = useDealerEv(true)
  const [districtName,setDistrictName] = useState<string>();
  // 供表单提交
  const [selectedSeries, setSelectedSeries] = useState<SeriesProperty>(null!)
  const [finished,setFinished] = useState<Record<string,string>>({istestdrive:'1'})
  useEffect(() => {
    if (Array.isArray(rawData) && Array.isArray(evRawData)) {
      const processed = processDealerData(rawData, [], evRawData, true)
      setData(processed)
    }
  }, [rawData, evRawData])

  useEffect(() => {
    if (pos) {
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
        }
      }
    }
  }, [data, pos])

  useEffect(() => {
    if (Array.isArray(data) && data.length && !province && !pos) {
      console.log('prov set to default')
      const prov = data[0]
      setProvince(prov)
      setCity(prov.city[0])
    }
  }, [data, pos, province])

  useEffect(() => {
    let hasDistance = false
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
        seriesList = seriesOrder.map(key => {
          let obj = series.find(item => item.code === key)
          return obj
        }).filter(isSeriesProperty)
      } else {
        seriesList = series
      }
    } else if (isSeriesProperty(series)) {
      setSelectedSeries(series)
      // selectedCarID.current = String(series.carID)
    } else {
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
        // selectedCarID.current = String(ds.carID)
        setDefaultSeriesVal(defaultSeriesVal)
      }
    }
  }, [defaultSeries, seriesList])

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

  useEffect(() => {
    if (selectedSeries) {
      setTestdriveCar(selectedSeries)
      setIsXny(selectedSeries.flags?.xnyDealer ?? false)
    }
  }, [selectedSeries,setTestdriveCar])
  useEffect(() => {
    // const data = {
    //   province:province?.name,
    //   provinceId:province?.id,
    //   city:city?.name ?? '全部',
    //   cityId:city?.id ,
    //   dealerId:dealer?.id ?? 0,
    //   dealerName:dealer?.name ?? '',
    //   dealerCode:dealer?.code ?? '',
    //   dealerAddress:dealer?.address ?? '',
    //   dealerTel:dealer?.tel ?? '',
    //   channelSource:source,
    //   utmSource: "wechat",
    //   utmCampaign: "2023 Buick Junior",
    //   utmMedium: "PC",
    //   utmTerm: "SP-MS1900218_MK-202107_wechat_MK202100001",
    //   utmContent: "SGMMRK2020000003"
    // }
    const data = {
      province:province,
      city:city  ?? {name:'全部',id:0},
      district:district ?? {name:'全部',id:0},
      dealer:dealer,
      channelSource:source,
      utmSource: "wechat",
      utmCampaign: "2023 Buick Junior",
      utmMedium: "PC",
      utmTerm: "SP-MS1900218_MK-202107_wechat_MK202100001",
      utmContent: "SGMMRK2020000003"
    }
    finished.istestdrive === '1' ?  setTestdrive && setTestdrive(data) : setTestdrive && setTestdrive({})
  },[province,city,dealer,district,finished,setTestdrive,source])


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFinished({
      ...finished,
      [e.target.name]:e.target.value
    })
  }
  useEffect(() => {
    if(finished.istestdrive === '0'){
      setTestdriveCar(null)
    }
  },[finished,setTestdriveCar])

  useEffect(() => {
    setFinished({istestdrive:'1'})
    setTestdrive && setTestdrive({})
    
  },[reset,setTestdrive])
  return (
    <>
      <BaiduScript onPosition={l => setPos(l)} />
      <div className={styles.item}>
        <div className={styles['item-label']}>您是否愿意接受别克品牌的营销信息及试乘试驾邀请？</div>
        <div className={styles['item-wrap']}>
          <select name="istestdrive" value={finished?.istestdrive ?? ''} onChange={handleChange}>
            <option value="1">是</option>
            <option value="0">否</option>
          </select>
        </div>
      </div>
      {finished?.istestdrive === '1' && (
        <div className={styles.item}>
          <div className={styles['item-wrap']}>
            <div className={styles['testdrive-row']}>
              <div className={styles['testdrive-col']}>
                <label className={styles['item-label']}>试驾真实姓名</label>
                <input placeholder="请输入您的姓名" pattern={PATTERN_NAME} value={finished?.realName ?? ''}  onChange={handleChange} name="realName" maxLength={20} required />
              </div>
              <div className={styles['testdrive-col']}>
                <label>联系方式</label>
                <input placeholder="请输入您的姓名" type="tel" value={finished?.realmobile ?? ''}  onChange={handleChange}  pattern={PATTERN_MOBILE} name="realmobile" maxLength={11} required />
              </div>
              {seriesList?.length ? (
                <div className={styles['testdrive-col']}>
                  <label className={styles['item-label']}>意向车型</label>
                  <select name="tryCar" defaultValue={defaultSeriesVal} onChange={(e) => {
                    let index = e.target.selectedIndex - 1
                    let selected = seriesList[index]
                    if (selected) {
                      setSelectedSeries(selected)
                      // selectedCarID.current = String(selected.carID)
                    }
                  }} required >
                    <option className={styles.placeholder} value="" disabled>请选择车型</option>
                    {seriesList.map(item => <option key={item.code} value={item.name}>{item.displayName || item.name}</option>)}
                  </select>
                </div>
              ) : null}
            </div>
            <div className={styles['testdrive-row']}>
              <div className={styles['testdrive-col']}>
                <label className={styles['item-label']}>所在省份</label>
                {data ? <select onChange={(e) => {
                  let index = Number(e.target.value)
                  setProvince(data[index])
                  setCity(null!)
                  setDistrict(null!)
                  setDealer(null!)
                }} value={province?.index}>
                  <optgroup label="省份">
                    {data.map((p, idx) => <option key={p.id} value={idx}>{p.name}</option>)}
                  </optgroup>
                </select> : <select defaultValue=""><option disabled value="">数据加载中…</option></select>}
              </div>
              <div className={styles['testdrive-col']}>
                <label className={styles['item-label']}>所在城市</label>
                <select onChange={e => {
                  let index = Number(e.target.value)
                  setCity(province?.city[index])
                  setDistrictName('全部')
                  setDistrict(null!)
                  setDealer(null!)
                }} value={city?.index}>
                  <option value={-1}>全部</option>
                  <optgroup label="城市">
                    {province?.city.map((c, idx) => <option key={c.id} value={idx}>{c.name}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>
            <div className={styles['testdrive-row']}>

              <div className={styles['testdrive-col']}>
                <label className={styles['item-label']}>所在区县</label>
                <select name="district" onChange={e => {
                  let index = Number(e.target.value)
                  setDistrict(city?.district[index])
                  setDistrictName(city?.district[index].name)
                  setDealer(null!)
                }} value={district?.index}>
                  <option value={-1}>全部</option>
                  {city ? (
                    <optgroup label="区县">
                      {city?.district.map((d, idx) => <option key={d.id} value={idx}>{d.name}</option>)}
                    </optgroup>
                  ) : null}
                </select>
              </div>
              {Array.isArray(filtered) && filtered.length > 0 && <div className={styles['testdrive-col']}>
                <label className={styles['item-label']}>经销商</label>
                <select onChange={e => {
                  let index = Number(e.target.value)
                  if (filtered) {
                    setDealer(filtered[index])
                    onDealerSelectedChange?.(index)
                  }
                }} value={dealer?.index ?? ''} required>
                  <option className={styles.placeholder} value="" disabled>请选择经销商</option>
                  {Array.isArray(filtered) && filtered.map((item, idx) => <option key={item.id || item.code} value={idx}>{shortDealerName && item.referred || item.name}{item.distance ? `(${item.distance}KM)` : null}</option>)}
                </select>
                {showAddress && dealer && <span className={styles.address}>{dealer.address}</span>}
              </div>}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Testdrive;