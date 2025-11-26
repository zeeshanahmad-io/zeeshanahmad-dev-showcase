# Image Optimization Guide for Blog Posts

## Overview
This website uses WebP format for all images to achieve 70-80% file size reduction and faster page load times.

## For New Blog Posts

### Option 1: Use the Optimization Script (Recommended)
When you add a new blog post with images:

1. **Add your image** to the appropriate directory:
   ```
   public/images/blogs/your-blog-slug/featured_image.jpg
   ```

2. **Run the optimization script**:
   ```bash
   npx tsx scripts/optimizeImages.ts
   ```

3. **Update your blog frontmatter** to use `.webp`:
   ```yaml
   featured_image: /images/blogs/your-blog-slug/featured_image.webp
   ```

4. **Remove the original** JPG/PNG file (it's backed up in `image-backups/`)

### Option 2: Manual Optimization
If you prefer to optimize manually:

1. Use an online tool like [Squoosh](https://squoosh.app/) or [CloudConvert](https://cloudconvert.com/jpg-to-webp)
2. Set quality to 80-85%
3. Save as `.webp` format
4. Upload directly as WebP

## Image Naming Convention

### Blog Featured Images
- **Location**: `public/images/blogs/[blog-slug]/featured_image.webp`
- **Frontmatter**: `featured_image: /images/blogs/[blog-slug]/featured_image.webp`

### Portfolio/Project Images
- **Location**: `src/assets/[project-name]-preview.webp`
- **Import**: `import projectImg from '@/assets/[project-name]-preview.webp';`

### Logo/Icon Images
- **Location**: `src/assets/icons/[name]-logo.webp`
- **Import**: `import logo from '@/assets/icons/[name]-logo.webp';`

## Current Optimization Results

All existing images have been optimized:
- **Total reduction**: 80.3% (2.52 MB → 0.50 MB)
- **Format**: WebP at 85% quality
- **Browser support**: 97%+ (all modern browsers)

## Backup

All original images are backed up in `image-backups/` directory for safety.

## Troubleshooting

### "Image not loading"
- Check that the path in frontmatter matches the actual file location
- Ensure the file extension is `.webp`
- Verify the file exists in `public/images/blogs/[slug]/`

### "Want to use JPG/PNG instead"
- WebP is recommended for performance
- If needed, you can use JPG/PNG, but file sizes will be 3-5x larger
- The blog system supports both formats

## Tools Used

- **sharp**: Node.js image processing library
- **Quality**: 85% (visually lossless)
- **Effort**: 6 (high compression)

---

**Last Updated**: November 2025
