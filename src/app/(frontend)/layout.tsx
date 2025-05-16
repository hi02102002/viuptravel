import { Providers } from '@/providers'
import Script from 'next/script'
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Script
          src="http://160.250.137.182:3001/script.js"
          data-website-id="aa948207-1121-46f0-b1b1-01a55c8a8932"
          defer
        />
      </body>
    </html>
  )
}
