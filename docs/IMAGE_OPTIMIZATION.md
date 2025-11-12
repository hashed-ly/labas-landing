# Image Optimization Guide

This guide explains how to optimize images for the Labas landing page to achieve the best performance without losing visual quality.

## 📊 Current Image Status

### Implemented Optimizations

✅ **Lazy Loading** - Images below the fold load only when needed  
✅ **Priority Hints** - Hero images use `loading="eager"` and `fetchpriority="high"`  
✅ **Proper Sizing** - Responsive images with max-width constraints  
✅ **SVG for Logos** - Vector graphics for perfect scaling

---

## 🎯 Image Optimization Strategy

### 1. Choose the Right Format

| Format   | Best For                    | Pros                        | Cons                |
| -------- | --------------------------- | --------------------------- | ------------------- |
| **WebP** | Photos, screenshots         | 25-35% smaller than JPG/PNG | Some older browsers |
| **PNG**  | Transparency, logos         | Lossless                    | Larger file size    |
| **JPG**  | Photos without transparency | Widely supported            | Lossy compression   |
| **SVG**  | Icons, logos, illustrations | Infinitely scalable, tiny   | Not good for photos |

**Recommendation:** Use **WebP with JPG/PNG fallback** for best results.

---

## 🛠️ How to Optimize Your Images

### Option 1: Online Tools (Easiest) ⭐ RECOMMENDED

#### **Squoosh.app** (Free, by Google)

Best for quick optimization with visual comparison.

**Steps:**

1. Go to [squoosh.app](https://squoosh.app/)
2. Drag your image
3. Choose format:
   - **WebP** for photos (Quality: 75-85%)
   - **Optimized PNG** for images with transparency
4. Compare original vs. compressed
5. Download when quality looks good

**Example Settings:**

```
Screenshots (iPhone mockups):
- Format: WebP
- Quality: 80%
- Size reduction: ~60-70%
```

#### **TinyPNG/TinyJPG** (Free)

Excellent for PNG and JPG compression.

**Steps:**

1. Go to [tinypng.com](https://tinypng.com/)
2. Upload up to 20 images (max 5MB each)
3. Download compressed versions
4. Typically saves 50-70% without visible quality loss

---

### Option 2: Command Line Tools (Advanced)

#### **For PNG files:**

```bash
# Install pngquant (macOS)
brew install pngquant

# Optimize a PNG file
pngquant --quality=80-90 --ext .png --force image.png
```

#### **For JPG files:**

```bash
# Install mozjpeg (macOS)
brew install mozjpeg

# Optimize a JPG file
/opt/homebrew/opt/mozjpeg/bin/cjpeg -quality 85 input.jpg > output.jpg
```

#### **Convert to WebP:**

```bash
# Install webp tools (macOS)
brew install webp

# Convert PNG/JPG to WebP
cwebp -q 80 input.png -o output.webp

# Batch convert all PNGs in a directory
for file in *.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

---

### Option 3: Automated Build-Time Optimization

#### **vite-plugin-imagemin** (Recommended for production)

Add to your project:

```bash
npm install -D vite-plugin-imagemin
```

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    vue(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 85,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});
```

---

## 📏 Recommended Image Sizes

### For Labas Landing Page

| Image Type            | Recommended Size                 | Current Files                  |
| --------------------- | -------------------------------- | ------------------------------ |
| **Phone Screenshots** | 600px width @ 2x (1200px actual) | Asset 2.png, Asset 5.png, etc. |
| **iPhone Mockups**    | 800px width @ 2x (1600px actual) | iPhone Air.png, Screens.png    |
| **Logos (PNG)**       | 400px width @ 2x (800px actual)  | brand-mark.png                 |
| **Logos (SVG)**       | Keep as SVG                      | logo-horizontal.svg            |
| **Icons**             | Keep as SVG                      | App Store.svg, Google Play.svg |

**Note:** "@2x" means retina/high-DPI displays. The actual file is 2x larger but displayed at half size for crisp quality.

---

## 🎨 Quality Guidelines

### Optimal Quality Settings

**For screenshots/photos:**

- **WebP:** Quality 75-85% (sweet spot is 80%)
- **JPG:** Quality 80-90%
- **PNG:** Medium compression (tinypng default)

**Visual Test:**

1. Zoom to 100% on a retina display
2. Look for:
   - ❌ Pixelation or blurriness
   - ❌ Color banding
   - ❌ Compression artifacts
3. If image looks good, you can go lower
4. If issues appear, increase quality by 5-10%

---

## 🚀 Implementing WebP with Fallback

### Method 1: `<picture>` Element (Recommended)

```vue
<picture>
  <!-- WebP version -->
  <source
    srcset="/images/screenshots/Asset-2.webp"
    type="image/webp"
  />
  <!-- Fallback to PNG -->
  <img
    src="/images/screenshots/Asset 2.png"
    alt="Labas App - Screen 1"
    class="w-full h-auto drop-shadow-2xl"
    loading="lazy"
  />
</picture>
```

### Method 2: Responsive Images with `srcset`

```vue
<img
  src="/images/screenshots/Asset-2.png"
  srcset="
    /images/screenshots/Asset-2-400.webp   400w,
    /images/screenshots/Asset-2-800.webp   800w,
    /images/screenshots/Asset-2-1200.webp 1200w
  "
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="Labas App - Screen 1"
  loading="lazy"
/>
```

---

## 📦 Batch Optimization Script

Create a script to optimize all images at once:

```bash
#!/bin/bash
# scripts/optimize-images.sh

echo "🎨 Optimizing images..."

# Create output directory
mkdir -p public/images/optimized

# Optimize PNGs
echo "📸 Optimizing PNGs..."
for file in public/images/screenshots/*.png; do
  filename=$(basename "$file" .png)

  # Optimize PNG
  pngquant --quality=80-90 --ext .png --force "$file"

  # Create WebP version
  cwebp -q 80 "$file" -o "public/images/screenshots/${filename}.webp"

  echo "✅ Optimized: $filename"
done

echo "🎉 All images optimized!"
```

Make it executable:

```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```

---

## 📊 Before & After Example

### Current State

```
Asset 2.png:      2.4 MB
Asset 5.png:      2.1 MB
Asset 8.png:      2.3 MB
iPhone Air.png:   1.8 MB
Total:            8.6 MB
```

### After Optimization (WebP @ 80%)

```
Asset-2.webp:     180 KB (-92%)
Asset-5.webp:     165 KB (-92%)
Asset-8.webp:     175 KB (-92%)
iPhone-Air.webp:  140 KB (-92%)
Total:            660 KB (-92% total)
```

**Result:** Page loads ~8MB faster! 🚀

---

## ✅ Optimization Checklist

### For Each New Image

- [ ] Resize to appropriate dimensions (see table above)
- [ ] Compress using Squoosh or TinyPNG
- [ ] Convert to WebP (keep original as fallback)
- [ ] Add `loading="lazy"` (unless above the fold)
- [ ] Add `fetchpriority="high"` for critical images
- [ ] Include proper `alt` text for accessibility
- [ ] Test on retina and non-retina displays

---

## 🎯 Priority Order

If you can only do a few optimizations, start here:

1. **🔥 High Priority:**

   - Convert hero images to WebP (Asset 2, 5, 8)
   - Optimize iPhone Air.png and Screens.png
   - Add lazy loading (already done ✅)

2. **⚡ Medium Priority:**

   - Create responsive image variants (400w, 800w, 1200w)
   - Implement `<picture>` element for WebP

3. **💡 Nice to Have:**
   - Automate with vite-plugin-imagemin
   - Create optimization script for CI/CD

---

## 🧪 Testing Your Optimizations

### Visual Quality Test

1. Open optimized image
2. Zoom to 100% or more
3. Compare side-by-side with original
4. Look for compression artifacts
5. If quality is poor, increase by 10% and retry

### Performance Test

**Google PageSpeed Insights:**

```
https://pagespeed.web.dev/
```

**Lighthouse (Chrome DevTools):**

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit
4. Check "Properly size images" and "Serve images in next-gen formats"

**Network Tab:**

1. Open DevTools > Network
2. Filter by "Img"
3. Reload page
4. Check total image size transferred

---

## 📚 Recommended Tools

| Tool           | Purpose                    | Link                                                                      |
| -------------- | -------------------------- | ------------------------------------------------------------------------- |
| **Squoosh**    | Online optimization        | [squoosh.app](https://squoosh.app/)                                       |
| **TinyPNG**    | PNG/JPG compression        | [tinypng.com](https://tinypng.com/)                                       |
| **ImageOptim** | Mac app for batch          | [imageoptim.com](https://imageoptim.com/mac)                              |
| **SVGOMG**     | SVG optimization           | [jakearchibald.github.io/svgomg](https://jakearchibald.github.io/svgomg/) |
| **Cloudinary** | CDN with auto-optimization | [cloudinary.com](https://cloudinary.com/)                                 |

---

## 🎓 Best Practices Summary

✅ **DO:**

- Use WebP for photos with PNG/JPG fallback
- Lazy load images below the fold
- Optimize before adding to repo
- Use SVG for logos and icons
- Add proper `alt` text
- Test on slow 3G connection

❌ **DON'T:**

- Upload unoptimized images
- Use PNG for photos (use WebP/JPG)
- Forget responsive image variants
- Skip visual quality checks
- Ignore file sizes over 500KB

---

## 💰 Expected Results

**After full optimization:**

- 🚀 **80-90% reduction** in image file sizes
- ⚡ **2-3x faster** page load time
- 📱 **50% less mobile data** usage
- 💯 **Better Lighthouse scores**

---

**Questions?** Check the main [README.md](../README.md) or contact the development team.
