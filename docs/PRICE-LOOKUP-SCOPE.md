# Hospital price lookup - scoping document

**Status:** scoped, not started. **Date:** August 2026.
**Goal:** a consumer hospital price lookup built on the CMS Hospital Price Transparency
machine-readable files (MRFs) - the defensible moat for wellnessmedcare.com.

Research behind this document was compiled from primary sources in August 2026; the
source list is at the bottom. Key regulatory facts were verified against cms.gov,
eCFR, and the CMS GitHub repos.

---

## 1. Why this is worth building

- **The data finally became usable in 2026.** Since April 1, 2026, CMS enforces the
  v3.0 MRF schema: every hospital file must carry, per payer and plan, the **median,
  10th percentile, and 90th percentile of actually-allowed amounts** (computed from
  real EDI 835 remittance data over a 12-15 month lookback), alongside the
  **discounted cash price** and dollar negotiated rates - with a named senior
  executive attesting the file is true, accurate, and complete. Before this, the files
  listed often-theoretical rates. Now they carry a distribution of what was actually
  paid.
- **The incumbents ignore SEO by design.** Turquoise Health, FAIR Health Consumer,
  CMS's Procedure Price Lookup, and Sage Transparency all serve results inside search
  widgets with parameterized URLs - no static, indexable procedure/city/hospital
  pages. The entire long tail of patient-typed queries ("colonoscopy cost in
  [city]", "[hospital name] MRI price") is contested only by thin programmatic sites,
  nearly all launched 2025-2026, several with visibly fake data (one shows the same
  "$1,000-$5,000" range for every city in America).
- **Price dispersion is the content.** Documented spreads: brain MRI cash price
  $406 to $14,681 across hospitals (36x); colonoscopy $311 to $10,353; the same
  hospital charging one insurer $728 and another $1,801 for the same service. Real,
  dated, sourced numbers on that spread are inherently linkable - and nobody combines
  them with plain-English explanation.
- **It feeds everything else on the site.** The negotiate-a-bill guide needs an
  anchor number; the out-of-pocket estimator needs an allowed amount; the good faith
  estimate guide needs a benchmark. This tool supplies all three internally.

**The differentiators nobody currently combines:** post-April-2026 percentile data,
visible per-page freshness stamps, a public methodology page, honest "what is not
included" caveats (professional fees, anesthesia, screening-vs-diagnostic coding),
and the site's existing plain-English editorial voice.

## 2. Legal and licensing position (settled, favorable)

- 45 CFR 180.50 requires MRFs to be free, login-free, accessible to automated
  searches, and in a format "without restrictions that would impede the re-use of
  that information." Bot-blocking an MRF is a hospital compliance failure (reportable
  to CMS), not our problem to respect.
- Prices, codes, and payer names are facts; facts are not copyrightable. Aggregators
  have republished MRF data at scale since 2021 without legal challenge.
- **The one landmine:** third-party *normalized* datasets (Turquoise, Payerset, PRA's
  converted files) carry their own restrictive terms. Turquoise's consumer terms
  explicitly prohibit scraping and redistribution. **Rule: ingest only from
  hospital-published original files, attribute the hospital and file date, and keep
  the attestation fields.** Never touch a commercial aggregator's output.
- Consumer-facing framing must say: these are the hospital's own published figures as
  of [date]; actual bills can differ; separate professional fees (surgeon,
  anesthesia, pathology, radiology) are usually not included; confirm with the
  hospital and, if self-pay, request a good faith estimate. This is administrative
  price information - squarely inside our editorial bright line.

## 3. The data, in brief

| Fact | Value |
| --- | --- |
| Hospitals in scope | ~6,100 (CMS Hospital General Information lists ~5,400 Medicare-certified) |
| Discovery mechanism | `https://{hospital-domain}/cms-hpt.txt` (required since Jan 2024; fields: location-name, source-page-url, mrf-url, contact-name, contact-email). No central CMS registry exists. |
| File naming | `<ein>_<hospital-name>_standardcharges.[json\|csv]` |
| Formats | CSV "tall", CSV "wide", or JSON, per the CMS v3.0 schemas (github.com/CMSgov/hospital-price-transparency) |
| Fields we keep | description, code + code type (CPT/HCPCS/MS-DRG), setting, gross, **discounted_cash**, payer/plan, **negotiated_dollar**, methodology, **median_amount, 10th_percentile, 90th_percentile, count** |
| File sizes | tens of MB (community) to 1-10 GB (large systems); ~3-5 TB national corpus |
| Automated coverage ceiling | 60-75% via cms-hpt.txt crawling (Serif Health's published crawl: 60.1% valid txt files, 71.5% of locations reached); the tail is manual |
| Schema compliance | ~25% of files still violate the schema; expect v2.2 stragglers without percentile fields - check `version`, degrade gracefully |
| Update cadence | hospitals must refresh at least annually; quarterly recrawl keeps average staleness under 3 months |
| Master hospital list | CMS Hospital General Information CSV (CCN, name, address, city, state, ZIP, type) via the data.cms.gov metastore API; domains seeded from TPAFS/transparency-data (CC BY-SA, stale but usable) |

Parsing gotchas already identified: wide-CSV has dynamic per-payer column names
(`standard_charge|Aetna|PPO|negotiated_dollar`); the `count` field is a string with a
literal privacy bucket `"1 through 10"`; percentile fields appear only where the
negotiated charge is percentage- or algorithm-based; gzip variants exist and are
non-seekable.

## 4. Architecture

**Pipeline (offline, laptop-scale - no backend anywhere):**

```
CMS Hospital General Information CSV        (hospital spine: CCN, name, city, state)
        v
domain list (TPAFS seed + manual fill)      (the one genuinely manual asset)
        v
crawl {domain}/cms-hpt.txt                  (Python, polite, real user-agent)
        v
fetch MRFs -> stream through DuckDB         (parse tall/wide/JSON; filter to target
        v                                    code list; discards 95-99% of rows)
per-hospital Parquet extracts               (national filtered extract: single-digit GB)
        v
emit static artifacts:
  - per-procedure-per-metro JSON shards     (10-100 KB each, gzipped)
  - Astro pages at build time               (hubs, city pages, hospital pages)
```

DuckDB parses CSV at ~0.5-1 GB/s per core; even the national corpus is an overnight
job on a desktop. Validation via CMS's own `hpt-validator` (npm). Quarantine
schema-violators rather than guessing.

**Site pages (the three-axis SEO architecture):**

1. `/costs/{procedure}/` - procedure hub: what the procedure's CPT codes are, national
   spread across our dataset, what drives the price, FAQ markup, links to city pages.
   The editorial half is what the thin competitors cannot copy.
2. `/costs/{procedure}/{city-state}/` - the money pages: per-hospital rows with cash
   price, median allowed, 10th-90th spread, an as-of date per hospital file, and the
   caveat box.
3. `/hospitals/{state}/{hospital-slug}/` - one page per hospital: its shoppable
   services with prices, its file date, its attestation status, link to its own
   estimator.

Plus one **methodology page** explaining exactly where every number comes from - the
trust asset none of the programmatic competitors have.

**Hosting math (validated against platform limits):**

| Scope | Pages | Size | Verdict |
| --- | --- | --- | --- |
| One state (~120-400 hospitals) | under 5,000 | under 300 MB | fits every free tier |
| Top 50 metros (~2,000 hospitals) | ~17,000 | 0.5-1 GB | needs Cloudflare Pages paid tier or shard-based design |
| National | ~122,000 if fully prerendered | 3.5-5 GB | do NOT prerender procedure pages; prerender ~6,100 hospital pages + client-side lookup over sharded JSON |

Cloudflare R2 (zero egress fees, 10 GB free) hosts the data shards if and when the
site outgrows bundling them; Cloudflare Pages hosts the site. Netlify's new credit
model makes it the weakest choice for the data-heavy phases - plan to deploy this
subdomain or the whole site on Cloudflare when Phase 2 arrives.

## 5. Phases

**Phase 0 - validation spike (1-2 weekends).** Pick our home state. Hand-pick ~20
hospitals, ~15 procedures from the CMS 70-shoppable list (colonoscopy 45378/45380,
MRI brain/spine, CT, mammogram, blood panels, ED visit levels, knee MRI, upper GI
endoscopy, psychotherapy codes, joint replacement DRG 470). Build the crawl + DuckDB
filter + one prototype city page. **Exit criterion:** hand-verify 30 numbers against
the hospitals' own files and estimator tools; if the data is too dirty to stand
behind, we learned that for the cost of two weekends.

**Phase 1 - one-state MVP (4-8 weekends).** All hospitals in the state we can reach
automatically plus a manual pass on the top 20 by size. ~25 curated procedures
(consumer-legible subset of the 70). All three page types + methodology page.
Quarterly refresh via GitHub Actions. Ship it, submit to Search Console, and watch
for 3 months.

**Phase 2 - expand on evidence.** If Phase 1 pages earn impressions: neighboring
states or top-50 metros, more procedures, R2 for data shards, a client-side compare
tool on the city pages. If they do not, stop - the site's other content keeps
growing either way.

**Phase 3 - national (only if traffic justifies).** Prerendered hospital pages +
client-side procedure lookup over sharded JSON. Accept the 70-80% coverage ceiling
honestly on-page ("we could not automatically read this hospital's file").

**Explicitly out of scope at every phase:** payer Transparency-in-Coverage files
(650 GB per insurer - a different program, 200x the size), insurance-specific
estimates requiring the reader's plan details, and any "which hospital should you
choose" recommendation. We publish prices, not advice.

## 6. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Dirty data despite attestation | Hand-verification in Phase 0; show file date + version per row; quarantine schema violators; "report a wrong price" link on every page |
| URL rot between quarters (the documented main maintenance burden) | Quarterly recrawl of cms-hpt.txt, not just MRF URLs; store source-page-url as fallback |
| Google treating city pages as thin programmatic content | Real per-hospital data (never placeholder ranges), editorial content on every hub, methodology page, FAQ markup, internal links from our 150 existing pages |
| A dozen 2026-era competitors | Their weakness is visible: undated, fake-uniform, no methodology. Ours is freshness + honesty. The window is open but narrowing - Phase 0 soon |
| Two-person maintenance ceiling | One-state scope is deliberately small; every expansion gated on measured traffic; the quarterly refresh is one overnight compute job |
| A reader treats a price as a quote | The caveat box on every page: professional fees excluded, coding can change price, confirm with the hospital, GFE rights for self-pay - all linking to existing guides |

## 7. Cost estimate

Phase 0-1: $0 beyond time (laptop compute, free hosting tiers, ~50-100 GB of
downloads). Phase 2+: roughly $1-5/month (R2 storage past the free 10 GB); a
Cloudflare Pages paid plan ($20/month) only if we choose full prerendering at
top-50-metro scope. No phase requires a server, a database service, or a data
license.

## 8. How it connects to revenue

Near-term: these are the highest-commercial-intent pages the site can own, which
means the best ad RPM once AdSense is live, and the most natural home for the Buy Me
a Coffee ask ("this number just saved you $2,000"). Long-term: a person comparing
colonoscopy prices in their city is precisely the future provider-referral lead the
original site plan pointed at - the pages build that audience without committing to
the lead-gen model yet.

---

## Primary sources

- CMS schema repo and data dictionaries: https://github.com/CMSgov/hospital-price-transparency (v3.0 JSON schema, CSV tall/wide dictionaries)
- CMS validator tools: https://cmsgov.github.io/hpt-tool/ and https://github.com/CMSgov/hpt-validator
- 45 CFR 180.50 / Part 180: https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180
- CY2026 OPPS final rule HPT fact sheet: https://www.cms.gov/newsroom/fact-sheets/cy-2026-opps-ambulatory-surgical-center-final-rule-hospital-price-transparency-policy-changes
- 70 shoppable services list: https://www.cms.gov/files/document/steps-making-public-standard-charges-shoppable-services.pdf
- Hospital master list: https://data.cms.gov/provider-data/dataset/xubh-q36u
- Domain/MRF-URL seed (CC BY-SA): https://github.com/TPAFS/transparency-data
- Crawl economics: https://www.serifhealth.com/blog/automating-hospital-price-transparency-v2-data-collection
- Compliance rates: https://www.patientrightsadvocate.org/pra-reports (2026: 21.1% full compliance)
- Ecosystem state: https://www.dolthub.com/blog/2025-01-28-state-of-hospital-price-transparency-data/
- Consumer landscape: turquoise.health/patients, fairhealthconsumer.org, medicare.gov/procedure-price-lookup, dashboard.sagetransparency.com
- Full research notes with all 110 sources: [docs/research/](research/) (four reports: spec, discovery, landscape, architecture)
