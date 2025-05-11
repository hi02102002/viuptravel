import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/payload/access'

export const media: CollectionConfig<'media'> = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
}
