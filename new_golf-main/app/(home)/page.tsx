// "use client"
import {HomeType} from '@/utils/types/home'
import AliImage from '@/components/AlImage'
import styles from './page.module.scss'
import Intro from '@/components/Home/Intro'
import Submit from './submit'
import getJsonFile from '@/utils/types/libs'
import classNames from 'classnames'
const getHomeData = async() => {
  const response = await getJsonFile()
  // const data =  response.json();
  return response;
}

export default async function Page() {
   const data:HomeType= await getHomeData();
  return (
    <main className={classNames(styles.main,{
     [ styles.open]:true
    })}>
      
      {data && <Intro data={data} />}
      <div className={styles['intro-btn']}>
        <AliImage src={'/img/logo.jpg'} alt="" width={104} height={52} />
        <div className={styles.content}>
          <p>2023别克中国青少年高尔夫锦标赛<br />（比赛报名于2023年8月29日17:00开启，提前报名无效）</p>
          <span className={styles.btn}><Submit /></span>
        </div>
      </div>
    </main>
  )
}
