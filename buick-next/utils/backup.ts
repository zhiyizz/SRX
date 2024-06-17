import { combineUrl } from './helper'

export async function getJsonData(name: string, revalidate?: number | false, ...tags: string[]) {
  const init: RequestInit = {}
  if (revalidate || tags.length) {
    const next: RequestInit['next'] = {}
    if (revalidate) {
      next.revalidate = revalidate
    }
    if (tags.length) {
      next.tags = tags
    }
    init.next = next
  } else if (revalidate === false) {
    init.cache = 'no-store'
  }
  return await fetch(combineUrl(process.env.STATIC_HOST, `/assets/backups/${name}.json`), init)
}
