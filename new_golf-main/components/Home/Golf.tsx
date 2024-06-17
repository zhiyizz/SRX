import React from 'react';
import { GolfType } from '@/utils/types/home';
import { divideByElement } from '@/utils/helper';
import Text from '@/components/Text';
import List from '@/components/List';
import styles from '@/styles/components/golf.module.scss'
const Golf = ({data}:{data:GolfType}) => {
  return (
    <div className={styles.golf}>
      <div className={styles.content}>
        {data.text &&   <Text data={data.text}/>}
        {data.subTitle && <h4>{data.subTitle}</h4>}
        {data.list && <List data={data.list} /> }
        {data.question && data.question.map((item,idx) => (
          <div className={styles.question} key={idx}>
            <div className={styles.title}>Q:{item.q}</div>
            <p className={styles.text}>A:{item.a}</p>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default Golf;