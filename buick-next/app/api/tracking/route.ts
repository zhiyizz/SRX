import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const token = searchParams.get('token')
  const quit = searchParams.get('quit')

  if (quit) {
    cookies().delete('bn_tracking')
    redirect('/')
  }

  if (token !== process.env.TRACKING_TOKEN) {
    return new Response('Invalid token', { status: 401 })
  }

  cookies().set('bn_tracking', 'on', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  redirect('/tracking')
}
