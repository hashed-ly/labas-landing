# Splash Screen Documentation

The Labas landing page includes a beautiful animated splash screen that appears on the first visit each session.

## 🎨 Design

- **Background Color**: Secondary brand color (`#087E8B`) with gradients
- **Logo**: Colored icon + white wordmark (`logo-horizontal-cw.svg`)
- **Tagline**: Bilingual tagline using i18n (`splash.tagline`)
- **Duration**: 2.5 seconds (customizable)
- **Animation**: Smooth fade-in with scale effect and pulsing gradients
- **Loading Indicator**: White bouncing dots
- **Scroll Lock**: Page scrolling is disabled while splash is visible

## ⚙️ Configuration

### Change Duration

Edit `/src/App.vue`:

```vue
<SplashScreen
  :duration="2500"  <!-- Change to desired milliseconds -->
  @complete="handleSplashComplete"
/>
```

### Disable Splash Screen

**Option 1:** Comment out in `/src/App.vue`:

```vue
<!-- <SplashScreen
  v-if="showSplash"
  :duration="2500"
  @complete="handleSplashComplete"
/> -->
```

**Option 2:** Disable session check:

```vue
<script setup>
// Remove or comment out this:
// const splashShown = sessionStorage.getItem('labas_splash_shown');
// if (splashShown === 'true') {
//   showSplash.value = false;
//   showContent.value = true;
// }

// Always skip splash:
showSplash.value = false;
showContent.value = true;
</script>
```

## 🔄 Behavior

### First Visit

- Splash screen appears for 2.5 seconds
- Fades out smoothly
- Main content fades in
- Session flag is set

### Subsequent Visits (Same Session)

- Splash screen is skipped
- Content appears immediately
- Persists until browser/tab is closed

### New Session

- Closing tab/browser resets the session
- Splash screen appears again on next visit

## 🧪 Testing

### See Splash Screen Again

**Method 1:** Clear session storage (DevTools)

```javascript
sessionStorage.removeItem('labas_splash_shown');
location.reload();
```

**Method 2:** Open in new incognito/private window

**Method 3:** Close and reopen browser

## 🎯 Customization

### Change Background Color

Edit `/src/components/SplashScreen.vue`:

```vue
<div
  class="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary"
  <!-- Change bg-secondary to bg-white, bg-primary, etc. -->
>
```

### Change Logo

Replace with different logo variant:

```vue
<!-- Current: Colored icon + white wordmark -->
<img
  src="/images/logos/logo-horizontal-cw.svg"
  alt="لا باس - Labas"
  class="h-16 sm:h-20 md:h-24 w-auto"
/>

<!-- Full colored logo -->
<img
  src="/images/logos/logo-horizontal.svg"
  alt="لا باس - Labas"
  class="h-16 sm:h-20 md:h-24 w-auto"
/>

<!-- Full white logo -->
<img
  src="/images/logos/logo-horizontal-white.svg"
  alt="لا باس - Labas"
  class="h-16 sm:h-20 md:h-24 w-auto"
/>
```

### Add Custom Animation

Modify the animation in `<style scoped>`:

```css
@keyframes custom-entrance {
  0% {
    transform: rotate(0deg) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: custom-entrance 1s ease-out forwards;
}
```

### Change Tagline

Edit the translation files to change the tagline:

**`src/locales/ar.json`:**

```json
{
  "splash": {
    "tagline": "نصك العربي الجديد"
  }
}
```

**`src/locales/en.json`:**

```json
{
  "splash": {
    "tagline": "Your new English tagline"
  }
}
```

The component automatically uses the correct translation based on the user's locale.

## 🚀 Performance

### Impact

- **Bundle Size:** +2KB (negligible)
- **Perceived Performance:** Better (masks initial load)
- **Session Storage:** ~50 bytes
- **Scroll Lock:** Prevents background scrolling while visible

### Best Practices

- ✅ Keep duration between 2-3 seconds
- ✅ Use session storage (not localStorage) to show once per session
- ✅ Lock scrolling during splash (implemented ✅)
- ✅ Ensure smooth fade transitions
- ✅ Test on slow connections

## 🎬 Animation Details

### 1. Background Gradients

- Two pulsing circular gradients
- Slow pulse animation (3s)
- Offset timing for visual interest

### 2. Logo Animation

```
0%   : Scale 0.8, opacity 0
50%  : Scale 1.05 (bounce effect)
100% : Scale 1, opacity 1
```

### 3. Tagline

- Fades in after 0.5s delay
- Slides up from below

### 4. Loading Indicator

- Three bouncing dots
- Staggered animation (0s, 0.2s, 0.4s)
- Appears after 0.8s delay

### 5. Fade Out

- Starts at 2s (500ms before end)
- Smooth opacity transition
- Component unmounts at 2.5s

## 📱 Responsive Design

The splash screen is fully responsive:

| Breakpoint | Logo Height | Tagline Size |
| ---------- | ----------- | ------------ |
| Mobile     | 16 (h-16)   | text-lg      |
| Tablet     | 20 (h-20)   | text-xl      |
| Desktop    | 24 (h-24)   | text-xl      |

## ♿ Accessibility

- **High Contrast:** White text on secondary background meets WCAG AA
- **Bilingual:** Uses proper i18n for Arabic and English
- **Scroll Lock:** Background scrolling disabled during splash
- **No Motion Preference:** Consider adding `prefers-reduced-motion` support
- **Keyboard:** No interaction required
- **Screen Readers:** Logo has proper bilingual alt text

### Add Reduced Motion Support

```vue
<script setup>
import { ref, onMounted } from 'vue';

const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Skip splash if user prefers reduced motion
  if (prefersReducedMotion.value) {
    emit('complete');
  }
});
</script>
```

## 🐛 Troubleshooting

### Splash screen doesn't appear

1. Check sessionStorage: `sessionStorage.getItem('labas_splash_shown')`
2. Clear it: `sessionStorage.removeItem('labas_splash_shown')`
3. Verify component is imported in `App.vue`

### Splash screen lasts too long

- Reduce `:duration` prop in `App.vue`
- Minimum recommended: 1500ms (1.5s)
- Maximum recommended: 3000ms (3s)

### Content flashes before splash

- This is handled with `showContent` ref
- Content only renders after 100ms delay
- Ensures splash appears first

### Splash animation is choppy

- Check GPU acceleration in browser
- Reduce number of animated elements
- Test on target devices

## 📚 Related Files

- `/src/components/SplashScreen.vue` - Main component
- `/src/App.vue` - Integration and logic
- `/src/locales/ar.json` - Arabic translations (splash.tagline)
- `/src/locales/en.json` - English translations (splash.tagline)
- `/public/images/logos/logo-horizontal-cw.svg` - Current logo (colored icon + white wordmark)
- `/public/images/logos/logo-horizontal.svg` - Full colored logo (alternative)
- `/public/images/logos/logo-horizontal-white.svg` - Full white logo (alternative)

---

**Questions?** See main [README.md](../README.md) or contact the development team.
