import Link from 'next/link'
import { PrefetchQuery } from '@/components/prefetch-query'
import { Button } from '@/components/ui/button'
import { getHeaderQueryOptions } from '@/libs/query-options'
import { DesktopNav } from './desktop-nav'
import { MobileNavSheet } from './mobile-nav-sheet'

export async function MainHeader() {
  return (
    <PrefetchQuery
      opts={getHeaderQueryOptions}
    >
      <div
        className="sticky top-0 z-50 w-full bg-background h-14 flex items-center justify-center"
      >
        <div className="app-container flex items-center gap-4 justify-between">
          <Link
            href="/"
            prefetch
            className="font-semibold font-dm-sans text-xl tracking-[-5%]"
          >
            Viuptravel
          </Link>
          <DesktopNav />
          <Button
            size="lg"
            className="md:flex hidden"
          >
            Explore
          </Button>
          <MobileNavSheet />
        </div>
      </div>
    </PrefetchQuery>
  )
}
