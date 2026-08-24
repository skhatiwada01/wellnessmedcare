/**
 * Letter templates. Placeholders are written as [Square brackets]; the templates page
 * parses them into form fields so a reader can fill them in and download a Word file.
 */
export interface Template {
  id: string;
  title: string;
  when: string;
  body: string;
  guide?: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'itemized-bill',
    title: 'Request an itemized bill',
    when:
      'Send this the moment you get a hospital or facility bill that shows only a summary total. You cannot check a bill you cannot see.',
    guide: '/guides/itemized-bill-errors/',
    body: `[Your name]
[Your address]
[City, State ZIP]
[Date]

[Hospital or provider billing department]
[Billing address]

Re: Request for itemized statement
Patient name: [Patient name]
Account or statement number: [Number]
Date(s) of service: [Dates]

To whom it may concern:

I received a statement dated [date] showing a balance of $[amount]. Before I
can review or pay this balance, I am requesting a fully itemized statement of
all charges for the date(s) of service listed above.

Please include, for each line item:

  - The date the service or item was provided
  - A plain description of the service or item
  - The CPT, HCPCS, or revenue code billed
  - The quantity or units billed
  - The charge for each unit and the total charge for the line

Please also confirm the date this claim was submitted to my insurer and the
date of any payment or denial received.

I am not disputing the balance at this time. I am asking for the detail needed
to review it. Please hold any collection activity on this account until I have
received the itemized statement and had a reasonable opportunity to review it.

You may send the statement to the address above or to [email address].

Thank you,

[Your name]
[Phone number]`,
  },
  {
    id: 'billing-error',
    title: 'Dispute a specific billing error',
    when:
      'Use this after you have the itemized bill and have found something concrete: a duplicate line, a service you did not receive, a wrong quantity, or a room charge for a day you were not admitted.',
    guide: '/guides/itemized-bill-errors/',
    body: `[Your name]
[Your address]
[City, State ZIP]
[Date]

[Hospital or provider billing department]
[Billing address]

Re: Disputed charges on account [Number]
Patient name: [Patient name]
Date(s) of service: [Dates]

To whom it may concern:

I have reviewed the itemized statement for the account above and I am disputing
the following charges:

  1. [Date] - [Description] - code [CPT/revenue code] - $[amount]
     Reason: [e.g. This line appears twice on the statement.]

  2. [Date] - [Description] - code [CPT/revenue code] - $[amount]
     Reason: [e.g. I was discharged on [date] and was not present for this.]

  3. [Date] - [Description] - code [CPT/revenue code] - $[amount]
     Reason: [e.g. The quantity billed is [X]; I received [Y].]

I am asking that you review these lines, correct any that are in error, submit
a corrected claim to my insurer if a correction is made, and send me an updated
itemized statement.

While this dispute is open, please do not refer this account to collections and
do not report it to any credit reporting agency.

Please confirm in writing that you received this dispute and let me know the
outcome of your review. I can be reached at [phone] or [email].

Thank you,

[Your name]`,
  },
  {
    id: 'internal-appeal',
    title: 'Appeal a denied claim (internal appeal)',
    when:
      'Send this to your health plan after a denial. You generally have at least 180 days from the date on the denial notice. Attach the denial letter and anything your clinician wrote supporting the service.',
    guide: '/guides/appeal-a-denied-claim/',
    body: `[Your name]
[Your address]
[City, State ZIP]
[Date]

[Insurance company name]
Attn: Appeals Department
[Appeals address from your denial letter]

Re: Internal appeal of claim denial
Member name: [Name]
Member ID: [ID number]
Group number: [Group number]
Claim number: [Claim number]
Date(s) of service: [Dates]
Denial notice dated: [Date]

To whom it may concern:

I am requesting a full and fair internal review of the denial of the claim
listed above. The denial notice states the reason as: "[quote the exact reason
given on your denial letter]".

I am appealing on the following grounds:

  [Choose the ones that apply and delete the rest.]

  - The service was provided as described and the denial appears to rest on a
    coding or data-entry error. [Explain: e.g. the date of birth on the claim
    does not match my record; the diagnosis code submitted was [X].]

  - Prior authorization was obtained on [date], reference number [number].

  - The service meets the plan's coverage criteria set out in [document and
    section, if you have it]. Supporting documentation from my treating
    clinician is enclosed.

  - The provider was in-network on the date of service. [Attach evidence, such
    as a dated screenshot of the plan's provider directory.]

Enclosed with this letter:

  - Copy of the denial notice dated [date]
  - [Letter of medical necessity from [clinician], dated [date]]
  - [Itemized bill]
  - [Prior authorization confirmation]
  - [Other supporting documents]

Under federal rules governing internal claims and appeals, I am requesting:

  1. That this appeal be reviewed by a person who was not involved in the
     original decision and is not that person's subordinate.
  2. A free copy of all documents, records, and criteria the plan relied on in
     making the original determination, including any internal rule, guideline,
     or protocol.
  3. A written decision explaining the outcome and, if the denial is upheld, my
     rights to an external review.

Please confirm receipt of this appeal. I can be reached at [phone] or [email].

Thank you,

[Your name]
[Date]`,
  },
  {
    id: 'financial-assistance',
    title: 'Request a financial assistance application',
    when:
      'Send this to any nonprofit hospital. They are required by federal tax rules to have a written financial assistance policy, and eligibility often extends well above the poverty line. Ask before you agree to a payment plan.',
    guide: '/guides/hospital-financial-assistance/',
    body: `[Your name]
[Your address]
[City, State ZIP]
[Date]

[Hospital name]
Attn: Financial Assistance / Patient Financial Services
[Address]

Re: Request for financial assistance
Patient name: [Patient name]
Account or statement number: [Number]
Date(s) of service: [Dates]
Balance: $[amount]

To whom it may concern:

I am writing to request a copy of your Financial Assistance Policy, the plain
language summary of that policy, and the application form, as well as to apply
for financial assistance on the account listed above.

Please send me:

  1. The full Financial Assistance Policy
  2. The plain language summary
  3. The application form and a list of required documentation
  4. The deadline for submitting an application on this account

[Optional paragraph, if it applies to you:]
My household size is [number] and my current annual household income is
approximately $[amount]. My circumstances changed on [date] because
[brief factual explanation]. I am able to provide documentation on request.

While my application is pending, please place this account on hold and suspend
any collection activity, including referral to a collection agency and any
reporting to credit agencies.

If I qualify for assistance under your policy, I understand that the amount
charged to me for emergency and other medically necessary care may not exceed
the amount generally billed to patients who have insurance covering that care.

Please confirm receipt of this request in writing. I can be reached at [phone]
or [email].

Thank you,

[Your name]`,
  },
  {
    id: 'medical-records',
    title: 'Request your medical records',
    when:
      'Use this when you need records to support an appeal, get a second opinion, or verify what actually happened during a visit you are being billed for.',
    body: `[Your name]
[Date of birth]
[Your address]
[City, State ZIP]
[Date]

[Provider or hospital name]
Attn: Medical Records / Health Information Management
[Address]

Re: Request for access to my medical records
Patient name: [Name]
Date of birth: [DOB]
Date(s) of service: [Dates]

To whom it may concern:

I am requesting access to my medical records for the date(s) of service listed
above. Specifically, I am requesting:

  - [Physician and nursing notes for the visit or admission]
  - [Results of all tests and imaging performed]
  - [Medication administration records]
  - [Operative or procedure reports]
  - [The complete billing record for these dates]

Please provide these records in electronic form if they are maintained
electronically, delivered to [email address] or [patient portal].

If any fee applies to this request, please tell me the amount in advance and
wait for my approval before processing.

Please confirm receipt of this request and let me know when I can expect the
records. I can be reached at [phone] or [email].

Thank you,

[Your name]
[Signature]
[Date]`,
  },
  {
    id: 'collections-hold',
    title: 'Ask a collector to verify a disputed medical debt',
    when:
      'Send this within 30 days of first hearing from a collection agency about a medical bill. Send it by a method that gives you proof of delivery, and keep a copy.',
    body: `[Your name]
[Your address]
[City, State ZIP]
[Date]

[Collection agency name]
[Address]

Re: Account [collection account number]
Original creditor: [Hospital or provider name]
Amount claimed: $[amount]

To whom it may concern:

I received your notice dated [date] regarding the account above. I dispute this
debt and I am requesting verification of it.

Please provide:

  1. Verification of the debt, including the name and address of the original
     creditor
  2. An itemized statement of the charges that make up the amount claimed
  3. Documentation that you are authorized to collect this debt
  4. The date the original creditor says the account became delinquent

Until you provide this verification, please cease collection activity on this
account.

Please direct all further communication about this account to me in writing at
the address above.

Thank you,

[Your name]`,
  },

  // ---------- generated batch ----------
  {
    id: "prior-auth-request",
    title: "Confirm prior authorization in writing",
    when:
      "Use before a scheduled test, procedure, or treatment when you are not sure whether your plan requires prior authorization. It creates a written record that you asked, which matters if the insurer later tries to deny the claim for missing authorization. Send it as soon as the service is scheduled so there is time for a decision before the service date.",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Insurance company name]\nAttn: Prior Authorization Department\n[Insurance company address]\n\nRe: Prior authorization inquiry - Member ID [Member ID], Group [Group number]\n\nTo the Prior Authorization Department:\n\nI am scheduled to receive [Procedure name] from [Provider name] at [Facility name] on [Scheduled service date]. The billing codes my provider's office gave me for this service are [CPT codes].\n\nBefore the service takes place, please answer the following in writing:\n\n1. Is prior authorization required under my plan for these codes, performed by this provider at this facility?\n2. If it is required, who is responsible for obtaining it - me, the provider, or the facility?\n3. What information do you need, and by what date, so that a decision is made before [Scheduled service date]?\n\nIf prior authorization is not required, please confirm that in writing so I have it on record. If it is required and is approved, please send written confirmation that includes the authorization or reference number, the codes and dates it covers, and any conditions attached to it.\n\nPlease assign a reference number to this request and include it in your reply. If anything about my request is unclear, please call me at [Your phone number] rather than letting the request sit.\n\nThank you for your help.\n\nSincerely,\n\n[Your name]\nMember ID: [Member ID]",
  },
  {
    id: "gap-exception",
    title: "Request a network gap exception",
    when:
      "Use when your plan's directory has no provider of the specialty you need who is accepting patients within a reasonable time and distance. It asks the plan to cover a specific out-of-network provider at in-network cost sharing. Send it before you receive the out-of-network care whenever possible.",
    guide: "/guides/in-network-vs-out-of-network/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Insurance company name]\nAttn: Utilization Management / Network Exceptions\n[Insurance company address]\n\nRe: Request for a network gap exception - Member ID [Member ID]\n\nTo the Utilization Management Department:\n\nI need care from a [Specialty] for [Condition]. My referring provider, [Referring provider name], has recommended this care.\n\nI have made a good faith effort to find an in-network [Specialty] and could not. Between [Dates you searched], I checked the plan's online directory and called the offices listed. The providers I found were not accepting new patients, could not offer an appointment within a reasonable time, or were not within a reasonable distance of my home. I kept notes of these calls and can provide them on request.\n\nI therefore ask the plan to approve a network gap exception - sometimes called a network deficiency or out-of-network exception - allowing me to receive this care from:\n\n[Out-of-network provider name]\n[Out-of-network provider address]\n\nSpecifically, I ask that the plan authorize this care at the in-network benefit level, so that my deductible, copay, and coinsurance are applied as if the provider were in network. Please confirm any approval in writing, including an authorization number, the services and dates covered, and instructions for how the provider should bill.\n\nIf the plan denies this request, please send the denial in writing with the specific reason and instructions for appealing it. If my condition makes the standard timeline harmful to my health, I ask that this request be handled on an expedited basis.\n\nThank you for your prompt attention.\n\nSincerely,\n\n[Your name]\nMember ID: [Member ID]",
  },
  {
    id: "external-review",
    title: "Request an external review",
    when:
      "Use after your insurer has issued its final internal appeal denial and you still believe the claim should be covered. It invokes your right under federal law to have an independent outside reviewer decide the case. Check your final denial letter for the deadline - external review requests are time-limited, often to four months from the final denial.",
    guide: "/guides/appeal-a-denied-claim/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Insurance company name]\nAttn: Appeals Department - External Review\n[Insurance company address]\n\nRe: Request for external review - Member ID [Member ID], Claim [Claim number]\n\nTo the Appeals Department:\n\nThis letter is a formal request for an independent external review of the denial of my claim for [Service description], provided on [Date of service].\n\nI have completed the plan's internal appeal process. The plan issued its final internal denial on [Final denial date]. Federal law gives me the right to have that decision reviewed by an independent outside reviewer, and I am exercising that right now.\n\nPlease confirm in writing that this request has been received and forwarded to the independent review organization. Please also tell me the name of the review organization, the timeline for a decision, and whether the reviewer needs anything further from me. I understand the reviewer's decision is binding on the plan.\n\nIf my treating provider certifies that waiting the standard timeline would seriously jeopardize my health, I request that this be handled as an expedited external review.\n\nSincerely,\n\n[Your name]\nMember ID: [Member ID]\n\nEnclosures:\n- Copy of the final internal denial letter dated [Final denial date]\n- Copies of my internal appeal and the plan's responses\n- Supporting records and letters from my treating provider",
  },
  {
    id: "records-amendment",
    title: "Ask for a correction to your medical record",
    when:
      "Use when you find a factual error in your medical record - a wrong diagnosis, a medication you never took, someone else's results filed under your name. HIPAA gives you the right to request an amendment and, if the provider refuses, to have your request attached to the record. Send it to the medical records or health information department of the provider that created the entry.",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Provider or facility name]\nAttn: Health Information Management / Medical Records\n[Medical records department address]\n\nRe: Request to amend my medical record - [Your name], date of birth [Date of birth], medical record number [Medical record number]\n\nTo the Health Information Management Department:\n\nUnder HIPAA, I have the right to ask that my medical record be amended. I am making that request now.\n\nThe entry I am asking you to correct is dated [Date of the entry]. It states: [Incorrect statement].\n\nThis is incorrect because [Reason it is incorrect].\n\nI ask that the record be amended to state: [Corrected information].\n\nPlease respond to this request in writing within the 60 days HIPAA allows. If you agree, please make the amendment, confirm to me that it has been made, and forward the correction to anyone you know received the incorrect information, including my insurer.\n\nIf you decline, please give me your reasons in writing, attach this request and your written denial to my record so that anyone who reads the entry sees them, and tell me how to submit a statement of disagreement for the file.\n\nThank you.\n\nSincerely,\n\n[Your name]\nDate of birth: [Date of birth]\nMedical record number: [Medical record number]",
  },
  {
    id: "state-doi-complaint",
    title: "Complain to your state insurance department",
    when:
      "Use when you have genuinely tried to resolve a problem with your insurer and gotten nowhere. State insurance departments regulate insurers and can compel a response. This letter works best after at least one written complaint to the insurer, so you have dates and reference numbers to show.",
    guide: "/guides/appeal-a-denied-claim/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[State] Department of Insurance\nAttn: Consumer Services Division\n[State insurance department address]\n\nRe: Complaint against [Insurance company name] - Member ID [Member ID], Claim [Claim number]\n\nTo the Consumer Services Division:\n\nI am filing a complaint against [Insurance company name] regarding its handling of my claim for services provided on [Date of service].\n\nThe problem is this: [Description of the problem].\n\nI tried to resolve this with the insurer directly before contacting you. I first contacted the insurer on [Date of first contact] and have followed up since. The reference numbers the insurer gave me for those contacts are: [Insurer reference numbers]. Despite these attempts, the issue remains unresolved.\n\nThe resolution I am seeking is: [Resolution sought].\n\nI have enclosed copies of the relevant documents. Please open a file on this complaint, send me the case number you assign, and let me know if you need anything further from me. I can be reached at [Your phone number].\n\nThank you for your assistance.\n\nSincerely,\n\n[Your name]\n\nEnclosures:\n- Copies of correspondence with the insurer\n- Explanation of benefits statements and denial letters\n- My notes of phone calls, with dates and reference numbers",
  },
  {
    id: "plan-documents-request",
    title: "Request your full plan documents",
    when:
      "Use when you need to see the actual terms of your coverage - typically before or during an appeal, when the insurer cites plan terms you have never seen. The summary handed out at enrollment is not the governing document. For employer plans, the plan administrator must provide the full documents on written request.",
    guide: "/guides/appeal-a-denied-claim/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Plan administrator or insurance company name]\nAttn: Plan Administrator\n[Administrator address]\n\nRe: Written request for plan documents - [Plan name], Member ID [Member ID], Group [Group number]\n\nTo the Plan Administrator:\n\nI am a participant in [Plan name] through [Employer name]. I am writing to request complete copies of the documents that govern my coverage, not just the summaries.\n\nSpecifically, please send:\n\n1. The Summary Plan Description currently in effect.\n2. The full plan document or insurance contract that governs the plan, including the Evidence of Coverage or Certificate of Coverage.\n3. All amendments, riders, and schedules of benefits that apply to my coverage.\n4. Any document the plan relies on to decide claims, including internal coverage guidelines if they form part of the plan terms.\n\nIf this is an employer-sponsored plan, federal law requires the plan administrator to provide the governing plan documents within 30 days of a written request. Please treat this letter as that written request.\n\nPaper copies mailed to the address above are fine. A complete electronic copy by email is also acceptable if that is faster. If there is a copying charge, please tell me the amount before sending the documents.\n\nThank you.\n\nSincerely,\n\n[Your name]\nMember ID: [Member ID]",
  },
  {
    id: "good-faith-estimate-request",
    title: "Request a good faith estimate",
    when:
      "Use if you are uninsured or plan to pay for scheduled care yourself, before the service happens. The No Surprises Act entitles you to a written good faith estimate of the expected charges, including accompanying services. Having it in writing matters because a final bill far above the estimate can be formally disputed.",
    guide: "/guides/no-surprises-act/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Provider or facility name]\nAttn: Scheduling / Billing Office\n[Provider or facility address]\n\nRe: Request for a good faith estimate - [Service or procedure name] scheduled for [Scheduled date]\n\nTo the Billing Office:\n\nI am scheduled to receive [Service or procedure name] on [Scheduled date], ordered by [Ordering provider name]. I will be paying for this care myself rather than using insurance.\n\nUnder the No Surprises Act, uninsured and self-pay patients are entitled to a written good faith estimate of expected charges. Please send me that estimate. It should include:\n\n1. The expected charge for [Service or procedure name] itself, with the billing codes.\n2. The items and services reasonably expected to accompany it - for example facility fees, anesthesia, labs, imaging, and pathology - each listed with its expected charge and the provider or facility expected to bill for it.\n\nPlease provide the estimate in writing within 3 business days of this request, as the law requires, and before I am asked to commit to the service.\n\nI understand that if the final bill comes in 400 dollars or more above the estimate, I may have the right to dispute the bill through the federal patient-provider dispute process, so please make the estimate as complete as you can.\n\nThank you.\n\nSincerely,\n\n[Your name]\n[Your phone number]",
  },
  {
    id: "patient-advocate-escalation",
    title: "Escalate to the hospital patient advocate",
    when:
      "Use when a billing dispute with a hospital has stalled - promises made and broken, calls not returned, the same problem recurring. Hospital patient advocates, sometimes called patient relations, exist to resolve exactly this. Lay out the full history in one place so the advocate does not have to start from zero.",
    guide: "/guides/itemized-bill-errors/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Hospital name]\nAttn: Patient Advocate / Patient Relations\n[Patient advocate office address]\n\nRe: Request for help resolving a billing dispute - Account [Account number], date of service [Date of service]\n\nTo the Patient Advocate's Office:\n\nI am asking your office to step in on a billing dispute that the billing office has not resolved.\n\nThe dispute concerns [Amount in dispute] billed to account [Account number] for services provided on [Date of service].\n\nHere is the history. I first raised the problem with the billing office on [Date of first contact]. In that contact and in later ones, I was told: [What was promised]. What actually happened is: [What happened instead]. I have kept notes of each contact, with dates and the names of the people I spoke with, and I can provide them.\n\nThe specific resolution I am asking for is: [Resolution sought].\n\nPlease assign this matter to a specific person, send me that person's name and direct contact information, and give me a date by which I can expect a substantive response. I also ask that the account be placed on hold, with no collection activity, while your office reviews it.\n\nThank you for your help.\n\nSincerely,\n\n[Your name]\nAccount number: [Account number]\n\nEnclosures:\n- Copies of the bills in dispute\n- Copies of correspondence with the billing office\n- My notes of phone calls, with dates and names",
  },
  {
    id: "collection-pause-insurance-pending",
    title: "Ask for a billing hold while your appeal is pending",
    when:
      "Use immediately after filing an insurance appeal, whenever the provider is billing you for the disputed balance. It tells the billing office the amount is not final and asks them to hold the account rather than send it to collections. Send it early - once an account reaches collections it is much harder to unwind.",
    guide: "/guides/appeal-a-denied-claim/",
    body: "[Your name]\n[Your address]\n[Your phone number]\n\n[Date]\n\n[Provider or facility name]\nAttn: Billing Office\n[Billing office address]\n\nRe: Request to hold account [Account number] - insurance appeal pending\n\nTo the Billing Office:\n\nThis letter concerns account [Account number] for services provided on [Date of service].\n\nThe balance on this account is the subject of an active insurance appeal. I filed an appeal with [Insurance company name] on [Appeal filing date] regarding claim [Claim number]. If the appeal succeeds, the insurer's payment will change what, if anything, I owe.\n\nWhile the appeal is pending, I ask that you:\n\n1. Place the account on hold and pause billing statements.\n2. Do not refer the account to a collection agency or report it to any credit bureau.\n3. Send me written confirmation that the hold is in place, and note the pending appeal in the account file.\n\nI am not disputing your charges and I am not refusing to pay. I am asking that the balance not be treated as final until the insurer completes the appeal. I will update you promptly when the appeal is decided, and I am glad to send further documentation if that helps.\n\nThank you for your cooperation.\n\nSincerely,\n\n[Your name]\nAccount number: [Account number]\n\nEnclosure:\n- Copy of the appeal filed with [Insurance company name] on [Appeal filing date]",
  },
];
