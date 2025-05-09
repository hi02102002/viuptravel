import { genSlug } from '@/payload-hooks/gen-slug'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

const Tours: CollectionConfig = {
  slug: 'tours',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'private_price',
      label: 'Private Price',
      type: 'number',
      admin: {},
      validate: (value: unknown) => {
        if (typeof value !== 'number' || value < 0) {
          return 'Price must be a positive number'
        }
        return true
      },
    },
    {
      name: 'group_price',
      label: 'Group Price',
      type: 'number',
      validate: (value: unknown) => {
        if (typeof value !== 'number' || value < 0) {
          return 'Price must be a positive number'
        }
        return true
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'media_files',
          label: 'Images',
          fields: [
            {
              name: 'media_files',
              label: 'Images',
              type: 'array',
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Upload Image',
                },
              ],
              admin: {
                description: 'Upload images for the tour',
              },
            },
          ],
        },
        {
          name: 'informations',
          fields: [
            {
              name: 'informations',
              type: 'group',
              fields: [
                {
                  name: 'departure_from',
                  label: 'Departure From',
                  type: 'text',
                  admin: {
                    placeholder: 'Add the departure location',
                  },
                },
                {
                  name: 'destination',
                  label: 'Destination',
                  type: 'text',
                  admin: {
                    placeholder: 'Add the destination',
                  },
                },
                {
                  name: 'schedule',
                  label: 'Schedule',
                  type: 'text',
                  admin: {
                    placeholder: 'Add the schedule',
                  },
                },
                {
                  name: 'start_at',
                  label: 'Start At',
                  type: 'text',
                  admin: {
                    placeholder: 'Add the start time',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'metadata',
          fields: [
            {
              name: 'metadata',
              type: 'group',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: {
                    placeholder: 'Write a short description of the tour',
                  },
                },

                {
                  name: 'schedule',
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
                  label: 'Schedule',
                  admin: {
                    description: 'Add the schedule of the tour',
                  },
                },
                {
                  name: 'terms',
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
                  label: 'Terms and Conditions',
                  admin: {
                    description: 'Add the terms and conditions of the tour',
                  },
                },
              ],
            },
          ],
        },
      ],
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
        type: { equals: 'tour' },
      },
    },
  ],
  hooks: {
    beforeValidate: [genSlug('title')],
  },
}

export default Tours
