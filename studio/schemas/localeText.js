// Reusable locale text type for i18n (multiline)
export default {
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
    {
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 4,
    },
  ],
};

