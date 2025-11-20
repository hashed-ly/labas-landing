# لا باس (Labas) - Landing Page

<div align="center">
  <img src="public/images/logos/logo-horizontal.svg" alt="Labas Logo" width="200">
  
  <p><strong>Your health, organized.</strong></p>
  
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)](https://vuejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
</div>

---

A modern, bilingual (Arabic/English) landing page for the Labas healthcare application. Built with Vue 3, Tailwind CSS v4, and Sanity CMS, featuring RTL-first design, comprehensive design system, and a scalable architecture.

## ✨ Features

- 🌐 **RTL-First Design**: Default Arabic (RTL) with seamless English (LTR) toggle
- ⚡ **Modern Stack**: Vue 3 Composition API, Tailwind CSS v4, Sanity CMS, Vue Router
- 🌍 **Bilingual Support**: Complete Arabic and English translations via CMS
- 🎨 **Comprehensive Design System**: Full design tokens with color scales, typography, spacing, shadows
- 🏗️ **Scalable Architecture**: Pages-based structure with reusable UI components
- 🗄️ **Headless CMS**: Sanity CMS for content and translation management
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, WCAG AA compliant
- 🔍 **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards
- 🚀 **Performance**: Code splitting, lazy loading, optimized assets
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- 🧩 **UI Component Library**: Reusable Button, Input, Card, Badge, Modal components
- 🗺️ **Interactive Map**: D3.js-powered Libya coverage map
- 🎬 **Smart Animations**: Intersection Observer-based scroll animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install frontend dependencies
npm install

# Install Sanity Studio dependencies (optional)
cd studio
npm install
cd ..
```

### Development

**Frontend:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the site in Arabic (default).

**Sanity Studio (optional):**
```bash
cd studio
npx sanity dev
```

Visit `http://localhost:3333` to access the CMS.

**Note:** The site can run without Sanity in development using fallback JSON translations.

### Build for Production

```bash
npm run build
```

Automatically validates translations before building.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
labas-landing/
├── public/                  # Static assets
│   └── images/              # Images and icons
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Card.vue
│   │   │   ├── Badge.vue
│   │   │   └── Modal.vue
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   ├── Container.vue
│   │   │   └── Section.vue
│   │   └── [Legacy components...]
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   │   ├── HomePage.vue
│   │   │   └── sections/    # Home page sections
│   │   ├── Privacy/
│   │   │   └── PrivacyPage.vue
│   │   └── Terms/
│   │       └── TermsPage.vue
│   ├── layouts/
│   │   ├── BaseLayout.vue   # Base layout with slots
│   │   └── MainLayout.vue   # Legacy main layout
│   ├── composables/
│   │   ├── useI18n.js       # Legacy i18n composable
│   │   ├── useTranslation.js # Sanity-based translations
│   │   ├── useSanityContent.js # Fetch content from CMS
│   │   └── useIntersectionObserver.js
│   ├── lib/
│   │   └── sanity.js        # Sanity client configuration
│   ├── locales/
│   │   ├── ar.json          # Fallback Arabic translations
│   │   └── en.json          # Fallback English translations
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   ├── tokens.js            # Design system tokens
│   ├── style.css            # Global styles with @theme
│   └── main.js              # Application entry point
├── studio/                  # Sanity CMS Studio
│   ├── schemas/             # Content schemas
│   │   ├── page.js
│   │   ├── translation.js
│   │   ├── navigation.js
│   │   ├── siteSettings.js
│   │   └── index.js
│   ├── sanity.config.js
│   └── package.json
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── CMS_GUIDE.md
│   └── I18N_GUIDE.md
└── README.md
```

## 🎨 Design System

### Brand Colors

Full color scales with 50-900 shades:

| Token       | Base      | Usage              |
| ----------- | --------- | ------------------ |
| `primary`   | `#0B3954` | Main brand blue    |
| `secondary` | `#087E8B` | Accent teal        |
| `accent`    | `#EBC042` | Highlight yellow   |
| `danger`    | `#D1444E` | Alert red          |
| `success`   | `#10B981` | Success states     |
| `warning`   | `#F59E0B` | Warning states     |

### Typography

- **Arabic Font**: Noto Kufi Arabic (400, 500, 700)
- **English Font**: Urbanist (400, 500, 700)
- **Font Sizes**: xs (12px) to 9xl (128px)
- **Line Heights**: tight, normal, relaxed, loose
- **Letter Spacing**: tighter to widest

### Spacing & Layout

- **Base Unit**: 4px
- **Spacing Scale**: 0-96 (0-384px)
- **Border Radius**: sm to 3xl + full
- **Shadows**: sm to 2xl + custom (soft, glow)
- **Breakpoints**: sm (640px) to 2xl (1536px)

**📖 For complete design system docs, see [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)**

## 🌐 Internationalization

The site uses **JSON-based i18n** for all translations:

```vue
<script setup>
import { useI18n } from '@/composables/useI18n';
const { t, locale, toggleLocale } = useI18n();
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
  <button @click="toggleLocale">Switch Language</button>
</template>
```

### Features

- **Default Language**: Arabic (`ar`)
- **Fallback Language**: English (`en`)
- **Locale Persistence**: Saved to localStorage
- **RTL Support**: Full right-to-left layout
- **Type Safety**: TypeScript autocomplete
- **Validation**: Automatic checking for missing translations

### Translation Management

```bash
# Validate translations
npm run validate:i18n

# Build (runs validation first)
npm run build
```

### Adding Translations

1. Add keys to `src/locales/ar.json` and `src/locales/en.json`
2. Run `npm run validate:i18n` to verify
3. Use `t('your.key')` in components

**📖 For detailed documentation:** [I18N_GUIDE.md](docs/I18N_GUIDE.md)

### CMS for Content (Not Translations)

Sanity CMS is used for dynamic **content** (pages, settings, navigation), while translations remain in JSON files for simplicity. See [CMS_GUIDE.md](docs/CMS_GUIDE.md) for setup.

## 🔍 SEO Optimization

The site includes comprehensive SEO features:

- **Meta Tags**: Title, description, keywords, robots, theme-color
- **Open Graph**: Full OG tags for social media sharing (title, description, image, type, locale)
- **Twitter Cards**: Optimized Twitter sharing cards (summary_large_image)
- **Structured Data**: JSON-LD schema for Organization with contact information
- **Canonical URLs**: Proper canonical links for all pages
- **Hreflang Tags**: Language alternates for Arabic/English versions
- **Semantic HTML**: Proper heading hierarchy (h1-h6) and ARIA landmarks
- **Bilingual Support**: Separate meta descriptions and titles per language

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Focus states on interactive elements

## 📱 Responsive Design

The site is fully responsive with breakpoints at:

- Mobile: < 768px
- Tablet/Desktop: ≥ 768px (md breakpoint)

## 🔧 Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [Vue 3](https://vuejs.org/) | ^3.5.24 | Progressive JavaScript framework |
| [Vite](https://vitejs.dev/) | ^7.2.2 | Next-generation frontend tooling |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first CSS framework |
| [Vue Router](https://router.vuejs.org/) | ^4.6.3 | Official Vue.js router |
| [Sanity](https://www.sanity.io/) | latest | Headless CMS for content |
| [Vue I18n](https://vue-i18n.intlify.dev/) | ^11.1.12 | Internationalization (fallback) |
| [D3 Geo](https://d3js.org/d3-geo) | ^3.1.1 | Geographic projections for map |
| [EmailJS](https://www.emailjs.com/) | latest | Contact form email service |

## 🎬 Animations

The site features intelligent scroll-triggered animations using the Intersection Observer API:

- **Fade-in-up**: Elements fade in and slide up when scrolled into view
- **Centered Activation**: Animations trigger when sections reach ~50% viewport visibility for better UX
- **Staggered delays**: Sequential animations for lists and grids
- **Smooth transitions**: All interactive elements have smooth hover/focus states
- **Performance Optimized**: Respects `prefers-reduced-motion` for accessibility

## 🚧 Development Notes

### RTL/LTR Considerations

- ✅ Use logical properties: `start`/`end` instead of `left`/`right`
- ✅ Test both RTL and LTR layouts thoroughly
- ✅ Use `dir="ltr"` for phone numbers and emails
- ⚠️ Icons and images may need mirroring in RTL mode

### Vue I18n Special Characters

When using `@` symbols in translation strings, escape them with `{'@'}`:

```json
{
  "email": "support{'@'}labas.ly"
}
```

### Performance & Images

- ✅ Images are lazy-loaded with `loading="lazy"` (below fold)
- ✅ Hero images use `loading="eager"` and `fetchpriority="high"`
- ✅ Google Fonts are preloaded with `display=swap`
- ✅ Splash screen cached per session with `sessionStorage`
- 📖 See [IMAGE_OPTIMIZATION.md](docs/IMAGE_OPTIMIZATION.md) for optimization guide

**Recommended:** Convert images to WebP format for 80-90% size reduction without quality loss.

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL support tested on Arabic-locale browsers

## 🗺️ Interactive Map Features

The Libya Coverage Map component includes:

- **City Selection**: Interactive buttons to switch between Benghazi, Tripoli, and Misrata
- **Auto-Focus**: Map automatically centers on selected city with locale-aware positioning
- **Facility Listings**: Collapsible panels showing hospitals, clinics, and labs per city
- **Zoom Controls**: Interactive zoom in/out and reset buttons
- **Brand Markers**: Custom SVG brand marks replace standard map pins
- **Mobile Optimized**: Responsive layout with collapsed lists by default on mobile
- **RTL Support**: Full right-to-left layout support for Arabic interface

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Complete design system reference
- **[CMS_GUIDE.md](docs/CMS_GUIDE.md)** - Sanity CMS setup and migration guide
- **[I18N_GUIDE.md](docs/I18N_GUIDE.md)** - Internationalization documentation

## 🔄 Migration Status

The project is currently in a **hybrid state**:

✅ **Completed:**
- Design system with comprehensive tokens
- Pages-based architecture
- Reusable UI component library
- Sanity CMS setup and schemas
- Content fetching composables

🚧 **In Progress:**
- Migrating content from JSON to Sanity
- Updating components to use new architecture

**To complete migration**, see [CMS_GUIDE.md](docs/CMS_GUIDE.md)

## 🐛 Known Issues

- Legacy components coexist with new pages structure (migration in progress)

## 📝 Contributing

This is a private project for Labas Health Services Company. For internal contributions:

1. Create a feature branch from `main`
2. Make your changes
3. Test both Arabic and English versions
4. Submit a pull request with a clear description

## 📞 Contact

**Labas Health Services Company**  
📍 Forth Ring Road, Benghazi, Libya  
📧 support@labas.ly  
📱 +218 91-057 9911

**Developer Contact:**  
📧 salah@labas.ly  
📱 +218 91-376 0133

## 📄 License

© 2024 لا باس (Labas) - All rights reserved  
Owned and operated by **Gate Company For Information Technology**

---

<div align="center">
  <strong>Built with ❤️ in Benghazi, Libya 🇱🇾</strong>
</div>
