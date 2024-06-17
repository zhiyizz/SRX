import { type NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { combineUrl } from '@utils/helper'
import { getSeries } from '@utils/libs'

const TAGS: Record<string, string[]> = {
  homekv: ['/'],
  guide: ['/guide'],
  news: ['/news'],
  ota: ['/news/update'],
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  const url = searchParams.get('url')
  const tags = searchParams.getAll('tag')
  if (!url && !tags.length) {
    return NextResponse.json({ message: 'Missing params' }, { status: 400 })
  }

  const urls: string[] = []
  let full = false
  if (typeof url === 'string') {
    revalidatePath(url)
    urls.push(url)
  } else if (tags.length) {
    const series = await getSeries()

    tags.forEach(t => {
      revalidateTag(t)
      const ul = TAGS[t]
      if (ul) {
        urls.push(...ul)
      } else if (/^series-/.test(t)) {
        const [, code] = t.split('-')
        if (code === 'pages') {
          full = true
        } else {
          const s = series.find(item => item.code === code)
          if (s) {
            urls.push(combineUrl('/', s.url || s.code))
          }
        }
      } else {
        full = true
      }
    })
  } else {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  if (process.env.FORCE_USE_BACKUP) {
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  if (full) {
    // 全站CDN刷新
    const json = await fetch(combineUrl(process.env.DATA_API, '/api/cdn/refresh/all'), { cache: 'no-store' }).then(res => res.json())
    const { status, ...rest } = json
    if (status !== 'ok') {
      full = false
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), full, ...rest })
  }

  try {
    const fd = new FormData()
    fd.set('urls', urls.flatMap(u => [combineUrl('https://www.buick.com.cn', u), combineUrl('https://m.buick.com.cn', u)]).join(','))
    const res = await fetch(combineUrl(process.env.BUICK_API, '/Aliyun/CdnRefresh'), {
      method: 'POST',
      body: fd,
      cache: 'no-store',
    })
    if (res.status !== 200) {
      const txt = await res.text()
      throw new Error(txt)
    }

    const json = await res.json()

    if (Array.isArray(json)) {
      return NextResponse.json({ revalidated: true, now: Date.now(), urls: fd.get('urls'), task: json.flatMap(item => item.RefreshTaskId.split(',')) })
    }
    return NextResponse.json({ revalidated: true, now: Date.now(), urls: fd.get('urls'), err: res.status })
  } catch (ex) {
    console.error(ex)
    const err = ex as Error & {
      reason?: string
    }
    return NextResponse.json({ revalidated: true, now: Date.now(), err: err.message || err.reason || String(ex) })
  }
}
