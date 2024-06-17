import React from 'react';
import getConfig from 'next/config';
import styles  from  '@styles/components/kv.module.scss';
const { publicRuntimeConfig } = getConfig()
const KvSlide = ({src}:{src:string}) => {
  return (
    <div className={styles.kv}>
        <picture>
            <source srcSet={`${publicRuntimeConfig.staticFolder}/img/${src}_m.jpg`} media="(max-width: 768px)" />
            <img src={`${publicRuntimeConfig.staticFolder}/img/${src}.jpg`} alt="" />
        </picture>
    </div>
  )
}

export default KvSlide
