/* for Node.js only */ 
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import { combineUrl } from './helper'
import type { SeriesCategory, SeriesObject } from '../types/series'

export async function getMdFile(filename: string, filePrefix?: string) {
  const prefix = path.join(process.cwd(), filePrefix ?? 'data')
  const filepath = path.join(prefix, `${filename}.md`)
  const exists = fs.existsSync(filepath)
  if (!exists) {
    console.error(`file not found: ${filepath}`)
    return
  }

  const fileContents = fs.readFileSync(filepath)

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(fileContents)
  const htmlString = processedContent.toString()

  // 外部链接添加 `target=_blank`
  const contentHtml = htmlString.replace(/<a (.*)href="http/g, '<a $1target="_blank" href="http')

  return {
    filename,
    contentHtml,
  }
}

export function getJsonFile(filename: string) {
  const prefix = path.join(process.cwd(), 'data')
  const fileContents = fs.readFileSync(path.join(prefix, `${filename}.json`), 'utf8')

  try {
    return JSON.parse(fileContents)
  } catch {
    return null
  }
}

type WrapperResponse = {
  code: number
  message: string
}

type SeriesObjectWrapper = WrapperResponse & {
  result: SeriesObject[]
}

type SeriesCategoryWrapper = WrapperResponse & {
  result: SeriesCategory[]
}

export async function getSeries(preview?: boolean) {
  const series = await fetch(preview ? combineUrl(process.env.PREVIEW_API, '/seriesobject') : combineUrl(process.env.STATIC_HOST, '/resource/vehicleSeries.json'), { next: { tags: ['series'] } }).then(res => res.json()) as SeriesObject[] | SeriesObjectWrapper

  if (Array.isArray(series)) {
    return series
  }
  if (series.code == 1000) {
    return series.result
  }
  return []
}

export async function getCategory(preview?: boolean) {
  const category = await fetch(preview ? combineUrl(process.env.PREVIEW_API, '/seriescategorylist') : combineUrl(process.env.STATIC_HOST, '/resource/vehicleSeriesCategory.json'), { next: { tags: ['category'] } }).then(res => res.json()) as SeriesCategory[] | SeriesCategoryWrapper

  if (Array.isArray(category)) {
    return category
  }
  if (category.code === 1000) {
    return category.result
  }
  return []
}

export function uniqueOrder(series: SeriesObject[]) {
  const order = series.filter(item => (item.carID || item.carId) && !item.flags?.mock).map(item => item.code)
  const unique = new Set(order)
  return Array.from(unique)
}

export function getAllDataFiles(dir: string) {
  const prefix = path.join(process.cwd(), 'data')
  return fs.readdirSync(path.join(prefix, dir), 'utf8')
}
