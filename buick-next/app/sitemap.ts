import { getJsonData } from '@utils/backup'
import { combineUrl } from '@utils/helper'
import { getSeries } from '@utils/libs'
import type { MetadataRoute } from 'next'

async function getSeriesUrl() {
  let json: Record<string, unknown>
  try {
    if (process.env.FORCE_USE_BACKUP) {
      const res = await getJsonData('_sereis-urls')
      return await res.json()
    } else {
      json = await fetch(combineUrl(process.env.DATA_API, '/api/series/available'), { cache: 'no-store' }).then(res => res.json())
    }
  } catch (ex) {
    console.warn('fallback to load from blob', ex)
    const res = await getJsonData('_sereis-urls')
    return await res.json()
  }

  const series = await getSeries()

  const data = json.data as { code: string, _last_access: string }[] | undefined

  return series.filter(item => !item.flags?.mock && data?.some(c => c.code === item.code)).map(s => ({
    url: combineUrl('https://www.buick.com.cn', s.url?.replace(/^[\/\\]/, '') || s.code),
    lastModified: data?.find(j => j.code === s.code)?._last_access ?? new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const series = await getSeriesUrl()

  return [
    {
      url: 'https://www.buick.com.cn',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...series,
    {
      url: 'https://www.buick.com.cn/testdrive',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.buick.com.cn/app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.buick.com.cn/dealer',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.buick.com.cn/electra_x',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://www.buick.com.cn/finance',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.buick.com.cn/guide',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.buick.com.cn/history',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.buick.com.cn/hotline',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.buick.com.cn/news',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.buick.com.cn/news/update',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.buick.com.cn/oversea-student',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.4,
    },
    {
      url: 'https://www.buick.com.cn/technology',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://www.buick.com.cn/technology/ultium',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://www.buick.com.cn/contact-us',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.6,
    },
  ]
}
