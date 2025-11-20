export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'localeText',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'localeText',
        },
      ],
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        },
      ],
    },
    {
      name: 'appLinks',
      title: 'App Download Links',
      type: 'object',
      fields: [
        {
          name: 'onelink',
          title: 'OneLink URL',
          type: 'url',
        },
        {
          name: 'appStore',
          title: 'App Store URL',
          type: 'url',
        },
        {
          name: 'googlePlay',
          title: 'Google Play URL',
          type: 'url',
        },
      ],
    },
  ],
};

