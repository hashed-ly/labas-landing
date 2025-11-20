# Sanity CMS Setup Guide

This guide walks you through setting up Sanity CMS for content management. **Note:** We're keeping the existing JSON-based i18n system for translations and using Sanity primarily for dynamic content (pages, settings, navigation).

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Running the Studio](#running-the-studio)
3. [Content Setup](#content-setup)
4. [Using CMS in Components](#using-cms-in-components)
5. [Production Deployment](#production-deployment)

---

## Initial Setup

### Step 1: Create Sanity Project

1. **Login to Sanity**

   ```bash
   cd studio
   npx sanity login
   ```

2. **Initialize Project**

   ```bash
   npx sanity init --project-name "Labas Landing" --dataset production
   ```

   This will:
   - Create a new Sanity project
   - Generate a project ID
   - Create a production dataset

3. **Note Your Project ID**
   You'll receive a project ID like `abc12345`. Save this!

### Step 2: Configure Environment Variables

1. **Create `.env` file** in project root:

   ```bash
   cp .env.example .env
   ```

2. **Add Sanity credentials**:

   ```
   VITE_SANITY_PROJECT_ID=your-project-id-here
   VITE_SANITY_DATASET=production
   ```

3. **Update studio config**:
   Open `studio/sanity.config.js` and update:
   ```javascript
   projectId: 'your-project-id-here',
   dataset: 'production',
   ```

---

## Running the Studio

### Development Mode

```bash
cd studio
npx sanity dev
```

This starts the studio at `http://localhost:3333`

### First Time Access

1. Navigate to `http://localhost:3333`
2. Login with your Sanity account
3. You'll see the studio interface with your schemas

---

## Content Setup

### Phase 1: Site Settings

1. **Go to Studio** → Create new "Site Settings" document

2. **Fill in basic info**:
   - **Site Title**:
     - EN: "Labas - Healthcare Appointments Made Easy"
     - AR: "لا باس - حجز المواعيد الطبية بسهولة"
   - **Site Description**:
     - EN: "Labas connects patients, doctors, and hospitals..."
     - AR: "يربط لاباس المرضى والأطباء والمستشفيات..."

3. **Add Contact Info**:
   - Email: `info@labas.ly`
   - Phone: From `src/locales/en.json` → `contact.phone`
   - Address: From `src/locales/en.json` → `footer.location`

4. **Add Social Media**:
   - Facebook: `https://www.facebook.com/labas.ly`
   - Instagram: `https://www.instagram.com/labas.ly`
   - Twitter: `https://www.x.com/labas.ly`

5. **Add App Links**:
   - OneLink: `https://onelink.to/labas`
   - App Store: (From `src/constants.js`)
   - Google Play: (From `src/constants.js`)

### Phase 2: Navigation

1. **Create "Main Menu"** navigation document

2. **Add menu items**:

   ```
   1. About
      - EN: "About"
      - AR: "من نحن"
      - Link: "/#about-brief"
      - Order: 1

   2. Features
      - EN: "Features"
      - AR: "المميزات"
      - Link: "/#features"
      - Order: 2

   3. Solutions
      - EN: "Solutions"
      - AR: "الحلول"
      - Link: "/#solutions"
      - Order: 3

   4. Contact
      - EN: "Contact"
      - AR: "اتصل بنا"
      - Link: "/#contact"
      - Order: 4
   ```

### Phase 3: ~~Translations~~ (Skipped)

**We're keeping the JSON-based i18n system!**

Translations will continue to be managed via:

- `src/locales/en.json`
- `src/locales/ar.json`
- `src/composables/useI18n.js`

This is simpler and the existing system works well. You can always migrate to Sanity translations later if needed.

### Phase 4: Pages (Optional)

For dynamic page management, create page documents:

1. **Home Page**
   - Title: EN: "Home" / AR: "الرئيسية"
   - Slug: `home`
   - Add sections as needed

2. **Privacy Page**
   - Can remain file-based or migrate to CMS

---

## Using CMS in Components

### Keep Using Existing i18n

**Continue using `useI18n` for all translations:**

```vue
<script setup>
import { useI18n } from '@/composables/useI18n';
const { t, locale, toggleLocale } = useI18n();
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
</template>
```

No changes needed to your translation workflow!

### Use Sanity for Dynamic Content

For pages with dynamic content:

```vue
<script setup>
import { useSanityContent } from '@/composables/useSanityContent';
const { content, loading, error } = useSanityContent('page', 'home');
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error loading content</div>
  <div v-else>
    <h1>{{ content.title[locale] }}</h1>
    <!-- Render sections -->
  </div>
</template>
```

### Using Site Settings

```vue
<script setup>
import { useSiteSettings } from '@/composables/useSanityContent';
const { settings, loading } = useSiteSettings();
</script>

<template>
  <footer>
    <a :href="`mailto:${settings?.contact?.email}`">
      {{ settings?.contact?.email }}
    </a>
  </footer>
</template>
```

---

## Production Deployment

### Deploy Studio

**Option 1: Sanity Cloud (Recommended)**

```bash
cd studio
npx sanity deploy
```

This deploys to `your-project.sanity.studio`

**Option 2: Self-Hosted**

Add to your frontend build:

```bash
cd studio
npm run build
# Copy dist folder to your frontend public directory
```

### Configure CORS

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add your frontend domains:
   - `http://localhost:5173` (development)
   - `https://labas.ly` (production)

### Environment Variables

For production deployment (Vercel/Netlify):

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

---

## Verification Checklist

- [ ] Sanity project created
- [ ] Studio accessible locally
- [ ] Environment variables configured
- [ ] Site Settings created
- [ ] Navigation menu created
- ~~[ ] Translations imported~~ (using JSON files)
- ~~[ ] Components updated to use `useTranslation`~~ (keeping `useI18n`)
- [ ] Studio deployed to production (optional)
- [ ] CORS configured (if using production)
- [ ] Components can fetch from CMS (optional)

---

## Troubleshooting

### "Access Denied" Errors

- Check your Sanity token permissions
- Verify project ID is correct
- Check CORS settings

### Translations Not Loading

- Translations come from JSON files, not Sanity
- Check `src/locales/en.json` and `ar.json`
- Verify `useI18n` is imported correctly
- See `docs/I18N_GUIDE.md` for i18n troubleshooting

### Studio Not Loading Schemas

- Check `studio/schemas/index.js` exports all schemas
- Verify no syntax errors in schema files
- Clear browser cache and restart dev server

### Images Not Loading

- Check image URLs in Sanity
- Verify `urlFor` function is used correctly
- Check CORS settings for image CDN

---

## Next Steps

After migration:

1. **Test thoroughly** - Check all pages in both languages
2. **Update documentation** - Document any custom schemas
3. **Train team** - Show how to use Sanity Studio
4. **Set up workflows** - Configure publishing workflows if needed
5. **Monitor** - Watch for errors in production

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Guide](https://www.sanity.io/docs/schema-types)
- [Sanity i18n Plugin](https://www.sanity.io/plugins/sanity-plugin-internationalized-array)
- [Content Lake API](https://www.sanity.io/docs/http-api)

---

Last updated: November 2025
