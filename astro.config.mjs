// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readFileSync, readdirSync } from 'node:fs';

// lastmod for content-backed URLs, read from frontmatter at config time so the
// sitemap can tell crawlers which pages actually changed.
function collectUpdated(dir, urlPrefix) {
  const map = {};
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md') && !f.endsWith('.mdx')) continue;
    const m = readFileSync(`${dir}/${f}`, 'utf8').match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m);
    if (m) map[`${urlPrefix}${f.replace(/\.mdx?$/, '')}/`] = m[1];
  }
  return map;
}
const LASTMOD = {
  ...collectUpdated('src/content/guides', 'https://wellnessmedcare.com/guides/'),
  ...collectUpdated('src/content/tips', 'https://wellnessmedcare.com/tips/'),
};

export default defineConfig({
  site: 'https://wellnessmedcare.com',
  // Whitespace collapsing was deleting the space between prose and inline links
  // ("browse theguides") on 141 boundaries across the site.
  compressHTML: false,
  integrations: [
    mdx(),
    sitemap({
      // The search page is a client-side shell - keep it out of the index's map.
      filter: (page) => !page.includes('/search/'),
      serialize(item) {
        const lastmod = LASTMOD[item.url];
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
