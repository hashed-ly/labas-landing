# لا باس (Labas) — Landing Page Copy + Component Guide

_(Vue 3 + Tailwind CSS + Flowbite-Vue · Arabic default · English translation)_

---

## 🏠 Section 1 — Hero

**Component suggestions:**

- `<Navbar>` from **Flowbite-Vue** (logo + language toggle)
- `<Hero>` custom layout using `<Container>`, `<Button>`, `<Image>`

### Arabic (RTL default)

**العنوان:**  
لابَس — رعايتك الصحية في تطبيقٍ واحد

**النص الفرعي:**  
احجز مواعيدك، تواصل مع الأطباء، واطّلع على تقاريرك الطبية بسهولة وأمان.

**الأزرار:**

- تحميل التطبيق `<Button color="primary">`
- لوحة التحكم للمؤسسات `<Button color="secondary" outline>`

### English

**Headline:** Labas — Your health, organized.  
**Subheadline:** Book appointments, message doctors, and access reports securely — all in one app.

**Design notes:**

- Background gradient `linear-gradient(135deg,#0B3954,#087E8B)`
- Right-aligned text (Arabic) / Left for English
- Left column: phone mockup (image from Screenly.dev)
- Accent dots in `#EBC042`
- Primary button `bg-primary hover:bg-secondary`

---

## 👤 Section 2 — Features for Individuals

**Component suggestions:**

- `<Grid>` (Flowbite columns)
- `<Card>` for each feature with `<Icon>` + title + text

### Arabic

**العنوان:** صحتك… في متناول يدك

| الميزة                       | الوصف                                             |
| ---------------------------- | ------------------------------------------------- |
| **حجز المواعيد بسهولة**      | اختر الطبيب والمكان والوقت المناسب لك خلال ثوانٍ. |
| **نتائجك الطبية دائمًا معك** | تصفح التحاليل والتقارير متى شئت.                  |
| **تواصل فوري وآمن**          | دردش مباشرة مع الأطباء والمراكز الطبية بثقة.      |
| **ملف صحي واحد لك**          | احفظ وشارك بياناتك الطبية بأمان وسهولة.           |

### English

**Title:** Your health, simplified.

| Feature                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| **Easy Appointments**     | Schedule with doctors and clinics in seconds. |
| **Access Your Results**   | Review tests and medical reports anytime.     |
| **Secure Messaging**      | Chat directly and safely with providers.      |
| **Unified Health Record** | Store and share your health data securely.    |

**Design notes:**

- 2×2 grid, RTL mirrored.
- Card `bg-bg rounded-base shadow-soft p-6 hover:shadow-lg`.
- Icons in accent yellow `#EBC042`.
- Spacing `gap-8 py-16`.

---

## 🏥 Section 3 — Features for Organizations

**Component suggestions:**

- `<Section>` dark mode block
- `<Grid>` with text + image
- `<Card>` for each feature

### Arabic

**العنوان:** إدارة ذكية لعيادتك أو مستشفاك

| الميزة                  | الوصف                                          |
| ----------------------- | ---------------------------------------------- |
| **لوحة تحكم مركزية**    | إدارة ومتابعة الحجوزات في مكانٍ واحد.          |
| **جدولة ذكية**          | تنظيم المواعيد تلقائيًا لتقليل أوقات الانتظار. |
| **عرض شامل للتقويم**    | رؤية كل المواعيد القادمة بسهولة.               |
| **إدارة مرنة للمواعيد** | تعديل أو إلغاء أو إعادة جدولة بضغطة زر.        |

### English

**Title:** Smart tools for smarter care.

| Feature                 | Description                            |
| ----------------------- | -------------------------------------- |
| **Central Dashboard**   | Manage all bookings from one place.    |
| **Smart Scheduling**    | Optimize doctors’ time automatically.  |
| **Unified Calendar**    | View all upcoming appointments easily. |
| **Flexible Management** | Edit or cancel appointments instantly. |

**Design notes:**

- Background `bg-primary text-white`.
- Split grid: text (right RTL) · dashboard image (left).
- Use mockup from Smartmockups (browser frame).

---

## 🔒 Section 4 — Security & Privacy

**Component suggestions:**

- `<Card>` centered with `<IconLock>`
- `<Container>` max-w-3xl

### Arabic

**العنوان:** بياناتك الصحية بأمانٍ تام  
**النص:** نستخدم أحدث تقنيات التشفير لحماية معلوماتك الطبية. بياناتك ملكك وحدك، ولا تُشارك إلا بموافقتك.

### English

**Title:** Your data. Safe and private.  
**Text:** We use state-of-the-art encryption to protect your medical information. Your data is yours alone.

**Design notes:**

- Background `bg-secondary/10`.
- Lock icon teal `text-secondary size-10`.
- Padding `py-24`.

---

## 🧬 Section 5 — About Labas

**Component suggestions:**

- `<Grid cols-2>` responsive
- `<Image>` (optional map or illustration)
- `<Text>` block

### Arabic

**العنوان:** من بنغازي إلى كل ليبيا  
**النص:** تأسس تطبيق لا باس عام 2024 في مدينة بنغازي، برؤيةٍ تهدف إلى تسهيل الوصول إلى الرعاية الصحية وربط المرضى بالأطباء والمختبرات في تجربة رقمية سلسة وآمنة.

### English

**Title:** From Benghazi to all of Libya.  
**Text:** Founded in 2024 in Benghazi, Labas aims to make healthcare simpler and more connected for everyone.

**Design notes:**

- Background `bg-bg`.
- Centered content with 60 px vertical padding.

---

## 📲 Section 6 — Call to Action (Download)

**Component suggestions:**

- `<CTASection>` custom component
- `<ButtonGroup>` with store links
- `<Image>` for store badges

### Arabic

**النص:** ابدأ رحلتك الصحية مع لا باس اليوم  
**الأزرار:** App Store · Google Play

### English

**Text:** Start your health journey with Labas today.  
**Buttons:** Download on App Store · Get it on Google Play

**Design notes:**

- Background gradient `from-secondary to-primary`.
- White text, centered.
- QR code optional next to buttons.
- Use Flowbite-Vue `Button` with `size="lg"`.

---

## ⚙️ Section 7 — Footer

**Component suggestions:**

- `<Footer>` from Flowbite-Vue
- `<Footer.LinkGroup>` for navigation
- `<Icon>` for social links

### Arabic

عن لا باس · الخصوصية · الشروط · تواصل معنا  
بـنغازي – ليبيا  
© 2024 لا باس – جميع الحقوق محفوظة  
العربية · English

### English

About · Privacy · Terms · Contact  
Benghazi – Libya  
© 2024 Labas – All rights reserved  
Arabic · English

**Design notes:**

- Background `bg-primary text-bg`.
- Logo mark left (RTL → right).
- Icons from Lucide or Phosphor pack.

---

## 🎨 Brand Tokens (Quick Reference)

| Token          | Value                         | Purpose            |
| -------------- | ----------------------------- | ------------------ |
| `primary`      | `#0B3954`                     | Main brand blue    |
| `secondary`    | `#087E8B`                     | Accent teal        |
| `accent`       | `#EBC042`                     | Highlight yellow   |
| `danger`       | `#D1444E`                     | Alert red          |
| `bg`           | `#F6F8FA`                     | Neutral background |
| `text`         | `#1E1E1E`                     | Primary text       |
| `font-arabic`  | `"Noto Kufi Arabic"`          | RTL default font   |
| `font-english` | `"Urbanist"`                  | English font       |
| `radius-base`  | `0.75rem`                     | Rounded corners    |
| `shadow-soft`  | `0 4px 12px rgba(0,0,0,0.05)` | Card shadow        |

---

## 🧰 Asset Sources

| Type              | Source                                                                                                        | Notes                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Phone Mockups     | [Screenly.dev](https://screenly.dev) / [Mockuphone.com](https://mockuphone.com)                               | Transparent iOS / Android frames |
| Dashboard Mockups | [Smartmockups.com](https://smartmockups.com)                                                                  | Browser / Laptop views           |
| Illustrations     | [Storyset.com/health](https://storyset.com/health) / [Popsy.co/illustrations](https://popsy.co/illustrations) | Customizable colors              |
| Icons             | [Lucide.dev](https://lucide.dev) / [Phosphoricons.com](https://phosphoricons.com)                             | Consistent stroke weight         |

---

**Implementation Tip:**  
Each section can live as a Vue component under `/components/landing/`, e.g.:
Hero.vue
FeaturesUsers.vue
FeaturesOrgs.vue
Security.vue
About.vue
CTA.vue
Footer.vue

Then import them sequentially into `LandingPage.vue`.

---

**Last updated:** Nov 2025  
**Prepared for:** لا باس (Labas) Landing Page — Vue 3 + Tailwind + Flowbite RTL Implementation
