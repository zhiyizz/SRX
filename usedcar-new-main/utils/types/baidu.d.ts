declare interface Point {
  new(lng: number | string, lat: number | string): Point
  lng: number
  lat: number
  equals(other: Point): boolean
}

declare interface Size {
  new(width: number, height: number): Size
  width: number
  height: number
  equals(other: Size): boolean
}

declare type AddressComponent = {
  streetNumber: string
  street: string
  district: string
  city: string
  province: string
}


declare type LocalResultPoi = {
  [key: string]: any
}

declare type GeocoderResult = {
  point: Point
  address: string
  addressComponents: AddressComponent
  surroundingPois: LocalResultPoi[]
  business: string
}

declare interface IGeocoder {
  getPoint(arg0: string, arg1: (point: any) => void, arg2: string): unknown
  new(): IGeocoder
  getLocation(point: Point, callback: (r?: GeocoderResult) => void): void
}

declare type LocalCityResult = {
  center: Point
  level: number
  name: string
}

declare interface ILocalCity {
  new(opts?: { renderOptions: any }): ILocalCity
  get(callback: (r?: LocalCityResult) => void): void
}

declare type StatusCode = number

declare type GeolocationResult = {
  point: Point
  accuracy: number
  address: AddressComponent
}

declare interface IGeolocation {
  new(): IGeolocation
  getCurrentPosition(callback: (r: GeolocationResult) => void, opts?: any): void
  getStatus(): StatusCode
  enableSDKLocation(): void
  disableSDKLocation(): void
}

declare interface Control {
  new(): Control
  defaultAnchor: any
  defaultOffset: Size
}

declare type MapTypeId = {
  /**
   * 此地图类型展示普通街道视图
   */
  BMAP_NORMAL_MAP: string
  /**
   * 此地图类型展示地球卫星视图
   */
  BMAP_EARTH_MAP: string
}

declare type MapOptions = {
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

declare interface Viewport {
  /**
   * 视野中心点。
   */
  center: Point
  /**
   * 视野级别。
   */
  zoom: number
}

declare type ViewportOptions = {
  enableAnimation?: boolean
  margins?: number[]
  zoomFactor?: number
  delay?: number
}

declare type TranslateResults = {
  status: number
  points: Point[]
}

declare interface IConvertor {
  new(): IConvertor
  /**
   * 对指定的点数组进行坐标转换，转换规则为从from到to，转换完成后调用callback。
   * 一次最多10个点，from和to的含义请参照Web服务API
   */
  translate(points: Point[], from: number, to: number, callback: (result: TranslateResults) => void): void
}

declare interface BMap {
  new(container: string | HTMLElement, opts?: MapOptions): BMap
  addControl(control: Control): void
  addOverlay(overlay: any): void
  clearOverlays(): void
  centerAndZoom(center: Point, zoom: number): void
  openInfoWindow(info: InfoWindow, point: Point): void
  flyTo(center: Point, zoom: number): void
  setCenter(center: Point | string, options?: { noAnimation?: boolean, callback?: VoidFunction }): void
  setViewport(view: Point[] | Viewport, viewportOptions?: ViewportOptions): void
  setZoom(zoom: number, options?: { noAnimation?: boolean, callback?: VoidFunction, zoomCenter?: Point }): void
}

declare type IconOptions = {
  anchor?: Size
  imageOffset?: Size
}

declare interface Icon {
  new(url: string, size: Size, opts?: IconOptions): Icon
  anchor: Size
  size: Size
  imageOffset: Size
  imageSize: Size
  imageUrl: string
  printImageUrl: string
}

declare type MarkerOptions = {
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

declare interface Marker {
  new(point: Point, opts?: MarkerOptions): Marker
  map: BMap
  addEventListener(event: string, handler: VoidFunction): void
  removeEventListener(event: string, handler: VoidFunction): void
}

declare interface IZoomControl extends Control {
  new(opts?: any): IZoomControl
  anchor: any
  offset: Size
}

declare type InfoWindowOptions = {
  width?: number
  height?: number
  maxWidth?: number
  offset?: Size
  title?: string
  enableAutoPan?: boolean
  enableCloseOnClick?: boolean
}

declare interface InfoWindow {
  new(content: string | HTMLElement, opts?: InfoWindowOptions): InfoWindow
}

declare interface IBaiduMap {
  Convertor: IConvertor
  Geocoder: IGeocoder
  Geolocation: IGeolocation
  Icon: Icon
  InfoWindow: InfoWindow
  LocalCity: ILocalCity
  Map: BMap
  Marker: Marker
  Point: Point
  Size: Size
  ZoomControl: IZoomControl
}
