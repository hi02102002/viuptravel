import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) {
        revalidateTag('global_header')
    }

    return doc
}
