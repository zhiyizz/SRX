
import { useCallback, useEffect, useState } from 'react'
import type { DealerType } from '../types/dealer'
import classNames from 'classnames'
import bdStyles from '../styles/components/baidumap.module.scss'
import BaiduScript, { type BaiduLocation } from './BaiduScript'

type BaiduProperty = {
  /**
   * 组件的 CSS Modules 样式对象。
   */
  styles: { readonly [key: string ]: string }
  center?: BMapGL.Point | string
  /**
   * 地图 ready
   */
  point?: BMapGL.Point
  /**
   * 是否加载地图接口
   */
  exteral?:boolean
  /**
   * 数据
   */
  data?:DealerType[],
  /**
   * 当前选择经销商数据
   */
  currentData?:number

  onSelected?: (index: number) => void
  onPosition?: (pos: BaiduLocation) => void
}


export default function BdMapComponents({ styles, center, exteral = false, data, currentData, onSelected, onPosition }:BaiduProperty){
  const [map, setMap] = useState<BMapGL.Map>()
  const [mapStage,setMapStage] = useState<BMapGL.Marker[]>()

  const markerDom = useCallback((_map: BMapGL.Map | null, cnt?: DealerType) => {
    if (window.BMapGL?.Map && _map && cnt) {
      const currentPoint = new window.BMapGL.Point(cnt.lng,cnt.lat)
      let item = `<p>地址：<span>${cnt.address}</span></p>`
      if (cnt.tel && !cnt.serviceTel) {
        item +=`<p>服务热线：<a href="tel:${cnt.tel}">${cnt.tel}</a></p>`
      } else if (cnt.tel && cnt.serviceTel) {
        item +=`<p>销售服务热线：<a href="tel:${cnt.tel}">${cnt.tel}</a></p>`
        item +=`<p>售后服务热线：<a href="tel:${cnt.serviceTel}">${cnt.serviceTel}</a></p>`
      }
      const infoWindow = new window.BMapGL.InfoWindow(item, {
        title: cnt.name,
      });
      _map.openInfoWindow(infoWindow, currentPoint)
      _map.flyTo(currentPoint, 15)
      // _map.setZoom(16, { noAnimation: true, callback: () => _map.openInfoWindow(infoWindow, currentPoint) })
      // _map.setCenter(currentPoint, { noAnimation: true, callback: () => _map.openInfoWindow(infoWindow, currentPoint) })
    }
  }, [])

  useEffect(() => {
    if (window.BMapGL?.Map) {
      const { Icon, Point, Marker, Size } = window.BMapGL
      const addDealerMarker = (_map: BMapGL.Map, cnt:DealerType, idx: number) => {
        const buickIcon = new Icon('https://static.buick.com.cn/assets/icon/map-icon.png', new Size(24, 34), {
          // imageOffset: new Size(12, 22),
        });
        const currentPoint = new Point(cnt.lng,cnt.lat)
        const marker = new Marker(currentPoint,{
          offset: new Size(0, -17),
          icon:buickIcon,
          title: cnt.referred || cnt.name,
        });
        marker.addEventListener("click", function(){
          markerDom(_map,cnt)
          onSelected?.(idx)
        });
        // if(cnt.index === 0){
        //   markerDom(_map,cnt)
        // }
        _map.addOverlay(marker);
        return marker
      }

      if (map) {
        map.clearOverlays()
        const p: BMapGL.Point[] = []
        const arr = data?.filter(item => item.lat && item.lng).map((item, index)=> {
          p.push(new Point(item.lng, item.lat))
          return addDealerMarker(map!,item, index)
        })
        setMapStage(arr)
        map.setViewport(p)
      }
    }
  }, [data, map, markerDom, onSelected])

  useEffect(() => {
    if (center && map) {
      console.log('center to:', center)
      map.setCenter(center)
    }
  }, [center, map])

  useEffect(()=>{
    if(typeof currentData !== 'undefined' && data && Array.isArray(mapStage) && mapStage[currentData]){
      markerDom(mapStage[currentData].map,data[currentData])
    }
  },[currentData, data, mapStage, markerDom])

  useEffect(() => {
    const init = () => {
      if (!map && window.BMapGL?.Map) {
        console.log('init bmap')
        const bmap = new window.BMapGL.Map("baiduMap")
        const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
        const point = new window.BMapGL.Point(116.404, 39.915)
        bmap.centerAndZoom(point, 15)
        bmap.addControl(zoomCtrl)
        setMap(bmap)
      } else {
        setTimeout(init, 200)
      }
    }
    init()
  }, [map])

  return (
    <div className={styles['bd-container']}>
      { !exteral && <BaiduScript onPosition={onPosition} /> }
      <div id="baiduMap" className={classNames(styles.wrapper,bdStyles.bdglobal)}></div>
    </div>
  )
}
