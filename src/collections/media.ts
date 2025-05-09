import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'folder',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
      label: 'Folder',
      // Optional: Populate this field with predefined folder names or create custom logic
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.file) {
          const folder = data.folder || 'default' // Default to 'default' folder if not specified
          // Update the file path to include the folder path
          data.file[0].path = `media/${folder}/${data.file[0].filename}`
        }
        return data
      },
    ],
  },
}
