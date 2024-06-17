
import {useEffect} from 'react';
import Kv from '../../components/Kv';
import { Testdrive,trackPv } from '@futian/buick-components';
import '../../styles/workshop.scss';
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration} from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-透明车间')
  },[])
  return (
    <div className="care-wrap workshop">
      <Kv media={[{ 
        "pc": "./img/workshop/kv.jpg", 
        "mob": "./img/workshop/mob/kv.jpg",
        "title":"看的见的透明服务\n享得到的时刻安心",
        "text":"别克关怀智能透明车间\n可视化保养体验随时随地了解爱车保养进度"
        }]} />
      <div className='pd'>
        <p className="head-text text">
        爱车需维保，而您公私事务繁忙难以分身，维保如何高效又安心？<br />别克关怀让专业与便捷时刻在线：手机登录iBuick解锁透明车间，不管您处于工作会议还是休闲聚会，<br />均可通过iBuick随时查看车辆维保状况，全程可视化、透明化，让您放心、安心更省心。<br /><br />
        别克关怀让优质服务眼见为实，实实在在的便捷高效，更值得您信任。
        </p>
        <div className='care-title'>
          <div className='en'>SERVICE PROCESS</div>
          <h2>服务流程</h2>
        </div>
        <div className="grid">
          <div className="row">
            <img src={getImageUrl('./img/workshop/s1.jpg')} alt="" />
            <p>进入iBuick APP</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s2.jpg')} alt="" />
            <p>点击 &lt;预约维保&gt;</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s3.jpg')} alt="" />
            <p>选择经销商及服务时间</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s4.jpg')} alt="" />
            <p>预约确认并提交</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s5.jpg')} alt="" />
            <p>进店维修保养</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s6.jpg')} alt="" />
            <p>进入维修保养信息页面</p>
          </div>
          <div className="row">
            <img src={getImageUrl('./img/workshop/s7.jpg')} alt="" />
            <p>点击查看车辆维修保养状态</p>
          </div>
        </div>
        <div className="testdrive-wrap">
          <p>从选择我们那一刻起，<br />
            别克关怀承诺与您一路相随，<br />
            体验更多优质安心服务，加入别克车主大家庭，<br />
            期待与您下次相见！
          </p>
          <Testdrive theme='black' tdname="加入我们" tracking='别克关怀-透明车间' />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Page;