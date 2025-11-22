# SEO Implementation Guide

## ✅ Current SEO Status

### Static Meta Tags (index.html)
- ✅ Meta description
- ✅ Meta keywords
- ✅ Robots meta tag
- ✅ Theme color
- ✅ Canonical URL
- ✅ Hreflang tags (ar/en)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Organization schema)

### Dynamic Meta Tags (Per Route)
- ✅ Home page - Dynamic title and description
- ✅ App page - Dynamic title and description
- ✅ Dashboard page - Dynamic title and description
- ✅ Contact page - Will use defaults
- ✅ All other pages - Will use defaults

## 🔧 Implementation

### useSEO Composable
Created `src/composables/useSEO.js` that dynamically updates:
- Document title
- Meta description
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Hreflang tags

### Usage in Pages
Each main page component uses the composable:

```javascript
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';
import { useI18n } from '../../composables/useI18n';

const { updateMetaTags } = useSEO();
const { t, locale } = useI18n();

onMounted(() => {
  updateMetaTags({
    title: 'Page Title',
    description: 'Page description',
    image: 'https://labas.ly/image.jpg' // optional
  });
});
```

## 📋 SEO Checklist

### Technical SEO
- [x] Valid HTML5 structure
- [x] Semantic HTML elements
- [x] Proper heading hierarchy (h1, h2, h3)
- [x] Alt text on all images
- [x] Descriptive link text
- [x] Mobile-responsive design
- [x] Fast page load times
- [x] Clean URL structure
- [x] Canonical URLs
- [x] Hreflang tags for bilingual content

### On-Page SEO
- [x] Unique titles per page
- [x] Unique meta descriptions per page
- [x] Relevant keywords (natural usage)
- [x] Internal linking structure
- [x] Image optimization with alt text

### Structured Data
- [x] Organization schema (JSON-LD)
- [ ] Consider adding: BreadcrumbList, WebSite, LocalBusiness

### Social Media
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Social media image

### International SEO
- [x] Hreflang tags (ar/en)
- [x] Language-specific content
- [x] RTL/LTR support

## 🚀 Recommendations

### Before Launch
1. **Add More Structured Data:**
   - BreadcrumbList schema for navigation
   - WebSite schema with search action
   - LocalBusiness schema (if applicable)

2. **Create Sitemap:**
   - Generate XML sitemap
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools

3. **Create robots.txt:**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://labas.ly/sitemap.xml
   ```

4. **Performance Optimization:**
   - Image optimization (WebP format)
   - Lazy loading for below-fold images
   - Minify CSS/JS (already done by Vite)

5. **Analytics:**
   - Set up Google Analytics 4
   - Set up Google Search Console
   - Monitor Core Web Vitals

### Post-Launch
1. Submit sitemap to search engines
2. Monitor search rankings
3. Track organic traffic
4. Monitor Core Web Vitals
5. Regular content updates

## 📊 Current Meta Tags Per Page

### Home Page (`/`)
- Title: "لا باس - Labas" / "Labas - لا باس"
- Description: Bilingual description about connecting patients, doctors, and hospitals

### App Page (`/solutions/app`)
- Title: "تطبيق لا باس - مساعدك الصحي الشخصي" / "Labas App - Your Personal Healthcare Assistant"
- Description: About booking appointments, requesting prescriptions, lab tests, etc.

### Dashboard Page (`/solutions/dashboard`)
- Title: "لوحة تحكم لا باس للمؤسسات الطبية" / "Labas Medical Institutions Dashboard"
- Description: About managing appointments, bookings, doctor profiles, etc.

### Contact Page (`/contact`)
- Uses default meta tags from index.html

## 🔗 Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

