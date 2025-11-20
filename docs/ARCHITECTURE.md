# Labas Landing Architecture

## Overview

This document describes the new architecture of the Labas Landing project after the full migration to a scalable, maintainable structure.

## Directory Structure

```
labas-landing/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Card.vue
│   │   │   ├── Badge.vue
│   │   │   └── Modal.vue
│   │   └── layout/          # Layout components
│   │       ├── Header.vue
│   │       ├── Footer.vue
│   │       ├── Container.vue
│   │       └── Section.vue
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   │   ├── HomePage.vue
│   │   │   └── sections/    # Home page sections
│   │   ├── Privacy/
│   │   │   └── PrivacyPage.vue
│   │   └── Terms/
│   │       └── TermsPage.vue
│   ├── layouts/             # Base layouts
│   │   └── BaseLayout.vue
│   ├── composables/         # Vue composables
│   │   ├── useI18n.js
│   │   ├── useIntersectionObserver.js
│   │   ├── useSanityContent.js
│   │   └── useTranslation.js
│   ├── lib/                 # External libraries
│   │   └── sanity.js
│   ├── router/              # Vue Router
│   │   └── index.js
│   ├── tokens.js            # Design system tokens
│   ├── style.css            # Global styles
│   └── main.js              # App entry point
├── studio/                  # Sanity CMS Studio
│   ├── schemas/             # Content schemas
│   │   ├── page.js
│   │   ├── translation.js
│   │   ├── navigation.js
│   │   ├── siteSettings.js
│   │   ├── localeString.js
│   │   ├── localeText.js
│   │   └── index.js
│   ├── sanity.config.js
│   └── package.json
├── docs/                    # Documentation
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── CMS_GUIDE.md
│   └── I18N_GUIDE.md
└── public/                  # Static assets
```

## Key Architectural Decisions

### 1. Pages-Based Architecture

Each major page has its own directory under `src/pages/`. This provides:
- Clear separation of concerns
- Easy navigation and maintenance
- Scalable structure for adding new pages

### 2. Component Organization

#### UI Components (`src/components/ui/`)
Reusable, atomic UI components with consistent API:
- **Button**: Multiple variants (primary, secondary, accent, etc.)
- **Input**: Form inputs with validation and error states
- **Card**: Container component with variants
- **Badge**: Labels and tags
- **Modal**: Overlay dialogs

#### Layout Components (`src/components/layout/`)
Structural components used across the application:
- **Header**: Navigation bar with mobile menu
- **Footer**: Site footer with links and contact info
- **Container**: Responsive container wrapper
- **Section**: Page section with spacing presets

### 3. Design System

Centralized design tokens in `src/tokens.js` and `src/style.css`:
- Color scales for all brand colors
- Typography system (fonts, sizes, weights)
- Spacing scale (4px base unit)
- Border radius presets
- Shadow system
- Transition presets
- Z-index scale

All tokens are exposed via Tailwind v4's `@theme` directive.

### 4. Content Management (Sanity CMS)

#### Why Sanity?
- Cloud-hosted (no infrastructure needed)
- Generous free tier (3 users, unlimited documents)
- Excellent i18n support
- Real-time collaboration
- GraphQL and REST APIs

#### Schema Design

**localeString & localeText**
Base types for all localized content:
```javascript
{
  en: "English text",
  ar: "Arabic text"
}
```

**translation**
Individual translation strings:
- Key-based system (e.g., "nav.about")
- Categorized for organization
- Supports nested structures

**page**
Full page content with sections:
- Localized title and slug
- Array of section types (hero, features, etc.)
- SEO metadata

**siteSettings**
Global site configuration:
- Site title and description
- Contact information
- Social media links
- App download URLs

### 5. Internationalization (i18n)

Two approaches supported:

#### A. JSON-based (Current/Transitional)
Using `src/locales/en.json` and `src/locales/ar.json`:
```javascript
import { useI18n } from '@/composables/useI18n';
const { t, locale, toggleLocale } = useI18n();
```

#### B. Sanity-based (Target)
Using `useTranslation` composable:
```javascript
import { useTranslation } from '@/composables/useTranslation';
const { t, locale, toggleLocale } = useTranslation();
```

The API is identical, allowing gradual migration.

### 6. State Management

No global state management library needed (yet). Using:
- **Composables** for shared logic
- **Props/Emits** for component communication
- **Provide/Inject** for deeply nested data

If the app grows, consider Pinia for state management.

## Data Flow

### Content Fetching

```
Sanity CMS → Sanity Client → Composables → Vue Components
```

Example:
```javascript
// In a Vue component
import { useSanityContent } from '@/composables/useSanityContent';

const { content, loading, error } = useSanityContent('page', 'home');
```

### Translation Fetching

```
Sanity CMS → fetchTranslations() → useTranslation → Components
```

Translations are loaded once at app initialization and cached.

## Routing

Using Vue Router with lazy-loaded pages:

```javascript
{
  path: '/',
  component: () => import('@/layouts/BaseLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('@/pages/Home/HomePage.vue'),
    },
    {
      path: '/v1/Privacy-and-Policy',
      component: () => import('@/pages/Privacy/PrivacyPage.vue'),
    },
    {
      path: '/v1/terms-of-use',
      component: () => import('@/pages/Terms/TermsPage.vue'),
    },
  ],
}
```

## Styling Approach

### Tailwind v4
Using Tailwind CSS v4 with `@theme` directive:
- No config file needed
- CSS-based configuration
- Better IntelliSense support

### Custom Utilities
Additional utilities in `src/style.css`:
- Animation keyframes
- RTL support
- Accessibility helpers

### Component Styles
- Prefer utility classes over scoped styles
- Use `<style scoped>` only for complex animations
- Follow BEM naming for custom classes

## Performance Optimizations

1. **Route-based Code Splitting**
   All pages are lazy-loaded via dynamic imports

2. **Image Optimization**
   Using Sanity's image URL builder with automatic optimization

3. **Content Caching**
   Sanity CDN provides edge caching

4. **Minimal Bundle Size**
   - Tree-shaking enabled
   - No unused dependencies
   - Modular component architecture

## Security Considerations

1. **API Keys**
   - Use environment variables for sensitive keys
   - Never commit `.env` files
   - Use Sanity CDN for public content

2. **CORS**
   - Configure allowed origins in Sanity dashboard
   - Use HTTPS in production

3. **Content Validation**
   - Validate all user inputs
   - Sanitize content from CMS before rendering

## Testing Strategy

### Unit Tests
Test individual components and composables:
```bash
npm run test:unit
```

### E2E Tests
Test complete user flows:
```bash
npm run test:e2e
```

### Recommended Tools
- **Vitest** for unit tests
- **Playwright** for E2E tests
- **Testing Library** for component tests

## Deployment

### Frontend
Deploy to any static hosting:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**

### Sanity Studio
Two options:
1. **Sanity Cloud Hosting** (sanity deploy)
2. **Self-hosted** alongside frontend

### Environment Variables
Required variables:
```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

## Migration Path

See `docs/CMS_GUIDE.md` for detailed migration instructions.

## Future Enhancements

1. **Search Functionality**
   - Integrate Sanity's search API
   - Add Algolia for advanced search

2. **Form Handling**
   - Integrate with EmailJS/Resend
   - Add form validation library

3. **Analytics**
   - Google Analytics 4
   - Custom event tracking

4. **Performance Monitoring**
   - Sentry for error tracking
   - Web Vitals monitoring

5. **PWA Support**
   - Service worker
   - Offline functionality
   - App manifest

## Contributing

See `CONTRIBUTING.md` for development guidelines.

## License

See `LICENSE` file for details.

---

Last updated: November 2025
Version: 2.0.0

