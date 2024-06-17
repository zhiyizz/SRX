declare interface Navigator {
  msMaxTouchPoints?: number;
}

declare interface Window {
  BMapGL?: IBaiduMap
  BMAP_STATUS_SUCCESS: number
  stm_clicki?: (action: string, type: string, ...props: (string | Record<string, string | number> | undefined)[]) => void
  _addnewer?: {
    trackPv: (type: string, props?: Record<string, string>) => void
    trackClick: (type: string, label: string, props?: Record<string, string | number>) => void
  }
  _smq?: string[][]
  _agl?: (string | (string | Record<string, string | number>)[])[][]
  _baq?: any
  loanPicList?: string[]
  legacyHost?: string
  initialMobile?: boolean
  __MIAOZHEN_ID?: number
  db?: IDBDatabase
}

declare namespace YKU {
  class Player {
    constructor(id: string, opt?: Record<string, any>);
  }
}

declare interface BuickInterface {
  mzPrefix?: string
  currentPage?: string
}

declare var BUICK: BuickInterface

declare module 'qs';