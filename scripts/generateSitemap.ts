import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

const baseUrl = 'https://zeeshanahmad.dev';

// Static pages
const staticPages: SitemapUrl[] = [
    {
        loc: `${baseUrl}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '1.0'
    },
    {
        loc: `${baseUrl}/portfolio`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8'
    },
    {
        loc: `${baseUrl}/blog`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        loc: `${baseUrl}/resume`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
    },
    {
        loc: `${baseUrl}/contact`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
    }
];

// Get blog posts from the blogs directory
function getBlogPosts(): SitemapUrl[] {
    const blogsDir = path.join(__dirname, '../blogs');
    const blogUrls: SitemapUrl[] = [];

    try {
        const files = fs.readdirSync(blogsDir);

        for (const file of files) {
            if (file.endsWith('.mdoc')) {
                const slug = file.replace('.mdoc', '');
                const filePath = path.join(blogsDir, file);
                const stats = fs.statSync(filePath);

                blogUrls.push({
                    loc: `${baseUrl}/blog/${slug}`,
                    lastmod: stats.mtime.toISOString().split('T')[0],
                    changefreq: 'monthly',
                    priority: '0.8'
                });
            }
        }
    } catch (error) {
        console.error('Error reading blog posts:', error);
    }

    return blogUrls;
}

// Generate sitemap XML
function generateSitemap(): string {
    const allUrls = [...staticPages, ...getBlogPosts()];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of allUrls) {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
}

// Write sitemap to public directory
function writeSitemap(): void {
    const sitemap = generateSitemap();
    const outputPath = path.join(__dirname, '../public/sitemap.xml');

    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`📄 Total URLs: ${staticPages.length + getBlogPosts().length}`);
}

writeSitemap();
