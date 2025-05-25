import { Crimson_Text, DM_Sans } from 'next/font/google'
import React from 'react'
import { Providers } from '@/providers'
import './styles.css'

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  variable: '--font-crimson-text',
  weight: ['400', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${dmSans.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        {/* <Script
          src="http://160.250.137.182:3001/script.js"
          data-website-id="aa948207-1121-46f0-b1b1-01a55c8a8932"
          defer
        /> */}
      </body>
    </html>
  )
}
