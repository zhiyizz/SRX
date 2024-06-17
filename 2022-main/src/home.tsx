import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import video from './assets/home/video.mp4';
import poster from './assets/home/poster.jpg';
import s1 from './assets/home/s1.jpg';
import s2 from './assets/home/s2.jpg';
import s3 from './assets/home/s3.jpg';
import s4 from './assets/home/s4.jpg';
import s5 from './assets/home/s5.jpg';
import s6 from './assets/home/s6.jpg';
import s7 from './assets/home/s7.jpg';
import s8 from './assets/home/s8.jpg';
import s9 from './assets/home/s9.jpg';

const home = () => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoToggle,setVideoToggle] = useState<boolean>(true);
  const playVideo = () => {
   
    if(playerRef.current && videoToggle){
      playerRef.current.play();
      playerRef.current.controls=true
      setVideoToggle(false)
       
    }
  }
  return (
    <div className='act-container'>
      <div className='wrap'>
        <div className='copy'>
          <h3 className='title'>别克跑团联赛简介</h3>
          <h4 className='sub-title'>一个人可以跑得很快，一群人可以跑得更远。</h4>
          <p>别克跑团联赛由上汽通用汽车别克品牌跨界联合悦跑圈APP自2019年创赛推出，通过资源整合与联名营销，持续提升赛事价值。</p>
          <p>别克品牌秉持着激情进取、突破创新的品牌精神，致力于推动全民健身运动的普及，创新性引入“跑团”的比赛形式，为爱跑人群提供专业的跑步体验平台，同时也通过不断升级的赛事规则、规范的赛事运营体系与可靠的赛事安全保障，逐步推动别克跑团联赛成为备受全国跑者认可，覆盖范围广、影响力大的跑团专业联赛。</p>
          <p>迈入2022，别克跑团联赛已成功迈入第四年，足迹遍布全国24座城市，吸纳了近百万跑者一起分享奔跑的快乐、传递进取不息的精神。</p>
        </div>
        <div className='video'>
          <video ref={playerRef} onClick={() => playVideo()} poster={poster} playsInline>
            <source src={video} />
          </video>
          <div className='copy'>
            <p>“凝成团跑到燃”2022别克跑团联赛现已高燃启程，跑步爱好者们可以关注“别克跑团联赛快讯”微信公众号获取赛事信息、进行组团报名，和全国跑友们一起携手进取，开启健康向上的全新征程。</p>
          </div>
        </div>
      </div>
      <div className="swiper-box">
        <Swiper
          navigation={{
            nextEl: ".next1",
            prevEl: ".prev1"
          }}
          loop
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              centeredSlides: true,
              spaceBetween: 20
            },
            767.98: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
        >
          <SwiperSlide className="slide"><img src={s1} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s2} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s3} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s4} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s5} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s6} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s7} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s8} alt="" /></SwiperSlide>
          <SwiperSlide className="slide"><img src={s9} alt="" /></SwiperSlide>
        </Swiper>
        <div className="navigation">
          <div className="swiper-overlay-next next1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
          <div className="swiper-overlay-prev prev1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
        </div>
      </div>
    </div>
  );
};

export default home;