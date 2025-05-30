'use client'

import type { Header } from '@/payload-types'
import { ActiveLink } from '@/components/active-link'
import { RecursiveDropdown } from './recursive-dropdown'

type TProps = {
  navLink: NonNullable<Header['nav-links']>[number]
}

export function NavLink({ navLink }: TProps) {
  if (navLink.custom_url === 'external' && navLink.child_links?.length === 0) {
    return (
      <ActiveLink
        href={navLink.url as string}
        className="transition-colors hover:text-foreground/80 inline-flex font-medium text-sm py-2 relative"
        activeClassName="text-blue-700 hover:text-blue-700 after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:bg-blue-700 after:w-1/2 after:-translate-x-1/2 after:left-1/2"
        exact
        prefetch
        target={navLink.is_new_tab ? '_blank' : undefined}
      >
        {navLink.label}
      </ActiveLink>
    )
  }

  return (
    <RecursiveDropdown
      navLink={navLink}
      trigger={(
        <ActiveLink
          href={navLink.url as string}
          className="transition-colors hover:text-foreground/80 inline-flex font-medium text-sm py-2 relative"
          activeClassName="text-blue-700 hover:text-blue-700 after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:bg-blue-700 after:w-1/2 after:-translate-x-1/2 after:left-1/2"
          exact
          prefetch
          target={navLink.is_new_tab ? '_blank' : undefined}
        >
          {navLink.label}
        </ActiveLink>
      )}
    />
  )
}
