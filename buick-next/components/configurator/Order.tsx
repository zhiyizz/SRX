import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from '@styles/components/configurator-common.module.scss'
import AliImage from '@components/AlImage'

import type { SkuInfo } from './configurator'
import SvgIcon from '@components/icons'
import { combineUrl, formatPrice } from '@utils/helper'
import { useSearchParams } from 'next/navigation'
import PopOverlay from './PopOverlay'
import { trackEvent } from '@utils/tracking'


type PkgTypes = {
  show: boolean
  datas: SkuInfo
  price:number
  activityId:string
  onBack:(data:string)=>void
  orderBack:(data:boolean)=>void
}
type apiTypes = {
  envVersion:string
  page:string
  query?:string
  channelName:string | string[]
  source?:string
  width?:string
}

type skuDetailTypes = {
  skuId:string
}


const Order: FC<PkgTypes> = ({ show, datas,price,onBack,orderBack,activityId }) => {
  // const router = useRouter();
  const [wxCode,setWxCode] = useState<string>()
  const [popShow,setPopShow] = useState<boolean>(false)
  const [carPic,setCarPic] = useState<string>(null!)
  function editFN(name:string){
    onBack(name)
    orderBack(true)
    trackEvent('别克官网PC端-选配页-我的爱车结果页-编辑')
  }

  const searchParamss = useSearchParams()

  function getSkuList(params:skuDetailTypes){
    const getSkuDetail = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/SgmApi/GetSkuDetail?'+ new URLSearchParams(params)));
    return getSkuDetail.then(res=>res.json())
  }
  
  useEffect(()=>{
    const utmSource = searchParamss.get('utm_source')
    const source = utmSource ? `pz_buick_gw_${searchParamss.get('utm_term') || utmSource}` : 'pz_buick_gw';
    const osspUrl = encodeURIComponent(combineUrl(process.env.NEXT_PUBLIC_OSSP,`/buickev/#/selectPreview?seriesId=${datas.seriesId}&sku=${datas.skuCode}&type=3&activityId=${activityId}`));
    const search = location.search && '&'+location.search.substring(1)
    const params:apiTypes = {
      envVersion:'release', //develop trial release
      page:'pages/common/ossp_page/ossp_page',
      query:'url='+osspUrl+'&channel='+source+search,
      channelName:utmSource ?? 'Buick-OfficialSite'
    }
    const getMiniAppCode = fetch('/webapi/miniapp/wx/getminicode', {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(params)
    });
    getMiniAppCode.then(res=>{
      res.json().then(response=>{
        if(response.code == 1000){
          setWxCode(response.result)
        }else{
          alert(response.result)
        }
      })
    })
    getSkuList({
      skuId:datas.skuCode
    }).then((res)=>{
      setCarPic(res.obj.customize.orderdetailUrl)
    })
  },[activityId, datas.seriesId, datas.skuCode, searchParamss])

  return (
    <div className={classNames(styles.viewer, {
      [styles.config]: show
    })}>
      <div className={styles.order}>
        <div className={styles.summary}>
          <div className={styles.tools}>
            <div className={styles.btn} onClick={()=>{
              setPopShow(true)
            }}>
              <div className={styles.icon}><SvgIcon icon="arrow-up" /></div>
              <span>重新配置</span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={classNames(styles.title,styles.fontbold)}>配置明细</div>
            <div className={styles.list}>
              <div className={styles.item}>
                <p className={styles.fontbold}>{datas.skuName}</p>
                <p className={styles.price}>
                  <span>+&yen;{formatPrice(datas.attrList.PRICE_RANGE.attrValue)}</span>
                  <span className={styles.edit} onClick={()=>{
                    setPopShow(true)
                  }}><SvgIcon icon="edit" /></span>
                </p>
              </div>
              <div className={styles.item}>
                <p>{datas.attrList.COLOR_ID.imgUrl && <span className={styles.img}><AliImage src={datas.attrList.COLOR_ID.imgUrl} alt={datas.attrList.COLOR_ID.name} width={60} height={43} /></span>}{datas.attrList.COLOR_ID.name}</p>
                <p className={styles.price}>
                  { datas.attrList.COLOR_ID.price && datas.attrList.COLOR_ID.price != '0' ? 
                    datas.ticketFlag ? <><span className={styles.flag}>+&yen; {formatPrice(datas.attrList.COLOR_ID.price ?? 0)}</span><span>&yen;0</span></> : <span>+&yen; {formatPrice(datas.attrList.COLOR_ID.price ?? 0)}</span>
                    : 
                    <span>价格已包含</span>
                  }
                  <span className={styles.edit} onClick={()=>editFN('viewer')}><SvgIcon icon="edit" /></span>
                </p>
              </div>
              {datas.attrList.INNER_COLOR.attrValue !== "" && <div className={styles.item}>
                <p>{datas.attrList.INNER_COLOR.imgUrl && <span className={styles.img}><AliImage src={datas.attrList.INNER_COLOR.imgUrl} alt={datas.attrList.INNER_COLOR.name} width={60} height={43} /></span>}{datas.attrList.INNER_COLOR.name}</p>
                <p className={styles.price}>
                  { datas.attrList.INNER_COLOR.price && datas.attrList.INNER_COLOR.price != '0' ? 
                    <span>+&yen; {formatPrice(datas.attrList.INNER_COLOR.price ?? 0)}</span>
                    : 
                    <span>价格已包含</span>
                  }
                  <span className={styles.edit} onClick={()=>editFN('pano')}><SvgIcon icon="edit" /></span>
                </p>
              </div>}
              {datas.attrList.WHEEL.attrValue !== "" && <div className={styles.item}>
                <p>{datas.attrList.WHEEL.imgUrl && <span className={classNames(styles.img, styles['img-keep'])}><AliImage src={datas.attrList.WHEEL.imgUrl} alt={datas.attrList.WHEEL.name} width={60} height={60} /></span>}{datas.attrList.WHEEL.name}</p>
                <p className={styles.price}>
                  { datas.attrList.WHEEL.price && datas.attrList.WHEEL.price != '0' ? 
                    <span>+&yen; {formatPrice(datas.attrList.WHEEL.price ?? 0)}</span>
                    : 
                    <span>价格已包含</span>
                  }
                  <span className={styles.edit} onClick={()=>editFN('wheel')}><SvgIcon icon="edit" /></span>
                </p>
              </div>}
              <div className={styles.item}>
                <p><span className={styles.pkgicon}><i></i></span>选装包</p>
                <p className={styles.pkgs}>
                  {
                    Object.keys(datas.attrList).some((el)=> datas.attrList[el].pkgShow) ?
                    Object.keys(datas.attrList).map((el,idx)=> datas.attrList[el].pkgShow && <span key={idx} className={styles.row}>
                      <span>{datas.attrList[el].name}</span>
                      <span className={styles.price}>
                        <span>+&yen;{formatPrice(datas.attrList[el].price?? 0)}</span>
                        <span className={styles.edit} onClick={()=>editFN('pkg')}><SvgIcon icon="edit" /></span>
                      </span>
                    </span>)
                    :
                    <span className={styles.row}>
                      <span className={styles.price}>+&yen;0</span>
                      <span className={styles.edit} onClick={()=>editFN('pkg')}><SvgIcon icon="edit" /></span>
                    </span>
                  }
                </p>
              </div>
            </div>
            <div className={styles.total}>
              <span>总价</span>
              <div className={styles.price}>&yen;<span>{formatPrice(price)}</span></div>
            </div>
          </div>
        </div>
        <div className={styles.contract}>
          <h2 className={styles.title}>我的爱车</h2>
          <p className={styles.desc}>使用微信扫一扫，即刻把爱车带回家</p>
          <div className={styles.code}>
            {wxCode ? <AliImage src={wxCode} width={430} height={430} /> : <span className={styles.loading}><SvgIcon icon="spin" /></span>}
          </div>
          <div className={styles.car}>
            {carPic && <AliImage src={carPic} width={1500} height={800} />}
            <span>*所示版本图片仅供参考，以实际上市销售车辆为准</span>
          </div>
        </div>
      </div>
      { popShow && <PopOverlay showType="dialog" onShow={setPopShow} onBack={onBack} /> }
    </div>
  )
}
export default Order
