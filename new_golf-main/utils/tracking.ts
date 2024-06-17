

export function trackPv(label: string, path?: string) {
  // if (process.env.NODE_ENV !== 'production') return
  if (label) {
    let tag = label
    // if (window.BUICK.mzPrefix) {
    //   tag = `${window.BUICK.mzPrefix}-${label}`
    // }
    console.log('pv', tag)
    if (path) {
      path = `/${path.replace(/^\//, '')}`
    } else {
      path = location.pathname
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
//  if (process.env.NODE_ENV !== 'production') return
  if (label) {
    let tag = label
    // if (window.BUICK.mzPrefix) {
    //   tag = `${window.BUICK.mzPrefix}-${label}`
    // }
    window.stm_clicki?.('send', 'event', document.title, '点击', tag)
    window._addnewer?.trackClick('click', tag)
    window._smq?.push(['custom', tag, '点击'])
  }
}

export function trackLeads(name: string, mobile: string, leadsId: string, props?: Record<string, string>) {
 // if (process.env.NODE_ENV !== 'production') return
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
