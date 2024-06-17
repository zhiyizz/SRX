import React from 'react';
import styles from '@styles/navigation.module.scss'
import Link from 'next/link';
import { isMobileDevice } from '@utils/helper';
const Navigation = ({year}:{year:string}) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.wrapper}>
        <span className={year === '2023' ? styles.active : ''}><Link href="/2023/">2023</Link></span>
        <span><a href="/act/buickjourney202001/">2020</a></span>
        <span><a href="/act/buickjourney201901/">2019</a></span>
        <span><a href={isMobileDevice(true) ? '/act/buickjourney201801/' : '/act/buickjourney2018/'}>2018</a></span>
        <span><a href="/buickjourney201701/">2017</a></span>
        <span><a href="/buickjourney201601/">2016</a></span>
        <span><a href="/buickjourney201501/">2015</a></span>
        <span><a href="/buickjourney201401/">2014</a></span>
      </div>
    </div>
  );
};

export default Navigation;