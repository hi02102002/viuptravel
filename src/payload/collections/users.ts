import type { CollectionConfig } from 'payload'
import { authenticated } from '@/payload/access/authenticated'

export const users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        if (!args) {
          return ''
        }

        const { token, req, user } = args

        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `http://localhost:3000/admin/reset/${token}`

        req?.payload.logger.info(
          `Forgot password email sent to ${user.email} with url ${resetPasswordURL}`,
        )

        return ''
      },

    },

  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
