'use client'

import type { Header } from '@/payload-types'
import { ActiveLink } from '@/components/active-link'
import { RecursiveDropdown } from './recursive-dropdown'

type Props = {
  navLink: NonNullable<Header['nav-links']>[number]
}

export function NavLink({ navLink }: Props) {
  if (navLink.custom_url === 'external' && navLink.child_links?.length === 0) {
    return (
      <ActiveLink
        href={navLink.url as string}
        className="transition-colors hover:text-foreground/80 text-foreground/80 inline-flex p-2 uppercase font-medium"
        activeClassName="text-foreground bg-primary text-white hover:text-white "
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
          className="transition-colors hover:text-foreground/80 text-foreground/80 inline-flex p-2 uppercase font-medium"
          activeClassName="text-foreground bg-primary text-white hover:text-white"
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
