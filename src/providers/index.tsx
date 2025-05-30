'use client'
import type { ReactNode } from 'react'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryProvider } from './query-provider'

export function Providers({ children }: {
  children: ReactNode
}) {
  return (
    <ProgressProvider
      height="2px"
      color="var(--foreground)"
      options={{ showSpinner: false }}
      shallowRouting

    >
      <NuqsAdapter>
        <QueryProvider>
          {children}
        </QueryProvider>
      </NuqsAdapter>
    </ProgressProvider>
  )
}
