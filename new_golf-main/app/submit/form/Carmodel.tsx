import React, { useEffect, useState } from 'react';
import styles from '@/styles/submit.module.scss'
const Carmodel = ({setCarModelList,reset}:{setCarModelList:Function,reset:boolean}) => {
  const arr = ['别克世纪 CENTURY','别克GL8艾维亚','别克GL8 ES陆尊','别克君越','别克昂科旗','其它'];
  const [checked,setChecked] = useState<string[]>([])
  const [value,setValue] = useState<string>();
  const [checkValue,setCheckValue] = useState<string[]>()
  const [data,setData] = useState<Record<string,string>>({
    par_carmodel:'是'
  });
  const handleCheck = (event: { target: { checked: any; value: any; }; }) => {
    let updatedList = [...checked];
    if (event.target.checked) {
    
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value.includes('其它') ? '其它' + ':' + value : event.target.value), 1);
    }
    setCheckValue(updatedList)
    setCarModelList(updatedList)
    setChecked(updatedList);
  };
  const handleCheckInput = (e: { target: { value: string; name:string }; }) => {
    setValue(e.target.value);
    let  result =  checked.map(item => {return item.includes('其它') ? '其它' + ':' + e.target.value : item})
    setCarModelList(result)
    setChecked(result);
  }

  useEffect(() => {
    setCheckValue([])
    setCarModelList()
    setChecked([])
    setData({
      par_carmodel: '是'
    })
  },[reset,setCarModelList])
  useEffect(() => {
   data.par_carmodel === '否' && setCheckValue([])
   setCarModelList()
   setChecked([])
  },[data,setCarModelList])
  return (
    <>
      <div className={styles.item}>
        <div className={styles['item-label']}>家庭是否拥有汽车？</div>
        <div className={styles['item-wrap']}>
          <select name="par_carmodel" value={data?.par_carmodel ?? ''} onChange={(e) => {
            setData({
              ...data,
              [e.target.name]:e.target.value
            })
          }}>
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
      </div>
      {data?.par_carmodel === '是' && (
        <>
          <div className={styles.item}>
            <div className={styles['item-label']}>家庭拥有汽车数量？</div>
            <div className={styles['item-wrap']}>
              <select name="par_carmodel_num" value={data.par_carmodel_num ?? ''} onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]:e.target.value
                })
              }}>
                <option value="一辆">一辆</option>
                <option value="二辆">二辆</option>
                <option value="多辆">多辆</option>
              </select>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles['item-label']}>现有车型为：</div>
            <div className={styles['item-wrap']}>
              <div className={styles['item-list']}>
                {arr.map((item,index) => (
                  <div className={styles.row} key={index}>
                  <label><input onChange={(e) => {
                    handleCheck(e)
                  }} name="carlist"  checked={checkValue?.includes(item) ?? false} type="checkbox" value={item} />{item}</label>
                
                </div>
                ))}
                   { checkValue?.includes('其它') ? <input onChange={handleCheckInput} value={data?.caranme} name="carname"  placeholder='请填写其它车型名称' required />:null}

              </div>
            </div>
          </div>
        </>
      )}

    </>

  );
};

export default Carmodel;