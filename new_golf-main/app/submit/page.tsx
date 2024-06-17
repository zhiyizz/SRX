'use client'
import React, { useEffect, useState, useRef } from 'react';
import GroupName from './form/GroupName'
import TrainingSite from './form/TrainingSite';
import PurPose from './form/PurPose';
import Parrelation from './form/Parrelation';
import Carmodel from './form/Carmodel';
import Testdrive from './form/Testdrive';
import { useSeries } from '@/utils/require';
import SignType from './form/SignType';
import { SeriesObject } from '@/utils/types/series';
import { combineUrl } from '@/utils/helper';
import {useSearchParams} from 'next/navigation'
import { trackEvent,trackPv } from '@/utils/tracking';

import styles from '@/styles/submit.module.scss'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'
const Page = () => {
  const [idnum, setIdnum] = useState<string>('大陆身份证（请填写18位有效身份证号）');
  const [groupName, setGroupName] = useState<string>();
  const { data: series } = useSeries();
  const [order, setOrder] = useState<string[]>();
  const [signType, setSignType] = useState<string[]>();
  const [trainingsite, setTrainingsite] = useState<{ name: string, value: string }[]>();
  const [purpose, setPurpose] = useState<string[]>();
  const [testdrive, setTestdrive] = useState<any>();
  const [testdriveCar, setTestdriveCar] = useState<SeriesObject | null>(null);
  const [carModelList, setCarModelList] = useState<string[]>();
  const [agree, setAgree] = useState(false)
  const [agree2, setAgree2] = useState(false)
  const formEle = useRef<HTMLFormElement>(null)
  const [overlay, setOverlay] = useState(false);
  const [finished, setFinished] = useState<Record<string,string>>();
  const [resetType, setResetType] = useState(false);
  const form = useSearchParams().get('form');
  const sitename = '总决赛'
  const [submitting, setSubmitting] = useState(false)
  const birthdate = [[20040913,20100912],[20100913,20130912]]
  useEffect(() => {
    const order = series?.filter(item => (item.carID || item.carId) && !item.flags?.mock).map(item => item.code)
    const uniqueOrder = new Set(order)
    setOrder(Array.from(uniqueOrder))
  }, [series])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFinished({
      ...finished,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.submit}>
      <div className={styles.title}>
      2023别克中国青少年高尔夫锦标赛<br />暨别克全国青少年高尔夫精英系列赛-{sitename}<br />招募报名表
      </div>
      <div className={styles.content}>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>一. 报名场次</h5>
          <p>2023别克中国青少年高尔夫锦标赛暨别克全国青少年高尔夫精英系列赛-{sitename}</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>二. 参赛资格</h5>
          <p>1. 具有中华人民共和国公民身份，年龄10岁-19岁（不含19岁）的青少年男、女选手。<br />2. 符合R&A规则有限公司和美国高尔夫球协会（USGA）颁布的最新版《高尔夫球规则》中关于业余身份的界定。</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>三. 场地及时间</h5>
          <p>上海揽海国际高尔夫俱乐部（2023年9月11日至9月14日）</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>四. 球员信息</h5>
          <form className={styles.form} ref={formEle} onSubmit={(e) => {
            e.preventDefault();
            if (submitting) return
            let fd = new FormData(e.currentTarget);
            const jsonData = Object.fromEntries(fd.entries());
            if (!agree && !agree2) {
              setAgree(true)
              setAgree2(true)
              return
            }

            if(!trainingsite  ||  trainingsite.length <= 0){
              alert('请选择日常进行高尔夫训练或培训场所')
              return;
            }else if(groupName === "年龄不在分组范围内"){
              alert('年龄不在分组范围内，请重新选择!')
              return;
            }else if(!purpose  ||  purpose.length <= 0){
              alert('请选择孩子打高尔夫的目的')
              return;
            }else if(!signType  ||  signType.length <= 0){
              alert('请选择参与高尔夫运动的家庭成员或其它')
              return;
            }else if(jsonData.par_carmodel==='是' &&  (!carModelList ||  carModelList.length <= 0)){
              alert('请选择现有车型')
              return;
            }
           
            const site = trainingsite?.map((item) => item && item.name + ':' + item.value).toString();
            let data = {
              /**
               * 球员姓名
               */
              name: jsonData.name,
              /**
               * 球员性别
               */
              sex: jsonData.sex,
              /**
               * 球员出生日期
               */
              birthday: jsonData.birthday,
              /**
               * 球员分组
               */
              groupName: groupName,
              /**
               * 球员祖籍
               */
              region: jsonData.region,
              /**
               * 球员身份信息
               */
              idnum: jsonData.idnum,
              /**
               * 中高协注册号码
               */
              registerid: jsonData.registerid,
              /**
               * 学校
               */
              school: jsonData.school,
              /**
               * 家庭地址
               */
              homeaddress: jsonData.homeaddress,
              /**
               * 联系人手机号码
               */
              mobile: jsonData.mobile,
              /**
               * 其它联系人手机号码
               */
              othermobile: jsonData.othermobile,
              /**
               * 邮箱
               */
              email: jsonData.email,
              /**
              * 高尔夫训练场所
              */
              trainingsite: site,
              /**
               * 孩子打高尔夫的目的
               */
              purpose: purpose?.toString(),
              /**
               * 监护人姓名 
               * */
              parname: jsonData.parname,
              /**
               * 与被监护人的关系 
               * */
              parrelation: jsonData.parrelation,
              /**
               * 监护人单位
               */
              parworktrade: jsonData.parworktrade,
              /**
               * 监护人行业
               */
              parworktype: jsonData.parworktype,
              /**
               * 参与高尔夫家庭成员
               */
              sign_type: signType?.toString(),
              /**
               * 是否有汽车
               */
              par_carmodel: jsonData.par_carmodel,
              /**
               * 汽车数量 
               */
              par_carmodel_num: jsonData.par_carmodel_num,
              /**
               * 车型名称
               */
              par_carmodel_list: carModelList?.toString(),
              /**
               * 是否预约试驾
               */
              istestdrive: Number(jsonData.istestdrive),
              /**
               * 试驾姓名
               */
              testdrivename: jsonData.realName ?? '',
              /**
               * 试驾联系方式
               */
              testdrivemobile: jsonData.realmobile ?? '',
              /**
               * 意向车型
               */
              testdrivecar: (testdriveCar?.displayName || testdriveCar?.name) ?? '',
              /**
               * 车型id
               */
              testdrivecarid: (testdriveCar?.carId && String(testdriveCar?.carId)) ?? '',
              /**
               * 省份
               */
              testdriveprovince: testdrive?.province?.name ?? '',
              /**
               * 城市
               */
              testdrivecity: testdrive?.city?.name ?? '',
              /**
               * 区县
               */
              testdriveregion: testdrive?.district?.name ?? '',
              /**
               * 经销商
               */
              testdrivedealer: testdrive?.dealer?.name ?? '',
              /**
               * 经销商（code）
               */
              testdrivedealercode: testdrive?.dealer?.code ?? '',
              /**
               * 是否参加资格赛
               */
              isattented: jsonData.isattented ?? 0,
              /**
               * 疫情风险
               */
              isdanger: jsonData.isdanger ?? 0,
              /**
               * 境外记录
               */
              isentry: jsonData.isentry ?? 0,
              /**
               * 出发地
               */
              departurearea: jsonData.departurearea ?? '国内',
              sitename: `2023别克全国青少年高尔夫精英系列赛-${sitename}`,
              sourceplatform:(form ? form +'-' : '')+ "高尔夫官网" ,

            }
            const applyData = {
              realName:jsonData.realName,
              mobile:jsonData.realmobile,
              carid:testdriveCar?.carId,
              tryCar:testdriveCar?.displayName || testdriveCar?.name,
              province:testdrive?.province?.name,
              provinceId:testdrive?.province?.id,
              city:testdrive?.city?.name,
              cityId:testdrive?.city?.id,
              dealerId:testdrive?.dealer?.id,
              dealerName:testdrive?.dealer?.name,
              dealerCode:testdrive?.dealer?.code,
              dealerAddress:testdrive?.dealer?.address,
              dealerTel:testdrive?.dealer?.tel ?? '',
              channelSource:testdrive?.channelSource,
              utmSource: testdrive?.utmSource,
              utmCampaign: testdrive?.utmCampaign,
              utmMedium: testdrive?.utmMedium,
              utmTerm: testdrive?.utmTerm,
              utmContent: testdrive?.utmContent
            }
            setResetType(false);
            setSubmitting(true)
            const res = fetch(combineUrl(process.env.NEXT_PUBLIC_ADDSINGLE_HOST, '/buickact/golf/interface/api/addsingle'), {
              method: 'post',
              // mode:'cors',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            res.then((response) => {
              response.json().then(({ result }) => {
                if (result === 'success') {
                  setOverlay(true)
                  setResetType(true);
                  setFinished({})
                  setIdnum("大陆身份证（请填写18位有效身份证号）");
                  setAgree(false)
                  setAgree2(false)
                  trackEvent('高尔夫-个人赛报名-提交')
                  trackPv('高尔夫-个人赛报名-提交-提交成功')
                }
              }, err => {
                console.error(err);
              })

            }).finally(() => {
              setSubmitting(false)
            })
  
            if(jsonData.istestdrive === '1'){
              const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/Apply'), {
                method: 'post',
                // mode:'cors',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(applyData)
              })
              res.then((response) => {
                response.json().then((data) => {
                  if (data.status == 1) {
                    try {
                       trackEvent('高尔夫-试驾-提交')
                       trackPv('高尔夫-试驾-提交-提交成功')
                    } catch (ex) {
                      console.error(ex)
                    }
                  } else {
                    console.log(data.message)
                  }
                }, err => {
                  console.error(err)
                })
              }, (res) => {
                console.error(res)
              })
            }
          }}>
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>姓名</div>
                <div className={styles['item-wrap']}><input name="name" type="text" value={finished?.name ?? ''} onChange={handleChange} placeholder='请填写姓名' required /></div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>性别</div>
                <div className={styles['item-wrap']}>
                  <select required name="sex" value={finished?.sex ?? '请选择性别'} onChange={handleChange}>
                    <option value="">请选择性别</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
              </div>
            </div>

            <GroupName reset={resetType} data={birthdate} setGroupName={setGroupName} />
              <div className={styles.item}>
                <div className={styles['item-label']}>您属于中华人民共和国哪一地区公民（外籍报名无效）:</div>
                <div className={styles['item-wrap']}>
                  <select name="region" value={finished?.region ?? ''} onChange={(e) => {
                    handleChange(e)
                    switch (e.target.value) {
                      case "中国大陆":
                        setIdnum("大陆身份证（请填写18位有效身份证号）");
                        break;
                      case "中国香港":
                      case "中国澳门":
                        setIdnum("港澳来往内地通行证");
                        break;
                      case "中国台湾":
                        setIdnum("台湾居民来往大陆通行证");
                        break;
                      default:
                        break;
                    }
                  }}>
                    <option value="中国大陆">中国大陆</option>
                    <option value="中国香港">中国香港</option>
                    <option value="中国澳门">中国澳门</option>
                    <option value="中国台湾">中国台湾</option>
                  </select>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>身份信息：</div>
                <div className={styles['item-wrap']}><input name="idnum" value={finished?.idnum ?? ''} onChange={handleChange} placeholder={idnum} required /></div>
              </div>

            
            <div className={styles.item}>
              <div className={styles['item-label']}>中高协注册号码（J开头，请注意截图保存，签到时须核对）：</div>
              <div className={styles['item-wrap']}><input name="registerid" value={finished?.registerid ?? ''} placeholder='请填写' onChange={handleChange} required /></div>
            </div>
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>学校：</div>
                <div className={styles['item-wrap']}><input name="school" value={finished?.school ?? ''} onChange={handleChange} placeholder="请输入学校" required /></div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>家庭住址：</div>
                <div className={styles['item-wrap']}><input name="homeaddress" value={finished?.homeaddress ?? ''} onChange={handleChange} placeholder="请输入家庭住址" required /></div>
              </div>
            </div>
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>联系人手机号码：</div>
                <div className={styles['item-wrap']}><input name="mobile" placeholder="请输入您的手机号" value={finished?.mobile ?? ''} onChange={handleChange} pattern={PATTERN_MOBILE} type='tel' maxLength={11} required /></div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>其他联系人手机号码：</div>
                <div className={styles['item-wrap']}><input name="othermobile" value={finished?.othermobile ?? ''} onChange={handleChange} placeholder="请输入其他联系人的手机号" type='tel' pattern={PATTERN_MOBILE} maxLength={11} required /></div>
              </div>
              <div className={styles.item}>
              <div className={styles['item-label']}>邮箱：</div>
              <div className={styles['item-wrap']}><input name="email" value={finished?.email ?? ''} onChange={handleChange} placeholder="请输入邮箱" type="email" required /></div>
            </div>
            </div>
  
            
            <TrainingSite reset={resetType} data={finished} setTrainingsite={setTrainingsite} />
            <PurPose reset={resetType} setPurpose={setPurpose} />

            <h5 className={styles.subtitle}>五. 监护人信息 <p>此信息为紧急情况的联系方式，为了球员安全，请监护人务必仔细填写。</p></h5>
            <div className={styles.item}>
              <div className={styles['item-label']}>姓名：</div>
              <div className={styles['item-wrap']}><input name="parname" placeholder='监护人姓名' value={finished?.parname ?? ''} onChange={handleChange} required /></div>
            </div>
            <Parrelation reset={resetType} />
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>监护人所工作的单位类型：</div>
                <div className={styles['item-wrap']}>
                  <select name="parworktype" value={finished?.parworktype ?? ''} onChange={handleChange}>
                    <option value="政府部门">政府部门</option>
                    <option value="国有企业">国有企业</option>
                    <option value="事业单位">事业单位</option>
                    <option value="外资企业">外资企业</option>
                    <option value="合资企业">合资企业</option>
                    <option value="民营企业">民营企业</option>
                    <option value="自主创业">自主创业</option>
                    <option value="自由职业">自由职业</option>
                  </select>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>监护人所从事的行业类型：</div>
                <div className={styles['item-wrap']}>
                  <select name="parworktrade" value={finished?.parworktrade ?? ''} onChange={handleChange}>
                    <option value="官方机构组织">官方机构组织</option>
                    <option value="农林牧渔">农林牧渔</option>
                    <option value="制造业">制造业</option>
                    <option value="建筑建材和房地产">建筑建材和房地产</option>
                    <option value="互联网">互联网</option>
                    <option value="金融">金融</option>
                    <option value="商业服务">商业服务</option>
                    <option value="教育">教育</option>
                    <option value="医疗卫生">医疗卫生</option>
                    <option value="科学研究">科学研究</option>
                    <option value="交通运输、物流和仓储">交通运输、物流和仓储</option>
                    <option value="媒体、广告">媒体、广告</option>
                    <option value="水利水电">水利水电</option>
                    <option value="环保">环保</option>
                    <option value="零售">零售</option>
                    <option value="文化、旅游和娱乐">文化、旅游和娱乐</option>
                    <option value="体育">体育</option>
                    <option value="其他行业">其他行业</option>
                  </select>
                </div>
              </div>
            </div>
         
            <SignType reset={resetType} onSignType={setSignType} />
            <Carmodel reset={resetType} setCarModelList={setCarModelList} />
            <h5 className={styles.subtitle}>六. 预约试驾</h5>
            {series && <Testdrive reset={resetType} setTestdrive={setTestdrive}  setTestdriveCar={setTestdriveCar} series={series} seriesOrder={order} source={`2023别克全国青少年高尔夫精英系列赛-${sitename}`} />}

            <div className={styles.item}>
              <label className={styles.agreement}><input type="checkbox" checked={agree} onChange={(e) => {
                setAgree(e.target.checked);
              }} required /><p>本次报名所收集的个人信息，除进行赛事报名筛选外，不会用于其他用途</p></label>
            </div>
            <div className={styles.item}>
              <label className={styles.agreement}><input type="checkbox" checked={agree2} onChange={(e) => {
                setAgree2(e.target.checked);
              }} required /><p>我已阅读并同意<a target='_blank' href="https://raa.oc.saic-gm.com/publish/ibuick/app/userSpec/privacy_policy.html#tt">《隐私政策》</a></p></label>
            </div>
            <div className={styles.item}>
              <p>请核对您所填写的所有信息，出现任何信息的缺失、错误，则报名表作废。每个人只有两次提交报名表的机会，提交两次的则以第二次报名表为准。</p>
            </div>
            <button type="submit" disabled={submitting} className={styles.submit}>提交</button>
          </form>
        </div>
      </div>
      {overlay && <Overlay setOverlay={setOverlay} />}
    </div>
  );
};

const Overlay = ({ setOverlay }: { setOverlay: Function }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <span className={styles.close} onClick={() => setOverlay(false)}>关闭</span>
        <p>您的报名表单已提交成功，最终参赛名单请关注别克青少年公众号及别克官网公示，谢谢！。</p>
      </div>
    </div>

  )
}

export default Page;