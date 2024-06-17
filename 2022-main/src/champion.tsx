import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper";
import "swiper/css/pagination";
import c1 from './assets/champion/c1.png';
import more from './assets/champion/more.jpg';

import './styles/champion.scss';
import { useState } from "react";
const data = [
  {
   year:"2022",
   list:[
    {
      city:'成都（揭幕站）',
      img:'s1',
      text:'全程组冠军—峨眉跑神队<br />半程组冠军—361度飞燃ST战队'
    },
    {
      city:'北京站',
      img:'s2',
      text:'全程组冠军—月亮说的队<br />半程组冠军—月亮说京西元大都跑团'
    },
    {
      city:'西安站',
      img:'s3',
      text:'全程组冠军—疯人院跑团<br />半程组冠军—疯人院体育'
    }
   ]
  },
  {
    year:"2021",
    list:[
     {
       city:'重庆（揭幕站）',
       img:'s1',
       text:'全程组冠军—重庆高校跑协联盟一队<br />半程组冠军—飞毛腿队'
     },
     {
       city:'北京站',
       img:'s2',
       text:'全程组冠军—悦速跑步-全马<br />半程组冠军—大兴黄村训练营飞虎队'
     },
     {
       city:'上海站',
       img:'s3',
       text:'全程组冠军—易居马拉松俱乐部<br />半程组冠军—黑马半程2队'
     },
     {
      city:'沈阳站',
      img:'s4',
      text:'全程组冠军—九凌逐日<br />半程组冠军—乐享跑无影战队'
    },
    {
      city:'武汉站',
      img:'s5',
      text:'全程组冠军—Di调战队<br />半程组冠军—酷跑团-8队'
    },
    {
      city:'广州站',
      img:'s6',
      text:'全程组冠军—拉爆1队<br />半程组冠军—白云竞速-1队'
    },
    {
      city:'深圳站',
      img:'s7',
      text:'全程组冠军—罗湖跑协1队<br />半程组冠军—疯狂马拉松队'
    }
    ]
   },
   {
    year:"2020",
    list:[
     {
       city:'杭州（揭幕站）',
       img:'s1',
       text:'全程组冠军—跑渣团一队<br />半程组冠军—最菜最菜的跑渣团'
     },
     {
       city:'西安站',
       img:'s2',
       text:'全程组冠军—疯人院跑团<br />半程组冠军—木华水清'
     },
     {
       city:'沈阳站',
       img:'s3',
       text:'全程组冠军—巴图鲁骁骑营<br />半程组冠军—东大爱跑-2队'
     },
     {
      city:'北京站',
      img:'s4',
      text:'全程组冠军— 9587跑团精英1队<br />半程组冠军—猛男嘤嘤嘤'
    },
    {
      city:'上海站',
      img:'s5',
      text:'全程组冠军—镇江悦跑战队<br />半程组冠军—上大半马-1队'
    },
    {
      city:'重庆站',
      img:'s6',
      text:'全程组冠军—西南大学长跑协会一队<br />半程组冠军—行风跑团队'
    },
    {
      city:'广州站',
      img:'s7',
      text:'全程组冠军— P了个B·3队<br />半程组冠军—翱翔队'
    },{
      city:'武汉（总决赛）',
      img:'s8',
      text:'全程组冠军—北极星闪电一队<br />半程组冠军—开飞机坦克的灰太狼'
    }
    ]
   },
   {
    year:"2019",
    list:[
     {
       city:'北京（揭幕站）',
       img:'s1',
       text:'全程组冠军—嘉友酷跑<br />半程组冠军—北京奥森跑团-突击队'
     },
     {
       city:'西安站',
       img:'s2',
       text:'全程组冠军—跑者无疆精英1队<br />半程组冠军—翱翔长安二队'
     },
     {
       city:'沈阳站',
       img:'s3',
       text:'全程组冠军—沈阳九凌精英跑团<br />半程组冠军—九凌跑团'
     },
     {
      city:'上海站',
      img:'s4',
      text:'全程组冠军—南京悦跑S队<br />半程组冠军—疯狂马拉松队'
    },
    {
      city:'武汉站',
      img:'s5',
      text:'全程组冠军—商丘爱跑团蜗牛队<br />半程组冠军—相约克跑马'
    },
    {
      city:'北京站',
      img:'s6',
      text:'全程组冠军—红高粱悦跑团精英小队<br />半程组冠军—中科院跑马团阿娇队'
    },
    {
      city:'成都站',
      img:'s7',
      text:'全程组冠军—蜀道竞技<br />半程组冠军—劲浪体育'
    },{
      city:'深圳站',
      img:'s8',
      text:'全程组冠军—红海跑团一队<br />半程组冠军—红海跑团三队'
    }
    ]
   }
]

const champion = () => {
  const [cur,setCur] = useState<number>(0);
  return (
    <div className='act-container champion'>
      <div className='wrap'>
        <div className='group'>
        <div className="mark">CHAMPION</div>
       
          <div className='copy'>
            <h3 className='title'>历届冠军</h3>
            <h4 className='sub-title'>深度连接跑团，广泛具有声量的体育赛事。</h4>
            <p>别克跑团联赛自举办以来共吸引了全国近70%的跑团参与，当中不乏国内顶尖的易居、黑马、元大都等明星跑团参赛，别克跑团联赛已经成为了全国跑团的必修课程，全国高水平跑团同场竞技的最佳选项。</p>
          </div>
          {/* <div className='pic'><img src={`./assets/champion/c${cur+1}.png`} alt="" /></div>  */}
          <div className='pic'><img src={new URL(`./assets/champion/c${cur+1}.png`, import.meta.url).href} alt="" /></div> 

        </div>
      </div>
      <div className="list-wrap">
        <ul className="tab">
          {data.map((item,index) => {
            return (
              <li  key={'nav'+index} className={cur===index?'active':''} onClick={() => setCur(index)} ><span>{item.year}</span></li>
            ) }
          )}
        </ul>
        <div className="list">
          <ul>
            {data[cur].list.map((item,index) => {
               return (
                <li key={'item'+index}>
                  {/* <img src={`./assets/champion/${data[cur].year}/${item.img}.jpg`} /> */}
                  <img src={new URL(`./assets/champion/${data[cur].year}/${item.img}.jpg`, import.meta.url).href} />
                  <h6>{item.city}</h6>
                  <p dangerouslySetInnerHTML={{__html:item.text}}></p>
                </li>
               )
            }
            )}
             {cur===0?<li><img src={more} alt="" /></li>:null}
          </ul>
        </div>
      </div>
  
    </div>
  );
};

export default champion;