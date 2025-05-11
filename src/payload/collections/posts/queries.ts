import { getPayload } from '@/utils/get-payload'

/**
 * Fetch a post by its slug
 * @param slug - The slug of the post to fetch
 * @returns The post object if found, otherwise null
 */
export async function getBySlug(slug: string) {
  const payload = await getPayload()
  const cate = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return cate.docs[0] ?? null
}
