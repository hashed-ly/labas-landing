# i18n Enhancement Migration Guide

This guide helps you adopt the new i18n features in existing components.

## What's New?

✅ **Locale Persistence** - User's language choice is saved  
✅ **Type Safety** - Autocomplete for translation keys  
✅ **Validation** - Automatic translation checking on build  
✅ **Safe Translations** - Fallback support with `ts()`

## No Breaking Changes

**Good news:** All existing code continues to work! The enhancements are **100% backward compatible**.

```vue
<!-- This still works exactly as before -->
<script setup>
import { useI18n } from '@/composables/useI18n';
const { t } = useI18n();
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
</template>
```

## Optional: Adopt New Features

### 1. Use Safe Translations (Optional)

For experimental or dynamic features, consider using `ts()` with fallbacks:

**Before:**
```vue
<script setup>
import { useI18n } from '@/composables/useI18n';
const { t } = useI18n();
</script>

<template>
  <!-- If key is missing, shows the key itself -->
  <h1>{{ t('new.feature.title') }}</h1>
</template>
```

**After:**
```vue
<script setup>
import { useSafeI18n } from '@/composables/useSafeI18n';
const { ts } = useSafeI18n();
</script>

<template>
  <!-- If key is missing, shows fallback -->
  <h1>{{ ts('new.feature.title', 'Coming Soon') }}</h1>
</template>
```

### 2. Enable TypeScript Autocomplete (Recommended)

If using TypeScript or JSDoc, you'll automatically get autocomplete for translation keys!

**VS Code:** Restart TypeScript server (Cmd+Shift+P > "TypeScript: Restart TS Server")

Now typing `t('` will show all available keys with autocomplete!

### 3. Run Validation Before Commits (Recommended)

Add to your workflow:

```bash
# Before committing new translations
npm run validate:i18n

# Or add to pre-commit hook (optional)
```

## Summary

| Feature | Required Changes | Impact |
|---------|-----------------|--------|
| Locale Persistence | None (automatic) | ✅ Users' language choice persists |
| Type Safety | None (automatic) | ✅ IDE autocomplete works |
| Validation | None (runs on build) | ✅ Catches missing translations |
| Safe Translations | Optional (`ts()` instead of `t()`) | ✅ Better error handling |

## Recommendations

### For Stable Features
Continue using `t()` as before - no changes needed.

### For Experimental Features
Use `ts()` with fallbacks for features that might not have translations yet.

### For All New Translations
1. Add to both `ar.json` and `en.json`
2. Run `npm run validate:i18n`
3. Commit when validation passes

---

**Questions?** See [I18N_GUIDE.md](./I18N_GUIDE.md) for detailed documentation.

