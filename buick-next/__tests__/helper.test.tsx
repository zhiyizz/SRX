import { combineUrl, formatPrice } from '@utils/helper'

it('test combine url is correct', () => {
  const url1 = combineUrl(undefined, '/subpath')
  expect(url1).toBe('/subpath')
  const url2 = combineUrl()
  expect(url2).toBe('')
  const url3 = combineUrl('https://www.buick.com.cn')
  expect(url3).toBe('https://www.buick.com.cn')
  const url4 = combineUrl('foo/', 'bar')
  expect(url4).toBe('foo/bar')
  const url5 = combineUrl('ftp://www.buick.com.cn', 'bar')
  expect(url5).toBe('ftp://www.buick.com.cn/bar')
  const url6 = combineUrl('/', '/bar', undefined, 'foo', '', 'bar')
  expect(url6).toBe('/bar/foo/bar')
})

it('test format price is correct', ()=> {
  const price1 = formatPrice('CN¥123,456')
  expect(price1).toBe('123,456')
  const price2 = formatPrice('敬请期待')
  expect(price2).toBe('')
  const price3 = formatPrice(9522)
  expect(price3).toBe('9,522')
})
