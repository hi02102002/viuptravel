import type { Icon } from '@phosphor-icons/react'
import { Envelope, FacebookLogo, Phone } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { getInfors } from '@/queries/local/get-infors'

type TContent = {
  type: 'text'
  value: string
  Icon: Icon
  href?: string
} | {
  type: 'link'
  href: string
  Icon: Icon
}

export async function TopHeader() {
  const infors = await getInfors()

  const CONTENTS: Array<TContent | null> = [
    infors?.email
      ? {
          Icon: Envelope,
          value: infors.email,
          type: 'text' as const,
          href: `mailto:${infors.email}`,
        }
      : null,
    infors?.phone
      ? {
          Icon: Phone,
          value: infors.phone,
          type: 'text' as const,
          href: `tel:${infors.phone}`,
        }
      : null,
    infors?.facebook
      ? {
          Icon: FacebookLogo,
          type: 'link' as const,
          href: infors.facebook,
        }
      : null,
  ]

  return (
    <div
      className="h-12 flex items-center bg-sky-800 text-white"
    >
      <div
        className="app-container"
      >
        <div className="flex items-center gap-2">
          {CONTENTS.map((item) => {
            if (!item) {
              return null
            }

            if (item.type === 'text') {
              return (
                <Link
                  key={item.value}
                  href={item.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center gap-1 text-sm after:content-[""] after:w-px after:h-3.5 after:bg-white after:mx-1 last:after:hidden font-medium'
                  prefetch
                >
                  <item.Icon
                    size={20}
                  />
                  <span>{item.value}</span>
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center gap-1 text-sm after:content-[""] after:w-px after:h-3.5 after:bg-white after:mx-1 last:after:hidden font-medium'
                prefetch
              >
                <item.Icon
                  size={20}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
