import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useCarInfo } from '@utils/request';
import BasePage from '@components/BasePage';
import Link from 'next/link';
import Script from 'next/script';
import { Swiper, SwiperSlide } from 'swiper/react';
import AliImage from '@components/AlImage';
import { priceStr } from '@utils/helper';
import BaiduMap from '@components/BaiduMap'
import MoreCarList from '@components/MoreCarList';
import { Navigation } from 'swiper'
import styles from '@styles/carinfo.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { GetStaticProps } from 'next';
import { getJsonFile } from '@utils/fs';
import BaiduScript,{BaiduLocation} from '@components/BaiduScript';

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
const Carinfo = ({provinceJson}:{provinceJson:provType}) => {
  const router = useRouter();
  const { data, isLoading } = useCarInfo(router.query.id! as string)
  const [pos, setPos] = useState<BaiduLocation>()
  return (
    <div >
      <BasePage kv={'kv4'} className={styles.carinfo}>
       <BaiduScript onPosition={l => setPos(l)} />
        <div className="container">
          {data && (
            <>
            <div className={styles['head-info']}>
              <div className={styles.pics}>
                <Swiper autoHeight navigation modules={[Navigation]}>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.left45} alt="" width={375}/></SwiperSlide>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.right45} alt="" width={375} /></SwiperSlide>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.side} alt="" width={375} /></SwiperSlide>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.behind} alt="" width={375} /></SwiperSlide>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.engine} alt="" width={375} /></SwiperSlide>
                  <SwiperSlide className={styles.item}><AliImage src={`https:` + data?.pics?.front} alt="" width={375} /></SwiperSlide>
                </Swiper>
              </div>
              <div className={styles.data}>
                <h3>{data.series} {data.model}</h3>
                <div className={styles.price}>
                  <span>{priceStr(data.price)}</span>
                  万元
                </div>
                <ul className={styles.message}>
                  <li>
                    <span>上牌时间</span>
                    <p>{data.signDate.replaceAll('/','-')}</p>
                  </li>
                  <li>
                    <span>上架时间</span>
                    <p>{data.realsingDate}</p>
                  </li>
                  <li>
                    <span>行驶里程</span>
                    <p>{(Number(data.mileage) / 10000).toFixed(1)}公里</p>
                  </li>
                  <li>
                    <span>排量</span>
                    <p>{data.dspm}T</p>
                  </li>
                </ul>
                <div className={styles['testdrive-btn']}>
                <Link href={{
                  pathname:'/car-submit',
                  query:{
                    code:data.dealer.VendorCode,
                    series:data.series,
                    color:data.color,
                    province:data.dealer.province,
                    city:data.dealer.city
                  }
                }}>预约看车</Link>
                </div>
              </div>
            </div>
            
            <div className='wd'>
   
              
              <div className={styles['info-data']}>
                  <div className="sub-title">基础信息</div>
                  <ul>
                    <li>
                      <span>车牌所属地</span>
                      <p>{data.licenseCity}</p>
                    </li>
                    <li>
                      <span>车辆颜色</span>
                      <p>{data.color}</p>
                    </li>
                    <li>
                      <span>表面里程</span>
                      <p>{(Number(data.mileage) / 10000).toFixed(1)}公里</p>
                    </li>
                    <li>
                      <span>过户次数</span>
                      <p>{data.circulationTimes}次</p>
                    </li>
                    <li>
                      <span>使用类型</span>
                      <p>{data.vhclType}</p>
                    </li>
                    <li>
                      <span>所在地址</span>
                      <p>{data.vehicleCity}</p>
                    </li>
                    <li>
                      <span>年检到期</span>
                      <p>{data.examDueDate ? data.examDueDate.substring(0, 4) + '.' + data.examDueDate.substring(4) : '无'}</p>
                    </li>
                    <li>
                      <span>保险到期</span>
                      <p>{data.insureDate == "" ? "无" : data.insureDate.substring(0, 4) + '.' + data.insureDate.substring(4)}</p>
                    </li>
                  </ul>
              </div>
              <div className={styles['pics-col']}>
                <div className="sub-title">车辆图片</div>
                <div className={styles.list}>
                  {data.addition_pics.map((item,idx) =>  <AliImage key={idx} src={`https:` + item} alt="" width={375} />)}
                </div>
               
             
              </div>
              <div className={styles.dealer}>
                <div className="sub-title">经销商信息</div>

                <BaiduMap styles={styles} data={data.dealer} exteral />
              </div>
              <div className={styles.moreList}>
                <div className="sub-title">同车系-其他二手车车源</div>
                <MoreCarList series={"君威"} same={true} provinceJson={provinceJson} point={pos} />
              </div>
            </div>
           
            </>
          )}

        </div>
      </BasePage>
    </div>
  );
};

export default Carinfo;

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
