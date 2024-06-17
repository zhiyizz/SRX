import { useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import styles from '@styles/century6.module.scss'
import { useEffect } from 'react';
import Exterior from './Exterior';
import Seat from './Seat';
import Quality from './Quality'
import Space from './Space'
import Cockpit from './Cockpit'
import Safety from './Safety'
import Health from './Health'
import { trackEvent } from '@utils/tracking';
import type { FeatureJson } from '~types/centruy';
import Century7 from './century7';

const Overlay = ({show = false,prefix,data, type, onClose}:{
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
        if(type === 'seat'){
          name = '二排座椅'
        }
        if(type === 'quality'){
          name = '驾乘品质'
        }
        if(type === 'space'){
          name = '宽阔空间'
        }
        if(type === 'health'){
          name = '健康安全'
        }
        if(type === 'cockpit'){
          name = '智能座舱'
        }
        if(type === 'safety'){
          name = '主动安全'
        }
        if(type === 'century7'){
          name = '七座第三排剧院式座椅'
        }
        trackEvent(`车型页-世纪CENTURY六座-一级页面-${name}-查看更多`)
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
              type === 'seat' ?
              <Seat prefix={prefix} data={data![1].slides[2].detail!} />:
              type === 'quality' ?
              <Quality prefix={prefix}  data={data![1].slides[6].detail!} />:
              type === 'space' ?
              <Space prefix={prefix}  data={data![1].slides[1].detail!}  />:
              type === 'health' ?
              <Health prefix={prefix}  data={data![2].slides[3].detail!}  />:
              type === 'cockpit' ?
              <Cockpit prefix={prefix} data={data![3].slides[1].detail!} />:
              type === 'safety' ?
              <Safety prefix={prefix}  data={data![2].slides[2].detail!} />:
              type === 'century7' ?
              <Century7 prefix={prefix} data={data![1].slides[4].detail!}  />
              :null
            }
  
          </div>
        </div>
      </div>
    </div>

  );
};

export default Overlay;
