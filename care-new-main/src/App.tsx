import Kv from './components/Kv';
import SvgIcon from './components/icons';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { trackPv } from '@futian/buick-components';
import { getImageUrl } from './utils/getImageUrl';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import p1 from './img/home/p1.jpg'
import  './App.scss'
import { Navigation, Pagination, Grid } from 'swiper/modules';
import {Link} from 'react-router-dom';


export default function Home() {

  useEffect(() => {
    trackPv('别克关怀-首页')
  }, [])
  const scrollClick = (e: number) => {
    const list = document.querySelectorAll('.section');
    window.scrollBy({
      top: list[e].getBoundingClientRect().top,
      behavior: "smooth",
    })
  }
  return (

    <div className="home-wrap">
      <Kv media={[{
        "pc": "./img/home/kv.jpg",
        "mob": "./img/home/mob/kv.jpg",
        "subTitle": "别克关怀",
        "title": "比你更关心你"
      }, {
        "pc": "./img/home/kv2.jpg",
        "mob": "./img/home/mob/kv2.jpg",
        "url":"/promotion"
        
      }
      ]} />
      <div className={"server"}>
        <div className={classNames('care-title')}>
      
          <div className={classNames('en')}>SERVICE COMMITMENT</div>
          <h2 >服务承诺</h2>
        </div>
        <div className="content">
          <div className="item" onClick={() => scrollClick(0)}>
            <SvgIcon icon="quality" />
            <div className='text'>
              <h2>专业品质</h2>
              <p>只为信得过的放心</p>
            </div>
          </div>
          <div className="item" onClick={() => scrollClick(1)}>
            <SvgIcon icon="safety" />
            <div className='text'>
              <h2>全程透明</h2>
              <p>只为看得见的安心</p>
            </div>
            
          </div>
          <div className="item" onClick={() => scrollClick(2)}>
            <SvgIcon icon="convenient" />
            <div className='text'>
              <h2>方便快捷</h2>
              <p>只为全天候的关心</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames( 'section')}>
        <picture>
          <source srcSet={getImageUrl('./img/home/p1.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/home/mob/p1.jpg')} alt="" />
        </picture>
        <div className="content">
          <h2>专业品质</h2>
          <p>只为信得过的放心</p>
        </div>
        <div className="swiper-wrap">
          <Swiper
            // install Swiper modules
            breakpoints={
              {
                320: {
                  slidesPerView: 2,
                  grid: { rows: 2 },
                  spaceBetween: 30
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
              }
            }
            // slidesPerView={2}
            // grid={{
            //   rows: 2,
            // }}
            navigation
            // spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            slidesPerGroup={4}
            modules={[Grid, Navigation, Pagination]}
          >
            <SwiperSlide>
              <h2><span>-</span>专业修养技术<span>-</span></h2>
              <p>为车主提供专业的保养<br />维修和钣金喷漆等服务</p>
              <Link to='professional' className='more'>查看详情</Link>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>原厂质保服务<span>-</span></h2>
              <p>整车及动力总成3年10万公里<br />*自2023年9月1日起</p>
              <Link to='/maintenance' className='more'>查看详情</Link>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>纯正配件<span>-</span></h2>
              <p>严格管控配件的纯正性<br />来源信息可追溯</p>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>专属服务管家<span>-</span></h2>
              <p>专属服务管家在线<br />专业团队保驾护航</p>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>七星人员认证<span>-</span></h2>
              <p>贴心服务团队<br />与专业技术团队</p>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>关怀优选季<span>-</span></h2>
              <p>当季优惠服务礼包<br />*购买时间及具体套餐内容<br />以季度活动公布为准</p>
              <Link to='/promotion' className='more'>查看详情</Link>
            </SwiperSlide>
            <SwiperSlide>
              <h2><span>-</span>58分钟专业快保<span>-</span></h2>
              <p>58分钟内<br />为车主提供优质高效的服务</p>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className={classNames( 'section')}>
        <picture>
          <source srcSet={getImageUrl('./img/home/p2.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/home/mob/p2.jpg')} alt="" />
        </picture>
        <div className="content">
          <h2>全程透明</h2>
          <p>只为看得见的安心</p>
        </div>
        <div className="swiper-wrap">
          <Swiper
            // install Swiper modules
            breakpoints={
              {
                320: {
                  slidesPerView: 2,
                  grid: { rows: 2 },
                  spaceBetween: 30
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
              }
            }
            navigation

            pagination={{
              clickable: true,
            }}
            slidesPerGroup={4}
            modules={[Grid, Navigation, Pagination]}
          >
            <SwiperSlide>
              
              <h2><span>-</span>透明车间<span>-</span></h2>
              <p>车辆维保期间<br />查看实况维保进程</p>
              <Link to='/workshop' className='more'>查看详情</Link>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>车联车控<span>-</span></h2>
              <p>免费5年使用远程<br />车联车控等服务</p>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>维保记录在线查询<span>-</span></h2>
              <p>过往维保记录查询<br />一手掌控爱车状况</p>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>实时车况提醒<span>-</span></h2>
              <p>实时车况主动提醒<br />出行无忧一路放心</p>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>

      <div className={classNames( 'section')}>
        <picture>
          <source srcSet={getImageUrl('./img/home/p3.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/home/mob/p3.jpg')} alt="" />
        </picture>
        <div className="content">
          <h2>方便快捷</h2>
          <p>只为全天候的关心</p>
        </div>
        <div className="swiper-wrap">
          <Swiper
            // install Swiper modules
            breakpoints={
              {
                320: {
                  slidesPerView: 2,
                  grid: { rows: 2 },
                  spaceBetween: 30
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
              }
            }
            navigation
            pagination={{
              clickable: true,
            }}
            slidesPerGroup={4}
            modules={[Grid, Navigation, Pagination]}
          >
            <SwiperSlide>
              
              <h2><span>-</span>上门取送车<span>-</span></h2>
              <p>足不出户<br />完成爱车保养检修</p>
              <Link to='/delivery' className='more'>查看详情</Link>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>一键预约<span>-</span></h2>
              <p>一键预约维保等服务<br />尊享便捷养车</p>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>24小时道路救援<span>-</span></h2>
              <p>在用户的紧急时刻<br />给予坚定的支持<br />紧急救援电话：<br />400-820-2020</p>
            </SwiperSlide>
            <SwiperSlide>
              
              <h2><span>-</span>星月服务<span>-</span></h2>
              <p>夜间高品质服务<br />从容享受关怀服务</p>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>

      <div className="section enuity">
        <Link to='/equity' className='more'>
          <picture>
            <source srcSet={getImageUrl('./img/home/enuity.jpg')} media='(min-width: 768px)' />
            <img src={getImageUrl('./img/home/mob/enuity.jpg')} alt="" />
          </picture>
        </Link>
        {/* <div className="content">
          <h2>别克新能源专属服务</h2>
          <Link to='/equity' className='more'>
           <img src={getImageUrl('./img/home/enuity_btn.png')} width={300} height={300} alt="" />
          </Link>
        </div> */}
        {/* <div className="items">
          <div className="item">
          
            <div className="copy">
              <h2><span>-</span>全时响应<span>-</span></h2>
              <p>人工客服7*24小时全时响应<br />碰撞自动求助</p>
            </div>
          </div>
          <div className="item">
            
            <div className="copy">
              <h2><span>-</span>上门取送<span>-</span></h2>
              <p>一年内4次免费<br />同城上门取送车服务</p>
            </div>
          </div>
          <div className="item">
           
            <div className="copy">
              <h2><span>-</span>一键加电<span>-</span></h2>
              <p>一年内2次的上门取送车<br />并代客加电服务</p>
            </div>
          </div>
          <div className="item">
           
            <div className="copy">
              <h2><span>-</span>车联无忧<span>-</span></h2>
              <p>远程车控、车况查询、<br />月度车况检测报告</p>
            </div>
          </div>
          <div className="item">
           
            <div className="copy">
              <h2><span>-</span>代步服务<span>-</span></h2>
              <p>凭超24小时工单可享<br />至多三天B级代步车服务</p>
            </div>
          </div>
          <div className="item">
           
            <div className="copy">
              <h2><span>-</span>代驾服务<span>-</span></h2>
              <p>一年内4次同城<br />30KM内的代驾服务</p>
            </div>
          </div>
        </div> */}
      </div>
      
    </div>

  )
}
