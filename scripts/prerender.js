#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog routes to prerender
const routes = [
  '/blog',
  '/blog/claude-code-openrouter-guide',
  '/blog/password-management-guide'
];

const DIST_DIR = path.join(__dirname, '..', 'dist');

async function startServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn('npm', ['run', 'preview', '--', '--host', '--port', '4173'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });

    serverProcess.stdout.on('data', (data) => {
      console.log(`Server: ${data}`);
      if (data.toString().includes('Local:')) {
        resolve(serverProcess);
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });

    serverProcess.on('error', reject);
  });
}

async function prerenderPages(serverProcess) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    for (const route of routes) {
      try {
        console.log(`\n🖥️  Prerendering: ${route}`);

        // Navigate to the route
        await page.goto(`http://localhost:4173${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Wait a bit more for React Helmet to update meta tags
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get the rendered HTML
        const html = await page.content();

        // Create directory if it doesn't exist
        let outputPath;
        if (route === '/blog') {
          // Blog listing page
          outputPath = path.join(DIST_DIR, 'blog', 'index.html');
        } else {
          // Individual blog post
          outputPath = path.join(DIST_DIR, 'blog', route.split('/').pop(), 'index.html');
        }

        await mkdir(path.dirname(outputPath), { recursive: true });

        // Write the prerendered HTML
        await writeFile(outputPath, html);
        console.log(`✅ Generated: ${outputPath.replace(DIST_DIR, '')}`);

      } catch (error) {
        console.error(`❌ Error prerendering ${route}:`, error.message);
      }
    }

  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting prerendering process...\n');

  let serverProcess;

  try {
    // Start the preview server
    console.log('📦 Building the app...');
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });

    await new Promise((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Build failed with code ${code}`));
      });
    });

    console.log('\n🌐 Starting preview server...');
    serverProcess = await startServer();

    // Wait a bit for server to be fully ready
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Prerender the pages
    await prerenderPages(serverProcess);

    console.log('\n✅ Prerendering completed successfully!');
    console.log('\n📄 Generated static HTML files:');
    for (const route of routes) {
      let filePath;
      if (route === '/blog') {
        filePath = 'blog/index.html';
      } else {
        filePath = `blog/${route.split('/').pop()}/index.html`;
      }
      console.log(`   - ${filePath}`);
    }

  } catch (error) {
    console.error('\n❌ Prerendering failed:', error.message);
    process.exit(1);
  } finally {
    // Cleanup
    if (serverProcess) {
      console.log('\n🛑 Stopping server...');
      serverProcess.kill();
    }
  }
}

main();
