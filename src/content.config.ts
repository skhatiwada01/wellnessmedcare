import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** The four content pillars. Keep these stable - they drive nav and URLs. */
export const PILLARS = {
  decode: {
    label: 'Decode the system',
    blurb: 'What the words on your insurance card, plan documents, and statements actually mean.',
  },
  bills: {
    label: 'Fight back on bills',
    blurb: 'Checking a bill for errors, appealing a denial, and paying less than the sticker price.',
  },
  'find-care': {
    label: 'Find the right care',
    blurb: 'Choosing where to go, vetting a provider, and knowing the price before you walk in.',
  },
  money: {
    label: 'Accounts and taxes',
    blurb: 'HSAs, FSAs, HRAs, and the deductions that lower what care costs you.',
  },
} as const;

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Used for the meta description and the card blurb. Keep under ~160 chars. */
    description: z.string(),
    pillar: z.enum(['decode', 'bills', 'find-care', 'money']),
    /** Shown as "Current as of". Every page must carry one. */
    updated: z.coerce.date(),
    /** Sorting within a pillar. Lower shows first. */
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /** Primary sources. At least one is required - see CONTENT.md. */
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .min(1),
  }),
});

const tips = defineCollection({
  loader: glob({ base: './src/content/tips', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Grouping on the tips hub. */
    topic: z.enum(['appointments', 'results', 'activity', 'caregiving', 'navigation']),
    updated: z.coerce.date(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /**
     * Tips are preparation and navigation content, not clinical content, so a primary
     * source is encouraged but not always applicable the way it is for a guide.
     */
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const TOPICS = {
  appointments: {
    label: 'Getting more out of appointments',
    blurb: 'Preparing for a visit, asking better questions, and leaving with a clear next step.',
  },
  results: {
    label: 'Tests and results',
    blurb: 'What to do before a test, and what to do with the report when it arrives.',
  },
  activity: {
    label: 'Movement and everyday health',
    blurb: 'How to have the conversation, what to ask first, and how to start a plan with your clinician rather than despite them.',
  },
  caregiving: {
    label: 'Helping someone else',
    blurb: 'Attending appointments for a parent, a partner, or anyone whose care you help manage.',
  },
  navigation: {
    label: 'Navigating the system',
    blurb: 'Referrals, records, portals, pharmacies - the plumbing of American healthcare, and how to make it work for you.',
  },
} as const;

export const collections = { guides, tips };
