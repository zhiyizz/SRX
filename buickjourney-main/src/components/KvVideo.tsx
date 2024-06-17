import React, { useState } from 'react';
import styles from '@styles/components/kvvideo.module.scss';
const KvVideo = ({meida,video}:{meida:{device:"pc" | "mob",url:string}[],video:string}) => {
  const [show,setShow] = useState(false);
  const player = () => {
    setShow(true)
  }
  const pc = meida.find(m => m.device === 'pc')
  const mob = meida.find(m => m.device === 'mob')
  return (
    <div className={styles.kv}>
       <div className={styles.playButton} onClick={() => !show && player()}></div>
        <picture>
          <source srcSet={pc?.url} media="(min-width:768px)" />
          <img src={mob?.url} alt="" />
        </picture>
        {show && <PlayPopup onBack={setShow} data={video} />}
    </div>
  );
};

const PlayPopup = ({onBack,data}:{data:string,onBack:(item:boolean) => void}) => {
  return (
    <div className={styles.playPopup}>
      <div className={styles.popupWrapper}>
      <div className={styles.close} onClick={() => onBack(false)}></div>
      <video playsInline  controls autoPlay   >
        <source  src={data} />
      </video>
      </div>
      
    </div>
  )
}

export default KvVideo;