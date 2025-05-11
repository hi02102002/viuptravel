import { getPayload } from '@/utils/get-payload'

/**
 * Fetch a tour by its slug
 * @param slug - The slug of the tour to fetch
 * @returns The category object if found, otherwise null
 */
export async function getBySlug(slug: string) {
  const payload = await getPayload()
  const cate = await payload.find({
    collection: 'tours',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return cate.docs[0] ?? null
}
