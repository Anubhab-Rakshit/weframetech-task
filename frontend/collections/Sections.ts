import { CollectionConfig } from 'payload/types'

export const Sections: CollectionConfig = {
  slug: 'sections',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge (e.g. Black Friday 2018)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Pink', value: 'pink' },
        { label: 'Blue', value: 'blue' },
      ],
      defaultValue: 'white',
    },
  ],
}
