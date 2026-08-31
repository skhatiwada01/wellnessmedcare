export interface Term {
  term: string;
  /** Common alternate names and abbreviations, for on-page search and SEO. */
  aka?: string[];
  definition: string;
  /** Optional link to the guide that covers this in depth. */
  guide?: string;
}

/** Administrative and financial terms only. Nothing clinical. */
export const GLOSSARY: Term[] = [
  {
    term: 'Allowed amount',
    aka: ['Eligible expense', 'Negotiated rate'],
    definition:
      'The maximum your plan will count toward a covered service. In-network providers agree to accept it as full payment, so anything billed above it is written off rather than passed to you.',
    guide: '/guides/read-your-eob/',
  },
  {
    term: 'Amount generally billed (AGB)',
    definition:
      'A cap in federal tax law: a nonprofit hospital cannot charge a patient who qualifies for its financial assistance more than it generally bills insured patients for the same care.',
    guide: '/guides/hospital-financial-assistance/',
  },
  {
    term: 'Appeal',
    definition:
      'A formal request asking your plan to reconsider a denied or partially paid claim. You generally have at least 180 days from the denial notice to file the first one.',
    guide: '/guides/appeal-a-denied-claim/',
  },
  {
    term: 'Balance billing',
    aka: ['Surprise billing'],
    definition:
      'When a provider bills you for the difference between their charge and what your plan paid. Legal from out-of-network providers in many situations, but banned in the specific circumstances the No Surprises Act covers.',
    guide: '/guides/no-surprises-act/',
  },
  {
    term: 'Chargemaster',
    aka: ['Charge description master', 'CDM'],
    definition:
      'A hospital internal list of list-price charges for every item and service. Almost nobody actually pays these prices; they are the starting point that discounts come off of.',
    guide: '/guides/what-things-actually-cost/',
  },
  {
    term: 'Claim',
    definition:
      'The bill a provider sends your insurer asking to be paid for a service. Most claims are submitted for you; you only file one yourself in unusual situations.',
  },
  {
    term: 'Clearinghouse',
    definition:
      'A middleman that formats and forwards claims from providers to insurers. Relevant to you mainly because claims get stuck there, which looks like a denial but is not one.',
  },
  {
    term: 'COBRA',
    definition:
      'A federal law letting you keep your employer health plan for a limited period after leaving a job, if you pay the full premium yourself plus an administrative fee.',
  },
  {
    term: 'Coinsurance',
    definition:
      'Your share of a cost expressed as a percentage. Twenty percent coinsurance means you pay 20% of the allowed amount after your deductible is met.',
    guide: '/guides/deductible-copay-coinsurance/',
  },
  {
    term: 'Coordination of benefits (COB)',
    definition:
      'The rules that decide which plan pays first when you are covered by two. Unanswered COB questionnaires are one of the most common reasons a claim sits unpaid.',
  },
  {
    term: 'Copayment',
    aka: ['Copay'],
    definition:
      'A flat dollar amount for a specific service, such as $30 for an office visit. Separate from coinsurance, and it may or may not count toward your deductible.',
    guide: '/guides/deductible-copay-coinsurance/',
  },
  {
    term: 'Cost sharing',
    definition:
      'The umbrella term for everything you pay out of pocket for covered care: deductible, copays, and coinsurance. Premiums are not cost sharing.',
  },
  {
    term: 'CPT code',
    aka: ['Procedure code'],
    definition:
      'A five-character code identifying the specific service performed. It drives the price, so a wrong CPT code is a wrong bill.',
    guide: '/guides/itemized-bill-errors/',
  },
  {
    term: 'Deductible',
    definition:
      'What you pay for covered services before your plan starts paying its share. Preventive care and copay-only services often bypass it.',
    guide: '/guides/deductible-copay-coinsurance/',
  },
  {
    term: 'Denial',
    definition:
      'Your plan declining to pay a claim. Denials range from clerical (wrong date of birth) to substantive (not medically necessary), and the two are appealed very differently.',
    guide: '/guides/appeal-a-denied-claim/',
  },
  {
    term: 'DRG',
    aka: ['Diagnosis-related group'],
    definition:
      'A bundled payment category for an inpatient stay. The hospital receives one payment for the whole admission based on the DRG, not a per-item total.',
  },
  {
    term: 'EOB',
    aka: ['Explanation of Benefits'],
    definition:
      'The statement your insurer sends after processing a claim, showing what was billed, what was allowed, what they paid, and what you may owe. It is not a bill.',
    guide: '/guides/read-your-eob/',
  },
  {
    term: 'EPO',
    aka: ['Exclusive Provider Organization'],
    definition:
      'A plan that covers in-network care only, except emergencies, but usually does not require referrals.',
    guide: '/guides/in-network-vs-out-of-network/',
  },
  {
    term: 'Essential health benefits',
    definition:
      'Ten categories of care that ACA-compliant individual and small-group plans must cover, including emergency services, hospitalization, prescription drugs, and preventive care.',
  },
  {
    term: 'Explanation of Payment (EOP)',
    aka: ['Remittance advice'],
    definition:
      'The provider-facing version of an EOB, showing what the insurer paid them and why. Requesting it can clarify a disputed balance.',
  },
  {
    term: 'Formulary',
    definition:
      'The list of prescription drugs your plan covers, usually sorted into tiers that determine your cost.',
  },
  {
    term: 'FSA',
    aka: ['Flexible Spending Account'],
    definition:
      'An employer account funded with pre-tax salary for medical expenses. Use-it-or-lose-it, with limited carryover, and it does not move with you when you leave the job.',
    guide: '/guides/hsa-fsa-hra/',
  },
  {
    term: 'Good faith estimate (GFE)',
    definition:
      'A written cost estimate that providers must give uninsured and self-pay patients before scheduled care. If the final bill exceeds it by $400 or more, a federal dispute process opens up.',
    guide: '/guides/no-surprises-act/',
  },
  {
    term: 'Grace period',
    definition:
      'The window after a missed premium payment before coverage is terminated. Claims incurred during it can be held and later denied if you never pay.',
  },
  {
    term: 'HDHP',
    aka: ['High-deductible health plan'],
    definition:
      'A plan meeting IRS minimum-deductible and maximum-out-of-pocket rules, which is what makes you eligible to contribute to an HSA.',
    guide: '/guides/hsa-fsa-hra/',
  },
  {
    term: 'HMO',
    aka: ['Health Maintenance Organization'],
    definition:
      'A plan built around a primary care provider who coordinates care and issues referrals. Out-of-network care is generally not covered except emergencies.',
    guide: '/guides/in-network-vs-out-of-network/',
  },
  {
    term: 'HRA',
    aka: ['Health Reimbursement Arrangement'],
    definition:
      'An employer-funded account that reimburses you for qualified medical costs. Only the employer contributes, and the employer sets the rules.',
    guide: '/guides/hsa-fsa-hra/',
  },
  {
    term: 'HSA',
    aka: ['Health Savings Account'],
    definition:
      'A portable, employee-owned account for medical expenses with a triple tax advantage. Requires HDHP coverage to contribute, and the balance rolls over indefinitely.',
    guide: '/guides/hsa-fsa-hra/',
  },
  {
    term: 'ICD-10 code',
    aka: ['Diagnosis code'],
    definition:
      'The code describing why a service was performed. A mismatched diagnosis code is a frequent cause of a medical-necessity denial that is really a coding error.',
    guide: '/guides/appeal-a-denied-claim/',
  },
  {
    term: 'Independent Dispute Resolution (IDR)',
    definition:
      'The federal arbitration process where an out-of-network provider and a health plan settle a payment amount between themselves under the No Surprises Act. You are not a party to it.',
    guide: '/guides/no-surprises-act/',
  },
  {
    term: 'In-network',
    aka: ['Participating provider'],
    definition:
      'A provider under contract with your plan at negotiated rates. Networks are specific to the individual plan, not to the insurance company as a whole.',
    guide: '/guides/in-network-vs-out-of-network/',
  },
  {
    term: 'Itemized bill',
    aka: ['Detailed statement'],
    definition:
      'A line-by-line list of every charge with its codes, quantities, and dates. The summary statement you get by default is not one, and you have to ask for it.',
    guide: '/guides/itemized-bill-errors/',
  },
  {
    term: 'Medically necessary',
    definition:
      'An insurance term of art, not a clinical one. It means the service meets the written coverage criteria of the plan, which is why denials on these grounds are often winnable with the right documentation.',
    guide: '/guides/appeal-a-denied-claim/',
  },
  {
    term: 'No Surprises Act',
    definition:
      'A federal law effective January 2022 that bans balance billing for most emergency care, for out-of-network clinicians at in-network facilities, and for air ambulances.',
    guide: '/guides/no-surprises-act/',
  },
  {
    term: 'Open enrollment',
    definition:
      'The annual window when you can join or change plans without a qualifying life event.',
  },
  {
    term: 'Out-of-network',
    definition:
      'A provider with no contract with your plan. They have not agreed to any negotiated rate, which is what makes balance billing possible.',
    guide: '/guides/in-network-vs-out-of-network/',
  },
  {
    term: 'Out-of-pocket maximum',
    aka: ['OOP max', 'Out-of-pocket limit'],
    definition:
      'The most you pay in cost sharing for in-network covered care in a plan year. After it, the plan pays 100% of covered in-network services. Premiums and non-covered services never count toward it.',
    guide: '/guides/deductible-copay-coinsurance/',
  },
  {
    term: 'POS plan',
    aka: ['Point of Service'],
    definition:
      'A hybrid requiring a primary care provider and referrals like an HMO, but offering some out-of-network coverage like a PPO.',
  },
  {
    term: 'PPO',
    aka: ['Preferred Provider Organization'],
    definition:
      'A plan that covers out-of-network care at a lower level and generally does not require referrals.',
    guide: '/guides/in-network-vs-out-of-network/',
  },
  {
    term: 'Preauthorization',
    aka: ['Prior authorization', 'Precertification'],
    definition:
      'Advance approval from your plan for a service. Missing it can turn a fully covered service into a full-price bill, and obtaining it is the responsibility of the provider in most cases.',
    guide: '/guides/appeal-a-denied-claim/',
  },
  {
    term: 'Premium',
    definition:
      'What you pay monthly to have coverage at all, whether or not you use it. It does not count toward your deductible or out-of-pocket maximum.',
    guide: '/guides/deductible-copay-coinsurance/',
  },
  {
    term: 'Preventive services',
    definition:
      'Screenings and services that most plans must cover with no cost sharing when delivered in-network. A preventive visit can still generate a billed charge if it turns into a diagnostic one.',
  },
  {
    term: 'Price transparency rules',
    definition:
      'Federal rules requiring hospitals to publish their negotiated prices in a machine-readable file and a consumer-friendly display, and requiring insurers to publish theirs.',
    guide: '/guides/what-things-actually-cost/',
  },
  {
    term: 'Qualifying life event',
    aka: ['QLE'],
    definition:
      'A change such as job loss, marriage, birth, or moving that opens a special enrollment period outside open enrollment.',
  },
  {
    term: 'Referral',
    definition:
      'Authorization from your primary care provider to see a specialist. A plan requirement distinct from preauthorization, required mainly by HMO and POS plans.',
  },
  {
    term: 'Revenue code',
    definition:
      'A four-digit code on a hospital bill identifying the department or type of service. Pairing it with the CPT code is how you spot charges for a department you never visited.',
    guide: '/guides/itemized-bill-errors/',
  },
  {
    term: 'Section 501(r)',
    definition:
      'The federal tax rules requiring nonprofit hospitals to maintain a written financial assistance policy, publicize it, cap what they charge qualifying patients, and follow limits on collections.',
    guide: '/guides/hospital-financial-assistance/',
  },
  {
    term: 'Self-pay',
    aka: ['Cash pay'],
    definition:
      'Paying without using insurance. Sometimes cheaper than the insured price, especially before a deductible is met, but self-pay amounts usually do not count toward your deductible.',
    guide: '/guides/what-things-actually-cost/',
  },
  {
    term: 'Special enrollment period (SEP)',
    definition:
      'A limited window, usually 60 days after a qualifying life event, to enroll or change plans outside open enrollment.',
  },
  {
    term: 'Subrogation',
    definition:
      'The right of your plan to be repaid from a settlement if someone else caused the injury it paid for. Usually surfaces as a letter asking how an accident happened.',
  },
  {
    term: 'Summary of Benefits and Coverage (SBC)',
    definition:
      'A standardized short document every plan must provide, formatted identically across insurers so plans can actually be compared side by side.',
  },
  {
    term: 'Superbill',
    definition:
      'An itemized receipt from an out-of-network provider containing the codes you need to file your own claim for reimbursement.',
  },
  {
    term: 'Timely filing limit',
    definition:
      'The deadline for a provider to submit a claim. If they miss it, the resulting denial is generally the problem of the provider to absorb, not a balance they may bill to you.',
    guide: '/guides/itemized-bill-errors/',
  },
  {
    term: 'Usual, customary and reasonable (UCR)',
    definition:
      'A benchmark some plans use to set the allowed amount for out-of-network care. Because the plan picks the benchmark, UCR amounts are frequently disputed.',
  },
  {
    term: 'Utilization review',
    definition:
      'The process a plan uses to decide whether care is covered, either before treatment (prospective), during it (concurrent), or after it (retrospective).',
  },

  // ---------- expansion batch 2 ----------
  {
    term: "Advance Beneficiary Notice (ABN)",
    aka: ["ABN", "waiver of liability"],
    definition:
      "A form Medicare providers hand you before delivering a service Medicare is expected to deny. Signing it means you agree to pay out of pocket if Medicare refuses, so it is a cost decision, not a formality.",
  },
  {
    term: "Capitation",
    definition:
      "A payment model where an insurer pays a doctor or medical group a fixed amount per patient per month, whether you show up or not. It rewards keeping spending down rather than doing more.",
  },
  {
    term: "Care coordinator",
    definition:
      "A person, usually a nurse or social worker employed by a hospital or insurer, who arranges appointments, referrals, and paperwork across your providers. When the insurer employs them, part of the job is managing the plan's costs, not just your convenience.",
  },
  {
    term: "Claim adjustment reason code",
    aka: ["CARC", "remark code"],
    definition:
      "A standardized code on your EOB or remittance that explains why the insurer paid less than billed, or nothing. Codes like CO-45 and PR-1 look like noise, but every one has a published meaning you can look up.",
    guide: "/guides/read-your-eob/",
  },
  {
    term: "Concierge medicine",
    definition:
      "A practice model where you pay a doctor an annual or monthly membership fee for faster access and longer visits, on top of whatever your insurance is billed. The fee buys access, not covered services, so insurance almost never reimburses it.",
  },
  {
    term: "Copay card",
    aka: ["manufacturer coupon", "copay assistance"],
    definition:
      "A discount card from a drug manufacturer that covers some or all of your copay for a specific brand-name drug. It exists to keep you on the expensive brand, and federal rules bar Medicare and Medicaid patients from using one.",
    guide: "/guides/deductible-copay-coinsurance/",
  },
  {
    term: "Copay accumulator",
    aka: ["accumulator adjustment program"],
    definition:
      "An insurer policy that accepts a manufacturer copay card's money but refuses to count it toward your deductible or out-of-pocket maximum. The card gets spent, and on paper you have paid nothing.",
    guide: "/guides/deductible-copay-coinsurance/",
  },
  {
    term: "Credentialing",
    definition:
      "The insurer's process of verifying a provider's license, training, and history before letting them bill as in-network. It can take months, so a new doctor at an in-network practice may still bill as out-of-network until it finishes.",
    guide: "/guides/in-network-vs-out-of-network/",
  },
  {
    term: "Direct primary care",
    aka: ["DPC"],
    definition:
      "A membership model where you pay a primary care practice a flat monthly fee and insurance is never billed. It covers primary care only, so you still need insurance for hospitals, specialists, and everything else.",
  },
  {
    term: "Dual eligible",
    definition:
      "A person enrolled in both Medicare and Medicaid at the same time. Medicare pays first, Medicaid picks up much of what is left, and special plans exist just for this group.",
  },
  {
    term: "Embedded deductible",
    definition:
      "In a family plan, a per-person deductible that sits inside the family deductible, so coverage starts for one family member before the whole family total is met. The alternative is an aggregate deductible, where nobody's coverage starts until the entire family amount is paid.",
    guide: "/guides/deductible-copay-coinsurance/",
  },
  {
    term: "Facility fee",
    definition:
      "A separate charge for the building itself that hospital-owned clinics and outpatient departments add on top of the doctor's fee. The same visit at an independent practice usually carries no facility fee, which is a big reason hospital-owned offices cost more.",
    guide: "/guides/what-things-actually-cost/",
  },
  {
    term: "Formulary tier",
    definition:
      "The pricing level your plan assigns to each covered drug, typically tier 1 for cheap generics up through tier 4 or 5 for specialty drugs. The tier, not the drug's actual price, sets what you pay at the pharmacy counter.",
  },
  {
    term: "Guarantor",
    definition:
      "The person legally responsible for paying a medical bill, which is whoever signed the financial paperwork, not necessarily the patient. Parents are typically the guarantor on their children's bills.",
  },
  {
    term: "Medicare Advantage",
    aka: ["Part C", "Medicare Part C"],
    definition:
      "Private insurance plans that replace Original Medicare, usually adding drug or dental benefits in exchange for a restricted network and prior authorization requirements. You are still in Medicare, but a private company decides what gets approved.",
  },
  {
    term: "Medigap",
    aka: ["Medicare Supplement"],
    definition:
      "A private policy that pays the deductibles and coinsurance Original Medicare leaves behind. It works only alongside Original Medicare, so you cannot pair it with a Medicare Advantage plan.",
  },
  {
    term: "Medical loss ratio",
    aka: ["MLR", "80/20 rule"],
    definition:
      "The share of premium dollars an insurer must spend on actual care and quality improvement, set by federal law at 80 percent for individual and small-group plans and 85 percent for large groups. Spend less than that on care, and the insurer owes rebates to policyholders.",
  },
  {
    term: "Network adequacy",
    definition:
      "Legal standards requiring an insurance network to have enough providers within reasonable time and distance of its members. When the network cannot offer an in-network option, many states and plan types require covering an out-of-network provider at in-network rates.",
    guide: "/guides/in-network-vs-out-of-network/",
  },
  {
    term: "Observation status",
    aka: ["outpatient observation"],
    definition:
      "A billing classification where you occupy a hospital bed, sometimes for days, but are technically an outpatient rather than admitted. It changes what you owe, and for Medicare patients it can eliminate coverage for follow-up skilled nursing care.",
    guide: "/guides/appeal-a-denied-claim/",
  },
  {
    term: "Place of service code",
    aka: ["POS code"],
    definition:
      "A two-digit code on every claim telling the insurer where the service happened, like 11 for a doctor's office or 22 for hospital outpatient. The code changes what gets paid, which is why a visit billed with the wrong one can produce a surprise bill.",
    guide: "/guides/itemized-bill-errors/",
  },
  {
    term: "Prompt-pay discount",
    definition:
      "A price cut, often 10 to 30 percent, that a provider offers if you pay quickly or on the spot. You usually have to ask for it, and it is worth comparing against what you would owe after insurance processes the claim.",
    guide: "/guides/negotiate-a-medical-bill/",
  },
  {
    term: "Self-funded plan",
    aka: ["self-insured plan"],
    definition:
      "An employer health plan where the employer pays claims with its own money and an insurance company only handles the paperwork, unlike a fully-insured plan where the insurer takes the risk. The distinction matters because self-funded plans answer to federal ERISA law, not your state insurance department, so state protections and the state regulator often do not apply.",
    guide: "/guides/appeal-a-denied-claim/",
  },
  {
    term: "Step therapy",
    aka: ["fail first"],
    definition:
      "An insurer rule requiring you to try and fail cheaper drugs before it will cover the one that was prescribed. Plans generally must offer an exception process, and a denied exception can be appealed like any other denial.",
    guide: "/guides/appeal-a-denied-claim/",
  },
  {
    term: "Third-party administrator",
    aka: ["TPA"],
    definition:
      "A company hired to process claims and run day-to-day operations for a self-funded employer plan without taking on any insurance risk. The big-name insurer on your card is often just the TPA, while your employer's money actually pays the claims.",
    guide: "/guides/appeal-a-denied-claim/",
  },
];
