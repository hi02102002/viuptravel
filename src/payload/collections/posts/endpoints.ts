import type { Endpoint } from 'payload'
import { StatusCodes } from 'http-status-codes'
import { APIError } from 'payload'
import { getBySlug } from './queries'

export const endpoints: Omit<Endpoint, 'root'>[] = [{
  method: 'get',
  path: '/slug/:slug',
  handler: async (req) => {
    const post = await getBySlug(req.routeParams?.slug as string)

    if (!post) {
      throw new APIError('Can\'t find post with this slug', StatusCodes.NOT_FOUND)
    }

    return Response.json({
      post,
    })
  },
}]
