import type { FetchQueryOptions } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import Hydrate from '@/components/hydrate'
import { getQueryClient } from '@/libs/query-client'

export async function PrefetchQuery<T>({
  children,
  opts,
}: {
  opts: FetchQueryOptions<T, Error, T, string[], never>
  children?: React.ReactNode
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(opts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      {children}
    </Hydrate>
  )
}
