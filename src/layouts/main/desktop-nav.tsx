'use client'

import { useQuery } from '@tanstack/react-query'
import { getHeaderQueryOptions } from '@/libs/query-options'
import { NavLink } from './nav-link'

export function DesktopNav() {
  const { data: header } = useQuery(getHeaderQueryOptions)

  return (
    <nav
      className="items-center gap-5 md:flex hidden"
      role="navigation"
      aria-label="Main navigation"
      aria-current="page"

    >
      {header?.['nav-links']?.map((navLink) => {
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
  )
}
