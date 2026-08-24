// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://wellnessmedcare.com',
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US' } } })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
