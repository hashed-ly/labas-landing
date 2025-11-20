export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              initialValue: 0,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};

