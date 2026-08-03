import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnvFile } from './scripts/load-env.mjs';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

const NETLIFY_FUNCTION_PREFIX = '/.netlify/functions/';

function netlifyFunctionsDev() {
  let envLoaded = false;

  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestUrl = req.url || '';
        const [pathname, rawQuery = ''] = requestUrl.split('?');

        if (!pathname.startsWith(NETLIFY_FUNCTION_PREFIX)) return next();

        const functionName = pathname.slice(NETLIFY_FUNCTION_PREFIX.length);
        if (!functionName || functionName.includes('/')) return next();

        (async () => {
          try {
            if (!envLoaded) {
              loadEnvFile();
              envLoaded = true;
            }

            const { handler } = await import(`./netlify/functions/${functionName}.mjs`);
            const body =
              req.method === 'GET' || req.method === 'OPTIONS'
                ? ''
                : await readBody(req);
            const queryStringParameters = Object.fromEntries(
              new URLSearchParams(rawQuery)
            );

            const result = await handler({
              httpMethod: req.method || 'GET',
              headers: req.headers,
              body,
              queryStringParameters,
              rawQuery,
            });

            res.writeHead(result.statusCode, result.headers);
            res.end(result.body || '');
          } catch (err) {
            console.error(`Local function error (${functionName}):`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Server error' }));
          }
        })();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), netlifyFunctionsDev()],
  server: {
    proxy: {
      '/submit-lead.php': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});
