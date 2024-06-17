'use client'

import { useSelector } from 'lib/redux'
import { Suspense, useEffect, useRef } from 'react'
import MiniApp from './MiniApp'

export default function BodyScroll() {
  const { disableScroll, hideScrollbar, smoothScroll, keepScroll } = useSelector(state => state.scroll)
  const { td } = useSelector(state => state.nav)

  const scrollY = useRef(0)

  useEffect(() => {
    if (disableScroll) {
      scrollY.current = window.scrollY
      if (keepScroll) {
        document.body.style.top = `-${window.scrollY}px`
      }
      document.body.classList.add('disable-scroll')
    } else {
      document.body.style.top = ''
      document.body.classList.remove('disable-scroll')
      if (keepScroll) {
        console.info('resume top')
        window.scrollTo({
          top: scrollY.current,
        })
      }
    }
    // TODO: probably don't needed
    return () => {
      document.body.classList.remove('disable-scroll')
    }
  }, [disableScroll, keepScroll])

  useEffect(() => {
    if (hideScrollbar) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [hideScrollbar])

  useEffect(() => {
    if (smoothScroll || td) {
      document.documentElement.classList.add('smooth-scroll')
    } else {
      document.documentElement.classList.remove('smooth-scroll')
    }
    return () => {
      document.documentElement.classList.remove('smooth-scroll')
    }
  }, [smoothScroll, td])

  return (
    <Suspense>
      <MiniApp />
    </Suspense>
  )
}
