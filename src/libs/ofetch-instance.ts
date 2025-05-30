import { ofetch } from 'ofetch'

export async function getClient() {
  if (typeof window === 'undefined') {
    const headers = await import('next/headers').then(mod => mod.headers())

    return ofetch.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers,
    })
  }

  return ofetch.create({
    credentials: 'include',
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })
}
