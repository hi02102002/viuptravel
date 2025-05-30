import type { TNavLink } from './types'

export function getItemUrl(item: TNavLink) {
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
