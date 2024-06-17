
import React from 'react'
import { FC, useCallback, useEffect, useRef, useState } from 'react'


type IpLocation = {
  ip: string
  province?: string
  city?: string
}

declare global {
  interface Window {
    lbs?: VoidFunction
  }
}

type BaiduScriptProperties = {
  onLoad?: VoidFunction
}

export type BaiduLocation = {
  province: string
  city: string
  baidu: boolean
  timeout?: boolean
  point?: any
}

export type NativeCoordinates = {
  lat: number
  lng: number
}

const currentLocation: BaiduLocation = {
  province: '',
  city: '',
  baidu: false,
}

const nativePoint: NativeCoordinates = {
  lat: 0,
  lng: 0,
}

let waitingPos = true
let waitingBaidu = false

function getBaiduGeolocation(callback: ({ province, city }: BaiduLocation) => void, exp?: (p?: Point) => void) {
  let loaded = false
  loadLBS()
  if (currentLocation.province && currentLocation.city) {
    loaded = true
    if (nativePoint.lat && nativePoint.lng && window.BMapGL?.Point) {
      currentLocation.point = new window.BMapGL.Point(nativePoint.lng, nativePoint.lat)
      callback(currentLocation)
      return
    }
  }

  if (waitingBaidu) {
    return
  }

  if (!currentLocation.baidu) {
    waitingBaidu = true
    if (window.BMapGL) {
      //百度地图已加载
      const { BMapGL, BMAP_STATUS_SUCCESS } = window
      currentLocation.baidu = true
      if (nativePoint.lat && nativePoint.lng) {
        console.log('native geolocation')
        const convertor = new BMapGL.Convertor()
        const point = new BMapGL.Point(nativePoint.lng, nativePoint.lat)
        convertor.translate([point], 1, 5, (result: { status: number; points: string | any[] }) => {
          if (result.status === 0 && result.points.length) {
            currentLocation.point = result.points[0]
          } else {
            currentLocation.point = point
          }
          exp?.(currentLocation.point)
          decodeLocation(currentLocation.point!, callback)
        })
      } else if ('Geolocation' in window.BMapGL) {
        console.log('baidu geolocation')
        let geolocation = new BMapGL.Geolocation()
        geolocation.enableSDKLocation()
        geolocation.getCurrentPosition((r: { point: Point }) => {
          if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
            exp?.(r.point)
            currentLocation.point = r.point
            if (loaded) {
              callback(currentLocation)
            } else {
              decodeLocation(r.point, callback)
            }
          } else if (!loaded) {
            getBaiduLocalCity(callback)
          }
        })
      }
    }
  } else if (!loaded) {
    console.warn('fallback to ip location')
    fetch('https://www.buick.com.cn/apinew/ip_location.aspx').then(res => res.json()).then((val: IpLocation) => {
      let gprov = val.province
      let gcity = val.city
      if (gprov && gcity) {
        currentLocation.province = gprov;
        currentLocation.city = gcity;
      } else {
        currentLocation.province = '北京'
        currentLocation.city = '北京'
      }
      callback(currentLocation)
      saveLBS(currentLocation)
    })
  } else {
    exp?.(currentLocation.point)
    if (loaded) {
      callback(currentLocation)
    }
  }
}

function saveLBS({ province, city }: {
  province: string,
  city: string,
}) {
  if (window.sessionStorage) {
    try {
      sessionStorage.setItem("userLocateProvince", province)
      sessionStorage.setItem("userLocateCity", city)
    } catch {}
  }
}

function loadLBS() {
  if (window.sessionStorage) {
    try {
      currentLocation.province = sessionStorage.getItem("userLocateProvince") || '';
      currentLocation.city = sessionStorage.getItem("userLocateCity") || '';
    } catch {}
  }
}


function getBaiduLocalCity(callback: ({ province, city }: BaiduLocation) => void) {
  if (window.BMapGL?.LocalCity) {
    console.log('baidu local city')
    new window.BMapGL.LocalCity().get((result: { center: Point }) => {
      if (result) {
        decodeLocation(result.center, callback)
      }
    })
  }
}

function decodeLocation(p: Point, callback: ({ province, city }: BaiduLocation) => void) {
  if (window.BMapGL?.Geocoder) {
    new window.BMapGL.Geocoder().getLocation(p, (result: { addressComponents: { province: string; city: string } }) => {
      if (result) {
        currentLocation.province = result.addressComponents.province
        currentLocation.city = result.addressComponents.city
        callback(currentLocation)
        saveLBS(currentLocation)
      }
    })
  }
}


const useBaiduScript = ({ onLoad }:{onLoad?:VoidFunction}) => {
  const [posData, setPosData] = useState<BaiduLocation>()

  const updated = useRef(true)

  const callback = useCallback((p: BaiduLocation) => {
    if (updated.current) {
      console.log('callback', p)
      updated.current = false
      setPosData(p)
    }
  }, [])

  const getNativeGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      const success: PositionCallback = (pos) => {
        waitingPos = false
        if (pos?.coords) {
          nativePoint.lat = pos.coords.latitude
          nativePoint.lng = pos.coords.longitude
        }
        if (window.BMapGL?.Map) {
          getBaiduGeolocation(callback)
        } else {
          setTimeout(success, 100);
        }
      }

      console.log('current position')
      navigator.geolocation.getCurrentPosition(success, (err) => {
        waitingPos = false
        console.error(err.message)
        getBaiduGeolocation(callback)
      }, { enableHighAccuracy: true, timeout: 5000 })
    }
  }, [callback])

  useEffect(() => {
    if (!window.BMapGL) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=pBh4gq2Rf8CCTu1Ypht4Hes6EDIOMNy4&callback=lbs';
      document.head.appendChild(script);   
     // setInject(true)
    }
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (waitingPos) {
      waitingPos = true
      getNativeGeolocation()
      timer = setTimeout(() => {
        loadLBS()
        currentLocation.baidu = false
        currentLocation.timeout = true
        callback(currentLocation)
      }, 15000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [callback, getNativeGeolocation])

  useEffect(() => {
    window.lbs = () => {
      onLoad?.()
      if (!waitingPos) {
        getBaiduGeolocation(callback)
      }
    }
    return () => {
      delete window.lbs
    }
  }, [callback, onLoad])

  useEffect(() => {
    if (currentLocation.province && currentLocation.city) {
      callback(currentLocation)
    }
  }, [callback])

  // if (inject) {
  //   return <Script src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=pBh4gq2Rf8CCTu1Ypht4Hes6EDIOMNy4&callback=lbs" />
  // }
  if(posData){
    return posData;
  }
  return null
}


export default useBaiduScript
