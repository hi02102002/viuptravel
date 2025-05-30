import type { ReactNode } from 'react'
import { MainHeader } from './main-header'

export function MainLayout({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <header>
        <MainHeader />
      </header>
      {children}
    </>
  )
}
