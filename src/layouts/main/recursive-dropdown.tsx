import type { Header } from '@/payload-types'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuHoverTrigger, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'

type TNavLink = NonNullable<Header['nav-links']>[number]

type TRecursiveDropdownProps = {
  navLink: TNavLink
  trigger: React.ReactNode
}

type TRecursiveDropdownItemProps = {
  navLink: TNavLink
  isRoot?: boolean
}

function getItemUrl(item: TNavLink) {
  if (item.custom_url === 'external' && item.url) {
    return item.url
  }

  if (item.custom_url === 'internal' && item.resource_to_link) {
    const { relationTo, value } = item.resource_to_link

    if (typeof value === 'number') {
      return `/${relationTo}/${value}`
    }

    return `/${relationTo}/${value.slug}`
  }

  return '/'
}

function RecursiveDropdownItem({ navLink }: TRecursiveDropdownItemProps) {
  const hasChild = navLink.child_links && navLink.child_links.length > 0
  const url = getItemUrl(navLink)
  const target = navLink.is_new_tab ? '_blank' : undefined
  const rel = navLink.is_new_tab ? 'noopener noreferrer' : undefined

  if (hasChild) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between">
          <Link
            href={url}
            target={target}
            rel={rel}
            prefetch
            className="cursor-pointer"
          >
            {navLink.label}
          </Link>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent
            sideOffset={4}
            alignOffset={-5}
            className="w-64 shadow-none"
          >
            {navLink.child_links?.map((childItem) => {
              if (!childItem) {
                return null
              }

              return (
                <RecursiveDropdownItem
                  key={`${childItem.blockType}-${childItem.id}`}
                  navLink={childItem as unknown as TNavLink}
                />
              )
            })}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    )
  }

  return (
    <DropdownMenuItem asChild>
      <Link
        href={url}
        target={target}
        rel={rel}
        className="flex items-center justify-between w-full cursor-pointer"
        prefetch
      >
        <span>{navLink.label}</span>
      </Link>
    </DropdownMenuItem>
  )
}

export function RecursiveDropdown({ navLink, trigger }: TRecursiveDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuHoverTrigger asChild className="focus-visible:outline-none">
        {trigger}
      </DropdownMenuHoverTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 shadow-none"
      >
        {navLink.child_links?.map((childItem) => {
          if (!childItem) {
            return null
          }

          return (
            <RecursiveDropdownItem
              key={`${childItem.blockType}-${childItem.id}`}
              navLink={childItem as unknown as TNavLink}
            />
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
