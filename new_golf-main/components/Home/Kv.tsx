"use client"
import styles from '@/styles/kv.module.scss'
const Kv = () => {

  return (
    <div className={styles.kv}>
       <picture>
        <source srcSet='/golf/2023/img/kv.jpg' media='(min-width:768px)' />
        <img src='/golf/2023/img/mob/kv.jpg' alt="" />
       </picture>
    </div>
  );
};

export default Kv;