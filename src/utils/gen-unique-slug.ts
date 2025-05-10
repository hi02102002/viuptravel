import type { Payload } from 'payload'

export async function generateUniqueSlug({
  base,
  collection,
  payload,
  idToIgnore,
}: {
  base: string
  payload: Payload
  idToIgnore?: string
  collection: keyof Payload['collections']
}): Promise<string> {
  let slug = base
  let counter = 1

  while (true) {
    const existing = await payload.find({
      collection,
      where: {
        slug: {
          equals: slug,
        },
        ...(idToIgnore && {
          id: {
            not_equals: idToIgnore,
          },
        }),
      },
    })

    if (existing.totalDocs === 0)
      break

    slug = `${base}-${counter}`
    counter++
  }

  return slug
}
