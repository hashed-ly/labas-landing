# لا باس (Labas) - Landing Page

<div align="center">
  <img src="public/images/logos/logo-horizontal.svg" alt="Labas Logo" width="200">
  
  <p><strong>Your health, organized.</strong></p>
  
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)](https://vuejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
</div>

---

A modern, bilingual (Arabic/English) landing page for the Labas healthcare application. Built with Vue 3, Tailwind CSS v4, and vue-i18n, featuring RTL-first design and smooth animations.

## ✨ Features

- 🌐 **RTL-First Design**: Default Arabic (RTL) with seamless English (LTR) toggle
- ⚡ **Modern Stack**: Vue 3 Composition API, Tailwind CSS v4, Vue Router, Vue I18n
- 🌍 **Bilingual Support**: Complete Arabic and English translations with persistence
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, WCAG AA compliant
- 🔍 **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, structured data (JSON-LD)
- 🚀 **Performance**: Lazy-loaded images, optimized fonts, smooth scroll animations
- 🎨 **Brand Consistency**: Custom design tokens for colors, typography, and spacing
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- ✨ **Splash Screen**: Beautiful animated splash screen on first visit
- 🖼️ **Image Optimization**: Smart lazy loading with priority hints
- 🗺️ **Interactive Map**: D3.js-powered Libya coverage map with city selection and facility listings
- 🎬 **Smart Animations**: Scroll-triggered animations that activate when sections are centered

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site in Arabic (default).

**Note:** The splash screen appears once per session. Clear `sessionStorage` to see it again.

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
├── public/
│   └── images/
│       ├── icons/           # App store badges, social icons
│       ├── logos/           # Brand logos (horizontal, white variants)
│       ├── screenshots/     # App mockups and phone screenshots
│       └── Libya/           # Libya map SVG
├── src/
│   ├── components/
│   │   ├── Hero.vue         # Hero section with phone mockups
│   │   ├── AboutBrief.vue   # Brief about section with interactive map
│   │   ├── LibyaCoverageMap.vue # Interactive D3.js map with city selection
│   │   ├── Features.vue     # User features grid (4 cards)
│   │   ├── Organizations.vue # Services for healthcare providers
│   │   ├── Security.vue     # Security & privacy section
│   │   ├── FAQ.vue          # Frequently asked questions
│   │   ├── Contact.vue      # Contact form and information
│   │   ├── CTA.vue          # Download call-to-action
│   │   ├── Privacy.vue      # Privacy policy page
│   │   └── SplashScreen.vue # Animated splash screen
│   ├── composables/
│   │   ├── useI18n.js       # i18n composable with locale toggle
│   │   └── useIntersectionObserver.js # Scroll animations
│   ├── layouts/
│   │   └── MainLayout.vue   # Main layout with header & footer
│   ├── locales/
│   │   ├── ar.json          # Arabic translations
│   │   └── en.json          # English translations
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   ├── App.vue              # Root component
│   ├── i18n.js              # Vue I18n setup
│   ├── main.js              # Application entry point
│   ├── style.css            # Global styles & Tailwind imports
│   └── tokens.js            # Design tokens (colors, fonts)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎨 Design System

### Brand Colors

| Token       | Value     | Usage              |
| ----------- | --------- | ------------------ |
| `primary`   | `#0B3954` | Main brand blue    |
| `secondary` | `#087E8B` | Accent teal        |
| `accent`    | `#EBC042` | Highlight yellow   |
| `danger`    | `#D1444E` | Alert red          |
| `bg`        | `#F6F8FA` | Background neutral |
| `text`      | `#1E1E1E` | Primary text       |

### Typography

- **Arabic Font**: Noto Kufi Arabic (400, 500, 700)
- **English Font**: Urbanist (400, 500, 700)
- **Body Weight**: 400 (normal), 500 (medium)
- **Heading Weight**: 700 (bold)

### Spacing & Borders

- **Border Radius**: `0.75rem` (base)
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.05)` (soft)

## 🌐 Internationalization

The site uses Vue I18n v11 with enhanced features:

- **Default Language**: Arabic (`ar`)
- **Fallback Language**: English (`en`)
- **Locale Persistence**: User's language choice is saved to localStorage
- **Type Safety**: TypeScript autocomplete for translation keys
- **Validation**: Automatic checking for missing translations on build
- **Safe Translations**: Fallback support with error handling
- **RTL Support**: Full right-to-left layout support

### Quick Start

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

### Translation Management

```bash
# Validate all translations match
npm run validate:i18n

# Build (runs validation first)
npm run build
```

**📖 For detailed i18n documentation, see [I18N_GUIDE.md](docs/I18N_GUIDE.md)**

### Adding Translations

1. Add keys to both `src/locales/ar.json` and `src/locales/en.json`
2. Run `npm run validate:i18n` to verify
3. Use `t('your.key')` in components

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
| [Vue I18n](https://vue-i18n.intlify.dev/) | ^11.1.12 | Internationalization plugin |
| [D3 Geo](https://d3js.org/d3-geo) | ^3.1.1 | Geographic projections for map |

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

## 🐛 Known Issues

- None at this time

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
