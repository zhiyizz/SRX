import React from 'react';
import styles from '@styles/components/anchor.module.scss'

const Anchor = () => {
  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div onClick={top} className={styles.anchorTop}>TOP</div>
  );
};

export default Anchor;