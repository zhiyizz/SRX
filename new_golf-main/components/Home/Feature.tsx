'use client';
import React, {FC, useEffect, useRef, useState } from 'react';
import styles from '@/styles/feature.module.scss';
import { FeatureType } from '@/utils/types/home';
import Tabs from '@/components/Tabs';
import Gallery from '@/components/Gallery';
import Player from './Player';
type PropsType = {
  map:number | null,
  feature:FeatureType[]
}
const Feature:FC<PropsType> = ({map,feature}) => {
  const domRefs = useRef<HTMLDivElement[]>([])
  useEffect(() => {
    if(map || map === 0){
      window.scrollBy({
        top: domRefs.current[map].getBoundingClientRect().top,
        behavior: "smooth",
      })
    }
  }, [map])
  return (
    <div className={styles.feature}>
      {feature.map((item, index) => (
        <div className={styles.section} key={index} ref={el => { domRefs.current[index] = el! }}>
          <h4 className={styles.title}>{item.title}</h4>
          <Tabs data={item.tabs} type={item.type!} className={index===2} />
          {item.gallery && <Gallery data={item.gallery} />} 
        </div>
      ))}


    </div>
  );
};

export default Feature;