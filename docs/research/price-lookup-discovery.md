# Angle 2: Discovering and acquiring hospital MRFs at scale

## 1. Enumerating US hospitals: which CMS dataset to use as the master list

Three public CMS datasets cover this; use the first as the primary spine and the others for enrichment.

**a) Hospital General Information (Provider Data Catalog) - recommended primary list**
- Landing page: https://data.cms.gov/provider-data/dataset/xubh-q36u
- Direct CSV (verified live, Aug 2026): https://data.cms.gov/provider-data/sites/default/files/resources/893c372430d9d71a1c52737d01239d47_1785189955/Hospital_General_Information.csv (the hash in the path changes each refresh; resolve it via the metastore API below)
- Stable metadata API: `https://data.cms.gov/provider-data/api/1/metastore/schemas/dataset/items/xubh-q36u` returns the current downloadURL. There is also a datastore query API for row-level access.
- Data dictionary: https://data.cms.gov/provider-data/sites/default/files/data_dictionaries/hospital/HOSPITAL_Data_Dictionary.pdf
- Fields: Facility ID (the 6-char CCN), Facility Name, Address, City/Town, State, ZIP Code, County, Telephone Number, Hospital Type (Acute Care, Critical Access, Childrens, Psychiatric, Rural Emergency, etc.), Hospital Ownership, Emergency Services, overall star rating. Roughly 5,400 rows.
- Freshness: verified modified 2026-07-22, released 2026-08-13. Public data, no license restrictions (US Government work).
- Caveat: limited to Medicare-certified hospital types shown on Care Compare; the HPT rule applies to all licensed hospitals (about 7,000 including some non-Medicare facilities), so this list slightly undercounts the regulated universe.

**b) Provider of Services (POS) file - QIES** - the research-grade census
- Landing page: https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file-quality-improvement-and-evaluation-system (verified modified 2026-07-16; the companion "Internet Quality Improvement and Evaluation System" POS file was modified 2026-08-10)
- One record per CCN for hospital and non-hospital facilities; adds bed counts, ownership type, certification dates, sub-provider detail. Updated quarterly. Fully API-enabled via the data.cms.gov API (https://data.cms.gov/api-docs).

**c) Hospital Enrollments (PECOS-derived)**
- https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/hospital-enrollments (verified modified 2026-08-17). Adds enrollment IDs, NPIs, organization names, practice locations. Useful because the CY2026 rule now requires hospitals to encode organizational NPIs in the MRF - this dataset gives you the NPI-to-CCN join.

**Critical gap: none of these CMS datasets contain the hospital's website domain.** That is the missing link for cms-hpt.txt discovery. Options: (1) reuse the Persius/TPAFS hospitals.csv and machine_readable_links.csv which include homepage/source URLs (stale but a good seed); (2) join on NPI to NPPES (also has no website field, so not helpful); (3) programmatic search (e.g. name + city queries) with manual cleanup. Serif Health's writeup (below) confirms everyone bootstraps domain lists this way.

## 2. cms-hpt.txt: the standard location file, and whether a central registry exists

**The requirement (45 CFR 180.50, in force since Jan 1 2025):** every hospital must place a TXT file named exactly `cms-hpt.txt` at the root of the public website domain that hosts its MRF (CMS guidance also permits `/.well-known/cms-hpt.txt`). Exact required fields per MRF entry, verified from live hospital files and CMS docs:
- `location-name`
- `source-page-url`
- `mrf-url`
- `contact-name`
- `contact-email`
One TXT file can list multiple hospital locations/MRFs. The regulation also requires a footer link labeled "Price Transparency" on the homepage. Live examples: https://www.marshfieldclinic.org/cms-hpt.txt, https://www.logan.org/cms-hpt.txt. CMS's own generator/validator: https://cmsgov.github.io/hpt-tool/txt-generator/ and the validator repo https://github.com/CMSgov/hpt-tool; template/data-dictionary repo https://github.com/CMSgov/hospital-price-transparency.

**No centralized CMS registry exists.** CMS does not host MRFs or maintain a public list of MRF URLs. The CY2026 OPPS final rule (CMS-1834-FC, fact sheet at https://www.cms.gov/newsroom/fact-sheets/calendar-year-2026-hospital-outpatient-prospective-payment-system-opps-ambulatory-surgical-center) added the percentile allowed amounts (10th/median/90th), EDI 835 sourcing, named-attester attestation, and NPI encoding (effective Jan 1 2026, enforcement Apr 1 2026) - but did NOT finalize any submit-your-MRF-to-CMS mechanism or central repository. A May 2025 CMS RFI on MRF accuracy/completeness floated improvements, so this could change, but as of Aug 2026 discovery is crawl-it-yourself.

**Real-world crawl economics (Serif Health, late 2024, best published numbers):** starting from ~2,771 unique hospital domains, cms-hpt.txt fetch succeeded for 60.1% (another 5.1% were bot-blocked by request filtering - note this arguably violates 180.50(d)(2)'s "accessible to automated searches" requirement). From 1,666 retrieved TXT files they extracted 3,853 distinct MRF URLs covering 4,379 hospital locations (~71.5% of their target universe). Files were at domain root, not .well-known, in practice. The remainder needed manual work: ~10 min/hospital for malformed TXT files, ~30 min/hospital for the ~1,741 with no TXT file at all; they estimate ~1,000 labor hours for full national coverage and recommend a small dedicated team for ongoing maintenance. Source: https://www.serifhealth.com/blog/automating-hospital-price-transparency-v2-data-collection

## 3. Existing open aggregations - status check (mostly stale or UI-only)

**DoltHub (dolthub.com)** - the historical open corpus, now frozen.
- Repos: `dolthub/hospital-price-transparency` (v1, Q1 2021), `-v2` (Q2 2021), `-v3` (Q2 2022), `dolthub/transparency-in-pricing` (v4, current-last, ~1,000+ hospitals, data through Q3 2023), plus `dolthub/standard-charge-files` (a table of MRF URLs) and `dolthub/hospital-prices-allpayers`.
- Peak coverage: ~1,800 of ~6,000 hospitals (~30%), ~300M price rows.
- Freshness: collection STOPPED; DoltHub exited the bounty business Sept 2023; their Jan 2025 blog (https://www.dolthub.com/blog/2025-01-28-state-of-hospital-price-transparency-data/) confirms no updates for over a year. Useless for a live consumer tool, fine for prototyping schema/ETL.
- Access: `dolt clone dolthub/transparency-in-pricing`, then local SQL; DoltHub also has a web SQL API. No explicit data license is published on the repos; the underlying prices are federally mandated public disclosures (see section 5), and DoltHub describes the data as free to use.

**Payless Health / One Fact Foundation - effectively dormant.**
- The payless.health domain currently fails DNS resolution (verified Aug 2026: `getaddrinfo ENOTFOUND payless.health`). GitHub org https://github.com/onefact shows activity tapering off after Oct 2024.
- What existed: `data.payless.health` S3 bucket + CloudFront with parquet files organized by source (cms.gov, hospitals, payers), a dbt-managed OMOP-extension common data model (repos: onefact/payless.health-data-processing, Apache-2.0; onefact/data_build_tool_payless.health), claims of linking rates for 7,000+ hospitals, visualizations of 106,000+ prices.
- AWS Open Data: NOT currently listed on https://registry.opendata.aws/ (verified - no hospital price transparency or payless/onefact entry). Treat any surviving S3 objects as unmaintained.
- Verdict: do not build on it; the code and CDM design are reusable under Apache-2.0.

**Persius / TPAFS transparency-data - the only open MRF-URL registry, but stale.**
- https://github.com/TPAFS/transparency-data: `price_transparency/hospitals/machine_readable_links.csv` (MRF URLs per hospital) plus hospitals.csv metadata. This was the seed list Serif Health used.
- Freshness: last push 2023-11-05 (verified via GitHub API). License: data under CC BY-SA 4.0, code Apache-2.0. Good seed corpus; expect heavy link rot (MRF URLs change constantly, often per-quarter with vendor-hosted hash URLs like `apim.services.craneware.com/api-pricing-transparency/api/public/<hash>/charges/mrf`).

**PatientRightsAdvocate.org (PRA) - freshest open aggregation, but UI-oriented.**
- Hospital Price Files Finder: https://hospitalpricingfiles.org (also hospitalpricingfiles.patientrightsadvocate.org, plus state subdomains like oh.hospitalpricingfiles.org). Indexes pricing files for ~6,000 hospitals nationwide, searchable by state/region; PRA converts files "to a standard, accessible format where necessary." Announcement: https://www.patientrightsadvocate.org/blog/hospitalpricefilesfinder
- No documented bulk download, API, or explicit reuse license; it is a © PatientRightsAdvocate.org site, so scraping their normalized files would need permission - but the MRF URLs it surfaces point to hospital-published files which carry no such restriction. Worth emailing them; they are mission-aligned with consumer tools.
- Semi-annual compliance reports (https://www.patientrightsadvocate.org/pra-reports): most recent (7th report, 2026) found only 21.1% of 2,000 reviewed hospitals fully compliant, down from 34.5% (Feb 2024) and 36% (Jul 2023). The report appendices list reviewed hospitals with file URLs - useful as a QA/coverage benchmark. Note their methodology is contested by industry (Cleverley & Associates critique).

**CMS itself:** only templates, data dictionaries, and validators (github.com/CMSgov/hospital-price-transparency, github.com/CMSgov/hpt-tool) - no data hosting.

## 4. Commercial aggregators

**Turquoise Health** - the market leader.
- Licenses data via annual subscription; pricing not public, scoped per customer (company type, product, geography); reported as license fee + recurring annual fee, generally an enterprise price point (five to six figures/yr in industry reporting). Free "Community Health Tier" exists for limited use (https://turquoise.health/legal/community-health-tier-terms-conditions), and they license to academic researchers via AcademyHealth's Health Data for Action program.
- Consumer Pricing API (https://turquoise.health/api/docs/) covers hospital rates and insurance-aware estimates.
- Terms forbid exactly what a republish-to-consumers site would do: the Consumer Terms of Use (https://turquoise.health/legal/consumer-terms-of-use) prohibit "any deep-link, page-scrape, robot, spider, or other automatic device... to access, acquire, copy or monitor any portion of the Platform"; data use in consulting, industry-sponsored research, or for-profit-funded projects requires prior written approval. Redistribution/republication of licensed data is restricted. Conclusion: not a fit for a free static consumer site unless you negotiate a specific redistribution license.
- Similar commercial players: Serif Health (strongest on payer TiC files, also sells hospital rate feeds), Payerset (payerset.com, "data lake" model), Mathematica's Health Care Price Transparency Data Solution on AWS Marketplace (https://aws.amazon.com/marketplace/pp/prodview-tufqagagjnr6u), Clarify, Trilliant. All are paid B2B licenses with no-redistribution clauses; none publish price lists.

## 5. Legal/licensing status of the MRF data itself

- The regulation is explicitly designed for free automated reuse. 45 CFR 180.50(d)(2) requires the MRF be available "free of charge," "without having to establish a user account or password," "without having to submit personal identifying information," and accessible "to automated searches and direct file downloads through a link posted on a publicly available website"; the file must be digitally searchable (https://www.law.cornell.edu/cfr/text/45/180.50; current eCFR: https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180). 180.50(c) requires a non-proprietary open format "made available to the public without restrictions that would impede the re-use of that information."
- Practical implication: hospitals may not lawfully gate MRFs behind click-through terms, CAPTCHAs, or bot-blocking. Some still do (Serif found 5.1% of domains bot-blocked; some vendor portals like Craneware/Panacea serve MRFs from hashed API URLs). These are compliance failures on the hospital's side, reportable to CMS - PRA's reports treat them as violations. When you hit a block, a plain user-agent plus the txt-file-listed mrf-url usually works; persistent blocks can be reported via the CMS HPT complaint form (linked from https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency).
- The price data itself is factual (prices, codes, payer names) and facts are not copyrightable (Feist); the disclosure is federally mandated public information. No known case law or CMS guidance restricts republishing MRF contents. Hospitals occasionally slap generic website ToS on the hosting page, but the regulation's "without restrictions that would impede re-use" language undercuts enforceability against reuse of the MRF itself, and there are no known enforcement actions against republishers (DoltHub, PRA, and Turquoise have all republished at scale since 2021 without challenge).
- What IS restricted: third-party aggregators' normalized/enriched versions (Turquoise, Payerset, PRA's converted files) carry their own terms. Republish from the hospital-published originals and you are clean; attribute the source hospital and file date, and keep the attestation/affirmation fields.

## Bottom line for a two-person static-site team

There is no maintained free national feed. The realistic pipeline: CMS Hospital General Information CSV (CCN spine, refreshed quarterly via the metastore API) -> seed domains from TPAFS machine_readable_links.csv + PRA finder spot checks -> crawl `https://{domain}/cms-hpt.txt` (then `/.well-known/cms-hpt.txt`) -> parse the 5 fields -> fetch MRFs. Expect ~60-70% automated coverage, budget manual effort or accept partial coverage, and re-crawl at least quarterly because MRF URLs rot. The data itself is free to republish; the only licensing landmines are third-party normalized datasets.

## Sources
- [Hospital General Information dataset (CMS Provider Data Catalog)](https://data.cms.gov/provider-data/dataset/xubh-q36u)
- [Provider of Services File - QIES (data.cms.gov)](https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file-quality-improvement-and-evaluation-system)
- [Hospital Enrollments dataset (data.cms.gov)](https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/hospital-enrollments)
- [data.cms.gov API docs](https://data.cms.gov/api-docs)
- [CMS Hospital Price Transparency hub](https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency)
- [CMS HPT TXT file FAQs (PDF)](https://www.cms.gov/files/document/hospital-price-transparency-txt-file-frequently-asked-questions-faqs.pdf)
- [CMS HPT TXT Generator tool](https://cmsgov.github.io/hpt-tool/txt-generator/)
- [CMSgov/hospital-price-transparency (templates and data dictionary)](https://github.com/CMSgov/hospital-price-transparency)
- [CMSgov/hpt-tool validator](https://github.com/CMSgov/hpt-tool)
- [45 CFR 180.50 (Cornell LII)](https://www.law.cornell.edu/cfr/text/45/180.50)
- [45 CFR Part 180 (eCFR)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180)
- [CY2026 OPPS/ASC Final Rule fact sheet (CMS-1834-FC)](https://www.cms.gov/newsroom/fact-sheets/calendar-year-2026-hospital-outpatient-prospective-payment-system-opps-ambulatory-surgical-center)
- [Holland & Knight on CY2026 OPPS HPT changes](https://www.hklaw.com/en/insights/publications/2025/11/cms-releases-cy-2026-hospital-opps-and-ambulatory-surgical-center)
- [Stroudwater on CY2026 MRF requirements](https://www.stroudwater.com/cmss-cy-2026-updates-to-hospital-price-transparency-and-machine-readable-file-requirements/)
- [Serif Health: Automating HPT v2 data collection (crawl statistics)](https://www.serifhealth.com/blog/automating-hospital-price-transparency-v2-data-collection)
- [TPAFS/transparency-data (open MRF URL registry)](https://github.com/TPAFS/transparency-data)
- [DoltHub: State of Hospital Price Transparency Data (Jan 2025)](https://www.dolthub.com/blog/2025-01-28-state-of-hospital-price-transparency-data/)
- [DoltHub transparency-in-pricing repo](https://www.dolthub.com/repositories/dolthub/transparency-in-pricing)
- [DoltHub bounty retrospective (coverage numbers)](https://www.dolthub.com/blog/2022-04-22-hospital-price-transparency-retrospective/)
- [PRA Hospital Price Files Finder announcement](https://www.patientrightsadvocate.org/blog/hospitalpricefilesfinder)
- [PRA Hospital Price Files Finder](https://hospitalpricingfiles.org/)
- [PRA semi-annual compliance reports](https://www.patientrightsadvocate.org/pra-reports)
- [PRA 2026 report: 21.1% compliance](https://www.patientrightsadvocate.org/blog/new-report-just-21-of-us-hospitals-complying-with-federal-price-transparency-rule)
- [Turquoise Health Consumer Terms of Use](https://turquoise.health/legal/consumer-terms-of-use)
- [Turquoise Health Community Health Tier terms](https://turquoise.health/legal/community-health-tier-terms-conditions)
- [Turquoise Health Consumer Pricing API docs](https://turquoise.health/api/docs/)
- [Turquoise Health data description (AcademyHealth)](https://academyhealth.org/sites/default/files/turquoise_health_data_description.pdf)
- [onefact/payless.health-data-processing](https://github.com/onefact/payless.health-data-processing)
- [One Fact Foundation GitHub org](https://github.com/onefact)
- [Registry of Open Data on AWS](https://registry.opendata.aws/)
- [Mathematica Price Transparency Data Solution (AWS Marketplace)](https://aws.amazon.com/marketplace/pp/prodview-tufqagagjnr6u)
- [Example live cms-hpt.txt (Marshfield Clinic)](https://www.marshfieldclinic.org/cms-hpt.txt)