import type { Locale } from './config';

/**
 * UI chrome strings only - nav labels, buttons, section headings.
 * Page content is not translated here; it lives in the content collections.
 *
 * Non-English entries are drafts and have NOT been reviewed by a fluent speaker.
 * They are not reachable while their locale is absent from PUBLISHED_LOCALES.
 */
export const UI = {
  en: {
    'nav.guides': 'Guides',
    'nav.tools': 'Tools',
    'nav.understand': 'Understand Your Health',
    'nav.tips': 'Tips',
    'nav.glossary': 'Glossary',
    'nav.templates': 'Templates',
    'nav.about': 'About',
    'nav.main': 'Main',
    'nav.footer': 'Footer',
    'action.skip': 'Skip to content',
    'action.copy': 'Copy',
    'action.copied': 'Copied',
    'action.download': 'Download',
    'action.print': 'Print',
    'action.reset': 'Reset',
    'action.theme': 'Switch theme',
    'meta.updated': 'Current as of',
    'meta.sources': 'Sources',
    'support.heading': 'Support this site',
    'support.cta': 'Buy us a coffee',
    'lang.label': 'Language',
  },
  es: {
    'nav.guides': 'Guias',
    'nav.tools': 'Herramientas',
    'nav.understand': 'Entienda su salud',
    'nav.tips': 'Consejos',
    'nav.glossary': 'Glosario',
    'nav.templates': 'Plantillas',
    'nav.about': 'Acerca de',
    'nav.main': 'Principal',
    'nav.footer': 'Pie de pagina',
    'action.skip': 'Ir al contenido',
    'action.copy': 'Copiar',
    'action.copied': 'Copiado',
    'action.download': 'Descargar',
    'action.print': 'Imprimir',
    'action.reset': 'Restablecer',
    'action.theme': 'Cambiar tema',
    'meta.updated': 'Vigente al',
    'meta.sources': 'Fuentes',
    'support.heading': 'Apoye este sitio',
    'support.cta': 'Invitanos un cafe',
    'lang.label': 'Idioma',
  },
  hi: {
    'nav.guides': 'मार्गदर्शिका',
    'nav.tools': 'उपकरण',
    'nav.understand': 'अपने स्वास्थ्य को समझें',
    'nav.tips': 'सुझाव',
    'nav.glossary': 'शब्दावली',
    'nav.templates': 'प्रारूप',
    'nav.about': 'हमारे बारे में',
    'nav.main': 'मुख्य',
    'nav.footer': 'फुटर',
    'action.skip': 'सामग्री पर जाएं',
    'action.copy': 'कॉपी करें',
    'action.copied': 'कॉपी हो गया',
    'action.download': 'डाउनलोड करें',
    'action.print': 'प्रिंट करें',
    'action.reset': 'रीसेट करें',
    'action.theme': 'थीम बदलें',
    'meta.updated': 'इस तिथि तक मान्य',
    'meta.sources': 'स्रोत',
    'support.heading': 'इस साइट का समर्थन करें',
    'support.cta': 'हमें एक कॉफी पिलाएं',
    'lang.label': 'भाषा',
  },
  ne: {
    'nav.guides': 'मार्गदर्शन',
    'nav.tools': 'उपकरणहरू',
    'nav.understand': 'आफ्नो स्वास्थ्य बुझ्नुहोस्',
    'nav.tips': 'सुझावहरू',
    'nav.glossary': 'शब्दावली',
    'nav.templates': 'ढाँचाहरू',
    'nav.about': 'हाम्रो बारेमा',
    'nav.main': 'मुख्य',
    'nav.footer': 'फुटर',
    'action.skip': 'सामग्रीमा जानुहोस्',
    'action.copy': 'प्रतिलिपि गर्नुहोस्',
    'action.copied': 'प्रतिलिपि भयो',
    'action.download': 'डाउनलोड गर्नुहोस्',
    'action.print': 'प्रिन्ट गर्नुहोस्',
    'action.reset': 'रिसेट गर्नुहोस्',
    'action.theme': 'थिम परिवर्तन गर्नुहोस्',
    'meta.updated': 'यस मितिसम्म मान्य',
    'meta.sources': 'स्रोतहरू',
    'support.heading': 'यो साइटलाई सहयोग गर्नुहोस्',
    'support.cta': 'हामीलाई कफी किन्दिनुहोस्',
    'lang.label': 'भाषा',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof UI)['en'];

/** Translation lookup with an English fallback for any missing key. */
export function useTranslations(locale: Locale) {
  return (key: UIKey): string =>
    (UI[locale] as Record<string, string>)[key] ?? UI.en[key];
}
