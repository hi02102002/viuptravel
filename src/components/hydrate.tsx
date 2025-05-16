'use client'

import type { HydrationBoundaryProps } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

export default function Hydrate(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />
}
