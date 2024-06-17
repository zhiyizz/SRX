'use client'

import { useState, useEffect, Fragment } from 'react'
import KvSlider from '@components/KvSlider'
import styles from '@styles/guide.module.scss'
import type { NextPage } from 'next'
import AliImage from '@components/AlImage'
import classNames from 'classnames'
import { divideByElement } from '@utils/helper'
import Link from 'next/link'

export type GuideContent = {
  id: number
  cover: string
  title: string
  subTitle?: string | null
  publicationDate: string
}

type listType = {
  name: string
  content: GuideContent[]
}[]

const Guide: NextPage<{
  data?: {
    categories: Record<string, Record<string, GuideContent[]>[] | Record<string, GuideContent[]>>,
    vehicleSeries: Record<string, GuideContent[]>,
  }
}> = ({ data }) => {
  const [categoriesNav, setCategoriesNav] = useState<string[]>([])
  const [categoriesValue, setCategoriesValue] = useState<string>()
  const [categories, setCategories] = useState<{
    name: string
    content: {
      name: string
      list: GuideContent[]
    }[]
  }[]>([])

  const [vehicleNav, setVehicleNav] = useState<string[]>([])
  const [vehicleValue, setVehicleValue] = useState<string>()
  const [vehicleList, setVehicleList] = useState<listType>([])

  // useEffect(() => {
  //   trackPv('别克官网-用车指南')
  // },[])
  useEffect(() => {
    // setCategoriesNav([])
    // setVehicleNav([])
    if (data) {
      setCategoriesNav(Object.keys(data.categories))
      // for (const key in data.categories) {
      //   setCategoriesNav(oldNav => [...oldNav, key])
      // }
      // setVehicleList([])
      setVehicleNav(Object.keys(data.vehicleSeries))
      // const vl = []
      // for (const key in data.vehicleSeries) {
      //   setVehicleNav(oldNav => [...oldNav, key])
      //   vl.push({
      //     name: key,
      //     content: data.vehicleSeries[key]
      //   })
      //   setVehicleList(prev => [
      //     ...prev,
      //     {
      //       name: key,
      //       content: data.vehicleSeries[key]
      //     }
      //   ])
      // }
      // setVehicleList(Object.keys(data.vehicleSeries).map(k => ({
      //   name: k,
      //   content: data.vehicleSeries[k]
      // })))
    }
  }, [data])

  // useEffect(() => {
  //   categoriesNav && setCategoriesValue(categoriesNav[0])
  // }, [categoriesNav])

  useEffect(() => {
    // setCategories([])
    const trans = (obj: Record<string, GuideContent[]>) => Object.keys(obj).map(k => ({
      name: k,
      list: obj[k],
    }))

    if (data?.categories) {
      const cate = data.categories
      if (categoriesValue) {
        const selected = cate[categoriesValue]
        if (selected) {
          setCategories([{
            name: categoriesValue,
            content: Array.isArray(selected) ? selected.flatMap(trans) : trans(selected),
          }])
        }
      } else {
        setCategories(Object.keys(cate).map(k => {
          const obj = cate[k]
          return {
            name: k,
            content: Array.isArray(obj) ? obj.flatMap(trans) : trans(obj),
          }
        }))
      }
    //   for (const key in data.categories) {
    //     if (key === categoriesValue) {
    //       console.log(1)
    //       for(const list_key in data.categories[categoriesValue]){
    //         for(const list_arr in data.categories[categoriesValue][list_key]) {
    //           // setCategories(prev => [...prev,{
    //           //   name:key,
    //           //   content:[{
    //           //     name:list_arr,
    //           //     list:data.categories[categoriesValue][list_key][list_arr]
    //           //   }]
    //           // }])
    //           categories.push({
    //             name:key,
    //             content:[{
    //               name:list_arr,
    //               list:data.categories[categoriesValue][list_key][list_arr]
    //             }]
    //           })
    //         }
    //       }
    //     }
    //   }
    // } else if (data) {
    //   for (const key in data.categories) {
    //     for(const list_key in data.categories[key]){
    //       for(const list_arr in data.categories[key][list_key]) {
    //         // setCategories(prev => [...prev,{
    //         //   name:key,
    //         //   content:[{
    //         //     name:list_arr,
    //         //     list:data.categories[key][list_key][list_arr]
    //         //   }]
    //         // }])
    //         categories.push({
    //           name:key,
    //           content:[{
    //             name:list_arr,
    //             list:data.categories[key][list_key][list_arr]
    //           }]
    //         })
    //       }
    //     }
    //   }
    // }
    // setCategories(categories)
    }

  }, [data?.categories, categoriesValue])



  useEffect(() => {
    // setVehicleList([])
    if (data?.vehicleSeries) {
      if (vehicleValue) {
        const selected = data.vehicleSeries[vehicleValue]
        if (selected) {
          setVehicleList([{
            name: vehicleValue,
            content: selected,
          }])
        }
      } else {
        setVehicleList(Object.keys(data.vehicleSeries).map(k => ({
          name: k,
          content: data.vehicleSeries[k],
        })))
        // for (const key in data.vehicleSeries) {
        //   setVehicleList(prev => [
        //     ...prev,
        //     {
        //       name: key,
        //       content: data.vehicleSeries[key]
        //     }
        //   ])
        // }
      }
      // for (const key in data.vehicleSeries) {
      //   setVehicleList(prev => [
      //     ...prev,
      //     {
      //       name: key,
      //       content: data.vehicleSeries[key]
      //     }
      //   ])
      // }
    }
  }, [data?.vehicleSeries, vehicleValue])

  // const handleScrollTop = useCallback(() => {
  //   if (!backTop) {
  //     setBackTop(true)
  //     setTimeout(() => {
  //       window.scrollTo(0, 0)
  //     }, 100);
  //     setTimeout(setBackTop, 3000, false)
  //   }
  // }, [backTop])
  return (
    // <BasePage className={styles.main} title="用车指南" seriesData={series} categoryList={category} smoothScroll={backTop}>
    <main className={styles.main}>
      <KvSlider className={styles.kv} slides={[{
        id: 1,
        name: '用车指南',
        media: [{ url: '/img/guide/kv.jpg', device: 'pc', align: 'middle' }, { url: '/img/guide/mob/kv.jpg', device: 'mob', align: 'middle' }],
      }]} />
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={classNames(styles.title, styles['bm-border'])}>
            <div className={styles.tools}>
              <div className={styles.select}>
                <select onChange={(e) => {
                  setCategoriesValue(e.target.value)
                }}>
                  <option value="">功能选择</option>
                  {
                    categoriesNav.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
         {/* {Object.keys(dataq.categories)} */}
          {categories.map((item, index) => (
            item.content.map((item2,index2) => (
              <Fragment key={index2 * index}>
                <h3 className={styles.title}>{item.name}</h3>
                <div className={styles.listwrap} key={index}>
                  <h4 className={styles.subTitle}><span>{`${index2 + 1}`.padStart(2, '0')}</span> {item2.name}</h4>
                  <ul className={styles.list}>
                    {item2.list.map((item3, index3) => (
                      <li key={index3}>
                        <Link href={`/guide/${item3.id}`}>
                          <AliImage src={item3.cover} width={507} height={352} />
                          <h4 className={styles['list-title']} >{divideByElement(item3.title,undefined,'\\n')}</h4>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fragment>
            ))
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={classNames(styles.title, styles['bm-border'])}>
            <div className={styles.tools}>
              <div className={styles.select}>
                <select onChange={(e) => {
                  setVehicleValue(e.target.value)
                }}>
                  <option value="">车型</option>
                  {vehicleNav.map((item,index2) => (
                    <option value={item} key={index2}>{item}</option>
                  ))}
                  {/* {tags && tags.map(item => <option key={item.code} value={item.code}>{item.name}</option>)} */}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {vehicleList.map((item,index) => (
            <div className={styles.listwrap} key={index}>
              <h3 className={styles.title}>{item.name}</h3>
              <ul className={styles.list}>
                {item.content.map((item2, index2) => (
                  <li key={index2}>
                    <Link href={`/guide/${item2.id}`}>
                    <AliImage src={item2.cover} width={507} height={352} />
                    <h4 className={styles['list-title']}>{divideByElement(item2.title)}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


export default Guide
