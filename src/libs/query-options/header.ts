import { queryOptions } from '@tanstack/react-query'
import { getHeader } from '@/queries/rest/header'

export const getHeaderQueryOptions = queryOptions({
  queryKey: ['header'],
  queryFn: getHeader,
})
