import { Crimson_Text, DM_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import React from 'react'
import { Providers } from '@/providers'
import { UserAgentProvider } from '@/providers/user-agent-provider'
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const useragent = userAgent({
    headers: await headers(),
  })

  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${dmSans.variable}`}
    >
      <body>
        <UserAgentProvider
          useragent={useragent}
        >
          <Providers>{children}</Providers>
        </UserAgentProvider>
      </body>
    </html>
  )
}
