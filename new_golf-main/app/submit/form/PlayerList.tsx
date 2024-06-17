import React from 'react';
import { TeamPlayersType } from '@/utils/types/submit';
import classNames from 'classnames';
import { useState,Fragment,useEffect } from 'react';
import GroupName from './GroupName';
import styles from '@/styles/submit.module.scss';
import team from '@/styles/submit/team.module.css'
const PATTERN_MOBILE = '1[3-57-9]\\d{9}'
let playerItem = [{id:0},{id:1},{id:2},{id:3}]



const PlayerList = ({setPlayerList,reset}:{setPlayerList:Function,reset:boolean}) => {
  const list = ['球员一', '球员二', '球员三', '球员四']
  const [checked,setChecked] = useState<boolean[]>([]);
  const [checkValue,setCheckValue] = useState<string[]>([]);
  const [data,setData] = useState<TeamPlayersType[]>([]);
  const [formItem,setFormItem] = useState<TeamPlayersType>()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checkValue]
    let updatedListed = [...checked]
    let updataPlayers = [...data];
    const num = Number(event.target.dataset.idx)
    if(event){
      if (event.target.checked) {
        updatedList = [...checkValue, event.target.value];
        updatedListed = [...checked, event.target.checked]
      } else {
        updatedList.splice(checkValue.indexOf(event.target.value), 1);
        updatedListed.splice(checked.indexOf(event.target.checked), 1)
        updataPlayers = data.map((item: { id: number; }) => {
          if(item.id === num){
            return  {id:num}
          }
          return item;
        })
      
        playerItem = updataPlayers
        setData(updataPlayers)
      }

    }
    setCheckValue(updatedList)
    setChecked(updatedListed)
  }

  useEffect(() => {
    if (formItem) {
      playerItem = playerItem.map((t) => {
        return t.id === formItem.id ?  formItem : t;
      })
      setData(playerItem)
    }
  },[formItem])
  
  useEffect(() => {
    if(data){
      let arr = JSON.parse(JSON.stringify(data));
      let filterData = arr.map((item: { id: number | undefined; }) => {
        delete item.id
        return item;
      }).filter((item2: any) => {
        if (JSON.stringify(item2) === '{}') {
          return false;
        }
        return true;
      })
      setPlayerList(filterData)
    }
  },[data,setPlayerList])

  useEffect(() => {
    setChecked([])
    setCheckValue([])
    setPlayerList([])
  },[reset,setPlayerList])

  return (
    <>
      <div className={styles.item}>
        <div className={styles['item-wrap']}>
          <div className={styles['item-list']}>
            <div className={classNames(styles.row, 'row')}>
              {list.map((item, index) => (
                <Fragment key={index}>
                <label><input type="checkbox" checked={checkValue.includes(item) ?? ''} value={item} data-idx={index} onChange={handleChange} />{item}</label>
                {checkValue.includes(item) && <PlayerForm setFormItem={setFormItem}  id={index} />}
                </Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>

    </>
  );
};
const PlayerForm = ({setFormItem,id}:{setFormItem:Function,id:number}) => {
  const [finished,setFinished] = useState<Record<string,string>>({
    region:'中国大陆'
  });
  const [groupName,setGroupName] = useState();
  const [birthday,setBirthday] = useState();
  const [idnum,setIdnum] = useState('大陆身份证（请填写18位有效身份证号）')
  const [filterFinished,setFilterFinished] = useState<any>();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFinished({
      ...finished,
      [event.target.name]: event.target.value
    })
  }
  useEffect(() => {
    setFilterFinished({
        id:id,
        address:finished.address ?? '',
        certificate_code:finished.certificate_code ?? '',
        cga_reg_code:finished.cga_reg_code ?? '',
        gender:finished.gender ?? '',
        guardian_mobile:finished.guardian_mobile ?? '',
        guardian_name:finished.guardian_name ?? '',
        name:finished.name ?? '',
        region:finished.region ?? '',
        birthday: birthday ?? '',
        group:groupName ?? ''
    })
  },[groupName,finished,birthday,id])
  useEffect(() => {
    setFormItem(filterFinished)
  },[filterFinished,setFormItem])
  return (
    <div className={team.group}>
    <div className={styles.flex}>
    <div className={styles.item}>
      <div className={styles['item-label']}>姓名</div>
      <div className={styles['item-wrap']}><input name="name" type="text" value={finished?.name ?? ''} onChange={handleChange} placeholder='请填写姓名' required /></div>
    </div>
    <div className={styles.item}>
      <div className={styles['item-label']}>性别</div>
      <div className={styles['item-wrap']}>
        <select required name="gender" value={finished?.gender ?? '请选择性别'} onChange={handleChange}>
          <option value="">请选择性别</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
    </div>
  </div>
  <GroupName reset={true} data={[[20040608, 20100607], [20100608, 20130627]]} setBirthday={setBirthday} setGroupName={setGroupName} />
      <div className={styles.item}>
        <div className={styles['item-label']}>您属于中华人民共和国哪一地区公民（外籍报名无效）:</div>
        <div className={styles['item-wrap']}>
          <select name="region" value={finished?.region ?? ''} onChange={(e) => {
            handleChange(e)
            switch (e.target.value) {
              case "中国大陆":
                setIdnum("大陆身份证（请填写18位有效身份证号）");
                break;
              case "中国香港":
              case "中国澳门":
                setIdnum("港澳来往内地通行证");
                break;
              case "中国台湾":
                setIdnum("台湾居民来往大陆通行证");
                break;
              default:
                break;
            }
          }}>
            <option value="中国大陆">中国大陆</option>
            <option value="中国香港">中国香港</option>
            <option value="中国澳门">中国澳门</option>
            <option value="中国台湾">中国台湾</option>
          </select>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-label']}>身份信息：</div>
        <div className={styles['item-wrap']}><input name="certificate_code" value={finished?.certificate_code ?? ''} onChange={handleChange} placeholder={idnum} required /></div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-label']}>中高协注册号码（J开头，请注意截图保存，签到时须核对）：</div>
        <div className={styles['item-wrap']}><input name="cga_reg_code" value={finished?.cga_reg_code ?? ''} placeholder='请填写中高协注册号码' onChange={handleChange} pattern={'^[jJ].*'} required /></div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-label']}>家庭住址：</div>
        <div className={styles['item-wrap']}><input name="address" value={finished?.address ?? ''} onChange={handleChange} placeholder="请输入家庭住址" required /></div>
      </div>
      <div className={styles.flex}>
        <div className={styles.item}>
          <div className={styles['item-label']}>监护人姓名</div>
          <div className={styles['item-wrap']}><input name="guardian_name" type="text" value={finished?.guardian_name ?? ''} onChange={handleChange} placeholder='请填写监护人姓名' required /></div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-label']}>监护人手机号码：</div>
        <div className={styles['item-wrap']}><input name="guardian_mobile" placeholder="请填写监护人手机号" value={finished?.guardian_mobile ?? ''} onChange={handleChange} pattern={PATTERN_MOBILE} type='tel' maxLength={11} required /></div>
      </div>
  </div>
  )
}

export default PlayerList;