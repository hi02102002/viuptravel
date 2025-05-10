import type { Field } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'

export function seo() {
  return seoPlugin({
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
  })
}
