import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const media: CollectionConfig<'media'> = {
  slug: 'media',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
}
