import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper";
import "swiper/css/pagination";
import img1 from './assets/city/img1.jpg';
import img2 from './assets/city/img2.jpg';
import './styles/city.scss';
 import s1 from './assets/city/s1.jpg';
 import s1_m from './assets/city/s1_m.png';
 import s2 from './assets/city/s2.jpg';
 import s2_m from './assets/city/s2_m.png';
 import s3 from './assets/city/s3.jpg';
 import s3_m from './assets/city/s3_m.png';

const city = () => {

  return (
    <div className='act-container city'>
      <div className='wrap'>
        <div className='group'>
          <div className='copy'>
            <h3 className='title'>线下城市赛</h3>
            <h4 className='sub-title'>全新赛季，全新体验，全新赛制全国来袭。</h4>
            <p>今年的别克跑团联赛延续“凝成团，跑到燃”的口号，随着别克品牌标识的全面焕新，别克跑团联赛也采用了全新的赛事视觉标识，凸显了“团结、激情进取、健康”的赛事价值观，并希望通过不断创新的赛制，让全国的跑步爱好者感受到携手共进、突破自我的精神力量。新赛季自6月启动延续至年底，将覆盖成都、西安、武汉、北京、上海、广州等全国主要城市。</p>
          </div>
          <div className='pic'><img src={img1} alt="" /></div>
        </div>
        <div className='group'>
          <div className='copy'>
            <h3 className='title'>“4+3+1”赛制</h3>
            <ul>
              <li>4人团队全程接力赛 ：团队4人在指定场地内通过绕圈接力赛的形式，总计完成42公里的长距离奔跑，以平均完赛时间为排名依据。</li>
              <li>3人团队半程接力赛 ：团队3人在指定场地内通过绕圈接力赛的形式，总计完成21公里的长距离奔跑，以平均完赛时间为排名依据。</li>
              <li>家庭体验组：儿童+家长报名参赛完成3公里，完成沿途设置3处趣味互动，不计排名，完赛可获得儿童专属完赛礼包。</li>
            </ul>
          </div>
          <div className='pic'><img src={img2} alt="" /></div>
        </div>
      </div>
      <div className="swiper-box">
        <div className="copy">
        <h3 className='title'>赛事亮点</h3>
        </div>
        <Swiper
          navigation={{
            nextEl: ".next1",
            prevEl: ".prev1"
          }}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.3,
              spaceBetween: 20
            },
            767.98: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
        >
          <SwiperSlide className="slide">
            <picture>
              <source srcSet={s1_m} media='(max-width:768px)' />
              <img src={s1} alt="" />
            </picture>
            <p>团结共进取</p>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <picture>
              <source srcSet={s2_m} media='(max-width:768px)' />
              <img src={s2} alt="" />
            </picture>
            <p>定制化荣誉</p>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <picture>
              <source srcSet={s3_m} media='(max-width:768px)' />
              <img src={s3} alt="" />
            </picture>
            <p>快乐能量站</p>
          </SwiperSlide>
        </Swiper>
        <div className="navigation">
          <div className="swiper-overlay-next next1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
          <div className="swiper-overlay-prev prev1"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3937 24.4912L17.5263 15.484" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><path d="M17.189 33.7382L34.4244 24.5345" stroke="#333333" strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="25" r="23.5" stroke="#333333" strokeWidth="3" /></svg></div>
        </div>
      </div> 
    </div>
  );
};

export default city;