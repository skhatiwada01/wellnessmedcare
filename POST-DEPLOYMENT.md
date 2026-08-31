# Post-deployment checklist

Everything here happens AFTER the site is live at wellnessmedcare.com. Work top to
bottom; the order matters for the first three.

## Day one

- [x] **Contact mailbox.** Done - every page that lists an email uses
      `support@sisrallc.com` (contact page, privacy policy, terms), an existing
      monitored inbox.
- [ ] **Verify the domain in Google Search Console** (search.google.com/search-console,
      use the Domain property type, verify via DNS TXT record) and **submit the
      sitemap**: `https://wellnessmedcare.com/sitemap-index.xml`. Indexing 150 pages
      takes weeks; this starts the clock.
- [ ] **Bing Webmaster Tools** (bing.com/webmasters): import from Search Console - one
      click, and it also feeds DuckDuckGo.
- [ ] **Smoke-test the live site**: search page works (Pagefind only exists on built
      deploys), a Word download works, the Buy Me a Coffee link
      (buymeacoffee.com/sisra) resolves to the right account, and `/robots.txt` and
      `/sitemap-index.xml` return 200.

## Week one

- [ ] **Turn on analytics.** Two supported options, set as environment variables in
      the host's settings and redeploy (see .env.example):
      - `PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4. The consent banner appears
        automatically; no request reaches Google until a visitor accepts, and the
        choice is changeable on the privacy page. Create the GA4 property first and
        set data retention + IP settings consciously.
      - `PUBLIC_GOATCOUNTER_CODE` - cookieless GoatCounter, no banner at all.
      Either way: never add analytics events that carry values a reader typed into a
      tool, and never in a way that associates a visitor with a health condition.
- [ ] **Check social previews**: paste a few URLs into the sharing debuggers -
      Facebook (developers.facebook.com/tools/debug), LinkedIn Post Inspector, and a
      Slack/Discord message - and confirm the OG image renders. Regenerate with
      `npm run og` if the design needs tweaking.
- [ ] **Lawyer review** of `/privacy/` and `/terms/`. They are careful drafts, not
      reviewed documents. Budget one or two hours of a lawyer's time.
- [ ] **Set up the Netlify deploy notification** (or equivalent) so a failed deploy
      does not go unnoticed.

## Month one

- [ ] **Watch Search Console for indexing problems**: Pages report -> "Why pages are
      not indexed". Some initial "Discovered - currently not indexed" is normal for a
      new domain; it clears as the site earns trust.
- [ ] **Watch Core Web Vitals** in Search Console once data accumulates. The site
      should pass easily (no images, system fonts, lazy-loaded docx), so a failure
      means something regressed.
- [ ] **Start the backlink flywheel gently**: the printable trackers and the letter
      templates are the linkable assets. Share them where people already ask the
      questions they answer (relevant subreddits, caregiver forums) - as a participant,
      not as a spammer. One good answer with a relevant link beats fifty drive-bys.

## When traffic arrives (roughly 3-6 months)

- [ ] **Apply for AdSense** once there is steady organic traffic (a few hundred
      visits/day is a reasonable bar). Before applying: add a cookie consent banner
      (required once ad cookies exist), and re-read the privacy policy's advertising
      section - it already describes ads, but confirm it matches what AdSense actually
      does at that time.
- [ ] **Revisit ad placement rules**: never on tool result screens in a way that could
      be mistaken for the result, and never adjacent to content about a specific
      health condition in a way that lets ad targeting infer the reader's condition.
- [ ] **Consider the newsletter**: set the `PUBLIC_NEWSLETTER_ENDPOINT` environment
      variable (see .env.example) once there is an email provider (Buttondown is the
      low-effort option) and redeploy. The Bill Dispute Kit lead magnet is already
      written into the component copy.

## Standing calendar

- [ ] **November, every year**: re-verify every figure in the CONTENT.md "Numbers"
      table for the coming plan year (ACA out-of-pocket caps, FSA limits, No Surprises
      Act fee amounts, price transparency rule changes). Scheduled reminders exist for
      this (see below), but a calendar entry is a good backstop.
- [ ] **May, every year**: IRS usually publishes next year's HSA/HDHP limits in a
      revenue procedure - update `hsa-fsa-hra` and `deductible-copay-coinsurance`.
- [ ] **Quarterly**: click through the Sources links on the five most-read guides;
      government URLs move without redirects more often than they should.

## Scheduled reminders

Two recurring reminders are configured in Claude Code (November 1 and May 15 yearly)
to run the annual figure re-verification. If you move machines or reset Claude Code,
recreate them - the task is: "Re-verify the annual dollar figures in the CONTENT.md
Numbers table against IRS and CMS primary sources, update the affected pages and
their `updated` dates, and rebuild."
