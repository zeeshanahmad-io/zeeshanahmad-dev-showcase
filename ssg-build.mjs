import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';

// Import page components
import BlogPage from './src/pages/Blog.tsx';
import BlogPostPage from './src/pages/BlogPost.tsx';
import IndexPage from './src/pages/Index.tsx';
import { getAllPosts } from './src/utils/blogUtils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

async function renderPage(url, Component, props, template) {
  const helmetContext = {};

  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <Component {...props} />
      </HelmetProvider>
    </StaticRouter>
  );

  const { helmet } = helmetContext;

  // Replace placeholders and inject rendered content
  const finalHtml = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(
      '<!--helmet-injection-->',
      `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
    );
  
  return finalHtml;
}

async function main() {
  // Read the template, but first add a placeholder for helmet injection
  let template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
  template = template.replace('</head>', '<!--helmet-injection--></head>');

  const allPosts = await getAllPosts();

  console.log('Starting SSG build...');

  // --- Render Blog Post Pages ---
  for (const post of allPosts) {
    const url = `/blog/${post.slug}`;
    console.log(`Rendering: ${url}`);
    const html = await renderPage(url, BlogPostPage, { initialPost: post }, template);
    
    const dirPath = path.join(distPath, 'blog', post.slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  }

  // --- Render Blog Index Page ---
  const blogIndexUrl = '/blog';
  console.log(`Rendering: ${blogIndexUrl}`);
  const blogIndexHtml = await renderPage(blogIndexUrl, BlogPage, {}, template);
  const blogDir = path.join(distPath, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml);

  // --- Render Home Page ---
  const homeUrl = '/';
  console.log(`Rendering: ${homeUrl}`);
  const homeHtml = await renderPage(homeUrl, IndexPage, {}, template);
  fs.writeFileSync(path.join(distPath, 'index.html'), homeHtml);

  console.log('SSG build complete!');
}

main().catch(err => {
  console.error('SSG build failed:', err);
  process.exit(1);
});