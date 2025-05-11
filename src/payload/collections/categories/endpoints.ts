import type { Endpoint } from 'payload'
import { StatusCodes } from 'http-status-codes'
import { APIError } from 'payload'
import { getBySlug } from './queries'

export const endpoints: Omit<Endpoint, 'root'>[] = [{
  method: 'get',
  path: '/slug/:slug',
  handler: async (req) => {
    const category = await getBySlug(req.routeParams?.slug as string)

    if (!category) {
      throw new APIError('Can\'t find category with this slug', StatusCodes.NOT_FOUND)
    }

    return Response.json({
      category,
    })
  },
}]
