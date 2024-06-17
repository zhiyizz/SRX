import React, { useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import styles from '@styles/century.module.scss'
import { useEffect } from 'react';
import Exterior from './Exterior';
import Curtainwall from './Curtainwall';
import Tech from './Tech';
import Seat from './Seat';
import Bose from './Bose';
import Quality from './Quality';
import Cockpit from './Cockpit';
import Safety from './Safety';
import Health from './Health';
import Internal from './Internal';
import { trackEvent } from '@utils/tracking';
import type { FeatureJson } from '~types/centruy';

const Overlay = ({show = false,prefix, type,data, onClose}:{
  show?: boolean,
  type:string,
  prefix?:string,
  data?:FeatureJson[]
  onClose: (index: boolean) => void}) => {
  const scrolloverlay= useRef<HTMLDivElement>(null);
  useEffect(() => {
    const showDetail = () => {
      if (scrolloverlay.current) {
        Scrollbar.init(scrolloverlay.current, {
          alwaysShowTracks: true
        })
      }
      if(show){
        let name = ''
        if(type === 'exterior'){
          name = 'PURE设计'
        }
        if(type === 'curtainwall'){
          name = '豪华智慧幕墙系统'
        }
        if(type === 'seat'){
          name = '160度云感座椅'
        }
        if(type === 'bose'){
          name = 'Bose音响'
        }
        if(type === 'tech'){
          name = '静音科技'
        }
        if(type === 'health'){
          name = '健康安全'
        }
        if(type === 'quality'){
          name = '驾乘品质'
        }
        if(type === 'cockpit'){
          name = '智能座舱'
        }
        if(type === 'safety'){
          name = '主动安全'
        }
        if (type === 'internal') {
          name = '感官奢享'
        }
        trackEvent(`车型页-世纪CENTURY-一级页面-${name}-查看更多`)
      }
    }
    showDetail();
  },[show, type])
  return (
      <div className={classNames(styles['fbi-detail'],{
        [styles.show]: show
      })}>
      <div className={styles['fbi-detail-wrapper']}>
        <div className={styles.close} onClick={onClose && (() => onClose(false))}><i className="icon-close icon-close-light"></i></div>
        <div className={styles['scroll-container']}  ref={scrolloverlay}>
          <div className={styles.content}>
            {
              type === 'exterior'?
              <Exterior prefix={prefix} data={data![0].slides[2].detail!}  />:
              type === 'curtainwall' ?
              <Curtainwall prefix={prefix} data={data![0].slides[3].detail!} />:
              type === 'tech' ?
              <Tech prefix={prefix}  data={data![1].slides[3].detail!} />:
              type === 'seat' ?
              <Seat prefix={prefix}  data={data![1].slides[1].detail!} />:
              type === 'bose' ?
              <Bose prefix={prefix}  data={data![1].slides[2].detail!} />:
              type === 'health' ?
              <Health prefix={prefix} data={data![2].slides[3].detail!}  />:
              type === 'quality' ?
              <Quality prefix={prefix}  data={data![1].slides[4].detail!} />:
              type === 'cockpit' ?
              <Cockpit prefix={prefix} data={data![3].slides[1].detail!}  />:
              type === 'safety' ?
              <Safety prefix={prefix} data={data![2].slides[2].detail!}  /> :
              type === 'internal' ?
              <Internal prefix={prefix}  data={data![1].slides[0].detail!} />
              :null
            }
  
          </div>
        </div>
      </div>
    </div>

  );
};

export default Overlay;
