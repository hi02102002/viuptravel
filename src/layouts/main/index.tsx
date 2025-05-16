import type { ReactNode } from 'react'
import { TopHeader } from './top-header'

export function MainLayout({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <header>
        <TopHeader />
      </header>
      {children}
    </>
  )
}
