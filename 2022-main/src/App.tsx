
import Home from './home'
import Points from './points'
import City from './city'
import Champion from './champion'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Kv from './assets/kv.jpg';
import Kv_m from './assets/kv_m.jpg';
import Kv1 from './assets/kv1.jpg';
import Kv1_m from './assets/kv1_m.jpg';
import Kv2 from './assets/kv2.jpg';
import Kv2_m from './assets/kv2_m.jpg';
import Kv3_m from './assets/kv3_m.jpg';
import { useState } from 'react';

const home = () => {
   console.log(window.hylink)
   const [nav,setNav] = useState<string>('home');
   
  return (
    <div className='act-wrap'>
      <div className='kv'>
        {nav==='home'?(
          <picture>
           <source srcSet={Kv_m} media='(max-width:768px)' />
           <img src={Kv} alt="" />
          </picture>
        ):
        nav==='points'?(
          <picture>
            <source srcSet={Kv1_m} media='(max-width:768px)' />
            <img src={Kv1} alt="" />
          </picture>
        ):
        nav==='city'?(
          <picture>
            <source srcSet={Kv2_m} media='(max-width:768px)' />
            <img src={Kv2} alt="" />
          </picture>
        ):
        nav==='champion'?(
          <picture>
            <source srcSet={Kv3_m} media='(max-width:768px)' />
            <img src={Kv2} alt="" />
          </picture>
        ):
        null
        }
       
      </div>
      <div className='sub-nav'>
        <ul>
          <li className={nav==='home'?'active':''} onClick={() => setNav('home')}>联赛简介</li>
          <li className={nav==='points'?'active':''} onClick={() => setNav('points')}>线上积分赛</li>
          <li className={nav==='city'?'active':''} onClick={() => setNav('city')}>线下城市赛</li>
          <li className={nav==='champion'?'active':''} onClick={() => setNav('champion')}>历届冠军</li>
        </ul>
      </div>
      {nav === 'home'?
      <Home />:
      nav === 'points'?
      <Points />:
      nav === 'city'?
      <City />:
      nav === 'champion'?
      <Champion />:
      null}
    </div>
  );
};

export default home;