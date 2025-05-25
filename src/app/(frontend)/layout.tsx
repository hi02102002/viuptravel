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
      </body>
    </html>
  )
}
