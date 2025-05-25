import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticated-or-published'

import { slug } from '@/payload/fields/slug'
import { genSlug } from '@/payload/hooks/gen-slug'
import { endpoints } from './endpoints'

export const posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    slug({ trackingField: 'title' }),
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      filterOptions: {
        type: { equals: 'post' },
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        placeholder: 'Select a date',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
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
