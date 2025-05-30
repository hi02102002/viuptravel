'use client'

import type { userAgent } from 'next/server'
import { createContext, use, useMemo } from 'react'

type TUserAgent = ReturnType<typeof userAgent>

type TUserAgentInfo = {
  useragent: TUserAgent
}

const UserAgentContext = createContext<TUserAgentInfo | null>(null)

export function UserAgentProvider({ useragent, children }: { useragent: TUserAgent, children: React.ReactNode }) {
  const value = useMemo<TUserAgentInfo>(() => {
    return {
      useragent,
    }
  }, [useragent])

  return <UserAgentContext value={value}>{children}</UserAgentContext>
}

export function useUserAgent() {
  const context = use(UserAgentContext)
  if (!context)
    throw new Error('useAgent must be used within an AgentProvider')
  return context
}
