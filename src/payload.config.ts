import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Field } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/users'
import { Media } from './collections/media'
import { Posts } from './collections/posts'
import { seoPlugin } from '@payloadcms/plugin-seo'
import Categories from './collections/categories'
import Tours from './collections/tours'
import { s3Storage } from '@payloadcms/storage-s3'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, Tours],
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
        },
      },
      disableLocalStorage: true,
    }),
  ],
})
