import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type TIsAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: TIsAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}
