/**
 * Locale plumbing.
 *
 * Routing, the language switcher, hreflang tags, and the UI dictionaries are all
 * live. Content translation is not done yet, so only locales listed in
 * PUBLISHED_LOCALES are reachable and advertised.
 *
 * To publish a locale:
 *   1. Translate the guide/tool content under src/content/<locale>/
 *   2. Have a fluent speaker review it - health content is not safe to ship
 *      machine-translated and unreviewed
 *   3. Add the code to PUBLISHED_LOCALES below
 */

export const LOCALES = {
  en: { label: 'English', native: 'English', dir: 'ltr' },
  es: { label: 'Spanish', native: 'Espanol', dir: 'ltr' },
  hi: { label: 'Hindi', native: 'Hindi', dir: 'ltr' },
  ne: { label: 'Nepali', native: 'Nepali', dir: 'ltr' },
} as const;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = 'en';

/** Only these are routed, linked, and emitted in hreflang. */
export const PUBLISHED_LOCALES: Locale[] = ['en'];

export const isPublished = (l: string): l is Locale =>
  (PUBLISHED_LOCALES as string[]).includes(l);

/** Strip a locale prefix off a pathname, returning the locale and the rest. */
export function parsePath(pathname: string): { locale: Locale; rest: string } {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && seg in LOCALES && seg !== DEFAULT_LOCALE) {
    return {
      locale: seg as Locale,
      rest: pathname.replace(`/${seg}`, '') || '/',
    };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname };
}

/** Build the URL for a given path in a given locale. */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}
