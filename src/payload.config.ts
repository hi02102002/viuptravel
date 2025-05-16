import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { migrations } from '@/migrations'
import { categories, media, posts, tours, users } from '@/payload/collections'

import { s3Storage, seo } from '@/payload/plugins'
import { header, infor, topHeader } from '@payload/configs'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },

  },
  collections: [users, media, posts, categories, tours],
  globals: [topHeader, header, infor],
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
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seo(),
    s3Storage(),
  ],
})
