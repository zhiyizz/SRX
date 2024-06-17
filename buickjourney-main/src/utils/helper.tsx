import { createElement, Fragment, ReactElement, ReactNode } from 'react'

/**
 * 将HTML元素插入间隔，字符串将被分割。
 * @param input 元素数组或待分割的字符串。
 * @param el 将要插入的元素（默认为 `<br />`）。
 * @param separator 分割依据（默认为*换行符*）。
 * @returns 返回结果数组。
 */
export function divideByElement(input?: string | ReactElement[], el: ReactElement = <br />, separator: string | RegExp = /[\r\n]+/): ReactNode | ReactElement[] {
  const result: (string | ReactElement)[] | undefined = typeof input === 'string' ? input.split(separator) : input
  if (result && result.length > 1) {
    const LEN = result.length
    for (let i = 0; i < LEN - 1; i++) {
      result.splice(1 + 2 * i, 0, el)
    }
    return result.filter(item => item !== '').map((ele, index) => <Fragment key={index}>{ele}</Fragment>)
  }
  return Array.isArray(input) ? input[0] : input
}

export function mapLines(input?: string, el = 'p', props: { className?: string } = {}): ReactElement[] {
  if (input) {
    return input.split(/[\r\n]+/).map((line, idx) => createElement(el, { ...props, key: idx}, line))
  }
  return []
}

/**
 * 根据宽度计算高度（16:9）。
 * @param width 宽度。
 * @returns 计算后得出的高度。
 */
export function calculateHeight(width: number) {
  return Math.ceil(width * 9 / 16)
}

/**
 * 提取字符串中的HTML标签。
 * @param html 待提取HTML标签的字符串。
 * @param divide 是否混合使用 `divideByElement` 进行默认的换行操作。
 * @returns 
 */
export function extractHtmlTag(html: string, divide = false): ReactNode | ReactElement[] {
  if (divide) {
    const list = divideByElement(html)
    if (Array.isArray(list)) {
      return list.flatMap<string | ReactElement[]>((ele, index) => {
        if (index % 2 === 0 && typeof ele.props.children === 'string') {
          return extractHtmlTag(ele.props.children)
        }
        return ele.props.children
      }).map((item, index) => <Fragment key={index}>{item}</Fragment>)
    }
  }
  const matcher = html.match(/<([^>]+)>([^<]+)<\/\1>|<([^>/]+) *\/?>/)
  if (matcher) {
    const [match, tag, value, ctag] = matcher
    if (tag) {
      const ele = createElement(tag, null, value)
      return divideByElement(html, ele, match)
    } else if (ctag) {
      const ele = createElement(ctag)
      return divideByElement(html, ele, match)
    }
  }
  return html
}

/**
 * 类型断言：字符串。
 * @param val 待判断的变量。
 * @returns 是否为字符串。
 */
export function isString(val: any): val is string {
  return typeof val === 'string'
}

/**
 * 拼合URL。
 * @param prefix 路径前缀。
 * @param rest 待拼合的URL.
 * @returns 拼合后的URL。
 */
export function combineUrl(prefix?: string, ...rest: (string | undefined)[]) {
  const last = rest.pop()
  const parts = rest.filter(isString).map(item => item.replace(/^\.*\/|\/$/g, ''))
  if (last) {
    parts.push(last.replace(/^\.*\//, ''))
  }
  if (prefix) {
    parts.unshift(prefix.replace(/\/$/, '') || '')
  }
  return parts.join('/')
}


/**
 * 检测设备是否为手机。
 * @param strict 严格模式，验证`UA`和触摸屏。
 * @returns 
 */
export function isMobileDevice(strict?: boolean) {
  if(typeof window !== 'undefined'){
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
    const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)
  
    if (strict) {
      return isMobileUA && isTouchDevice
    } else {
      return window.innerWidth < 768
    }
  }

}
