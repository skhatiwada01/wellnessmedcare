---
title: How to Find What a Procedure Actually Costs
description: Hospitals and insurers are now required to publish their real negotiated prices. Here is where those files are, what changed in 2026, and how to use them before you book.
pillar: find-care
order: 1
updated: 2026-08-23
sources:
  - label: 'CMS - Hospital Price Transparency'
    url: 'https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency'
  - label: 'CMS - CY 2026 OPPS and ASC final rule, hospital price transparency policy changes'
    url: 'https://www.cms.gov/newsroom/fact-sheets/cy-2026-opps-ambulatory-surgical-center-final-rule-hospital-price-transparency-policy-changes'
  - label: 'CMS - Steps for making public hospital standard charges in a machine-readable format'
    url: 'https://www.cms.gov/files/document/steps-machine-readable-file.pdf'
  - label: 'CMS - No Surprises: What is a good faith estimate?'
    url: 'https://www.cms.gov/files/document/nosurpriseactfactsheet-whats-good-faith-estimate508c.pdf'
---

For most of American history, asking what a medical procedure costs got you a shrug. That is no longer technically true. Since 2021, every hospital has been required to publish its actual negotiated prices, and since 2022 insurers have had to publish theirs.

The data is public. It is also enormous, inconsistent, and clearly not designed for you. But it is there, and knowing how to reach it changes what you can do before a scheduled procedure - and what you can say afterward when the bill arrives.

## The four places a price can come from

**1. The hospital's consumer display.** Every hospital must post a consumer-friendly list of prices for shoppable services - the 70 services CMS specifies, plus enough of the hospital's own choosing to reach at least 300 total. Many hospitals satisfy this with an online price estimator tool. Search the hospital's name plus "price estimator" or "standard charges."

This is the easiest place to start and usually enough.

**2. The machine-readable file.** The complete list of every standard charge the hospital has, including the rate negotiated with each individual insurer. It lives at a predictable location on the hospital's domain and is typically JSON or CSV. It is not friendly, but it is comprehensive.

**Something important changed here for 2026.** Hospitals must now encode the **median allowed amount** along with the **10th and 90th percentile** of amounts actually allowed, calculated from real remittance data over a 12-to-15-month lookback, and must attest that the file is true, accurate, and complete. Enforcement of the new requirements began April 1, 2026.

That is a meaningful shift. Previously the files listed negotiated rates that were often theoretical. Now they carry a distribution of what was actually paid - which is exactly the benchmark you want when you are trying to work out whether a bill is reasonable or [negotiate one down](/guides/negotiate-a-medical-bill/).

**3. Your insurer's cost estimator.** Most plans have one in the member portal, and this is the only source that accounts for your specific plan, your deductible progress, and your network. It is the best predictor of *what you will pay*, as distinct from *what the service costs*.

**4. A good faith estimate.** If you are uninsured or paying cash, providers must give you a written estimate before scheduled care - and if the final bill lands $400 or more above it, a [federal dispute process](/guides/no-surprises-act/) opens up. This is the strongest of the four, because it comes with a remedy attached.

## Getting a usable number before a scheduled procedure

<ol class="steps">
<li><strong>Get the codes.</strong> Ask the ordering office for the CPT or HCPCS codes for the planned service. Without the codes you cannot compare anything to anything. They are on the order and the office can tell you.</li>
<li><strong>Ask what else gets billed separately.</strong> A procedure usually generates several bills: the facility, the physician, anesthesia, pathology, radiology. Ask which of these will bill separately and whether each is in your network. This is where costs hide.</li>
<li><strong>Check your insurer's estimator</strong> using those codes, at that specific facility.</li>
<li><strong>Check the hospital's consumer display</strong> for the same codes, as a cross-reference.</li>
<li><strong>If uninsured or paying cash, request a good faith estimate in writing.</strong> Keep it, and compare it against the final bill.</li>
<li><strong>Ask whether an outpatient or ambulatory surgery center is an option.</strong> The same code at a hospital outpatient department and at a freestanding center can differ substantially. This is a billing question about site of service, not a clinical one - your clinician decides what is appropriate, and you can ask about the cost difference between appropriate settings.</li>
</ol>

## Reading a machine-readable file without losing your afternoon

If the consumer display does not have what you need, the full file will - but treat it carefully.

- Find the file link on the hospital's site, usually in the footer or a page named "standard charges" or "price transparency"
- These files are large. Opening one in a spreadsheet program may fail; a text editor that streams large files handles it better
- Filter to your CPT code first, then to your specific insurer and plan
- Read the column headers carefully. Gross charge, discounted cash price, payer-specific negotiated rate, and the new median and percentile fields are all different numbers, and confusing them will mislead you badly

Data quality still varies a great deal between hospitals. Treat any single figure as an indication rather than a quote.

## What these numbers can and cannot tell you

**They can** tell you the order of magnitude, show you the spread between facilities for the same service, and give you a defensible anchor when a bill seems far out of line.

**They cannot** tell you what you will owe. Your deductible progress, your coinsurance, your network status, and whatever complications occur decide that. A price file describes the service; your plan describes your share of it.

And none of this is a substitute for clinical judgment. Price is one input into where you get care, and it is not the most important one. What we can help with is making sure the price is not a surprise.

## The realistic advice

For anything scheduled and non-urgent, spending thirty minutes on the codes, the separate billers, and your insurer's estimator is the highest-return thing you can do. It will not produce an exact figure, but it will tell you whether you are looking at a few hundred dollars or several thousand - and that is usually the decision that matters.

For emergencies, none of this applies, and you should not think about it. Get care. Sort the bill out afterward, with the [protections that exist for exactly that situation](/guides/no-surprises-act/).
