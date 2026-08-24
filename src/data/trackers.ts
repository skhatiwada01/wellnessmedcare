import type { TrackerSpec } from '../scripts/docx';

/**
 * Printable blank tracking sheets.
 *
 * HARD RULE: no target ranges, no thresholds, no "normal" values, no advice about
 * what to do with a reading. These are empty forms. What the numbers mean is a
 * conversation between the reader and their clinician.
 */
export const TRACKER_CATEGORIES = {
  daily: { label: 'Everyday tracking', blurb: 'Symptoms, sleep, energy, and the day-to-day record that memory cannot keep.' },
  condition: { label: 'Condition-specific', blurb: 'Logs built around one condition, for the review appointment that asks "how has it been?"' },
  mental: { label: 'Mood and mental wellbeing', blurb: 'Dated records of mood, anxiety, and stress - patterns are hard to see from inside.' },
  medication: { label: 'Medications', blurb: 'What you take, when you took it, and what happened.' },
  women: { label: "Women's health", blurb: 'Cycles, menopause, and pregnancy records.' },
  family: { label: 'Children and family', blurb: 'Records kept for someone else - infants, children, and the family history itself.' },
  treatment: { label: 'Treatment and recovery', blurb: 'Logs for a course of treatment: therapy, surgery recovery, dialysis, chemotherapy.' },
  paperwork: { label: 'Appointments, paperwork and money', blurb: 'The administrative record: who said what, when, and what it cost.' },
} as const;

export type TrackerCategory = keyof typeof TRACKER_CATEGORIES;

export interface Tracker extends Omit<TrackerSpec, 'rows'> {
  slug: string;
  category: TrackerCategory;
  /** Why someone would bring this to an appointment. */
  useCase: string;
  /** Default number of rows offered in the UI. */
  defaultRows: number;
  rowOptions: number[];
}

export const TRACKERS: Tracker[] = [
  {
    slug: 'blood-sugar',
    category: 'condition',
    title: 'Blood Sugar Log',
    useCase:
      'Bring a run of readings to a diabetes review instead of trying to remember them. Most clinicians would rather see two weeks of dated readings than a single number.',
    intro: 'Record each reading as it happens. Note what you had eaten and roughly when.',
    columns: ['Date', 'Time', 'Reading', 'Before / after meal', 'What I ate', 'Notes'],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      'Bring this sheet and your meter to your appointment.',
      'Note anything unusual that day: illness, a missed dose, unusual activity, poor sleep.',
    ],
  },
  {
    slug: 'blood-pressure',
    category: 'condition',
    title: 'Blood Pressure Log',
    useCase:
      'Home readings taken over days are often more informative than a single reading in a clinic. Ask your clinician how they want you to take them.',
    intro: 'Rest for a few minutes before measuring. Record both numbers and your pulse.',
    columns: ['Date', 'Time', 'Systolic (top)', 'Diastolic (bottom)', 'Pulse', 'Arm / position', 'Notes'],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      'Use the same arm and the same cuff each time, and note which arm you used.',
      'Bring your monitor with you so it can be checked against the clinic device.',
    ],
  },
  {
    slug: 'medication-list',
    category: 'medication',
    title: 'Medication and Supplement List',
    useCase:
      'The single most useful document to carry. It prevents duplicate prescribing, catches interactions, and saves ten minutes of every appointment.',
    intro: 'List everything you take, including over-the-counter medicines, vitamins, and herbal supplements.',
    columns: ['Medicine or supplement', 'Strength', 'How much I take', 'How often', 'What it is for', 'Prescriber'],
    defaultRows: 16,
    rowOptions: [10, 16, 24, 40],
    notes: [
      'Include anything you buy without a prescription - it still interacts.',
      'Note any medicine you have stopped recently and why.',
      'Keep a copy in your wallet and give one to someone who might need it in an emergency.',
    ],
  },
  {
    slug: 'symptom-diary',
    category: 'daily',
    title: 'Symptom Diary',
    useCase:
      'Patterns are hard to see from memory and easy to see on paper. A dated diary turns "it happens sometimes" into something a clinician can work with.',
    intro: 'Record each episode as close to the time as you can. Be specific about what you were doing.',
    columns: ['Date', 'Time', 'What I felt', 'How long it lasted', 'Severity 1-10', 'What I was doing', 'What helped'],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      'Record the ordinary days too - knowing how often you feel fine is part of the pattern.',
    ],
  },
  {
    slug: 'pain-diary',
    category: 'daily',
    title: 'Pain Diary',
    useCase:
      'Useful before a specialist referral, a physical therapy assessment, or a medication review.',
    intro: 'Note where the pain is, how bad it is, and what changed it.',
    columns: ['Date', 'Time', 'Where', 'Severity 1-10', 'Type of pain', 'What made it worse', 'What helped'],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
  },
  {
    slug: 'weight-log',
    category: 'daily',
    title: 'Weight Log',
    useCase:
      'A dated trend is far more useful than a single reading, particularly when a clinician has asked you to watch for change.',
    intro: 'Weigh yourself under the same conditions each time - same scale, same time of day.',
    columns: ['Date', 'Time', 'Weight', 'Notes'],
    defaultRows: 24,
    rowOptions: [14, 24, 30, 60],
    notes: ['Same scale, same time of day, similar clothing makes the trend readable.'],
  },
  {
    slug: 'food-activity',
    category: 'daily',
    title: 'Food and Activity Log',
    useCase:
      'Often requested before a dietitian appointment or a metabolic review. Honest and boring beats tidy and edited.',
    intro: 'Record what you ate and what you did, without judging it. The point is an accurate picture.',
    columns: ['Date', 'Time', 'Food or drink', 'Amount', 'Activity', 'Duration', 'How I felt'],
    defaultRows: 21,
    rowOptions: [7, 14, 21, 30],
  },
  {
    slug: 'sleep-log',
    category: 'daily',
    title: 'Sleep Log',
    useCase:
      'Sleep clinics and primary care reviews frequently ask for two weeks of this before an assessment.',
    intro: 'Fill this in each morning about the night before. Estimates are fine.',
    columns: ['Date', 'Went to bed', 'Fell asleep', 'Woke during night', 'Woke up', 'Got up', 'How rested 1-10'],
    defaultRows: 14,
    rowOptions: [7, 14, 21, 30],
    notes: ['Note caffeine, alcohol, naps, and screen time if they varied.'],
  },
  {
    slug: 'appointment-notes',
    category: 'paperwork',
    title: 'Appointment Notes Sheet',
    useCase:
      'Take it in with your questions already written, and leave with the answers written down instead of half-remembered.',
    intro: 'Fill in the left column before you go. Fill in the right column while you are there.',
    columns: ['My question or concern', 'What was said', 'Next step / who does it', 'By when'],
    defaultRows: 12,
    rowOptions: [8, 12, 20],
    notes: [
      'Ask "what is the next step and who is responsible for it?" before you leave.',
      'Ask how you will receive results and what happens if you do not hear back.',
    ],
  },

  // ---------- generated batch ----------
  {
    slug: "headache-diary",
    category: "condition",
    title: "Headache and Migraine Diary",
    useCase:
      "A written record of when headaches happen, how long they last, and what was going on around them gives your clinician far more to work with than memory alone. Patterns across weeks are often the key to a diagnosis or a treatment change.",
    intro: "Start a new row for each headache and fill it in as soon afterward as you can.",
    columns: ["Date", "Start time", "Duration", "Pain location", "Severity (0-10)", "Medication taken", "Possible triggers / notes"],
    defaultRows: 15,
    rowOptions: [10, 15, 20, 30],
    notes: [
      "Record anything unusual before the headache, such as sleep, meals, or stress.",
      "Note any warning signs (aura) in the notes column.",
      "If you take medication, write down the name, dose, and time.",
    ],
  },
  {
    slug: "asthma-log",
    category: "condition",
    title: "Asthma Symptom and Peak Flow Log",
    useCase:
      "Day-to-day symptoms and peak flow readings recorded at home show your clinician how your asthma behaves between visits, which a single clinic check cannot capture.",
    intro: "Record your symptoms and, if you use a peak flow meter, your readings, once or more each day.",
    columns: ["Date", "Time", "Peak flow reading", "Symptoms", "Reliever inhaler used (puffs)", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Ask your clinician how and when they want peak flow readings taken, and which numbers they want recorded.",
      "Bring your peak flow meter and inhalers to the appointment so technique can be checked.",
      "Note night-time symptoms in the notes column.",
    ],
  },
  {
    slug: "copd-log",
    category: "condition",
    title: "COPD Symptom Log",
    useCase:
      "COPD symptoms often shift gradually, and a day-by-day record helps your clinician spot changes that are easy to miss in a short appointment. It is especially useful when reviewing medications or after a flare-up.",
    intro: "Fill in one row per day, recording how your breathing, cough, and sputum were.",
    columns: ["Date", "Breathlessness (0-10)", "Cough", "Sputum (phlegm) amount / color", "Inhaler / medication use", "Activity level", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "Record any use of a reliever or rescue inhaler, including how many times.",
      "Note anything that seemed connected to that day's symptoms, such as weather or exertion.",
    ],
  },
  {
    slug: "seizure-diary",
    category: "condition",
    title: "Seizure Diary",
    useCase:
      "An accurate record of each seizure - when it happened, how long it lasted, and what it looked like - is one of the most useful things you can bring to a neurology appointment. It can shape both diagnosis and medication decisions.",
    intro: "Fill in one row per seizure, as soon afterward as possible, with help from a witness if one was present.",
    columns: ["Date", "Time", "Duration", "What happened (description)", "Warning signs before", "Recovery time", "Possible triggers / notes"],
    defaultRows: 12,
    rowOptions: [12, 20, 30],
    notes: [
      "A witness description is valuable - ask someone who saw the seizure to help fill in the row.",
      "Record missed medication doses in the notes column.",
      "If a seizure was filmed, note that a video exists so you can show it at the appointment.",
    ],
  },
  {
    slug: "palpitations-log",
    category: "condition",
    title: "Palpitations Log",
    useCase:
      "Palpitations rarely happen during an appointment, so a log of when they occur, how long they last, and what they feel like helps your clinician decide what testing, if any, is needed.",
    intro: "Start a new row each time you notice palpitations and describe them in your own words.",
    columns: ["Date", "Time", "Duration", "What it felt like", "What you were doing", "Pulse (if taken)", "Other symptoms / notes"],
    defaultRows: 15,
    rowOptions: [10, 15, 20, 30],
    notes: [
      "Words like fluttering, pounding, racing, or skipping help describe the sensation.",
      "Note caffeine, alcohol, or medication changes around the time in the notes column.",
    ],
  },
  {
    slug: "edema-log",
    category: "condition",
    title: "Swelling (Edema) Log",
    useCase:
      "Swelling can change through the day and from day to day, so a record of where and when it appears - along with daily weight if you measure it - gives your clinician a much fuller picture than a single exam.",
    intro: "Fill in one row per day, recording where swelling was and how it compared to usual.",
    columns: ["Date", "Time", "Location of swelling", "Severity (mild / moderate / severe)", "Weight (if measured)", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "If you weigh yourself, use the same scale at about the same time of day and note the time.",
      "Record things like long periods of sitting or standing, salty meals, or new medications in the notes column.",
    ],
  },
  {
    slug: "fever-log",
    category: "condition",
    title: "Temperature and Fever Log",
    useCase:
      "A record of temperatures over hours or days shows your clinician the pattern of a fever - how high it went, how long it lasted, and how it responded to medication - which a single reading cannot.",
    intro: "Record each temperature reading along with how it was taken and any medication given.",
    columns: ["Date", "Time", "Temperature", "How taken (oral / ear / other)", "Medication given (name, dose, time)", "Other symptoms / notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Use the same thermometer and the same method each time when possible.",
      "Note whether the reading was taken before or after any fever medication.",
    ],
  },
  {
    slug: "pulse-ox-log",
    category: "condition",
    title: "Blood Oxygen (Pulse Ox) Log",
    useCase:
      "Home pulse oximeter readings taken over time show your clinician how your oxygen levels behave during daily life, at rest and with activity, rather than at a single moment in clinic.",
    intro: "Record each reading along with what you were doing just before you took it.",
    columns: ["Date", "Time", "Oxygen level (SpO2 %)", "Pulse", "At rest or after activity", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Ask your clinician when and how often they want readings taken, and in what position.",
      "Cold fingers and nail polish can affect readings - note anything like this in the notes column.",
      "Bring your oximeter to the appointment so it can be checked against the clinic device.",
    ],
  },
  {
    slug: "breathing-log",
    category: "condition",
    title: "Shortness of Breath Log",
    useCase:
      "Recording when breathlessness happens, what brings it on, and how long it lasts helps your clinician tell one cause from another and see whether things are changing over time.",
    intro: "Start a new row each time you notice shortness of breath, recording what you were doing when it began.",
    columns: ["Date", "Time", "What you were doing", "Severity (0-10)", "Duration", "What helped or changed it", "Notes"],
    defaultRows: 15,
    rowOptions: [10, 15, 20, 30],
    notes: [
      "Note whether it came on suddenly or gradually.",
      "Record anything that happened alongside it, such as chest tightness, cough, or wheeze.",
    ],
  },
  {
    slug: "joint-log",
    category: "condition",
    title: "Joint Pain and Stiffness Log",
    useCase:
      "Joint symptoms often move around and vary day to day. A record of which joints were affected, when, and for how long helps your clinician see patterns that matter for diagnosis and treatment review.",
    intro: "Fill in one row per day, listing the joints that were painful or stiff.",
    columns: ["Date", "Joints affected", "Pain (0-10)", "Morning stiffness (how long)", "Swelling or redness", "Medication taken", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "Record how long morning stiffness lasted rather than just whether it happened.",
      "Note activities or weather changes you think might be connected.",
    ],
  },
  {
    slug: "skin-flare-log",
    category: "condition",
    title: "Skin Flare Log",
    useCase:
      "Skin flares are often gone or changed by the time of an appointment. A dated record - ideally alongside photos on your phone - lets your clinician see how flares appear, spread, and settle.",
    intro: "Start a new row for each flare, recording where it appeared and what it looked like.",
    columns: ["Date started", "Location on body", "Appearance (color, texture)", "Itch / pain (0-10)", "Products or treatments used", "Date it settled", "Notes"],
    defaultRows: 12,
    rowOptions: [12, 20, 30],
    notes: [
      "Dated photos are very helpful - note in the row when you took one.",
      "Record new soaps, detergents, foods, or medications around the time of the flare.",
    ],
  },
  {
    slug: "tinnitus-log",
    category: "condition",
    title: "Tinnitus Log",
    useCase:
      "Tinnitus is invisible to everyone but you, so a written record of when it happens, what it sounds like, and how intrusive it is gives your clinician something concrete to work from.",
    intro: "Fill in one row per day or per episode, describing the sound in your own words.",
    columns: ["Date", "Time", "Which ear (left / right / both)", "Sound description", "Loudness (0-10)", "Effect on sleep or concentration", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30],
    notes: [
      "Words like ringing, buzzing, hissing, or pulsing help describe the sound.",
      "Note noisy environments, headphone use, or new medications in the notes column.",
    ],
  },
  {
    slug: "dizziness-falls-log",
    category: "condition",
    title: "Dizziness and Falls Log",
    useCase:
      "Details recorded right after a dizzy spell or fall - what you were doing, how it felt, how long it lasted - are exactly what clinicians need to narrow down a cause, and they fade quickly from memory.",
    intro: "Start a new row for each dizzy spell or fall and fill it in as soon as you can.",
    columns: ["Date", "Time", "Dizzy spell or fall", "What you were doing", "How it felt (spinning, faint, unsteady)", "Duration", "Injuries / notes"],
    defaultRows: 12,
    rowOptions: [12, 20, 30],
    notes: [
      "Note whether you were standing up, turning your head, or changing position when it started.",
      "If anyone saw it happen, ask them to add what they observed.",
    ],
  },
  {
    slug: "hydration-log",
    category: "daily",
    title: "Hydration Log",
    useCase:
      "A written record of what you actually drink through the day is far more reliable than an estimate given in the appointment, and it is often requested when reviewing kidney, bladder, or medication issues.",
    intro: "Record each drink with the time, type, and rough amount.",
    columns: ["Date", "Time", "Drink type", "Amount", "Daily total", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Ask your clinician whether they want caffeinated and alcoholic drinks recorded separately.",
      "Using the same cup or bottle makes amounts easier to estimate.",
    ],
  },
  {
    slug: "bowel-log",
    category: "daily",
    title: "Bowel Habit Log",
    useCase:
      "Bowel symptoms are hard to describe accurately weeks later. A dated record of frequency, form, and anything unusual gives your clinician the detail needed to assess changes properly.",
    intro: "Fill in one row per bowel movement, or one per day, whichever is easier to keep up.",
    columns: ["Date", "Time", "Consistency / form", "Urgency", "Blood or mucus seen", "Pain or straining", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Your clinician may want you to use a stool chart to describe form - ask which one.",
      "Note any laxatives or fiber supplements used, with the time.",
    ],
  },
  {
    slug: "urinary-log",
    category: "daily",
    title: "Urinary Symptom Log",
    useCase:
      "A bladder record kept over a few days shows your clinician how often you pass urine, how urgent it is, and what happens overnight - detail that a verbal summary rarely captures.",
    intro: "Record each time you pass urine, with the time and anything you noticed.",
    columns: ["Date", "Time", "Amount (small / medium / large)", "Urgency", "Leakage (yes / no)", "Pain or burning", "Notes"],
    defaultRows: 24,
    rowOptions: [12, 24, 36, 60],
    notes: [
      "Ask your clinician whether they also want your drinks recorded, and over how many days.",
      "Mark night-time entries so they are easy to spot.",
    ],
  },
  {
    slug: "energy-log",
    category: "daily",
    title: "Energy and Fatigue Log",
    useCase:
      "Fatigue is easier to assess when your clinician can see how it varies across days and what it changed about your plans. A simple daily record turns vague tiredness into something concrete to discuss.",
    intro: "Fill in one row per day, rating your energy and noting what you were able to do.",
    columns: ["Date", "Energy (0-10)", "Sleep last night (hours)", "Naps / rest taken", "Activities managed", "What seemed connected", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "Rate at about the same time each day so days are comparable.",
      "Note days when fatigue changed what you had planned to do.",
    ],
  },
  {
    slug: "mood-log",
    category: "mental",
    title: "Mood Log",
    useCase:
      "Mood recalled at an appointment tends to reflect only the most recent days. A daily record shows your clinician the real pattern over weeks, which matters for both diagnosis and medication review.",
    intro: "Fill in one row per day, at about the same time each day if you can.",
    columns: ["Date", "Mood (0-10)", "Sleep (hours)", "Medication taken (yes / no)", "Significant events", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "A word or two for the day - flat, irritable, calm - can say a lot alongside the number.",
      "Ordinary, unremarkable days are part of the picture, so record those too.",
    ],
  },
  {
    slug: "anxiety-log",
    category: "mental",
    title: "Anxiety and Panic Log",
    useCase:
      "Recording anxious episodes and panic attacks soon after they happen - what led up to them, what they felt like, how long they lasted - gives your clinician or therapist specific material to work with instead of general impressions.",
    intro: "Start a new row for each episode and fill it in as soon afterward as you can.",
    columns: ["Date", "Time", "Situation / trigger", "Physical sensations", "Thoughts at the time", "Intensity (0-10)", "Duration / notes"],
    defaultRows: 12,
    rowOptions: [12, 20, 30],
    notes: [
      "Record what was happening just before the episode, even if it seems unrelated.",
      "Note what you did during and after the episode in the notes column.",
    ],
  },
  {
    slug: "stress-log",
    category: "mental",
    title: "Stress Log",
    useCase:
      "A daily stress record helps you and your clinician see which situations come up again and again, and how stress lines up with sleep, symptoms, or flare-ups of other conditions.",
    intro: "Fill in one row per day, rating your stress and noting its main sources.",
    columns: ["Date", "Stress level (0-10)", "Main sources of stress", "Physical signs noticed", "How you responded", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 30, 60],
    notes: [
      "Physical signs might include tense shoulders, headaches, or poor sleep - record whatever you noticed.",
      "Note days that were unusually calm as well as stressful ones.",
    ],
  },
  {
    slug: "allergy-reaction-log",
    category: "condition",
    title: "Allergy Reaction Log",
    useCase:
      "For allergy testing and treatment decisions, clinicians rely on exactly the details this log captures: what you were exposed to, how quickly symptoms appeared, what they were, and what was done.",
    intro: "Fill in one row per reaction, as soon after it as you can.",
    columns: ["Date", "Time", "Suspected exposure", "Time from exposure to symptoms", "Symptoms", "Treatment given", "Notes"],
    defaultRows: 12,
    rowOptions: [12, 20, 30],
    notes: [
      "Keep packaging or ingredient labels from suspected foods or products when you can.",
      "Record any medication used for the reaction, including the time it was taken.",
    ],
  },
  {
    slug: "food-symptom-diary",
    category: "condition",
    title: "Food and Symptom Diary",
    useCase:
      "Linking foods to symptoms is nearly impossible from memory. A diary that records meals and symptoms side by side, with times, lets your clinician or dietitian look for genuine patterns.",
    intro: "Record everything you eat and drink with the time, and any symptoms with their time, on the same page.",
    columns: ["Date", "Time", "Food / drink (with amounts)", "Time of symptoms", "Symptoms", "Severity (0-10)", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Include snacks, drinks, sauces, and supplements - small items matter.",
      "Ask your clinician whether they want you to eat as usual while you keep the diary.",
      "Symptom-free days are informative too, so record those as well.",
    ],
  },
  {
    slug: "medication-schedule",
    category: "medication",
    title: "Weekly Medication Schedule",
    useCase:
      "A completed weekly grid shows your clinician or pharmacist exactly what you take and when, making medication reviews faster and more accurate. It is also a practical memory aid at home.",
    intro: "List each medication with its dose and time in the first column, then mark each day you took it.",
    columns: ["Medication - dose - time", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    defaultRows: 12,
    rowOptions: [8, 12, 16, 20],
    notes: [
      "Include over-the-counter medicines, vitamins, and supplements.",
      "Bring your medication bottles or an up-to-date pharmacy list to your appointment so the schedule can be checked against them.",
    ],
  },
  {
    slug: "side-effect-log",
    category: "medication",
    title: "Medication Side Effect Log",
    useCase:
      "When something new appears after a medication change, your prescriber will want to know what you noticed, when it started, and whether it is still happening. A dated record answers those questions precisely.",
    intro: "Record anything new you notice after starting or changing a medication.",
    columns: ["Date started", "Medication suspected", "What you noticed", "Severity (mild / moderate / severe)", "Still ongoing?", "Notes"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Note the date the medication was started or changed, if you know it.",
      "Decisions about starting, stopping, or changing a medication belong to your prescriber or pharmacist.",
    ],
  },
  {
    slug: "inr-log",
    category: "medication",
    title: "INR Result Log",
    useCase:
      "Your anticoagulation clinic reviews INR (international normalized ratio, the blood-thinner monitoring number) results alongside the dose you were taking and anything that changed that week. One page with all of it in order makes each review quicker and more complete.",
    intro: "Record each INR result along with the dose your clinic instructed you to take.",
    columns: ["Date", "INR result", "Where tested (clinic / lab / home)", "Dose as prescribed", "Changes that week (illness, new meds, missed dose)", "Notes / instructions given"],
    defaultRows: 16,
    rowOptions: [8, 16, 26, 52],
    notes: [
      "Dosing decisions belong to your clinic - record the dose you were told to take and any instructions given with each result.",
      "Note new medications, antibiotics, illness, or missed doses, since your clinic will ask about them.",
    ],
  },
  {
    slug: "insulin-glucose-log",
    category: "medication",
    title: "Insulin and Glucose Record",
    useCase:
      "A written record of glucose readings alongside insulin doses lets your clinician see how the two relate across real days. It captures detail that a meter's memory alone does not.",
    intro: "Record each glucose check and each insulin dose with the date and time.",
    columns: ["Date", "Time", "Glucose reading", "Insulin type and units", "Food / activity", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Ask your clinician which times of day they want recorded and how they want results reported.",
      "Bring your meter or pen with you so device records can be compared with the written log.",
    ],
  },
  {
    slug: "ketone-log",
    category: "medication",
    title: "Ketone Log",
    useCase:
      "If your clinician has asked you to check ketones, a dated record of the results and what was happening at the time gives them the full picture at your next contact.",
    intro: "Record each ketone check with the result and what was happening at the time.",
    columns: ["Date", "Time", "Result", "Blood or urine test", "Glucose (if checked)", "What was happening (illness, other)", "Notes"],
    defaultRows: 16,
    rowOptions: [8, 16, 24, 32],
    notes: [
      "Ask your clinician when they want you to check ketones and which results they want reported, and how quickly.",
      "Note the test strip brand, since results are read differently across products.",
    ],
  },
  {
    slug: "cgm-notes",
    category: "medication",
    title: "CGM Notes Log",
    useCase:
      "For continuous glucose monitor (CGM) wearers: sensor downloads show numbers but not context. Notes about meals, activity, illness, and sensor issues help your clinician interpret the graphs at your review.",
    intro: "Record meals, activity, illness, and sensor events so they can be matched to your sensor data later.",
    columns: ["Date", "Time", "Event (meal, activity, illness, sensor change)", "Sensor reading at the time", "Fingerstick reading (if taken)", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Note sensor changes, adhesive problems, and any gaps in sensor data.",
      "Ask your clinic how they want fingerstick comparisons recorded, if they want them at all.",
    ],
  },
  {
    slug: "allergy-shot-record",
    category: "medication",
    title: "Allergy Shot Record",
    useCase:
      "Immunotherapy schedules run for years, and your own copy of each dose helps you keep track of where you are in the schedule. It is especially useful if you move or change clinics.",
    intro: "Record each injection visit before you leave the clinic.",
    columns: ["Date", "Extract / vial", "Dose given", "Arm", "Reaction noticed", "Wait time completed", "Notes"],
    defaultRows: 24,
    rowOptions: [12, 24, 36, 52],
    notes: [
      "The clinic's chart remains the official record - this is your personal copy.",
      "Ask the clinic how long they want you to wait after each injection and what they want reported afterward.",
    ],
  },
  {
    slug: "cycle-log",
    category: "women",
    title: "Menstrual Cycle Log",
    useCase:
      "Clinicians often ask about cycle timing, length, and symptoms, and several months of dated entries answer those questions far better than memory. It is useful for many kinds of appointments, from routine checkups to specialist referrals.",
    intro: "Record each cycle as it happens, one row per cycle.",
    columns: ["Start date", "End date", "Bleeding days", "Flow (light / medium / heavy)", "Symptoms", "Notes"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Record any bleeding between cycles in the notes column with its dates.",
      "Note medication changes, since your clinician may ask about them alongside the dates.",
    ],
  },
  {
    slug: "menopause-log",
    category: "women",
    title: "Menopause Symptom Log",
    useCase:
      "Symptom patterns over weeks are more useful to your clinician than a summary from memory. A dated log supports a specific conversation about what you have been experiencing.",
    intro: "Record your symptoms at the end of each day.",
    columns: ["Date", "Hot flashes (number)", "Night sweats", "Sleep", "Mood", "Other symptoms", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Record anything else you want to raise at your appointment in the notes column so it is not forgotten.",
      "Note the date of your last period if you know it, since your clinician will likely ask.",
    ],
  },
  {
    slug: "pregnancy-appointment-log",
    category: "women",
    title: "Pregnancy Appointment Log",
    useCase:
      "Prenatal care involves many visits with different measurements and results at each one. Keeping them on one page lets you see the whole course of your care and share it if you are seen somewhere new.",
    intro: "Bring this to every visit and record what was measured and discussed.",
    columns: ["Date", "Weeks along", "Blood pressure", "Weight", "Tests / results discussed", "Questions and answers", "Next visit"],
    defaultRows: 14,
    rowOptions: [7, 14, 21],
    notes: [
      "Write down questions before each visit in the questions column so they get asked.",
      "Ask your clinic for copies of results you want to record here.",
    ],
  },
  {
    slug: "kick-count-record",
    category: "women",
    title: "Baby Movement Record",
    useCase:
      "Many clinicians ask patients to keep a written record of their baby's movements in later pregnancy. Dated sessions on one page give your clinician a clear picture over time.",
    intro: "Record each counting session with its start time, end time, and the number of movements.",
    columns: ["Date", "Start time", "End time", "Movements counted", "Position / activity", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Ask your clinician how they want movements counted - what counts as a movement, when to count, and for how long.",
      "Ask your clinician when they would want you to call about your baby's movements.",
    ],
  },
  {
    slug: "infant-feeding-log",
    category: "family",
    title: "Infant Feeding Log",
    useCase:
      "Feeding questions dominate early pediatric visits. A written record of times, sides, and amounts replaces estimates made on very little sleep.",
    intro: "Record every feed as it happens, one row per feed.",
    columns: ["Date", "Time", "Type (breast / bottle / solids)", "Side or amount", "Duration", "Notes"],
    defaultRows: 24,
    rowOptions: [12, 24, 36, 48],
    notes: [
      "Note whether bottle feeds were expressed milk or formula, and which formula.",
      "Record spit-up or feeding difficulties in the notes column, since your clinician may ask.",
    ],
  },
  {
    slug: "diaper-log",
    category: "family",
    title: "Diaper Log",
    useCase:
      "Diaper output is one of the first things a pediatric clinician asks about in the early weeks. A written log answers those questions precisely instead of from a tired guess.",
    intro: "Record each diaper change as it happens.",
    columns: ["Date", "Time", "Wet", "Dirty", "Color / consistency", "Notes"],
    defaultRows: 24,
    rowOptions: [12, 24, 36, 48],
    notes: [
      "A simple check mark works for the wet and dirty columns.",
      "This log pairs naturally with the Infant Feeding Log for early checkups.",
    ],
  },
  {
    slug: "child-growth-record",
    category: "family",
    title: "Child Growth Record",
    useCase:
      "One page of dated measurements travels well - to a new pediatrician, a specialist, or a school or camp form. It also saves digging through visit summaries for a single number.",
    intro: "Record each measurement with the date and where it was taken.",
    columns: ["Date", "Age", "Weight", "Height / length", "Head circumference", "Measured where", "Notes"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Note whether each measurement was taken at a clinic or at home.",
      "Record the units used (lb or kg, in or cm) so entries can be compared.",
    ],
  },
  {
    slug: "child-symptom-log",
    category: "family",
    title: "Child Symptom and Fever Log",
    useCase:
      "When a child is ill, clinicians ask when symptoms started, what the temperature readings were, and what medicine was given when. A timed record answers all of it exactly.",
    intro: "Record each temperature reading and any medicine given, with times.",
    columns: ["Date", "Time", "Temperature", "How taken (oral / ear / forehead / other)", "Symptoms", "Medicine given (name, dose, time)", "Notes"],
    defaultRows: 16,
    rowOptions: [8, 16, 24, 32],
    notes: [
      "Record what the child was eating, drinking, and doing in the notes column, since clinicians often ask.",
      "Bring the medicine bottle or packaging to the appointment along with this log.",
    ],
  },
  {
    slug: "vaccination-record",
    category: "family",
    title: "Vaccination Record",
    useCase:
      "Schools, camps, employers, and new clinics all ask for vaccination history. Your own dated record keeps the answers in one place even when care has been spread across several providers.",
    intro: "Record each vaccine at the visit where it is given.",
    columns: ["Date", "Vaccine", "Dose number", "Given by / location", "Lot number (if known)", "Next dose scheduled", "Notes"],
    defaultRows: 16,
    rowOptions: [8, 16, 24, 32],
    notes: [
      "This is a personal record - the clinic or registry record remains the official one.",
      "Ask for the vaccine name, dose number, and lot number at the visit so you can record them on the spot.",
    ],
  },
  {
    slug: "family-health-history",
    category: "family",
    title: "Family Health History Record",
    useCase:
      "Clinicians routinely ask which conditions run in your family, and a prepared record is more complete and accurate than answering from memory in the exam room. It is worth filling in once and updating over time.",
    intro: "Record one row per family member and condition, going back as far as you know.",
    columns: ["Family member", "Relationship to you", "Condition", "Age at diagnosis (approx.)", "Living / deceased", "Notes"],
    defaultRows: 16,
    rowOptions: [8, 16, 24, 32],
    notes: [
      "Approximate ages are still useful - record your best estimate and mark it as such.",
      "Older relatives are often the best source - a phone call can fill in gaps.",
    ],
  },
  {
    slug: "pt-exercise-log",
    category: "treatment",
    title: "Physical Therapy Exercise Log",
    useCase:
      "Your therapist adjusts your program based on what you actually did between sessions and how it felt. A completed log starts each session from real information instead of recall.",
    intro: "Record each session of the exercises your therapist prescribed.",
    columns: ["Date", "Exercise (as prescribed)", "Sets / reps / hold time", "Pain or difficulty (0-10)", "Completed as instructed?", "Notes"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 40],
    notes: [
      "Record the exercises exactly as your therapist prescribed them.",
      "Questions about how an exercise should feel, or whether to change it, belong to your therapist.",
    ],
  },
  {
    slug: "surgery-recovery-log",
    category: "treatment",
    title: "Surgery Recovery Log",
    useCase:
      "Follow-up visits after surgery cover pain, medications, the incision, and activity since discharge. A daily record answers those questions with specifics instead of estimates.",
    intro: "Fill in one row each day, starting the day you come home.",
    columns: ["Date", "Pain (0-10)", "Pain medicine taken (name, dose, time)", "Incision appearance", "Activity / mobility", "Temperature (if taken)", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 21, 28],
    notes: [
      "Ask your surgical team what they want you to check each day and when they want a phone call.",
      "Keep your discharge instructions with this log so both are at hand for follow-up.",
    ],
  },
  {
    slug: "wound-care-log",
    category: "treatment",
    title: "Wound Care Log",
    useCase:
      "Wound healing is judged by change over time, and dated entries from each dressing change give your clinician a timeline no single visit can show. It also documents who did each change and with what supplies.",
    intro: "Record each dressing change and how the wound looked.",
    columns: ["Date", "Time", "Changed by", "Wound appearance (size, color, drainage)", "Supplies used", "Notes"],
    defaultRows: 14,
    rowOptions: [7, 14, 21, 28],
    notes: [
      "Ask your clinician how they want the wound described or measured so entries stay consistent.",
      "If your clinician has asked for photos, note the date each photo was taken so it matches a row.",
    ],
  },
  {
    slug: "dialysis-log",
    category: "treatment",
    title: "Dialysis Session Log",
    useCase:
      "Session-to-session numbers and how you felt afterward are exactly what your nephrology team reviews. One page covering many sessions makes patterns easy for them to see, whether you dialyze in-center or at home.",
    intro: "Record one row per session, using the numbers your care team gives you.",
    columns: ["Date", "Weight before", "Weight after", "Blood pressure (before / after)", "Fluid removed", "How you felt after", "Notes"],
    defaultRows: 12,
    rowOptions: [12, 24, 36, 52],
    notes: [
      "Ask your care team which numbers they want you to record at each session.",
      "Note missed or shortened sessions and the reason, since your team will ask.",
    ],
  },
  {
    slug: "chemo-diary",
    category: "treatment",
    title: "Chemotherapy Treatment Diary",
    useCase:
      "Your oncology team plans supportive care around how you felt between visits, and day-by-day entries capture details that are easy to forget by the next appointment. The diary also keeps your treatment dates and medications in one place.",
    intro: "Fill in one row per day of your treatment cycle.",
    columns: ["Date", "Cycle / day", "Treatment received", "Side effects noticed", "Severity (0-10)", "Medicines taken for symptoms", "Notes"],
    defaultRows: 21,
    rowOptions: [7, 14, 21, 28],
    notes: [
      "Ask your care team which symptoms they want reported right away rather than at the next visit.",
      "Record food and fluid intake in the notes column if your team has asked about it.",
    ],
  },
  {
    slug: "appointment-tracker",
    category: "paperwork",
    title: "Appointment and Referral Tracker",
    useCase:
      "When care involves several providers, referrals and follow-ups are easy to lose track of. One page listing every appointment, referral, and outcome keeps the scheduling and paperwork in order.",
    intro: "Record each appointment or referral and update the row as it progresses.",
    columns: ["Date", "Provider / specialty", "Reason", "Referral status", "Outcome / follow-up needed", "Next appointment"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Record who is supposed to send the referral and when it was sent.",
      "Note phone numbers and portal details in the margin so rescheduling is easy.",
    ],
  },
  {
    slug: "insurance-call-log",
    category: "paperwork",
    title: "Insurance Call Log",
    useCase:
      "Insurance issues often take several calls to resolve, and each call starts over unless you have names, dates, and reference numbers. A written log keeps every conversation on the record and supports an appeal if you need one.",
    intro: "Fill in a row during or immediately after each call.",
    columns: ["Date", "Time", "Who you spoke with", "Reference number", "What was discussed", "What they said they would do", "Follow-up date"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Ask for a reference number on every call and write it down before hanging up.",
      "Note the exact plan name and member ID you gave, since it may come up on later calls.",
    ],
  },
  {
    slug: "medical-expense-log",
    category: "paperwork",
    title: "Medical Expense Log",
    useCase:
      "A running record of medical spending is useful for tax deductions, HSA and FSA claims, and checking bills against your explanation of benefits. It is far easier to keep as you go than to reconstruct at year end.",
    intro: "Record each medical expense as it is billed or paid.",
    columns: ["Date", "Provider / pharmacy", "Service or item", "Amount billed", "Amount paid", "Payment method", "Reimbursed?"],
    defaultRows: 20,
    rowOptions: [10, 20, 30, 60],
    notes: [
      "Keep receipts and explanation of benefits statements together with this log.",
      "Include mileage and parking if you track expenses for tax or reimbursement purposes.",
    ],
  },
  {
    slug: "bill-dispute-tracker",
    category: "paperwork",
    title: "Bill Dispute Tracker",
    useCase:
      "Billing disputes can stretch across months and several departments. A dated record of every contact, reference number, and promise keeps the history straight and gives you documentation if the dispute escalates.",
    intro: "Record every contact about the disputed bill, one row per contact.",
    columns: ["Date", "Bill / account number", "Amount in dispute", "Who was contacted", "What was said", "Reference number", "Next step"],
    defaultRows: 12,
    rowOptions: [6, 12, 18, 24],
    notes: [
      "Keep copies of the bill, the explanation of benefits, and any letters with this tracker.",
      "Note whether each contact was by phone, portal, or mail, and keep anything sent in writing.",
    ],
  },
];
