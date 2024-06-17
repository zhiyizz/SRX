import React, { useEffect, useState } from 'react';
import styles from '@/styles/submit.module.scss'
const Parrelation = ({reset}:{reset:boolean}) => {
  const [show,setShow] = useState<boolean>();
  const [finished,setFinished] = useState<Record<string,string>>({ parrelation:'父亲' });
  useEffect(() => {
    setFinished({ parrelation:'父亲'})
  },[reset])
  return (
    <div className={styles.item}>
      <div className={styles['item-label']}>与被监护人关系</div>
      <div className={styles['item-wrap']}>
        <select name='parrelation' value={finished.parrelation} onChange={(e) => {
          setFinished({
            ...finished,
            'parrelation':e.target.value
          })
        }} >
          <option value="父亲">父亲</option>
          <option value="母亲">母亲</option>
          <option value="其它">其它</option>
        </select>

        {finished.parrelation === '其它' && <input   value={finished['data-other']} name='parrelation' onChange={(e) => {
             const dataname = e.target.getAttribute('data-other')!;
          setFinished({
            ...finished,
            'other-parrelation':e.target.value
          })
        }}  placeholder='请填写与被监护人关系' required />}
      </div>
    </div>
  );
};

export default Parrelation;