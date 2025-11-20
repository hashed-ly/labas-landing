export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSection',
          title: 'Hero Section',
          fields: [
            {
              name: 'badge',
              title: 'Badge Text',
              type: 'localeString',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'localeText',
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image' }],
            },
          ],
        },
        {
          type: 'object',
          name: 'featuresSection',
          title: 'Features Section',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Feature Title',
                      type: 'localeString',
                    },
                    {
                      name: 'description',
                      title: 'Feature Description',
                      type: 'localeText',
                    },
                    {
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'localeText',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'localeString',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'localeText',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'slug.current',
    },
  },
};

