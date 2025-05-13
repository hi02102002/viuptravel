import type { Block } from 'payload'

function navLinkWithoutChild(level: number): Block {
  return {
    slug: `nav-link-${level}`,
    labels: {
      singular: 'Nav Link',
      plural: 'Nav Links',
    },
    fields: [{
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
    }, {
      name: 'custom_url',
      type: 'radio',
      options: [{
        label: 'Internal',
        value: 'internal',
      }, {
        label: 'External',
        value: 'external',
      }],
      defaultValue: 'internal',
    }, {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL',
      admin: {
        condition: (_, siblingData) => siblingData?.custom_url === 'external',
      },
    }, {
      name: 'resource_to_link',
      type: 'relationship',
      relationTo: ['categories', 'posts', 'tours'],
      label: 'Resource to Link',
      admin: {
        condition: (_, siblingData) => siblingData?.custom_url === 'internal',
      },
    }, {
      name: 'is_new_tab',
      type: 'checkbox',
      label: 'Open in new tab',
      defaultValue: false,
    }],
  }
}

function createRecursiveBlock(current = 0, maxDeep = 4): Block {
  if (current < maxDeep) {
    current += 1
    const navLink = navLinkWithoutChild(current)
    return {
      ...navLink,
      fields: [
        ...navLink.fields,
        {
          name: 'child_links',
          type: 'blocks',
          blocks: [createRecursiveBlock(current, maxDeep)],
          label: 'Child Links',
        },
      ],
    }
  }

  return {
    ...navLinkWithoutChild(current + 1),
  }
}

export const NavLink = createRecursiveBlock(0, 4)
