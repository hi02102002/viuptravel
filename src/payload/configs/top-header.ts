import type { GlobalConfig } from 'payload'
import { anyone } from '@payload/access'
import { revalidateHeader } from '@payload/hooks'

export const topHeader: GlobalConfig = {
  slug: 'top-header',
  access: {
    read: anyone,
  },
  fields: [{
    name: 'email',
    type: 'email',
    required: true,
    label: 'Email',
  }, {
    name: 'phone',
    type: 'text',
    required: true,
  }, {
    name: 'address',
    type: 'text',
  }],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
