import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/components/submenu.module.scss';
import { useEffect,useState } from 'react';
import classNames from 'classnames';
classNames
export default function SubMenu() {
  const router = useRouter()
  const [active,setActive] = useState<string>();
  useEffect(() => {
    if(router.pathname === '/') {
      setActive('/')
    }
  },[]);
  useEffect(() => {
    setActive(router.pathname)
  },[router.pathname])
  return (
    <div className={styles.subMenu}>
      <ul className=''>
        <li className={classNames(active === '/' ? styles.active : null)}><span><Link href="./" >产品介绍</Link></span></li>
        <li className={classNames(active === '/replacement' ? styles.active : null)}><span><Link href="./replacement" >我要置换</Link></span></li>
        <li className={classNames(active === '/evaluation' ? styles.active : null)}><span><Link href="./evaluation" >我要评估</Link></span></li>
        <li className={classNames(active === '/selling' ? styles.active : null)}><span><Link href="./selling" >我要卖车</Link></span></li>
        <li className={classNames(active === '/application' || active === '/car-info' ||  active === '/car-submit' ? styles.active : null)}><span><Link href="./application" >我要买车</Link></span></li>
      </ul>
    </div>
  )
}
