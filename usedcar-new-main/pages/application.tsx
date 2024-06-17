import BasePage from '@components/BasePage';
import React, { useState, useEffect, useCallback, FC,useRef } from 'react';
import SvgIcon from '@components/icons';
import Script from 'next/script';
import { FormDataType } from '@utils/types/trade';
import { carsType } from '@utils/types/carlist';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCarList } from '@utils/request';
import {  stringTozh, priceStr,modelStr } from '@utils/helper';
import AliImage from '@components/AlImage';
import styles from '@styles/application.module.scss'
import { DealerProvince } from '@utils/types/dealer';
import classNames from 'classnames';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { getJsonFile } from '@utils/fs';
import BaiduScript,{BaiduLocation} from '@components/BaiduScript';
import { trackPv } from '@utils/tracking';
const selectData = [
    {
      type:"车系",
      list:['君越', '君威', '威朗', '阅朗', '英朗', '英朗XT', '凯越', '荣御', '林荫大道', '赛欧', '昂科雷', '昂科威', '昂科拉', 'GL8', 'GL6', 'VELITE 5']
    },
    {
      type:"价格",
      list:["5万以下","5-10万","10-15万","15-20万","20-30万","30-50万","50万以上"]
    },
    {
      type:"车型",
      list:['SUV','乘用车']
    },
    {
      type:"车龄",
      list:['1年以下','1-3年','3-5年','5-8年','8年以上']
    },
    {
      type:"变速箱",
      list:['自动','手动','手自一体']
    },
   {
      type:"里程",
      list:['1万公里以内','1-3万公里','3-6万公里','6-10万公里','1-20万公里','20万公里以上']
    },
    {
      type:"排量",
      list:['1.0L及以下','1.1L-1.6L','1.7L-2.0L','2.1L-2.5L','2.6L-3.0L','3.1L-4.0L','4.0L以上']
    },
    {
      type:"颜色",
      list:['白色','银色','黑色','灰色','金色','橙色','黄色','红色','绿色','蓝色']
    },{
      type:"所在地"
    }
  ]
  let overlayData:any = {
    '车系':'',
    '价格':null,
    '车型':'',
    '年龄':null,
    '变速箱':'',
    '里程':null,
    '排量':null,
    '颜色':'',
    '所在地':''
  }

  type provType = {

      province:{
        proid : string
        proname : string
        propy : string,
        citys : {
          cityid : string
          citypy :  string
          cityname :  string
          }[]
        }[]
 

  }
const Application: FC<FormDataType & {provinceJson:provType}>  = ({ routerSource,provinceJson, onMapReady }) => {
  const [province, setProvince] = useState<string>();
  const [page, setPage] = useState(1);
  // const { data: provinceJson } = useProvince();
  const [pid, setPid] = useState<string>();

  const [list, setList] = useState<carsType[]>([]);
  const [listData,setSetListData] = useState<carsType[]>();
  const [calcW, setCalcW] = useState<number>(0);
  const wrapWidth = useRef<HTMLDivElement>(null);
  const [wrapW,setWrapW] = useState<number>(0);
  const [scrollEnd,setScrollEnd] = useState<boolean>(false);
  const [overlay_item_toggle,setOverlay_item_toggle] = useState<boolean[]>([]);
  const [series,setSeries] = useState<string>();
  const [price,setPrice] = useState<number | null>(null);
  const [model,setModel] = useState<string>();
  const [carold,setCarold] = useState<number | null>(null);
  const [gearbox,setGearbox] = useState<string>();
  const [carkm,setCarkm] = useState<number | null>(null);
  const [dspm,setDspm] = useState<number | null>(null);
  const [color,setColor] = useState<string>();
  const [sortBy,setSortBy] = useState<string>()
  const [orderBy,setOrderBy] = useState();
  const [sortSelect,setSortSelect] = useState<boolean | null>(null);
  const [overlaySubmit,setOverlaySubmit] = useState<boolean>(false);
  const [overlayShow,setOverlayShow] = useState<boolean>(false);
  const [resetData,setResetData] = useState<boolean>()
  const [tips,setTips] = useState<string>('暂无匹配车型')
  const [pos,setPos] = useState<BaiduLocation>();
  const { data: carlist,isLoading } = useCarList({ 
    brand: "别克", 
    pagenum: page, 
    pagesize: 12, 
    province: pid!,
    sortby:sortBy,
    orderby:sortBy ? sortSelect ? 'ASC':'DESC':'' , 
    series,
    price,
    model,
    carold,
    gearbox,
    carkm,
    dspm,
    color
  });
  useEffect(() => {
    trackPv('别克二手车-买车')
  },[])
  useEffect(() => {
    setWrapW(Number(wrapWidth?.current?.clientWidth))
    // window.onresize = () => {
    //   setWrapW(Number(wrapWidth?.current?.clientWidth))
    // }
  },[wrapWidth])
  useEffect(() => {
    setSetListData(carlist?.cars!)
  },[carlist])
  useEffect(() => {
    const wW = window.innerWidth;
    const len = 3;
    const itemW  = (wrapW-20 * len ) / 4;
    if (wW < 768) {
      setCalcW(210 / (4 / 3));
    }else{
      wrapW && setCalcW(itemW);
    }
  }, [wrapW]);

  const initBMap = useCallback(() => {
   
    const proArr = provinceJson?.province;
    if (Array.isArray(proArr)) {
      if (pos) {
        setList([]);
        const prov = proArr.find((item) => item.proname.indexOf(pos.province) >= 0);
        if (prov) {
          setPage(1);
          setPid('110000');
          setProvince(prov.proid)
          !carlist?.cars && setTips('此地区暂无车型')
          listData && setList(listData);
        } else {
          setPid(proArr[0].proid)
        }
      }
        // getCurrentPosition(function callback({ province, city }) {
        //    setList([]);
        //   const prov = proArr.find((item) => item.proname.indexOf(province) >= 0);
        //   if (prov) {
        //     setPage(1);
        //     setPid(prov.proid);
        //     setProvince(prov.proid)
        //     !carlist?.cars && setTips('此地区暂无车型')
        //     listData && setList(listData);
        //   }else{
        //     setPid(proArr[0].proid)
        //   }
        // })
      }
   
  }, [carlist?.cars, listData, pos, provinceJson?.province]);
  useEffect(() => {

      if(carlist && carlist?.cars?.length === 10){
        setScrollEnd(true)
      }else{
        setScrollEnd(false)
      }

  }, [carlist])
   useEffect(() => {

     const pro = sessionStorage.getItem("userLocateProvince");
     const proArr = provinceJson?.province;
     if (Array.isArray(proArr) && !pro) {
       setPid(proArr[0].proid)
       setProvince(proArr[0].proid)
     }
   }, [provinceJson])

  useEffect(() => {
    window.lbs = () => {
      onMapReady?.()
      initBMap();
    }
    return () => {
      delete window.lbs
    }
  }, [initBMap, onMapReady])

  useEffect(() => {
    if (!province) {
      initBMap()
    }
  }, [initBMap, province])

  const fetchMoreData = () => {
      setTimeout(() => {
        setPage(page + 1)
      }, 1500)
  }

  const itemFunc = (name:string,type:string,idx:number | null) => {
    if(overlayShow){
      overlayData[type]  = name || idx;
    }else{
      return false
    }
  }

  useEffect(() => {
    function siblings(item: HTMLSpanElement) {
      const p = item?.parentNode?.children;
      for (var i = 0, pl = p?.length; i < pl!; i++) {
        if (p?.[i] !== item) {           //删除自己
          p?.[i].classList.remove('active'); //执行事件
        }
      }
    }
    if(provinceJson){
      const list: NodeListOf<Element> = document.querySelectorAll('.overlayList');
      list.forEach(element => {
        const ele = element.querySelectorAll('span');
        ele.forEach((item) => {
          item.onclick = () => {
            siblings(item);
            item.classList.add('active');
          }
        })
      });
    }
   
  }, [provinceJson])

  const reset = () => {
    try {
      Object.keys(overlayData).forEach((key) => {
        if (overlayData[key]) {
          setResetData(true)
         // setList([]);
          overlayData = {
            '车系': '',
            '价格': null,
            '车型': '',
            '年龄': null,
            '变速箱': '',
            '里程': null,
            '排量': null,
            '颜色': '',
            '所在地': province
          }
        }
      })
    }catch(e){console.log(e)}
    const list: NodeListOf<Element> = document.querySelectorAll('.overlayList');
    list.forEach(element => {
      const ele = element.querySelectorAll('span');
      ele.forEach((item) => {
        item.classList.remove('active');
      })
    });
  }

  const oveylaySubmit = () => {
    if(resetData){
      setList([])
      setResetData(false)
    }
    Object.keys(overlayData).forEach((key) => {
      if(overlayData[key] || resetData){
        switch (key) {
          case '车系':
            setSeries(overlayData[key])
            break;
          case '价格':
            setPrice(overlayData[key])
            break;
          case '车型':
            setModel(overlayData[key])
            break;
          case '年龄':
            setCarold(overlayData[key])
            break;
          case '变速箱':
            setGearbox(overlayData[key])
            break;
          case '里程':
            setCarkm(overlayData[key])
            break;
          case '排量':
            setDspm(overlayData[key])
            break;
          case '颜色':
            setColor(overlayData[key])
            break;
          case '所在地':
            setPid(overlayData[key])
            break;
          default:
            break;
        }
        setPage(1)
      }
  
     
    })
    setOverlayShow(false)
    setOverlaySubmit(true)
  }

  useEffect(() => {
    if(isLoading && overlaySubmit){
      setList([])
      setOverlaySubmit(false)
    }
  },[isLoading,overlaySubmit])

  useEffect(() => {
    carlist?.cars && carlist?.cars.length >=1  && setList((arr) => [...arr, ...carlist?.cars])
  },[carlist?.cars])

  return (
    <BasePage kv={'kv4'} className={styles.application}>
      <BaiduScript onPosition={l => setPos(l)} />
      {/* <Script src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=IB2AMoqKRaNVXUOfnu03Ds2Q8cHa7rco&callback=lbs" /> */}
      <div className="container">
        <div className="wd">
          <div className={styles.select_nav}>
            <ul>
              <li onClick={() => {
                 if(sortBy || sortSelect !== null ){
                  setList([]);
                  }
                  setSortBy('')
                  setPage(1)
                  setSortSelect(null)
              }}><span>默认排序</span></li>
              <li className={sortBy==='lastTime' ? sortSelect ? styles.up : styles.down : ''} onClick={() => {
                if(carlist?.cars){
                  setSortBy('lastTime')
                  setSortSelect(!sortSelect)
                  setList([]);
                }
              }}><span>最新</span></li>
              <li className={sortBy==='signDate' ? sortSelect ? styles.up : styles.down : ''} onClick={() => {
                if (carlist?.cars) {
                  setSortBy('signDate')
                  setSortSelect(!sortSelect)
                  setList([]);
                }
              }}><span>车龄</span></li>
              <li className={sortBy==='price' ? sortSelect ? styles.up : styles.down : ''} onClick={() => {
                if(carlist?.cars){
                  setSortBy('price')
                  setSortSelect(!sortSelect)
                  setList([]);
                }
              }}><span>价格</span></li>
              <li className={sortBy==='mileage' ? sortSelect ? styles.up : styles.down : ''} onClick={() => {
                if(carlist?.cars){
                  setSortBy('mileage')
                  setSortSelect(!sortSelect)
                  setList([]);
                }
              }}><span>里程</span></li>
            </ul>
            <div className={styles.more} onClick={() => {       
                setOverlayShow(!overlayShow)
                setOverlaySubmit(false)
                setResetData(false)
          
            }}>筛选<SvgIcon icon={"select"} /></div>

            <div className={classNames(styles.select_overlay, {
              [styles.show]: overlayShow
            })}>
              <div className={styles.select_wrap}>
                <div className={styles.select_section}>
                  {
                    selectData.map((item, index) => {
                      return (
                        <div className={styles.select_group} key={index}>
                          <div className={classNames(styles.select_title, {
                            [styles.down]: overlay_item_toggle[index]
                          })} onClick={() => {
                            overlay_item_toggle[index] = !overlay_item_toggle[index]
                            setOverlay_item_toggle([...overlay_item_toggle])
                          }}>{item.type}</div>
                          {item.list ? (
                            <div className={classNames(styles.select_list, 'overlayList', {
                              [styles.show]: overlay_item_toggle[index]
                            })} >
                              <span className={styles.select_item} onClick={() => {
                                itemFunc('', item.type, null)
                              }} >不限</span>

                              {item.list?.map((item2, idx2) => {
                                return (
                                  <span key={idx2} className={classNames(styles.select_item, {
                                    //   [styles.active]:itemActive.name === item2
                                  })

                                  } onClick={() => {
                                    itemFunc(item2, item.type, (idx2 + 1))
                                  }}>{item2}</span>
                                )
                              })}
                            </div>
                          ) :
                            <div className={classNames(styles.select_list, 'overlayList', {
                              [styles.show]: overlay_item_toggle[index]
                            })} key={index} >
                              <span className={styles.select_item} onClick={() => {
                                itemFunc('', item.type, null)
                              }}>不限</span>
                              {provinceJson?.province?.map((item2, idx2) => {
                                return (
                                  <span key={idx2} className={styles.select_item} onClick={() => {
                                    itemFunc(item2.proid, item.type, (idx2 + 1))
                                  }}>{item2.proname}</span>
                                )
                              })}
                            </div>
                          }
                        </div>
                      )
                    })
                  }
                  <div className={styles['overlay-btns']}>
                    <div className={classNames(styles['overlay-btn'], styles.reset)} onClick={() => {
                      reset()
                    }}>重置</div>
                    <div className={classNames(styles['overlay-btn'], styles.submit)} onClick={() => {
                      oveylaySubmit()
                    }}>确定</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.select_list} ref={wrapWidth}>
            {list.length >=1 ? (
              <InfiniteScroll
              className={styles.grid}
              dataLength={list.length}
              next={fetchMoreData}
              hasMore={carlist?.cars.length===10}
              loader={scrollEnd ? <p>Loading...</p> : null}
            >
              {list?.map((item, index) => {
                return (
                  <div key={index} className={styles.item}>
                    {/* <Link href={{
                      pathname:'/car-info',
                      query:{id:item.vhclId}
                    }}> */}
                    <Link href={{
                      pathname:'/car-info',
                      query:{id:item.vhclId}
                    }}>
                      <div className={styles.pic}>
                        <AliImage
                          width={calcW}
                          height={calcW /4 *3}
                          className={styles.image}
                          src={"https:" + item.pic45}
                          alt=""
                        />
                      </div>
                      <div className={styles.info}>
                        <h6 className={styles.title}>
                          {item.series + " " + modelStr(item.model)}
                        </h6>
                        <div className={styles.sign}>
                          <p>
                            {stringTozh(item.signDate)} | {item.dspm}万公里
                          </p>
                          <p>所在地:{item.vehicleCity}</p>
                        </div>
                        <div className={styles.price}>
                          <sub>￥</sub>
                          <span>{priceStr(item.price)}</span>万元
                        </div>
                      </div>
                    </Link>
         
                  </div>
                )
              })}
            </InfiniteScroll>
            ): (
              isLoading?<p className={styles.tips}>数据加载中...</p>:<p className={styles.tips}>{tips}</p>
            )}
       
          </div>
        </div>
      </div>
    
    </BasePage>
  );
};

export default Application;


export const getStaticProps: GetStaticProps<any> = async (context) => {
  try {
     const provinceJson:provType = getJsonFile(`data/province`)
     return {
        props: {
          provinceJson,
        },
        revalidate: 21600,
     }
  } catch (ex) {
     console.error(ex)
     return {
        props: {
          provinceJson: ''
        }
     }
  }
}


