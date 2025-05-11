import type { CollectionConfig } from 'payload'
import { slug } from '@/payload/fields/slug'
import { genSlug } from '@/payload/hooks/gen-slug'
import { endpoints } from './endpoints'

export const categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
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
    beforeChange: [genSlug('title')],
  },
  endpoints,
  lockDocuments: {
    duration: 30 * 60 * 1000, // 30 minutes
  },
}
