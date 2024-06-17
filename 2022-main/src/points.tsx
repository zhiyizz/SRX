import React from 'react';
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation,Pagination,EffectCoverflow } from "swiper";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import img1 from './assets/points/img1.jpg';
import img2 from './assets/points/img2.jpg';
import './styles/points.scss';
 import s1 from './assets/points/s1.png';
 import s2 from './assets/points/s2.png';
 import s3 from './assets/points/s3.png';
 import s4 from './assets/points/s4.png';
 import s5 from './assets/points/s5.png';
 import arrow from './assets/points/arrow.png';

const points = () => {

  return (
    <div className='act-container points'>
      <div className='wrap'>
        <div className='group'>
          <div className='copy'>
            <h3 className='title'>线上积分赛</h3>
            <h4 className='sub-title'>长达8个月主题调整，赢积分兑大奖。</h4>
            <p>别克跑团联赛通过“互联网+”的方式进行线上线下的渗透，最大程度覆盖全国各城市。</p>
            <p>线上赛每月1日开启当月任务。全国跑者可通过iBuick APP和悦跑圈APP线上渠道打卡月度跑步任务，并通过跑步积分兑换纪念奖牌别克品牌限量精美礼品及赛事运动周边。</p>
            <p>活动时间：<br />2022年5月1日10:00-2022年12月31日23:59</p>
          </div>
          <div className='pic'><img src={img1} alt="" /></div>
        </div>
        <div className='group'>
          <div className='copy'>
            <h3 className='title'>参与方式</h3>
            <ul>
                                                                           <li>点击“参与活动”按钮报名活动。</li>
              <li>从5月至12月，每月推出不同任务，用户可在活动中查询当月的任务内容。</li>
              <li>用户可创建或加入战队，每个战队固定3人，缺人则组队不成功。</li>
              <li>每月1日至25日可创建或加入战队，每月26日至当月最后一天可退出战队。用户如未在规定时间退出战队，下个月自动延续原战队。</li>
              <li>完成当月任务(个人形式或战队形式皆可)获取积分，月度排行榜、预约试驾、邀请好友均可解锁积分，积分可在积分商城兑换，凭借积分/徽章次数可参与大转盘抽奖。</li>
            </ul>
          </div>
          <div className='pic'><img src={arrow} alt="" className='arrow' /><img src={arrow} alt="" className='arrow' /><img src={img2} alt="" /></div>
        </div>
      </div>
      <div className="swiper-box">
        <Swiper
          navigation={{
            nextEl: ".next1",
            prevEl: ".prev1"
          }}
          modules={[Navigation,Pagination,EffectCoverflow]}
          centeredSlides={true}
          loop
          initialSlide={2}
          effect={"coverflow"}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView:2,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth:800,

                modifier: 1,
                slideShadows: false,
              }
            },
            767.98: {
              slidesPerView:2,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth:1000,
                scale:1.38,
                modifier: 1,
                slideShadows: false,
              }
            }
          }}
           pagination={{
             dynamicBullets: true,
           }}
          
        >
          <SwiperSlide className="slide"><img src={s1} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s2} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s3} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s4} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s5} alt="" /></SwiperSlide>
        </Swiper>
        <div className="navigation">
          <div className="swiper-overlay-next next1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
          <div className="swiper-overlay-prev prev1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
        </div>
      </div> 
    </div>
  );
};

export default points;