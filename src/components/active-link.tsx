'use client'

import type { ComponentPropsWithRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'

type TProps = ComponentPropsWithRef<typeof Link> & {
  exact?: boolean
  activeClassName?: string
}

export function ActiveLink({ exact, activeClassName, className, ...props }: TProps) {
  const pathname = usePathname()

  const isActive = exact ? pathname === props.href : pathname.startsWith(props.href as string)

  return (
    <Link
      className={cn(className, {
        [activeClassName as string]: isActive,
      })}

      {...props}
    >
    </Link>
  )
}
