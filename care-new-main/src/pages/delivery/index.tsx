import  { useEffect, useState } from 'react';
import Kv from '../../components/Kv.tsx'
import '../../styles/delivery.scss';
import classNames from 'classnames';
import { Testdrive,trackPv } from '@futian/buick-components'
import { getImageUrl } from '../../utils/getImageUrl.ts';
import '../../utils/rem.ts'
import {ScrollRestoration } from 'react-router-dom'
const Page = () => {
  const [step1, setStep1] = useState<boolean>(true);
  const [step2, setStep2] = useState<boolean>(true);
  const [isMobile,setMobile] = useState(false);

  function isMobileDevice(strict?: boolean) {
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
    const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)
  
    if (strict) {
      return isMobileUA && isTouchDevice
    } else {
      return window.innerWidth < 768
    }
  }
  useEffect(() => {
    trackPv('别克关怀-修养技术')
    isMobileDevice() ? setMobile(true) : setMobile(false)
  },[])
  return (
    <div className="care-wrap delivery">
      <Kv media={[{ 
        "pc": "./img/delivery/kv.jpg", 
        "mob": "./img/delivery/mob/kv.jpg",
        "title":"把钥匙交给我们\n把时间留给自己",
        "text":"别克关怀为车主提供便捷的上门取送车服务\n留给你更多个人时间"
        }]} />
      <div className='pd'>
        <div className="section">
          <p className="head-text text" text-align="center">
            工作日繁忙难以抽空送爱车保养？亦或是难得周末空闲更想和家人朋友度过？不想专程跑一趟？从容应对工作生活，<br />别克关怀为所有车主提供便捷上门取送车服务，安排行程少束缚，更多自由享生活。<br />
            提供多平台、按己需求，在线预约取送车服务，别克关怀您值得拥有！
          </p>
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>SERVICE OVERVIEW</div>
            <h2>服务概况</h2>
          </div>
          <p className='text mt40'>
            服务对象：所有别克品牌车型<br />
            可提供服务的4S店：您所在城市同城内已开通取送车服务的同城4S店（同城不包括县级市） <br />
            服务时间：以4S店营业时间为准<br />
            预约处理时间：9:00-18:00（非预约处理时间我们将记录您的需求，并于次日为您确认办理）<br />
            开通城市：北京、长沙、深圳、杭州、上海、广州、苏州、成都、武汉、东莞、南京、重庆、西安、青岛、南昌、海口、福州、珠海、济南、合肥、厦门、佛山、中山、南宁、郑州、哈尔滨、徐州、大连、肇庆、泉州、三亚、洛阳、新乡、襄阳、常州、无锡、包头、鄂尔多斯、呼和浩特、台州、温州。
          </p>
          <div className='care-title'>
            <div className='en'>SERVICE PROCESS</div>
            <h2>服务流程</h2>
          </div>
          <div className={classNames("selected", {
            "show": step1
          })} onClick={(() => {
            isMobile &&  setStep1(!step1)
          })}>车主iBuick下单流程</div>
          {step1 && (
            <div className="step">
              <div className="step-title">取车</div>
              <div className="step-grid">
                <div className="step-grid-col col1">
                  <div className="step-grid-row step-grid-row-img">
                    <img src={getImageUrl('./img/delivery/s1_1.jpg')} width={616} height={352} alt="" />
                    <p>登录车主iBuick-APP</p>
                  </div>
                  <div className="step-grid-row step-grid-row-img">
                    <img src={getImageUrl('./img/delivery/s1_2.jpg')} width={616} height={352} alt="" />
                    <p>选择上门取送车</p>

                  </div>

                  <div className="step-grid-row step-grid-row-img">
                    <img src={getImageUrl('./img/delivery/s1_3.jpg')} width={616} height={352} alt="" />
                    <p>填写订单信息</p>
                  </div>
                </div>
                <div className="step-grid-col col2">
                  <div className="step-grid-row">
                    <p>提交订单</p>
                  </div>
                  <div className="step-grid-row" >
                    <p>坐席致电您进行订单确认</p>
                  </div>
                  <div className="step-grid-row" >
                    <p>支付订单</p>
                  </div>
                  <div className="step-grid-row" >
                    <p>上门取车送车服务人员接单</p>
                  </div>
                  <div className="step-grid-row" >
                    <p>4S店与车主收到含有<br />
                      上门取送车服务人员信息的短信
                    </p>
                  </div>
                  <div className="step-grid-row" >
                    <p>上门取送车服务人员就位后，<br />
                      将与您一同检查车辆，<br />
                      并拍摄照片留证后，开启订单
                    </p>
                  </div>
                  <div className="step-grid-row" >
                    <p>车辆送达后，<br />
                      4S店与上门取车<br />
                      服务人员交接车辆
                    </p>
                  </div>
                  <div className="step-grid-row end">
                    <p>评价并完成订单</p>
                  </div>
                </div>
              </div>
              <div className="step-title">还车</div>
              <div className="step-grid">
              <div className="step-grid-col">
                <div className="step-grid-row">
                  <p>4S店发起还车服务</p>
                </div>
                <div className="step-grid-row">
                  <p>上门取送车服务人员就位后，<br />
                    与4S店一同检查车辆，<br />
                    并拍摄照片留证后，开启订单
                  </p>
                </div>
                <div className="step-grid-row">
                  <p>车辆送达，<br />
                    您与上门取车送车服务人员<br />
                    一同检查车辆，并拍摄照片留证
                  </p>
                </div>
                <div className="step-grid-row end">
                  <p>评价并完成订单</p>
                </div>
              </div>
              </div>
            </div>
          )}
          <div className={classNames("selected", {
            "show": step2
          })} onClick={(() => {
            isMobile &&  setStep2(!step2)
          })}>车主拨打400-820-2020下单流程 <span className={classNames('toggle',{
            "show": step2
          })} onClick={(() => {
           setStep2(!step2)
          })}>点击展开</span>
          </div>
          {step2 && (
            <div className="step">
              <div className="step-title">取车</div>
              <div className="step-grid">
              <div className="step-grid-col col2">

                <div className="step-grid-row">
                  <p>拨打4008202020-4-2<br />接入别克取送车专属坐席
                  </p>
                </div>
                <div className="step-grid-row">
                  <p>坐席与您确认相关信息
                  </p>
                </div>
                <div className="step-grid-row">
                  <p>确认信息后，坐席将为您下单</p>
                </div>
                <div className="step-grid-row">
                  <p>坐席致电4S店告知订单信息<br />
                    并通知4S店进行订单支付，<br />
                    提醒4S店按照服务时间准备接车</p>
                </div>
                <div className="step-grid-row">
                  <p>上门取送车服务人员接单</p>
                </div>
                <div className="step-grid-row">
                  <p>4S店与车主收到含有<br />
                    上门取送车<br />
                    服务人员信息的短信</p>
                </div>
                <div className="step-grid-row">
                  <p>上门取送车服务人员就位后，<br />
                    将与您一同检查车辆，<br />
                    并拍摄照片留证后，开启订单</p>
                </div>
                <div className="step-grid-row">
                  <p>车辆送达后，<br />
                    4S店与上门取车服务人员 <br />
                    交接车辆</p>
                </div>
                <div className="step-grid-row end">
                  <p>评价并完成订单</p>
                </div>
                </div>
              </div>
                <div className="step-title">还车</div>
              <div className="step-grid">
              <div className="step-grid-col">
                <div className="step-grid-row">
                  <p>4S店发起还车服务</p>
                </div>
                <div className="step-grid-row">
                  <p>上门取送车服务人员就位后，<br />
                    将与你一同检查车辆，<br />
                    并拍摄照片留证后，开启订单
                  </p>
                </div>
                <div className="step-grid-row">
                  <p>车辆送达后，<br />4S店与上门取车服务人员交接车辆
                  </p>
                </div>
                <div className="step-grid-row end">
                  <p>评价并完成订单</p>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
        <div className="section">
          <div className='care-title'>
            <div className='en'>SERVICE PROCESS</div>
            <h2>服务流程</h2>
          </div>
          <p className='text'>
          预约使用<br />
          您可以预约您所在地同城4S店为您提供服务 （同城不包括县级市） ；<br /><br />
          交接验车<br />
          上门取送车服务人员进行验车时，将与您共同进行环车拍照，并上传到取送车平台，车辆在代驾过程中，如由于上门取送车服务人员问题致使车辆出现问题，照片将作为有效法律依据；<br /><br />
          交接注意：<br />
          a)请仔细检查轮毂，车辆底部等不易看到的地方;<br />
          b)车辆外观不干净时，您尤其要注意各种划痕;<br />
          c)必须要确认是否有行驶证、交强险，年检是否在有效期内;<br />
          d)确认您车辆的各项指示灯是否正常。<br /><br />
          取消/变更订单<br />
          在上门取送车服务人员接单之前，您可以免费取消订单，在上门取送车服务人员接单之后取消订单，将扣除违约金（订单在确认后，将无法变更）；<br />
          如您未及时取消订单产生违约金，需由您自行承担。<br /><br />
          注意事项<br />
          如您在下单期间，无法完成支付，请拨打4008202020-4-2进行咨询；<br />
          如出现其他问题，您可以拨打4008202020-4-2或联系为您提供服务的4S店来处理。

          </p>
        </div>
        <div className="testdrive-wrap">
          <p>从选择我们那一刻起，<br />
            别克关怀承诺与您一路相随，<br />
            体验更多优质安心服务，加入别克车主大家庭，<br />
            期待与您下次相见！
          </p>
          <Testdrive theme='black' tdname="加入我们" tracking='别克关怀-修养技术' />
        </div>
      </div>
      <ScrollRestoration />  
    </div>
  );
};

export default Page;