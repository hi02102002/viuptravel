import type { TNavLink } from '../types'

export type TDirection = 'forward' | 'backward'

export type TNavigationState = {
  path: TNavLink[]
  direction: TDirection
}
