declare interface Navigator {
  msMaxTouchPoints?: number;
}

declare type KrpanoParameters = {
  xml: string | null
  target: string | HTMLElement
  swf?: string
  id?: string
  html5: 'only' | 'auto' | 'prefer' | 'fallback' | 'always' | 'never' | 'only+webgl'
  vars?: Record<string, any>
  initvars?: Record<string, any>
  basepath?: string
  consolelog?: boolean
  mwheel?: boolean
  capturetouch?: boolean
  focus?: boolean
  mobilescale?: number
  safearea?: 'auto' | boolean
  onready?: (krpano: KrpanoInterface) => void
  onerror?: (err: string) => void
  passQueryParameters?: boolean
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
  embedpano?: (p: KrpanoParameters) => void
  removepano?: (id: string) => void
  krpanoJS?: {
    version: string
    build: string
  }
}

declare interface BuickInterface {
  mzPrefix?: string
  currentPage?: string
}

declare var BUICK: BuickInterface
