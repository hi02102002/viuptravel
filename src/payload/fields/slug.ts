import type { Field } from 'payload'
import merge from 'lodash/merge'

type Slug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field

export const slug: Slug = ({ trackingField = 'title' } = {}, overrides) =>
  merge<Field, Partial<Field> | undefined>(
    {
      name: 'slug',
      unique: true,
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '/payload/components/slug-input.tsx',
            exportName: 'SlugInput',
            clientProps: {
              trackingField,
            },
          },
        },
      },
    },
    overrides,
  )
