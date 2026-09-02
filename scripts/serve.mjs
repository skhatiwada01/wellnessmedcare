/**
 * Production static server for `npm run start`.
 *
 * Serves the built site from dist/ on PORT (default 8080). Use this when deploying
 * to a Node host (VPS, Render, Railway, cPanel Node app). On Netlify/Cloudflare
 * Pages this script is not used - those platforms serve dist/ themselves and apply
 * the headers from netlify.toml.
 *
 * Run `npm run build` first; this only serves what is already in dist/.
 */
import http from 'node:http';
import { existsSync } from 'node:fs';
import handler from 'serve-handler';

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

if (!existsSync('dist/index.html')) {
  console.error('dist/ is missing or empty - run `npm run build` first.');
  process.exit(1);
}

const server = http.createServer((req, res) =>
  handler(req, res, {
    public: 'dist',
    directoryListing: false,
    trailingSlash: true,
    headers: [
      {
        // Hashed build assets never change - cache them forever.
        source: '_astro/**',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: 'pagefind/**',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      {
        source: '**',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ],
  }),
);

server.listen(PORT, HOST, () => {
  console.log(`wellnessmedcare serving dist/ at http://${HOST}:${PORT}`);
});

// Let platform stop signals close the server cleanly instead of dropping requests.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
