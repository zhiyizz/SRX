import { combineUrl } from '@utils/helper'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import type { SeriesObject } from '~types/series'

type SeriesObjectWrapper = {
  code: number
  message: string
  result: SeriesObject[]
}

async function getSeries(code: string) {
  const res = await fetch(combineUrl(process.env.PREVIEW_API, '/seriesobject'))
  const json = await res.json() as SeriesObjectWrapper
  if (json.code == 1000) {
    return json.result.find(item => item.code === code && !item.flags?.mock)
  }
}

export async function GET(request: NextRequest) {
  // Parse query string parameters
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('s') ?? searchParams.get('secret')
  const code = searchParams.get('code')
  const id = searchParams.get('id')
  const slug = searchParams.get('slug')

  if (!secret) {
    return new Response('Invalid token', { status: 401 })
  }
  if (!slug && (!id || !code)) {
    return new Response('Invalid params', { status: 400 })
  }

  if (slug) {
    const allowed = ['/', '/news(/\\d+)?', '/news/update(/\\d+)?']
    if (allowed.some(pattern => {
      const reg = new RegExp(`^${pattern}$`)
      return reg.test(slug)
    })) {
      draftMode().enable()
      redirect(slug)
    }
  } else if (id && code) {
    const pass = cookies().get(`preview_${id}`)?.value
    const res = await fetch(combineUrl(process.env.DATA_API, '/api/series/preview/pass', id), {
      headers: pass ? {
        pass,
      } : undefined,
    }).then(res => res.json())
    if (res.status === 'ok' && res.pass) {
      searchParams.delete('s')
      redirect(`/preview?${searchParams}`)
    } else {
      const series = await getSeries(code)
      if (series) {
        draftMode().enable()
        redirect(combineUrl('/', series.url || series.code, `preview?id=${id}`))
      }
    }
  }

  return new Response('Not allowed', { status: 403 })
}

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const pass = data.get('pass') as string | null
  const id = data.get('id') as string | null
  const code = data.get('code') as string | null
  let err = ''
  if (pass && id && code) {
    const res = await fetch(combineUrl(process.env.DATA_API, '/api/series/preview/pass', id), {
      method: 'HEAD',
      headers: {
        pass,
      },
    })
    if (res.status === 200) {
      const series = await getSeries(code)
      if (series) {
        draftMode().enable()
        cookies().set(`preview_${id}`, pass, { httpOnly: true, expires: Date.now() + 2 * 3600 * 1000 })
        return new Response(`<script>location.replace('${combineUrl('/', series.url || series.code, `preview?id=${id}`)}')</script><h1>跳转中…</h1>`, {
          headers: {
            'content-type': 'text/html; charset=utf-8',
          },
        })
      }
    } else if (res.status === 401) {
      err = 'unmatch'
    } else {
      err = String(res.status)
    }
  }
  return new Response(`<script>location.replace('/preview?id=${id}&code=${code}&err=${err}')</script>`, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    }
  })
}
