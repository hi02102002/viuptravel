import { KEYS_TO_CACHED } from '@/constants/key-to-cached'
import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'
import { getPayload } from '@/utils/get-payload'
import { unstable_cache } from '@/utils/unstable-cache'

export const getInfors = unstable_cache(async () => {
  const payload = await getPayload()

  const infors = await payload.findGlobal({
    slug: 'infor',
    depth: 1,
  })

  return infors
}, [
  KEYS_TO_CACHED.getInfors,
], {
  revalidate: 60,
  tags: [TAGS_TO_REVALIDATE.GLOBAL_INFOR],
})
