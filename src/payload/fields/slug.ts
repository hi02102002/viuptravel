import type { Field } from 'payload'
import merge from 'lodash/merge'

type TSlug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field

export const slug: TSlug = ({ trackingField = 'title' } = {}, overrides) =>
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
              placeholder: 'Enter a slug or leave blank to auto-generate',

            },
          },
        },
      },
      index: true,
    },
    overrides,
  )
