/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type TArgs = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export function generateMetadata({ params, searchParams }: TArgs): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

function Page({ params, searchParams }: TArgs) {
  return RootPage({ config, params, searchParams, importMap })
}

export default Page
