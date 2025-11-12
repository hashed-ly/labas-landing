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
- 🌍 **Bilingual Support**: Complete Arabic and English translations
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, WCAG AA compliant
- 🔍 **SEO Optimized**: Proper meta tags, bilingual descriptions, structured data
- 🚀 **Performance**: Lazy-loaded images, optimized fonts, smooth scroll animations
- 🎨 **Brand Consistency**: Custom design tokens for colors, typography, and spacing
- 📱 **Fully Responsive**: Mobile-first design that works on all devices

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

### Build for Production

```bash
npm run build
```

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
│   │   ├── AboutBrief.vue   # Brief about section with map
│   │   ├── Features.vue     # User features grid (4 cards)
│   │   ├── Organizations.vue # Services for healthcare providers
│   │   ├── Security.vue     # Security & privacy section
│   │   ├── FAQ.vue          # Frequently asked questions
│   │   ├── Contact.vue      # Contact form and information
│   │   ├── CTA.vue          # Download call-to-action
│   │   └── Privacy.vue      # Privacy policy page
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
| [Vue 3](https://vuejs.org/) | ^3.5.13 | Progressive JavaScript framework |
| [Vite](https://vitejs.dev/) | ^6.0.3 | Next-generation frontend tooling |
| [Tailwind CSS](https://tailwindcss.com/) | v4 (next) | Utility-first CSS framework |
| [Vue Router](https://router.vuejs.org/) | ^4.5.0 | Official Vue.js router |
| [Vue I18n](https://vue-i18n.intlify.dev/) | ^10.0.5 | Internationalization plugin |
| [Flowbite Vue](https://flowbite-vue.com/) | ^0.1.7 | UI component library |

## 🎬 Animations

The site features scroll-triggered animations using the Intersection Observer API:

- **Fade-in-up**: Elements fade in and slide up when scrolled into view
- **Staggered delays**: Sequential animations for lists and grids
- **Smooth transitions**: All interactive elements have smooth hover/focus states

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

### Performance Tips

- ✅ Images are lazy-loaded with `loading="lazy"`
- ✅ Google Fonts are preloaded with `display=swap`
- ✅ Critical assets use `loading="eager"`
- 💡 Consider using image CDN for production

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL support tested on Arabic-locale browsers

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
