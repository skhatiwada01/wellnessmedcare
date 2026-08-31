import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const tips = await getCollection('tips', ({ data }) => !data.draft);

  const items = [
    ...guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `/guides/${g.id}/`,
      pubDate: g.data.updated,
    })),
    ...tips.map((t) => ({
      title: t.data.title,
      description: t.data.description,
      link: `/tips/${t.id}/`,
      pubDate: t.data.updated,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Wellness Med Care',
    description:
      'Plain-English guides and tips for US medical bills, health insurance, lab reports, and healthcare prices.',
    site: context.site!,
    items,
    customData: '<language>en-us</language>',
  });
}
