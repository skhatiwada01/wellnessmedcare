# ANGLE 1 - CMS Hospital Price Transparency MRF Technical Specification (as of August 2026)

## 1. Formats and current schema version

The authoritative spec lives in the CMS GitHub repo: **https://github.com/CMSgov/hospital-price-transparency** (data dictionaries, templates, and JSON schema for 45 CFR Part 180).

Three allowed template layouts, all mandatory-template-based since July 1, 2024:

- **CSV "tall"**: one row per item/service per payer/plan combination (normalized; payer_name and plan_name are columns). Data dictionary: https://github.com/CMSgov/hospital-price-transparency/blob/master/documentation/CSV/README.md
- **CSV "wide"**: one row per item/service, with payer-specific columns generated per payer/plan, e.g. `standard_charge|[payer_name]|[plan_name]|negotiated_dollar` (denormalized; column count explodes with payer count)
- **JSON**: nested schema. Data dictionary: https://github.com/CMSgov/hospital-price-transparency/blob/master/documentation/JSON/README.md. The actual JSON Schema file is `documentation/JSON/schemas/V3.0.0_Hospital_price_transparency_schema.json` in the repo.

**Current version: v3.0 (schema file V3.0.0)**, which encodes the CY2026 OPPS/ASC final rule (CMS-1834-FC, finalized Nov 2025) requirements. Effective January 1, 2026; **CMS enforcement of the new elements began April 1, 2026**. Only .csv and .json are compliant MRF formats (XLSX/XML are not). Prior version v2.2 (the Jan 1, 2025 requirements) is archived in the repo's `archive/` folder.

Repo structure: `documentation/` (CSV and JSON dictionaries + schemas), `examples/`, `resources/`, `archive/`. Policy contact: PriceTransparencyHospitalCharges@cms.hhs.gov.

## 2. Complete required data elements (v3.0, 2026)

### File header / hospital-level (CSV rows 1-2; JSON top level)
- `hospital_name` (legal business name)
- `last_updated_on` (ISO 8601 YYYY-MM-DD; CSV also tolerates M/D/YYYY)
- `version` (CMS template version, i.e. "3.0.0")
- `location_name` (all inpatient locations + standalone EDs covered by the file)
- `hospital_address` (multiple addresses pipe-separated in CSV)
- `type_2_npi` (all active organizational Type 2 NPIs; per CY2026 rule, those with primary taxonomy codes beginning "27" or "28"; pipe-separated in CSV)
- `license_number|[state]` (CSV; JSON uses a `license_information` object)
- **Attestation** (replaces the 2025 "affirmation"): boolean `confirm_attestation`-style true/false plus `attester_name` - the CEO, president, or designated senior official accountable for accuracy. The attestation text (in the CSV header / JSON `attestation` object) affirms the file is true, accurate, and complete, includes all applicable standard charge information and all payer-specific negotiated charges expressible in dollars, and that the hospital included the information necessary to derive charges expressed as percentages or algorithms. JSON top-level required properties: `hospital_name`, `last_updated_on`, `location_name`, `hospital_address`, `type_2_npi`, `license_information`, `attestation`, `version`, `standard_charge_information`.

### Per item/service
- `description`
- `code|[i]` and `code|[i]|type` (CSV allows multiple code pairs). **Code type enum (JSON v3.0.0)**: `CPT`, `HCPCS`, `ICD`, `DRG`, `MS-DRG`, `R-DRG`, `S-DRG`, `APS-DRG`, `AP-DRG`, `APR-DRG`, `TRIS-DRG`, `MS-LTC-DRG`, `APC`, `NDC`, `HIPPS`, `EAPG`, `CMG`, `RC` (revenue code), `CDT`, `CDM`, `LOCAL`
- `setting`: enum `inpatient` | `outpatient` | `both`
- `billing_class` (optional): `professional` | `facility` | `both`
- `modifiers` (CSV) / `modifier_code` and top-level `modifier_information` array (JSON)
- `drug_unit_of_measurement` (numeric) and `drug_type_of_measurement` (enum `GR`, `ME`, `ML`, `UN`, `F2`, `EA`, `GM`) - required when an NDC is used

### Standard charges
- `standard_charge|gross` (gross chargemaster charge)
- `standard_charge|discounted_cash`
- `standard_charge|min` and `standard_charge|max` (de-identified min/max negotiated charge across payers; JSON: `minimum`, `maximum`)
- Payer-specific negotiated charge, per payer_name + plan_name:
  - `standard_charge|negotiated_dollar` (JSON `standard_charge_dollar`)
  - `standard_charge|negotiated_percentage` (JSON `standard_charge_percentage`)
  - `standard_charge|negotiated_algorithm` (JSON `standard_charge_algorithm`)
  - `standard_charge|methodology` - enum: `case rate`, `fee schedule`, `percent of total billed charges`, `per diem`, `other`
  - `additional_payer_notes`, `additional_generic_notes`

### NEW in v3.0 - allowed amount statistics (the CY2026 headline change)
Required **whenever a payer-specific negotiated charge can only be expressed as a percentage or algorithm** (these REPLACE the short-lived 2025 "estimated allowed amount" field, which is phased out in v3.0):

- `median_amount` (CSV tall; wide: `median_amount|[payer_name]|[plan_name]`; JSON: `median_amount`)
- `10th_percentile` (wide: `10th_percentile|[payer_name]|[plan_name]`)
- `90th_percentile` (wide: `90th_percentile|[payer_name]|[plan_name]`)
- `count` - count of allowed amounts/remittances used in the calculation. Encoded as a string with valid values `"0"`, `"1 through 10"` (a literal bucket, for privacy), or a whole number >= 11

Calculation rules per the final rule: must be derived from **EDI 835 electronic remittance advice** or equivalent remittance data; lookback window of no less than 12 and no more than 15 months prior to posting; if a percentile falls between two observed values, use the next highest observed value.

Consumer relevance for your lookup tool: `discounted_cash`, `median_amount`, and the 10th/90th spread are the most consumer-meaningful numbers; `negotiated_dollar` is exact when present; gross charge is nearly meaningless to consumers.

## 3. File naming convention and discovery mechanism

**MRF filename (required, 45 CFR 180.50(d)(5))**: `<ein>_<hospital-name>_standardcharges.[json|csv]` - e.g. `121234567_memorial-hospital_standardcharges.csv`. EIN has no hyphen in practice; one file per hospital location is allowed, and a single file can cover multiple locations.

**Discovery txt file (required since January 1, 2024)**: a plain-text file named **`cms-hpt.txt`** at the **root of the public domain that hosts the MRF** (like robots.txt): `https://www.hospital.com/cms-hpt.txt`. CMS FAQs also permit `/.well-known/cms-hpt.txt`. Required key-value contents, one entry block per hospital location (a single txt file lists all locations):

```
location-name: Worcester Recovery Center and Hospital
source-page-url: https://www.mass.gov/lists/hospital-price-transparency
mrf-url: https://www.mass.gov/doc/wrch-machine-readable-file/download
contact-name: Kathleen Wenzel
contact-email: kathleen.wenzel@mass.gov
```

Fields: `location-name`, `source-page-url` (the web page hosting the MRF link), `mrf-url` (direct link to the file), `contact-name`, `contact-email`. CMS FAQ doc: https://www.cms.gov/files/document/hospital-price-transparency-txt-file-frequently-asked-questions-faqs.pdf (note: cms.gov PDFs block generic fetchers with 403; download in a browser). CMS provides a generator at https://cmsgov.github.io/hpt-tool/txt-generator/.

**This is the crawl entry point for your site**: hospital domain -> `/cms-hpt.txt` -> mrf-url. Hospitals must also ensure the MRF is accessible without login, free of charge, and not blocked from automated crawling.

## 4. The CMS validator

- Tools hub: **https://cmsgov.github.io/hpt-tool/** - hosts the Online Validator (V2.0), the TXT File Generator, and an MRF File Naming Wizard
- Online validator: https://cmsgov.github.io/hpt-tool/online-validator/ - runs client-side in the browser, no formal file size limit (memory-bound), stops after 250 errors
- Validation library (TypeScript, npm `hpt-validator`): https://github.com/CMSgov/hpt-validator
- CLI: https://github.com/CMSgov/hpt-validator-cli (npm `hpt-validator-cli`) - auto-detects .csv/.json, handles .csv.gz/.json.gz, default 1000-error cap (adjustable). Same underlying code as the online tool, so identical results; good for pipeline integration
- What it checks: conformance to the required CMS template layout and data specifications - header structure, required columns/attributes, enums, data types; distinguishes "errors" (noncompliance with already-enforced requirements) from "warnings" (upcoming requirements). Validator FAQs: https://www.cms.gov/files/document/hospital-price-transparency-validator-faqs.pdf

You can reuse `hpt-validator` directly in a Node ingestion pipeline instead of writing your own conformance checks.

## 5. The 70 CMS-specified shoppable services

- Published as **Table 3 (p. 190) of the CY2020 OPPS Price Transparency final rule** (CMS-1717-F2, 84 FR 65524, Nov 2019), and reproduced in the CMS guide "10 Steps to Making Public Standard Charges for Shoppable Services": https://www.cms.gov/files/document/steps-making-public-standard-charges-shoppable-services.pdf
- Four categories: evaluation & management, laboratory & pathology, radiology, medicine & surgery
- Code types used: **CPT** (most, e.g. 90832 psychotherapy 30 min, 90834 psychotherapy 45 min, 99203 new patient office visit), **HCPCS**, and **MS-DRG** (inpatient surgical services like joint replacement DRG 470)
- Context: hospitals must display 300 shoppable services (the 70 CMS-specified plus 230 hospital-selected) in a consumer-friendly way, marking "not offered" where applicable - OR satisfy this via an internet price estimator tool, which most large hospitals do. The MRF itself is the reliable machine source; the 70-service list is a good curated starting scope for a consumer lookup UI
- Regulatory basis: 45 CFR 180.60; MRF requirements are 45 CFR 180.50 (https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180)

## 6. File size reality

No official cap exists. Reported practice:

- Small community hospitals: single-digit MB CSVs (thousands of rows)
- **Large academic medical centers: routinely exceed 500 MB, 2-5 million rows when expanded** (payer x plan x code combinatorics)
- Worst cases: multi-GB files, especially denormalized JSON - DoltHub (which aggregated 1,000+ hospital MRFs) notes the de-normalized JSON format "balloons" files with duplicated information; CSV "wide" files can reach thousands of columns instead
- Hospital MRFs are far smaller than payer Transparency in Coverage files (those run to hundreds of GB each, e.g. Cigna PPO 650 GB compressed - a different program, don't confuse the two), but streaming parsers are still advisable: assume worst case of several GB, gzip-compressed variants exist (.csv.gz/.json.gz per the CMS CLI), and gzip is non-seekable so plan for full-stream processing
- Practical implication for a static Astro site: you cannot serve or client-parse raw MRFs. You need an offline ingestion step (streaming CSV/JSON parse, filter to a target code list such as the 70 shoppable services, emit small per-hospital or per-procedure JSON slices to the CDN)

## Key gotchas for implementation

1. Hospitals choose tall CSV, wide CSV, or JSON freely - you must parse all three; wide CSV has dynamic per-payer column names you must pattern-match (`standard_charge|Aetna|PPO|negotiated_dollar`)
2. The `count` field is a string with the literal bucket `"1 through 10"` - do not parse it as a number naively
3. `9` in `90th_percentile` / `10th_percentile` means JSON keys start with digits - fine in JSON, but awkward as identifiers in some typed languages
4. Percentile fields only appear where the negotiated charge is percentage/algorithm-based; many rows will have `negotiated_dollar` and no percentiles
5. Enforcement of v3.0 started April 1, 2026, so in August 2026 most hospitals should be on v3.0, but expect stragglers still posting v2.2 files without percentile fields - check the `version` field and degrade gracefully

## Sources
- [CMSgov/hospital-price-transparency GitHub repo (schemas and data dictionaries)](https://github.com/CMSgov/hospital-price-transparency)
- [CSV Data Dictionary v3.0](https://github.com/CMSgov/hospital-price-transparency/blob/master/documentation/CSV/README.md)
- [JSON Data Dictionary v3.0](https://github.com/CMSgov/hospital-price-transparency/blob/master/documentation/JSON/README.md)
- [V3.0.0 JSON Schema file](https://github.com/CMSgov/hospital-price-transparency/blob/master/documentation/JSON/schemas/V3.0.0_Hospital_price_transparency_schema.json)
- [CMS fact sheet: CY2026 OPPS/ASC final rule hospital price transparency policy changes](https://www.cms.gov/newsroom/fact-sheets/cy-2026-opps-ambulatory-surgical-center-final-rule-hospital-price-transparency-policy-changes)
- [CMS webinar slides: HPT CY2026 OPPS/ASC final rule](https://www.cms.gov/files/document/webinar-hospital-price-transparency-cy2026-opps-asc-final-rule-slides.pdf)
- [CMS HPT Tools hub (online validator, TXT generator, naming wizard)](https://cmsgov.github.io/hpt-tool/)
- [hpt-validator library](https://github.com/CMSgov/hpt-validator)
- [hpt-validator-cli](https://github.com/CMSgov/hpt-validator-cli)
- [CMS Validator FAQs PDF](https://www.cms.gov/files/document/hospital-price-transparency-validator-faqs.pdf)
- [CMS TXT File FAQs PDF](https://www.cms.gov/files/document/hospital-price-transparency-txt-file-frequently-asked-questions-faqs.pdf)
- [CMS HPT TXT Generator](https://cmsgov.github.io/hpt-tool/txt-generator/)
- [Example live cms-hpt.txt entry (Mass.gov WRCH)](https://www.mass.gov/lists/hospital-price-transparency)
- [45 CFR 180.50 (eCFR)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180/subpart-B/section-180.50)
- [CMS 10 Steps: shoppable services (70-service list)](https://www.cms.gov/files/document/steps-making-public-standard-charges-shoppable-services.pdf)
- [CY2020 OPPS price transparency final rule fact sheet (CMS-1717-F2)](https://www.cms.gov/newsroom/fact-sheets/cy-2020-hospital-outpatient-prospective-payment-system-opps-policy-changes-hospital-price)
- [Gigasheet: Hospital Price Transparency Changes for 2026](https://www.gigasheet.com/post/hospital-price-transparency-changes-for-2026)
- [Stroudwater: CMS CY2026 updates to HPT and MRF requirements](https://www.stroudwater.com/cmss-cy-2026-updates-to-hospital-price-transparency-and-machine-readable-file-requirements/)
- [Dentons: enforcement begins April 1, 2026](https://www.dentonshealthlaw.com/cms-enforcement-of-updated-hospital-price-transparency-requirements-to-begin-on-april-1-2026/)
- [DoltHub: State of Hospital Price Transparency Data](https://www.dolthub.com/blog/2025-01-28-state-of-hospital-price-transparency-data/)
- [HospitalCostData: MRF glossary (file size reality)](https://www.hospitalcostdata.com/glossary/machine-readable-file)
- [Serif Health: Learnings from MRF Land (payer-side scale, parsing tactics)](https://www.serifhealth.com/blog/learnings-from-mrf-land)
- [Drupal HPT module docs: cms-hpt.txt fields](https://www.drupal.org/docs/extending-drupal/contributed-modules/contributed-module-documentation/hospital-price-transparency/how-to-manage-your-cms-hpttxt-file)