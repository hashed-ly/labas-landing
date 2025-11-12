# Internationalization (i18n) Guide

This guide explains how to use the enhanced i18n system in the Labas landing page.

## 📚 Table of Contents

- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
- [Type Safety](#type-safety)
- [Translation Validation](#translation-validation)
- [Best Practices](#best-practices)

---

## Overview

The app uses **Vue I18n v11** with custom enhancements:

- ✅ **Locale Persistence** - User's language choice is saved
- ✅ **Type Safety** - TypeScript autocomplete for translation keys
- ✅ **Validation** - Automatic checking for missing translations
- ✅ **Safe Translations** - Fallback support with error handling
- ✅ **RTL Support** - Full right-to-left support for Arabic

---

## Basic Usage

### Standard Translation

```vue
<script setup>
import { useI18n } from '@/composables/useI18n';

const { t, locale, toggleLocale } = useI18n();
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
  <p>{{ t('hero.subtitle') }}</p>
  
  <!-- Toggle between Arabic and English -->
  <button @click="toggleLocale">
    {{ locale === 'ar' ? 'English' : 'العربية' }}
  </button>
</template>
```

### Safe Translation (with Fallback)

For keys that might not exist yet:

```vue
<script setup>
import { useSafeI18n } from '@/composables/useSafeI18n';

const { ts, locale } = useSafeI18n();
</script>

<template>
  <!-- If key doesn't exist, shows fallback -->
  <h1>{{ ts('new.feature.title', 'Coming Soon') }}</h1>
</template>
```

---

## Advanced Features

### 1. Locale Persistence

The user's language choice is automatically saved to `localStorage` and restored on next visit:

```javascript
// Automatically handled by useI18n()
const { locale } = useI18n();

// User's choice persists across sessions
locale.value = 'en'; // Saved automatically
```

### 2. Check if Translation Key Exists

```vue
<script setup>
import { useSafeI18n } from '@/composables/useSafeI18n';

const { hasKey } = useSafeI18n();

// Check before using
if (hasKey('features.newFeature')) {
  // Key exists
}
</script>
```

### 3. RTL/LTR Detection

```vue
<script setup>
import { useI18n } from '@/composables/useI18n';

const { isRTL, direction } = useI18n();
</script>

<template>
  <div :class="{ 'rtl-layout': isRTL }">
    <!-- Layout automatically adjusts -->
  </div>
  
  <!-- Use logical properties -->
  <div class="ps-4 pe-4">
    <!-- ps = padding-start (right in RTL, left in LTR) -->
    <!-- pe = padding-end (left in RTL, right in LTR) -->
  </div>
</template>
```

### 4. Programmatic Locale Setting

```vue
<script setup>
import { useI18n } from '@/composables/useI18n';

const { setLocale } = useI18n();

// Set to specific locale
const switchToArabic = () => {
  setLocale('ar');
};

const switchToEnglish = () => {
  setLocale('en');
};
</script>
```

---

## Type Safety

TypeScript types are automatically generated from `en.json`:

```typescript
// ✅ Autocomplete works
t('hero.title')        // Valid
t('features.booking')  // Valid

// ❌ TypeScript error
t('invalid.key')       // Error: Key doesn't exist
```

### How It Works

The `src/types/i18n.d.ts` file extends Vue I18n with your translation schema:

```typescript
import type en from '../locales/en.json';

type MessageSchema = typeof en;

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
```

---

## Translation Validation

### Automatic Validation on Build

Translations are validated automatically before each build:

```bash
npm run build
# Runs validation first, then builds
```

### Manual Validation

```bash
npm run validate:i18n
```

### What It Checks

✅ All keys in Arabic exist in English  
✅ All keys in English exist in Arabic  
⚠️ Empty or placeholder values (`""` or `"TODO"`)  
✅ Total key count matches

### Example Output

```
🔍 Validating translation files...

❌ Missing in English (en.json):
   - hero.newFeature
   - contact.phoneNumber

✅ Total keys: 138 (Arabic) / 136 (English)
💥 Translation validation failed!
```

---

## Best Practices

### 1. Use Nested Keys

✅ **Good:**
```json
{
  "hero": {
    "title": "Welcome",
    "subtitle": "Get started"
  }
}
```

❌ **Avoid:**
```json
{
  "heroTitle": "Welcome",
  "heroSubtitle": "Get started"
}
```

### 2. Use Logical Properties for RTL

✅ **Good:**
```html
<div class="ps-4 pe-8">  <!-- start/end -->
<div class="ms-auto">    <!-- margin-start -->
```

❌ **Avoid:**
```html
<div class="pl-4 pr-8">  <!-- left/right are not RTL-aware -->
<div class="ml-auto">    <!-- margin-left doesn't flip -->
```

### 3. Keep Keys in Sync

Always add keys to **both** `ar.json` and `en.json`:

```bash
# Add new key to both files
# Then validate
npm run validate:i18n
```

### 4. Use `ts()` for Experimental Features

```vue
<!-- For stable features -->
<h1>{{ t('hero.title') }}</h1>

<!-- For new/experimental features -->
<h1>{{ ts('beta.feature', 'Beta Feature') }}</h1>
```

### 5. Escape Special Characters

Vue I18n treats `@` as a special character for linked messages:

✅ **Good:**
```json
{
  "email": "support{'@'}labas.ly"
}
```

❌ **Avoid:**
```json
{
  "email": "support@labas.ly"  // Causes compilation error
}
```

### 6. Use Comments for Context

```json
{
  "hero": {
    "_comment": "Main hero section at the top of the page",
    "title": "لا باس — رعايتك الصحية في تطبيقٍ واحد"
  }
}
```

---

## API Reference

### `useI18n()`

Standard i18n composable with locale persistence.

**Returns:**
- `t(key, params?)` - Translate a key
- `locale` - Current locale (computed ref)
- `isRTL` - Is current locale RTL? (computed ref)
- `direction` - Current text direction: 'rtl' | 'ltr' (computed ref)
- `toggleLocale()` - Switch between ar/en
- `setLocale(locale)` - Set specific locale

### `useSafeI18n()`

Enhanced composable with error handling and fallbacks.

**Returns:**
- All of `useI18n()` plus:
- `ts(key, fallback?, params?)` - Safe translation with fallback
- `hasKey(key)` - Check if translation key exists
- `tp(key, count, params?)` - Translation with pluralization

---

## Troubleshooting

### Issue: Translations not updating

**Solution:** Clear localStorage and refresh:
```javascript
localStorage.removeItem('labas_preferred_locale');
location.reload();
```

### Issue: TypeScript not showing autocomplete

**Solution:** Restart your IDE/TypeScript server:
```bash
# VS Code: Cmd+Shift+P > "TypeScript: Restart TS Server"
```

### Issue: Validation failing with matching keys

**Solution:** Check for comment keys or extra whitespace:
```json
{
  "_comment": "This is ignored by validation",
  "key": "value"
}
```

---

## Examples

### Complete Component Example

```vue
<script setup>
import { useSafeI18n } from '@/composables/useSafeI18n';

const { t, ts, locale, isRTL, toggleLocale } = useSafeI18n();

const features = [
  { key: 'booking', icon: '📅' },
  { key: 'messaging', icon: '💬' },
  { key: 'reports', icon: '📊' }
];
</script>

<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <!-- Header with language toggle -->
    <header class="flex justify-between items-center p-4">
      <h1>{{ t('hero.title') }}</h1>
      <button @click="toggleLocale" class="btn">
        {{ locale === 'ar' ? 'EN' : 'ع' }}
      </button>
    </header>

    <!-- Feature list -->
    <section>
      <h2>{{ t('features.title') }}</h2>
      <div class="grid gap-4">
        <div v-for="feature in features" :key="feature.key">
          <span>{{ feature.icon }}</span>
          <h3>{{ t(`features.${feature.key}.title`) }}</h3>
          <p>{{ t(`features.${feature.key}.description`) }}</p>
        </div>
      </div>
    </section>

    <!-- Beta feature with fallback -->
    <section>
      <h2>{{ ts('beta.title', 'Coming Soon') }}</h2>
      <p>{{ ts('beta.description', 'New features are on the way!') }}</p>
    </section>
  </div>
</template>
```

---

## Resources

- [Vue I18n Documentation](https://vue-i18n.intlify.dev/)
- [Tailwind CSS RTL Support](https://tailwindcss.com/docs/text-direction)
- [MDN: Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

---

**Need help?** Check the main README or contact the development team.

