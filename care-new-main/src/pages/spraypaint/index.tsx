
import {useEffect} from 'react';
import { trackPv } from '@futian/buick-components';
import Kv from '../../components/Kv'
import  '../../styles/spraypaint.scss'
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration} from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-精益钣喷')
  },[])
  return (
    <div className='care-wrap'>
      <Kv media={[{ "pc": "./img/spraypaint/kv.jpg", "mob": "./img/spraypaint/mob/kv.jpg" }]} />
      <div className='pd'>
        <div className="section">
          <div className='care-title'>
            <div className='en'>SERVICE PROCESS</div>
            <h2>服务流程—精益钣喷</h2>
          </div>
          <div className="picture">
            <picture>
              <source srcSet={getImageUrl('./img/spraypaint/step.jpg')}  media='(min-width: 768px)' />
              <img src={getImageUrl('./img/spraypaint/mob/step.jpg')} alt="" />
            </picture>
          </div>
          
        </div>
      </div> 
      <ScrollRestoration />
    </div>
  );
};

export default Page;