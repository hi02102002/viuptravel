import { dehydrate } from '@tanstack/react-query'
import Hydrate from '@/components/hydrate'
import { getQueryClient } from '@/libs/query-client'

// Helper function to prefetch data in Server Components
export async function prefetchQuery<T>({
  queryKey,
  queryFn,
  children,
}: {
  queryKey: string[]
  queryFn: () => Promise<T>
  children?: React.ReactNode
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      {children}
    </Hydrate>
  )
}
