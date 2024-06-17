import React, { useState } from 'react';
import classNames from 'classnames';
import { TabsType,PlayerType } from '@/utils/types/home';
import { FC } from 'react';
import { divideByElement } from '@/utils/helper';
import styles from '@/styles/components/tabs.module.scss'
import Player from './Home/Player';
import Golf from './Home/Golf';
import Text from './Text';
type PropsType = {
  data: TabsType[],
  type:string,
  className:boolean
}
const Tabs = ({ data,type,className}: PropsType) => {

  const [cur, setCur] = useState(0);
  return (
    <div className={styles.tabs}>
      <ul>
        {data.map((item, index) => (
          <li className={classNames({
            [styles.active]: cur === index
          })} onClick={() => setCur(index)} key={item.tab}>{item.tab}</li>
        ))}
      </ul>
      {type === 'player' && <Player data={data[cur].content}  />}
      {type === 'golf' && <Golf data={data[cur].content}  />}

      {!type && (
        <div className={classNames(
          styles.content,
         {
          [styles.bg]:className
         }
        )}>
        <h4>{divideByElement(data[cur].content.subTitle)}</h4>
        <Text data={data[cur].content.text!} />
      </div>
      ) }

      
    </div>
  );
};

export default Tabs;