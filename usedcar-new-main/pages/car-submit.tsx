import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import BasePage from '@components/BasePage';
import SvgIcon from '@components/icons';
import { combineUrl } from '@utils/helper';
import { getJsonFile } from '@utils/fs';
import { DealerTypeSubmit } from '@utils/types/dealer';
import styles from '@styles/carsubmit.module.scss'
import classNames from 'classnames';
import { GetStaticProps } from 'next/types';
import { trackEvent } from '@utils/tracking';
const PATTERN_NAME = '[\\u4e00-\\u9fa5a-zA-Z· ]+';
const PATTERN_MOBILE = '1[3-57-9]\\d{9}';
let timer:NodeJS.Timer | null = null;
const Carsubmit = ({
   dealer,

}: {
   dealer: DealerTypeSubmit[]

}) => {

   const [agree, setAgree] = useState(false)
   const [showAgree, setShowAgree] = useState(false)
   const [iframeShow, setIframeShow] = useState(false)
   const [submitting, setSubmitting] = useState(false)
   const formEle = useRef<HTMLFormElement>(null)
   const router = useRouter();


  const [showPhoneCode,setShowPhoneCode] = useState(false);
  const [code,setCode] = useState(false)
  const [currentTime,setCurrentTime] = useState<Number | null>(60);
  const [isSucess, setIsSucess] = useState(false)
  const [checking, setChecking] = useState(false)
  const [errMsg, setErrMsg] = useState<string>()
  

   const [dealerData, setDealerData] = useState<DealerTypeSubmit>();
   useEffect(() => {
      dealer.forEach(item => {
         if (item.dealerCode === router.query.code) {
            setDealerData(item)
         }
      })
   }, [dealer, router])

   useEffect(() => {
      if (!showPhoneCode) {
         clearInterval(Number(timer))
      };
   }, [showPhoneCode])

   function isMobileDevice(strict?: boolean) {
      const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
      const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)

      if (strict) {
         return isMobileUA && isTouchDevice
      } else {
         return window.innerWidth < 768
      }
   }
   async function phoneCode(data: string) {
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

   async function phoneCodeCheck(phone: string, code: string) {
      try {
         const response = await fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, `/SgmApi/SecurityCodeVerify?receiver=${phone}&code=${code}`), {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               receiver: phone,
               code: code
            }),
         });
         const result = await response.json();
         return result;
      } catch (error) {
         console.error("Error:", error);
      }
   }

   return (
      <div>
         <BasePage kv={'kv4'} className={styles.submit}>

            <div className="container">
               <div className='wd'>
                  <div className="sub-title">基础信息</div>
                  <div className={styles.steps}>
                     <ul>
                        <li className={styles.right}>
                           <SvgIcon icon="phone" />
                           <p>电话回访</p>
                        </li>
                        <li className={styles.right}>
                           <SvgIcon icon="time" />
                           <p>确认进店时间</p>
                        </li>
                        <li className={styles.right}>
                           <SvgIcon icon="comein" />
                           <p>进店看车</p>
                        </li>
                        <li className={styles.down}>
                           <SvgIcon icon="car" />
                           <p>车辆鉴定</p>
                        </li>
                        <li className={classNames(styles.left, styles.end)}>
                           <SvgIcon icon="confirm" />
                           <p>确认收购</p>
                        </li>
                        <li className={styles.left}>
                           <SvgIcon icon="money" />
                           <p>车款抵扣<br />交付余款</p>
                        </li>
                        <li className={styles.left}>
                           <SvgIcon icon="newcar" />
                           <p>提车</p>
                        </li>

                     </ul>
                  </div>
                  <div className="sub-title">填写预约看车信息</div>
                  <form className={styles.form} ref={formEle} onSubmit={(e) => {
                     e.preventDefault();
                     if (submitting) return;

                     let fd = new FormData(e.currentTarget);
                     const jsonData = Object.fromEntries(fd.entries());

                     if (!agree) {
                        setAgree(true)
                        setShowAgree(true)
                        return
                     }
                     let applyData = {
                        info_type:'buy',
                        intent_car_model:`别克 ${router.query.series} ${router.query.color}`,
                        province:dealerData?.provinceName,
                        province_id:dealerData?.provinceId,
                        city:dealerData?.cityName,
                        city_id:dealerData?.cityId,
                        region:dealerData?.districtName,
                        dealer:dealerData?.dealerName,
                        dealer_id:dealerData?.id,
                        dealer_address:dealerData?.address,
                        dealer_tel:dealerData?.tel,
                        dealer_code:dealerData?.dealerCode
                     }
                     let params: any = Object.assign(jsonData, applyData)

                     if (!isMobileDevice()) {
                        if (showPhoneCode && jsonData.code === '' && code) {
                           alert('请输入验证码')
                           return;
                        }
                        if (!code) {
                           setSubmitting(true);
                           phoneCode(String(jsonData.mobile)).then(({ data }) => {
                              if (data === 'Already Send') {
                                 setShowPhoneCode(true);
                                 let time = 60;
                                 timer = setInterval(() => {
                                    time -= 1
                                    time >= 0 && setCurrentTime(time)
                                 }, 1000)
                                 setCode(true)
                                 setShowAgree(false)
                              } else if (data === 'mobile valid') {
                                 submitForm()
                              } else {
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
                        if (code) {
                           setChecking(true)
                           phoneCodeCheck(String(jsonData.mobile), String(jsonData.code)).then(({ data }) => {
                              if (data === 'success') {
                                 //验证成功
                                 submitForm()
                              } else {
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
                        if (!code || check) return;
                     }
                     submitForm();
                     function submitForm() {
                        setSubmitting(true)

                        const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/SecApply'), {
                           method: 'post',
                           // mode:'cors',
                           headers: {
                              'content-type': 'application/x-www-form-urlencoded'
                           },
                           body: new URLSearchParams(params).toString()
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
                                    setAgree(false)
                                    trackEvent('买车-预约成功')
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


                  }}>
                     <div className={styles.formgroup}>
                        <div className={styles.formItem}>
                           <input type="text" name="name" pattern={PATTERN_NAME} placeholder="姓名" required />
                        </div>
                        <div className={styles.formItem}>
                           <input type="tel" maxLength={11} name="mobile" placeholder="电话" pattern={PATTERN_MOBILE} required />
                        </div>
                     </div>
                     
                     <div className={styles.dealerInfo}>
                        <p><span>预约车型：</span>别克 {router.query.series} {router.query.color}</p>
                        <p><span>看车地区：</span>{dealerData?.provinceName} {dealerData?.cityName}</p>
                        <p><span>经销商：</span>{dealerData?.dealerName}</p>
                     </div>
                     <div className={styles.agreement}>
                        <label>
                           <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                           <span className={classNames(styles.mark, {
                              [styles['mark-checked']]: agree
                           })}></span>
                           <span className={styles.label}>我已阅读并同意<a onClick={() => setIframeShow(true)}>《隐私政策》</a></span>
                        </label>
                     </div>
                     <div className={styles['btn-wrap']}>
                        <button className={styles.btn} type="submit" >提交预约</button>
                        <button className={styles.btn} type="reset" >重置</button>
                     </div>
                     <div className={classNames('policyfloat', {
                        'show': showAgree
                     })}>
                        <div className="wrap">
                           <span className="close" onClick={() => {
                              setAgree(false)
                              setShowAgree(false)
                           }}><i className="icon-close"></i></span>
                           <h3>您需要同意隐私政策才能继续</h3>
                           <p>我已阅读并同意<a onClick={() => setIframeShow(true)}>《隐私政策》</a></p>
                           <button className="btn">提交</button>
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
               </div>
            </div>
         </BasePage>
      </div>
   );
};

export default Carsubmit;

export const getStaticProps: GetStaticProps<any> = async (context) => {
   try {
      const dealer: DealerTypeSubmit[] = getJsonFile(`data/dealerforapplication`)
      return {
         props: {
            dealer,
         },
         revalidate: 21600,
      }
   } catch (ex) {
      console.error(ex)
      return {
         props: {
            dealer: ''
         }
      }
   }
}

