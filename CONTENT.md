# Editorial rules

These are not style preferences. They are the constraints that let a two-person team
publish health content credibly without clinical authors on staff.

## The bright line

**Never publish:**

- Symptom interpretation of any kind
- Triage guidance ("if you have X, go to the ER")
- Treatment, drug, dosage, or supplement guidance
- "See a [specialist] for [symptom]" - recommendation by symptom
- Any tool that takes a reader's input and returns a clinical suggestion
- A verdict on a reader's own number: high, low, abnormal, concerning, worrying
- Our own reference ranges, target ranges, or thresholds
- Prognosis, risk scoring, or screening recommendations personalised to a reader
- Diet plans, calorie targets, or exercise prescriptions

**Safe to publish:**

- How billing, claims, coverage, appeals, and pricing mechanically work
- What a term means
- What a law, rule, or program requires
- What something costs, and where the published price data lives
- What a lab test measures and what is generally known to move it, in the register of a
  medical encyclopedia entry, never addressed to the reader's own result
- Blank forms with no targets printed on them
- Preparation content: what to ask, what to bring, how to book
- Unit conversion and published formulas with their published categories

The test: if a reader could be harmed by acting on the page in a way that a licensed
clinician would have prevented, do not publish it.

## Section-specific rules

### Guides (`src/content/guides/`)

Every guide needs a `sources` array with at least one primary source - the schema
enforces `.min(1)`. Primary means CMS, IRS, DOL, HealthCare.gov, the Federal Register, a
state regulator, or the statute. Never another blog.

### Understand your health (`src/data/labs.ts`)

The hardest section to keep safe. Read the header comment in that file before adding to
it. The rules:

- Write `higher` and `lower` as *what is generally associated with* a direction, never as
  what the reader's result means
- Never open with "if your result is..."
- Never name a diagnosis as applying to the reader
- Always include ordinary non-disease causes in `affectedBy` - this is what stops a
  reader concluding the worst from a flagged value
- Never publish a reference range. The reader's report has theirs

Good: "Raised values are broadly associated with infection, inflammation, and
corticosteroids."
Bad: "If your WBC is above 11, you likely have an infection."

Two panel-specific patterns:

- **Infection tests** (hepatitis, HIV, H. pylori): "higher"/"lower" describe what
  positive and negative patterns generally mean, hedged ("generally means", never a bare
  "indicates"), and always noting the confirmation step that follows a positive.
- **Vital signs**: same register; never reproduce a category or staging table (the BMI
  exception does not extend to blood pressure), and the page shows a
  snapshot-not-verdict callout instead of the reference-range one.

### Tools (`src/pages/tools/`)

Every tool runs client-side. Nothing a reader types may be transmitted or stored - this
is both a privacy promise made on the site and the reason it is safe to offer these for
health data. Do not add analytics events that carry entered values. Cookie-setting
analytics (Google Analytics) must stay behind the consent banner - nothing may load
before the visitor accepts.

Calculators may report a published categorisation of a computed number (the CDC BMI
table) but may not add advice about what to do next.

### Tips (`src/content/tips/`)

Preparation and navigation only. Every tip should end with the reader better able to
have a conversation with a clinician - never with the reader having received the advice
instead of the clinician's.

If a draft starts telling the reader what to do with their body, it belongs in the
"what to ask" register instead.

## Numbers

Every dollar figure, percentage, and deadline must be verified against a primary source
**at the time of writing**, and the source must be in the `sources` array.

Figures that change annually and need a review pass each year:

| Figure | Where it appears | Source |
| --- | --- | --- |
| HSA contribution limits | `hsa-fsa-hra`, `deductible-copay-coinsurance` | IRS annual revenue procedure |
| HDHP minimum deductible / max OOP | same | same |
| ACA maximum out-of-pocket | `deductible-copay-coinsurance` | CMS Notice of Benefit and Payment Parameters |
| Health FSA limit and carryover | `hsa-fsa-hra` | IRS annual notice |
| Good faith estimate threshold ($400) and fee | `no-surprises-act` | CMS |
| Hospital price transparency requirements | `what-things-actually-cost` | CMS OPPS final rule |
| BMI categories | `tools/bmi` | CDC |
| Unit conversion factors | `tools/unit-converter` | Fixed constants - no annual review needed |

Set a calendar reminder for **each November** to re-verify all of the above for the
coming plan year, and again in **May** when the IRS typically issues HSA limits.

## Tone

- Short sentences. The reader is often stressed and holding a bill or a lab report.
- Second person. "You owe" not "the patient owes."
- Plain hyphens, never em dashes or en dashes.
- No hedging stacks. One clear statement beats three qualified ones.
- No fake empathy openers. Get to the useful part.
- Never imply an outcome is guaranteed.

## Translation

`src/i18n/config.ts` holds the locale plumbing. Routing, hreflang, the switcher, and the
UI dictionaries are live; only locales in `PUBLISHED_LOCALES` are reachable.

**Do not add a locale to `PUBLISHED_LOCALES` until a fluent speaker has reviewed its
content.** Health content mistranslated is worse than health content unavailable, and the
non-English UI strings currently in `src/i18n/ui.ts` are unreviewed drafts.

## Adding a page

1. Create the file with full frontmatter (guides and tips) or add to the data module
   (labs, glossary, trackers, templates).
2. Cross-link to at least two existing pages, and add links *from* related pages back to
   it. Internal linking is most of our SEO.
3. If it introduces a term, add it to `src/data/glossary.ts`.
4. Run `npm run build`, then the link check in `README.md`.

## Before publishing anything

- [ ] Would a clinician object to any sentence here?
- [ ] Does anything on the page render a verdict on a reader's own number?
- [ ] Is every number sourced and dated?
- [ ] Does every internal link resolve?
- [ ] Does the page tell the reader what to actually *do next*?
