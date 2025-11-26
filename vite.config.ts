import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import config from './keystatic.config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          'markdown': ['@markdoc/markdoc', 'gray-matter', 'react-syntax-highlighter'],
          'keystatic': ['@keystatic/core']
        }
      }
    },
    // Increase chunk size warning limit (we're handling it with manual chunks)
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    }
  },
  plugins: [
    react(),
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: 'blogs',
          dest: ''
        }
      ]
    }),
    {
      name: 'keystatic-middleware',
      configureServer(server) {
        server.middlewares.use('/api/keystatic', async (req, res) => {
          const handler = makeGenericAPIRouteHandler({ config });
          const url = `http://${req.headers.host}${req.originalUrl}`;
          const webReq = new Request(url, {
            method: req.method,
            headers: req.headers as any,
            body: req.method !== 'GET' && req.method !== 'HEAD' ? req as any : undefined,
            // @ts-ignore
            duplex: 'half'
          });

          const webRes = await handler(webReq);

          res.statusCode = webRes.status;
          if (webRes.headers) {
            const headers = webRes.headers as any;
            if (headers.entries) {
              for (const [key, value] of headers.entries()) {
                res.setHeader(key, value);
              }
            } else {
              // Fallback for plain object headers if that happens
              Object.entries(headers).forEach(([key, value]) => {
                res.setHeader(key, value as string);
              });
            }
          }

          if (webRes.body) {
            if (typeof webRes.body === 'string' || webRes.body instanceof Uint8Array) {
              res.write(webRes.body);
            } else {
              // @ts-ignore
              const reader = webRes.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
              }
            }
          }
          res.end();
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));