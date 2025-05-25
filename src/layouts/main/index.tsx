import type { ReactNode } from 'react'
import { MainHeader } from './main-header'
import { TopHeader } from './top-header'

export function MainLayout({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <header>
        {/* <TopHeader /> */}
        <MainHeader />
      </header>
      {children}
    </>
  )
}
