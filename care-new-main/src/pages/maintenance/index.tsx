
import { useEffect } from 'react';
import Kv from '../../components/Kv'
import  '../../styles/maintenance.scss';
import { trackPv } from '@futian/buick-components'
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration } from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-延长保修')
  },[])
  return (
    <div className="care-wrap maintenance">
      <Kv media={[{ "pc": "./img/maintenance/kv.jpg", "mob": "./img/maintenance/mob/kv.jpg" }]} />
      <div className='pd'>
        <div className="section">
          <div className='care-title'>
            <h2>原厂质保服务</h2>
          </div>
          <p className="text">自2023年9月1日交付的别克车辆将适用整车及动力总成3年10万公里的质保政策。<br />
            *别克车主还可选择购买原厂延长保修服务</p>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>EXTENDED WARRANTY SERVICE</div>
            <h2>什么是延长保修服务？</h2>
          </div>
          <p className="text">
            是指在新车质保期结束后，针对一定范围内的零部件，由上汽通用提供的原厂品质的有偿保修服务。延长保修服务的时间和范围由客户自行选择并付费购买。<br />
            在延长保修期之内，车辆正常使用（维修保养）的情况下，车辆的零部件发生不可预见的机械或电气故障时，由上汽通用提供约定保障范围内的免费维修或者原厂零部件更换。<br />
            原厂配件、原厂技术和原厂服务给您安心保障。
          </p>
          
          </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>CUSTOMER VALUE</div>
            <h2>对客户的价值</h2>
          </div>
          <div className="container">
            <picture>
              <source  media='(min-width: 768px)' srcSet={getImageUrl('./img/maintenance/p1.jpg')}  />
              <img src={getImageUrl('./img/maintenance/mob/p1.jpg')} alt="" />
            </picture>
           
          </div>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>RISK OF MAINTENANCE</div>
            <h2>难以预测的维修风险</h2>
          </div>
          <div className="container flex">
            <p className="text">车辆行驶时间越长，里程数越高，发生故障的几率也就越高，尤其是3-6年多数车辆行驶的关键里程区间。</p>
            <img src={getImageUrl('./img/maintenance/mob/p2.jpg')} alt="" />
          </div>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>COST OF MAINTENANCE</div>
            <h2>可能的维修成本</h2>
          </div>
          <div className="container flex">
            <p className="text">虽然汽车本身的性能十分可靠，但汽车的构造相当复杂，包含上万种精细配件，若出现问题，维修费用不可预估。</p>
            <img src={getImageUrl('./img/maintenance/mob/p3.jpg')} alt="" />
          </div>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>EXTENDED WARRANTY PRODUCTS</div>
            <h2>延保产品随心选</h2>
          </div>
          <div className="container">
          <picture>
              <source  media='(min-width: 768px)' srcSet={getImageUrl('./img/maintenance/p4.jpg')}  />
              <img src={getImageUrl('./img/maintenance/mob/p4.jpg')} alt="" />
            </picture>
          </div>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>THREE PERIODS</div>
            <h2>三个期限任您随心选择</h2>
          </div>
          <div className="container">
            <picture>
              <source  media='(min-width: 768px)' srcSet={getImageUrl('./img/maintenance/p5.jpg')}  />
              <img src={getImageUrl('./img/maintenance/mob/p5.jpg')} alt="" />
            </picture>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Page;