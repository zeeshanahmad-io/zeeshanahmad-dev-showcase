#!/usr/bin/env node

import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'blogs');
const DIST_DIR = path.join(__dirname, '..', 'dist');

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getAssetTags = async () => {
  try {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    const indexHtml = await readFile(indexHtmlPath, 'utf-8');

    // Extract script and link tags
    const scriptTag = indexHtml.match(/<script type="module" crossorigin src="\/assets\/index-[^"]+\.js"><\/script>/)?.[0] || '';
    const styleTag = indexHtml.match(/<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">/)?.[0] || '';

    return { scriptTag, styleTag };
  } catch (error) {
    console.error('Error reading index.html for assets:', error);
    return { scriptTag: '', styleTag: '' };
  }
};

const generateBlogIndexHTML = (assetTags) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | Zeeshan Ahmad - Tech Insights & Innovations</title>
  <meta name="description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems.">
  <meta name="keywords" content="blog, tech insights, AI, software development, full-stack, enterprise solutions">
  <meta property="og:title" content="Blog | Zeeshan Ahmad">
  <meta property="og:description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://zeeshanahmad.dev/blog">
  <meta property="og:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog | Zeeshan Ahmad - Tech Insights & Innovations">
  <meta name="twitter:description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems.">
  <meta name="twitter:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg">
  <link rel="canonical" href="https://zeeshanahmad.dev/blog">
  ${assetTags.scriptTag}
  ${assetTags.styleTag}
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
};

const generateBlogPostHTML = (slug, frontmatter, content, assetTags) => {
  const title = frontmatter.title || 'Blog Post';
  const excerpt = frontmatter.excerpt || 'Read this blog post.';
  const published_date = formatDate(frontmatter.published_date || new Date().toISOString());
  const author = frontmatter.author || 'Zeeshan Ahmad';
  const reading_time = calculateReadingTime(content);
  const tags = frontmatter.tags || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Zeeshan Ahmad Blog</title>
  <meta name="description" content="${excerpt}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://zeeshanahmad.dev/blog/${slug}">
  <meta property="og:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="article:author" content="${author}">
  <meta property="article:published_time" content="${frontmatter.published_date || new Date().toISOString()}">
  ${tags.map(tag => `<meta property="article:tag" content="${tag}">`).join('\n  ')}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${excerpt}">
  <meta name="twitter:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg">
  <link rel="canonical" href="https://zeeshanahmad.dev/blog/${slug}">
  ${assetTags.scriptTag}
  ${assetTags.styleTag}
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
};

async function generateStaticFiles() {
  console.log('🔄 Generating static HTML files for blog...\n');

  // Get asset tags from index.html
  const assetTags = await getAssetTags();
  if (!assetTags.scriptTag || !assetTags.styleTag) {
    console.warn('⚠️ Warning: Could not find script or style tags in index.html. Generated files might not load correctly.');
  }

  // Generate blog index page
  const blogIndexHTML = generateBlogIndexHTML(assetTags);
  const blogIndexPath = path.join(DIST_DIR, 'blog', 'index.html');
  await mkdir(path.dirname(blogIndexPath), { recursive: true });
  await writeFile(blogIndexPath, blogIndexHTML);
  console.log('✅ Generated: blog/index.html');

  // Generate individual blog post pages
  try {
    const files = await readdir(BLOG_DIR);
    const markdownFiles = files.filter(f => f.endsWith('.md'));

    for (const file of markdownFiles) {
      const slug = file.replace('.md', '');
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = await readFile(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(fileContent);

      const html = generateBlogPostHTML(slug, frontmatter, content, assetTags);
      const outputPath = path.join(DIST_DIR, 'blog', slug, 'index.html');
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html);
      console.log(`✅ Generated: blog/${slug}/index.html`);
    }

    console.log('\n🎉 Static generation completed successfully!');
    console.log('\n📄 Generated static HTML files:');
    console.log('   - blog/index.html (blog listing)');
    for (const file of await readdir(BLOG_DIR)) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        console.log(`   - blog/${slug}/index.html`);
      }
    }

  } catch (error) {
    console.error('\n❌ Error generating static files:', error.message);
    process.exit(1);
  }
}

generateStaticFiles();
