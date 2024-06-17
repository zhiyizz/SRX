

import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import bdStyles from '../styles/components/baidumap.module.scss'
import BaiduScript, { BaiduLocation } from './BaiduScript'

type DealerType = {
  Address: string
  DepartmentId: string
  Linkman: string
  Linkphone: string
  VendorCode: string
  VendorFullName: string
  VendorShortName: string
  city: string
  in_sale_count: string
  province: string
}
type BaiduProperty = {
  /**
   * 组件的 CSS Modules 样式对象。
   */
  styles: { readonly [key: string]: string }
  center?: Point | string
  /**
   * 地图 ready
   */
  //point?: Point
  /**
   * 是否加载地图接口
   */
  exteral?: boolean
  /**
   * 数据
   */
  data?: DealerType,
  /**
   * 当前选择经销商数据
   */
  currentData?: number
  onSelected?: (index: number) => void
  onPosition?: (pos: BaiduLocation) => void
}
type _Point = { lng: string, lat: string }
export default function BdMapComponents({ styles, center, exteral = false, data, currentData, onSelected, onPosition }: BaiduProperty) {
  const [map, setMap] = useState<BMap>()
  const [mapStage, setMapStage] = useState<Marker[]>()
  const [point, setPoint] = useState<_Point>()
  useEffect(() => {
    //创建地址解析器实例
    if (window['BMapGL']) {
      let myGeo = new window.BMapGL.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(data?.Address!, function (point: any) {
        if (point) {
          setPoint(point)

          //  bm.centerAndZoom(point, 16);
          //  map.addOverlay(new window.BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
        } else {
          alert('您选择的地址没有解析到结果！');
        }
      }, data?.province!)
    }
  }, [data])

  const markerDom = useCallback((_map: BMap, cnt: _Point) => {
    if (window.BMapGL?.Map) {
      const currentPoint = new window.BMapGL.Point(cnt.lng, cnt.lat)
      let item = `<p>地址：<span>${data?.Address}</span></p>`
      if (data?.Linkphone) {
        item += `<p>联系电话：<a href="tel:${data.Linkphone}">${data.Linkphone}</a></p>`
      }
      const infoWindow = new window.BMapGL.InfoWindow(item, {
        title: data?.VendorFullName,
      });
      _map.openInfoWindow(infoWindow, currentPoint)
      _map.flyTo(currentPoint,15)

    }
  }, [data])


  useEffect(() => {
    if (window.BMapGL?.Map && point) {
      const { Icon, Point, Marker, Size } = window.BMapGL
      const addDealerMarker = (_map: BMap, cnt: DealerType, idx: number) => {
        const buickIcon = new Icon('https://static.buick.com.cn/assets/icon/map-icon.png', new Size(24, 34), {
          // imageOffset: new Size(12, 22),
        });
        const currentPoint = new Point(point.lng, point.lat)
       
        const marker = new Marker(currentPoint, {
          offset: new Size(0, -15),
          icon: buickIcon,
          title: data?.VendorFullName,
        });
        marker.addEventListener("click", function () {
          markerDom(_map, point)
          onSelected?.(idx)
        });

        _map.addOverlay(marker);
        return marker
      }
      if (map) {
        map.clearOverlays()
        const p: Point[] = [new Point(point.lng, point.lat)]
        const arr = [addDealerMarker(map!, data!, 0)]
        setMapStage(arr)
        map.setViewport(p)
      }
    }
  }, [data, map, markerDom, point, onSelected])
  useEffect(() => {
    if (center && map) {
      console.log('center to:', center)
      map.setCenter(center)
    }
  }, [map])
  useEffect(() => {
    if ( point && Array.isArray(mapStage)) {
      markerDom(mapStage[0].map, point)
    }
  }, [mapStage, markerDom, point])
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
      {!exteral && <BaiduScript onPosition={onPosition} />}
      <div id="baiduMap" className={classNames(styles.wrapper, bdStyles.bdglobal)}></div>
    </div>
  )
}
