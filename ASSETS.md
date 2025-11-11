# Brand Assets Reference

## 📁 Asset Locations

### Source
All brand assets are located in:
```
/Users/sofiangk/Documents/Work/Egate/Labas/
```

### Project Assets
Assets copied to the project:

```
public/
├── images/
│   ├── logos/
│   │   ├── logo-horizontal.svg       # Main logo for light backgrounds
│   │   ├── logo-horizontal-white.svg # White logo for dark backgrounds
│   │   └── logo-stacked.svg          # Stacked version
│   └── screenshots/
│       ├── app-screen-1.jpg          # Hero section screenshot
│       └── app-screen-2.jpg          # Additional screenshot
```

## 🎨 Brand Colors

| Color      | Hex Code  | Usage                    |
| ---------- | --------- | ------------------------ |
| Primary    | `#0B3954` | Main brand blue          |
| Secondary  | `#087E8B` | Accent teal              |
| Accent     | `#EBC042` | Highlight yellow         |
| Danger     | `#D1444E` | Alert/error red          |
| Background | `#F6F8FA` | Neutral background       |
| Text       | `#1E1E1E` | Primary text color       |

### Usage in Code

**Tailwind Classes:**
```html
<div class="bg-primary text-white">...</div>
<button class="bg-accent text-primary">...</button>
<div class="bg-secondary">...</div>
```

**CSS Custom Properties:**
```css
background-color: var(--color-primary);
color: var(--color-accent);
```

## 🖼️ Available Assets in Source

### Logos
- **On White Background**: Horizontal, Stacked, Brand Mark
- **On Dark Blue**: Horizontal, Stacked, Brand Mark
- **On Turquoise**: Horizontal, Stacked, Brand Mark
- **White Versions**: For dark backgrounds

### Screenshots
- **iOS 1242x2688**: 4 screenshots
- **iOS 1320x2868**: 4 screenshots

### Patterns & Shapes
- Turquoise Pattern & Shape (PNG, SVG)
- Yellow Pattern & Shape (PNG, SVG)
- White Pattern & Logo shapes (PNG, SVG)

### Fonts
- **Arabic**: Noto Kufi Arabic (Variable + Static weights)
- **English**: Urbanist (in Fonts/English Font/)

### Printables
- Business Cards (Dark Blue & Turquoise)
- Letterhead & Envelopes
- Rollups & Billboards
- A5 Notebooks

## 📱 App Screenshots

Current screenshots used:
- `L 2.jpg` - Main app interface (Hero section)
- `L 3.jpg` - Additional screen

Available for future use:
- `L 5.jpg`, `L 11.jpg` (1242x2688)
- `LA 2.jpg`, `LA 22.jpg`, `LA 3.jpg`, `LA 4.jpg` (1320x2868)

## 🔤 Typography

### Arabic Font: Noto Kufi Arabic
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Source**: Google Fonts (currently used)
- **Local Files**: Available in `/Users/sofiangk/Documents/Work/Egate/Labas/Fonts/Arabic Font/`

### English Font: Urbanist
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Source**: Google Fonts (currently used)
- **Local Files**: Available in `/Users/sofiangk/Documents/Work/Egate/Labas/Fonts/English Font/`

## 🎯 Adding New Assets

### To add a new logo variation:
```bash
cp "/Users/sofiangk/Documents/Work/Egate/Labas/Logo Variations/[folder]/[file]" public/images/logos/
```

### To add new screenshots:
```bash
cp "/Users/sofiangk/Documents/Work/Egate/Labas/Screenshots IOS/[size]/[file]" public/images/screenshots/
```

### To add patterns:
```bash
mkdir -p public/images/patterns
cp "/Users/sofiangk/Documents/Work/Egate/Labas/Shapes and Patterns/[file]" public/images/patterns/
```

## 📋 Next Steps

1. **Optimize Images**: Consider compressing screenshots for web
2. **Add Patterns**: Use brand patterns as decorative elements
3. **Local Fonts**: Consider self-hosting fonts for better performance
4. **Favicon**: Create and add favicon from brand mark
5. **OG Images**: Create social media preview images using brand assets

## 🔗 Quick Links

- Visual Identity PDF: `LABAS Visual Identity (New).pdf`
- Company Profile: `LABAS COMPANY PROFILE.pdf`
- Editable Files: `LABAS Visual Identity (editable).ai`

