import React from 'react'
import { createElement, Fragment, ReactElement } from 'react'
import { ISeriesPrice } from './SeriesPrice'

/**
 * 按三位分隔价格。
 * @param input 价格。
 * @param c 分隔符（默认为 `,`）。
 * @returns 返回添加分隔符的价格字符串。
 */
export const formatPrice = (input: string | number | ISeriesPrice | ISeriesPrice[], c: string = ',') => {
  let num: string | number
  if (Array.isArray(input)) {
    if (input.length) {
      num = input[0].min
    } else {
      return ''
    }
  } else if (typeof input !== 'string' && typeof input !== 'number') {
    num = input.min
  } else if (typeof input === 'string' && isNaN(Number(input))) {
    return input
  } else {
    num = Math.round(Number(input))
  }
  if (!num) {
    return ''
  }
  return String(num).replace(/\B(?=(\d{3})+$)/g, c)
}

/**
 * 将HTML元素插入间隔，字符串将被分割。
 * @param input 元素数组或待分割的字符串。
 * @param el 将要插入的元素（默认为 `<br />`）。
 * @param separator 分割依据（默认为*换行符*）。
 * @returns 返回结果数组。
 */
export const divideByElement = (input: string | ReactElement[], el: JSX.Element = <br />, separator: string | RegExp = /[\r\n]+/) => {
  const result: (string | JSX.Element)[] = typeof input === 'string' ? input.split(separator) : input
  if (result?.length) {
    result.forEach((_item, i, arr) => {
      if (1 + 2 * i < arr.length) {
        arr.splice(1 + 2 * i, 0, el)
      }
    })
    return result.filter(item => item !== '').map((ele, index) => <Fragment key={index}>{ele}</Fragment>)
  }
  return input
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
export function extractHtmlTag(html: string, divide = false): string | JSX.Element[] {
  if (divide) {
    const list = divideByElement(html)
    if (Array.isArray(list)) {
      return list.flatMap<string | JSX.Element[]>((ele, index) => {
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
  const parts = rest.filter(isString).map(item => item.replace(/^\.*\/|\/$/g, ''))
  parts.unshift(prefix || '')
  return parts.join('/')
}

