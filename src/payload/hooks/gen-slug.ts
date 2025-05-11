import type { CollectionBeforeChangeHook } from 'payload'
import { generateUniqueSlug } from '@/utils/gen-unique-slug'
import slugify from 'slugify'

export function genSlug(fieldToSlug: string): CollectionBeforeChangeHook {
  return async ({ collection, operation, req, data, originalDoc }) => {
    if (!data?.[fieldToSlug])
      return data

    const baseSlug = slugify(data[fieldToSlug], { lower: true, strict: true })

    if (operation === 'create') {
      data.slug = await generateUniqueSlug({
        base: baseSlug,
        collection: collection.slug,
        payload: req.payload,
      })
    }

    if (operation === 'update' && data?.[fieldToSlug] !== originalDoc?.[fieldToSlug]) {
      data.slug = await generateUniqueSlug({
        base: baseSlug,
        collection: collection.slug,
        payload: req.payload,
        idToIgnore: originalDoc.id,
      })
    }

    return data
  }
}
