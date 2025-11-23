# لا باس (Labas) - Landing Page

<div align="center">
  <img src="public/images/logos/logo-horizontal.svg" alt="Labas Logo" width="200">
  
  <p><strong>Your health, organized.</strong></p>
  
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)](https://vuejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
</div>

---

A modern, bilingual (Arabic/English) landing page for the Labas healthcare application. Built with Vue 3, Tailwind CSS v4, featuring RTL-first design, comprehensive design system, and a scalable architecture.

## ✨ Features

- 🌐 **RTL-First Design**: Default Arabic (RTL) with seamless English (LTR) toggle
- ⚡ **Modern Stack**: Vue 3 Composition API, Tailwind CSS v4, Vue Router
- 🌍 **Bilingual Support**: Complete Arabic and English translations (500+ keys)
- 🎨 **Comprehensive Design System**: Full design tokens with color scales, typography, spacing, shadows
- 🏗️ **Scalable Architecture**: Pages-based structure with reusable UI components
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, WCAG AA compliant
- 🔍 **SEO Optimized**: Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- 🚀 **Performance**: Code splitting, lazy loading, optimized assets (~82KB gzipped)
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- 🧩 **UI Component Library**: Reusable Button, Input, Card, Badge, Modal components
- 🗺️ **Interactive Map**: D3.js-powered Libya coverage map with city selection
- 🎬 **Smart Animations**: Intersection Observer-based scroll animations
- 📧 **Contact Forms**: Ready for Mailgun integration

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ and npm 10+

### Installation

```bash
# Install dependencies
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

Automatically validates translations before building. Output goes to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
labas-landing/
├── public/                  # Static assets
│   ├── images/              # Images, icons, screenshots
│   ├── Labas Guides/        # Content reference guides
│   └── Libya/              # Map data files
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── CTAButton.vue
│   │   │   ├── Dropdown.vue
│   │   │   └── ...
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.vue
│   │   │   └── Footer.vue
│   │   └── [Other components...]
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   │   ├── HomePage.vue
│   │   │   └── sections/   # Home page sections
│   │   ├── Solutions/
│   │   │   ├── AppPage.vue
│   │   │   ├── DashboardPage.vue
│   │   │   ├── DashboardAppointmentsPage.vue
│   │   │   ├── DashboardBookingInfoPage.vue
│   │   │   ├── DashboardSchedulesPage.vue
│   │   │   └── sections/   # Solution page sections
│   │   ├── Contact/
│   │   │   └── ContactPage.vue
│   │   ├── Privacy/
│   │   │   └── PrivacyPage.vue
│   │   └── Terms/
│   │       └── TermsPage.vue
│   ├── layouts/
│   │   └── MainLayout.vue  # Main layout wrapper
│   ├── composables/
│   │   ├── useI18n.js      # i18n composable
│   │   ├── useSEO.js       # Dynamic SEO meta tags
│   │   ├── useIntersectionObserver.js
│   │   └── ...
│   ├── locales/
│   │   ├── ar.json         # Arabic translations (500 keys)
│   │   └── en.json         # English translations (500 keys)
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   ├── tokens.js           # Design system tokens
│   ├── constants.js        # App constants (links, etc.)
│   ├── style.css           # Global styles
│   └── main.js             # Application entry point
├── scripts/
│   └── validate-translations.js  # Translation validation
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   └── ...
├── PRODUCTION_CHECKLIST.md # Production readiness checklist
├── SEO_IMPLEMENTATION.md   # SEO implementation guide
├── MAILGUN_INTEGRATION.md  # Mailgun integration guide
└── README.md
```

## 🗺️ Site Routes

### Main Pages
- `/` - Home page
- `/contact` - Contact page with form
- `/v1/Privacy-and-Policy` - Privacy policy
- `/v1/terms-of-use` - Terms of use

### Solutions Pages
- `/solutions/app` - Mobile App page
- `/solutions/dashboard` - Dashboard overview
- `/solutions/dashboard/appointments` - Appointments & Bookings management
- `/solutions/dashboard/booking-info` - Booking Information (Doctor Profiles, Groups, Imaging)
- `/solutions/dashboard/schedules` - Schedules & Timetables

## 🎨 Design System

### Brand Colors

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

**📖 For complete design system docs, see [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)**

## 🌐 Internationalization

The site uses **JSON-based i18n** with 500+ translation keys in both Arabic and English:

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
- **Validation**: Automatic checking for missing translations

### Translation Management

```bash
# Validate translations
npm run validate:i18n

# Build (runs validation first)
npm run build
```

**📖 For detailed documentation:** See translation files in `src/locales/`

## 🔍 SEO Optimization

### Dynamic Meta Tags

Each page dynamically updates meta tags using the `useSEO` composable:

- **Page Titles**: Unique, bilingual titles per route
- **Meta Descriptions**: Unique, bilingual descriptions per route
- **Open Graph Tags**: Auto-updated for social sharing
- **Twitter Cards**: Optimized for Twitter sharing
- **Canonical URLs**: Proper canonical links per route
- **Hreflang Tags**: Language alternates (ar/en)

### Structured Data

- JSON-LD Organization schema with contact information
- Ready for additional schemas (BreadcrumbList, WebSite, etc.)

**📖 For complete SEO documentation:** [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md)

## 📧 Contact Form Integration

The contact form is ready for **Mailgun** integration. See [MAILGUN_INTEGRATION.md](MAILGUN_INTEGRATION.md) for:
- Integration steps
- Backend example code
- Security considerations
- Testing checklist

## ♿ Accessibility

- ✅ Semantic HTML5 elements
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG AA standards
- ✅ Focus states on all interactive elements
- ✅ Alt text on all images
- ✅ Proper heading hierarchy

## 📱 Responsive Design

Fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🔧 Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [Vue 3](https://vuejs.org/) | ^3.5.24 | Progressive JavaScript framework |
| [Vite](https://vitejs.dev/) | ^7.2.2 | Next-generation frontend tooling |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first CSS framework |
| [Vue Router](https://router.vuejs.org/) | ^4.6.3 | Official Vue.js router |
| [Vue I18n](https://vue-i18n.intlify.dev/) | ^11.1.12 | Internationalization |
| [D3 Geo](https://d3js.org/d3-geo) | ^3.1.1 | Geographic projections for map |

## 🎬 Animations

Intelligent scroll-triggered animations using Intersection Observer API:

- **Fade-in-up**: Elements fade in and slide up when scrolled into view
- **Staggered delays**: Sequential animations for lists and grids
- **Smooth transitions**: All interactive elements have smooth hover/focus states
- **Performance Optimized**: Respects `prefers-reduced-motion` for accessibility

## 🗺️ Interactive Map Features

The Libya Coverage Map component includes:

- **City Selection**: Interactive buttons for Benghazi, Tripoli, and Misrata
- **Auto-Focus**: Map automatically centers on selected city
- **Facility Listings**: Collapsible panels showing hospitals, clinics, and labs
- **Statistics Display**: City-specific statistics with icons
- **Mobile Optimized**: Responsive layout with collapsed lists by default
- **RTL Support**: Full right-to-left layout support

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Complete design system reference
- **[SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md)** - SEO implementation guide
- **[MAILGUN_INTEGRATION.md](MAILGUN_INTEGRATION.md)** - Mailgun integration guide
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Production readiness checklist

## ✅ Production Status

### Build Status
- ✅ Build succeeds without errors
- ✅ All translation keys validated (500 keys in both languages)
- ✅ Bundle size optimized (~82KB gzipped main bundle)
- ✅ All routes configured and working

### Code Quality
- ✅ No console.log statements in production code
- ✅ All external links have `rel="noopener noreferrer"`
- ✅ All images have alt text
- ✅ Proper semantic HTML structure

### SEO
- ✅ Dynamic meta tags per page
- ✅ Open Graph and Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Canonical URLs and hreflang tags

### Accessibility
- ✅ WCAG AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ RTL/LTR support

## 🚧 Development Notes

### RTL/LTR Considerations

- ✅ Use logical properties: `start`/`end` instead of `left`/`right`
- ✅ Test both RTL and LTR layouts thoroughly
- ✅ Use `dir="ltr"` for phone numbers and emails
- ✅ Icons and chevrons are RTL-aware

### Vue I18n Special Characters

When using `@` symbols in translation strings, escape them with `{'@'}`:

```json
{
  "email": "support{'@'}labas.ly"
}
```

### Performance & Images

- ✅ Images are lazy-loaded with `loading="lazy"` (below fold)
- ✅ Hero images use `loading="eager"`
- ✅ Code splitting via dynamic imports
- ✅ Optimized build output

**Recommended:** Convert images to WebP format for 80-90% size reduction.

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL support tested on Arabic-locale browsers

## 🐛 Known Issues

- Some style warnings for gradient classes (cosmetic only, non-blocking)

## 📝 Scripts

```bash
# Development server
npm run dev

# Build for production (validates translations first)
npm run build

# Preview production build
npm run preview

# Validate translations only
npm run validate:i18n
```

## 📞 Contact

**Labas Health Services Company**  
📍 Forth Ring Road, Benghazi, Libya  
📧 support@labas.ly  
📱 +218 91-057 9911

**Developer Contact:**  
📧 salah@labas.ly  
📱 +218 91-376 0133

## 📄 License

© 2025 لا باس (Labas) - All rights reserved  
Owned and operated by **Egate Company For Information Technology**

---

<div align="center">
  <strong>Built with ❤️ in Benghazi, Libya 🇱🇾</strong>
</div>
