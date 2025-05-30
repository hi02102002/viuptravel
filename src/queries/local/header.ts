import { KEYS_TO_CACHED } from '@/constants/key-to-cached'
import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'
import { getPayload } from '@/utils/get-payload'
import { unstable_cache } from '@/utils/unstable-cache'

export const getHeader = unstable_cache(async () => {
  const payload = await getPayload()

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  return header
}, [
  KEYS_TO_CACHED.getHeader,
], {
  revalidate: 60,
  tags: [TAGS_TO_REVALIDATE.GLOBAL_HEADER],
})
