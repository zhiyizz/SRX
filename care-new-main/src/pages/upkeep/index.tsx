
import {useEffect} from 'react';
import { trackPv } from '@futian/buick-components';
import Kv from '../../components/Kv'
// import '../styles/upkeep.scss'
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration} from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-专业保养')
  },[])
  return (
    
    <div className={'care-wrap'}>
      <Kv media={[{ "pc": "./img/upkeep/kv.jpg", "mob": "./img/upkeep/mob/kv.jpg" }]} />
      <div className='pd'>
        <div className="section">
          <div className='care-title'>
            <div className='en'>SERVICE PROCESS</div>
            <h2>服务流程—专业保养</h2>
          </div>
          <div className="picture">
            <picture>
              <source srcSet={getImageUrl('./img/upkeep/step.jpg')}  media='(min-width: 768px)' />
              <img src={getImageUrl('./img/upkeep/mob/step.jpg')} alt="" />
            </picture>
          </div>
          
        </div>
      </div> 
      <ScrollRestoration />
    </div>
  );
};

export default Page;