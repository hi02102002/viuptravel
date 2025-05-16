import type { GlobalAfterChangeHook } from 'payload'

import { TAGS_TO_REVALIDATE } from '@/constants/tags-to-revalidate'
import { revalidateTag } from 'next/cache'

export const revalidateInfors: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag(TAGS_TO_REVALIDATE.GLOBAL_INFOR)
  }

  return doc
}
