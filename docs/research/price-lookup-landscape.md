# Angle 3: Consumer product landscape and the SEO gap for a hospital price lookup site

## 1. What exists today, product by product

### Turquoise Health (turquoise.health/patients)
- What it shows: free consumer search - enter a procedure (colonoscopy, MRI without contrast, knee arthroscopy, CT, newborn delivery, etc.) plus ZIP, optionally add insurance plan, and get facility-by-facility comparisons with "all-in pricing" that bundles multiple service codes into one estimate.
- Data source: hospital and payer price transparency files (MRFs) "validated by first-party contracts." They also run the 5-star MRF compliance scorecard covering ~6,000 hospitals and give researchers a free dataset of 14 shoppable services.
- Free: yes, no signup. They explicitly tell Medicare/Medicaid enrollees not to use it.
- URL structure: app-style, parameter-based, not crawlable landing pages: `turquoise.health/care/search/?service=NU002&action=common-service&plan=specified-no-plan`. This matters - Turquoise's consumer search results essentially cannot rank for long-tail "procedure + city" queries because there are no static indexable pages per procedure/city/hospital.
- Business reality (per KFF Health News, Feb 2026): Turquoise's own executive says the data's real customers are providers and insurers doing contract negotiation ("nine times out of 10... vital piece of the contract negotiation"). The consumer site is a shop window, not the business.

### FAIR Health Consumer (fairhealthconsumer.org)
- What it shows: estimated in-network (allowed amounts by percentile, 20th-90th) and out-of-network/uninsured costs by procedure and geozip; total-treatment-cost scenarios; dental; 300+ shoppable services; NY-specific provider-level charges.
- Data source: NOT MRF data - a private claims database of "tens of billions" of commercial and Medicare claim records contributed by insurers. So it shows market-typical estimates, not a specific hospital's actual posted price, and no hospital-specific cash price.
- Free: yes (English and Spanish).
- URL structure: sectioned app (`/medical`, `/dental/`, `/shoppable-services`, `/insurance-basics/`) - lookups happen inside a widget flow (procedure, then ZIP, then insured status), again with no per-procedure-per-city static pages to rank.

### Healthcare Bluebook - now Valenz Bluebook (healthcarebluebook.com/ui/home)
- What it shows: "Fair Price" benchmarks plus quality ratings for hundreds of common services; green/yellow/red facility pricing in your area.
- Data source: claims-derived proprietary benchmarks, not MRFs.
- Free: effectively no longer a consumer product. Access is employer-sponsored - benefit portals (Vanderbilt HR, school districts, Meritain, etc.) hand out company codes. The open consumer version has withered; the app requires your employer's access. Claimed value: ~$1,500 average savings per shopped procedure.
- SEO footprint: none for consumer queries - it is a gated app.

### CMS Procedure Price Lookup (medicare.gov/procedure-price-lookup/)
- What it shows: for 114 procedures done in both hospital outpatient departments and ambulatory surgical centers, the national average Medicare payment and national average beneficiary copay for each setting. Mandated by the 21st Century Cures Act, launched Nov 2018.
- Data source: Medicare fee schedules (OPPS/ASC rates), not MRFs. Medicare only, national averages only - no local, no commercial, no cash price.
- Free: yes.
- URL structure: search flow on medicare.gov; individual results are query-driven, minimal SEO surface.

### Sage Transparency (dashboard.sagetransparency.com)
- What it shows: hospital-level prices expressed as percent of Medicare, blending RAND Employer Hospital Price Transparency study rounds with Turquoise MRF data and quality data; 4,000+ hospitals, 2,000+ ASCs, plus physician-administered drug prices. Built by the Employers' Forum of Indiana (2022, relaunched 2024).
- Audience: employers, benefits consultants, policymakers - it is a Power BI-style dashboard, not a patient tool. "Percent of Medicare" is meaningless to a typical patient.
- Free: yes. Zero long-tail SEO presence (single dashboard URL).

### Hospital-run estimators
- Every hospital must offer a consumer price estimator tool or shoppable-services display (and post the MRF). Example: Cleveland Clinic's cost estimator plus PDF "patient price lists" per campus at my.clevelandclinic.org/patients/billing-finance/patient-price-lists.
- Problems documented in the literature: estimates differ from phone quotes (secret-shopper studies found online vs phone price discrepancies), tools are hard to find on hospital sites, require knowing billing codes, and there is no audit mechanism for wrong estimates. TechTarget reported most large hospitals lean on estimator tools rather than usable shoppable-service files.

### Adjacent players worth knowing
- MDsave (mdsave.com): a marketplace with pre-negotiated bundled cash prices you can actually buy; strong SEO with procedure x state pages (e.g., `mdsave.com/procedures/colonoscopy/{hash}/florida`). Claimed ~50% average savings. Not MRF-based - it lists its own negotiated prices.
- Sidecar Health care calculator (cost.sidecarhealth.com): free cash-price averages by procedure and state, claims-derived; URL pattern `cost.sidecarhealth.com/c/{procedure}-cost` plus `/browse/{category}` hubs. Big long-tail footprint.
- NewChoiceHealth (newchoicehealth.com): a long-standing lead-gen play. Ranks for "[hospital name] [procedure] cost" queries via facility pages (`/f/{facility-id}/{hospital-slug}/{procedure-slug}`, e.g. `/f/1548430275/cleveland-clinic/magnetic-resonance-imaging-general-mri`) and city pages (`/places/ohio/cleveland/mri`). Data is "proprietary cost analysis algorithms and third party independent sources" - i.e., vague, undated. Monetized with "Get a Free Quote" lead forms.
- PatientRightsAdvocate.org: Hospital Price Files Finder (links to ~6,000 hospitals' MRFs, some normalized) and state-level finders like ohiohospitalpricefinder.patientrightsadvocate.org. Advocacy-oriented; points at files rather than answering "what does it cost."

## 2. The SEO gap - who actually ranks for patient-typed queries

Searches patients actually type: "colonoscopy cost near me", "how much does an MRI cost", "[procedure] cash price [city]", "[hospital name] MRI price". Two strong empirical signals from live SERPs (Aug 2026):

- For "colonoscopy cost": the rankings are dominated NOT by Turquoise/FAIR Health/CMS but by a wave of small, recently launched MRF-scraping SEO sites: loacare.com, tavenhealth.com, procedureradar.com, medicalpricecheck.com, fairvisithealth.com, carepriceguide.com, carecostindex.com, plus coveredusa.org, medicalcostcheck.com, costkits.com, realcostreport.com for MRI queries. Nearly all are dated 2026 - this niche is being filled right now, mostly by thin programmatic sites.
- For "[hospital name] MRI price": NewChoiceHealth's decade-old facility pages plus the hospital's own billing page, and scraper sites like hospitalpriceslist.com. Hospital-specific price queries are the least well served by quality content.

Why the incumbents leave the gap open: Turquoise, FAIR Health, CMS PPL, and Sage all deliver results inside search widgets or dashboards with parameterized URLs. None generate static, indexable procedure x city x hospital pages. The entire long tail is therefore contested only by small independents - which is both the opportunity (a two-person Astro site can compete) and the warning (a dozen lookalikes launched in the last 18 months, so differentiation must come from data quality, freshness under the CY2026 rules, and plain-English explanation, not mere existence).

## 3. Page-architecture patterns visible in the field

Common winning template (procedure guide page):
- URL: `/costs/{procedure}/` or `/guides/procedures/{procedure}-cost` or `/prices/{procedure}`
- Content: national median cash price plus 25th-75th (or 10th-90th) percentile range, count of data points as a trust signal (FairVisitHealth cites "1,629 hospital-disclosed cash prices and 62,999 insurer-negotiated rates for CPT 45378"), CPT/HCPCS codes named explicitly (45378, 45380, 45385 for colonoscopy), "data current as of August 2026" freshness stamp, linked methodology page, FAQ section, cost-factor explainer, links to related procedures.

Procedure x city spokes:
- Loa: `/prices/colonoscopy/boston-ma` (25+ cities per procedure, hub-and-spoke)
- FairVisitHealth: `/cost/colonoscopy/austin` (33 metros)
- CostKits: `/cost/mri/co-grand-junction/` - per-hospital rows ("3 reporting hospitals"), cash vs gross vs negotiated-range columns, published date, FAQ, cross-links to other procedures in the same city and same procedure in other states

Hospital pages:
- NewChoiceHealth: `/f/{id}/{hospital-slug}/{procedure-slug}` plus `/places/{state}/{city}/{procedure}` with breadcrumbs (Home > Directory > Ohio > Cleveland > MRI)
- State-level pages: Sidecar Health `/c/{procedure}-cost` ("cost by state" tables), MDsave `/procedures/{procedure}/{id}/{state}`

The three-axis architecture that covers the query space: (1) procedure hub pages for "how much does X cost", (2) procedure x city pages for "X cost in [city]" / "near me", (3) hospital pages listing all procedures at one facility for "[hospital name] X price". CostKits and NewChoiceHealth are the closest to running all three; nobody does all three with clean, dated, plain-English MRF data.

## 4. Known criticisms a plain-English site can answer

- Usability vs visibility: MRFs are "messy, inconsistent and confusing... buried in spreadsheets... requiring deep knowledge of billing codes" (KFF, Commonwealth Fund, Brookings). Disclosure is not understanding (The Health Care Blog, July 2026).
- Industry capture: KFF Health News / NPR (Feb 2026): "mostly it's the industry using the data" - insurers and health systems use it for negotiations; Yale's Zack Cooper: "there's no evidence that patients use this information." A patient-first presentation is genuinely differentiated.
- Staleness and accuracy: undated data (NewChoiceHealth), identical placeholder ranges across all cities (Loa shows "$1,000-$5,000" for every city - a cautionary tale of thin programmatic content Google may eventually punish), hospital estimators contradicting phone quotes, no audit mechanism for wrong postings.
- Missing cash price: claims-based tools (FAIR Health, Bluebook, Sidecar) cannot show a specific hospital's discounted cash price; CMS PPL is Medicare-only national averages; Bluebook is employer-gated. Only MRF-derived sites can answer "what is the cash price at THIS hospital."
- Incompleteness caveats every serious site now carries: posted prices exclude professional/anesthesia/pathology fees; screening vs diagnostic coding changes colonoscopy prices; MRFs cover hospitals only, not freestanding imaging centers (which are often 4-8x cheaper for MRI).
- The CY2026 hook: with enforcement of the OPPS final rule requirements (actual allowed amounts - median/10th/90th percentiles, NPI disclosure) effective April 1, 2026, files are newly comparable and most competitor content predates or ignores this - a freshness and accuracy wedge.

## 5. Demand and traffic signals (rough)

- MedicalPriceCheck claims ~17,500 searches/month for variants of "how much does a colonoscopy cost" (unverified vendor figure but plausible order of magnitude for a head term; the long tail of procedure x city terms multiplies this).
- Latent, not active, demand: a national survey (JAMA-published, PMC11671781) found <20% of respondents had ever looked up a price before care, 73% did not know they could, and 29% of 18-29 year olds had vs 11% of 65+. An Aug 2026 Center Square/Noble poll of 2,533 voters found 88% say patient access to prices is at least somewhat important.
- Price dispersion is the story that fuels content: brain MRI cash prices range $406-$14,681 (36x) across hospitals; colonoscopy $311-$10,353; same-hospital payer spread (Beaumont Royal Oak: $728 Blue Cross vs $1,801 Humana). These concrete gaps are inherently linkable/shareable content.
- Competitive timing signal: at least 10 small MRF-based consumer SEO sites (Loa, Taven, ProcedureRadar, MedicalPriceCheck, FairVisitHealth, CarePriceGuide, CareCostIndex, CoveredUSA, CostKits, RealCostReport) launched or refreshed content in 2025-2026, while no major incumbent has moved into static SEO pages. The window is open but narrowing.

## Practical takeaways for wellnessmedcare.com

1. The incumbents (Turquoise, FAIR Health, CMS, Sage, Bluebook) all ignore long-tail SEO by design; the only competition on patient-typed queries is thin programmatic sites, several with visibly fake-uniform data.
2. The winning architecture is already legible: `/costs/{procedure}/` hubs + `/costs/{procedure}/{city-state}/` spokes + `/hospitals/{hospital-slug}/` pages, each with: named CPT codes, median plus percentile cash and negotiated figures, per-hospital rows, an as-of date, a methodology page, an honest "what's not included" caveat box, and FAQ markup.
3. Differentiators nobody currently combines: post-April-2026 standardized allowed-amount data (median/10th/90th), plain-English explanation of screening-vs-diagnostic and facility-fee traps, hospital-vs-ASC price framing, and visible data-freshness stamps - directly answering the documented criticisms of every existing tool.

## Sources
- [Turquoise Health - patient price comparison](https://turquoise.health/patients)
- [Healthcare Dive - Turquoise consumer site launch](https://www.healthcaredive.com/news/site-consumers-compare-hospital-prices-tuquoise/620381/)
- [FAIR Health Consumer](https://www.fairhealthconsumer.org/)
- [Valenz (Healthcare) Bluebook home](https://www.healthcarebluebook.com/ui/home)
- [Vanderbilt HR - Valenz Bluebook (employer-gated access)](https://hr.vanderbilt.edu/benefits/healthcare-bluebook/)
- [Medicare Procedure Price Lookup](https://www.medicare.gov/procedure-price-lookup/)
- [CMS press release - Procedure Price Lookup launch](https://cms.gov/newsroom/press-releases/new-online-tool-displays-cost-differences-certain-surgical-procedures)
- [Sage Transparency dashboard](https://dashboard.sagetransparency.com/)
- [Employer Price Transparency Project - Sage Transparency](https://employerptp.org/sage-transparency/)
- [Sage Transparency 2.0 relaunch (PR Newswire)](https://www.prnewswire.com/news-releases/sage-transparency-relaunches-with-new-features-and-new-rand-hospital-price-data-302143543.html)
- [Cleveland Clinic patient price lists](https://my.clevelandclinic.org/patients/billing-finance/patient-price-lists)
- [MDsave marketplace](https://www.mdsave.com/)
- [Sidecar Health cost calculator](https://cost.sidecarhealth.com/)
- [NewChoiceHealth - Cleveland MRI city page](https://www.newchoicehealth.com/places/ohio/cleveland/mri)
- [NewChoiceHealth - Cleveland Clinic MRI facility page](https://www.newchoicehealth.com/f/1548430275/cleveland-clinic/magnetic-resonance-imaging-general-mri)
- [PatientRightsAdvocate - Hospital Price Files Finder](https://www.patientrightsadvocate.org/blog/hospitalpricefilesfinder)
- [Loa - colonoscopy price pages](https://www.loacare.com/prices/colonoscopy)
- [FairVisitHealth - colonoscopy cost guide](https://fairvisithealth.com/costs/colonoscopy/)
- [CostKits - MRI cost Grand Junction CO](https://www.costkits.com/cost/mri/co-grand-junction/)
- [MedicalPriceCheck - colonoscopy cost research](https://medicalpricecheck.com/research/colonoscopy-cost/)
- [ProcedureRadar - colonoscopy cost guide](https://procedureradar.com/guides/colonoscopy-cost)
- [CarePriceGuide - colonoscopy by state](https://www.carepriceguide.com/us/colonoscopy)
- [KFF Health News - industry, not patients, uses transparency data](https://kffhealthnews.org/health-industry/price-transparency-trump-hospitals-insurers-health-care-costs/)
- [NPR - hospitals posting prices, industry using the data](https://www.npr.org/2026/02/10/nx-s1-5704792/health-care-price-transparency-data)
- [KFF - Ongoing challenges with hospital price transparency](https://www.kff.org/health-costs/ongoing-challenges-with-hospital-price-transparency/)
- [Brookings - price transparency rule working, patients need help](https://www.brookings.edu/articles/the-hospital-price-transparency-rule-is-working-but-patients-still-need-help-using-it/)
- [The Health Care Blog - disclosure vs understanding](https://thehealthcareblog.com/blog/2026/07/22/healthcare-has-confused-disclosure-with-understanding/)
- [Healthcare Dive - online vs phone price discrepancies](https://www.healthcaredive.com/news/hospital-price-variation-online-phone-transparency/693866/)
- [TechTarget - large hospitals rely on price estimator tools](https://www.techtarget.com/revcyclemanagement/news/366601354/Large-Hospitals-Using-Price-Estimator-Tools-for-Price-Transparency-Rule)
- [PMC - national survey on price transparency awareness and use](https://pmc.ncbi.nlm.nih.gov/articles/PMC11671781/)
- [The Center Square - Aug 2026 poll on price transparency support](https://thecentersquare.com/national/article_836b2d2d-89e9-4147-b9dc-4fc4790a3b1e.html?a=)
- [CMS - Hospital Price Transparency initiative](https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency)