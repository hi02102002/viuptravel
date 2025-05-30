import type { Header } from '@/payload-types'
import { KEYS_TO_CACHED } from '@/constants/key-to-cached'
import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'
import { getClient } from '@/libs/ofetch-instance'
import { unstable_cache } from '@/utils/unstable-cache'

export async function getHeader() {
  const client = await getClient()
  const res = await client<Header>('/globals/header', {
    query: {
      depth: 2,
    },
  })

  return res
}

export const getHeaderWithCached = unstable_cache(() => {
  return getHeader()
}, [
  KEYS_TO_CACHED.getHeader,
], {
  revalidate: 60,
  tags: [TAGS_TO_REVALIDATE.GLOBAL_HEADER],
})
