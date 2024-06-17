import React, { useState } from 'react';
import { PlayerType } from '@/utils/types/home';
import { divideByElement } from '@/utils/helper';
import Gallery from '@/components/Gallery';
import Text from '@/components/Text';
import List from '@/components/List';
import classNames from 'classnames';
import styles from '@/styles/components/player.module.scss'
import AliImage from '@/components/AlImage';
const Player = ({ data }: { data: PlayerType }) => {
  const [cur, setCur] = useState(0);
  return (
    <>
    <div className={styles.player}>
      <div className={styles.pic}>
        <picture>
          <source srcSet={`/golf/2023/img/${data.pic}`} media='(min-width:768px)'  />
          <img src={`/golf/2023/img/mob/${data.pic}`} alt="" />
        </picture>
      </div>
      <ul>
        {data.childTabs.map((item, index) => (
          <li className={classNames({
            [styles.active]: cur === index
          })} onClick={() => setCur(index)} key={item.tab}>{item.tab}</li>
        ))}
      </ul>
      <div className={styles.content}>
        <div className={styles.name}>{data.childTabs[cur].content.name}</div>
        <Text data={data.childTabs[cur].content.text!} />
        <List data={data.childTabs[cur].content.list} />
      </div>
      <div className={styles.sign}>别克高尔夫大使：<AliImage src={`/img/${data.sign.url}`} width={data.sign.width} height={data.sign.height} alt="sign" /></div>
    </div>
    {data.gallery && <Gallery data={data.gallery} />}
    </>
  );
};

export default Player;