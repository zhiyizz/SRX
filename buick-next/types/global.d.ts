type ObjectKeys<T> = 
  T extends object ? (keyof T)[] :
  T extends number ? [] :
  T extends Array<unknown> | string ? string[] :
  never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

declare interface Navigator {
  msMaxTouchPoints?: number;
}

interface KrpanoElement extends HTMLDivElement {
  krpano: KrpanoInterface
}

interface KrpanoInterface extends HTMLElement {
  /**
     * Remove/unload the krpano viewer.
     */
  unload(): void
  set(variable: string, value: string): void
  get(variable: string): unknown
  call(action: string): void
}

declare interface KrpanoGlobal {
  actions: {
    loadpanoimage: (flags?: string, blend?: string, loaddone?: VoidFunction) => void
    loadpano: (url: string, vars?: string | Record<string, string>, flags?: string) => void
    includexml: (url: string) => void
    lookat: (h: number, v:number, fov?: number) => void
  }
  image: {
    reset: (opt?: 'copy') => void
    cube: {
      url: string
      multires?: string
    }
    sphere: {
      url: string
      multires?: string
    }
    type: 'cube' | 'cubestrip' | 'sphere' | 'cylinder' | 'flat' | 'fisheye'
    hfov: number
    vfov: number
    voffset: number
    crop: string
    prealign: string
    multiresthreshold?: number
    baseindex?: number
    tilesize: number
    tileoverlap?: number
    cubelabels?: string
    ox?: number
    oy?: number
    oz?: number
    frames?: number
    frame?: number
    loadstate: 0 | 1 | 2 | 3
  }
}

declare type KrpanoParameters = {
  xml: string | null
  target: string | HTMLElement
  swf?: string
  id?: string
  html5: 'only' | 'auto' | 'prefer' | 'fallback' | 'always' | 'never' | 'only+webgl'
  vars?: Record<string, string | number>
  initvars?: Record<string, string | number>
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
  BMapGL?: BMapGL.AddressComponent
  BMAP_STATUS_SUCCESS: number
  stm_clicki?: (action: string, type: string, ...props: (string | Record<string, string | number> | undefined)[]) => void
  _addnewer?: {
    trackPv: (type: string, props?: Record<string, string>) => void
    trackClick: (type: string, label: string, props?: Record<string, string | number>) => void
  }
  _smq?: string[][]
  _agl?: (string | (string | Record<string, string | number>)[])[][]
  _baq?: {
    track: (act: string, opts?: Record<string, unknown>) => void
  }
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
  WeixinJSBridge?: {
    invoke: (act: string, opt?: Record<string, unknown>, cb?: VoidFunction) => void
  }
  BUICK?: BuickInterface
}

declare namespace YKU {
  class Player {
    constructor(id: string, opt?: Record<string, unknown>);
  }
}

declare interface BuickInterface {
  mzPrefix?: string
  currentPage?: string
}

declare const BUICK: BuickInterface

declare interface ApiResponse {
  status?: 'ok';
  /**
   * 错误代码。
   */
  code?: number;
  /**
   * 错误消息。
   */
  err?: string;
}

declare interface GlobalDataResponse<T = unknown> extends ApiResponse {
  data?: T;
  revalidate?: boolean;
  updated?: string;
  partial?: boolean
}
