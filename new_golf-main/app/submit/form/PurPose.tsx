import React, { useEffect, useState } from 'react';
import styles from '@/styles/submit.module.scss'
const PurPose = ({setPurpose,reset}:{setPurpose:Function,reset:boolean}) => {
  const [checked,setChecked] = useState<string[]>([])
  const [value,setValue] = useState<string>();
  const [checkValue,setCheckValue] = useState<string[]>([])

  const handleCheck = (event: { target: { checked: any; value: any; }; }) => {
  
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value.includes('其它') ? '其它' + ':' + value : event.target.value), 1);
    }
    setCheckValue(updatedList)
    setPurpose(updatedList)
    setChecked(updatedList);
  };
  const handleCheckInput = (e: { target: { value: string; checked:boolean }; }) => {
    setValue(e.target.value);
    setCheckValue(prev => [...prev, e.target.value]);
    let  result =  checked.map(item => {return item.includes('其它') ? '其它' + ':' + e.target.value : item})
    setChecked(result);
    setPurpose(result)

  }

  useEffect(() => {
    setCheckValue([])
    setValue('')
    setPurpose();
    setChecked([]);
  },[reset,setPurpose])

  return (
    <div className={styles.item}>
      <div className={styles['item-label']}>孩子打高尔夫球的主要目的是？（可多选）</div>
      <div className={styles['item-wrap']}>
        <div className={styles['item-list']}>
          <div className={styles.row}>
            <label><input checked={checkValue.includes('升学') ?? false} onChange={(e) => {handleCheck(e)}} type="checkbox" value="升学" />升学</label>
          </div>
          <div className={styles.row}>
            <label><input  checked={checkValue.includes('转职业') ?? false} onChange={(e) => {handleCheck(e)}} type="checkbox" value="转职业" />转职业</label>
          </div>
          <div className={styles.row}>
            <label><input  checked={checkValue.includes('纯兴趣出发') ?? false} onChange={(e) => {handleCheck(e)}} type="checkbox" value="纯兴趣出发" />纯兴趣出发</label>
          </div>
          <div className={styles.row}>
            <label><input   type="checkbox"  value="其它" onChange={(e) => {
              handleCheck(e);
            }} checked={checkValue.includes('其它') ?? false} />其它</label>
            {checkValue.includes('其它') && <input  value={value ?? ''}  onChange={handleCheckInput} placeholder='请填写其它目的' required />}
          </div>
        </div>
      </div>
    </div>

  );
};

export default PurPose;