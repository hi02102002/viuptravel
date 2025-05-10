import type { CollectionConfig } from 'payload'
import { slug } from '@/payload/fields/slug'
import { genSlug } from '@/payload/hooks/gen-slug'

export const categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'cover',
      type: 'upload',
      required: true,
      relationTo: 'media',
    },
    slug({ trackingField: 'title' }),
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Post', value: 'post' },
        { label: 'Tour', value: 'tour' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeValidate: [genSlug('title')],
  },
}
