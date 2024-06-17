import React, { useCallback, useEffect, useRef, useState,FC } from "react";
import { useCarList, useProvince } from "@utils/request";
import { stringTozh, priceStr,modelStr } from "@utils/helper";
import AliImage from "@components/AlImage";
import Link from "next/link";
import styles from "@styles/components/morecarlist.module.scss";
import { BaiduLocation } from "./BaiduScript";
import { GetStaticProps } from "next";
import { getJsonFile } from "@utils/fs";
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
const MoreCarList = ({series,same,provinceJson,point}:{series?:string,provinceJson?:provType,point?:BaiduLocation,same?:boolean}) => {
  const [pid, setPid] = useState<string>();
  // const { data: provinceJson } = useProvince();
  const { data: carlist } = useCarList({brand:"别克", pagenum:1, pagesize:4, province:same? '':pid!,series,same});
  const [calcW, setCalcW] = useState<number>(0);
  const wrapWidth = useRef<HTMLDivElement>(null);
  const [wrapW,setWrapW] = useState<number>(0);
  useEffect(() => {
    setWrapW(Number(wrapWidth?.current?.clientWidth))
    // window.onresize = () => {
    //   setWrapW(Number(wrapWidth?.current?.clientWidth))
    // }
  },[wrapWidth])
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
  useEffect(() => {
    const proArr = provinceJson?.province;
    if (Array.isArray(proArr) && point) {
      const prov = proArr.find((item) => item.proname.indexOf(point.province) >= 0);
      if(prov){
        setPid(prov?.proid);
      }else{
        setPid(proArr[0].proid);
      }
    }
   
  }, [provinceJson,point]);
  useEffect(() => {
    //百度地图加载失败 默认数据
    const proArr = provinceJson?.province;
    if (Array.isArray(proArr)) {
      setPid(proArr[0].proid)
    }
  },[provinceJson])


  return (
    <div className={styles.moreList} ref={wrapWidth}>
      <ul className={styles.list}>
        {carlist?.cars?.map((item, index) => {
          return (
            <li key={index}>
              <Link href={{
                pathname: '/car-info',
                query: { id: item.vhclId }
              }}>
                <div className={styles.pic}>
                  <AliImage
                    width={calcW}
                    height={calcW / 4* 3}
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
            </li>
          );
        })}
      </ul>
      
      {!same && <div className={styles.link}><Link href="/application">更多车型</Link></div>}
    </div>
  );
};

export default MoreCarList;



