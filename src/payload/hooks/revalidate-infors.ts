import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'

export const revalidateInfors: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag(TAGS_TO_REVALIDATE.GLOBAL_INFOR)
  }

  return doc
}
