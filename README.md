# wellnessmedcare.com

Free, plain-English health content in four sections: **Guides** (bills and insurance),
**Tools** (calculators and printable trackers), **Understand Your Health** (lab test
reference), and **Tips** (appointment preparation).

Built with [Astro](https://astro.build) as a fully static site. No backend, no database,
no user accounts. Every interactive tool runs in the reader's browser.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Dev server runs at `http://localhost:4321`. Build output goes to `dist/`.

## Checking internal links after a build

```bash
node -e "const fs=require('fs'),path=require('path');const dist='dist';const files=[];(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);e.isDirectory()?w(p):files.push(p)}})(dist);const exists=new Set();for(const f of files){const r=f.slice(dist.length).replace(/\\\\/g,'/');exists.add(r);if(r.endsWith('index.html'))exists.add(r.slice(0,-10))}let bad=0;for(const f of files.filter(f=>f.endsWith('.html'))){const h=fs.readFileSync(f,'utf8');for(const m of h.matchAll(/href=\"([^\"]+)\"/g)){const u=m[1];if(/^(https?:|mailto:|#)/.test(u))continue;const t=u.split('#')[0];if(t&&!exists.has(t)){console.log(f,'->',u);bad++}}}console.log(bad?bad+' broken':'All internal links resolve.')"
```

## Layout

```
src/
  content/
    guides/          billing and insurance guides (markdown)
    tips/            appointment preparation tips (markdown)
  content.config.ts  schemas, content pillars, tip topics
  data/
    labs.ts          lab test reference - READ ITS HEADER BEFORE EDITING
    glossary.ts      billing and insurance terms
    templates.ts     letter templates with [placeholders]
    trackers.ts      printable tracker specs
  scripts/docx.ts    client-side Word and CSV generation
  i18n/              locale config and UI string dictionaries
  pages/             routes
  layouts/           Base (head/nav/footer) and Guide
  components/        Header, Footer, Callout, Sources, Support, Newsletter
  styles/global.css  all styling
```

Read [CONTENT.md](CONTENT.md) before writing anything. It defines the line between what
we publish and what we do not, and it is the reason this site can exist without clinical
authors.

## How the interactive parts work

**Word download.** `src/scripts/docx.ts` wraps the `docx` package. It is ~350KB, so it is
dynamically imported on button click rather than page load - keep it that way.

**Templates.** `[Square brackets]` in `src/data/templates.ts` are parsed into form fields
automatically. Add a template and its form generates itself. Unfilled placeholders stay
bracketed in the output so the reader can finish in Word.

**Theme.** Defaults to white. An inline script in `Base.astro` reads `localStorage` before
first paint to avoid a flash; the toggle sets `data-theme="dark"` on `<html>`. There is
deliberately no `prefers-color-scheme` default - light is the default regardless of OS.

**Privacy.** No tool transmits input. Do not add analytics that carry entered values.

## Things that still need doing

**Before launch**

- Point the domain at this build and retire the placeholder site
- Set `NEWSLETTER_ENDPOINT` in `src/components/Newsletter.astro` - while it is empty the
  signup form does not render at all, which is deliberate
- Add a cookie consent banner (required before ads, and for GDPR/CCPA)
- Have a lawyer review `src/pages/privacy.astro` and `src/pages/terms.astro` - they are
  reasonable starting drafts, not reviewed documents
- Replace the placeholder contact addresses in those two files
- Add a real Open Graph image (`og:image` is not currently set)

**Before applying to AdSense**

The site now has 150 pages, which clears the usual bar comfortably. Still needed: cookie consent, a
working contact route, and some organic traffic.

**Translation**

Routing, hreflang, the language switcher, and UI dictionaries for Spanish, Hindi and
Nepali are built. `PUBLISHED_LOCALES` in `src/i18n/config.ts` currently contains only
`en`, so the switcher is hidden and no non-English route exists.

To publish a locale: translate the content, have a fluent speaker review it, then add the
code to `PUBLISHED_LOCALES`. Do not skip the review step - see CONTENT.md.

**Current inventory** (August 2026): 150 pages. 98 lab tests across 13 panels, 57
printable trackers in 8 categories, 19 tips, 15 letter templates, 9 calculators, a
55-term glossary, and 10 billing guides.

**Content roadmap**

*Lab tests to add*: lipase/amylase, ammonia, LDH, haptoglobin, direct/indirect bilirubin
split, blood type, celiac genetic tests, therapeutic drug levels, and an "office tests"
panel for rapid strep/flu/COVID.

*Guides to add*: preventive vs. diagnostic coding (why your free physical generated a
bill), how to vet a doctor, prior authorization, insurance changing mid-treatment,
reading your Summary of Benefits and Coverage, ER vs. urgent care on cost only, medical
debt and credit reports, COBRA vs. marketplace after job loss, open enrollment worksheet.

*Tools to consider*: plan comparison worksheet, COBRA vs. marketplace cost comparison,
and a hospital price lookup built on CMS machine-readable files - the hard one, and the
only genuinely defensible moat available to a small team.

## Revenue

Reader donations via Buy Me a Coffee now; display ads once eligible; possibly optional
paid features later. No paid placement from hospitals, insurers, billing companies, or
lead buyers - this is stated publicly on the About page and should stay true.
