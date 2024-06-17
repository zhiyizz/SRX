
import  { useEffect } from 'react';
import { getImageUrl } from '../../utils/getImageUrl';
import { trackPv } from '@futian/buick-components';
import '../../styles/promotion.scss'
import {ScrollRestoration} from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-休养技术')
  },[])
  return (
    <div className='care-wrap promotion'>
      <div className='section'>
        <picture>
          <source srcSet={getImageUrl('./img/promotion/1.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/promotion/mob/1.jpg')} />
        </picture>
      </div>
      <div className='section'>
        <picture>
          <source srcSet={getImageUrl('./img/promotion/2.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/promotion/mob/2.jpg')} />
        </picture>
      </div>
      <div className='section'>
        <picture>
          <source srcSet={getImageUrl('./img/promotion/3.jpg')} media='(min-width: 768px)' />
          <img src={getImageUrl('./img/promotion/mob/3.jpg')} />
        </picture>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Page;