import { useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import styles from '@styles/centuryspecial.module.scss';
import { useEffect } from 'react';
import Exterior from './Exterior';
import Quality from './Quality';
import Space from './Space';
import Cockpit from './Cockpit';
import Safety from './Safety';
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
        if(type === 'quality'){
          name = '驾乘品质'
        }
        if(type === 'space'){
          name = '宽阔空间'
        }
        if(type === 'cockpit'){
          name = '智能座舱'
        }
        if(type === 'safety'){
          name = '主动安全'
        }
        trackEvent(`车型页-别克世纪臻享款-一级页面-${name}-查看更多`)
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
              <Exterior prefix={prefix} data={data![0].slides[2].detail!} />:
              type === 'quality' ?
              <Quality prefix={prefix}  data={data![1].slides[5].detail!}  />:
              type === 'space' ?
              <Space prefix={prefix} data={data![1].slides[1].detail!}  />:
              type === 'cockpit' ?
              <Cockpit prefix={prefix} data={data![3].slides[1].detail!}  />:
              type === 'safety' ?
              <Safety prefix={prefix} data={data![2].slides[2].detail!}  />:null
            }
  
          </div>
        </div>
      </div>
    </div>

  );
};

export default Overlay;
