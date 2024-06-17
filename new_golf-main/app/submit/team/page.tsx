'use client'
import React, { useEffect, useState, useRef } from 'react';
import Testdrive from '../form/Testdrive';
import { useSeries } from '@/utils/require';
import { SeriesObject } from '@/utils/types/series';
import { combineUrl } from '@/utils/helper';
import {useSearchParams} from 'next/navigation'
import { trackEvent,trackPv} from '@/utils/tracking';
import PlayerList from '../form/PlayerList';
import { TeamPlayersType } from '@/utils/types/submit';
import styles from '@/styles/submit.module.scss'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'

const Page = () => {
  const [idnum, setIdnum] = useState<string>('大陆身份证（请填写18位有效身份证号）');
  const { data: series } = useSeries();
  const [order, setOrder] = useState<string[]>();
  const [testdrive, setTestdrive] = useState<any>();
  const [testdriveCar, setTestdriveCar] = useState<SeriesObject | null>(null);
  const [agree, setAgree] = useState(false)
  const [agree2, setAgree2] = useState(false)
  const formEle = useRef<HTMLFormElement>(null)
  const [overlay, setOverlay] = useState(false);
  const [finished, setFinished] = useState<any>();
  const [resetType, setResetType] = useState(false); 
  const form = useSearchParams().get('form');
  const sitename = '郑州站'
  const [playerList,setPlayerList] = useState<TeamPlayersType[]>([]);
  const [submitting, setSubmitting] = useState(false)
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
        2023别克全国青少年高尔夫精英系列赛<br /><b>北京站</b><br />招募报名表
      </div>
      <div className={styles.content}>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>一. 报名场次</h5>
          <p>2023别克全国青少年高尔夫精英系列赛-北京站</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>二. 参赛资格</h5>
          <p>1. 具有中华人民共和国公民身份，年龄10岁-19岁（不含19岁）的青少年男、女选手。<br />2. 符合R&A规则有限公司和美国高尔夫球协会（USGA）颁布的最新版《高尔夫球规则》中关于业余身份的界定。</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>三. 场地及时间</h5>
          <p>北京香山国际高尔夫俱乐部（2023年6月7日 - 6月10日）</p>
        </div>
        <div className={styles.group}>
          <h5 className={styles.subtitle}>四. 团队信息</h5>
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
            if(playerList.length <= 0) {
              alert('请填写球员信息');
              return;
            }
            for(var i = 0; i<playerList.length; i++) {
              if(playerList[i].group === '年龄不在分组范围内'){
                alert('年龄不在分组范围内，请重新选择!')
                return;
              }
            }
            let data = {
              /**
               * 团队姓名
               */
              team:jsonData.name,
              /**
               * 领队姓名
               */
              leader: jsonData.leader,
              /**
               * 领队祖籍
               */
              leader_region: jsonData.leader_region,
              /**
               * 领队身份信息
               */
              leader_certificate_code: jsonData.leader_certificate_code,
              /**
               * 领队手机号码
               */
              leader_tel: jsonData.leader_tel,
              /**
               * 领队微信号
               */
              leader_wechat: jsonData.leader_wechat,
              /**
               * 领队邮箱
               */
              leader_email: jsonData.leader_email,
               /**
               * 领队性别
               */
               leader_gender: jsonData.leader_gender,
              /**
               * 队员信息
               */
              players:playerList,
              /**
               * 出发地
               */
              departurearea:'0',
              /**
               * 疫情风险
               */
              isdanger: jsonData.isdanger ?? '0',
              /**
               * 境外记录
               */
              isentry: jsonData.isentry ?? '0',
              /**
               * 出发地
               */
              test_drive: jsonData.istestdrive === '1'? {
                name:jsonData.realName,
                mobile:jsonData.realmobile,
                province:{
                  value:testdrive.province.id,
                  name:testdrive.province.name
                },
                city:{
                  value:testdrive.city.id,
                  name:testdrive.city.name
                },
                district:{
                  value:testdrive.district.id,
                  name:testdrive.district.name
                },
                dealer:{
                  value:testdrive.dealer.id,
                  city:testdrive.dealer.city,
                  cityName:testdrive.dealer.cityName,
                  district:testdrive.dealer.district,
                  address:testdrive.dealer.address,
                  code:testdrive.dealer.code,
                  name:testdrive.dealer.name,
                  lat:String(testdrive.dealer.lat),
                  lng:String(testdrive.dealer.lng),
                  referred:testdrive.dealer.referred,
                  tel:testdrive.dealer.tel ?? '',
                  url:testdrive.dealer.url ?? '',
                  verson:testdrive.dealer.verson ?? 0,
                  id:testdrive.dealer.id,
                },
                utm:{
                  channelsource:testdrive.channelSource,
                  utm_source: testdrive.utmSource,
                  utm_campaign:testdrive.utmCampaign,
                  utm_medium: testdrive.utmMedium,
                  utm_term: testdrive.utmTerm,
                  utm_content: testdrive.utmContent
                },
                selectcar:{
                  value:String(testdriveCar?.carId) ?? '',
                  cccname:(testdriveCar?.displayName || testdriveCar?.name) ?? '',
                  name:(testdriveCar?.displayName || testdriveCar?.name) ?? ''
                }
              }:{},

              race: (form ? form +'-' : '')+`2023别克全国青少年高尔夫精英系列赛`,

            }
            setResetType(false);
            setSubmitting(true)
            const res = fetch(combineUrl(process.env.NEXT_PUBLIC_ADDSINGLE_HOST, '/buickact/golf/interface/api/add'), {
              method: 'post',
              // mode:'cors',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            res.then((response) => {
              response.json().then(({ result,jsonResponse }) => {
                if (result === 'success') {
                  setOverlay(true)
                  setResetType(true);
                  setFinished(null)
                  setIdnum("大陆身份证（请填写18位有效身份证号）");
                  setAgree(false)
                  setAgree2(false)
                  trackEvent('高尔夫-团队赛报名-提交')
                  trackPv('高尔夫-团队赛报名-提交-提交成功')
                }else{
                  alert(jsonResponse)
                }
              }, err => {
                console.error(err);
              })

            }).finally(() => {
              setSubmitting(false)
            })
  
            // if(jsonData.istestdrive === '1'){
            //   const res = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Leads/Apply'), {
            //     method: 'post',
            //     // mode:'cors',
            //     headers: {
            //       'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(applyData)
            //   })
            //   res.then((response) => {
            //     response.json().then((data) => {
            //       if (data.status == 1) {
            //         try {
            //           trackEvent('高尔夫-试驾-提交')
            //           trackPv('高尔夫-试驾-提交-提交成功')
            //         } catch (ex) {
            //           console.error(ex)
            //         }
            //       } else {
            //         console.log(data.message)
            //       }
            //     }, err => {
            //       console.error(err)
            //     })
            //   }, (res) => {
            //     console.error(res)
            //   })
            // }
          }}>
             <div className={styles.item}>
              <div className={styles['item-label']}>团队名称（请填写完整的学院或球场或学校名称）</div>
              <div className={styles['item-wrap']}><input name="team" type="text" value={finished?.team ?? ''} onChange={handleChange} placeholder='请填写团队名称' required /></div>
            </div>
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>领队姓名：</div>
                <div className={styles['item-wrap']}><input name="leader" type="text" value={finished?.leader ?? ''} onChange={handleChange} placeholder='请填写姓名' required /></div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>性别</div>
                <div className={styles['item-wrap']}>
                  <select required name="leader_gender" value={finished?.leader_gender ?? '请选择性别'} onChange={handleChange}>
                    <option value="">请选择性别</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
              </div>
            </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>您属于中华人民共和国哪一地区公民（外籍报名无效）:</div>
                <div className={styles['item-wrap']}>
                  <select name="leader_region" value={finished?.leader_region ?? ''} onChange={(e) => {
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
                <div className={styles['item-wrap']}><input name="leader_certificate_code" value={finished?.leader_certificate_code ?? ''} onChange={handleChange} placeholder={idnum} required /></div>
              </div>
            <div className={styles.flex}>
              <div className={styles.item}>
                <div className={styles['item-label']}>联系人手机号码：</div>
                <div className={styles['item-wrap']}><input name="leader_tel" placeholder="请输入您的手机号" value={finished?.leader_tel ?? ''} onChange={handleChange} pattern={PATTERN_MOBILE} type='tel' maxLength={11} required /></div>
              </div>
              <div className={styles.item}>
                <div className={styles['item-label']}>微信号：</div>
                <div className={styles['item-wrap']}><input name="leader_wechat" value={finished?.leader_wechat ?? ''} onChange={handleChange} placeholder="请输入微信号" required /></div>
              </div>
              <div className={styles.item}>
              <div className={styles['item-label']}>邮箱：</div>
              <div className={styles['item-wrap']}><input name="leader_email" value={finished?.leader_email ?? ''} onChange={handleChange} placeholder="请输入邮箱" type="email" required /></div>
            </div>
            </div>
  
            <h5 className={styles.subtitle}>五. 球员信息（每个团队提交至少1名球员信息)</h5>
            <PlayerList setPlayerList={setPlayerList} reset={resetType} />
            <h5 className={styles.subtitle}>六. 预约试驾</h5>
            {series && <Testdrive reset={resetType} setTestdrive={setTestdrive} setTestdriveCar={setTestdriveCar} series={series} seriesOrder={order} source={`2023别克全国青少年高尔夫精英系列赛-${sitename}`} />}

            <div className={styles.item}>
              <label className={styles.agreement}><input type="checkbox"  checked={agree} onChange={(e) => {
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
            <button disabled={submitting} type="submit" className={styles.submit}>提交</button>
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
        <p>您的报名表单已提交成功，最终参赛名单请关注别克青少年公众号及别克官网公示，谢谢！</p>
      </div>
    </div>

  )
}

export default Page;