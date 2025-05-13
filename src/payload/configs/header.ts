import type { GlobalConfig } from 'payload'
import { anyone } from '@payload/access'
import { NavLink } from '@payload/blocks/nav-link'
import { revalidateHeader } from '@payload/hooks'

export const header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'nav-links',
      label: 'Nav Links',
      type: 'blocks',
      blocks: [NavLink],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
