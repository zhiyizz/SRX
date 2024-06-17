import React from 'react';
import Link from 'next/link';
import styles from '@styles/subnav.module.scss';
import { usePathname } from "next/navigation";
const Subnav = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className={styles.subnav}>
        <ul>
          <li><Link href="/2023" className={`${pathname === '/2023/' ? styles.active : ''}`} >首页</Link></li>
          <li><Link href="/2023/index1" className={`${pathname === '/2023/index1/' ? styles.active : ''}`}>溯源华夏</Link></li> 
          <li><Link href="/2023/index2" className={`${pathname === '/2023/index2/' ? styles.active : ''}`}>琼海逐浪</Link></li>
          <li><Link href="/2023/index3" className={`${pathname === '/2023/index3/' ? styles.active : ''}`}>炼道青城</Link></li>
          <li><Link href="/2023/index4" className={`${pathname === '/2023/index4/' ? styles.active : ''}`}>驭雪而行</Link></li>
        </ul>
      </div>
  );
};

export default Subnav;