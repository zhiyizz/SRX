'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { utils, writeFileXLSX } from 'xlsx'
import SvgIcon from '@components/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { DbEntry } from '@utils/tracking'

import styles from '@styles/tracking.module.scss'
import { disableTracking, enableTracking, useDispatch } from 'lib/redux'

export default function TrackingPage({ tracking }: {
  tracking?: boolean | string | number
}) {
  const [db, setDb] = useState<IDBDatabase>()
  const [list, setList] = useState<DbEntry[]>()
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState(false)

  const table = useRef<HTMLTableElement>(null)

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!window.db && tracking) {
      const req = indexedDB.open('buick', 3)
      req.onerror = function() {
        console.error(this.error)
      }
      req.onsuccess = function() {
        window.db = this.result
        setDb(this.result)
      }
      req.onupgradeneeded = function() {
        const db = this.result
        window.db = db
        setDb(db)

        const objectStore = db.createObjectStore('tracking', {
          keyPath: 'name',
        })

        objectStore.createIndex('count', 'count', {
          unique: false,
        })
      }
      dispatch(enableTracking())
    } else if (window.db) {
      setDb(window.db)
    } else {
      router.replace('/')
    }
  }, [dispatch, router, tracking])

  function clearDb() {
    if (db) {
      const trans = db.transaction(['tracking'], 'readwrite')
      trans.onerror = function() {
        console.error(this.error)
      }
      trans.oncomplete = function() {
        console.log('cleared')
      }
      const objectStore = trans.objectStore('tracking')
      const reqeust = objectStore.clear()
      reqeust.onsuccess = function() {
        console.log('clear suc')
      }
    }
  }

  const fetchDb = useCallback(() => {
    if (db) {
      const trans = db.transaction(['tracking'], 'readonly')
      trans.onerror = function() {
        console.error(this.error)
      }
      trans.oncomplete = function() {
        console.log('done')
      }
      const objectStore = trans.objectStore('tracking')
      const request = objectStore.getAll()
      request.onerror = function() {
        console.error(this.error)
      }
      request.onsuccess = function() {
        const data = this.result as DbEntry[]
        setList(data)
        setLoading(false)
      }
    }
  }, [db])

  useEffect(() => {
    if (view) {
      setLoading(true)
      fetchDb()
    }
  }, [fetchDb, view])

  const saveXlsx = useCallback(() => {
    const headers = ['监测名称', '监测类型', 'Path', '计数']
    const ws = utils.table_to_sheet(table.current)
    utils.sheet_add_aoa(ws, [headers], { origin: 0 })
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'tracking')
    writeFileXLSX(wb, 'tracking.xlsx')
  }, [])

  return (
    <div className={styles.main}>
      {db && <div className={styles.hint}><span className={styles['icon-success']}>✓</span> 监测代码跟踪器已开启，继续<Link href="/">访问官网</Link>来收集更多监测数据。</div>}
      <ul className={styles.action}>
        <li><button className={styles['button-25']} onClick={() => {
          router.push('/')
        }}>官网首页</button></li>
        <li><button className={styles['button-25']} onClick={() => {
          if (view) {
            setLoading(true)
            fetchDb()
          } else {
            setView(true)
          }
        }}>{view ? '刷新数据' : '显示数据'}</button></li>
        <li><button className={styles['button-25']} onClick={() => {
          if (confirm('确认清空数据？')) {
            clearDb()
            setList(undefined)
          }
        }} disabled={!list || list.length === 0}>清空数据</button></li>
        <li><button className={styles['button-25']} onClick={saveXlsx} disabled={!view || !list || list.length === 0}>导出数据</button></li>
        <li><button className={styles['button-25']} onClick={() => {
          if (confirm('确认退出？')) {
            dispatch(disableTracking())
            delete window.db
            indexedDB.deleteDatabase('buick')
            router.replace('/api/tracking?quit=1')
          }
        }}>退出监测</button></li>
      </ul>
      {view && <div className={styles.data}>
        <table ref={table}>
          <thead>
            <tr>
              <th>监测名称</th>
              <th>监测类型</th>
              <th>路径</th>
              <th>计数</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.type.toUpperCase()}</td>
                <td><code>{item.path}</code></td>
                <td>{item.count}</td>
              </tr>
            ))}
            {(!list || !list.length) && (
              <tr>
                <td className={styles.empty} colSpan={4}>暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>}

      {loading && <div className="loading">
        <SvgIcon icon="spin" />
        <span>正在加载</span>
      </div>}
    </div>
  )
}
