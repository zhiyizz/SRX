import React from 'react';
import styles from '@/styles/components/list.module.scss'
const List = ({data}:{data:string[]}) => {
  return (
    <>
      <ul className={styles.list}>
          {data.map((item,idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
    </>
  );
};

export default List;