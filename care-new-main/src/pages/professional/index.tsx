
import { useEffect } from 'react';
import { Testdrive,trackPv } from '@futian/buick-components';
import "../../styles/professional.scss"
import { Link } from "react-router-dom";
import { getImageUrl } from '../../utils/getImageUrl';
import {ScrollRestoration} from 'react-router-dom'
const Page = () => {
  useEffect(() => {
    trackPv('别克关怀-专业休养技术-首页')
  },[])
  return (
    <div className="care-wrap professional">
      <div className="grid">
        <div className="row">
          <img src={getImageUrl('./img/professional/r1.jpg')} alt="" width={960} height={502} />
          <div className="content">
            <h2>专业保养</h2>
            <Link to="/upkeep" className="more">查看详情</Link>
          </div>
        </div>
        <div className="row">
          <img src={getImageUrl('./img/professional/r2.jpg')} alt="" width={960} height={502} />
          <div className="content">
            <h2>数字车检</h2>
          </div>
        </div>
        <div className="row">
          <img src={getImageUrl('./img/professional/r3.jpg')} alt="" width={960} height={502} />
          <div className="content">
            <h2>精益钣喷</h2>
            <Link to="/spraypaint" className="more">查看详情</Link>
          </div>
        </div>
        <div className="row">
          <img src={getImageUrl('./img/professional/r4.jpg')} alt="" width={960} height={502} />
          <div className="content">
            <h2>专业维修工具</h2>
          </div>
        </div>
      </div>  
      <div className="testdrive-wrap">
          <p>从选择我们那一刻起，<br />
            别克关怀承诺与您一路相随，<br />
            体验更多优质安心服务，加入别克车主大家庭，<br />
            期待与您下次相见！
          </p>
          <Testdrive theme='black' tdname="加入我们" tracking='别克关怀-专业休养技术-首页' />
        </div>
        <ScrollRestoration />  
    </div>
  );
};

export default Page;