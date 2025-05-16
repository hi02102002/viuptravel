import type { GlobalConfig } from 'payload'
import { anyone } from '@payload/access'
import { revalidateInfors } from '../hooks/revalidate-infors'

export const infor: GlobalConfig = {
  slug: 'infor',
  label: 'Infor',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      name: 'hotline',
      type: 'text',
      label: 'Hotline',
    },
    {
      name: 'zalo',
      type: 'text',
      label: 'Zalo',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook',
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp',
    },
    {
      name: 'map',
      type: 'text',
      label: 'Map',
      admin: {
        description: 'Google map link',
      },
    },
  ],
  hooks: {
    afterChange: [
      revalidateInfors,
    ],
  },
}
