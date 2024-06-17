import React,{FC, useState} from 'react';
import classNames from 'classnames';
import styles from '@/styles/subnav.module.scss'
type PropsType = {
  data:string[]
  onBack:Function
}
const Subnav:FC<PropsType> = ({data,onBack}) => {
  const [cur,setCur] = useState<number>();
  return (
    <div className={styles.subnav}>
        <ul>
          {data.map((item,index) => (
            <li key={item} className={classNames({
              [styles.active]:cur ===  index
            })} onClick={() => {
              setCur(index);
              onBack(index);
            }}>{item}</li>
          ))}
        </ul>
    </div>
  );
};

export default Subnav;