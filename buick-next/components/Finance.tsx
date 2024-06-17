import { useEffect, useState, type ChangeEvent, type FormEventHandler } from 'react';
import styles from '../styles/finance.module.scss';
import SeriesPriceComponent from '../components/SeriesPriceComponent';
import Loan from './Loan';
import Link from 'next/link';
import Iframe from './Iframe';
import classNames from 'classnames';

//import {AppleCarData,AppleProvinceData,AppleCityData} from '@utils/Finance';
//import {carmodels,provinces,citys} from '@utils/Finance';
import {useCity,useBuyPlan,useCarId,useProvince} from '@utils/Finance';
import { combineUrl } from '@utils/helper';
import { trackPv,trackEvent } from '@utils/tracking';
import type { LoanCarInfo } from '~types/gmac';
import type { SeriesObject } from '~types/series';

type CarListTs = {
  brandId: string
  carId: string,
  carName:string
}

const Finance = ({ series, seriesList }: {
  series?: SeriesObject
  seriesList?: SeriesObject[]
}) => {
  const [loanModel,setLoanModel] = useState<LoanCarInfo[]>()!;
  const [loanModelIndex,setLoanModelIndex] = useState<string>();
  const [carid,setCarid] = useState<CarListTs>();
  const [provinceCode,serProvinceCode] = useState<string>();
  const {data:appcarid} = useCarId();
  const {data:appleProvince} = useProvince(carid?.brandId,carid?.carId)
  const {data:appleCity} = useCity(carid?.brandId,carid?.carId,provinceCode);
  const {data:buyPlan} = useBuyPlan();
  const [fincePic,setFincePic] = useState<string>();
  const [iframeShow, setIframeShow] = useState(false)
    useEffect(() => {
      // if (/^GL8 艾维亚/.test(series.name)) {
      //   const s4 = seriesList.find((item: { code: string; }) => item.code === 'gl8_avenir')
      //   const s67 = seriesList.find((item: { code: string; }) => item.code === 'gl8_avenir6_7')
      //   if (s4 && s67) {
      //     const list = [s67.pic, s67.pic, s4.pic]
      //     if (series.name === 'GL8 艾维亚') {
      //       setFincePic(list.reverse())
      //     } else {
      //       setFincePic(list)
      //     }
      //   }
      // } else {
      //   setFincePic(series.pic)
      // }
      setFincePic(series?.pic)
    }, [series?.pic, seriesList])
   useEffect(() => {
      const carModeItem =  appcarid?.data.find((item: { carName:  string; }) => item.carName.replace(/\s*/g,"") === series?.name.replace(/\s*/g,""));

      setCarid(carModeItem);
   },[series, appcarid])
  const provinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    serProvinceCode(value)
  }
 let delay = true;
 const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // let name = e.target.name.value
    // let mobile = e.target?.mobile.value
    const fd = new FormData(e.currentTarget)

    const jsonData = Object.fromEntries(fd.entries())

    const province = appleProvince?.data.find((item: { provinceId: FormDataEntryValue; }) => item.provinceId === jsonData.province )
    const city = appleCity?.data.find((item: { cityId: FormDataEntryValue; }) => item.cityId === jsonData.city )

    if(!agree) {
      alert('您需要同意隐私政策才能继续')
      return;
    }
    const query = {
       age:"20",
       name:jsonData.name,
       gender:'男',
       mobile:jsonData.mobile,
       province:province.provinceName,
       city:city.cityName,
       isgmf:false,
       buyplan:jsonData.time,
       carmodel:carid?.carName
    }
  
    if(delay){
      delay = false;
      trackEvent('金融购车-网上申请-提交');
    fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Financial/Apply'),{
      method: 'post',
      // mode:'cors',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(query)
    })
    .then((response) => response.json())
    .then(data => {
       jsonData.name = '';
       delay = true;
        if (data.data === 1) {
          trackPv('金融购车-提交成功浮层')
          // if(hasGmf && !hasGmac){
          //     alert("感谢您的提交，我们的客服将在24小时内与您电话联系（节假日除外），请注意接听。");
          // }else{
              alert("提交成功，我们的客服将在24小时内与您电话联系（节假日除外），请注意接听。");
          // }
        //  $('form')[0].reset();
        // name='',mobile='';
      } else if (data.data === 0) {
          alert("提交异常，请稍候再试!");
          return;
      } else if (data.data === -1) {
          alert("提交异常，杂类异常，请稍候再试!");
          return;
      } else if (data.data === -2) {
          alert("抱歉，您之前已提交过申请，请致电400-8833-060联系客服!");
          return;
      } else if (data.data === -3) {
          alert("name不合规!");
          return;
      } else if (data.data === -4) {
          alert("email不能为空!");
          return;
      } else if (data.data === -5) {
          alert("mobile不能为空!");
          return;
      } else if (data.data === -20) {
          alert("省份不合规!");
          return;
      } else if (data.data === -21) {
          alert("城市不合规!");
          return;
      } else if (data.data === -25) {
          alert("品牌与车型不合规!");
          return;
      } else if (data.data === -99) {
          alert("来源鉴权不通过!");
          return;
      }

    
    })
  }
 }

  const [agree, setAgree] = useState(false);

  if (!series) {
    return null
  }

  return (
    <>
      <div className={styles.gmacLoan}>
        <div className={styles.loan_title}>
          <div className={styles.container}>
            <span className={styles.name}>{series.displayName || series.name}</span>{" "}
            <SeriesPriceComponent
              className={styles.price}
              price={series.price}
            />
          </div>
        </div>
        <div className={styles.container}>
          <Loan
            name={series.name}
            pic={fincePic}
            disableApply
            onModelChange={setLoanModel}
            onModelIndex={setLoanModelIndex}
          />
        </div>

        {series.flags?.apply ? (
          <div className={styles.container}>
            <div className={styles.testdrive} id="gmacLoanTd">
              <h2>在线申请</h2>
              <form className={styles.form} onSubmit={submit}>
                <div className={styles.group}>
                  <label>购买车型</label>
                  <select
                    name="carmodel"
                    value={loanModelIndex}
                    onChange={(e) => {
                      setLoanModelIndex(e.target.value);
                    }}
                  >
                    {loanModel?.map(
                      (
                        item: { car_id: string; car_desc: string },
                        idx: number
                      ) => {
                        return (
                          <option key={idx} value={item.car_id}>
                            {item.car_desc}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className={styles.group}>
                  <label>申请人姓名</label>
                  <input name="name" type="text" required />
                </div>
                <div className={styles.group}>
                  <label>联系电话</label>
                  <input
                    name="mobile"
                    type="tel"
                    maxLength={11}
                    required
                    pattern="^1[345678]\d{9}$"
                  />
                </div>
                <div className={styles.group}>
                  <label>预计购车时间</label>
                  <select name="time" required>
                    <option value="">请选择</option>
                    {buyPlan?.data.map(
                      (item: { name: string }, idx: number) => {
                        return <option key={idx}>{item.name}</option>;
                      }
                    )}
                  </select>
                </div>
                <div className={styles.group}>
                  <label>所在省份</label>
                  <select
                    name="province"
                    required
                    onChange={(e) => provinceChange(e)}
                  >
                    <option value={""}>请选择</option>
                    {appleProvince?.data?.map(
                      (
                        item: { provinceId: string; provinceName: string },
                        idx: number
                      ) => {
                        return (
                          <option key={idx} value={item.provinceId}>
                            {item.provinceName}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className={styles.group}>
                  <label>所在城市</label>
                  <select name="city" required>
                    <option value={""}>请选择</option>
                    {appleCity?.data?.map(
                      (
                        item: { cityId: string; cityName: string },
                        idx: number
                      ) => {
                        return (
                          <option key={idx} value={item.cityId}>
                            {item.cityName}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className={styles.agreement}>
                  <label>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span
                      className={classNames(styles.mark, {
                        [styles["mark-checked"]]: agree,
                      })}
                    ></span>
                    <span className={styles.label}>
                      我已阅读并同意
                      <a onClick={()=>setIframeShow(true)}>《隐私政策》</a>
                    </span>
                  </label>
                </div>
                <div className={styles.tips}>
                  声明:此申请为意向申请，我们将在24小时内与您电话联系（节假日除外）并进行预审核，预审核结果不作为放贷的承诺和依据。
                </div>
                <div className={styles.submit}>
                  <button type="submit">确认提交</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
      <Iframe onClose={()=>setIframeShow(false)} show={iframeShow} url="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html" />
    </>
  );
}

export default Finance
