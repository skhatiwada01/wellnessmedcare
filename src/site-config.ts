/**
 * Site-wide settings resolved at build time.
 *
 * GA measurement ID: the site's own property is the default, so production builds
 * carry it without any host configuration. PUBLIC_GA_MEASUREMENT_ID overrides it -
 * set it to a different ID for another property, or to an empty string to turn GA
 * off entirely (e.g. in a staging build). Measurement IDs are public by nature
 * (they ship in the page HTML), so a default here leaks nothing.
 *
 * GA loads on every page view; visitors can opt out per device on the privacy page.
 * See src/components/Analytics.astro.
 */
export const GA_MEASUREMENT_ID =
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? 'G-0LT2L2MLY3';

export const GOATCOUNTER_CODE = import.meta.env.PUBLIC_GOATCOUNTER_CODE ?? '';
