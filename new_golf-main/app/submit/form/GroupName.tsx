import React, { useEffect, useState } from 'react';
import styles from '@/styles/submit.module.scss'
const GroupName = ({data,setGroupName,reset,setBirthday}:{
  data:number[][]
  reset:boolean
  setGroupName: Function
  setBirthday?:Function
}) => {
  const [value,setValue] = useState<string>();
  const [groupValue,setGroupValue] = useState<string>('');
  const group = ['A组 (U19) ：13-18岁','B组 (U13) ：10-12岁','C组 (U10) 6-9岁']
  const [dateValue,setDateValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
    setBirthday &&  setBirthday(e.target.value)
    const value = e.target.value.replaceAll('-','');
    setValue(value)
    for (var i in data) {
      if (Number(value) >= data[i][0] && Number(value) <= data[i][1]) {
        setGroupValue(group[i])
        break;
      } else {
        setGroupValue('年龄不在分组范围内')
      }
    }
  }
  useEffect(() => {
    setGroupName(groupValue)
  },[groupValue,setGroupName])
  useEffect(() => {
    setGroupValue('')
    setDateValue('')
    setBirthday && setBirthday('')
  },[reset,setBirthday])
  return (
    <>
      <div className={styles.item}>
        <div className={styles['item-label']}>出生日期</div>
        <div className={styles['item-wrap']}>
          <input name="birthday" value={dateValue ?? ''} type='date' onChange={(e) => {
            onChange(e)
          }} required placeholder="出生日期" ></input>
        </div>
      </div>
      {groupValue && (
        <div className={styles.item}>
          <div className={styles['item-label']}>所对应的组别</div>
          <div className={styles['item-wrap']}>
            <input type='text' name="groupname" value={groupValue}  disabled></input>
          </div>
        </div>
      )}
     
    </>
  );
};

export default GroupName;