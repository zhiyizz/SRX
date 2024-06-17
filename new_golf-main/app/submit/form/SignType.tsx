import React,{useEffect, useState} from 'react';
import styles from '@/styles/submit.module.scss'
const SignType = ({onSignType,reset}:{onSignType:Function,reset:boolean}) => {
  const checkArr = ['父亲','母亲','兄弟姐妹','其他家庭成员','没有家庭成员参与']
  const [checked,setChecked] = useState<string[]>([])
  const [checkValue,setCheckValue] = useState();
  const handleCheck = (event: { target: { checked: any; value: any; }; }) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    onSignType(updatedList)
    setChecked(updatedList);
  };
  useEffect(() => {
    setChecked([])
  },[reset])
  return (
    <div className={styles.item}>
      <div className={styles['item-label']}>有哪些家庭成员参与高尔夫运动？（可多选）</div>
      <div className={styles['item-wrap']}>
        <div className={styles['item-list']}>
          {checkArr.map((item, index) =>(
             <div className={styles.row} key={index}>
             <label><input checked={checked.includes(item) ?? ''}  onChange={handleCheck} value={item} type="checkbox"  />{item}</label>
           </div>
          ))}
          
        </div>

      </div>
    </div>
  );
};

export default SignType;