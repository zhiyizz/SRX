export function trackPv(label: string, path?: string) {
  if (label && window.BUICK) {
    let tag = label
    if (window.BUICK.mzPrefix) {
      tag = `${window.BUICK.mzPrefix}-${label}`
    }
    if (path) {
      path = `/${path.replace(/^\//, '')}`
    } else {
      path = location.pathname
    }

    updateDb(tag, 'pv', path)

    if (process.env.NODE_ENV !== 'production') {
      console.log('%cpv', 'background:#ffd700;font-weight:bold;', tag, path)
      return
    }

    window.stm_clicki?.('send', 'pageview', {
      page: path,
      title: tag,
    })
    window._addnewer?.trackPv('pageview', {
      page: path,
      title: tag,
    })
  }
}

export function trackEvent(label: string) {
  if (label && window.BUICK) {
    let tag = label
    if (window.BUICK.mzPrefix) {
      tag = `${window.BUICK.mzPrefix}-${label}`
    }

    updateDb(tag, 'click')

    if (process.env.NODE_ENV !== 'production') {
      console.log('%cclick', 'background:#065535;color:white;font-weight:bold;', tag)
      return
    }
    window.stm_clicki?.('send', 'event', document.title, '点击', tag)
    window._addnewer?.trackClick('click', tag)
    window._smq?.push(['custom', tag, '点击'])
  }
}

export function trackLeads(name: string, mobile: string, leadsId: string, props?: Record<string, string>) {
  updateDb(`${name}|${mobile}|${leadsId}`, 'leads')

  if (process.env.NODE_ENV !== 'production') {
    console.log('%cleads', 'background:#c6e2ff;font-weight:bold;', name)
    return
  }
  if (name && mobile) {
    if (leadsId && leadsId !== '重复不下发') {
      window.stm_clicki?.('send', 'event', {
        'customActionId': 1,
        'customActionLabel1': name,
        'customActionLabel2': mobile,
        'customActionLabel3': leadsId,
        'customActionLabel4': '',
        'customActionValue1': 1,
      })
      window._addnewer?.trackClick('form', '预约试驾', {
        'customActionLabel1': name,
        'customActionLabel2': mobile,
        'customActionLabel3': leadsId,
        'customActionLabel4': '',
        'customActionValue1': 1,
      })
      window._smq?.push(['custom', '预约试驾', '提交成功',
        [leadsId, props?.province || '', props?.city || '', props?.district || '',
          props?.dealername || '', props?.trycar || '', props?.buyPlan || '',
          props?.gender || '', mobile, name].join("_")]);
    }
  }
  window._agl?.push(['track', ['success', { t: 3 }]])
  window._baq?.track("form", { assets_id: "1744664234016776" })
}

export type DbEntry = {
  name: string
  type: 'pv' | 'click' | 'leads'
  path?: string
  count: number
}

/**
 * 更新本地IndexedDB数据。
 * @param name 名称。
 * @param path 路径。
 */
function updateDb(name: string, type: 'pv' | 'click' | 'leads', path?: string) {
  if (window.db) {
    const { db } = window
    const objectStore = db.transaction(['tracking'], 'readwrite').objectStore('tracking')
    const request = objectStore.get(name)
    request.onerror = function() {
      console.error(this.error)
    }
    request.onsuccess = function() {
      const data = this.result as DbEntry | undefined
      if (data) {
        data.count += 1
        const reqUpdate = objectStore.put(data)
        reqUpdate.onerror = function() {
          console.error(this.error)
        }
        // reqUpdate.onsuccess = function() {
        //   console.log('db update:', data.count)
        // }
      } else {
        const trans = db.transaction(['tracking'], 'readwrite')
        // trans.oncomplete = function() {
        //   console.log('db done')
        // }
        trans.onerror = function() {
          console.error(this.error)
        }

        const os = trans.objectStore('tracking')
        const newData: DbEntry = {
          name,
          type,
          count: 1,
        }
        if (path) {
          newData.path = path
        }
        const reqAdd = os.add(newData)
        reqAdd.onerror = function() {
          console.error(name, this.error)
        }
      }
    }
  }
}
