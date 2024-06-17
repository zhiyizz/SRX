import classNames from 'classnames'
import { type FC, useState,useRef,useEffect } from 'react'
import styles from '@styles/components/velite-common.module.scss'
import type { VeliteIbuickApp } from '~types/feature';
import gsap from 'gsap';
type VeliteIbuickAppProps =  {
  data: VeliteIbuickApp,
  code:string
}

const VeliteApp: FC<VeliteIbuickAppProps> = ({ code,data }) => {
 // console.log(data)
  const [cur, setCur] = useState(0);
  const app = useRef<HTMLDivElement>(null!);
  const slideNav = (index: number) => {
    setCur(index)
  }
 useEffect(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: app.current,
      start:'bottom bottom',

    }
  })
 },[])

  return (
    <div className={classNames(styles.ibuickapp)} ref={app}>
      <div className={classNames(styles.banner)}>
        <div className={classNames(styles.container)}>
          <div className={styles.bg}>
            <picture>
              <source srcSet={`/img/${code}/ibuick_m.jpg`} media="(max-width: 768px)" />
              <img src={`/img/${code}/ibuick.jpg`} alt="" />
            </picture>
            {/* <picture>
              <source srcSet={`/img/${code}/ibuick_m_app.png`} media="(max-width: 768px)" />
              <img src={`/img/${code}/ibuick_app.png`} alt="" className={classNames(styles.app)} />
            </picture> */}
          </div>
          {/* <div className={classNames(styles.copy)}>
             <div className={classNames(styles.line, 'line')}></div>
             <div className={classNames(styles.text)}>
              <h3>一键开启，微蓝智慧用车生活</h3>
              <p>iBuick APP整合全新线上购车服务与线下周到用车服务保障，<br />拥有一台新车，开启意想不到的微蓝车生活。</p>
             </div>
          </div> */}
        </div>
      </div>
      <div className={classNames(styles['app-list'])}>
        <div className={classNames(styles.container)}>
          <ul>
            {data.tab?.map((item, idx) => {
              return (
              
                <li key={idx} className={cur === idx ? classNames(styles['active'],styles["icon_"+data?.url[idx]]) : styles["icon_"+data?.url[idx]]} onClick={() => slideNav(idx)}>
                  <span></span>
                  <p>{item}</p>
                </li>
              )
            })}
          </ul>
          <div className={classNames(styles.copy)}>
            {data.content?.map((item, idx) => {

              return (<div key={idx} className={classNames(styles.list)} style={{ "display": cur === idx ? 'block' : "none" }}>
                {item.map((sub_item, sub_idx) => {
                  return (
                    <div key={sub_idx} className={classNames(styles.item)}>
                      <h3>{sub_item.title}</h3>
                      <p>{sub_item.content}</p>
                    </div>
                  )
                })}
              </div>)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeliteApp
