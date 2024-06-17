'use client'
import React, { FC, useEffect, useState } from 'react';
import Kv from './Kv';
import Subnav from './Subnav';
import Feature from './Feature';
import { HomeType } from '@/utils/types/home';
import { trackPv } from '@/utils/tracking'
import Script from 'next/script';
import styles from '@/styles/intro.module.scss'
const Intro = ({data}:{data:HomeType}) => {
  const [navCurrent,setNavCurrent] = useState(null);
  useEffect(() => {
    trackPv('别克高尔夫官网')
  },[])
  return (
    <div className={styles.intro}>
      
      <Kv />
      <Subnav data={data.subnav} onBack={setNavCurrent} />
      <Feature map={navCurrent} feature={data.features} />
    
    </div>
  );
};

export default Intro;