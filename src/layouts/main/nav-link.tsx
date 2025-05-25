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
        className="transition-colors hover:text-foreground/80 inline-flex font-medium text-lg"
        activeClassName="text-blue-700 hover:text-blue-700"
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
          className="transition-colors hover:text-foreground/80 inline-flex font-medium text-lg"
          activeClassName="text-blue-700 hover:text-blue-700"
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
