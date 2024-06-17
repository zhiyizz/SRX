import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import { useGmacLoan } from '@utils/request'
import { divideByElement, formatPrice } from '@utils/helper'
import type { LoanCarInfo, LoanObject } from '~types/gmac'
import styles from '@styles/components/loan.module.scss'
import SvgIcon from './icons'
import AliImage from './AlImage'
import Link from 'next/link'

const LOAN_LIST: {
  name: string
  key: keyof LoanKey
  isRate?: boolean
  isPeriod?: boolean
}[] = [
  {
    name: '首付金额 ',
    key: 'downPayment',
  }, {
    name: '贷款金额',
    key: 'loanAmount',
  }, {
    name: '年化利率',
    key: 'interestRate',
    isRate: true,
  }, {
    name: '月供金额',
    key: 'monthPay',
  }, {
    name: '还款期数',
    key: 'period',
    isPeriod: true,
  }, {
    name: '尾款金额',
    key: 'finalAmount',
  }
]

const LOAN_HINT: Record<string, string> = {
  '5050气球贷':'贷一半，付一半”；贷款期末还款50%，在贷款期限结束时有两种选择：全额付清尾款，二手车置换',
  '长期限': '**首付20%起（新能源车15%起），每期还款金额相同，最长可贷60期，轻松月供无压力，一步到位，养车用车均无忧。',
  '零息贷': '**贷款期间没有利息，可享免息，每期还款金额相同。',
  '智慧贷': '**首付20%起，最后一期尾款灵活，月供较低，在贷款期限结束时有两种选择：全额付清尾款，二手车置换。',
  '优新享': '**低首付、低月供，车辆高余值保障，期末可买可还可置换，享受灵活用车生活。',
  '灵活贷': '*贷款期限为12－60个月，首付低至20％，借款期内，每期还款金额相同。',
}

function printPrice(str?: string, replace?: string) {
  if (!str) return str
  if (isNaN(Number(str))) return replace || ''
  const p = formatPrice(str.replace(/\..*$/, ''))
  if (p) {
    return `¥${p}`
  }
  return undefined
}

type LoanKey = {
  downPayment: string
  loanAmount?: string
  interestRate: string | null
  monthPay?: string
  period?: string
  finalAmount?: string
}

type LoanDisplay = {
  name: string
  value: string
  isRate?: boolean
  isPeriod?: boolean
}

function isLoanDisplay(value: unknown): value is LoanDisplay {
  const isObject = value && typeof value === 'object'

  if (isObject) {
    return 'value' in value
  }
  return false
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export type LoanProperties = {
  code?: string
  name: string
  pic?: string | string[]
  reverseModel?: boolean
  disableApply?: boolean
  altStyles?: { readonly [key: string]: string }
  onModelChange?: (list: LoanCarInfo[]) => void
  onModelIndex?: (index: string) => void
}

const Loan: FC<LoanProperties> = ({ code, name, pic, reverseModel = false, disableApply, altStyles, onModelChange, onModelIndex }) => {
  const [models, setModels] = useState<LoanCarInfo[]>()
  const [loans, setLoans] = useState<LoanObject[]>()

  const [selectedModel, setSelectedModel] = useState<LoanCarInfo>()
  const [selectedModelIndex, setSelectedModelIndex] = useState(0)
  const [currentPrice, setCurrentPrice] = useState('')
  const [editingPrice, setEditingPrice] = useState(false)

  const [currentLoan, setCurrentLoan] = useState(0)
  const [currentDpRate, setCurrentDpRate] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const [currentFaRate, setCurrentFaRate] = useState<string>()

  const [dpRateList, setDpRateList] = useState<string[]>()
  const [periodList, setPeriodList] = useState<string[]>()
  const [faRateList, setFaRateList] = useState<string>()
  const [loanResult, setLoanResult] = useState<LoanDisplay[]>()

  const [requestPrice, setRequestPrice] = useState<string>()

  const { list, gmf, content, isLoading } = useGmacLoan(name, selectedModel?.car_id, requestPrice)

  const selectedLoan = loans?.[currentLoan]

  useEffect(() => {
    // 处理车款列表数据
    let models: LoanCarInfo[] = null!
    if (list?.IsSuccess) {
      const reg = new RegExp(`${name.replace(/\s+/g, '')}$`, 'i')
      models = list.data.filter(item => reg.test(item.parent_car_desc.replace(/\s+/g, '')))
      reverseModel ? setModels(models.reverse()) : setModels(models)
      onModelIndex?.(models[0].car_id) //金融方案-在线申请，购买车型下标
      onModelChange?.(models) //金融方案-在线申请，购买车型
    }
  }, [list?.IsSuccess, list?.data, name, onModelChange, onModelIndex, reverseModel])

  useEffect(() => {
    // 处理车贷套餐数据
    const loans: LoanObject[]  = []
    if (content?.IsSuccess) {
      content.loan_type_list.forEach(item => {
        if(item.loan_type_id === '2'){
          const gmacList = [{
            name: '5050气球贷',
            list: [{
              downPaymentRate: item.downpayment_rate,
              loanAmount: item.loan_amount,
              downPayment: item.downpayment_amount,
              periodList: [{
                period: item.period,
                monthPay: item.month_pay,
                interestRate: item.interest_rate,
                finalAmount: item.final_amount,
              }]

            }]
          }]
          loans.push(...gmacList)
        }else if (item.loan_type_id === '5') {
          const gmacList = item.loan_list.map<LoanObject>(item => ({
            name: item.loan_name,
            list: item.downpayment_rate_list.map(d => ({
              loanAmount: d.loan_amount,
              downPayment: d.downpayment_amount,
              downPaymentRate: d.downpayment_rate,
              periodList: d.period_list.map(p => ({
                interestRate: p.interest_rate,
                monthPay: p.month_pay,
                period: p.period,
              })),
            })),
            hidden: {
              downPaymentRate: item.discount_program_id === '10540',
              loanAmount: item.discount_program_id === '10698'
            },
          }))
          loans.push(...gmacList)
        } else if (item.loan_type_id === '6') {
          const gmacList = item.loan_list.map<LoanObject>(item => ({
            name: item.loan_name,
            list: item.downpayment_rate_list.map(d => ({
              loanAmount: d.loan_amount,
              downPayment: d.downpayment_amount,
              downPaymentRate: d.downpayment_rate,
              periodList: d.period_list.map(p => ({
                interestRate: p.interest_rate,
                monthPay: p.month_pay_list[0].month_pay,
                period: p.period,
                finalAmount: p.month_pay_list[0].tail_money,
                finalAmountRate: p.month_pay_list[0].tail_money_rate,
              })),
            })),
            hidden: {
              loanAmount: true
            }
          }))
          loans.push(...gmacList)
        }
      })

      let model = selectedModel?.car_desc
      if (!model && models) {
        model = models[0].car_desc
      }

      if (gmf && name && model) {
        const reg_name = new RegExp(`${name.replace(/\s+/g, '')}`, 'i')
        const reg = new RegExp(`${model.replace(/\s+/g, '')}`, 'i')
        let gmf_result;
        if(reg_name.test(name.replace(/\s+/g, ''))){
          for(const i of gmf){
            for (const j of i.vehicleModels){
              const found = reg.test(`${j.name}`.replace(/\s+/g, ''));
              if(found) gmf_result = j
            }
           }
        }
        if (gmf_result) {
          const gmfList = [{
            name: '优新享',
            list: gmf_result.data.map(d => ({
              downPaymentRate: d.downPaymentRatio,
              downPayment: d.downPayment === 0 ? 0 : d.downPayment,
              periodList: d.items.map(p => ({
                period: p.periods,
                monthPay: Number(p.monthly.toFixed(0)),
                finalAmount: Number(p.tail.toFixed(0)),
              })),
            })),
            hidden: {
              loanAmount: false,
              interestRate:true,
            }
          }]
          loans.push(...gmfList)
        }

      }
      setLoans(loans)
    }
  }, [name, content, gmf, models, selectedModel])

  useEffect(() => {
    // 处理首付比例下拉数据
    const dpList = selectedLoan?.list.map(item => item.downPaymentRate !== undefined && (item.downPaymentRate * 100).toFixed(0)).filter(isString)
    if (dpList?.length) {
      setDpRateList(dpList)
    }
  }, [selectedLoan?.list])

  useEffect(() => {
    // 处理还款期数、尾款比例下拉数据
    const dp = selectedLoan?.list[currentDpRate]
    if (dp) {
      let faList: string | undefined
      const pList = dp.periodList.map((item, idx) => {
        if (item.finalAmountRate && idx === currentPeriod) {
          // 尾款比例
          faList = (item.finalAmountRate * 100).toFixed(0)
        }
        if (item.period) {
          return String(item.period)
        }
      }).filter(isString)
      if (pList.length) {
        setPeriodList(pList)
      }
      setFaRateList(faList)
    }

  }, [selectedLoan?.list, currentDpRate, currentPeriod])

  useEffect(() => {
    // 计算结果
    if (selectedLoan) {
      const dp = selectedLoan.list[currentDpRate]
      const period = dp?.periodList[currentPeriod]

      if (period) {
        const result: LoanKey = {
          downPayment: dp.downPayment === 0 ? '0' : formatPrice(dp.downPayment),
          interestRate: (period.interestRate! * 100).toFixed(2),
          monthPay: formatPrice(period.monthPay),
          period: String(period.period),
        }
        if (selectedLoan.hidden?.loanAmount) {
          if (selectedLoan.loanAmount) {
            result.loanAmount = formatPrice(selectedLoan.loanAmount)!
          } else if (dp.loanAmount) {
            result.loanAmount = formatPrice(dp.loanAmount)!
          }
        }
        if (period.finalAmount) {
          result.finalAmount =  period.finalAmount === 0 ? '0':formatPrice(period.finalAmount)
        }

        if (selectedLoan.hidden?.interestRate) {
          result.interestRate = null
        }
        console.log('result', result)
        const display = LOAN_LIST.map<LoanDisplay | null>(item => {
          const { name, key, isPeriod, isRate } = item
          const value = result[key]
          if (value) {
            return {
              name,
              value,
              isPeriod,
              isRate,
            }
          }
          return null
        }).filter(isLoanDisplay)
        setLoanResult(display)
      }
    }
  }, [selectedLoan, currentDpRate, currentPeriod, currentFaRate])

  if (models?.length && !currentPrice) {
    console.log('set default price')
    setCurrentPrice(models[0].guide_price)
  }

  const hint = selectedLoan?.name && LOAN_HINT[selectedLoan.name]

  return (
    <div className={classNames(styles.loan, altStyles?.loan,'noscroll')}>
      <h2>金融方案</h2>
      <div className={styles.container}>
        <form>
          <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="model">选择车款</label>
              <select id="model" defaultValue={selectedModel?.car_id} onChange={(e) => {
                const m = models?.find(item => item.car_id == e.target.value)
                if (Array.isArray(pic)) {
                  setSelectedModelIndex(e.target.selectedIndex)
                }
                onModelIndex?.(e.target.value);
               // model(m.car_desc);
                setCurrentPrice(m?.guide_price || '')
                setRequestPrice(undefined)
                setSelectedModel(m)
                // setSelectedLoan(undefined)
                setCurrentDpRate(0)
                setCurrentPeriod(0)
                setCurrentFaRate(undefined)
              }}>
                {models && models.map(item => <option key={item.car_id} value={item.car_id}>{item.car_desc}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="">选择套餐</label>

              <select onChange={(e) => {
                if (loans) {
                  const idx = Number(e.target.value)
                  setCurrentLoan(idx)
                  setCurrentDpRate(0)
                  setCurrentPeriod(0)
                  setCurrentFaRate(undefined)
                }
              }}>
                {loans && loans.map((item, i) => <option key={i} value={i}>{item.name}</option>)}
              </select>
            </div>
            {hint && <div className={styles.hint}>{divideByElement(hint)}</div>}
          </div>
          <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="price">官方指导价</label>
              <input id="price" value={editingPrice ? currentPrice : printPrice(currentPrice)} onFocus={() => setEditingPrice(true)} onBlur={(e) => {
                setEditingPrice(false)
                let p = e.target.value
                if (!/^\d+(\.\d{1,2})?$/.test(p)) {
                  p = currentPrice || selectedModel?.guide_price || ''
                }
                setRequestPrice(p.replace(/\.\d+$/, ''))
              }} onChange={e => {
                if (/^\d+(\.\d{1,2})?$/.test(e.target.value)) {
                  setCurrentPrice(e.target.value)
                } else {
                  console.warn('reset default price')
                  setCurrentPrice(selectedModel?.guide_price || '')
                }
              }} />
            </div>
          </div>
          {(!selectedLoan?.hidden?.loanAmount && (selectedLoan?.loanAmount || ~currentDpRate && selectedLoan?.list[currentDpRate]?.loanAmount)) && <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="loan">贷款金额</label>
              <input id="loan" readOnly value={`¥${formatPrice(selectedLoan?.loanAmount || ~currentDpRate && selectedLoan?.list[currentDpRate].loanAmount || 0)}`} />
            </div>
          </div>}
          {!selectedLoan?.hidden?.downPaymentRate && dpRateList && <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="dp_rate">首付比例</label>
              <select  value={currentDpRate} id="dp_rate" onChange={(e) => {
                const idx = Number(e.target.value)
                setCurrentDpRate(idx)
              }}>
                {dpRateList.map((item, i) => <option key={i}  value={i}>{item}%</option>)}
              </select>
            </div>
          </div>}
          {!selectedLoan?.hidden?.period && periodList && <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="period">还款期数</label>
              <select  value={currentPeriod}  id="period" onChange={(e) => {
                const idx = Number(e.target.value)
                setCurrentPeriod(idx)
              }}>
                {periodList.map((item, i) => <option key={i} value={i}>{item}</option>)}
              </select>
            </div>
          </div>}
          {!selectedLoan?.hidden?.finalAmountRate && faRateList && <div className={styles.group}>
            <div className={styles.control}>
              <label htmlFor="fa_rate">尾款比例</label>
              <select id="fa_rate" onChange={(e) => {
                setCurrentFaRate(e.target.value)
              }}>
                <option value={faRateList}>{faRateList}%</option>
              </select>
            </div>
          </div>}
        </form>
        <div className={styles.detail}>
          <div className={styles.car}>
            {pic && <figure>
              <AliImage src={Array.isArray(pic) ? pic[selectedModelIndex] : pic} alt={name} width={800} height={640} />
            </figure>}
          </div>

          {loanResult && (
            <div className={classNames(styles.result, {
              [styles['result-6']]: loanResult.length > 4
            })}>
              {loanResult.map((item, i) => (
                <div key={i} className={styles.item}>
                  <small>{item.name}</small>
                  {item.isPeriod ? 
                    <span>{item.value}<sub>个月</sub></span> :
                    (item.isRate  ? <span>{item.value}<sub>%</sub>起</span> : 
                      <span><sub>&yen;</sub>{item.value}</span>)
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {!disableApply && code && <Link href={`/finance?apply=${code}`} className="btn">立即申请</Link>}

      <div className={classNames(styles.remark, {
        [styles['gmac-remark']]: disableApply
      })}>友情提示：上述首付、月供、利率等内容仅供参考，具体以门店实际贷款方案及报价为准。贷款方案中年化利率采用单利计算方法。详情请咨询当地经销商或拨打全国车贷申请热线：400-8833-060</div>

      {isLoading && <div className="loading">
        <SvgIcon icon="spin" />
        <span>正在加载</span>
      </div>}

    </div>
  )
}

export default Loan
