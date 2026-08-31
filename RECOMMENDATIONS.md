# Recommendations

**Date:** August 31, 2026. Produced by a full-site audit (liability, data flow,
content quality) plus a content expansion pass. Three sections: what the audit found
and what was changed, what was added, and the prioritized backlog of changes still
needed - with who has to act on each.

---

## 1. Audit results

Three independent adversarial reviews ran against the entire repo: a
healthcare-attorney/clinician lens over all content, the same lens over all data
files and tools, and a privacy-engineer review of every line of client-side code.

### Liability: sound, after 8 fixes (all applied)

The reviewers' overall verdict: "unusually disciplined for a no-clinician consumer
health property." Across 98 lab entries, 55 glossary terms, 57 trackers, and 19 tips
at time of audit: zero reference ranges, zero diagnoses applied to the reader, zero
drug or dosage advice. The 8 must-fix findings, all now corrected in the working tree:

1. **HSA guide gave directive financial advice** ("fund the HSA first", "the FSA is
   your tool") - rewritten to descriptive register with a pointer to tax
   professionals.
2. **HSA tax tool recommended payroll routing** - now states the arithmetic
   difference instead of the recommendation.
3. **HSA tax tool recommended the deferred-reimbursement investment strategy** - now
   describes the rule, attributes the strategy to "some account holders," and defers
   to a tax professional.
4. **Financial assistance guide implied a guaranteed outcome** and overstated the
   501(r) charge cap (it applies only to patients determined eligible) - both
   corrected.
5. **A lab-report tip contained reverse triage** ("do not book an emergency visit
   over a flagged value with no symptoms") - the urgency judgment is now explicitly
   assigned to the clinician's office or nurse line.
6. **The homepage claimed "nothing you type leaves your device" absolutely** while
   the newsletter form (when enabled) sends an email address - the claim is now
   scoped to tools, with the newsletter named as the single exception.
7. **A new tip promised "one of those wins appeals"** - softened to evidence
   language.
8. Form hardening: a site-wide guard now blocks implicit Enter-key submission on
   action-less tool forms, which could otherwise leak typed values into URL query
   strings (working-tree change; ships with the next PR).

Ten further substantive corrections were applied from the nice-to-fix lists: a stale
NICE citation (CG189 -> NG246), the HIPAA amendment letter now notes the permitted
30-day extension, a 501(r) "right" overclaim softened, the preventive-care caveat
tightened, an editing artifact in the lymphocytes entry removed, LDL
"treatment goal" phrasing reworded, exercise-clearance framing corrected, two
"one call settles it" overclaims softened, and privacy-policy wording made
internally consistent (see below).

### New content: source-verified

All 29 primary-source URLs cited by the 9 new guides were fetched live and confirmed
to be the claimed sources. Five factual errors the source-check caught (an IRS
citation mismatch on 2026 HSA limits, a HealthCare.gov contradiction on switching
from COBRA mid-window, a Medicare "approved amount" nuance, a certification-lookup
detail, an FDCPA 30-day caveat) were corrected before integration.

### Data flow: the no-transmission claim is TRUE as shipped

A privacy engineer reviewed every script in `src/`. Findings:

- **Zero network calls carry reader-typed data.** No fetch/XHR/beacon/WebSocket in
  any tool. Word/CSV generation and printing are fully local.
- **Storage is two localStorage keys**, both choices rather than typed input: theme
  and analytics consent. Nothing a reader types is persisted anywhere.
- **Third-party requests**: Google Analytics loads only after explicit consent
  (verified: zero requests to Google before accept). The newsletter form, when
  enabled, POSTs the email directly to the configured provider - now accurately
  described in the privacy policy ("goes directly to our email service provider").
  Pagefind search fetches index fragments from this site's own origin only.
- **Two wording fixes applied** so every claim is exactly true (homepage scope fix,
  privacy policy consistency between its "short version" and its details section).

**Remaining data-flow decisions for you** (not defects, choices):

- **GoatCounter, if ever enabled, loads without a consent gate.** It is cookieless
  and stores no personal data, which is the standard justification, but it does send
  page, referrer, and user-agent to gc.zgo.at per view. If you want one uniform
  standard, gate it behind the same consent banner as GA (small change).
- **GA's measurement ID is baked into every production build** (by your request).
  The consent gate protects visitors; just be aware every deploy is a live-analytics
  deploy unless `PUBLIC_GA_MEASUREMENT_ID=` (empty) is set.

---

## 2. What was added in this pass

| Area | Added | Now |
| --- | --- | --- |
| Guides | 9 (SBC, preventive vs diagnostic, mid-treatment insurance changes, medical debt + credit, prior auth, ER/urgent care/telehealth costs, COBRA vs marketplace, open enrollment, vetting a doctor) | 19 |
| Lab tests | 14 (lipase, amylase, LDH, ammonia, haptoglobin, blood type, celiac genetics, drug-level monitoring x3, rapid tests x4) + 2 new panels | 112 across 15 panels |
| Glossary | 24 terms (observation status, facility fee, step therapy, self-funded plans, Medicare Advantage/Medigap, copay accumulators...) | 79 |
| Tips | 6 (hospital stay, after discharge, before a procedure, calling your insurance, new-diagnosis organizing, personal health record) | 25 |
| Calculators | 2: plan comparison (best case / your estimate / worst case, math verified), COBRA vs marketplace (deductible-reset effect, math verified) | 11 |
| Navigation | **/start/** - a scenario hub ("I got a bill", "a claim was denied", "I got lab results"...) that sequences existing pages; now the homepage's primary button | - |
| Syndication | RSS feed at /rss.xml with autodiscovery | - |

Total: 184 pages, all internal links verified, zero em dashes, build green.

---

## 3. Changes still needed - the prioritized backlog

### Requires you (cannot be done by the site itself)

1. **Deploy.** The site has been launch-ready for a while; every week undeployed is
   SEO seasoning lost. Then work POST-DEPLOYMENT.md top to bottom.
2. **Lawyer review of /privacy/ and /terms/** - still drafts. One to two hours.
3. **Decide the GoatCounter consent question** above if you ever enable it.
4. **Branch protection + CI** once on GitHub: a PR check that runs `npm run build`
   plus the link check would have caught every integration error made during
   development. Happy to wire the GitHub Action.

### High value, buildable next (in order)

5. **Hospital price lookup, Phase 0** - the moat. Fully scoped in
   docs/PRICE-LOOKUP-SCOPE.md; the validation spike is 1-2 weekends and needs only
   a choice of starting state.
6. **Glossary term pages** - each of the 79 terms as its own indexable page
   (currently one long page). The long-tail "what does X mean in insurance" queries
   are the easiest wins the site is not yet collecting. Low effort, high SEO.
7. **Guide-to-guide "next step" footers** - each guide ends with one explicit next
   action ("Bill checked? Now apply for assistance"). The /start/ page does this
   across the site; doing it inside pages captures readers who land mid-journey
   from search.
8. **A printable /start/ companion** - "The Medical Bill Emergency Kit": one Word
   download bundling the EOB checklist, the three most-used letters, and the call
   log. The email-magnet the newsletter needs, and it costs one afternoon.
9. **Spanish translation of the top 10 pages** - the i18n plumbing is built and
   waiting; Spanish is the highest-value locale for US healthcare content. Needs
   your fluent-reviewer decision (the rule in CONTENT.md: no unreviewed health
   translations).

### Worth doing, not urgent

10. **Accessibility pass** - keyboard-only walkthrough, screen-reader labels on the
    interactive tools, contrast verification of the accent palette. The bones are
    good (skip links, semantic headings, focus styles); an audit would make it
    provable.
11. **Print stylesheets for guides** - people print billing guides; a clean print
    layout (rail and nav hidden) is cheap goodwill. The trackers already have one.
12. **Per-section OG images** - the generator script exists (`npm run og`); four
    variants would make shares from different sections distinguishable.
13. **A visible "was this useful?" widget** - even a mailto-based one - to learn
    which pages earn the coffee link. Keep it cookie-free.
14. **MedicalWebPage / FAQPage schema review** - lab pages already emit FAQPage;
    checking eligibility for medical-content rich results is a small SEO experiment.

### Explicitly recommended AGAINST

- **Symptom checkers, triage tools, or personalized anything** - the bright line is
  the site's legal foundation; every audit consequence above traces to drifting
  toward advice.
- **Accounts, saved results, or server-side anything** - the no-storage promise is
  now verified true and is a marketing asset. Keep the architecture static.
- **AdSense before real traffic** - premature ads cost trust and earn cents.

---

## Standing invariants (re-verified this pass)

- Zero reader-typed data transmitted or stored, anywhere, ever
- Zero clinical advice; administrative and reference register only
- Every dollar figure and deadline carries a primary source and a date
- Plain hyphens only
- Annual figure re-verification: scheduled tasks fire November 1 and May 15
