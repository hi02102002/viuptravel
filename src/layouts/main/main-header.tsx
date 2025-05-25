import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getHeader } from '@/queries/header'
import { NavLink } from './nav-link'

export async function MainHeader() {
  const headerMenus = await getHeader()

  return (
    <div
      className="sticky top-0 z-50 w-full bg-background h-16 flex items-center justify-center"
    >
      <div className="app-container flex items-center gap-4 justify-between">
        <Link
          href="/"
          prefetch
          className="font-semibold font-dm-sans text-3xl tracking-[-5%]"
        >
          Viuptravel
        </Link>
        <nav
          className="flex items-center gap-10"
          role="navigation"
          aria-label="Main navigation"
          aria-current="page"
        >
          {headerMenus['nav-links']?.map((navLink) => {
            if (!navLink) {
              return null
            }

            return (
              <NavLink
                navLink={navLink}
                key={navLink.id}
              />
            )
          })}
        </nav>
        <Button
          size="xl"
        >
          Explore
        </Button>
      </div>
    </div>
  )
}
