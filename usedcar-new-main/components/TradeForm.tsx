import React, { useState, useEffect, FC, useCallback,useRef, SetStateAction, Dispatch } from "react";
import { SeriesObject, SeriesProperty } from "@utils/types/series";
import { useDealerData, useEvaluationApply, useEvaluationYear,evalApplyResultType,useDealerEv } from "@utils/request";
import { BrandList, FormDataType,Replace,apiSeriesSortType,EvalType} from "@utils/types/trade";
import type { DealerProvince, DealerRegion, DealerCity, DealerType } from '../utils/types/dealer'
import { processDealerData, distanceBetweenPoint } from "@utils/dealer";
import { useApiSeries,useSeriesList,useSeriesModel} from "@utils/request";
import { combineUrl,divideByElement,extractHtmlTag,sortEnList } from "@utils/helper";
import Iframe from "./Iframe";
import styles from "@styles/components/tradeform.module.scss";

import BaiduScript, { BaiduLocation } from './BaiduScript'
import classNames from "classnames";
import { trackEvent } from "@utils/tracking";
type FormProperties = FormDataType & {
  series: SeriesObject[],
  loan:any
};

type EvalModelType =  {
  Displacement: string,
  ID: string,
  Name?: string,
  Price: string,
  TransmissionType: string,
  VersionYear: string,
  ProductionYear: string,
  VersionDate: string,
  is_new_energy:string
}

type ModelType = {
  name:string | undefined,
  id:string | undefined,
}
const PATTERN_NAME = '[\\u4e00-\\u9fa5a-zA-Z· ]+';
const PATTERN_MOBILE = '1[3-57-9]\\d{9}';
const PATTERN_NUMBER = '\d*';
let timer:NodeJS.Timer | null = null;

const TradeForm: FC<FormProperties> = ({routerSource, series, brandSeries, brandModel,selectedDealerCode,loan, onMapReady, onBackBrand, onBackModel, onDealerChange, onDealerSelectedChange }) => {
  const { data: rawData, isError: isDealerError } = useDealerData();
  const { data: evRawData } = useDealerEv(true)
  const [data, setData] = useState<DealerProvince[]>();
  const [province, setProvince] = useState<DealerProvince>()
  const [city, setCity] = useState<DealerCity>()
  const [district, setDistrict] = useState<DealerRegion>()
  const [dealer, setDealer] = useState<DealerType>()
  const [filtered, setFiltered] = useState<DealerType[]>()
  const [agree, setAgree] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [iframeShow, setIframeShow] = useState(false);
  const [submitting, setSubmitting] = useState(false)
  const formEle = useRef<HTMLFormElement>(null)
  const [selectedSeries,setSelectedSeries] = useState<SeriesProperty | null>()
  const [showAgree, setShowAgree] = useState(false)
  const [owner_car_brand,setOwner_car_brand] = useState<string>();
  const [owner_car_series,setOwner_car_series] = useState<string>();
  const [owner_car_model,setOwner_car_model] = useState<string>();
  const [owner_date,setOwner_date] = useState<string>();
  const [license_date,SerLicense_date] = useState<string>();
  const [driven_distance,setDriven_distance] = useState<string>();  
  const [evalShow,setEvalShow] = useState<boolean>(false);

  const [pos, setPos] = useState<BaiduLocation>()
  const [isXny, setIsXny] = useState<boolean>(false)
  
  const [evalResultArr,setEvalResultArr] = useState([]);
  const [evalSubmit,setEvalSubmit] = useState(false);
  /*品牌 车型 车系 */
  const {replaceSeries, evaluationSeries } = useApiSeries(routerSource);
  const [seriesModel,setSeriesModel] = useState<{ id: string | undefined; name: string; }[] | { id: string; name: string | undefined; }[]>()
  const [seriesData,setSeriesData] = useState<apiSeriesSortType[]>(null!);
  /*置换接口*/

  const {replace:seriesList,evaluation:evaluationSeriesList} =  useSeriesList({routerSource,brand:owner_car_brand!});
  const {replace:replaceModel,evaluation:evaluationModel} =  useSeriesModel({routerSource, brand:owner_car_brand!,series:owner_car_series && owner_car_series !== '-1' ? owner_car_series:'',year: owner_date && owner_date !== '-1' ? owner_date : ''});
  const {data:evaluationYear} = useEvaluationYear({routerSource,series_id:owner_car_series && owner_car_series !== '-1' ? owner_car_series:''});
  
  /*评估结果*/
  const [evalResultData,setEvalAResultData] = useState<evalApplyResultType[]>(null!);
  const {bad,ordinary,good} = useEvaluationApply({submit:evalShow,model_id:owner_car_model!,mile:driven_distance!,city:(city?.name! || province?.name!),licensingdate:owner_date && owner_date !== '-1' ? owner_date : ''})
  const [evalReset,setEvalReset] = useState<any>();


  const [showPhoneCode,setShowPhoneCode] = useState(false);
  const [code,setCode] = useState(false)
  const [currentTime,setCurrentTime] = useState<Number | null>(60);
  const [isSucess, setIsSucess] = useState(false)
  const [checking, setChecking] = useState(false)
  const [errMsg, setErrMsg] = useState<string>()


  useEffect(() => {
    let _series;
    if (replaceSeries) {
      _series = replaceSeries?.brands.map(item => {
        return {
          name: item.brandname!,
          en: item.brandpy!
        }
      })
    }
    if (evaluationSeries) {
      _series = evaluationSeries.map(item => {
        return {
          name: item.Name,
          en: item.Initial,
          id: item.ID
        }
      })
    }
    _series = _series && sortEnList(_series);
    _series && setSeriesData(_series)
  },[replaceSeries,evaluationSeries])
  useEffect(() => {
    //品牌筛选
    let model;
    if(replaceModel){
       model = replaceModel.model.map(item=>{
        return {
          id:item.redbookCode,
          name:item.model
        }
      })
    }
    if(evaluationModel){
      model = evaluationModel.map(item=>{
       return {
        id:item.ID,
        name:item.Name
       }
     })
   }
  model && setSeriesModel(model)
  },[replaceModel,evaluationModel])
  useEffect(() => {
    if (Array.isArray(rawData) && Array.isArray(evRawData)) {
      const processed = processDealerData(rawData, [], evRawData, true)
      setData(processed)
    }
  }, [rawData, evRawData])
  
  useEffect(() => {
    if(bad && ordinary && good){
      setEvalAResultData([bad,ordinary,good])
    }
  },[bad,ordinary,good])

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

  useEffect(()=>{
    if(Array.isArray(data) && data.length && !province && !pos){
      console.log('prov set to default')
      const prov = data[0]
      setProvince(prov)
      setCity(prov.city[0])
    }
  },[data, pos, province])

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
    if (Array.isArray(filtered)) {
      const dealer = filtered.find(item => item.code === selectedDealerCode)
      if (dealer) {
        setDealer(dealer)
      }
    }
  }, [filtered, selectedDealerCode])

  useEffect(() => {
    setSelectedSeries(loan);
  },[loan])

  useEffect(() => {
     if(!evalShow) {
      setOwner_car_series('-1');
      setOwner_date('-1')
      setOwner_car_model('-1'); 
      setAgree(false)
      setShowAgree(false)
    }
  },[evalShow])

  useEffect(()=>{
    if (selectedSeries) {
      setIsXny(selectedSeries.flags?.xnyDealer ?? false)
    }
  }, [selectedSeries])

  useEffect(() => {
    if(!showPhoneCode){
      clearInterval(Number(timer))
    };
  },[showPhoneCode])

  function isMobileDevice(strict?: boolean) {
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
    const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)
  
    if (strict) {
      return isMobileUA && isTouchDevice
    } else {
      return window.innerWidth < 768
    }
  }
  async function phoneCode(data:string) {
    try {
      const response = await fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, `/SgmApi/SecurityCodeSend?receiver=${data}`), {
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

  async function phoneCodeCheck(phone: string,code: string){
    try {
      const response = await fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, `/SgmApi/SecurityCodeVerify?receiver=${phone}&code=${code}`), {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver:phone,
          code:code
        }),
      });
      const result = await response.json();  
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (

    <div className={styles.tradeform}>
      
      <form className={styles[routerSource]} ref={formEle}  onSubmit={(e) => {
        e.preventDefault();
        if (submitting) return;
      
        let fd = new FormData(e.currentTarget);
        const jsonData = Object.fromEntries(fd.entries());
        if(routerSource==='replace' ){
          jsonData.carid =  String(selectedSeries?.carID || selectedSeries?.carId)
        }
       
  
        if(owner_car_series === '-1'){
          alert('请选择现有车系');
          return;
        }else if(routerSource === 'evaluation' && owner_date === '-1'){
          alert('请选择购买年份');
          return;
        }else if(owner_car_model === '-1'){
          alert('请选择现有车型');
          return;
        }
      
        if(!agree){
          setAgree(true)
          setShowAgree(true)
          return
        }
        let replaceData = {
           info_type:routerSource,
          //  owner_car_brand:owner_car_brand,
          //  owner_car_series:owner_car_series,
          //  owner_car_model:owner_car_model,
          //  license_date:license_date,
          //  driven_distance:driven_distance,
           province: province?.name,
           province_id: province?.id,
           city: city?.name,
           city_id: city?.id,
           region:dealer?.districtName,
           dealerName:dealer?.name ?? '',
           dealer_id:  dealer?.id ?? 0,
           dealer:  dealer?.name ?? '',
           dealerCode: dealer?.code ?? '',
           dealerAddress: dealer?.address ?? '',
           dealerTel: dealer?.tel ?? '',
        }
        let params:any = Object.assign(jsonData,replaceData)

        if(!isMobileDevice()) {
          if(showPhoneCode && jsonData.code === '' && code ){
            alert('请输入验证码')
            return;
          }
          if(!code){
            setSubmitting(true);
            phoneCode(String(jsonData.mobile)).then(({data}) => {
              if(data === 'Already Send'){
                setShowPhoneCode(true);
                let time = 60;
                timer = setInterval(() => {
                  time -= 1
                  time >= 0 && setCurrentTime(time)
                }, 1000)
                setCode(true)
                setShowAgree(false)
              }else if(data === 'mobile valid'){
                submitForm()
              }else {
                setShowPhoneCode(false)
                setCode(false)
                setErrMsg(data)
                setShowAgree(false)
              }
            }).catch(err => {
              console.log(err)
            }).finally(() => {
              setSubmitting(false);
            })
          } 
          let check = false;
          if(code){
            setChecking(true)
            phoneCodeCheck(String(jsonData.mobile),String(jsonData.code)).then(({data}) => {
              if(data === 'success'){
                //验证成功
                submitForm()
              }else{
                setErrMsg(data);
                setCode(false);
                setShowPhoneCode(false)
              }
            }).catch(err => {
              console.log(err);
            }).finally(() => {
              setChecking(false)
            });
          }
          if(!code || check) return;
        }
        submitForm();
        function submitForm() {
          setSubmitting(true)
          delete params.code;
          if (routerSource === 'evaluation') {
            setEvalShow(true);
            setSubmitting(false);
            formEle.current?.reset();
            trackEvent('评估成功')
          } else {
            const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/SecApply'), {
              method: 'post',
              // mode:'cors',
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(JSON.parse(JSON.stringify(params))).toString()
            })
            setShowAgree(false)
            res.then((response) => {
              response.json().then((data) => {
                if (data.result == 'success') {
                  try {
                    setCode(false)
                    setShowPhoneCode(false)
                    setIsSucess(true)
                    formEle.current?.reset();
                    setOwner_car_series('-1');
                    setOwner_car_model('-1');
                    setOwner_date('-1')
                    setSelectedSeries(null)
                    setAgree(false)
                    let track;
                    switch(routerSource){
                      case 'replace':
                        track = '置换';
                        break;
                      case 'sell':
                        track = '卖车';
                        break;
                    }
                    trackEvent(track+'预约成功')
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
              }, err => {
                console.error(err)
                setErrMsg(err.message || err)
              })
            }, (res) => {
              console.error(res)
              setErrMsg(res.message || res)
            }).finally(() => {
              setSubmitting(false);
  
            })


          }

        }

    
      }}>
        <BaiduScript onPosition={l => setPos(l)} />
        {routerSource === 'replace' ? (
        <div className="trade_sub_title">
          <div className="trade_sub_title_en">STEP</div>
          <h6>
            <span>02</span>
            <b>置换信息</b>
          </h6>
        </div>
        ):null}
        <div className={classNames(styles.formRow,styles.row1)}>
          <div className={styles.formItem}>
            <input type="text" name="name" pattern={PATTERN_NAME} placeholder="姓名" required />
          </div>
          <div className={styles.formItem}>
            <input type="tel" maxLength={11} name="mobile" placeholder="电话" pattern={PATTERN_MOBILE} required />
          </div>
          {routerSource !== 'sell' ? (
            <div className={styles.formItem}>

              <select name="intent_car_series" value={selectedSeries ? selectedSeries.displayName || selectedSeries.name : ''} onChange={(e) => {
                let index = e.target.selectedIndex - 1
                let selected = series[index]
                if (selected) {
                  setSelectedSeries(selected)
                  // selectedCarID.current = String(selected.carID)
                }
              }} required>
                <option value="" disabled>意向车型</option>
                {series?.map(item => item.flags?.testdrive && <option key={item.code} value={item.displayName || item.name}>{item.name}</option>)}
              </select>
            </div>
          ) : null}
        </div>
        <div className={classNames(styles.formRow,styles.row2)}>
          <div className={styles.formItem}>
            <select name="owner_car_brand" defaultValue="" onChange={(e) => {
              // onBackBrand(e.target.value);
              setOwner_car_brand(e.target.value);
              setOwner_car_series('-1');
              setOwner_car_model('-1');
              setOwner_date('-1')
            }} required>
              <option value="" disabled>现有品牌</option>
              {seriesData && seriesData?.map(item=> {
                return (
                  <optgroup key={item.en} label={item.en}>
                    {item?.data.map(item2 => <option key={item2.id || item2.name} value={item2.id || item2.name}>{item2.name}</option>)}
                  </optgroup>
                )
              })}
            </select>
          </div>
          <div className={styles.formItem}>
            <select name="owner_car_series" value={owner_car_series ? owner_car_series : '-1'} onChange={(e) => {
              //   onBackModel(e.target.value);
              setOwner_car_series(e.target.value);
              setOwner_car_model('-1');
              setOwner_date('-1')
            }} required >
              <option value="-1" disabled >现有车系</option>
              {/* {!brandSeries && <option value="-1" disabled>现有车系</option>} */}
              {seriesList?.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
              {evaluationSeriesList?.map((item, idx) => {
                return (
                  <optgroup key={idx} label={item.CarMfrs.Name}>
                    {item.CarSeries.map((item2, idx2) => <option key={item2.ID} value={item2.ID}>{item2.Name}</option>)}
                  </optgroup>
                )
              })}
            </select>

          </div>
          {routerSource === "evaluation" ? (
            <div className={styles.formItem}>
              <select name="owner_date" value={owner_date ? owner_date : '-1'} onChange={(e) => {
                setOwner_date(e.target.value);
                setOwner_car_model('-1');
              }} >
                <option value="-1" disabled >购买年份</option>
                {evaluationYear?.map((item, idx) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          ) : null}
          <div className={styles.formItem}>
            <select name="owner_car_model" value={owner_car_model ? owner_car_model : '-1'} onChange={(e) => {
              setOwner_car_model(e.target.value)
            }} required>
              <option value="-1" disabled>现有车型</option>
              {/* {!brandModel && <option value="-1" disabled>现有车型</option>} */}
             {seriesModel?.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)} 
            </select>
          </div>
        </div>

        {routerSource==="replace" ? (
          <div className="trade_sub_title">
            <div className="trade_sub_title_en">STEP</div>
            <h6>
              <span>03</span>
              <b>置换信息</b>
            </h6>
          </div>
        ):null}
        <div className={classNames(styles.formRow,styles.row3)}>
          <div className={styles.formItem}>
            <input type="month" required name="license_date" placeholder="上牌日期" onChange={(e) => {
              SerLicense_date(e.target.value)
            }} ></input>
          </div>
          <div className={styles.formItem}>
            <input type="number" required pattern={PATTERN_NUMBER} maxLength={2} name="driven_distance" placeholder="行驶里程（万公里）" onChange={(e) => {
              setDriven_distance(e.target.value)
            }}></input>
          </div>
        </div>

        <div className={classNames(styles.formRow,styles.row4)}>
          <div className={styles.gridItem}>
            <div className={styles.formItem}>
              {data ? <select onChange={(e) => {
                let index = Number(e.target.value)
                setProvince(data[index])
                setCity(data[index].city[0])
                setDistrict(null!)
                setDealer(null!)
              }} value={province?.index}>
                <optgroup label="省份">
                  {data.map((p, idx) => <option key={p.id} value={idx}>{p.name}</option>)}
                </optgroup>
              </select> : <select defaultValue=""><option disabled value="">数据加载中…</option></select>}
            </div>
            <div className={styles.formItem}>
              <select onChange={e => {
                let index = Number(e.target.value)
                setCity(province?.city[index])
                setDistrict(null!)
                setDealer(null!)
              }} value={city?.index}>
                <option value={-1}>全部</option>
                <optgroup label="城市">
                  {province?.city.map((c, idx) => <option key={c.id} value={idx}>{c.name}</option>)}
                </optgroup>
              </select>
            </div>
            <div className={styles.formItem}>
              <select onChange={e => {
                let index = Number(e.target.value)
                setDistrict(city?.district[index])
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
          </div>
          {Array.isArray(filtered)  &&
            <div className={styles.formItem}>
              <select onChange={e => {
                let index = Number(e.target.value)

                if (filtered) {
                  setDealer(filtered[index])
                  onDealerSelectedChange?.(index)
                }
              }} value={dealer?.index ?? ''} required>
                <option className={styles.placeholder} value="" disabled>请选择经销商</option>
                {Array.isArray(filtered) && filtered.map((item, idx) => <option key={idx} value={idx}>{item.name}{item.distance ? `(${item.distance}KM)` : null}</option>)}
              </select>
            </div>
          }
        </div>
       
          <div className={styles.agreement}>
            <label>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span className={classNames(styles.mark, {
                [styles['mark-checked']]: agree
              })}></span>
              <span className={styles.label}>我已阅读并同意<a onClick={()=>setIframeShow(true)}>《隐私政策》</a></span>
            </label>
          </div>
          <div className={styles['btn-wrap']}>
            <button className={styles.btn} type="submit" >{routerSource === 'evaluation' ? '立即在线评估':'提交预约' }</button>
            <button className={styles.btn} type="reset" >重置</button>
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
            <button className="btn">提交预约</button>
          </div>
        </div>
        <div className={classNames('phonecode', {
          'show': showPhoneCode
        })}>
          <div className="wrap">
            <span className="close" onClick={() => {
              setShowPhoneCode(false)
              setCode(false)
            }}><i className="icon-close"></i></span>
            <h3>验证短信已发送</h3>
            <p>请将收到的验证码在下方进行填写，并点击“提交”以完成预约。</p>
            <div className='code'>
              <input type='text' name="code" placeholder='请输入短信验证码' />

              <button className="current" onClick={() => {
                setCode(false)
              }} disabled={currentTime ? true : false}>{currentTime ? <>{currentTime}</> : '获取验证码'}</button>
            </div>
            <button className="btn" disabled={submitting || checking}>{submitting ? '正在提交' : checking ? '正在验证' : '提交'}</button>
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
            <h3>{isSucess ? '申请成功' : '申请失败'}</h3>
            {errMsg ? (
              <>
                <p>服务拥堵中，请您稍后再试。</p>
                <p className="code">{errMsg}</p>
              </>
            ) : (
              <>
                <p>感谢您对别克的关注！</p>
              </>
            )}
          </div>
        </div>
      </form>
    { evalResultData && <EvaluationResult show={evalShow} data={evalResultData} setEvalShow={setEvalShow}  />}
      <Iframe onClose={()=>setIframeShow(false)} show={iframeShow} url="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html" />
    </div>
  );
};

export default TradeForm;


const EvaluationResult = ({show,data,setEvalShow}:{
  show:boolean,
  data:evalApplyResultType[],
  setEvalShow:Dispatch<SetStateAction<boolean>>
}) => {
  const [current,setCurrent] = useState(1);
  const tipsData = ['注：全车安全件发生两处以下轻微损伤。外观有划痕，内饰不整洁，有磨损','注：全车安全件无损伤，外观覆盖件及外观内衬板件有修复/漆面可能有色差，可能有部分凹陷、或者划痕。','注：全车安全件及外观内衬板件无损伤，车辆外观有磨损或修复，人眼不能轻易识别，有保养记录']
  
  return (
    <div className={classNames(styles.evalresult,{
      [styles['show']]:show
    })}>
        <div className={styles.evalresult_wrap}>
          <div className={styles.tabnav}>
            <ul>
              <li className={current===0?styles.active:''} onClick={() => setCurrent(0)}>车款较差</li>
              <li className={current===1?styles.active:''}  onClick={() => setCurrent(1)}>车况正常</li>
              <li className={current===2?styles.active:''} onClick={() => setCurrent(2)}>车况优秀</li>
            </ul>
          </div>
          {typeof data[current] === 'string' ? (
              <p className={styles.noprice}>{data[current]}</p>
            )
          :(
            <div className={styles.price}>
              <div className={styles.title}>车辆估价</div>
              <p>￥ <span>{data[current]?.BuyPrice}</span>万元</p>
          </div>
          )}
          
          <div className={styles.tips}>
            <p dangerouslySetInnerHTML={{__html:tipsData[current]}}></p>
          </div>
          <p className={styles.source}>*该数据来源于第一车网。</p>
          <div className={styles.btn_submit} onClick={() => setEvalShow(false)} > 确认</div>
        </div>
    </div>
  )
}