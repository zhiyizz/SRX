
import  { useEffect } from 'react';
import { trackPv } from '@futian/buick-components';
import '../../styles/enuity.scss';
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration } from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-蓝键无忧')
  },[])
  return (
    <div className="care-wrap equity">
      <div className="section">
        <picture>
          <source srcSet={getImageUrl('./img/equity/1.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/equity/mob/1.jpg')} alt="" />
        </picture>
      </div>
      <div className="section">
        <picture>
          <source srcSet={getImageUrl('./img/equity/2.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/equity/mob/2.jpg')} alt="" />
        </picture>
      </div>
      <div className="section"> 
        <picture>
          <source srcSet={getImageUrl('./img/equity/3.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/equity/mob/3.jpg')} alt="" />
        </picture>
      </div>
      <div className="section">
        <picture>
          <source srcSet={getImageUrl('./img/equity/4.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/equity/mob/4.jpg')} alt="" />
        </picture>
        <div className="gifwrap">
          <img src={getImageUrl('./img/equity/1.gif')} alt=""  className="gif1 gif" />
          <img src={getImageUrl('./img/equity/2.gif')} alt="" className="gif2 gif" />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Page;