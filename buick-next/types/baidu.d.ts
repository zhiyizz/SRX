declare namespace BMapGL {
  class Point {
    constructor(lng: number | string, lat: number | string)
    lng: number
    lat: number
    equals(other: Point): boolean
  }

  class Size {
    constructor(width: number, height: number)
    width: number
    height: number
    equals(other: Size): boolean
  }

  type AddressComponent = {
    streetNumber: string
    street: string
    district: string
    city: string
    province: string
  }

  type LocalResultPoi = {
    title: string
    point: Point
    url: string
    address: string
    city: string
    phoneNumber: string
    postcode: string
    type: unknown
    isAccurate: boolean
    province: string
    tags: string[]
    detailUrl: string
  }

  type GeocoderResult = {
    point: Point
    address: string
    addressComponents: AddressComponent
    surroundingPois: LocalResultPoi[]
    business: string
  }

  class Geocoder {
    getLocation(point: Point, callback: (r?: GeocoderResult) => void): void
  }

  type LocalCityResult = {
    center: Point
    level: number
    name: string
  }

  class LocalCity {
    constructor(opts?: { renderOptions: unknown })
    get(callback: (r?: LocalCityResult) => void): void
  }

  type StatusCode = number

  type GeolocationResult = {
    point: Point
    accuracy: number
    address: AddressComponent
  }

  class Geolocation {
    getCurrentPosition(callback: (r: GeolocationResult) => void, opts?: {
      enableHighAccuracy?: boolean
      timeout?: number
      maximumAge?: number
      SDKLocation?: boolean
    }): void
    getStatus(): StatusCode
    enableSDKLocation(): void
    disableSDKLocation(): void
  }

  const BMAP_ANCHOR_TOP_LEFT: string
  const BMAP_ANCHOR_TOP_RIGHT: string
  const BMAP_ANCHOR_BOTTOM_LEFT: string
  const BMAP_ANCHOR_BOTTOM_RIGHT: string

  class Control {
    defaultAnchor: string
    defaultOffset: Size
  }

  type MapTypeId = {
    /**
     * 此地图类型展示普通街道视图
     */
    BMAP_NORMAL_MAP: string
    /**
     * 此地图类型展示地球卫星视图
     */
    BMAP_EARTH_MAP: string
  }

  type MapOptions = {
    /**
     * 地图允许展示的最小级别
     */
    minZoom?: number
    /**
     * 地图允许展示的最大级别
     */
    maxZoom?: number
    /**
     * 地图类型，默认为 `BMAP_NORMAL_MAP`
     */
    mapType?: MapTypeId
    /**
     * 开启自动适应地图容器变化，默认启用
     */
    enableAutoResize?: boolean
  }

  interface Viewport {
    /**
     * 视野中心点。
     */
    center: Point
    /**
     * 视野级别。
     */
    zoom: number
  }

  type ViewportOptions = {
    enableAnimation?: boolean
    margins?: number[]
    zoomFactor?: number
    delay?: number
  }

  type TranslateResults = {
    status: number
    points: Point[]
  }

  class Convertor {
    /**
     * 对指定的点数组进行坐标转换，转换规则为从from到to，转换完成后调用callback。
     * 一次最多10个点，from和to的含义请参照Web服务API
     */
    translate(points: Point[], from: number, to: number, callback: (result: TranslateResults) => void): void
  }

  interface Overlay {
    initialize(map: Map): HTMLElement
    isVisible(): boolean
    draw(): void
    show(): void
    hide(): void
  }

  class Map {
    constructor(container: string | HTMLElement, opts?: MapOptions)
    addControl(control: Control): void
    addOverlay(overlay: Overlay): void
    clearOverlays(): void
    centerAndZoom(center: Point, zoom: number): void
    openInfoWindow(info: InfoWindow, point: Point): void
    flyTo(center: Point , zoom: number): void
    setCenter(center: Point | string, options?: { noAnimation?: boolean, callback?: VoidFunction }): void
    setViewport(view: Point[] | Viewport , viewportOptions?: ViewportOptions): void
    setZoom(zoom: number, options?: { noAnimation?: boolean, callback?: VoidFunction, zoomCenter?: Point }): void
  }

  type IconOptions = {
    anchor?: Size
    imageOffset?: Size
  }

  class Icon {
    constructor(url: string, size: Size, opts?: IconOptions)
    anchor: Size
    size: Size
    imageOffset: Size
    imageSize: Size
    imageUrl: string
    printImageUrl: string
  }

  type MarkerOptions = {
    offset?: Size
    icon?: Icon
    enableMassClear?: boolean
    enableDragging?: boolean
    enableClicking?: boolean
    raiseOnDrag?: boolean
    draggingCursor?: string
    rotation?: number
    title?: string
  }

  class Marker implements Overlay {
    constructor(point: Point, opts?: MarkerOptions)
    map: Map | null
    addEventListener(event: string, handler: VoidFunction): void
    removeEventListener(event: string, handler: VoidFunction): void
    initialize(map: Map): HTMLElement
    isVisible(): boolean
    draw(): void
    show(): void
    hide(): void
  }

  class ZoomControl extends Control {
    constructor(opts?: {
      anchor?: string
      offset?: Size
    })
    anchor: string
    offset: Size
  }

  type InfoWindowOptions = {
    width?: number
    height?: number
    maxWidth?: number
    offset?: Size
    title?: string
    enableAutoPan?: boolean
    enableCloseOnClick?: boolean
  }

  class InfoWindow {
    constructor(content: string | HTMLElement, opts?: InfoWindowOptions)
  }
}

declare interface IBaiduMap {
  Convertor: BMapGL.Convertor
  Geocoder: Geocoder
  Geolocation: Geolocation
  Icon: Icon
  InfoWindow: InfoWindow
  LocalCity: LocalCity
  Map: BMap
  Marker: Marker
  Point: Point
  Size: Size
  ZoomControl: ZoomControl
}
