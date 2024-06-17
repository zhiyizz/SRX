import { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from '@styles/components/configurator-common.module.scss'
import { trackEvent } from '@utils/tracking'


type navTabTyps ={
  name:string
  key:string
}
type navTyps = {
  list:navTabTyps[]
  defaultType:string
  navClick: (name:string) => void
}
export default function SubNav({list,defaultType,navClick}:navTyps) {
  const [current,setCurrent] = useState<string>(list[0].key)
  useEffect(()=>{
    setCurrent(defaultType)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100);
  },[defaultType])
  return (
    <div className={styles.subnav}>
      <ul>
        {list && list.map((item,index) => {
          if(index !== list.length - 1){
            return <li key={index} className={classNames({
              [styles.active]: current == item.key
            })} onClick={()=>{
              setCurrent(item.key)
              navClick(item.key)
              trackEvent(`别克官网PC端-选配页-顶部菜单-${item.name}`)
            }}>{item.name}</li>
          }
        })}
      </ul>
    </div>
  )
}
