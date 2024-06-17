import { useEffect, useState } from "react";
import { isMobileDevice } from "./helper";

let mobileDevice: boolean | undefined

/**
 * 返回一个值，表示当前访问设备是否为手机。
 * @param strict 严格模式，同时验证`UA`和触摸屏。
 */
export function useMobileDevice(strict?: boolean) {
  const [isMobile, setIsMobile] = useState(mobileDevice)

  useEffect(() => {
    const adjust = () => {
      mobileDevice = isMobileDevice(strict)
      const doc = document.documentElement
      // const sat = getComputedStyle(document.documentElement).getPropertyValue('--sab')
      doc.style.setProperty('--view-height', `${window.innerHeight}px`)
      setIsMobile(mobileDevice)
    }
    adjust()

    window.addEventListener('resize', adjust)
    return () => {
      window.removeEventListener('resize', adjust)
    }
  }, [strict])

  return isMobile
}

export function useDomainByDevice() {
  const [legacyHost, setLegacyHost] = useState('https://m.buick.com.cn')

  useEffect(() => {
    const cb = () => {
      if (window.legacyHost) {
        setLegacyHost(window.legacyHost)
      } else {
        setTimeout(cb, 200);
      }
    }
    cb()
  }, [])

  return legacyHost
}

export function useInitialMobile() {
  const [initialMobile, setInitialMobile] = useState<boolean>()

  useEffect(() => {
    const cb = () => {
      if (typeof window.initialMobile === 'boolean') {
        setInitialMobile(window.initialMobile)
      } else {
        setTimeout(cb, 200);
      }
    }
    cb()
  }, [])

  return initialMobile
}
