'use client'

import { useEffect, useState} from 'react';
import styles from '@styles/components/configurator-common.module.scss';
import type { NextPage } from 'next'
import CarType from '@components/configurator/CarType';
import SubNav from '@components/configurator/SubNav';
import ToolsBar from '@components/configurator/ToolsBar';
import Pano from '@components/configurator/Pano';
import Viewer from '@components/configurator/Viewer';
import Wheel from '@components/configurator/Wheel';
import type { AdditionalPkg, GetSkuInfo, MscAttr, SkuInfo, SpuInfo } from '@components/configurator/configurator';
import PkgList from '@components/configurator/PkgList';
import Order from '@components/configurator/Order';
import classNames from 'classnames';
import { combineUrl } from '@utils/helper';
import PopOverlay from '@components/configurator/PopOverlay';
import SvgIcon from '@components/icons';
import { trackPv } from '@utils/tracking';
import { setTheme, useDispatch, useSelector } from 'lib/redux';

const navListDefault = [
  {
    name: '版本',
    key: 'carType',
  },
  {
    name: '外观',
    key: 'viewer',
  },
  {
    name: '内饰',
    key: 'innerColor',
  },
  {
    name: '轮毂',
    key: 'wheel',
  },
  {
    name: '选装包',
    key: 'pkg',
  },
  {
    name: '订单',
    key: 'order',
  }
]

type apiTypes = {
  seriesId:string
  activityId?:string
  spuId?:string
  colorId?:string
  wheel?:string
  innerColor?:string
}

const Configurator:NextPage<{
  code: string
  seriesId: string
}> = ({ code, seriesId })  => {
  // const router = useRouter();
  const [currentType, setCurrentType] = useState<string>('carType');//当前导航选择
  // const [currentSeries, setCurrentSeries] = useState<SeriesObject>()

  const [spuData,setSpuData] = useState<SpuInfo[]>()//车型数据
  const [skuData,setSkuData] = useState<GetSkuInfo[]>()//车型SKU数据
  const [findSkuData,setFindSkuData] = useState<SkuInfo[]>()//车型SKU数据
  const [findData,setFindData] = useState<SkuInfo>()//SKU匹配数据
  
  const [colorGroup,setColorGroup] = useState<MscAttr[]>()//车色数据
  const [wheelGroup,setWheelGroup] = useState<MscAttr[]>()//轮毂数据
  const [innerGroup,setInnerGroup] = useState<MscAttr[]>()//内饰数据
  const [pkgsGroup,setPkgsGroup] = useState<AdditionalPkg[]>()//选装包数据

  const [selectedColor,setSelectedColor] = useState<MscAttr>()
  // const [selectedWheel,setSelectedWheel] = useState<MscAttr>()
  const [selectedInner,setSelectedInner] = useState<MscAttr>()
  const [selectedPkg,setSelectedPkg] = useState<AdditionalPkg[]>([])

  const [popShow,setPopShow] = useState<boolean>(false)
  const [price,setPrice] = useState<number>(0)
  const [curSpuIdx,setCurSpuIdx] = useState<number>(0)
  const [isGetSku,setIsGetSku] = useState<boolean>(false)
  const [orderBack,setOrderBack] = useState<boolean>(false)
  const [ticketFlag,setTicketFlag] = useState<boolean>(false)
  const [isLoad,setIsLoad] = useState<boolean>(true)
  const [actId,setActId] = useState<string>(null!)

  // const [seriesId, setSeriesId] = useState<string>(null!)
  // const [code, setCode] = useState<string>()
  const [navList, setNavList] = useState<{
    name:string
    key:string
  }[]>()

  const dispatch = useDispatch()
  const isMobile = useSelector(state => state.global.isMobile)

  useEffect(() => {
    if (/^electra/.test(code) || /^velite/.test(code)) {
      dispatch(setTheme('blue'))
    }
    return () => {
      dispatch(setTheme('red'))
    }
  }, [code, dispatch])

  // useEffect(() => {
  //   // if(!router.isReady) return
  //   const seriesParam = searchParams.get('series')
  //   if(seriesParam){
  //     const currentSeries = series.find(s => s.code === seriesParam)!
  //     if(!currentSeries || !currentSeries.flags?.configurator){
  //       router.push('/'+seriesParam);
  //     }else{
  //       setSeriesId(String(currentSeries.carID || currentSeries.carId))
  //       !Array.isArray(seriesParam) && setCode(seriesParam)
  //       setCurrentSeries(currentSeries)
  //     }
  //   }else{
  //     router.push('/');
  //   }
    
    
  // }, [router, searchParams, series])

  function toolBtnFn(res:string){
    if(!orderBack && navList){
      let idx = navList.findIndex(el => el.key === currentType)
      res == 'next' ? idx++ : idx--
      return setCurrentType(navList[idx].key)
    }else{
      return setCurrentType('order')
    }
  }

  useEffect(()=>{
    if(!seriesId) return
    const params:apiTypes = {seriesId}
    const getActivityId = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/SgmApi/GetActivityId?'+ new URLSearchParams(params)));
        getActivityId.then(res=>{
          res.json().then(response=>{
            if(response.code == 200){
              setActId(response.obj)
            }
          })
        })
   },[seriesId])

   useEffect(()=>{
    if(actId){
      const params:apiTypes = {
        activityId:actId,
        seriesId
      }
      const getSpu = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/SgmApi/GetSpuList?'+ new URLSearchParams(params)));
          getSpu.then(res=>{
            res.json().then(response=>{
              if(response.code == 200){
                setSpuData(response.obj)
                setIsLoad(false)

                const delArr: typeof navListDefault = []
                Object.keys(response.obj[0]).forEach(key =>{
                 if(response.obj[0][key] === ''){
                  const arr = navListDefault.find(item => item.key === key);
                  arr && delArr.push(arr)
                 }
                })
                const list = navListDefault.filter((item)=> !delArr.some((ele)=> ele.key === item.key))
                setNavList(list)
              }
            })
          })

      const getTicketFlag = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/SgmApi/GetTicketFlag?'+ new URLSearchParams(params)));
          getTicketFlag.then(res=>{
            res.json().then(response=>{
              if(response.code == 200){
                setTicketFlag(response.obj)
              }
            })
          })
    
    }
   },[actId, seriesId])

  useEffect(()=>{
    function getSkuList(params:apiTypes){
      setIsLoad(true)
      const getSku = fetch(combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/SgmApi/GetSkuList?'+ new URLSearchParams(params)));
      return getSku.then(res=>res.json())
    }
    function skuSortFn(datas:GetSkuInfo[]){
      const newData:SkuInfo[] = datas.map((el) => {
        const pkgData = Object.fromEntries(el.additionalPkgs.map(el => [el.attrCode, {
          attrValue:el.attrValue,
          name:el.attrName,
          price:el.price,
          pkgShow:el.attrValue == '1'
        }]));
        const attrData = Object.fromEntries(el.attrList.map(el => ([el.attrCode, {
          attrValue:el.attrValue,
          name:el.showName,
          price:el.valueAddition,
          imgUrl:el.imgUrl?.split(',')[0]
        }])));
  
        const price = parseInt(el.price.settlementPrice)
        return {
          attrList:{...pkgData,...attrData},
          price,
          ticketFlag:ticketFlag ? attrData.LIMIT_COLOR.attrValue == '1' : false,
          skuName:el.skuName,
          skuCode:el.skuCode,
          seriesId:el.attrObj.seriesId
        }
      });
      setFindSkuData(newData)
    }
    
    if(navList){
      const idx = navList.findIndex(el => el.key === currentType)
      if(curSpuIdx && isGetSku && idx == 0){
        setIsGetSku(false)
      }else if(!isGetSku && idx > 0 && Array.isArray(spuData)){
        const code = spuData[curSpuIdx].spuCode;
        const param = {
          seriesId,
          activityId:actId,
          spuId:code
        }
  
        getSkuList(param).then((res)=>{
          setSkuData(res.obj)
          skuSortFn(res.obj)
  
          const colorsSort = res.colorIdGroup.sort((a:MscAttr,b:MscAttr) =>{ 
            return parseInt(a.attrValue) - parseInt(b.attrValue)
          })
          setColorGroup(colorsSort)
          setPkgsGroup(res.pkgsGroup)
          setIsGetSku(true)
          setIsLoad(false)
        })
      }
    }
    
  },[curSpuIdx, spuData, currentType, isGetSku, ticketFlag, actId, seriesId, navList])

  useEffect(()=>{
    if(findData){
      const colorPrice = parseInt(findData.attrList.COLOR_ID.price ?? '0');
      const number = findData.ticketFlag ? findData.price - colorPrice : findData.price
      setPrice(number)
    }
  },[findData])

  useEffect(()=>{
    if(skuData){
      const configData: Record<string, MscAttr>[] = []
      const datas = skuData.filter(skuEl => skuEl.attrList.find(el=> el.attrValue === selectedColor?.attrValue))
      datas.map(el=>{
        const attrData = Object.fromEntries(el.attrList.map(el => ([el.attrCode, {...el}])));
        configData.push(attrData)
      })
      // if(configData.length > 1){
        const newData = configData.reduce<Record<string, MscAttr[]>>((pre, cur)=>{
          const res = { ...pre }
          Object.keys(cur).forEach(key => {
            let oldArr = res[key] // 数据集合 Array
            const newVal = cur[key] // 单个元素 item
            if (oldArr) {
              const equal = oldArr.some((item) => {
                return Object.keys(item).every(k => item[k] === newVal[k])
              })
              if (!equal) {
                oldArr.push(newVal)
              }
            } else {
              oldArr = [newVal]
            }
            res[key] = oldArr
          })
          return res
        }, {})

        !selectedInner && setInnerGroup(newData.INNER_COLOR)

        const wheelData:MscAttr[] = []
        newData.WHEEL && newData.WHEEL.forEach((element:MscAttr,idx:number) => {
          element.carPic = newData.CAR_WHEEL_PIC[idx].attrValue
          wheelData.push(element)
        });
        if(wheelData.length > 0){
          setWheelGroup(wheelData)
        }
      // }else{
      //   configData[0] && setInnerGroup([configData[0].INNER_COLOR])
      // }
    }
  },[selectedColor?.attrValue, selectedInner, skuData])

  useEffect(()=>{
    if(findSkuData){
      const selected = [...selectedPkg, selectedColor, selectedInner]
      const data = findSkuData?.find(skuEl => {
        return selected.every(sEl=> {
          if(sEl){
            return skuEl.attrList[sEl.attrCode].attrValue === sEl.attrValue
          }
          return true
        })
      })
      setFindData(data)
    }
  },[selectedPkg, selectedColor, selectedInner, findSkuData])

  useEffect(()=>{
    if(currentType == 'carType'){
      setOrderBack(false)
      setFindSkuData(null!)
      setSkuData(null!)
      setColorGroup(null!)
      setPkgsGroup(null!)
      setSelectedInner(null!)
      setSelectedPkg([])
      setIsGetSku(false)
    }
    if(!navList) return
    const cruNav = navList.find(el=> el.key === currentType)
    if (cruNav) {
      trackPv(`别克官网PC端-选配页-${cruNav.name}`)
    }
  },[currentType, navList])

  return (
    // <BasePage className={styles.main} title={currentSeries?.displayName || currentSeries?.name} seriesData={series} code={code} categoryList={category} navPosition="fixed" theme={/^electra/.test(code!) || /^velite/.test(code!) ?  "blue" : "red"}>    
    <main className={classNames(styles.main, {
      'theme-blue': /^electra/.test(code) || /^velite/.test(code),
    })}>
      { (navList && currentType != 'order') &&  <SubNav list={navList} defaultType={currentType} navClick={setCurrentType} />}

      <div className={classNames(styles.container,{
        [styles['auto-height']]:currentType === 'order' || isMobile
      })}>
        { isLoad &&  <div className={styles.loading}><SvgIcon icon="spin" /></div>}
        { spuData && <CarType show={currentType === 'carType'} onCurrent={setCurSpuIdx} datas={spuData} /> }
        
        { colorGroup && spuData && <Viewer show={currentType === 'viewer'} name={spuData[curSpuIdx]?.spuName} datas={colorGroup} ticketFlag={findData?.ticketFlag ?? false} onSelectColor={setSelectedColor} /> }
        
        { innerGroup && <Pano show={currentType === 'innerColor'} datas={innerGroup} onSelectInner={setSelectedInner} /> }

        { wheelGroup && spuData && <Wheel show={currentType === 'wheel'} name={spuData[curSpuIdx]?.spuName} datas={wheelGroup} /> }

        { pkgsGroup && <PkgList show={currentType === 'pkg'}  datas={pkgsGroup} onSelecPkg={setSelectedPkg} /> }
        
        { currentType === 'order' && findData && <Order show={currentType === 'order'} datas={findData} onBack={setCurrentType} orderBack={setOrderBack} price={price} activityId={actId} />}
        
      </div>
      { spuData && <ToolsBar navType={currentType} isOrder={currentType == 'pkg' || orderBack} isBack={currentType != 'carType' && !orderBack} btnClick={toolBtnFn} name={spuData[curSpuIdx]?.spuName} price={price} detailShow={setPopShow} datas={findData} activityId={actId} /> }
      
      { popShow && <PopOverlay price={price} datas={findData} onShow={setPopShow} /> }

    </main>
  );
};





export default Configurator;
