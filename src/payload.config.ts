import type { Field } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { categories, media, posts, tours, users } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log(path.resolve(dirname))

export default buildConfig({
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [users, media, posts, categories, tours],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['categories', 'posts', 'tours'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `ViupTravel — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt,
      generateURL: ({ doc, collectionSlug }) =>
        `https://viuptravel.com/${collectionSlug}/${doc.slug}`,
      fields: () => [
        {
          name: 'keywords',
          type: 'array',
          label: 'Keywords',
          admin: {
            description: 'Add keywords to help with SEO',
          },
          fields: [
            {
              name: 'keyword',
              type: 'text',
              label: 'Keyword',
            },
          ],
        },
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }) as Field,
        MetaTitleField({
          hasGenerateFn: true,
        }) as Field,
        MetaImageField({
          relationTo: 'media',
        }) as Field,

        MetaDescriptionField({}) as Field,
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }) as Field,
      ],
      tabbedUI: true,
    }),
    s3Storage({
      config: {
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.MINIO_ACCESS_KEY!,
          secretAccessKey: process.env.MINIO_SECRET_KEY!,
        },
        endpoint: 'http://localhost:9000', // Your MinIO endpoint
        forcePathStyle: true, // Required for MinIO compatibility
      },
      bucket: 'viuptravel',
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: 'media',
        },
      },
      disableLocalStorage: true,
    }),
  ],
})
