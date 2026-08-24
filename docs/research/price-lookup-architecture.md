# Angle 4 - Static-site architecture feasibility for a CMS hospital-price lookup

## 1. Real-world MRF file sizes and total corpus

**Hospital count baseline.** Serif Health's national crawl (the best public accounting of the discovery problem) uses 6,120 hospitals nationally as the denominator; AHA/Turquoise reporting put 5,763 hospitals (91%) posting MRFs by end of 2023. So plan for roughly 5,500-6,200 files if you attempt national coverage.

**Total corpus.** Turquoise Health reported having amassed about 3 TB of hospital MRF data as of December 2022 (vs 630 TB for payer Transparency-in-Coverage data - do not confuse the two regimes; hospital data is ~200x smaller and is the tractable one). Post-2024 standardization the corpus is roughly the same order: ~3-5 TB raw for all US hospitals. That is laptop-feasible to stream through, and NAS-feasible to archive.

**Per-file sizes.** No authority publishes a clean median, but the pieces triangulate:
- 3 TB / ~5,700 hospitals gives a mean around 500 MB, but the distribution is heavily right-skewed: the mean is dragged up by large multi-hospital systems and by verbose JSON encodings.
- DoltHub's bounty work observed roughly 70k prices per 9 MB file in typical CSVs, i.e. ~130 bytes/row - so a hospital with 2M rows (a few thousand codes x dozens of payer-plan combos) lands around 250 MB as CSV.
- Typical community-hospital files are tens of MB; large academic systems run 1-10+ GB, especially in JSON. Turquoise's parsing guide cites a University of Michigan file at 214 MB in XML that shrank to 17.8 MB restructured - format bloat of 10x is common.
- Row Zero's guide confirms the standardized files "contain millions of rows... one for each combination of item, insurer, and health plan" and were historically too big for Excel.

**Key 2026 fact that changes the input side:** since July 1, 2024 hospitals MUST use one of three CMS layouts - CSV "tall", CSV "wide", or JSON schema - with strictly validated column names (repo: https://github.com/CMSgov/hospital-price-transparency). The v3.0 templates (effective Jan 1, 2026, enforced Apr 1, 2026) add exact new fields: `median_amount`, `10th_percentile`, `90th_percentile`, `count` (of allowed amounts), plus `attester_name`/attestation and `type_2_npi`. Existing tall-CSV columns you will key on: `description`, `code|[i]`, `code|[i]|type`, `setting`, `standard_charge|gross`, `standard_charge|discounted_cash`, `payer_name`, `plan_name`, `standard_charge|negotiated_dollar`, `standard_charge|negotiated_percentage`, `standard_charge|negotiated_algorithm`, `standard_charge|min`, `standard_charge|max`, `standard_charge|methodology`, `estimated_amount` (replaced by the median/percentile trio in v3.0). The pre-2024 "every hospital invents its own format" horror stories are mostly obsolete - but Serif found ~25% of files still violate the schema and need custom handling.

**Discovery.** Hospitals must publish `/cms-hpt.txt` (or `/.well-known/cms-hpt.txt`) at their site root listing MRF URLs and a contact (45 CFR 180.50(d)(6)(i)); CMS ships a TXT generator and validator (https://cmsgov.github.io/hpt-tool/txt-generator/). Reality check from Serif Health's crawl: of 2,771 URLs tested, only 60.1% returned a valid cms-hpt.txt, 5.1% actively blocked requests, and ~1,741 hospitals lacked the TXT entirely; they reached 4,379 unique hospital locations (71.5% coverage) and estimate ~1,000 labor-hours to chase the non-compliant tail. Plan for 70-80% automated coverage, not 100%.

## 2. Preprocessing: what a laptop-scale pipeline looks like

Because the inputs are now schema-standardized CSV/JSON, the pipeline is genuinely small-team-sized:

1. Crawl cms-hpt.txt files (a Python script + hospital domain list; nathansutton/hospital-price-transparency on GitHub demonstrates a solo git-scraping operation covering 5,000+ hospitals via GitHub Actions, storing per-hospital JSONL keyed by state/CCN).
2. Stream each MRF through DuckDB (`read_csv` with the tall schema) or Polars lazy scans; neither needs the file in RAM. Filter immediately to the rows you care about: the ~70 CMS-specified shoppable services plus your chosen CPT/DRG list, keeping `standard_charge|discounted_cash`, `standard_charge|negotiated_dollar`, and the new `median_amount`/`10th_percentile`/`90th_percentile` columns. This typically discards 95-99% of rows (most rows are obscure chargemaster items and per-payer-plan permutations you won't display).
3. Write per-hospital Parquet extracts; a national filtered extract is single-digit GB (see math below), which DuckDB joins/aggregates in seconds on a laptop.
4. Validate with CMS's own validator tooling in the hpt-tool repo; quarantine the ~25% schema violators for manual triage or exclusion.

Throughput: DuckDB parses CSV at roughly 0.5-1 GB/s/core; 3 TB is an overnight job on a desktop, and disk/network is the bottleneck, not CPU. You never need Spark, a warehouse, or a server.

## 3. Output-side math for the static site

Working numbers: 6,120 hospitals; 300 shoppable services per hospital (70 CMS-specified + hospital-selected to reach 300, per 45 CFR 180.60); assume you display cash price + median/10th/90th for ~10 major payers per hospital-service. A hospital-service JSON record with those stats is ~0.5-1 KB raw, ~150-300 bytes gzipped.

**(a) One state** (avg state ~120 hospitals; CA ~400, TX ~600):
- Per-hospital pages: 120-400 pages x 100-300 KB = 15-100 MB.
- Procedure x metro pages: 300 procedures x 5-15 metros = 1,500-4,500 pages x 10-50 KB = 30-200 MB.
- Total: well under 5,000 files and under 300 MB. Fits every free tier trivially, including GitHub Pages (1 GB site cap).

**(b) Top 50 metros** (~2,000-2,500 hospitals, ~55% of US population):
- 2,000 hospital pages + (300 procedures x 50 metros = 15,000 procedure pages) = ~17,000 pages + site assets.
- This sits uncomfortably at Cloudflare Pages' free-plan cap of 20,000 files (25 MiB max per file); paid plans lift it to 100,000 files. Netlify has no meaningful file-count cap but see bandwidth below.
- Sizes: hospital pages ~2,000 x 100-200 KB = 200-400 MB; procedure-metro pages 15,000 x 20-40 KB = 300-600 MB. Total ~0.5-1 GB. Exceeds GitHub Pages' 1 GB comfort zone; fine on Cloudflare/Netlify.
- Underlying data: 2,000 x 300 x 10 payer rows = 6M rows -> a ~300-600 MB Parquet or ~150 MB of sharded gzipped JSON.

**(c) National:**
- 6,120 hospital pages + 300 procedures x ~387 metro areas = ~116,000 procedure pages -> ~122,000 pages total. Over even Cloudflare's paid 100,000-file cap if every combination is a prebuilt page. Total HTML ~3.5-5 GB.
- Full filtered dataset: 6,120 x 300 x 10 = ~18M hospital-service-payer rows; at ~50-100 bytes/row compressed that is a 1-2 GB Parquet file, or ~15,000 sharded JSON files if sharded by procedure x state (300 x 50), each 10-100 KB.
- Conclusion: national scope should NOT be all-prerendered pages. Prerender the ~6,120 hospital pages (SEO surface) and serve the procedure-comparison views from client-side queries over sharded data (below). That keeps the deployable site under 10,000 files and ~1 GB, with the data corpus on a separate data host.
- Astro-specific: building 100k+ pages will blow Cloudflare Pages' 20-minute build timeout and eat Netlify build minutes; build locally or in GitHub Actions and deploy with `wrangler pages deploy` (direct upload) instead of the platform's builder.

## 4. CDN / static-host constraints that matter

- **Cloudflare Pages**: 20,000 files free / 100,000 paid; 25 MiB per file hard cap; 500 builds/month free; 20-minute build timeout; no bandwidth charges. Docs: https://developers.cloudflare.com/pages/platform/limits/
- **Netlify**: accounts created after Sep 2025 are on a credit model - 300 free credits/month, with deploys at 15 credits and bandwidth at 20 credits/GB, i.e. roughly 20 deploys and ~15 GB bandwidth free; legacy accounts keep 100 GB bandwidth + 300 build minutes. For a data-heavy public site this is the weakest free tier now.
- **GitHub Pages**: 1 GB published-site cap, 100 GB/month soft bandwidth limit - fine for scope (a) only. GitHub Releases: 2 GiB per asset, up to 1,000 assets/release - a viable free archive for raw/intermediate Parquet snapshots.
- **Cloudflare R2**: 10 GB-month storage, 1M Class A + 10M Class B ops free, and zero egress fees forever ($0.015/GB-month past 10 GB). This changes the calculus decisively: put the sharded JSON/Parquet corpus on R2 behind a custom domain, keep the Astro site on Pages, and bandwidth cost is $0 regardless of traffic. A 50 GB quarterly archive of raw files costs ~$0.60/month.
- Range requests (needed for the options below) are supported by GitHub Pages, S3, R2, Cloudflare Pages, and Netlify - with one known trap: GitHub Pages gzip-encodes some responses/HEAD requests, which has broken sql.js-httpvfs (github/pages-gem issue #952); R2 with explicit no-transform headers is safer.

## 5. Client-side query options (no backend)

Ranked for a two-person Astro team:
1. **Sharded JSON by procedure x state (or x metro)** - simplest and most robust. ~15,000 gzipped shards of 10-100 KB; the browser fetches exactly one shard per user query (procedure + location). No WASM, no range requests, works on every host, cache-friendly. This is the recommended core.
2. **Static search index for the procedure/hospital picker** - Pagefind or MiniSearch/FlexSearch over ~6,000 hospital names + ~300 service names is a sub-1 MB index; trivial.
3. **sql.js-httpvfs** - read-only SQLite over HTTP range requests; an indexed key lookup transfers ~1 KB even from a multi-GB database (phiresky's design). Proven on GitHub Pages/Netlify/S3. Good if you want arbitrary queries (any CPT, not just curated ones) without 15,000 shards. Caveats: ~1 MB WASM payload, page-size tuning matters, and the GitHub Pages gzip issue above.
4. **DuckDB-WASM over Parquet on R2** - reads only the Parquet footer plus the row groups/columns a query touches via `Range:` requests; a 1-2 GB national Parquet is directly queryable in-browser. Most powerful, but the WASM bundle is ~5-10 MB and mobile performance needs care. Better as a power-user/analyst page than the primary consumer path.

## 6. Update cadence and quarterly refresh cost

- Regulatory floor: hospitals must update standard charges at least once every 12 months (45 CFR 180.50(e)) and stamp `last_updated_on` in the file; updates are scattered across the year (fiscal-year aligned), so a quarterly recrawl is the right cadence to stay <3 months stale on average. The Jan/Apr 2026 v3.0 transition means most files churned in H1 2026.
- Quarterly cost: re-fetch cms-hpt.txt for ~6,000 domains (cheap), HEAD/`last_updated_on`-check MRF URLs, and re-download only changed files - realistically 1-3 TB/quarter of ingress. On a home connection that is 1-3 days of background downloading; ingress to R2 or processing locally is free. Compute: one overnight DuckDB pass. Rebuild + redeploy: minutes of CI; one deploy consumes 1 of Cloudflare's 500 free monthly builds (or 15 of Netlify's 300 credits). Serving cost stays ~$0 with R2's free egress.
- Ongoing gotchas: ~5% of hospital sites block scrapers (send a real User-Agent, be polite), URLs rot between quarters (Serif's data shows this is the main maintenance burden), and the non-TXT tail (~25-30% of hospitals) is manual work - scope (a) or (b) keeps that tail manageable for two people.

## Bottom line

Feasible without a backend at all three scopes, with a clear architecture: DuckDB laptop pipeline -> filtered Parquet -> (i) prerendered Astro hospital pages on Cloudflare Pages, (ii) sharded procedure x geography JSON on R2 (free egress), (iii) a small static search index. Start at one-state scope (thousands of files, hundreds of MB, hours of pipeline time), where every limit above has 10x headroom; top-50-metros fits with the shard-based design; national is possible but requires abandoning fully-prerendered procedure pages in favor of client-side lookups over sharded data, plus accepting ~70-80% automated hospital coverage.

## Sources
- [CMSgov/hospital-price-transparency (schemas, data dictionaries, v3.0 templates)](https://github.com/CMSgov/hospital-price-transparency)
- [CMS CSV data dictionary v3.0 (tall/wide column names incl. median_amount, 10th_percentile, 90th_percentile)](https://github.com/CMSgov/hospital-price-transparency/tree/master/documentation/CSV)
- [CMS CY2026 OPPS final rule HPT fact sheet](https://www.cms.gov/newsroom/fact-sheets/cy-2026-opps-ambulatory-surgical-center-final-rule-hospital-price-transparency-policy-changes)
- [CMS Hospital Price Transparency TXT file FAQs (cms-hpt.txt)](https://www.cms.gov/files/document/hospital-price-transparency-txt-file-frequently-asked-questions-faqs.pdf)
- [CMS hpt-tool TXT generator/validator](https://cmsgov.github.io/hpt-tool/txt-generator/)
- [45 CFR Part 180 (eCFR) - update cadence, shoppable services](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180)
- [Serif Health - Automating HPT v2 data collection (6,120 hospitals, 60.1% txt compliance, 71.5% coverage)](https://www.serifhealth.com/blog/automating-hospital-price-transparency-v2-data-collection)
- [Turquoise Health - 2022 year in review (3 TB hospital corpus vs 630 TB payer)](https://turquoise.health/resources/blog/2022-price-transparency-data-year-in-review)
- [Turquoise Health - How to parse hospital price transparency files](https://turquoise.health/resources/blog/how-to-parse-hospital-price-transparency-files/)
- [AHA - 91% of hospitals (5,763) posting MRFs](https://www.aha.org/news/headline/2024-01-05-analysis-91-hospitals-posting-machine-readable-price-transparency-data)
- [DoltHub - A trillion prices (~70k prices per 9 MB file)](https://www.dolthub.com/blog/2022-09-02-a-trillion-prices/)
- [DoltHub - State of hospital price transparency data (2025)](https://www.dolthub.com/blog/2025-01-28-state-of-hospital-price-transparency-data/)
- [nathansutton/hospital-price-transparency (solo git-scraping of 5,000+ hospitals)](https://github.com/nathansutton/hospital-price-transparency)
- [Row Zero - hospital standard charges files (millions of rows)](https://rowzero.com/blog/hospital-price-transparency-cms-standard-charges-files)
- [Cloudflare Pages limits (20k/100k files, 25 MiB, 500 builds, 20-min timeout)](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare R2 pricing (10 GB free, zero egress)](https://developers.cloudflare.com/r2/pricing)
- [Netlify free plan changes (credit model)](https://www.netlify.com/blog/introducing-netlify-free-plan/)
- [GitHub Pages limits (1 GB site, 100 GB/mo soft bandwidth)](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [phiresky - Hosting SQLite databases on GitHub Pages (sql.js-httpvfs)](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
- [sql.js-httpvfs repo](https://github.com/phiresky/sql.js-httpvfs)
- [GitHub Pages gzip HEAD issue breaking sql.js-httpvfs](https://github.com/github/pages-gem/issues/952)
- [DuckDB-Wasm announcement (HTTP range reads of Parquet)](https://duckdb.org/2021/10/29/duckdb-wasm)
- [Querying multi-GB Parquet in the browser with DuckDB-Wasm](https://tekko.id/en/blog/querying-multi-gb-parquet-files-in-the-browser-with-duckdb-wasm)