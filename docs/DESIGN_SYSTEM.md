# Labas Design System

Comprehensive design system documentation for the Labas landing page project.

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Transitions](#transitions)
7. [Breakpoints](#breakpoints)
8. [Z-Index Scale](#z-index-scale)
9. [Usage Guidelines](#usage-guidelines)

---

## Colors

### Brand Colors

#### Primary (Navy Blue)

Main brand color - used for primary actions, headers, and emphasis.

```css
--color-primary: #0b3954;
```

**Shades:**

- 50: `#E6EEF2` - Lightest background tint
- 100-400: Progressive darkening
- 500: `#0B3954` - Base primary color
- 600-900: Darker shades for emphasis

**Usage:**

- Primary buttons
- Main navigation
- Key headings
- Links

#### Secondary (Teal)

Secondary brand color - used for accents and interactive elements.

```css
--color-secondary: #087e8b;
```

**Usage:**

- Secondary buttons
- Icons
- Interactive hover states
- Accent elements

#### Accent (Gold/Yellow)

Highlight color for important elements and calls-to-action.

```css
--color-accent: #ebc042;
```

**Usage:**

- Badges
- Highlights
- Warning indicators
- Special callouts

### Semantic Colors

#### Success (`#10B981`)

Used for positive actions, confirmations, and success states.

#### Warning (`#F59E0B`)

Used for warnings and cautionary messages.

#### Danger (`#D1444E`)

Used for errors, destructive actions, and critical alerts.

### Neutral Colors

#### Gray Scale

Full gray palette from 50-900 for text, borders, and backgrounds.

```css
--color-gray-50: #f9fafb /* Lightest */ --color-gray-500: #6b7280 /* Mid-tone */
  --color-gray-900: #111827 /* Darkest */;
```

**Usage:**

- Text: 700-900 for primary text, 500-600 for secondary text
- Borders: 200-300
- Backgrounds: 50-100

---

## Typography

### Font Families

```css
--font-family-arabic:
  'Noto Kufi Arabic', sans-serif --font-family-english: 'Urbanist',
  sans-serif --font-family-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
```

**RTL Support:**

- Arabic content automatically uses Noto Kufi Arabic
- English content uses Urbanist
- Mono for code blocks

### Font Sizes

| Size    | Value    | Pixels   | Usage                |
| ------- | -------- | -------- | -------------------- |
| xs      | 0.75rem  | 12px     | Fine print, captions |
| sm      | 0.875rem | 14px     | Small text, labels   |
| base    | 1rem     | 16px     | Body text            |
| lg      | 1.125rem | 18px     | Large body text      |
| xl      | 1.25rem  | 20px     | Subheadings          |
| 2xl     | 1.5rem   | 24px     | H4                   |
| 3xl     | 1.875rem | 30px     | H3                   |
| 4xl     | 2.25rem  | 36px     | H2                   |
| 5xl     | 3rem     | 48px     | H1                   |
| 6xl-9xl | -        | 60-128px | Hero titles          |

### Font Weights

- **Normal (400)**: Body text
- **Medium (500)**: Emphasis
- **Semibold (600)**: Subheadings
- **Bold (700)**: Headings, buttons

### Line Heights

- **tight (1.25)**: Headlines
- **normal (1.5)**: Body text
- **relaxed (1.625)**: Long-form content

---

## Spacing

**Base unit:** 4px (0.25rem)

### Spacing Scale

| Token | Value   | Pixels | Common Usage     |
| ----- | ------- | ------ | ---------------- |
| 1     | 0.25rem | 4px    | Tight spacing    |
| 2     | 0.5rem  | 8px    | Small gaps       |
| 3     | 0.75rem | 12px   | Default spacing  |
| 4     | 1rem    | 16px   | Standard spacing |
| 6     | 1.5rem  | 24px   | Medium spacing   |
| 8     | 2rem    | 32px   | Large spacing    |
| 12    | 3rem    | 48px   | Section padding  |
| 16    | 4rem    | 64px   | Large sections   |
| 24    | 6rem    | 96px   | Hero sections    |
| 32    | 8rem    | 128px  | Major sections   |

**Usage Guidelines:**

- Use multiples of 4px for consistency
- Component padding: 4, 6, or 8
- Section spacing: 12, 16, or 24
- Hero sections: 24, 32

---

## Border Radius

| Size    | Value          | Usage                 |
| ------- | -------------- | --------------------- |
| sm      | 0.125rem (2px) | Tight radius          |
| DEFAULT | 0.25rem (4px)  | Badges, small buttons |
| md      | 0.375rem (6px) | Inputs                |
| lg      | 0.5rem (8px)   | Buttons               |
| xl      | 0.75rem (12px) | Cards                 |
| 2xl     | 1rem (16px)    | Large cards           |
| 3xl     | 1.5rem (24px)  | Featured sections     |
| full    | 9999px         | Circular elements     |

**Guidelines:**

- Buttons: lg
- Cards: xl or 2xl
- Input fields: md or lg
- Avatar/pills: full

---

## Shadows

### Standard Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05) --shadow: 0 1px 3px 0
  rgba(0, 0, 0, 0.1) --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1) --shadow-xl: 0 20px 25px -5px
  rgba(0, 0, 0, 0.1) --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Custom Shadows

```css
--shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.05) /* Soft, subtle shadow */
  --shadow-glow: 0 0 20px rgba(8, 126, 139, 0.3) /* Secondary color glow */;
```

**Usage:**

- Cards at rest: shadow or shadow-soft
- Cards on hover: shadow-md or shadow-lg
- Modals/overlays: shadow-xl or shadow-2xl
- Dropdown menus: shadow-lg
- Floating buttons: shadow-glow (for emphasis)

---

## Transitions

### Durations

```css
--transition-duration-75: 75ms /* Instant feedback */
  --transition-duration-150: 150ms /* Quick transitions */
  --transition-duration-200: 200ms /* Standard */
  --transition-duration-300: 300ms /* Smooth */ --transition-duration-500: 500ms
  /* Slow */;
```

### Easing Functions

```css
--ease-linear: linear --ease-in: cubic-bezier(0.4, 0, 1, 1)
  --ease-out: cubic-bezier(0, 0, 0.2, 1)
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Guidelines:**

- Hover effects: 150ms ease-out
- Color changes: 200ms ease-smooth
- Transform animations: 300ms ease-out
- Page transitions: 500ms ease-in-out

---

## Breakpoints

```css
--breakpoint-sm: 640px /* Mobile landscape */ --breakpoint-md: 768px
  /* Tablet portrait */ --breakpoint-lg: 1024px
  /* Tablet landscape / Small desktop */ --breakpoint-xl: 1280px /* Desktop */
  --breakpoint-2xl: 1536px /* Large desktop */;
```

**Mobile-First Approach:**

```css
/* Base styles for mobile */
.element { ... }

/* Tablet and up */
@media (min-width: 768px) { ... }

/* Desktop and up */
@media (min-width: 1024px) { ... }
```

---

## Z-Index Scale

**Semantic z-index values for proper layering:**

```css
--z-dropdown: 1000 --z-sticky: 1020 --z-fixed: 1030 --z-modal-backdrop: 1040
  --z-modal: 1050 --z-popover: 1060 --z-tooltip: 1070;
```

**Usage:**

- Regular content: 0-50
- Sticky headers: 1020
- Dropdown menus: 1000
- Modals: 1050
- Tooltips (highest): 1070

---

## Usage Guidelines

### Color Combinations

#### Primary with Accent

```css
background: var(--color-primary);
color: var(--color-white);
border: 2px solid var(--color-accent);
```

#### Secondary with Background

```css
background: var(--color-secondary-50);
color: var(--color-secondary-700);
```

### Component Examples

#### Button (Primary)

```vue
<button
  class="
  px-6 py-3 
  bg-secondary text-white 
  rounded-lg 
  shadow-md hover:shadow-lg 
  transition-all duration-200
  font-medium
"
>
  Button Text
</button>
```

#### Card

```vue
<div
  class="
  p-6 
  bg-white 
  rounded-2xl 
  shadow-soft hover:shadow-lg 
  transition-shadow duration-300
"
>
  Card Content
</div>
```

#### Input Field

```vue
<input
  class="
  w-full 
  px-4 py-3 
  border border-gray-300 
  rounded-lg 
  focus:border-primary focus:ring-2 focus:ring-primary/20 
  transition-all duration-200
"
/>
```

### Accessibility

1. **Color Contrast:**
   - Text on primary: Use white or light colors
   - Text on light backgrounds: Use gray-700 or darker
   - Minimum contrast ratio: 4.5:1 for body text

2. **Focus States:**
   - Always include visible focus indicators
   - Use `focus:ring-2 ring-primary/20` for outlines

3. **Interactive Elements:**
   - Minimum touch target: 44x44px
   - Hover states should be obvious
   - Active/pressed states for buttons

### RTL Support

- Use logical properties: `start/end` instead of `left/right`
- Test all layouts in both LTR and RTL modes
- Icons may need mirroring in RTL

### Performance

- Use CSS variables for runtime theming
- Prefer `transition` over `animation` for simple effects
- Minimize box-shadow usage on complex layouts

---

## Token Access

### In Vue Components

```javascript
import { tokens } from '@/tokens';

// Access color
const primaryColor = tokens.color.primary.DEFAULT;

// Access spacing
const largePadding = tokens.spacing[8];
```

### In CSS (Tailwind v4)

```css
/* Direct usage */
.my-element {
  color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}

/* Or use Tailwind classes */
<div class="bg-primary text-white p-4 rounded-lg">
```

---

## Maintenance

When updating design tokens:

1. Update `src/tokens.js` first
2. Regenerate `src/style.css` @theme values
3. Update this documentation
4. Test across all components
5. Document any breaking changes

---

## Version

Last updated: November 2025
Version: 2.0.0
