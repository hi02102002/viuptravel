import { s3Storage as s3 } from '@payloadcms/storage-s3'

export function s3Storage() {
  return s3({
    config: {
      region: process.env.MINIO_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY!,
        secretAccessKey: process.env.MINIO_SECRET_KEY!,
      },
      endpoint: 'http://localhost:9000', // Your MinIO endpoint
      forcePathStyle: true, // Required for MinIO compatibility
    },
    bucket: process.env.MINIO_BUCKET!,
    collections: {
      media: {
        disableLocalStorage: true,
        prefix: 'media',
      },
    },
    disableLocalStorage: true,
  })
}
