import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories, media, posts, tours, users } from '@/payload/collections'
import { s3Storage, seo } from '@/payload/plugins'

import { topHeader } from '@payload/configs/top-header'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log(process.env.RESEND_API_KEY)

export default buildConfig({
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [users, media, posts, categories, tours],
  globals: [topHeader],
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
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seo(),
    s3Storage(),
  ],
})
