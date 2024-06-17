import { createElement, Fragment, ReactElement } from 'react'
import { ISeriesPrice } from './SeriesPrice'
import { BrandList,apiSeriesSortType,apiSeriesType } from './types/trade'
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
  } else if (typeof input === 'string') {
    let trans = Number(input.replace(/\D/g, ''))
    if (!trans || isNaN(trans)) {
      return ''
    }
    num = trans
  } else {
    num = input
  }
  if (!num) {
    return ''
  }
  return String(num).replace(/\B(?=(\d{3})+$)/g, c)
}

/**
 * 将2023/01/01中转换成2023年01月01日
 * @param str 
 * @returns 返回结果字符串
 */
export const stringTozh = (str:string) => {
   const result =  str.split('/');
   return result[0]+'年'+result[1]+'月'+result[2]+'日';
}

/**
 * 将价格转换为以万为单位
 * @param money 价格字符串
 * @returns 返回结果
 */
export const priceStr = (money:string) => {
  return Number(money) / 10000
}

/**
 * 提取字符串中车型的年限款式
 * @param model 
 * @returns 返回结果
 */
export const modelStr = (model:string) => {
  return  model.substring(0,5);
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
 * 根据宽度计算高度（4:3）。
 * @param width 宽度。
 * @returns 计算后得出的高度。
 */
export function calculateHeight(width: number) {
  return Math.ceil(width * 3 / 4)
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
  parts.unshift(prefix?.replace(/\/$/, '') || '')
  return parts.join('/')
}



/**
 * 检测设备是否为手机。
 * @param strict 严格模式，验证`UA`和触摸屏。
 * @returns 
 */
export function isMobileDevice(strict?: boolean) {
  const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
  const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)

  if (strict) {
    return isMobileUA && isTouchDevice
  } else {
    return window.innerWidth < 768
  }
}

export function increaseBrightness(hex: string, percent: number) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
      hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);

  return '#' +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substring(1);
}

/**
 * 获取url参数
 * @returns 
 */
export function getUrlParams() {
  const  url = window.location.href;
	let urlStr = url.split('?')[1]
	const urlSearchParams = new URLSearchParams(urlStr)
	const result = Object.fromEntries(urlSearchParams.entries())
	return result
}

/**
 * 按字母排序
 * @returns
 */

type itemtype = {
  name:string,
  en:string
}
export function sortEnList(arr:apiSeriesType[]){
  let result:apiSeriesSortType[];

  result = arr && arr?.map((item) => {
    return { en: item.en,  data:[] }
  })

  let hash:Record<string, number> = {};
  //去重
  result = result && result?.reduce((item:apiSeriesSortType[], next) => {
    hash[next.en] ? '' :  hash[next.en] = true &&  item.push(next);
    return item;
  }, [])
  
  if(result){
     arr?.forEach((item) => {
      for (let i in result) {
        if (item.en === result[Number(i)].en) {
          result[Number(i)].data?.push(item);
        }
      }
    })
  }

   return result;
}