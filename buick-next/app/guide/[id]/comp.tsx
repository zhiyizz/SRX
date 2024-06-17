'use client'

import { useState, useEffect, useRef, useLayoutEffect, Fragment } from 'react'
import type { NextPage } from 'next'
import styles from '@styles/guide_inner.module.scss'
import classNames from 'classnames'
import AliImage from '@components/AlImage'
import SvgIcon from '@components/icons'
import Link from 'next/link'
import { trackPv } from '@utils/tracking'
import { useSelector } from 'lib/redux'

type detailType = {
  file: string
  width: `${number}`
  height: `${number}`
  cover?: string
  property?: string
}

function isDetailType(val: unknown): val is detailType {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'file' in val
  }
  return false
}

type dataType = {
  id: string
  title: string
  subTitle?: string | undefined
  pcContent?: (detailType | Record<string, detailType[]>)[] | null
  mobileContent?: (detailType | Record<string, detailType[]>)[] | null
}

type resultDetailType = {
  name: string
  file?: string
  width?: `${number}`
  height?: `${number}`
  cover?: string
  property?: string
  content?: detailType[]
}

const PATTERN = /.mp4$/
const Inter: NextPage<{
  data?: dataType
}> = ({ data }) => {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  const navRef = useRef<HTMLUListElement>(null!)
  // const [kvDetail, setKvDetail] = useState<any[]>([])
  const offset = 40;
  const navH = 52;
  const [nav, setNav] = useState<string[]>([])
  const [detail, setDetail] = useState<resultDetailType[]>([])
  const [videoType, setVideoType] = useState(false)

  const isMobile = useSelector(state => state.global.isMobile)

  useEffect(() => {
    trackPv('别克官网-用车指南-详情页')
  }, [])

  useEffect(() => {
    // setNav([])
    // setDetail([])
    //setKvDetail([])
    if (data) {
      const list = isMobile ? data.mobileContent : data.pcContent
      const d: resultDetailType[] = []
      list?.map(item => {
        if (isDetailType(item)) {
          d.push({
            ...item,
            name: 'kv',
          })
          setVideoType(PATTERN.test(item.file))
        } else {
          const keys = Object.keys(item)
          const c = keys.map(k => ({
            name: k,
            content: item[k],
          }))
          d.push(...c)
          setNav(keys)
        }
      })
      setDetail(d)
      // for (const i in list) {
      //   for (const key in list[i]) {
      //     if (Array.isArray(list[i][key])) {
      //       setNav(prev => [...prev, key])
      //       setDetail(prev => [...prev, {
      //         name: key,
      //         content: list[i][key]
      //       }] as any)
      //     } else {
      //       setDetail(prev => [...prev, {
      //         name: 'kv',
      //         ...list[i]
      //       }])
      //       if (PATTERN.test(list[i][key])) {
      //         setVideoType(true)
      //       } else {
      //         setVideoType(false)
      //         break
      //       }
      //       break
      //     }
      //   }
      // }
    }
  }, [data, isMobile])

  useLayoutEffect(() => {
    function scrollFn() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop >= document.body.scrollHeight - window.innerHeight
      const kv = document.querySelector('.kv')?.getBoundingClientRect()
      const list = document.querySelectorAll('.section')
      // const nav = document.querySelectorAll('.nav');
      for (let i = 0; i < list.length; i++) {
        const { top } = list[i].getBoundingClientRect()
        if (scrollTop) {
          setCount(list.length - 1)
        } else {
          if (top - navH <= 0) {
            setCount(i)
          }
        }
      }
      if (kv) {
        if (-kv.y + navH >= kv.height) {
          setShow(true)
        } else {
          setShow(false)
        }
      }
    }
    // scrollFn()
    window.addEventListener('scroll', scrollFn)
    return () => {
      window.removeEventListener('scroll', scrollFn)
    }
  }, [])

  useEffect(() => {
    const list = document.querySelectorAll('.nav')
    if (list) {
      if (count === 0) {
        if (list.length > 0) {
          navRef.current.scrollBy({
            left: list[count].getBoundingClientRect().left - offset,
            behavior: "smooth",
          })
        }
        return
      }
      if (list[count].getBoundingClientRect().x < navRef.current.offsetWidth) {
        navRef.current.scrollBy({
          left: list[count].getBoundingClientRect().left - offset,
          behavior: "smooth",
        })
      }
    }
  }, [count, nav])

  const scrollClick = (e: number) => {
    const list = document.querySelectorAll('.section')
    window.scrollBy({
      top: list[e].getBoundingClientRect().top - 51,
      behavior: "smooth",
    })
  }

  return (
    // <BasePage className={styles.main} title="用车指南" seriesData={series} categoryList={category} smoothScroll={backTop}>
    <main className={styles.main}>
      <div className={styles.wrapper}>
        {videoType ? (
          <div className={classNames(styles.videoDetail, styles.detail)}>
            <div className={styles.title}>
              {data?.title}
              <Link href="/guide" className={styles.back}><SvgIcon icon="back" /><span>返回列表</span></Link>
            </div>
            {detail.map((item, index) => (
              <div className={styles.list} key={index}>
                <h4><span>{index < 9 ? `0${index + 1}` : `${index + 1}`}</span>视频</h4>
                <video src={item.file} key={index} controls poster={item.cover}>
                  <source src={item.file} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        ) : (
          <>
            {nav.length > 0 && (
              <div className={classNames(styles.subnav, [{
                [styles.show]: show
              }])}>
                <ul ref={navRef}>
                  {nav.map((item, index) => (
                    <li className={classNames('nav', {
                      [styles.active]: count === index
                    })} key={index} onClick={() => scrollClick(index)}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className={classNames(styles.detail, styles.picDetail)}>
              <Link href="/guide" className={styles.back}><SvgIcon icon="back" /><span>返回列表</span></Link>
              {detail.length > 0 && detail.map((item, index) => (
                <Fragment key={index}>
                  {item.name === 'kv' ? (
                    <div className={classNames(styles.kv, 'kv')}>
                      {PATTERN.test(item.file!) ?
                        <video key={index}  controls poster={item.cover}> 
                          <source src={item.file} type="video/mp4" />
                        </video> :
                        <AliImage key={index} src={item.file!} width={item.width} height={item.height} alt="" priority />}
                    </div>
                  ) : (
                    <div className="section">
                      {item.content?.map((item2, index2) => (
                        PATTERN.test(item2.file) ?
                          <video key={index}   controls  poster={item2.cover}>
                            <source src={item2.file} type="video/mp4" />
                          </video>
                          : <AliImage key={index2} src={item2.file!} width={item2.width} height={item2.height} alt="" priority={Number(item2.width) * Number(item2.height) >= 1200 * 1200} />
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Inter
