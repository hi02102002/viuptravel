import type { GlobalAfterChangeHook } from 'payload'

import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'
import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag(TAGS_TO_REVALIDATE.GLOBAL_HEADER)
  }

  return doc
}
