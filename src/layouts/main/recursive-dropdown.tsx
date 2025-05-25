import type { Header } from '@/payload-types'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuHoverTrigger, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'

type NavLink = NonNullable<Header['nav-links']>[number]

type RecursiveDropdownProps = {
  navLink: NavLink
  trigger: React.ReactNode
}

type RecursiveDropdownItemProps = {
  navLink: NavLink
  isRoot?: boolean
}

function getItemUrl(item: NavLink) {
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

function RecursiveDropdownItem({ navLink }: RecursiveDropdownItemProps) {
  const hasChild = navLink.child_links && navLink.child_links.length > 0
  const url = getItemUrl(navLink)
  const target = navLink.is_new_tab ? '_blank' : undefined
  const rel = navLink.is_new_tab ? 'noopener noreferrer' : undefined

  if (hasChild) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between">
          <span>{navLink.label}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent
            sideOffset={4}
            className="w-64 shadow-none"
          >
            {navLink.child_links?.map((childItem) => {
              if (!childItem) {
                return null
              }

              return (
                <RecursiveDropdownItem
                  key={`${childItem.blockType}-${childItem.id}`}
                  navLink={childItem as unknown as NavLink}
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
        className="flex items-center justify-between w-full"
        prefetch
      >
        <span>{navLink.label}</span>
      </Link>
    </DropdownMenuItem>
  )
}

export function RecursiveDropdown({ navLink, trigger }: RecursiveDropdownProps) {
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
              navLink={childItem as unknown as NavLink}
            />
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
