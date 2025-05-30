import type { Header } from '@/payload-types'

export type TNavLink = NonNullable<Header['nav-links']>[number]
