export default {
  name: 'translation',
  title: 'Translation',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      description: 'Unique key for this translation (e.g., "nav.about")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Translation Value',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Navigation', value: 'nav' },
          { title: 'Hero', value: 'hero' },
          { title: 'About', value: 'about' },
          { title: 'Features', value: 'features' },
          { title: 'Organizations', value: 'organizations' },
          { title: 'Security', value: 'security' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Contact', value: 'contact' },
          { title: 'Footer', value: 'footer' },
          { title: 'CTA', value: 'cta' },
          { title: 'Privacy', value: 'privacy' },
          { title: 'Terms', value: 'terms' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional note about this translation',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'category',
      en: 'value.en',
    },
    prepare(selection) {
      const { title, subtitle, en } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${en || 'No English translation'}`,
      };
    },
  },
};

