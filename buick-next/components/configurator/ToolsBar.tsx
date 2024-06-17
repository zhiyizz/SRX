import classNames from 'classnames'
import styles from '@styles/components/configurator-common.module.scss'
import { formatPrice } from '@utils/helper'
import SvgIcon from '@components/icons'
import { trackEvent } from '@utils/tracking'
import { useSearchParams } from 'next/navigation'
import type { SkuInfo } from './configurator'
import { useSelector } from 'lib/redux'

type ToolsType = {
  datas?:SkuInfo,
  navType:string,
  isOrder:boolean,
  isBack:boolean,
  name:string
  activityId:string
  price:string | number
  btnClick:(type:string)=>void
  detailShow:(show:boolean)=>void
}
type apiTypes = {
  envVersion:string
  page:string
  query?:string
  channelName:string | string[]
  source?:string
  width?:string
}
export default function ToolsBar({isOrder = false,isBack = false,name,price,btnClick,detailShow,navType,datas,activityId}:ToolsType) {
  
  const isMobile = useSelector(state => state.global.isMobile)

  const searchParamss = useSearchParams()

  function getMiniUrl(){
    if(!datas) return
    const utmSource = searchParamss.get('utm_source')
    const source = utmSource ? `pz_buick_gw_${searchParamss.get('utm_term') || utmSource}` : 'pz_buick_gw';
    const osspUrl = encodeURIComponent(`https://ossp.saic-gm.com/buickev/#/selectPreview?seriesId=${datas.seriesId}&sku=${datas.skuCode}&type=3&activityId=${activityId}`);
    const search = location.search && '&'+location.search.substring(1)
    const params:apiTypes = {
      envVersion:'release',
      page:'pages/common/ossp_page/ossp_page',
      query:'url='+osspUrl+'&channel='+source+search,
      channelName:utmSource ?? 'Buick-OfficialSite'
    }
    const getMiniAppCode = fetch('/webapi/miniapp/wx/getminiurl ', {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(params)
    });
    getMiniAppCode.then(res=>{
      res.json().then(response=>{
        if(response.code == 1000){
          window.location.href = response.result
        }else{
          alert(response.result)
        }
      })
    })
  }

  return (
    <>
      {(!isMobile && navType === 'order') ? null : <div className={classNames(styles.toolsbar,{
        [styles.fixed]:isMobile
      })}>
        {!isMobile && <div className={styles.buy}>
          <h3 className={styles.carname}>{name}</h3>
          <p>所示版本图片仅供参考，以实际上市销售车辆为准</p>
        </div>}
        <div className={classNames(styles.buttons,{
            [styles.center]: navType === 'carType' || isOrder && !isBack,
        })}>
          {isBack && <div className={classNames(styles.btn,styles.back)} onClick={()=>{
            btnClick('prev')
            trackEvent('别克官网PC端-选配页-返回上一步')
          }}>返回上一步</div>}
          
          { navType === 'order' ? <div className={classNames(styles.btn,{
            [styles.fill]:isBack
          })} onClick={()=>{
            getMiniUrl()
            trackEvent(`别克官网PC端-选配页-立即定购`)
          }}>
            立即定购
          </div> 
          :
          <div className={classNames(styles.btn,{
            [styles.fill]:isBack
          })} onClick={()=>{
            btnClick('next')
            trackEvent(`别克官网PC端-选配页-${isOrder ? '完成配置': (isBack ? '继续配置':'开始配置')}`)
          }}>
            {isOrder ? '完成配置': (isBack ? '继续配置':'开始配置')}
          </div> }
        </div>
        <div className={styles.total}>
          { isBack &&
              <>
                {(isMobile && navType === 'order') ? null : <div className={styles.info} onClick={()=>{
                  detailShow(true)
                  trackEvent('别克官网PC端-选配页-查看明细')
                }}>
                  <span>查看明细</span>
                  <SvgIcon className={styles.icon} icon="arrow-up" />
                </div> }
                <div className={styles.price}>
                  <span>&yen;{formatPrice(price)}</span>
                </div>
              </>
          }
        </div>
      </div>}
    </>
  )
}
