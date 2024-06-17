import React, { useEffect, useState ,useRef} from 'react';
import styles from '@/styles/submit.module.scss'
import classNames from 'classnames';
type resultType = {
  name:string
  value:string
}
const TrainingSite = ({setTrainingsite,data,reset}:{setTrainingsite:Function,data:any,reset:boolean}) => {
  const checkArr = ["高尔夫俱乐部","高尔夫学院","学校","高尔夫培训基地","其它"]
  const [checked,setChecked] = useState<string[]>([])
  const [id,setId] = useState()
  const [list,setList] = useState<resultType[]>([]) 
  const handleCheck = (check: { target: { checked: boolean; value: string; }; }) => {
       let updatedList = [...checked];
       let arr = [...list]
        if(check){
          if (check.target.checked) {
            updatedList = [...checked, check.target.value];
          } else {
            arr.splice(arr.findIndex((x) => x.name ===  check.target.value),1)
            updatedList.splice(checked.indexOf(check.target.value), 1);
          }
        }
       setList(arr)
       setChecked(updatedList);
       setTrainingsite(arr)
  };

  const handleInput = (id: any,val: { target: { value: any; }; }) => {    
    const filtered = checked.map((item,idx) => {
      if (item === id) {
        return {
          name: item,
          value: val.target.value
        }
      }
      return list[idx]
    })
    setTrainingsite(filtered)
    setList(filtered)
  }

  useEffect(() => {
    setChecked([])
    setList([])
    setTrainingsite()
  },[reset,setTrainingsite])

  return (
    <>
      <div className={styles.item}>
        <div className={styles['item-label']}>您日常进行高尔夫训练或接受高尔夫培训的场所是哪里？（可多选）</div>
        <div className={styles['item-wrap']}>
          <div className={styles['item-list']}>
             {checkArr.map((item, i) => (
              <Group value={item} reset={reset} key={i} checked={checked}  setId={setId} onChangeCheck={handleCheck} onChangeCheckValue={handleInput} />
             ))}
           
          </div>
        </div>
      </div>
    </>
  );
};


const Group = ({ value,reset, checked,onChangeCheck,onChangeCheckValue,setId }: {checked:string[],reset:boolean, value: string,onChangeCheck:Function,onChangeCheckValue:any,setId:Function}) => {
  const [show, setShow] = useState<boolean>(false)
  const [check,setCheck] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [val,setVal] = useState<string>();

  useEffect(() => {
    setShow(false)
  },[reset])
  return (
    <div className={classNames(styles.row,'row')}>

      <label><input type="checkbox"  value={value} onChange={(e) => {
        setShow(e.target.checked);
        onChangeCheck(e)
        setCheck(e);
      }} checked={show} />{value}</label>
      {checked.includes(value) && <input className='input-text'  onChange={(e) => {
        onChangeCheckValue(value,e)
      }} placeholder={`请填写${value}信息`}  required />}

    </div>
  )
}

export default TrainingSite;