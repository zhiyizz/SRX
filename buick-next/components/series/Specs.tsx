'use client'

import { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'

import { type SpecsDataType, useSpecsData } from '@utils/request'
import { divideByElement, extractHtmlTag, formatPrice } from '@utils/helper'
import Overlay, { type SeriesOverlayProps } from './Overlay'

import styles from '@styles/components/series-overlay.module.scss'
import SvgIcon from '@components/icons'

type MergedData = {
  span?: number
  value: string
}

/**
 * 用于配置表切换标签。
 */
export type SpecsTab = {
  /**
   * 显示名称。
   */
  name: string
  /**
   * 车型代码。
   */
  code: string
}

function mergeCell(list: string[]) {
  let lastValue = ''
  let span = 0
  const mereged: MergedData[] = []
  list.forEach(item => {
    if (lastValue === item) {
      span++
      return
    }
    if (lastValue) {
      mereged.push({
        span,
        value: lastValue,
      })
    }
    span = 1
    lastValue = item
  })
  mereged.push({
    span,
    value: lastValue,
  })
  return mereged
}

export default function Specs({
  remark = '*用ECE计量法，实际状况根据不同的燃油品质、路面和驾驶条件而定。\n**FNC专利号：CN 102031481 B',
  declaration = '配置表尽可能在现有资料基础上做到详实，考虑到上汽通用汽车有限公司可能随时对产品参数、配置、材料、色彩等车型信息进行修改和调整，因此本配置表仅作参考使用，具体车型的外观、配置及颜色等信息以销售的实车为准。上汽通用汽车有限公司有权合法使用别克(BUICK)产品商标名称，未经许可使用上述商标者，将被追究法律责任。',
  code, shared, series, show, draftMode, ...rest }: SeriesOverlayProps & {
  code: string | SpecsTab[],
  shared?: SpecsTab[],
  series?:string,
  remark?: string | { [code: string]: string }
  declaration?: string | { [code: string]: string }
  draftMode?: boolean
}) {
  const [specShared,setSpecShared] = useState<string | SpecsTab[]>(code);
  const [moreType,setMoreType] = useState(false);
  const [current, setCurrent] = useState(typeof specShared === 'string' ? specShared : moreType? specShared[1].code : specShared[0].code)
  const [expand, setExpand] = useState<boolean[]>([true])
  const [specData, setSpecData] = useState<SpecsDataType>()
  const [sharedText, setSharedText] = useState<string>()
  const { data, error } = useSpecsData(show ? current : undefined, draftMode)

  if (error) {
    console.error(error)
  }
  useEffect(() => {
    setSpecShared(code)
  },[code])
  useEffect(() => {
    if (Array.isArray(specShared)) {
      if (specShared.length) {
        if(moreType){
          setCurrent(specShared[1].code)
        }else{
          setCurrent(specShared[0].code)
        }
      }
    } else {
      setCurrent(specShared)
    }
  }, [moreType, specShared])
 
  useEffect(() => {
    switch(series){
      case 'velite6':
       setSharedText('专享');
       break;
      case 'velite6_phev': 
      setSharedText('互联共享型');
      break;
      default:
        break;
    }

  },[series])
  useEffect(() => {
    if (data) {
      setSpecData(data)
    }
  }, [data])

  // if (!data) return <div>Loading...</div>

  const cols = specData?.name.length || 0

  const remarkStr = typeof remark === 'string' ? remark : remark[current]
  const declareStr = typeof declaration === 'string' ? declaration : declaration[current]

  return (
    <Overlay show={show} {...rest}>
      <div className={styles.spec}>
        <div className={styles.scroll}>
          <div className={classNames(styles.container)}>
            <div className={styles.content}>
              <table>
                <thead>
                  <tr>
                    <td colSpan={cols + 1} className={styles.header}>
                      <div>
                        <h2>车型配置</h2>
                        {Array.isArray(specShared) && <ul className={styles.tabs}>
                          {specShared.map((item, index) => <li key={index} className={classNames({
                            [styles.active]: current === item.code
                          })} onClick={() => setCurrent(item.code)}>{item.name}</li>)}
                          
                        </ul>}
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.border}>
                    <th className={styles.head}>
                       车型<br />
                      {specData?.name[0]?.NEDC ?divideByElement('NEDC纯电行驶里程（km）\n'):''}
                      {specData?.name[0]?.CLTC ?divideByElement('CLTC纯电行驶里程（km）\n'):''}
                      官方指导价
                      {specData?.name[0]?.discount ? divideByElement('\n 补贴后售价'):''}
                    </th>
                    {specData?.name.map((item, index) => 
                      <th key={index}>
                         <strong>{extractHtmlTag(item.model, true)}</strong>
                        {item.NEDC?<p>{item.NEDC}</p>:null}
                        {item.CLTC?<p>{item.CLTC}</p>:null}
                        {item.price && (formatPrice(item.price) ? <span>&yen;{formatPrice(item.price)}</span> : item.price)}
                        {item.discount? <><br />&yen;{formatPrice(item.discount)}</>:null}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {specData?.spec.map((spec, catIdx) => (
                    <Fragment key={catIdx}>
                      <tr className={classNames(styles.category, {
                        [styles.expand]: expand[catIdx]
                      })}>
                        <td colSpan={cols + 1}>
                          <div onClick={() => {
                            expand[catIdx] = !expand[catIdx]
                            setExpand([...expand])
                          }}><span>{spec.catalog}</span></div>
                        </td>
                      </tr>
                      {spec.content.map((list, index) => (
                        <tr key={index} className={classNames({
                          [styles.hide]: !expand[catIdx]
                        })}>
                          <th className={styles.head}>{extractHtmlTag(list.k, true)}</th>
                          {list.m ? 
                            mergeCell(list.v).map((item, index) => <td key={index} colSpan={item.span}>{extractHtmlTag(item.value)}</td>) :
                            list.v.map((value, index) => <td key={index}>{extractHtmlTag(value)}</td>)}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.remark}>
        {shared?(<div className={styles.more} >*企业用户{sharedText}车型<span onClick={() =>{ 
            setSpecShared(shared);
            setCurrent(shared[1]?.code)
            setMoreType(true)
            }}>参数配置</span>，敬请咨询别克当地授权经销商。</div>) : null}
          <div className={styles.content}>
            <div className={styles.legend}>注释：<br />“S”标准配置，“-”无，“O”选装配置<br />{divideByElement(remarkStr)}</div>
            <div>声明：<br />{declareStr}</div>
          </div>
          
        
        </div>
        {!data && <div className="loading">
          <SvgIcon icon="spin" />
          <span>正在加载</span>
        </div>}
      </div>
    </Overlay>
  )
}
