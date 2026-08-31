/**
 * Lab test reference.
 *
 * HARD RULE: nothing in this file may interpret a reader's result.
 *
 * We describe what a test measures, why a clinician orders it, and what is generally
 * known to move the number in each direction - the same register as a medical
 * encyclopedia entry. We never hold our own reference ranges, never tell a reader
 * their value is high or low, and never name a diagnosis as applying to them.
 *
 * The reader's own report carries the reference range that applies to their sample,
 * their lab's method, and their age and sex. That is the only range we point at.
 */

export interface LabTest {
  slug: string;
  name: string;
  aka?: string[];
  /** Panel this normally arrives in, used for grouping. */
  panel: PanelKey;
  /** One line for cards and meta descriptions. */
  short: string;
  /** What the test physically measures. */
  measures: string;
  /** Why a clinician would order it. */
  whyOrdered: string;
  /** Things generally associated with a higher result. Never addressed to the reader. */
  higher: string;
  /** Things generally associated with a lower result. */
  lower: string;
  /** Everyday things that shift the number and are not disease. */
  affectedBy: string[];
  /** Questions the reader can take to their appointment. */
  ask: string[];
}

export const PANELS = {
  cbc: {
    label: 'Complete Blood Count (CBC)',
    blurb:
      'Counts and measures the cells in your blood. One of the most commonly ordered panels there is.',
  },
  cmp: {
    label: 'Metabolic Panel (BMP / CMP)',
    blurb:
      'Chemistry values covering kidney function, liver enzymes, blood sugar, proteins, and electrolytes.',
  },
  kidney: {
    label: 'Kidney and Urine Tests',
    blurb: 'How well the kidneys filter, and what shows up in urine that should not.',
  },
  lipid: {
    label: 'Lipid Panel',
    blurb: 'The cholesterol and triglyceride measurements, usually ordered together.',
  },
  thyroid: {
    label: 'Thyroid Tests',
    blurb: 'Hormones and antibodies used to assess how the thyroid gland is functioning.',
  },
  diabetes: {
    label: 'Blood Sugar Tests',
    blurb: 'Measures of glucose and insulin, over a moment and over months.',
  },
  heart: {
    label: 'Heart Markers',
    blurb: 'Proteins released by heart muscle under strain or injury.',
  },
  coagulation: {
    label: 'Clotting Tests',
    blurb: 'How quickly blood clots, and the proteins involved in making it happen.',
  },
  hormones: {
    label: 'Hormone Tests',
    blurb: 'The chemical messengers: reproductive hormones, cortisol, and PSA.',
  },
  vitamins: {
    label: 'Vitamins, Minerals and Iron',
    blurb: 'Nutrient levels and the proteins that carry and store them.',
  },
  inflammation: {
    label: 'Inflammation and Immune Markers',
    blurb:
      'Non-specific inflammation tests, and the antibody tests used in autoimmune and allergy workups.',
  },
  infection: {
    label: 'Infection Tests',
    blurb: 'Tests for specific infections, and what positive and negative patterns generally mean.',
  },
  drugs: {
    label: 'Medication Level Tests',
    blurb: 'Blood levels of medications whose dose is tuned to the individual - measured, never self-interpreted.',
  },
  office: {
    label: 'Rapid Office Tests',
    blurb: 'The swab-and-wait tests done during a visit, and what their results generally mean.',
  },
  vitals: {
    label: 'Vital Signs',
    blurb: 'Not lab tests, but the numbers taken at every visit - and what each one actually measures.',
  },
} as const;

export type PanelKey = keyof typeof PANELS;

export const LAB_TESTS: LabTest[] = [
  // ---------- CBC ----------
  {
    slug: 'wbc',
    name: 'White Blood Cell Count',
    aka: ['WBC', 'Leukocyte count'],
    panel: 'cbc',
    short: 'The number of infection-fighting cells in a volume of blood.',
    measures:
      'The total number of white blood cells in a given volume of blood. White cells are the immune system cells that respond to infection, injury, and inflammation.',
    whyOrdered:
      'It is part of nearly every routine CBC. A clinician may look at it more closely when infection, inflammation, or a problem with the bone marrow is being considered, or to monitor a treatment known to affect blood counts.',
    higher:
      'A raised white cell count is broadly associated with the body responding to something - bacterial or viral infection, inflammation, tissue injury, physical or emotional stress, smoking, and certain medications, particularly corticosteroids. Marked elevations can also occur in disorders of the bone marrow.',
    lower:
      'A reduced count is broadly associated with some viral infections, certain autoimmune conditions, some vitamin deficiencies, several medications including chemotherapy, and conditions affecting the bone marrow.',
    affectedBy: [
      'Recent infection, even a mild one that has resolved',
      'Corticosteroids and some other common medications',
      'Strenuous exercise shortly before the draw',
      'Pregnancy',
      'Smoking',
    ],
    ask: [
      'Is this result different from my previous ones?',
      'Could any medication I take be affecting this?',
    ],
  },
  {
    slug: 'hemoglobin',
    name: 'Hemoglobin',
    aka: ['Hgb', 'Hb'],
    panel: 'cbc',
    short: 'The oxygen-carrying protein inside red blood cells.',
    measures:
      'The concentration of hemoglobin, the iron-containing protein in red blood cells that carries oxygen from the lungs to the rest of the body.',
    whyOrdered:
      'It is the value most often used to assess for anemia, and it is followed over time in people with chronic kidney disease, heavy menstrual bleeding, gastrointestinal bleeding, or during treatments that suppress blood counts.',
    higher:
      'Higher hemoglobin is broadly associated with dehydration, living at high altitude, smoking, chronic lung conditions, and less commonly with bone marrow disorders that overproduce red cells.',
    lower:
      'Lower hemoglobin defines anemia, which is a finding rather than a diagnosis. It is broadly associated with iron, vitamin B12, or folate deficiency, blood loss including slow gastrointestinal bleeding, chronic disease, kidney disease, and pregnancy.',
    affectedBy: [
      'Hydration - being dehydrated concentrates the blood and raises the value',
      'Altitude of residence',
      'Pregnancy, which normally lowers it',
      'Time of day and posture during the draw, slightly',
    ],
    ask: [
      'If this is low, do we know the cause?',
      'Should iron, B12, or folate be checked?',
      'Is there any reason to look for a source of bleeding?',
    ],
  },
  {
    slug: 'hematocrit',
    name: 'Hematocrit',
    aka: ['Hct', 'Packed cell volume'],
    panel: 'cbc',
    short: 'The percentage of your blood volume made up of red blood cells.',
    measures:
      'The proportion of your total blood volume that consists of red blood cells, expressed as a percentage.',
    whyOrdered:
      'It moves closely with hemoglobin and is used alongside it to assess for anemia or an overly concentrated blood volume.',
    higher:
      'Broadly associated with the same things that raise hemoglobin: dehydration, high altitude, smoking, chronic lung disease, and bone marrow disorders that overproduce red cells.',
    lower:
      'Broadly associated with anemia from any cause, blood loss, overhydration, and pregnancy.',
    affectedBy: ['Hydration status', 'Altitude', 'Pregnancy', 'Recent blood donation'],
    ask: [
      'Does this match my hemoglobin result?',
      'Could dehydration explain this reading?',
    ],
  },
  {
    slug: 'mcv',
    name: 'Mean Corpuscular Volume',
    aka: ['MCV', 'Red cell size'],
    panel: 'cbc',
    short: 'The average size of your red blood cells.',
    measures:
      'The average volume of a single red blood cell. It tells a clinician whether red cells are unusually small, unusually large, or typical in size.',
    whyOrdered:
      'It is reported automatically with every CBC and is one of the most useful values for narrowing down the cause of an anemia, because different causes produce different cell sizes.',
    higher:
      'Larger-than-typical red cells are broadly associated with vitamin B12 or folate deficiency, alcohol use, certain medications, thyroid underactivity, and some bone marrow conditions.',
    lower:
      'Smaller-than-typical red cells are broadly associated with iron deficiency and with inherited hemoglobin conditions such as the thalassemias.',
    affectedBy: [
      'Alcohol intake',
      'Several common medications',
      'Coexisting deficiencies, which can offset each other and produce a middling value',
    ],
    ask: [
      'Does this point toward a particular cause of anemia?',
      'Should B12, folate, or iron studies be checked alongside this?',
    ],
  },
  {
    slug: 'platelets',
    name: 'Platelet Count',
    aka: ['PLT', 'Thrombocytes'],
    panel: 'cbc',
    short: 'The cells that let blood clot.',
    measures:
      'The number of platelets, the small cell fragments that clump together to stop bleeding.',
    whyOrdered:
      'Part of every CBC. It is looked at closely before procedures, when unusual bruising or bleeding is reported, and to monitor conditions or medications known to affect clotting.',
    higher:
      'Broadly associated with inflammation, infection, iron deficiency, recent surgery, removal of the spleen, and less commonly with bone marrow disorders.',
    lower:
      'Broadly associated with some viral infections, certain medications, autoimmune conditions, liver disease, pregnancy, and bone marrow conditions.',
    affectedBy: [
      'Recent infection or inflammation',
      'Pregnancy',
      'Clumping in the tube, which can produce a falsely low result and may need a repeat draw',
    ],
    ask: [
      'Could this be a lab artifact that needs a repeat?',
      'Does this change anything about a procedure I have planned?',
    ],
  },
  {
    slug: 'rdw',
    name: 'Red Cell Distribution Width',
    aka: ['RDW'],
    panel: 'cbc',
    short: 'How much your red blood cells vary in size from one another.',
    measures:
      'The variation in size across your red blood cells. A high value means the cells are of noticeably mixed sizes rather than uniform.',
    whyOrdered:
      'Reported automatically with a CBC. It is most useful read together with MCV, because the combination narrows the possible causes of an anemia further than either does alone.',
    higher:
      'Increased variation is broadly associated with nutritional deficiencies including iron, B12 and folate, with recent blood transfusion, and with a body actively producing new red cells after blood loss.',
    lower:
      'A low or typical value simply indicates uniformly sized cells and is generally not pursued on its own.',
    affectedBy: ['Recent transfusion', 'Recovering from a treated deficiency', 'Mixed deficiencies'],
    ask: ['How does this read alongside my MCV?'],
  },

  // ---------- CMP ----------
  {
    slug: 'glucose',
    name: 'Glucose (blood sugar)',
    aka: ['Blood sugar', 'Fasting glucose'],
    panel: 'cmp',
    short: 'The amount of sugar in your blood at the moment of the draw.',
    measures:
      'The concentration of glucose in your blood at the instant the sample was taken. It is a snapshot, not an average.',
    whyOrdered:
      'Included in routine metabolic panels, used in screening for and monitoring diabetes and prediabetes, and checked when symptoms suggesting high or low blood sugar are described.',
    higher:
      'Broadly associated with diabetes and prediabetes, with acute illness or stress, with corticosteroids and several other medications, and with having eaten before a draw that was meant to be fasting.',
    lower:
      'Broadly associated with going a long time without eating, with some diabetes medications, with alcohol, and less commonly with hormonal or liver conditions.',
    affectedBy: [
      'Whether you actually fasted, and for how long',
      'Illness or physical stress on the day',
      'Corticosteroids',
      'A sample that sat too long before processing, which can lower the reading',
    ],
    ask: [
      'Was this meant to be a fasting sample, and was I fasting?',
      'Should an A1C be checked to see the longer-term picture?',
    ],
  },
  {
    slug: 'creatinine',
    name: 'Creatinine',
    panel: 'cmp',
    short: 'A muscle waste product the kidneys filter out.',
    measures:
      'The concentration of creatinine, a waste product produced by normal muscle metabolism and removed from the blood by the kidneys.',
    whyOrdered:
      'It is the standard measure used to assess kidney filtering, and is followed over time in people with kidney disease, diabetes, or high blood pressure, and before and during medications processed by the kidneys.',
    higher:
      'Broadly associated with reduced kidney filtering from any cause, with dehydration, with high muscle mass, with a high-meat meal shortly before the draw, and with certain medications that alter how creatinine is handled without changing kidney function itself.',
    lower:
      'Broadly associated with low muscle mass, older age, pregnancy, and prolonged illness.',
    affectedBy: [
      'Muscle mass - a very muscular person runs higher without any kidney problem',
      'Hydration',
      'A large meat meal before the draw',
      'Creatine supplements',
    ],
    ask: [
      'What is my eGFR, and how does it compare to last time?',
      'Do any of my medications need dose adjustment based on this?',
    ],
  },
  {
    slug: 'egfr',
    name: 'eGFR',
    aka: ['Estimated glomerular filtration rate'],
    panel: 'cmp',
    short: 'A calculated estimate of how well your kidneys are filtering.',
    measures:
      'Not a measured value but a calculation. A formula combines your creatinine with your age and sex to estimate how much blood your kidneys filter per minute.',
    whyOrdered:
      'It is reported automatically alongside creatinine because the calculated number is easier to track over time than creatinine alone, and it is the basis for staging chronic kidney disease.',
    higher: 'A higher eGFR indicates more filtering capacity and is generally the desirable direction.',
    lower:
      'A lower eGFR indicates reduced filtering. Broadly associated with chronic kidney disease, acute kidney injury, dehydration, and the gradual decline that occurs with age.',
    affectedBy: [
      'Everything that affects creatinine, since it is calculated from it',
      'The specific formula your lab uses, which has changed over the years',
      'Being a single point in time rather than a trend',
    ],
    ask: [
      'Is this a change from my previous results or a stable number?',
      'Should this be rechecked when I am well hydrated?',
    ],
  },
  {
    slug: 'alt',
    name: 'ALT',
    aka: ['Alanine aminotransferase', 'SGPT'],
    panel: 'cmp',
    short: 'A liver enzyme that rises when liver cells are irritated.',
    measures:
      'The concentration of alanine aminotransferase, an enzyme found mainly inside liver cells. When those cells are injured or inflamed, the enzyme leaks into the bloodstream.',
    whyOrdered:
      'Part of a comprehensive metabolic panel, checked when liver involvement is being considered, and monitored during medications known to affect the liver.',
    higher:
      'Broadly associated with fatty liver, alcohol, viral hepatitis, a number of medications and supplements, and recent strenuous exercise. Mild elevations are common and are usually investigated by repeating the test rather than acting immediately.',
    lower: 'Low values are common and generally not pursued.',
    affectedBy: [
      'Strenuous exercise in the days before the draw',
      'Alcohol',
      'Over-the-counter medications and herbal supplements',
      'Body weight',
    ],
    ask: [
      'How does this compare with my AST and my previous results?',
      'Could any medication or supplement I take be involved?',
    ],
  },
  {
    slug: 'ast',
    name: 'AST',
    aka: ['Aspartate aminotransferase', 'SGOT'],
    panel: 'cmp',
    short: 'An enzyme found in the liver but also in muscle and heart.',
    measures:
      'The concentration of aspartate aminotransferase. Unlike ALT it is found in several tissues, including muscle and heart as well as liver, so it is less specific to the liver.',
    whyOrdered:
      'Ordered alongside ALT. The ratio between the two carries information that neither value carries alone.',
    higher:
      'Broadly associated with the same liver causes as ALT, and additionally with muscle injury, including from intense exercise, and with some heart conditions.',
    lower: 'Low values are common and generally not pursued.',
    affectedBy: [
      'Strenuous exercise, which can raise it substantially through muscle',
      'Alcohol',
      'Muscle injury of any kind',
    ],
    ask: ['What is my AST to ALT ratio, and does it suggest anything?'],
  },
  {
    slug: 'albumin',
    name: 'Albumin',
    panel: 'cmp',
    short: 'The main protein in blood, made by the liver.',
    measures:
      'The concentration of albumin, the most abundant protein in blood plasma. It is produced by the liver and helps hold fluid inside blood vessels.',
    whyOrdered:
      'Part of a comprehensive metabolic panel. It is used as a general indicator of nutritional state, liver production, and kidney protein loss.',
    higher: 'Usually reflects dehydration rather than any disease process.',
    lower:
      'Broadly associated with liver disease, kidney conditions that leak protein, poor nutrition, prolonged inflammation, and acute illness.',
    affectedBy: ['Hydration', 'Recent acute illness', 'Prolonged bed rest', 'Pregnancy'],
    ask: ['Is this stable compared with previous results?'],
  },
  {
    slug: 'potassium',
    name: 'Potassium',
    aka: ['K'],
    panel: 'cmp',
    short: 'An electrolyte critical to heart and muscle function.',
    measures:
      'The concentration of potassium in blood. It is tightly regulated because both high and low values affect heart rhythm and muscle function.',
    whyOrdered:
      'Included in metabolic panels and monitored closely with medications that affect it, including several blood pressure and heart medications and diuretics.',
    higher:
      'Broadly associated with reduced kidney function, several common medications, and with the sample itself - red cells breaking in the tube release potassium and produce a falsely high reading.',
    lower:
      'Broadly associated with diuretics, vomiting or diarrhea, and some hormonal conditions.',
    affectedBy: [
      'A difficult blood draw, which is a very common cause of a falsely high result',
      'Clenching your fist repeatedly during the draw',
      'Delay before the sample is processed',
    ],
    ask: [
      'Could this be a sample problem that needs a repeat draw?',
      'Do any of my medications affect potassium?',
    ],
  },
  {
    slug: 'sodium',
    name: 'Sodium',
    aka: ['Na'],
    panel: 'cmp',
    short: 'An electrolyte that tracks your body water balance.',
    measures:
      'The concentration of sodium in blood. In practice it says more about the balance between salt and water in the body than about salt intake.',
    whyOrdered:
      'Included in metabolic panels, and checked when confusion, fluid problems, or medication effects are being considered.',
    higher:
      'Broadly associated with dehydration and insufficient water intake relative to losses.',
    lower:
      'Broadly associated with excess water relative to salt, some medications including certain diuretics and antidepressants, heart, liver and kidney conditions, and some hormonal conditions.',
    affectedBy: ['Hydration', 'Diuretics', 'Recent heavy fluid intake'],
    ask: ['Is this a new change, and should it be rechecked?'],
  },

  // ---------- Lipids ----------
  {
    slug: 'ldl-cholesterol',
    name: 'LDL Cholesterol',
    aka: ['LDL-C', 'Low-density lipoprotein'],
    panel: 'lipid',
    short: 'The cholesterol fraction most closely tied to artery plaque.',
    measures:
      'The cholesterol carried on low-density lipoprotein particles. On many panels it is calculated from the other values rather than measured directly.',
    whyOrdered:
      'It is the value most used in cardiovascular risk assessment and the main target of cholesterol-lowering treatment.',
    higher:
      'Higher LDL is associated at a population level with greater risk of plaque building up in arteries over time. It is influenced by diet, genetics including inherited conditions, thyroid function, kidney and liver conditions, and some medications.',
    lower:
      'Lower values are the direction cholesterol-lowering treatment generally aims for at a population level. Very low values can occur with some inherited conditions, liver disease, and malnutrition.',
    affectedBy: [
      'Whether you fasted, which affects calculated LDL more than measured LDL',
      'Recent illness, which can temporarily lower it',
      'Pregnancy',
      'Thyroid function',
    ],
    ask: [
      'What is my overall cardiovascular risk, not just this number?',
      'Was this calculated or directly measured?',
      'Does my family history change how you read this?',
    ],
  },
  {
    slug: 'hdl-cholesterol',
    name: 'HDL Cholesterol',
    aka: ['HDL-C', 'High-density lipoprotein'],
    panel: 'lipid',
    short: 'The cholesterol fraction that moves cholesterol away from arteries.',
    measures:
      'The cholesterol carried on high-density lipoprotein particles, which transport cholesterol back to the liver.',
    whyOrdered: 'Part of a standard lipid panel and used in cardiovascular risk calculators.',
    higher:
      'Higher HDL has historically been associated with lower cardiovascular risk at a population level, though research has complicated the picture, and very high values are not straightforwardly protective.',
    lower:
      'Lower HDL is associated at a population level with higher cardiovascular risk. It is influenced by genetics, physical inactivity, smoking, obesity, and some medications.',
    affectedBy: ['Physical activity', 'Alcohol', 'Smoking', 'Recent weight change'],
    ask: ['How does this factor into my overall risk score?'],
  },
  {
    slug: 'triglycerides',
    name: 'Triglycerides',
    panel: 'lipid',
    short: 'The main form of fat circulating in blood.',
    measures:
      'The concentration of triglycerides, the most common type of fat in the body and the form in which most dietary fat travels.',
    whyOrdered: 'Part of a standard lipid panel; also relevant to pancreatic and metabolic assessment.',
    higher:
      'Broadly associated with recent eating, alcohol, obesity, poorly controlled diabetes, thyroid underactivity, kidney conditions, and several medications. This value is the most food-sensitive on the lipid panel.',
    lower: 'Low values are generally not pursued.',
    affectedBy: [
      'Eating before the draw - this one genuinely needs fasting to interpret',
      'Alcohol in the preceding days',
      'Recent weight change',
    ],
    ask: ['Did I fast long enough for this to be meaningful?'],
  },

  // ---------- Thyroid ----------
  {
    slug: 'tsh',
    name: 'TSH',
    aka: ['Thyroid stimulating hormone'],
    panel: 'thyroid',
    short: 'The pituitary signal that tells the thyroid to work harder.',
    measures:
      'Thyroid stimulating hormone, produced by the pituitary gland. It is not a thyroid hormone itself - it is the instruction the brain sends to the thyroid, which is why it moves in the opposite direction to thyroid activity.',
    whyOrdered:
      'It is the usual first-line thyroid test, and it is monitored when someone takes thyroid hormone replacement.',
    higher:
      'A higher TSH means the pituitary is signalling harder, which is broadly associated with an underactive thyroid. It can also rise temporarily while recovering from illness.',
    lower:
      'A lower TSH is broadly associated with an overactive thyroid, and with taking more thyroid hormone replacement than the body needs.',
    affectedBy: [
      'Time of day - TSH is typically higher overnight and early morning',
      'Recent acute illness',
      'Biotin supplements, which interfere with many thyroid assays',
      'Pregnancy, which shifts the expected range',
    ],
    ask: [
      'Should free T4 be checked alongside this?',
      'Do I take biotin, and could it have affected this result?',
    ],
  },
  {
    slug: 'free-t4',
    name: 'Free T4',
    aka: ['Free thyroxine', 'FT4'],
    panel: 'thyroid',
    short: 'The unbound, active form of the main thyroid hormone.',
    measures:
      'The portion of thyroxine circulating unbound to carrier proteins, which is the fraction available to act on tissues.',
    whyOrdered:
      'Usually ordered alongside or after TSH, to distinguish where in the system a problem sits and to confirm what an abnormal TSH suggests.',
    higher: 'Broadly associated with an overactive thyroid, and with excess thyroid hormone replacement.',
    lower: 'Broadly associated with an underactive thyroid, and with pituitary conditions.',
    affectedBy: ['Biotin supplements', 'Pregnancy', 'Some medications', 'Acute illness'],
    ask: ['How does this read together with my TSH?'],
  },

  // ---------- Diabetes ----------
  {
    slug: 'a1c',
    name: 'Hemoglobin A1C',
    aka: ['HbA1c', 'Glycated hemoglobin'],
    panel: 'diabetes',
    short: 'An average of your blood sugar over roughly the past three months.',
    measures:
      'The percentage of hemoglobin with glucose attached to it. Because red cells live around three months, it reflects average blood sugar across that window rather than at one moment.',
    whyOrdered:
      'Used to screen for and diagnose diabetes and prediabetes, and to monitor blood sugar control over time without requiring fasting.',
    higher:
      'A higher A1C reflects higher average blood sugar over the period. It can also be raised by conditions that lengthen red cell lifespan, including iron deficiency anemia.',
    lower:
      'A lower A1C reflects lower average blood sugar, but can also be produced by anything that shortens red cell lifespan - recent blood loss, hemolysis, some hemoglobin variants, recent transfusion, and pregnancy.',
    affectedBy: [
      'Any condition affecting red blood cell lifespan',
      'Hemoglobin variants, which affect some assay methods',
      'Recent transfusion',
      'Pregnancy',
    ],
    ask: [
      'Does anything about my red blood cells make this less reliable for me?',
      'How does this compare with my home glucose readings?',
    ],
  },

  // ---------- Vitamins / iron ----------
  {
    slug: 'ferritin',
    name: 'Ferritin',
    panel: 'vitamins',
    short: 'The protein that stores iron, used as a proxy for iron reserves.',
    measures:
      'The concentration of ferritin, the protein that stores iron inside cells. It is used as an indirect measure of total body iron stores.',
    whyOrdered:
      'The most useful single test for assessing iron stores, ordered when anemia, fatigue, or iron overload is being considered.',
    higher:
      'Broadly associated with iron overload conditions, but also - importantly - with inflammation, infection, liver disease, and alcohol, because ferritin rises as part of the inflammatory response regardless of iron.',
    lower:
      'A low ferritin is fairly specific for depleted iron stores, and can be present before anemia develops.',
    affectedBy: [
      'Any active inflammation or infection, which raises it independently of iron',
      'Liver conditions',
      'Recent iron supplementation',
    ],
    ask: [
      'Could inflammation be raising this and masking low iron?',
      'Should a CRP be checked alongside it?',
    ],
  },
  {
    slug: 'vitamin-d',
    name: 'Vitamin D',
    aka: ['25-hydroxyvitamin D', '25(OH)D'],
    panel: 'vitamins',
    short: 'The storage form of vitamin D, used to assess vitamin D status.',
    measures:
      'The concentration of 25-hydroxyvitamin D, the form that circulates and is used to judge overall vitamin D status.',
    whyOrdered:
      'Checked when bone health, deficiency symptoms, malabsorption, or certain chronic conditions are being considered. Routine screening in people without risk factors is debated among expert bodies.',
    higher:
      'Higher values are almost always from supplementation. Very high values from prolonged high-dose supplements can raise calcium.',
    lower:
      'Broadly associated with limited sun exposure, darker skin, older age, obesity, malabsorption conditions, and some medications.',
    affectedBy: ['Season and latitude', 'Sun exposure', 'Supplement use and timing', 'Body weight'],
    ask: [
      'Do I have a reason to be tested for this, or was it routine?',
      'If supplementing, what dose and for how long before rechecking?',
    ],
  },
  {
    slug: 'vitamin-b12',
    name: 'Vitamin B12',
    aka: ['Cobalamin'],
    panel: 'vitamins',
    short: 'A vitamin needed for nerve function and red blood cell production.',
    measures: 'The concentration of vitamin B12 circulating in blood.',
    whyOrdered:
      'Checked when anemia with large red cells is found, when nerve symptoms are described, and in people at higher risk of deficiency including those on long-term acid-reducing medication, after certain surgeries, and on plant-based diets.',
    higher:
      'Usually reflects supplementation. Elevated values without supplements are occasionally seen with liver and some blood conditions.',
    lower:
      'Broadly associated with dietary shortfall, absorption problems including pernicious anemia, long-term metformin or acid-reducing medication use, and some gastrointestinal surgeries.',
    affectedBy: [
      'Supplements, including multivitamins, which can normalize a genuinely low level',
      'Pregnancy',
      'Some medications',
    ],
    ask: [
      'If this is borderline, should methylmalonic acid be checked?',
      'Could any of my medications be affecting absorption?',
    ],
  },

  // ---------- Inflammation ----------
  {
    slug: 'crp',
    name: 'C-Reactive Protein',
    aka: ['CRP', 'hs-CRP'],
    panel: 'inflammation',
    short: 'A general marker that inflammation is present somewhere.',
    measures:
      'The concentration of C-reactive protein, produced by the liver in response to inflammation anywhere in the body.',
    whyOrdered:
      'Used to detect and follow inflammation, and to monitor response to treatment in inflammatory conditions. A more sensitive version, hs-CRP, is sometimes used in cardiovascular risk assessment.',
    higher:
      'A raised CRP indicates inflammation somewhere but says nothing about where or why. Broadly associated with infection, injury, autoimmune conditions, obesity, smoking, and recent surgery.',
    lower: 'Low values indicate no detectable inflammatory response at the time of the draw.',
    affectedBy: [
      'Any recent infection, including a cold',
      'Recent injury or surgery',
      'Obesity',
      'Pregnancy',
      'Some hormonal medications',
    ],
    ask: [
      'Is this being tracked over time or was it a one-off?',
      'Could a recent illness explain this?',
    ],
  },
  {
    slug: 'esr',
    name: 'Erythrocyte Sedimentation Rate',
    aka: ['ESR', 'Sed rate'],
    panel: 'inflammation',
    short: 'An older, slower-moving indicator of inflammation.',
    measures:
      'How quickly red blood cells settle in a tube over one hour. Inflammation makes cells clump and settle faster.',
    whyOrdered:
      'A long-established non-specific inflammation marker. It rises and falls more slowly than CRP, so the two are sometimes ordered together to see both the immediate and the sustained picture.',
    higher:
      'Broadly associated with inflammation, infection, anemia, pregnancy, older age, kidney disease, and some conditions affecting blood proteins.',
    lower: 'Low values are generally not pursued.',
    affectedBy: ['Age, which raises it independently', 'Sex', 'Anemia', 'Pregnancy'],
    ask: ['How does this read alongside my CRP?'],
  },
  // ---------- cbc (generated batch) ----------
  {
    slug: "rbc-count",
    name: "Red Blood Cell Count",
    aka: ["RBC", "erythrocyte count"],
    panel: "cbc",
    short:
      "The number of red blood cells in a set volume of blood - the cells that carry oxygen.",
    measures:
      "The number of red blood cells in a fixed volume of blood, counted by an automated analyzer. Red blood cells carry oxygen from the lungs to the rest of the body using the protein hemoglobin.",
    whyOrdered:
      "It is a standard part of every complete blood count rather than a test ordered on its own. Clinicians review it alongside hemoglobin and hematocrit when considering anemia, blood loss, or an unusually high red cell count.",
    higher:
      "Broadly associated with dehydration, which concentrates the blood, and with smoking, living at high altitude, and lung or heart conditions that reduce oxygen levels. Less commonly it reflects conditions in which the bone marrow makes extra red cells.",
    lower:
      "Broadly associated with the many forms of anemia, including blood loss, low iron or vitamin stores, and chronic illness. It also runs lower in pregnancy, when extra fluid in the blood dilutes the cells without anything being wrong.",
    affectedBy: [
      "Hydration on the day of the draw - dehydration raises it, lots of fluids lower it",
      "Pregnancy, which dilutes the blood normally",
      "Recent blood donation",
      "Smoking and living at altitude",
      "How long the tourniquet was on during the draw",
    ],
    ask: [
      "Are my hemoglobin and hematocrit telling the same story as this count?",
      "Could my hydration on the day of the draw have shifted this?",
      "Do the red cell size measurements on the same panel point to a particular pattern?",
    ],
  },
  {
    slug: "mch",
    name: "Mean Corpuscular Hemoglobin",
    aka: ["MCH"],
    panel: "cbc",
    short:
      "The average amount of hemoglobin inside each individual red blood cell.",
    measures:
      "The average amount of hemoglobin, the oxygen-carrying protein, contained in a single red blood cell. It is not measured directly - the analyzer calculates it by dividing the total hemoglobin by the red cell count.",
    whyOrdered:
      "It comes automatically with every complete blood count. Clinicians use it together with red cell size (MCV) to sort anemias into broad categories, which helps point toward a cause such as low iron or low vitamin levels.",
    higher:
      "Broadly associated with larger-than-average red cells, a pattern seen with vitamin B12 or folate shortage, heavy alcohol use, and some thyroid conditions. It can also be pushed up artificially by very fatty blood samples or by cold-reacting antibodies that clump cells in the tube.",
    lower:
      "Broadly associated with smaller, paler red cells, classically from iron shortage or from inherited hemoglobin traits such as thalassemia trait, a common and often harmless carrier state.",
    affectedBy: [
      "A fatty meal before the draw, which can cloud the sample and skew the hemoglobin reading",
      "Delays between blood draw and analysis",
      "Cold-reacting antibodies that clump cells in the tube, a lab artifact",
      "Anything that affects the red cell count itself, since MCH is a calculation",
    ],
    ask: [
      "Is this being read together with MCV and RDW, the other red cell measurements?",
      "Could a sample issue, like a fatty sample, have affected this calculated value?",
      "Would iron studies or vitamin levels help explain the pattern you are seeing?",
    ],
  },
  {
    slug: "mchc",
    name: "Mean Corpuscular Hemoglobin Concentration",
    aka: ["MCHC"],
    panel: "cbc",
    short:
      "How densely hemoglobin is packed into red blood cells, on average.",
    measures:
      "The average concentration of hemoglobin packed inside red blood cells - how full each cell is, rather than how big it is. It is calculated from the hemoglobin level and the hematocrit rather than measured directly.",
    whyOrdered:
      "It arrives as part of every complete blood count and helps classify anemias. Laboratories also watch it closely because a strikingly unusual MCHC is one of the most reliable clues that something went wrong with the sample or the analyzer rather than with the patient.",
    higher:
      "Broadly associated with hereditary spherocytosis, an inherited condition in which red cells are small and dense. Just as often it reflects a lab artifact - a hemolyzed sample, a fatty sample, or cold-reacting antibodies - which is why an unexpected high value is commonly rechecked before anything else.",
    lower:
      "Broadly associated with pale, hemoglobin-poor red cells, most commonly from iron shortage and sometimes from inherited hemoglobin traits.",
    affectedBy: [
      "Sample hemolysis - red cells breaking open in the tube during or after the draw",
      "A fatty meal before the draw, which clouds the sample",
      "Cold-reacting antibodies that clump cells, a lab artifact",
      "Time the sample spent in transport before analysis",
    ],
    ask: [
      "Could this reflect a sample or analyzer artifact rather than a true result?",
      "Was a blood smear reviewed under the microscope to confirm what the machine reported?",
      "Do the other red cell indices on the panel fit with this value?",
    ],
  },
  {
    slug: "mpv",
    name: "Mean Platelet Volume",
    aka: ["MPV"],
    panel: "cbc",
    short:
      "The average size of platelets, the small cell fragments that help blood clot.",
    measures:
      "The average size of the platelets circulating in the blood. Platelets are small cell fragments made in the bone marrow that plug damaged blood vessels, and newly made platelets tend to be larger than older ones.",
    whyOrdered:
      "It is reported automatically alongside the platelet count on most complete blood counts. Clinicians mainly use it as supporting context for an abnormal platelet count, since larger platelets can suggest the marrow is producing them quickly.",
    higher:
      "Broadly associated with faster platelet turnover - situations where platelets are being used up or cleared and the marrow is releasing young, large replacements. It is also seen with some inherited platelet traits and tends to run somewhat higher in smokers.",
    lower:
      "Broadly associated with reduced platelet production in the bone marrow. On its own, with a normal platelet count, a low value is generally not pursued.",
    affectedBy: [
      "How long the sample sat before analysis - platelets swell in the collection tube over time",
      "The anticoagulant used in the collection tube",
      "Recent vigorous exercise",
      "Smoking",
    ],
    ask: [
      "Was the platelet count itself normal alongside this value?",
      "Could the time between the blood draw and the analysis have changed it?",
      "Is this measurement being used to say anything on its own, or only as context?",
    ],
  },
  {
    slug: "reticulocytes",
    name: "Reticulocyte Count",
    aka: ["retic count", "retics"],
    panel: "cbc",
    short:
      "Young, newly released red blood cells - a direct gauge of bone marrow output.",
    measures:
      "The number of reticulocytes in the blood. These are brand-new red blood cells released from the bone marrow within roughly the last day or two, so they show how actively the marrow is producing red cells right now.",
    whyOrdered:
      "Most often ordered during an anemia workup to sort out whether the marrow is failing to make enough red cells or is working hard to replace cells being lost or destroyed. It is also used to watch whether the marrow responds after a deficiency is corrected.",
    higher:
      "Broadly associated with the marrow ramping up production - after bleeding, when red cells are being broken down early, following recovery from a nutrient shortage, or after moving to high altitude. In these settings a high count reflects a marrow doing its job.",
    lower:
      "Broadly associated with reduced marrow output, as seen with iron, B12, or folate shortage, chronic kidney disease, and conditions or treatments that suppress the marrow.",
    affectedBy: [
      "Recent blood donation or any recent bleeding, which drives the count up as the marrow responds",
      "Recently started iron or vitamin supplements, which can produce a brisk rise",
      "Moving to or training at high altitude",
      "Pregnancy",
    ],
    ask: [
      "Was this reported as a percentage or an absolute count, and which one matters in my situation?",
      "Given my other blood counts, does this suggest a production problem or a loss problem?",
      "Would checking it again after any recent bleeding or supplement change give a clearer picture?",
    ],
  },
  {
    slug: "neutrophils",
    name: "Neutrophils",
    aka: ["ANC", "absolute neutrophil count", "polys", "segs"],
    panel: "cbc",
    short:
      "The most common white blood cell and the immune system's first responder to bacteria.",
    measures:
      "The number of neutrophils in the blood, reported as an absolute count and as a percentage of all white cells. Neutrophils are the most numerous white blood cells and the first to arrive at sites of infection or injury.",
    whyOrdered:
      "It comes as part of a complete blood count with differential, the breakdown of white cell types. Clinicians look at it when considering infection or inflammation, and to monitor people on treatments known to lower white cell counts.",
    higher:
      "Broadly associated with bacterial infections, inflammation, tissue injury, and physical or emotional stress. Smoking, corticosteroid medicines, recent strenuous exercise, and late pregnancy also raise the count without any infection present.",
    lower:
      "Broadly associated with some viral infections, certain medications, and vitamin shortages. Many healthy people of African or Middle Eastern ancestry have a naturally lower baseline count, an inherited pattern with no known health consequence.",
    affectedBy: [
      "Recent strenuous exercise or physical stress, which raises the count for hours",
      "Corticosteroid medicines, which raise it",
      "Smoking",
      "A recent vaccination or minor illness",
      "Pregnancy, which raises it normally",
      "Time of day",
    ],
    ask: [
      "Could a recent illness, vaccination, or stressful event explain a shift?",
      "Do you know my usual baseline - could this simply be normal for me?",
      "Should we be looking at the absolute count rather than the percentage?",
    ],
  },
  {
    slug: "lymphocytes",
    name: "Lymphocytes",
    aka: ["lymphs", "absolute lymphocyte count"],
    panel: "cbc",
    short:
      "The white blood cells behind targeted immunity - T cells, B cells, and natural killer cells.",
    measures:
      "The number of lymphocytes in the blood, reported as an absolute count and as a percentage of white cells. Lymphocytes include T cells, B cells, and natural killer cells - the cells that mount targeted immune responses and carry immune memory.",
    whyOrdered:
      "It comes with every complete blood count with differential. Clinicians pay attention to it during and after infections, when evaluating immune conditions, and while monitoring certain medications.",
    higher:
      "Broadly associated with certain infections known for raising lymphocytes - infectious mononucleosis and whooping cough are the classic examples - and with recovery after an illness. Many everyday viral illnesses temporarily lower lymphocytes instead, so the direction alone says little. Children normally run higher counts than adults. A persistent, unexplained elevation is what prompts further evaluation rather than a single high reading.",
    lower:
      "Broadly associated with acute stress or acute illness, corticosteroid medicines, and some immune conditions. A temporary dip during and shortly after a common infection is frequent and usually resolves on its own.",
    affectedBy: [
      "A recent or current viral illness, even a mild one",
      "Corticosteroid medicines, which lower the count temporarily",
      "Intense exercise shortly before the draw",
      "Physical or emotional stress",
      "Time of day",
    ],
    ask: [
      "Could a recent cold or other infection explain the change?",
      "Is the shift in the absolute count, or only in the percentage?",
      "If it stayed shifted once I have been well for a while, what would you look at next?",
    ],
  },
  {
    slug: "monocytes",
    name: "Monocytes",
    aka: ["absolute monocyte count", "monos"],
    panel: "cbc",
    short:
      "The immune system's cleanup crew - white cells that clear debris and become tissue macrophages.",
    measures:
      "The number of monocytes in the blood. Monocytes are large white blood cells that clear debris, dead cells, and microbes, and that move into tissues to become macrophages, the long-lived cleanup cells of the immune system.",
    whyOrdered:
      "It is reported as part of the white cell differential on a complete blood count rather than ordered by itself. Clinicians usually read it as one piece of the overall white cell picture rather than in isolation.",
    higher:
      "Broadly associated with recovery from an infection, with chronic inflammation, and with smoking. A mild, isolated rise is common and often transient. Only a persistent and marked elevation tends to prompt evaluation for blood disorders.",
    lower:
      "Broadly associated with acute infections and corticosteroid medicines. Isolated low values are generally not pursued.",
    affectedBy: [
      "Recovering from a recent infection, when counts commonly rise",
      "Smoking",
      "Corticosteroid medicines",
      "Physical stress",
      "Time of day",
    ],
    ask: [
      "Is this an isolated finding, or part of a broader pattern across the white cell types?",
      "Could an infection I recently got over explain it?",
      "How does this compare with my previous differentials, if I have any on file?",
    ],
  },
  {
    slug: "eosinophils",
    name: "Eosinophils",
    aka: ["absolute eosinophil count", "eos"],
    panel: "cbc",
    short:
      "White blood cells central to allergic reactions and defense against parasites.",
    measures:
      "The number of eosinophils in the blood. Eosinophils are white blood cells packed with granules that play a central role in allergic responses and in defending the body against parasites.",
    whyOrdered:
      "It comes with the white cell differential on a complete blood count. Clinicians look at it when evaluating allergies, asthma, unexplained rashes, suspected reactions to medications, or possible parasitic infection.",
    higher:
      "Broadly associated with allergic conditions such as hay fever, asthma, and eczema, with reactions to medications, and with parasitic infections. Persistent, marked elevations are what lead to a broader evaluation rather than a single mildly raised value.",
    lower:
      "Broadly associated with acute stress, acute infection, and corticosteroid medicines. Low counts are generally not pursued.",
    affectedBy: [
      "Active seasonal allergies or an eczema flare at the time of the draw",
      "Corticosteroid medicines, which lower the count sharply",
      "Time of day - counts naturally swing over 24 hours",
      "A recently started or changed medication",
    ],
    ask: [
      "Could my allergies, asthma, or a skin condition account for this?",
      "Could any of my current medicines be playing a role, in either direction?",
      "Is this at a level where further evaluation is usually considered, or in watch-and-see territory?",
    ],
  },
  {
    slug: "basophils",
    name: "Basophils",
    aka: ["absolute basophil count", "basos"],
    panel: "cbc",
    short:
      "The rarest white blood cell, involved in allergic and inflammatory responses.",
    measures:
      "The number of basophils in the blood. Basophils are the least numerous type of white blood cell and are normally present in very small numbers. They release histamine and other chemicals during allergic and inflammatory responses.",
    whyOrdered:
      "It is not ordered on its own - it arrives as part of the white cell differential on a complete blood count and is mostly reviewed for completeness alongside the other white cell types.",
    higher:
      "Broadly associated with allergic responses, some forms of chronic inflammation. A persistent, marked elevation is one of the findings that can prompt evaluation for certain chronic blood disorders, but small fluctuations are common and rarely meaningful.",
    lower:
      "Broadly associated with acute stress, acute infection, an overactive thyroid, and corticosteroid medicines. Because the normal count is already very small, low values are generally not pursued.",
    affectedBy: [
      "Analyzer imprecision - automated counters are least accurate for the rarest cell types",
      "A recent allergic flare or allergy season",
      "Corticosteroid medicines",
      "Recent illness or physical stress",
    ],
    ask: [
      "Was this an automated count, and would a manual review of the blood smear confirm it?",
      "Is this isolated, or are other white cell types shifted too?",
      "Could allergies or my thyroid be relevant to this value?",
    ],
  },
  // ---------- cmp (generated batch) ----------
  {
    slug: "bun",
    name: "BUN (Blood Urea Nitrogen)",
    aka: ["BUN", "urea", "serum urea"],
    panel: "cmp",
    short:
      "A protein waste product cleared by the kidneys, used with creatinine to assess kidney function and hydration.",
    measures:
      "The amount of urea nitrogen in the blood. Urea is a waste product the liver makes when protein is broken down, and the kidneys filter it out into urine. Its level reflects the balance between how much is produced and how well it is cleared.",
    whyOrdered:
      "It is a standard part of metabolic panels used to check kidney function and fluid status. Clinicians almost always read it alongside creatinine, another kidney marker, because the two together are more informative than either alone.",
    higher:
      "Broadly associated with reduced kidney filtering, dehydration, a high protein intake, and bleeding into the digestive tract. It also tends to drift up with normal aging and with some common medications, such as steroids.",
    lower:
      "Broadly associated with a low protein diet, liver conditions that reduce urea production, overhydration, and pregnancy. Mildly low values are generally not pursued.",
    affectedBy: [
      "Hydration - dehydration concentrates it, drinking a lot of fluid dilutes it",
      "A high protein meal or protein supplements in the day before the draw",
      "Pregnancy, which normally lowers it",
      "Common medications, including steroids and some diuretics",
      "Intense exercise shortly before the draw",
    ],
    ask: [
      "How does this look next to my creatinine, and what does the ratio between them suggest?",
      "Could my hydration or diet on the day of the draw explain the result?",
      "Do any of my current medications affect this value?",
    ],
  },
  {
    slug: "calcium",
    name: "Calcium",
    aka: ["Ca", "total calcium", "serum calcium"],
    panel: "cmp",
    short:
      "The blood level of calcium, a mineral tightly controlled by the parathyroid glands, vitamin D, and the kidneys.",
    measures:
      "The total amount of calcium in the blood, including the portion carried on proteins such as albumin and the free portion the body actually uses. Blood calcium is kept in a narrow band by the parathyroid glands, vitamin D, the bones, and the kidneys.",
    whyOrdered:
      "It is included in routine metabolic panels because calcium is central to nerve, muscle, heart, and bone function. It is also checked when parathyroid, kidney, or bone problems are being considered, or when symptoms like fatigue, kidney stones, or muscle cramps are being worked up.",
    higher:
      "Broadly associated with overactive parathyroid glands, excess vitamin D, certain medications, and prolonged immobility. Mild elevations are also commonly a measurement effect - a prolonged tourniquet during the draw or dehydration can concentrate the sample.",
    lower:
      "Broadly associated with low vitamin D, low albumin (the carrier protein, which pulls the total number down without changing the usable calcium), kidney conditions, and low magnesium.",
    affectedBy: [
      "The albumin level - low albumin lowers total calcium without affecting the active form",
      "A tourniquet left on too long during the blood draw",
      "Dehydration at the time of the draw",
      "Calcium or vitamin D supplements and antacids",
      "Some common medications, including thiazide diuretics and lithium",
    ],
    ask: [
      "Was this result corrected for my albumin level?",
      "Would an ionized calcium test, which measures the free active form directly, be useful?",
      "Should parathyroid hormone (PTH) and vitamin D be checked alongside this?",
      "Could any of my supplements or medications be influencing it?",
    ],
  },
  {
    slug: "chloride",
    name: "Chloride",
    aka: ["Cl"],
    panel: "cmp",
    short:
      "An electrolyte that partners with sodium, used to assess fluid balance and the acid-base status of the blood.",
    measures:
      "The concentration of chloride, one of the main electrolytes in the blood. Chloride travels closely with sodium and helps maintain fluid balance and the acid-base balance of the body.",
    whyOrdered:
      "It is part of the standard electrolyte panel rather than a test usually ordered on its own. Clinicians use it together with sodium and bicarbonate to judge hydration and to detect disturbances in the body's acid-base balance.",
    higher:
      "Broadly associated with dehydration, certain kidney conditions, and acid-base disturbances in which the blood becomes more acidic. It can also rise after large volumes of saline intravenous fluid.",
    lower:
      "Broadly associated with fluid loss from prolonged vomiting, diuretic use (water tablets), and conditions in which bicarbonate is raised. Small deviations are common and generally interpreted only in context with the other electrolytes.",
    affectedBy: [
      "Hydration status on the day of the draw",
      "Recent vomiting or diarrhea",
      "Diuretic medications",
      "Drinking very large amounts of water",
      "Recent intravenous fluids",
    ],
    ask: [
      "Does my chloride fit with my sodium and bicarbonate, or is something called the anion gap worth calculating?",
      "Could a diuretic or another medication I take explain this value?",
      "Could recent illness with vomiting or diarrhea account for it?",
    ],
  },
  {
    slug: "bicarbonate",
    name: "Bicarbonate",
    aka: ["CO2", "carbon dioxide", "total CO2", "HCO3"],
    panel: "cmp",
    short:
      "The blood's main acid buffer, reported as CO2, used to judge the body's acid-base balance.",
    measures:
      "The total carbon dioxide carried in the blood, most of which exists as bicarbonate. Bicarbonate is the body's main chemical buffer - it soaks up excess acid and keeps the blood's acidity within a narrow range, regulated by the kidneys and the lungs.",
    whyOrdered:
      "It is part of the standard electrolyte panel and gives a quick reading of the body's acid-base balance. Clinicians use it to look for states where the blood is too acidic or too alkaline, and to monitor kidney function, breathing problems, and the effects of some medications.",
    higher:
      "Broadly associated with prolonged vomiting, diuretic use, and lung conditions in which carbon dioxide is retained. It can also reflect a compensation - the kidneys holding on to bicarbonate to balance a breathing issue.",
    lower:
      "Broadly associated with kidney conditions, prolonged diarrhea, and states that produce excess acid. Slightly low values are also a well known sample artifact, because bicarbonate escapes from blood tubes that sit open or unprocessed too long.",
    affectedBy: [
      "Delays in processing the sample, which lower the measured value",
      "Recent vomiting or diarrhea",
      "Diuretic medications",
      "Rapid breathing, for example from anxiety, at the time of the draw",
      "Living at or traveling to high altitude",
    ],
    ask: [
      "Could this be a sample handling effect rather than a true result?",
      "Does this value fit with my other electrolytes and kidney results?",
      "Could any of my medications, such as diuretics, be shifting it?",
    ],
  },
  {
    slug: "total-protein",
    name: "Total Protein",
    aka: ["TP", "serum total protein"],
    panel: "cmp",
    short:
      "The combined amount of albumin and antibody proteins in the blood, reflecting liver, kidney, and immune activity.",
    measures:
      "The combined concentration of all proteins in the liquid part of the blood. The two main groups are albumin, made by the liver, and globulins, which include the antibodies made by the immune system.",
    whyOrdered:
      "It is a routine part of metabolic and liver panels, giving a broad view of nutrition, liver protein production, kidney protein losses, and immune protein levels. An abnormal total usually prompts a look at the albumin and globulin components separately.",
    higher:
      "Broadly associated with dehydration, which concentrates all blood proteins, with chronic inflammation or infection, and with conditions in which the immune system produces excess antibody protein.",
    lower:
      "Broadly associated with liver conditions that reduce protein production, kidney or bowel conditions that lose protein, and poor nutrition or absorption. Dilution from intravenous fluids or overhydration also lowers it, as does normal pregnancy.",
    affectedBy: [
      "Hydration - dehydration raises it, extra fluids dilute it",
      "Pregnancy, which normally lowers it",
      "Posture and tourniquet time during the draw, which can concentrate the sample",
      "Recent infection or illness",
      "Prolonged bed rest",
    ],
    ask: [
      "What were my albumin and globulin levels individually, and what is the ratio between them?",
      "Could hydration on the day of the draw explain this result?",
      "If the globulin portion is what changed, is any follow-up protein testing worth discussing?",
    ],
  },
  {
    slug: "bilirubin",
    name: "Bilirubin",
    aka: ["total bilirubin", "TBIL"],
    panel: "cmp",
    short:
      "A yellow pigment from the normal recycling of red blood cells, processed by the liver and removed in bile.",
    measures:
      "The amount of bilirubin, a yellow pigment produced when old red blood cells are broken down and recycled. The liver processes bilirubin and passes it out through bile, so the blood level reflects the balance between red cell turnover and liver clearance.",
    whyOrdered:
      "It is part of standard liver panels and is checked when jaundice (yellowing of the skin or eyes), liver conditions, bile duct blockage, or unusually fast red cell breakdown is being considered. Labs can split it into direct and indirect forms, which point to different parts of the pathway.",
    higher:
      "Broadly associated with liver conditions, blockage of the bile ducts, and faster than normal breakdown of red blood cells. A mild isolated rise is also very commonly due to Gilbert syndrome, a harmless inherited trait affecting a meaningful share of the population, especially after fasting or illness.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "Fasting or skipping meals before the draw, which raises it in many people",
      "Gilbert syndrome, a common and harmless inherited trait",
      "Vigorous exercise before the draw",
      "Exposure of the sample to light, which lowers it",
      "Some common medications",
    ],
    ask: [
      "Was this split into direct and indirect bilirubin, and which portion is responsible?",
      "Could Gilbert syndrome explain a mild isolated rise?",
      "Could fasting before the draw have influenced this result?",
    ],
  },
  {
    slug: "alp",
    name: "Alkaline Phosphatase",
    aka: ["ALP", "alk phos"],
    panel: "cmp",
    short:
      "An enzyme from the liver, bile ducts, and bone, used to screen for bile flow and bone turnover activity.",
    measures:
      "The activity of alkaline phosphatase, an enzyme found mainly in the liver and bile ducts and in bone, with smaller amounts from the intestine and, during pregnancy, the placenta. The blood level reflects how much is being released from these tissues.",
    whyOrdered:
      "It is a standard part of liver panels and is used to screen for problems with bile flow and for conditions of increased bone activity. Because it comes from more than one organ, an elevated result often leads to further tests to identify the source.",
    higher:
      "Broadly associated with conditions affecting the bile ducts and with increased bone turnover, such as healing fractures or bone conditions. It is also normally higher in growing children and teenagers and during the later stages of pregnancy, and can rise after a fatty meal in some people.",
    lower:
      "Broadly associated with malnutrition, low zinc or magnesium, and some rare inherited conditions. Low values are generally not pursued.",
    affectedBy: [
      "Pregnancy, which normally raises it",
      "Age - it is naturally high in growing children and adolescents",
      "A recent or healing broken bone",
      "Eating a fatty meal shortly before a non-fasting draw",
      "Some common medications",
    ],
    ask: [
      "Could a GGT test help show whether this is coming from the liver or from bone?",
      "Could pregnancy, growth, or a recent fracture explain the level?",
      "Should vitamin D and bone health be looked at alongside this?",
    ],
  },
  {
    slug: "ggt",
    name: "GGT (Gamma-Glutamyl Transferase)",
    aka: ["GGT", "gamma GT", "GGTP"],
    panel: "cmp",
    short:
      "A liver and bile duct enzyme, often used to clarify where a raised alkaline phosphatase is coming from.",
    measures:
      "The activity of gamma-glutamyl transferase, an enzyme concentrated in the liver and the bile ducts. It leaks into the blood when these tissues are irritated, and its production is easily switched on by alcohol and many medications.",
    whyOrdered:
      "Its most common use is to clarify an abnormal alkaline phosphatase result - if GGT is also raised, the liver or bile ducts are the likely source rather than bone. It is also used as a sensitive, though not specific, marker of bile duct irritation and alcohol intake.",
    higher:
      "Broadly associated with bile duct conditions, fatty change in the liver, regular alcohol intake, and a long list of common medications, because the enzyme is very easily induced. It is sensitive but not specific - a raised value points to the liver region without saying what is happening there.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "Alcohol intake in the days to weeks before the draw",
      "Many common medications, including some anticonvulsants and antibiotics",
      "Body weight, since it tends to run higher with higher weight",
      "Smoking",
    ],
    ask: [
      "Was this ordered to clarify an alkaline phosphatase result, and what does the pair suggest together?",
      "Could one of my regular medications be raising it?",
      "How long does alcohol influence this value before a blood draw?",
    ],
  },
  // ---------- kidney (generated batch) ----------
  {
    slug: "uric-acid",
    name: "Uric Acid",
    aka: ["Urate", "Serum uric acid"],
    panel: "kidney",
    short:
      "A waste product of purine breakdown, linked to gout and kidney stones and cleared by the kidneys.",
    measures:
      "The concentration of uric acid in the blood. Uric acid is a waste product made when the body breaks down purines, substances found in many foods and in the body's own cells. The kidneys remove most of it in the urine.",
    whyOrdered:
      "Commonly ordered when gout (a painful joint condition caused by urate crystals) or certain kidney stones are being considered. It is also checked during some cancer treatments, when large numbers of cells break down at once and release purines.",
    higher:
      "Broadly associated with gout, some types of kidney stone, and reduced clearance by the kidneys. Levels also rise with purine-rich diets, alcohol, fasting, and several common medications, including diuretics (water pills) and low-dose aspirin.",
    lower:
      "Broadly associated with certain medications and, rarely, inherited differences in purine handling. Low values are generally not pursued.",
    affectedBy: [
      "A meal heavy in red meat, organ meat, or seafood before the draw",
      "Alcohol, especially beer",
      "Dehydration, which concentrates uric acid in the blood",
      "Diuretic (water pill) medications and low-dose aspirin",
      "Fasting or rapid weight loss",
    ],
    ask: [
      "Could any of my regular medications be raising this?",
      "Is this being checked because of joint symptoms, kidney stones, or something else?",
      "Would rechecking after changes to diet or alcohol be informative?",
    ],
  },
  {
    slug: "cystatin-c",
    name: "Cystatin C",
    aka: ["CysC"],
    panel: "kidney",
    short:
      "A small protein used to estimate kidney filtering, less swayed by muscle mass than creatinine.",
    measures:
      "The concentration of cystatin C, a small protein that nearly all cells release into the blood at a steady rate. Because the kidneys filter it out continuously, its level reflects how well the kidneys are filtering. Labs often convert it into an estimated filtration rate, or eGFR.",
    whyOrdered:
      "Ordered to estimate kidney function, often as a cross-check on the more common creatinine-based estimate. It is especially useful when muscle mass could make creatinine misleading, such as in very muscular people, older adults, or people who have lost a limb.",
    higher:
      "Broadly associated with reduced kidney filtration. Levels can also be nudged upward by an overactive thyroid, corticosteroid medications, smoking, inflammation, and larger body size, independently of the kidneys.",
    lower:
      "Broadly associated with brisk kidney filtration and with an underactive thyroid. Low values are generally not pursued.",
    affectedBy: [
      "Corticosteroid (steroid) medications",
      "Thyroid status and thyroid medication",
      "Smoking",
      "Body size and composition",
      "Recent illness or inflammation",
    ],
    ask: [
      "Was this ordered because creatinine might be misleading for my body type?",
      "How does the eGFR from cystatin C compare with my creatinine-based eGFR?",
      "Could my thyroid or any of my medications be influencing this result?",
    ],
  },
  {
    slug: "urinalysis",
    name: "Urinalysis",
    aka: ["UA", "Urine dipstick"],
    panel: "kidney",
    short:
      "A broad check of urine for protein, blood, glucose, cells, and signs of infection.",
    measures:
      "A set of checks on a urine sample rather than a single number. It typically includes appearance and concentration, chemical strips for protein, glucose (sugar), blood, and infection markers, and sometimes a microscope exam for cells, bacteria, and crystals.",
    whyOrdered:
      "A common first-look test during checkups, before surgery, in pregnancy, or when there are urinary symptoms such as burning, urgency, or a change in urine appearance. It gives a broad snapshot of the kidneys, bladder, and general metabolism.",
    higher:
      "Positive findings such as protein, blood, white cells, or glucose are broadly associated with kidney, bladder, or metabolic conditions. The same findings are also commonly produced by menstruation, vigorous exercise, contamination during collection, and concentrated urine.",
    lower:
      "A urinalysis is not graded high or low as a whole. A sample with no positive findings is the expected result.",
    affectedBy: [
      "Menstruation, which can add blood to the sample",
      "Vigorous exercise in the day or two before",
      "Dehydration, which concentrates the urine",
      "Contamination from skin during collection, or a sample left sitting before testing",
      "Vitamin C supplements, which can interfere with some strip results",
    ],
    ask: [
      "Which specific finding on the urinalysis needs follow-up, if any?",
      "Could menstruation, exercise, or how the sample was collected explain a finding?",
      "Would a first-morning, clean-catch sample give a cleaner picture?",
    ],
  },
  {
    slug: "urine-albumin-creatinine-ratio",
    name: "Urine Albumin-to-Creatinine Ratio",
    aka: ["uACR", "Microalbumin", "ACR", "Albumin-creatinine ratio"],
    panel: "kidney",
    short:
      "Detects small amounts of the protein albumin in urine, an early marker of kidney stress.",
    measures:
      "The amount of albumin, the main protein in blood, that is passing into the urine, divided by urine creatinine to correct for how dilute the sample is. Healthy kidney filters keep almost all albumin in the blood, so urine albumin is measured in very small amounts.",
    whyOrdered:
      "The standard screening test for early kidney damage, checked regularly in people with diabetes or high blood pressure. It can flag kidney stress years before other kidney tests change.",
    higher:
      "Broadly associated with early damage to the kidney's filters, most often linked with diabetes and high blood pressure. Temporary rises are also common after exercise, fever, infections, and dehydration, which is why single readings are usually confirmed on another sample.",
    lower:
      "Low values reflect kidney filters holding onto protein as expected and are generally not pursued.",
    affectedBy: [
      "Vigorous exercise in the day before the sample",
      "Fever or a recent illness",
      "A urinary tract infection",
      "Menstruation or contamination during collection",
      "Time of day - first-morning samples tend to read lower",
    ],
    ask: [
      "Was this a first-morning sample, and does the timing matter?",
      "Could recent exercise or a passing illness raise this ratio temporarily?",
      "How do my blood pressure and blood sugar relate to this result?",
    ],
  },
  {
    slug: "urine-protein",
    name: "Urine Protein",
    aka: ["Total urine protein", "Proteinuria test", "24-hour urine protein"],
    panel: "kidney",
    short:
      "Measures protein leaking into urine, a sign of how well the kidney's filters are holding.",
    measures:
      "The total amount of protein in the urine, checked with a strip test, a lab measurement on a single sample, or a timed collection. Unlike the albumin-specific test, it captures all proteins that may pass through or be produced along the urinary tract.",
    whyOrdered:
      "Ordered to check whether the kidney's filters are letting protein through, often to follow up a dipstick finding, unexplained swelling, or blood pressure concerns in pregnancy. It helps sort short-lived protein leaks from persistent ones.",
    higher:
      "Broadly associated with conditions affecting the kidney's filters and, in pregnancy, with blood pressure complications. Protein also appears temporarily with fever, vigorous exercise, dehydration, and long periods of standing, a pattern called orthostatic proteinuria that is common in adolescents.",
    lower:
      "Low values are the expected finding and are generally not pursued.",
    affectedBy: [
      "Vigorous exercise before the sample",
      "Fever or recent illness",
      "Dehydration, which concentrates the urine",
      "Long periods of standing or activity earlier in the day",
      "Menstruation or contamination during collection",
    ],
    ask: [
      "Is this measuring total protein or albumin specifically, and does that difference matter here?",
      "Would a first-morning sample help rule out posture-related protein?",
      "Is a ratio test or a timed collection a useful next step?",
    ],
  },
  {
    slug: "urine-culture",
    name: "Urine Culture",
    aka: ["Urine C&S", "Culture and sensitivity"],
    panel: "kidney",
    short:
      "Grows bacteria from a urine sample to confirm an infection and identify the organism.",
    measures:
      "Whether bacteria or yeast grow from a urine sample over a day or two in the lab. When something grows, the lab identifies the organism and usually tests which antibiotics it is sensitive to.",
    whyOrdered:
      "Ordered to confirm a suspected urinary tract infection and identify the organism behind it. It is also used when symptoms keep returning, when a first course of treatment did not settle things, and routinely at certain points in pregnancy.",
    higher:
      "A culture is reported as growth rather than a number. Growth is broadly associated with urinary tract infection, but small or mixed growth often reflects skin bacteria that entered the sample during collection. Bacteria can also live quietly in the bladder without causing illness, which is called asymptomatic bacteriuria.",
    lower:
      "No growth is the expected result. Antibiotics taken recently can suppress growth even when bacteria are present.",
    affectedBy: [
      "How the sample was collected - clean-catch technique reduces contamination",
      "A sample left at room temperature, which lets stray bacteria multiply",
      "Antibiotics taken shortly before the sample",
      "Very dilute urine from heavy fluid intake",
    ],
    ask: [
      "Was this a clean-catch sample, and could contamination explain the result?",
      "Which organism grew, and was sensitivity testing done?",
      "Does mixed growth mean the sample should be collected again?",
    ],
  },
  // ---------- lipid (generated batch) ----------
  {
    slug: "total-cholesterol",
    name: "Total Cholesterol",
    aka: ["TC", "Cholesterol, Total"],
    panel: "lipid",
    short:
      "The combined cholesterol carried in all the blood's lipoprotein particles.",
    measures:
      "The total amount of cholesterol in the blood, adding together the cholesterol carried in every particle type: HDL, LDL, VLDL, and others. It is a summary figure, not a measure of any single particle.",
    whyOrdered:
      "Ordered as part of a standard lipid panel to assess long term heart and blood vessel risk. It also serves as the starting point for calculated values on the same report, such as non-HDL cholesterol.",
    higher:
      "Broadly associated, at a population level, with a greater long term likelihood of cholesterol buildup in arteries. Also linked with genetics, an underactive thyroid, pregnancy, kidney and liver conditions, and some common medicines such as steroids.",
    lower:
      "Broadly associated with favorable readings in most settings. Very low values are sometimes linked with an overactive thyroid, malnutrition, or recent acute illness, since cholesterol falls temporarily after infections and surgery.",
    affectedBy: [
      "Recent acute illness or surgery, which can lower it for weeks",
      "Pregnancy, which raises it as a normal change",
      "Whether the sample was fasting, which mainly shifts the calculated parts of the panel",
      "Seasonal variation and recent weight change",
      "Common medicines, including steroids and some blood pressure treatments",
    ],
    ask: [
      "How do the individual parts of my panel change the picture compared with the total alone?",
      "Could a thyroid check be useful alongside this?",
      "Did I need to fast for this draw, and should I next time?",
    ],
  },
  {
    slug: "non-hdl-cholesterol",
    name: "Non-HDL Cholesterol",
    aka: ["Non-HDL-C"],
    panel: "lipid",
    short:
      "Total cholesterol minus HDL - the cholesterol in all the artery-relevant particles.",
    measures:
      "A calculation rather than a direct measurement: total cholesterol minus HDL cholesterol. The result is the cholesterol carried in every particle type other than HDL, including LDL, VLDL, and remnant particles - the leftovers after triglycerides have been unloaded.",
    whyOrdered:
      "Ordered as a single summary of the cholesterol in the particle types linked with artery buildup. It stays reliable without fasting, so it is often used for routine risk assessment and for tracking over time.",
    higher:
      "Broadly associated, at a population level, with a higher long term likelihood of cholesterol buildup in arteries. Genetics, diet, an underactive thyroid, kidney conditions, and pregnancy are all linked with higher values.",
    lower:
      "Low values are generally viewed as favorable and are not pursued on their own.",
    affectedBy: [
      "Recent acute illness, which temporarily lowers cholesterol",
      "Pregnancy, a normal cause of higher values",
      "Recent weight change or a major change in diet",
      "Less affected by a recent meal than triglyceride based numbers",
    ],
    ask: [
      "Is non-HDL or ApoB the more useful summary number in my situation?",
      "Do I need to fast before future lipid panels?",
      "How does this number relate to the LDL figure on the same report?",
    ],
  },
  {
    slug: "vldl-cholesterol",
    name: "VLDL Cholesterol",
    aka: ["VLDL-C"],
    panel: "lipid",
    short:
      "Cholesterol in VLDL particles, the triglyceride carriers, usually estimated rather than measured.",
    measures:
      "The cholesterol carried in very low density lipoprotein (VLDL) particles, the particles that transport triglycerides made by the liver. On most reports it is estimated from the triglyceride result rather than measured directly.",
    whyOrdered:
      "Usually reported automatically as part of a standard lipid panel rather than ordered on its own. It mainly serves as another way of expressing the triglyceride carrying particles in the blood.",
    higher:
      "Broadly associated with higher triglycerides, since the number is usually calculated from them. Higher values track with recent meals, alcohol, metabolic conditions, and an underactive thyroid.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "A recent meal, especially one high in fat or sugar",
      "Alcohol in the day or two before the draw",
      "Recent illness",
      "Whether the lab estimated it from triglycerides or measured it directly",
    ],
    ask: [
      "Was this figure estimated from my triglycerides or measured directly?",
      "Would a fasting sample change this part of the panel?",
      "Does this number add anything beyond the triglyceride result itself?",
    ],
  },
  {
    slug: "lipoprotein-a",
    name: "Lipoprotein(a)",
    aka: ["Lp(a)"],
    panel: "lipid",
    short:
      "An inherited, LDL-like particle measured to refine long term heart risk.",
    measures:
      "The amount of lipoprotein(a), an LDL-like particle with an extra protein called apolipoprotein(a) attached. The level is set mostly by genes and stays fairly stable across a lifetime.",
    whyOrdered:
      "Often ordered to refine long term cardiovascular risk, especially when there is a family history of early heart disease or stroke. Because the level is largely inherited and stable, many clinicians measure it only once.",
    higher:
      "Broadly associated, at a population level, with an inherited tendency toward artery disease and aortic valve disease. Values are largely unaffected by diet and exercise, and can also rise with kidney disease, menopause, and an underactive thyroid.",
    lower:
      "Low values are generally viewed as neutral or favorable and are not pursued.",
    affectedBy: [
      "Genetics, which dominates the result far more than lifestyle",
      "Temporary rises during inflammation or after acute illness",
      "Menopause and other hormonal shifts",
      "Lab differences: some labs report mass units and others particle units, which are not interchangeable",
    ],
    ask: [
      "Was this reported in mass or particle units, and how does that affect comparisons between labs?",
      "Should close relatives consider being tested, since levels run in families?",
      "How does this result combine with my standard cholesterol panel when judging long term risk?",
    ],
  },
  {
    slug: "apolipoprotein-b",
    name: "Apolipoprotein B",
    aka: ["ApoB", "Apo B"],
    panel: "lipid",
    short:
      "A count of cholesterol carrying particles - one ApoB protein sits on each particle.",
    measures:
      "The concentration of apolipoprotein B, a protein present as exactly one copy on each LDL, VLDL, IDL (an intermediate particle between the two), and lipoprotein(a) particle. It therefore acts as a count of the particle types linked with artery buildup.",
    whyOrdered:
      "Ordered to count cholesterol carrying particles directly, which can tell a different story from the cholesterol amount alone. It is often used when triglycerides are elevated or when standard panel results seem inconsistent with each other.",
    higher:
      "Broadly associated with a larger number of cholesterol carrying particles and, at a population level, with long term artery disease risk. Higher values are also linked with insulin resistance, an underactive thyroid, and kidney conditions.",
    lower:
      "Low values are generally viewed as favorable. Very low values are occasionally linked with uncommon inherited patterns of lipoprotein production, but are generally not pursued when the rest of the panel is unremarkable.",
    affectedBy: [
      "Little affected by a recent meal, unlike triglyceride based numbers",
      "Recent acute illness or inflammation",
      "Pregnancy",
      "Recent weight change",
      "Common medicines, including steroids",
    ],
    ask: [
      "Does my ApoB agree with my LDL cholesterol, and what does it mean if they diverge?",
      "Is ApoB worth tracking alongside or instead of my standard panel?",
      "Which of my other results does this number add the most information to?",
    ],
  },
  // ---------- thyroid (generated batch) ----------
  {
    slug: "free-t3",
    name: "Free T3",
    aka: ["Free triiodothyronine", "FT3", "T3 free"],
    panel: "thyroid",
    short:
      "The free, active form of T3, the more potent of the two main thyroid hormones.",
    measures:
      "The unbound (free) portion of triiodothyronine, or T3, the more active of the two main thyroid hormones. Most T3 in blood is attached to carrier proteins; this test measures only the small free fraction available to act on cells.",
    whyOrdered:
      "Usually ordered after TSH and free T4 when an overactive thyroid is suspected, because some overactive states raise T3 more than T4. It is generally less useful when an underactive thyroid is being investigated.",
    higher:
      "Broadly associated with an overactive thyroid gland, with thyroid hormone medicines, and with biotin supplement interference on some laboratory methods.",
    lower:
      "Broadly associated with an underactive thyroid, but also - very commonly - with recent significant illness, fasting, or strict dieting, because the body deliberately turns down T3 during illness. This pattern, often called non-thyroidal illness, is not a thyroid disease.",
    affectedBy: [
      "Biotin (vitamin B7) supplements, which can distort results on some lab methods",
      "Any recent significant illness, which lowers T3 as a normal response",
      "Fasting or strict dieting in the days before the draw",
      "Thyroid medicines and the timing of the last dose",
      "Pregnancy",
    ],
    ask: [
      "How does this fit with the TSH and free T4 from the same draw?",
      "I take biotin - should it be paused before a repeat test?",
      "Could a recent illness or dieting explain a lower T3?",
    ],
  },
  {
    slug: "tpo-antibodies",
    name: "TPO Antibodies",
    aka: ["Thyroid peroxidase antibodies", "Anti-TPO", "TPOAb"],
    panel: "thyroid",
    short:
      "Antibodies against a thyroid enzyme, used as a marker of autoimmune thyroid conditions.",
    measures:
      "The level of antibodies directed against thyroid peroxidase, an enzyme the thyroid uses to make its hormones. These antibodies are a marker that the immune system is reacting against the thyroid gland.",
    whyOrdered:
      "Ordered when thyroid hormone tests are abnormal or borderline, to see whether an autoimmune process such as Hashimoto's thyroiditis or Graves' disease may be behind it. It is sometimes checked as part of pregnancy planning or recurrent miscarriage assessments.",
    higher:
      "Broadly associated with autoimmune thyroid conditions, including Hashimoto's thyroiditis and Graves' disease. Notably, a fair proportion of healthy people carry these antibodies without ever developing thyroid disease, so their presence alone does not mean the gland is failing.",
    lower:
      "Low or undetectable levels are the usual finding and are generally not pursued.",
    affectedBy: [
      "A minority of healthy people, especially women and older adults, test positive without any thyroid problem",
      "Other autoimmune conditions in the person or their family",
      "Pregnancy and the year after childbirth, when thyroid antibody levels can shift",
      "Laboratory method - different labs use different assays and units",
    ],
    ask: [
      "What does it usually mean when these antibodies are present while thyroid hormone levels are normal?",
      "Is there any value in re-checking antibody levels over time?",
      "Does this result matter for a current or planned pregnancy?",
    ],
  },
  {
    slug: "thyroglobulin-antibodies",
    name: "Thyroglobulin Antibodies",
    aka: ["TgAb", "Anti-thyroglobulin antibodies"],
    panel: "thyroid",
    short:
      "Antibodies against thyroglobulin, the thyroid's storage protein; a marker of autoimmune activity.",
    measures:
      "The level of antibodies directed against thyroglobulin, the large protein the thyroid uses to build and store its hormones. Like TPO antibodies, they are a marker of immune activity against the thyroid gland.",
    whyOrdered:
      "Often ordered together with TPO antibodies when autoimmune thyroid disease is being considered. It has a second, quite different use: after treatment for certain thyroid cancers it is checked because its presence can interfere with thyroglobulin, a blood test used for monitoring.",
    higher:
      "Broadly associated with autoimmune thyroid conditions such as Hashimoto's thyroiditis, but also found in a proportion of people with no thyroid problem at all. In thyroid cancer follow-up its main significance is technical - it can make the thyroglobulin monitoring test unreliable.",
    lower:
      "Low or undetectable levels are the usual finding and are generally not pursued.",
    affectedBy: [
      "Some healthy people, particularly women and older adults, test positive without thyroid disease",
      "Pregnancy and the months after childbirth",
      "Laboratory method, since assays and units differ between labs",
      "Other autoimmune conditions",
    ],
    ask: [
      "Why was this checked alongside, or instead of, TPO antibodies?",
      "If I am being monitored after thyroid surgery, how would this antibody affect the thyroglobulin result?",
      "What does it usually mean when this antibody is present while thyroid hormone levels are normal?",
    ],
  },
  // ---------- diabetes (generated batch) ----------
  {
    slug: "fasting-insulin",
    name: "Fasting Insulin",
    aka: ["Insulin, Fasting"],
    panel: "diabetes",
    short:
      "The pancreas hormone that moves sugar into cells, measured after an overnight fast.",
    measures:
      "The concentration of insulin, the pancreas hormone that moves glucose from the blood into cells, after an overnight fast. Fasting standardizes the measurement, because insulin rises sharply after every meal.",
    whyOrdered:
      "Usually ordered alongside fasting glucose to see how much insulin the body is using to keep glucose steady. It comes up when insulin resistance, unexplained weight change, or episodes of low blood sugar are being evaluated.",
    higher:
      "Broadly associated with insulin resistance, a state where the body needs more insulin to achieve the same effect. Also linked with recent food intake, stress, steroid medicines, and, rarely, insulin producing tumors in the specific context of low glucose.",
    lower:
      "Broadly associated with reduced insulin production, but also seen with prolonged fasting and with lean, insulin sensitive physiology. The glucose value drawn at the same time carries much of the meaning.",
    affectedBy: [
      "Any food or caloric drink before the draw, even a small one",
      "Stress and poor sleep the night before",
      "Vigorous exercise in the preceding day",
      "Steroid medicines and some hormonal treatments",
      "Sample handling: insulin degrades quickly if the sample is not processed promptly",
    ],
    ask: [
      "Was glucose drawn at the same time, and how do the two values fit together?",
      "Exactly how long should the fast be before a repeat, and does black coffee count as breaking it?",
      "Could any of my current medicines be influencing this?",
    ],
  },
  {
    slug: "c-peptide",
    name: "C-Peptide",
    aka: ["Connecting Peptide", "Insulin C-Peptide"],
    panel: "diabetes",
    short:
      "A by-product of insulin production, used to gauge how much insulin the pancreas makes.",
    measures:
      "The concentration of C-peptide, a fragment released into the blood in equal amounts with every molecule of insulin the pancreas makes. It reflects the body's own insulin production, and unlike insulin itself it is absent from injected insulin.",
    whyOrdered:
      "Ordered to gauge how much insulin the pancreas is producing on its own. Common situations include telling forms of diabetes apart, evaluating episodes of low blood sugar, and separating the body's insulin from injected insulin.",
    higher:
      "Broadly associated with increased insulin production, as seen with insulin resistance and, rarely, with insulin producing tumors. Also linked with reduced kidney function, because the kidneys clear C-peptide from the blood.",
    lower:
      "Broadly associated with reduced insulin production by the pancreas. Prolonged fasting before the draw also lowers it.",
    affectedBy: [
      "Whether the sample was fasting or after food, which changes it substantially",
      "Kidney function, which affects how quickly it is cleared",
      "Sample handling and delays before processing",
      "Steroid medicines and other drugs that shift insulin output",
    ],
    ask: [
      "Was this a fasting or a stimulated measurement, and how does that change what it shows?",
      "Should my kidney function be considered when reading this value?",
      "Was a glucose level drawn at the same moment?",
    ],
  },
  {
    slug: "fructosamine",
    name: "Fructosamine",
    aka: ["Glycated Serum Protein", "GSP"],
    panel: "diabetes",
    short:
      "Sugar-coated blood proteins, reflecting average glucose over the past few weeks.",
    measures:
      "The amount of blood proteins, mostly albumin, that have glucose attached to them. Because these proteins turn over quickly, the result reflects average glucose over the previous few weeks, a much shorter window than hemoglobin A1c.",
    whyOrdered:
      "Ordered when a shorter term average of glucose is wanted, for example soon after a change in routine. Also used when hemoglobin A1c may be unreliable, such as with anemia, altered red blood cell lifespan, or pregnancy.",
    higher:
      "Broadly associated with higher average blood glucose over the preceding few weeks.",
    lower:
      "Broadly associated with lower average glucose, but also with low blood protein levels, since the test depends on albumin. States that speed up protein turnover, including thyroid, kidney, and liver conditions, are linked with lower values independent of glucose.",
    affectedBy: [
      "Blood protein and albumin levels, which the test depends on",
      "High dose vitamin C supplements",
      "Pregnancy",
      "Thyroid status",
      "It reflects weeks of glucose, so a single unusual day barely moves it",
    ],
    ask: [
      "Was this chosen instead of A1c for a reason that applies to me?",
      "Should albumin be measured alongside it to check the result is trustworthy?",
      "How far apart should measurements be, given the short window it reflects?",
    ],
  },
  {
    slug: "glucose-tolerance-test",
    name: "Oral Glucose Tolerance Test",
    aka: ["OGTT", "GTT", "Glucose Tolerance Test"],
    panel: "diabetes",
    short:
      "Timed glucose measurements after a standard sugary drink, showing how the body handles a sugar load.",
    measures:
      "Blood glucose measured before, and at set times after, drinking a standard measured glucose drink. Rather than a single snapshot, it records how quickly the body moves a known sugar load out of the blood.",
    whyOrdered:
      "Most commonly ordered during pregnancy to screen for gestational diabetes. Also used when fasting results are borderline or do not match the overall picture, since some glucose handling problems appear only after a sugar load.",
    higher:
      "Higher post-drink values are broadly associated with a reduced ability to clear glucose from the blood. Steroid medicines, acute illness, prolonged inactivity, and a low carbohydrate diet in the days beforehand are all linked with higher readings.",
    lower:
      "A brisk fall after the drink is broadly associated with vigorous insulin release. The shape of the whole curve, together with how the person felt during the test, generally matters more than any single point.",
    affectedBy: [
      "Carbohydrate restriction in the days before, which can exaggerate the response",
      "Not fasting properly beforehand",
      "Illness, stress, or poor sleep around the test",
      "Walking around, smoking, or eating during the test",
      "Vomiting the drink, which invalidates the result",
    ],
    ask: [
      "Should I eat my normal diet, including carbohydrates, in the days before the test?",
      "How long is the fast beforehand, and is water allowed?",
      "What happens if I feel unwell or vomit during the test?",
      "Am I allowed to move around between the blood draws?",
    ],
  },
  // ---------- heart (generated batch) ----------
  {
    slug: "troponin",
    name: "Troponin",
    aka: ["cTn", "troponin I", "troponin T", "high-sensitivity troponin", "hs-cTn"],
    panel: "heart",
    short:
      "A heart muscle protein released into the blood when heart cells are stressed or injured.",
    measures:
      "Troponins are proteins that heart muscle cells use to contract, and they are normally kept inside those cells. The test measures the small amount of troponin I or troponin T that has leaked into the bloodstream. Modern high-sensitivity versions can detect tiny traces.",
    whyOrdered:
      "Mainly ordered in urgent settings when chest pain, breathlessness, or other symptoms raise the question of a heart attack. It is usually repeated over several hours, because the pattern of change matters as much as any single value.",
    higher:
      "Broadly associated with stress or injury to heart muscle from many causes, of which a heart attack is only one. Kidney disease, fast heart rhythms, heart failure, severe infection, and very strenuous exercise are all recognized non-heart-attack causes. High-sensitivity assays pick up small elevations often, so results are read together with symptoms, ECG findings, and the trend over time.",
    lower:
      "Low or undetectable values are the expected finding in most people. Low values are generally not pursued.",
    affectedBy: [
      "Very strenuous recent exercise, such as a long race",
      "Reduced kidney function, which slows how fast troponin is cleared",
      "Biotin supplements, which can interfere with some lab methods",
      "Age and sex, which shift what counts as a typical level",
      "Which assay the lab uses - high-sensitivity and older versions read on different scales",
    ],
    ask: [
      "Was this a high-sensitivity troponin, and was the level rising, falling, or stable across draws?",
      "Could kidney function or a fast heart rhythm be contributing to the level?",
      "Could recent hard exercise have played a role in this result?",
    ],
  },
  {
    slug: "bnp-nt-probnp",
    name: "BNP and NT-proBNP",
    aka: ["BNP", "NT-proBNP", "B-type natriuretic peptide", "brain natriuretic peptide"],
    panel: "heart",
    short:
      "Hormones the heart releases when its walls are stretched, used to assess strain on the heart.",
    measures:
      "BNP is a hormone that the heart's pumping chambers release when their walls are stretched by pressure or extra fluid. NT-proBNP is an inactive fragment produced at the same time. A lab measures one or the other, and the two are reported on very different scales.",
    whyOrdered:
      "Most often ordered when breathlessness, swelling, or fatigue raises the question of heart failure, meaning the heart is not pumping as efficiently as it should. It is also used to follow known heart conditions over time.",
    higher:
      "Broadly associated with stretch or strain on the heart, including heart failure, but also with older age, kidney disease, atrial fibrillation (an irregular heart rhythm), and some lung conditions. Levels also tend to run higher in women and in older adults who have no heart problem at all.",
    lower:
      "Broadly associated with a low likelihood of significant strain on the heart. Levels can also run lower than expected in people with higher body weight.",
    affectedBy: [
      "Age - levels rise naturally as people get older",
      "Body weight - levels tend to run lower at higher weights",
      "Kidney function, which especially influences NT-proBNP",
      "Which version the lab measured - BNP and NT-proBNP numbers are not interchangeable",
      "Certain common heart and blood pressure medicines, which can shift measured BNP",
    ],
    ask: [
      "Was BNP or NT-proBNP measured, since the two use different scales?",
      "Could my age, weight, or kidney function be shifting this value?",
      "Would an echocardiogram (an ultrasound of the heart) add useful information here?",
    ],
  },
  {
    slug: "ck",
    name: "Creatine Kinase",
    aka: ["CK", "CPK", "creatine phosphokinase", "total CK"],
    panel: "heart",
    short:
      "An enzyme from muscle, released into the blood when muscle is worked hard or injured.",
    measures:
      "The activity of creatine kinase, an enzyme concentrated in skeletal muscle, heart muscle, and brain tissue. It leaks into the blood when muscle cells are stressed or damaged, so the blood level reflects recent muscle strain or injury.",
    whyOrdered:
      "Commonly ordered when muscle aches, weakness, or dark urine raise the question of muscle injury. It is also used to check on people taking statin cholesterol medicines, which occasionally irritate muscle, and after falls, seizures, or prolonged immobility.",
    higher:
      "Broadly associated with muscle injury of any kind, from strenuous exercise and bruising falls to inflammatory muscle conditions. A single hard workout can raise it substantially for several days. Very high levels are associated with rhabdomyolysis, a rapid breakdown of muscle tissue.",
    lower:
      "Broadly associated with lower muscle mass or a sedentary lifestyle. Low values are generally not pursued.",
    affectedBy: [
      "Exercise in the past several days, even one unusually hard session",
      "Recent falls, bruises, or injections into a muscle",
      "Muscle mass - muscular people tend to run higher at baseline",
      "Ancestry - typical baseline levels differ between populations",
      "Statins and some other common medicines",
    ],
    ask: [
      "How long should I avoid hard exercise before this is drawn again?",
      "Could a medicine I take, such as a statin, be contributing to the level?",
      "Is my baseline likely to run high because of my build or ancestry?",
    ],
  },
  {
    slug: "homocysteine",
    name: "Homocysteine",
    aka: ["Hcy", "plasma homocysteine", "total homocysteine"],
    panel: "heart",
    short:
      "An amino acid tied to B-vitamin status, studied as a marker of cardiovascular risk.",
    measures:
      "The level of homocysteine, an amino acid the body produces while processing protein. Clearing it from the blood depends on folate, vitamin B12, and vitamin B6, so the level partly reflects how well supplied the body is with those vitamins.",
    whyOrdered:
      "Sometimes ordered when a shortage of vitamin B12 or folate is suspected, because homocysteine rises early when those vitamins run low. It is occasionally checked when unusual blood clots or early cardiovascular disease run in a family.",
    higher:
      "Broadly associated with low folate, vitamin B12, or vitamin B6, with reduced kidney function, and with a common inherited variation in the MTHFR gene that slows homocysteine processing. It has been studied as a cardiovascular risk marker, although lowering it has not clearly been shown to prevent heart disease.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "Eating before the draw - a protein-rich meal can raise it",
      "Delays in processing the blood sample, which push the measured level up",
      "Smoking and heavy coffee intake",
      "Some common medicines, including metformin and certain anti-seizure drugs",
      "Kidney function",
    ],
    ask: [
      "Should vitamin B12 and folate levels be checked alongside this?",
      "Was this a fasting sample, and does that matter for how it is read?",
      "Could my kidney function or a medicine I take be influencing the level?",
    ],
  },
  // ---------- coagulation (generated batch) ----------
  {
    slug: "pt-inr",
    name: "PT and INR",
    aka: ["PT", "INR", "prothrombin time", "international normalized ratio"],
    panel: "coagulation",
    short:
      "Times one clotting pathway; the INR standardizes it, mainly for monitoring warfarin.",
    measures:
      "The prothrombin time (PT) is how many seconds a plasma sample takes to clot when one arm of the clotting system is triggered in the lab. The INR is the same result converted onto a standard scale, so values are comparable between different labs.",
    whyOrdered:
      "Ordered to monitor the blood thinner warfarin, which is what the INR scale was designed for. It is also used before surgery, to investigate unusual bleeding or bruising, and to gauge how well the liver is making clotting proteins.",
    higher:
      "Broadly associated with slower-than-average clotting. Recognized causes include warfarin and some other blood thinners, low vitamin K, liver disease, and shortages of specific clotting factors. In people taking warfarin, diet changes and antibiotics commonly move the INR.",
    lower:
      "Broadly associated with faster-than-average clotting. Mildly low values on their own are generally not pursued.",
    affectedBy: [
      "A difficult blood draw or an underfilled collection tube",
      "Vitamin K intake from leafy green vegetables",
      "Antibiotics and many other common medicines",
      "Alcohol intake",
      "Delay between drawing the sample and running the test",
    ],
    ask: [
      "Could a change in my diet or a newly started medicine have shifted this?",
      "Could the way the sample was collected have affected the result?",
      "If I am not on a blood thinner, what was this test checking for?",
    ],
  },
  {
    slug: "aptt",
    name: "aPTT",
    aka: ["activated partial thromboplastin time", "PTT", "APTT"],
    panel: "coagulation",
    short:
      "Times a second clotting pathway, used to monitor heparin and to screen clotting factors.",
    measures:
      "How many seconds a plasma sample takes to clot when a different arm of the clotting system than the PT test is triggered in the lab. It reflects the combined activity of several clotting factors working in sequence.",
    whyOrdered:
      "Ordered to monitor the blood thinner heparin, before some operations, and to investigate unexplained bleeding, bruising, or clotting. It is often run alongside the PT so the two clotting pathways can be compared.",
    higher:
      "Broadly associated with slower-than-average clotting. Recognized causes include heparin, shortages of specific clotting factors such as those seen in hemophilia, and antibodies called lupus anticoagulant, which despite the name are linked to clotting rather than bleeding and often occur without lupus.",
    lower:
      "Broadly associated with a sample that clotted quickly, which can simply reflect how the specimen was collected. Low values are generally not pursued.",
    affectedBy: [
      "A slow or difficult blood draw, which can activate clotting in the tube",
      "An underfilled collection tube",
      "Contamination from an IV line that has been flushed with heparin",
      "Delay before the lab processed the sample",
    ],
    ask: [
      "Was the sample drawn through an IV line that could have contained heparin?",
      "Would a mixing study - a follow-up test that blends my plasma with normal plasma - help show whether a clotting factor or an antibody is involved?",
      "How does this result fit alongside my PT and INR?",
    ],
  },
  {
    slug: "d-dimer",
    name: "D-Dimer",
    aka: ["D-di", "fibrin degradation fragment"],
    panel: "coagulation",
    short:
      "A fragment left over when blood clots dissolve, used mainly to help rule clots out.",
    measures:
      "The level of D-dimer, a small protein fragment released when the body breaks down a blood clot. Its presence shows that clot formation and breakdown have been happening somewhere in the body.",
    whyOrdered:
      "Most often ordered when a clot in a leg vein (deep vein thrombosis) or in the lungs (pulmonary embolism) is being considered. Its main strength is in ruling clots out, because a low value makes a significant clot unlikely.",
    higher:
      "Broadly associated with any recent clotting activity, but the test is famously nonspecific. Infection, inflammation, surgery, injury, cancer, pregnancy, and simply getting older all raise it without any dangerous clot being present. A raised value usually leads to imaging rather than standing as an answer on its own.",
    lower:
      "Broadly associated with an absence of significant recent clot formation and breakdown. Low values are generally not pursued.",
    affectedBy: [
      "Older age - levels rise steadily with age",
      "Pregnancy, which raises it progressively as it advances",
      "Recent surgery, injury, or dental work",
      "Any recent infection or inflammation",
      "Smoking",
    ],
    ask: [
      "Could my age, a recent illness, or pregnancy account for the level seen?",
      "Would imaging, such as an ultrasound or CT scan, be the next step?",
      "Was an age-adjusted approach used when reading this result?",
    ],
  },
  {
    slug: "fibrinogen",
    name: "Fibrinogen",
    aka: ["factor I", "fibrinogen activity", "fibrinogen level"],
    panel: "coagulation",
    short:
      "The clotting protein that forms the mesh of a blood clot; it also rises with inflammation.",
    measures:
      "The amount or activity of fibrinogen, a protein made by the liver that is converted into fibrin, the mesh that holds a blood clot together. It is also an acute phase protein, meaning the liver makes more of it during inflammation.",
    whyOrdered:
      "Ordered when unusual bleeding is being investigated, during major bleeding events to guide care, and when other clotting tests give puzzling results. It is sometimes measured as part of assessing inflammation or long-term cardiovascular risk.",
    higher:
      "Broadly associated with inflammation, infection, recent surgery or injury, pregnancy, and smoking, because fibrinogen rises as part of the body's stress response. Persistently high levels have been studied as a marker of cardiovascular risk.",
    lower:
      "Broadly associated with the liver making less of it, with rare inherited fibrinogen disorders, and with situations where clotting proteins are used up faster than they are replaced.",
    affectedBy: [
      "Any current or recent infection or inflammation",
      "Pregnancy and estrogen-containing medicines, which raise it",
      "Smoking",
      "Recent surgery or injury",
      "Sample handling problems, including a difficult draw or an underfilled tube",
    ],
    ask: [
      "Could a recent illness or ongoing inflammation be raising this?",
      "Should liver tests be checked alongside it?",
      "Do my other clotting results fit together with this one?",
    ],
  },
  // ---------- hormones (generated batch) ----------
  {
    slug: "cortisol",
    name: "Cortisol",
    aka: ["Serum cortisol", "AM cortisol"],
    panel: "hormones",
    short:
      "The body's main stress hormone, made by the adrenal glands on a strong daily rhythm.",
    measures:
      "The amount of cortisol, a steroid hormone made by the adrenal glands, circulating in the blood at the moment of the draw. Cortisol follows a strong daily rhythm - highest shortly after waking and lowest around midnight - so a level only makes sense alongside the time it was taken.",
    whyOrdered:
      "Ordered when a clinician is considering conditions of too much or too little adrenal hormone output, or as part of a work-up for unexplained fatigue, weight change, or blood pressure changes. A single blood level is usually a starting point that leads to more specialized timed testing rather than a final answer on its own.",
    higher:
      "Broadly associated with overactivity of the adrenal glands or the signals that drive them, but also with ordinary physical or emotional stress, acute illness, pregnancy, and estrogen-containing medications, all of which can raise cortisol without any adrenal disease.",
    lower:
      "Broadly associated with underactive adrenal glands or reduced pituitary signaling, and also with recent or current use of steroid medications, which quiet the body's own production. Levels drawn later in the day are naturally much lower.",
    affectedBy: [
      "Time of day of the blood draw, since cortisol is naturally highest in the morning",
      "Stress, including anxiety about the blood draw itself",
      "Steroid medications in any form, including creams and inhalers",
      "Estrogen-containing medications such as birth control pills",
      "Shift work, poor sleep, and pregnancy",
    ],
    ask: [
      "Was this drawn at the right time of day for the question being asked?",
      "Could any steroid medicine I use, even a cream or inhaler, have affected this?",
      "Would a timed or stimulation test give a clearer picture than a single level?",
    ],
  },
  {
    slug: "testosterone",
    name: "Testosterone",
    aka: ["Total testosterone", "T"],
    panel: "hormones",
    short:
      "The main androgen hormone, measured for questions about energy, fertility, and hormonal balance.",
    measures:
      "The concentration of testosterone, the main androgen (masculinizing) hormone, in the blood. Most tests measure total testosterone, which includes both the portion bound to carrier proteins and the small free portion that is biologically active.",
    whyOrdered:
      "Ordered in men when low energy, low libido, fertility problems, or erectile difficulties raise the question of low testosterone, and in women when symptoms such as excess hair growth or irregular periods raise the question of androgen excess. Often paired with other hormone tests to see where in the system a change originates.",
    higher:
      "Broadly associated with androgen excess conditions such as polycystic ovary syndrome in women, with testosterone or anabolic steroid use, and with certain adrenal or ovarian conditions. In men, mildly raised values are often of little significance.",
    lower:
      "Broadly associated in men with reduced production from the testes or reduced pituitary signaling, but also with aging, higher body weight, poor sleep, recent illness, and certain medications. In women, low values are generally not pursued.",
    affectedBy: [
      "Time of day - levels are naturally highest in the early morning",
      "Recent illness, poor sleep, or heavy exercise",
      "Body weight and significant recent weight change",
      "Opioid pain medications and steroid medications",
      "Biotin supplements, which can interfere with some lab methods",
    ],
    ask: [
      "Was this drawn in the morning, when levels are most reliable?",
      "Should free testosterone or SHBG, its carrier protein, be measured alongside the total?",
      "Could a medication I take, such as an opioid or a steroid, be influencing this?",
    ],
  },
  {
    slug: "estradiol",
    name: "Estradiol",
    aka: ["E2", "Oestradiol"],
    panel: "hormones",
    short:
      "The main form of estrogen, which changes dramatically across the menstrual cycle and with menopause.",
    measures:
      "The concentration of estradiol, the most active form of estrogen, in the blood. In people who menstruate the level swings widely across the cycle, so the result is only meaningful alongside the timing of the draw within the cycle.",
    whyOrdered:
      "Ordered to help evaluate irregular or absent periods, fertility questions, symptoms around menopause, and early or delayed puberty, and to monitor certain fertility treatments. It is usually interpreted together with FSH and LH rather than on its own.",
    higher:
      "Broadly associated with the normal mid-cycle peak, with pregnancy, with estrogen-containing medications, and with certain ovarian conditions. In men, raised values are broadly associated with increased conversion from testosterone, which can occur with higher body weight.",
    lower:
      "Broadly associated with menopause, reduced ovarian activity, low body weight or very intense exercise, and suppression by some hormonal contraceptives. Levels are also naturally low at certain points in the menstrual cycle.",
    affectedBy: [
      "The day of the menstrual cycle on which blood was drawn",
      "Hormonal contraception, which can suppress or supply estrogen",
      "Pregnancy and breastfeeding",
      "Significant weight change or intense exercise training",
      "Biotin supplements, which can interfere with some lab methods",
    ],
    ask: [
      "Does this result fit the day of my cycle when it was drawn?",
      "Should FSH and LH be looked at alongside this?",
      "Could my contraception be affecting this number?",
    ],
  },
  {
    slug: "fsh",
    name: "FSH (Follicle-Stimulating Hormone)",
    aka: ["Follicle-stimulating hormone", "Follitropin"],
    panel: "hormones",
    short:
      "A pituitary hormone that drives egg and sperm development; used to assess ovarian and testicular function.",
    measures:
      "The level of follicle-stimulating hormone, a messenger released by the pituitary gland at the base of the brain. FSH tells the ovaries to mature eggs and the testes to make sperm, so it reflects the conversation between the brain and the reproductive glands.",
    whyOrdered:
      "Ordered for irregular or absent periods, fertility evaluations, questions about menopause timing, low testosterone work-ups in men, and early or delayed puberty. Comparing FSH with the hormones it stimulates helps locate where in the system a change is happening.",
    higher:
      "Broadly associated with reduced ovarian or testicular output, because the pituitary raises its signal when the reproductive glands respond less. It rises naturally with menopause.",
    lower:
      "Broadly associated with reduced signaling from the pituitary or hypothalamus, and with suppression by hormonal contraception, pregnancy, or significant physical stress such as intense training or low body weight.",
    affectedBy: [
      "The day of the menstrual cycle on which blood was drawn",
      "Hormonal contraception, which suppresses it",
      "Pregnancy",
      "Recent significant weight loss or intense exercise",
      "Biotin supplements, which can interfere with some lab methods",
    ],
    ask: [
      "Was this drawn on the right cycle day for the question being asked?",
      "Should this be interpreted together with LH and estradiol?",
      "Could my contraception have suppressed this result?",
    ],
  },
  {
    slug: "lh",
    name: "LH (Luteinizing Hormone)",
    aka: ["Luteinizing hormone", "Lutropin"],
    panel: "hormones",
    short:
      "A pituitary hormone that triggers ovulation and drives testosterone production.",
    measures:
      "The level of luteinizing hormone, a messenger from the pituitary gland at the base of the brain. In women it surges once per cycle to trigger ovulation; in men it steadily signals the testes to make testosterone.",
    whyOrdered:
      "Ordered alongside FSH for irregular periods, fertility evaluations, low testosterone work-ups, and puberty questions. The balance between LH, FSH, and the hormones they stimulate helps show whether a change starts in the brain's signaling or in the ovaries or testes.",
    higher:
      "Broadly associated with reduced ovarian or testicular response, with menopause, and with the normal surge that happens just before ovulation. A relatively high LH compared with FSH is also broadly associated with polycystic ovary syndrome.",
    lower:
      "Broadly associated with reduced pituitary or hypothalamic signaling, and with suppression by hormonal contraception, physical stress, low body weight, or heavy exercise training.",
    affectedBy: [
      "The day of the menstrual cycle - a brief natural surge occurs mid-cycle",
      "Hormonal contraception, which suppresses it",
      "Intense exercise, low body weight, or recent major stress",
      "Biotin supplements, which can interfere with some lab methods",
    ],
    ask: [
      "Could this have been drawn during the natural mid-cycle surge?",
      "How does this compare with my FSH, and what does that pattern suggest?",
      "Is there a specific point in my cycle when this test is most informative?",
    ],
  },
  {
    slug: "prolactin",
    name: "Prolactin",
    aka: ["PRL"],
    panel: "hormones",
    short:
      "The milk-production hormone, which also responds readily to stress, sleep, and many common medications.",
    measures:
      "The level of prolactin, a pituitary hormone best known for enabling milk production after childbirth. It is present in everyone, and it rises readily with stress, sleep, eating, exercise, and nipple or chest wall stimulation.",
    whyOrdered:
      "Ordered for irregular or absent periods, unexpected milky nipple discharge, fertility problems, low libido, or low testosterone, since high prolactin can quiet the reproductive hormone system. Also checked when a pituitary gland problem is being considered.",
    higher:
      "Broadly associated with prolactin-producing pituitary growths, but far more often with ordinary causes - stress, recent sleep, a recent meal, exercise, nipple stimulation, pregnancy, breastfeeding, and a long list of common medications. Laboratories can also detect macroprolactin, an inactive clumped form that inflates the number without any biological effect.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "Stress, including the stress of the blood draw itself",
      "Recent sleep, exercise, a meal, or breast stimulation before the draw",
      "Many common medications, including some used for nausea, depression, and mental health",
      "Pregnancy and breastfeeding",
      "Macroprolactin, a harmless lab finding that inflates the result",
    ],
    ask: [
      "Could a medication I take be raising this?",
      "Should the lab check for macroprolactin before anything else is done?",
      "Would a sample drawn rested, and before eating, give a truer picture?",
    ],
  },
  {
    slug: "progesterone",
    name: "Progesterone",
    aka: ["P4", "Serum progesterone"],
    panel: "hormones",
    short:
      "The hormone of the second half of the menstrual cycle, used mainly to confirm ovulation.",
    measures:
      "The level of progesterone, a hormone produced mainly by the ovary after an egg is released and, in pregnancy, by the placenta. It stays low through the first half of the menstrual cycle and rises only after ovulation.",
    whyOrdered:
      "Most often ordered about a week after presumed ovulation to confirm that ovulation actually happened, as part of a fertility evaluation. Also measured in early pregnancy assessment and to monitor some fertility treatments.",
    higher:
      "Broadly associated with recent ovulation, pregnancy, and progesterone-containing medications. In the right part of the cycle, a raised value is the expected, healthy finding.",
    lower:
      "Broadly associated with a cycle in which ovulation did not occur, or simply with blood drawn at a point in the cycle when progesterone is naturally low. Timing against the cycle is everything for this test.",
    affectedBy: [
      "The day of the menstrual cycle - the meaning of the test depends entirely on timing",
      "Cycle-to-cycle variation in when ovulation happens",
      "Progesterone-containing medications and hormonal contraception",
      "Pregnancy",
    ],
    ask: [
      "Was the draw timed correctly relative to when I likely ovulated?",
      "If my cycles are irregular, how should the timing of this test be chosen?",
      "Does this result confirm whether I ovulated in that cycle?",
    ],
  },
  {
    slug: "dhea-s",
    name: "DHEA-S",
    aka: ["DHEA sulfate", "Dehydroepiandrosterone sulfate"],
    panel: "hormones",
    short:
      "A stable adrenal androgen used to check whether the adrenal glands are the source of excess hormones.",
    measures:
      "The level of DHEA sulfate, an androgen (masculinizing hormone) made almost entirely by the adrenal glands. Because it stays steady through the day and across the menstrual cycle, it serves as a stable readout of adrenal androgen output.",
    whyOrdered:
      "Ordered mainly when signs of androgen excess - such as excess facial or body hair, acne, or irregular periods - need to be traced to a source, since DHEA-S points toward the adrenal glands rather than the ovaries. Sometimes included in broader adrenal function work-ups.",
    higher:
      "Broadly associated with adrenal sources of androgen excess, including common benign overactivity, and with use of over-the-counter DHEA supplements. Levels are naturally higher in younger adults.",
    lower:
      "Broadly associated with normal aging, since DHEA-S declines steadily from early adulthood onward, and with reduced adrenal output or long-term steroid medication use. Low values on their own are often not pursued.",
    affectedBy: [
      "Age - levels fall naturally decade by decade",
      "Over-the-counter DHEA supplements",
      "Steroid medications, which suppress adrenal output",
      "Biotin supplements, which can interfere with some lab methods",
    ],
    ask: [
      "Is this level in keeping with my age?",
      "Could a supplement I take, including DHEA itself, explain this result?",
      "Should ovarian hormone tests be checked alongside this to compare possible sources?",
    ],
  },
  {
    slug: "psa",
    name: "PSA (Prostate-Specific Antigen)",
    aka: ["Prostate-specific antigen", "Total PSA"],
    panel: "hormones",
    short:
      "A protein made by the prostate, used in prostate health checks and cancer screening discussions.",
    measures:
      "The level of prostate-specific antigen, a protein made by prostate gland cells and released into the blood in small amounts. All prostate tissue makes PSA, so the test reflects prostate activity of any kind, not one specific condition.",
    whyOrdered:
      "Ordered to help evaluate prostate symptoms, to follow known prostate conditions, and as a screening test for prostate cancer. PSA screening is an individualized decision made together with a clinician, since expert bodies differ on when and whether to screen.",
    higher:
      "Broadly associated with prostate cancer, but equally with common benign prostate enlargement, prostate inflammation or infection, urinary tract infection, and recent physical disturbance of the gland - including ejaculation, cycling, or a recent prostate exam. Values also drift upward gradually with age.",
    lower:
      "Low values are generally reassuring and not pursued. Some prostate-shrinking medications lower PSA substantially, which is factored in when the result is read.",
    affectedBy: [
      "Ejaculation in the days before the draw",
      "Recent cycling or other pressure on the perineum",
      "A recent prostate exam or urinary catheter",
      "Urinary tract infection or prostate inflammation",
      "Medications that shrink the prostate, which lower PSA",
    ],
    ask: [
      "Could recent activity, such as cycling or ejaculation, have raised this?",
      "Do I take any medication that lowers PSA and changes how it should be read?",
      "What are the potential benefits and downsides of PSA screening in my situation?",
      "Is the free-to-total PSA ratio something worth checking?",
    ],
  },
  // ---------- vitamins (generated batch) ----------
  {
    slug: "serum-iron",
    name: "Serum Iron",
    aka: ["Iron", "Fe"],
    panel: "vitamins",
    short:
      "The amount of iron circulating in the blood at the moment of the draw, which varies through the day.",
    measures:
      "The concentration of iron travelling in the blood, where it is carried by a protein called transferrin. It reflects iron in transit at that moment, not the body's total iron stores.",
    whyOrdered:
      "Usually ordered as part of an iron panel alongside TIBC and ferritin when anemia, fatigue, or iron overload is being investigated. On its own it is hard to interpret, because the level swings widely from hour to hour and day to day.",
    higher:
      "Broadly associated with iron overload conditions, recent iron supplementation, liver conditions, and some anemias in which the body cannot use iron properly. A recent iron tablet or iron-rich meal can raise it for several hours.",
    lower:
      "Broadly associated with iron deficiency, but also with recent illness or inflammation, which temporarily pulls iron out of the bloodstream. A single low value does not by itself establish depleted iron stores.",
    affectedBy: [
      "Time of day - iron is typically higher in the morning",
      "Iron supplements or multivitamins taken in the days before the draw",
      "A recent iron-rich meal",
      "Any recent illness, infection, or inflammation",
      "The menstrual cycle",
    ],
    ask: [
      "Was this taken as part of a full iron panel with ferritin and TIBC?",
      "Should a repeat sample be done fasting and in the morning?",
      "Could a recent illness have temporarily shifted this value?",
    ],
  },
  {
    slug: "tibc",
    name: "Total Iron-Binding Capacity",
    aka: ["TIBC"],
    panel: "vitamins",
    short:
      "How much iron the blood's carrier protein, transferrin, could hold in total.",
    measures:
      "The total capacity of the blood to carry iron. Iron travels attached to a protein called transferrin, and TIBC estimates how much iron all the transferrin in the sample could hold if it were fully loaded.",
    whyOrdered:
      "Ordered alongside serum iron and ferritin to help work out why iron results are abnormal. The pattern across the whole iron panel is more informative than any single value.",
    higher:
      "Broadly associated with iron deficiency, because the body makes more transferrin when iron is scarce. It can also rise in pregnancy and with estrogen-containing medicines such as the contraceptive pill.",
    lower:
      "Broadly associated with inflammation, chronic illness, liver conditions, and iron overload states, because transferrin production falls in those settings.",
    affectedBy: [
      "Pregnancy",
      "Oral contraceptives and other estrogen-containing medicines",
      "Recent illness or inflammation",
      "Overall nutritional state, since transferrin is a protein made by the liver",
    ],
    ask: [
      "How does this fit with the ferritin and serum iron results from the same draw?",
      "Could a medicine I take, such as the contraceptive pill, be influencing it?",
      "Is transferrin saturation the more useful figure to look at here?",
    ],
  },
  {
    slug: "transferrin-saturation",
    name: "Transferrin Saturation",
    aka: ["TSAT", "Iron saturation"],
    panel: "vitamins",
    short:
      "The share of the blood's iron-carrying capacity that is actually filled with iron.",
    measures:
      "A calculated value rather than a separate blood draw. It compares serum iron with the total iron-binding capacity to show what fraction of the carrier protein transferrin is actually loaded with iron.",
    whyOrdered:
      "A key part of the iron panel, ordered when either iron deficiency or iron overload is being assessed. It is the usual first screening value when hereditary iron overload, known as hemochromatosis, is being considered.",
    higher:
      "Broadly associated with iron overload states and with recent iron supplementation. Because it is calculated from serum iron, it inherits that test's large hour-to-hour and day-to-day swings.",
    lower:
      "Broadly associated with iron deficiency, and with inflammation or chronic illness, both of which reduce the amount of iron circulating in blood.",
    affectedBy: [
      "Time of day, because serum iron peaks in the morning",
      "Iron supplements or a recent iron-rich meal",
      "Whether the sample was taken fasting",
      "Recent illness or inflammation",
    ],
    ask: [
      "Was this a fasting morning sample, and does that matter for the result?",
      "How does it compare with the ferritin from the same panel?",
      "If it stayed raised on repeat testing, would genetic testing for hemochromatosis ever be considered?",
    ],
  },
  {
    slug: "folate",
    name: "Folate",
    aka: ["Vitamin B9", "Folic acid", "Serum folate"],
    panel: "vitamins",
    short:
      "A B vitamin needed to make red blood cells and DNA, mostly reflecting recent dietary intake.",
    measures:
      "The concentration of folate, a B vitamin also called vitamin B9, in the liquid part of the blood. A serum folate mainly reflects recent intake rather than long-term body stores.",
    whyOrdered:
      "Commonly ordered together with vitamin B12 when anemia, fatigue, or certain nerve symptoms are being investigated, because the two vitamins work together in making red blood cells. It may also be checked around pregnancy planning.",
    higher:
      "Broadly associated with supplement use and fortified foods such as cereals and breads. High values are generally not pursued.",
    lower:
      "Broadly associated with low dietary intake, alcohol use, gut conditions that reduce absorption, and certain common medicines. Levels can dip after only a few weeks of reduced intake, because the body's folate stores are small.",
    affectedBy: [
      "Recent meals - a folate-rich meal shortly before the draw can shift a serum level",
      "Multivitamins and fortified cereals or breads",
      "Alcohol intake in the days before the draw",
      "Pregnancy, which increases folate requirements",
      "Sample handling, since folate breaks down if the sample sits too long before processing",
    ],
    ask: [
      "Should vitamin B12 be checked at the same time?",
      "Was this a serum folate or a red cell folate, and what is the difference?",
      "Could any of my regular medicines affect folate levels?",
    ],
  },
  {
    slug: "magnesium",
    name: "Magnesium",
    aka: ["Mg", "Serum magnesium"],
    panel: "vitamins",
    short:
      "A mineral needed by nerves, muscles, and the heart; blood shows only a small slice of body stores.",
    measures:
      "The concentration of magnesium in the blood. Only a tiny fraction of the body's magnesium circulates in blood - most sits inside bone and cells - so the blood level is an imperfect window on total stores.",
    whyOrdered:
      "Ordered when muscle cramps, weakness, heart rhythm changes, or low calcium or potassium results are being investigated. It is also commonly checked in people taking diuretics (water tablets) or certain long-term stomach acid medicines.",
    higher:
      "Broadly associated with reduced excretion by the kidneys and with magnesium-containing antacids, laxatives, or supplements. Raised levels are uncommon when kidney function is normal.",
    lower:
      "Broadly associated with low intake, alcohol use, gut conditions causing diarrhea or poor absorption, and a range of common medicines, including some diuretics and long-term acid-reducing tablets.",
    affectedBy: [
      "Magnesium-containing supplements, antacids, or laxatives",
      "Diuretics (water tablets) and some long-term acid-reducing medicines",
      "Alcohol intake",
      "Recent diarrhea or vomiting",
      "Sample handling - a hemolyzed (damaged) sample can falsely raise the result",
    ],
    ask: [
      "Could any of my regular medicines be affecting my magnesium?",
      "Should calcium and potassium be checked alongside it?",
      "How well does a blood level reflect the body's overall magnesium stores?",
    ],
  },
  {
    slug: "phosphate",
    name: "Phosphate",
    aka: ["Phosphorus", "PO4", "Serum phosphate"],
    panel: "vitamins",
    short:
      "A mineral partnered with calcium in bone, also central to how cells store and use energy.",
    measures:
      "The concentration of phosphate in the blood. Phosphate is a mineral that pairs with calcium in bone and is central to how cells store and use energy. Most of it sits in bone, with only a small share in blood.",
    whyOrdered:
      "Usually ordered with calcium, vitamin D, and kidney tests when bone problems, kidney function, or the activity of the parathyroid glands is being assessed. It is also monitored during refeeding after a period of poor nutrition.",
    higher:
      "Broadly associated with reduced excretion by the kidneys, underactive parathyroid glands, and high vitamin D intake. A hemolyzed (damaged) blood sample is a common non-medical cause of a raised result.",
    lower:
      "Broadly associated with overactive parathyroid glands, vitamin D shortage, poor nutrition or refeeding, alcohol use, and some antacids that bind phosphate in the gut.",
    affectedBy: [
      "Sample handling - phosphate leaks out of blood cells if the sample is damaged or delayed",
      "Recent meals, especially carbohydrate or sugary intake, which shifts phosphate into cells",
      "Time of day, since levels follow a daily rhythm",
      "Antacids and some supplements",
      "Recent vigorous exercise",
    ],
    ask: [
      "Were calcium, vitamin D, and kidney function checked at the same time?",
      "Could the sample itself, or eating shortly beforehand, explain the result?",
      "Should parathyroid hormone (PTH) be measured alongside it?",
    ],
  },
  // ---------- inflammation (generated batch) ----------
  {
    slug: "ana",
    name: "ANA (Antinuclear Antibodies)",
    aka: ["ANA", "antinuclear antibody", "FANA"],
    panel: "inflammation",
    short:
      "Antibodies that react against the body's own cell nuclei, used as a screen for autoimmune conditions.",
    measures:
      "Antibodies in the blood that bind to structures inside the nucleus, the control center of the body's own cells. Labs typically report a titer, which is how far the blood can be diluted and still show a reaction, and sometimes a staining pattern.",
    whyOrdered:
      "Ordered as a screening test when an autoimmune condition, such as lupus, is being considered. Typical prompts are unexplained joint pain, rashes, mouth ulcers, or persistent fatigue that does not have an obvious cause.",
    higher:
      "Broadly associated with autoimmune conditions such as lupus, Sjogren's syndrome, and scleroderma. A positive ANA is also common in entirely healthy people, particularly at lower titers and with increasing age, so a positive result on its own does not establish any disease.",
    lower:
      "A negative result is generally the expected finding, and it makes many, though not all, autoimmune conditions less likely.",
    affectedBy: [
      "Age - positive results become more common in older adults without any disease",
      "Recent viral infections, which can cause temporary positivity",
      "Some common medications",
      "The laboratory method used, since different techniques can give different results",
      "A family history of autoimmunity, which is linked to positivity in otherwise healthy relatives",
    ],
    ask: [
      "What titer and staining pattern were reported, and what do they suggest?",
      "Do my symptoms make it worth checking more specific antibodies, such as anti-dsDNA or anti-Ro?",
      "Could a recent infection or one of my medications explain a positive result?",
    ],
  },
  {
    slug: "rheumatoid-factor",
    name: "Rheumatoid Factor",
    aka: ["RF"],
    panel: "inflammation",
    short:
      "An antibody often present in rheumatoid arthritis, though it also appears in many other settings.",
    measures:
      "The level of rheumatoid factor, an antibody that targets the body's own antibodies. Despite the name, it is not exclusive to rheumatoid arthritis and can appear in a range of other situations, including in healthy people.",
    whyOrdered:
      "Usually ordered when joint pain, morning stiffness, or joint swelling raises the question of rheumatoid arthritis or another inflammatory joint condition. It is often paired with anti-CCP antibodies, which are more specific for rheumatoid arthritis.",
    higher:
      "Broadly associated with rheumatoid arthritis, but also with Sjogren's syndrome, chronic infections such as hepatitis, and other inflammatory conditions. It is also found in a portion of healthy people, and this becomes more common with age.",
    lower:
      "A negative result is generally the expected finding. Some people with rheumatoid arthritis test negative, which is why the test is always read alongside symptoms and other markers rather than on its own.",
    affectedBy: [
      "Age - positivity becomes more common in healthy older adults",
      "Recent or lingering infections, including common viral illnesses",
      "Smoking",
      "Recent vaccinations, which can cause a temporary rise",
    ],
    ask: [
      "Should anti-CCP antibodies be checked as well, since they are more specific?",
      "Could a recent infection or vaccination explain a positive result?",
      "Do my joint symptoms fit a pattern that this result supports or argues against?",
    ],
  },
  {
    slug: "anti-ccp",
    name: "Anti-CCP Antibodies",
    aka: ["CCP", "cyclic citrullinated peptide", "ACPA"],
    panel: "inflammation",
    short:
      "A specific antibody test used mainly when rheumatoid arthritis is being considered.",
    measures:
      "Antibodies against cyclic citrullinated peptides, which are small proteins that have been chemically altered by the body. In some people the immune system reacts to these altered proteins, and the test measures the strength of that antibody response.",
    whyOrdered:
      "Ordered when rheumatoid arthritis is being considered, usually alongside rheumatoid factor. It is more specific for rheumatoid arthritis than rheumatoid factor and can turn positive early in the course of the condition.",
    higher:
      "Broadly associated with rheumatoid arthritis, for which it is among the most specific blood markers available. It can occasionally appear in other autoimmune conditions and, rarely, in some chronic infections.",
    lower:
      "A negative result is generally the expected finding. A portion of people with rheumatoid arthritis remain negative on this test, so a negative result does not by itself rule the condition out.",
    affectedBy: [
      "Smoking, which is linked to higher rates of positivity",
      "The laboratory method used, since assays differ between labs",
      "A family history of autoimmune conditions",
      "Rare cross-reactions during long-standing infections",
    ],
    ask: [
      "How does this result fit together with my rheumatoid factor result and my joint symptoms?",
      "Was the result clearly positive or borderline for this lab's method?",
      "Would a referral to a rheumatologist be worthwhile based on this?",
    ],
  },
  {
    slug: "ttg-iga",
    name: "tTG-IgA",
    aka: ["tissue transglutaminase IgA", "celiac test", "tTG antibodies"],
    panel: "inflammation",
    short:
      "The main blood screening test for celiac disease, an immune reaction triggered by eating gluten.",
    measures:
      "IgA-class antibodies against tissue transglutaminase, an enzyme found in the lining of the gut. In celiac disease the immune system attacks this enzyme when gluten is eaten, and the test measures the level of those antibodies in the blood.",
    whyOrdered:
      "The usual first blood test when celiac disease is being considered, prompted by things like long-standing digestive symptoms, unexplained anemia, or a family history of celiac disease. It is often ordered with a total IgA level, because naturally low total IgA can make this test falsely reassuring.",
    higher:
      "Broadly associated with celiac disease in people who are eating gluten at the time of testing. Mild elevations are occasionally seen in other conditions affecting the gut or liver, which is one reason confirmation is usually sought before any conclusion is drawn.",
    lower:
      "A negative result is generally the expected finding. It is less informative in people with low total IgA and in people who were eating little or no gluten before the test.",
    affectedBy: [
      "A gluten-free or low-gluten diet before the blood draw, which can produce misleadingly negative results",
      "Naturally low total IgA levels, which some people have without knowing it",
      "Age - very young children may not yet make detectable antibodies",
      "The laboratory method used, since units and assays differ between labs",
    ],
    ask: [
      "Was I eating enough gluten before the test for the result to be reliable?",
      "Was a total IgA level checked alongside this?",
      "If this is positive, what would the next confirmatory step be, such as a biopsy?",
      "Should close family members consider being screened?",
    ],
  },
  {
    slug: "total-ige",
    name: "Total IgE",
    aka: ["IgE", "immunoglobulin E"],
    panel: "inflammation",
    short:
      "The overall level of the antibody class involved in allergic reactions.",
    measures:
      "The total amount of immunoglobulin E, the antibody class the immune system uses in allergic responses and in defense against parasites. It reflects the combined level from all triggers at once, not any single allergy.",
    whyOrdered:
      "Ordered when allergic conditions such as asthma, eczema, or hay fever are being evaluated, or when a parasitic infection is being considered. It gives a general picture only; allergen-specific IgE tests are used to look at individual triggers.",
    higher:
      "Broadly associated with allergic conditions such as asthma, eczema, and hay fever, and with parasitic infections. The overlap between allergic and non-allergic people is wide - some people with significant allergies have unremarkable totals, and some people with high totals have no allergy symptoms at all.",
    lower:
      "Low values are generally not pursued.",
    affectedBy: [
      "Season and recent allergen exposure, such as high pollen periods",
      "Age - levels naturally shift across childhood and adult life",
      "Smoking and secondhand smoke exposure",
      "Recent viral illnesses",
    ],
    ask: [
      "Would allergen-specific IgE testing be more useful for identifying my particular triggers?",
      "Could the season or a recent exposure at the time of the draw have influenced this?",
      "Does this result change whether skin-prick testing is worth doing?",
    ],
  },
  // ---------- infection (generated batch) ----------
  {
    slug: "hepatitis-b-panel",
    name: "Hepatitis B Panel",
    aka: ["HBsAg", "HBsAb (anti-HBs)", "HBcAb (anti-HBc)", "Hep B serology"],
    panel: "infection",
    short:
      "Three markers that together show hepatitis B infection, immunity from vaccination, or past exposure.",
    measures:
      "Three separate markers in the blood. The surface antigen is a protein from the virus itself, so its presence signals the virus is in the body. The surface antibody is the immune system's protective response, and the core antibody is a marker of exposure to the actual virus, because vaccines do not produce it.",
    whyOrdered:
      "Ordered to screen for hepatitis B in pregnancy, before medicines that suppress the immune system, when liver tests are unexplained, and to check whether vaccination produced protection. The three markers are read together as a pattern rather than one at a time.",
    higher:
      "In general terms, a positive surface antigen generally means the virus is currently present, whether recently acquired or long-standing. A positive surface antibody on its own is the typical pattern after successful vaccination. A positive core antibody generally indicates exposure to the real virus at some point in the past, since vaccination alone never produces it.",
    lower:
      "When all three markers are negative, the general reading is no evidence of current infection, past exposure, or vaccine-induced immunity. Antibody levels from an old vaccination can also fade below detection over the years even though protection often persists.",
    affectedBy: [
      "A hepatitis B vaccine given in the days before the draw, which can make the surface antigen briefly detectable",
      "Years passing since vaccination, which can let the surface antibody fade below the lab's detection level",
      "A very recent exposure, which the markers may not yet reflect",
      "High-dose biotin supplements, which can interfere with some antibody test methods",
      "Differences between lab methods and sample handling",
    ],
    ask: [
      "Which of the three markers were actually included in my panel?",
      "Does my pattern suggest vaccination, past exposure, or something that needs follow-up testing such as HBV DNA?",
      "Do I need a hepatitis B vaccine or a booster dose based on this pattern?",
      "Should household members or close contacts consider testing or vaccination?",
    ],
  },
  {
    slug: "hepatitis-c-antibody",
    name: "Hepatitis C Antibody",
    aka: ["Anti-HCV", "HCV Ab", "Hepatitis C screen"],
    panel: "infection",
    short:
      "Screens for exposure to hepatitis C; a positive result is followed by an RNA test for current infection.",
    measures:
      "Antibodies the immune system has made against the hepatitis C virus. It detects that the body has encountered the virus at some point, not whether the virus is still present.",
    whyOrdered:
      "Ordered as a one-time screen recommended for most adults, and when liver tests are abnormal or a past exposure is possible. It is the standard first step because it is a simple blood test with good sensitivity for prior exposure.",
    higher:
      "In general terms, a positive antibody generally means exposure to hepatitis C at some point. It does not distinguish a current infection from one that cleared naturally or after treatment, because the antibody usually stays positive for life. For that reason a positive antibody is routinely followed by an RNA test, which looks for the virus itself and shows whether infection is active now.",
    lower:
      "A negative antibody is generally read as no evidence of past or current infection, with the caveat that antibodies take weeks to months to appear after a new exposure.",
    affectedBy: [
      "The window period after a recent exposure, before antibodies have developed",
      "A past infection that cleared, which can leave the antibody positive for life",
      "Occasional false positives, which is one reason confirmatory RNA testing is standard practice",
      "High-dose biotin supplements, which can interfere with some antibody assays",
      "Lab method differences between screening platforms",
    ],
    ask: [
      "Has an RNA (viral load) test been done to check whether the infection is current?",
      "If the RNA test comes back negative, what does a lasting positive antibody mean going forward?",
      "Should my liver enzymes be checked alongside this?",
      "Is the timing right, or was this drawn too soon after a possible exposure?",
    ],
  },
  {
    slug: "hiv-test",
    name: "HIV Antigen/Antibody Test",
    aka: ["HIV Ag/Ab combo", "Fourth-generation HIV test", "HIV 1/2 screen"],
    panel: "infection",
    short:
      "A combined screen for HIV antibodies and the p24 viral protein, the standard first test for HIV.",
    measures:
      "Two things at once: antibodies the immune system makes against HIV, and the p24 antigen, a protein from the virus itself. Checking the antigen as well as antibodies shortens the time after an exposure during which the test can pick up an infection.",
    whyOrdered:
      "Ordered as routine screening recommended for most adults at least once, during pregnancy, and after a possible exposure. Early detection matters because modern management works best when started promptly.",
    higher:
      "In general terms, a reactive screening result is not by itself a diagnosis; laboratories automatically follow it with confirmatory testing because false-reactive screens occur. A confirmed positive pattern is generally taken to mean HIV infection is present, which is why confirmation testing is always part of the process.",
    lower:
      "A negative result is generally read as no evidence of infection at the time of the draw, with the caveat that every HIV test has a window period, meaning an interval after a new exposure before it can turn positive. A test taken inside that window can be negative despite infection.",
    affectedBy: [
      "The window period after a recent exposure, when the test may not yet detect infection",
      "Recent vaccinations or viral illnesses, occasionally linked to false-reactive screens",
      "Pregnancy and some autoimmune conditions, occasionally linked to false-reactive screens",
      "High-dose biotin supplements, which can interfere with some assay methods",
      "Medicines taken for HIV prevention, which can delay when a new infection becomes detectable",
    ],
    ask: [
      "Which type of HIV test was used, and how long is its window period?",
      "Based on the timing of any possible exposure, has the window period fully passed?",
      "If the screen was reactive, what confirmatory testing was done?",
      "Is HIV prevention medication something worth discussing for my situation?",
    ],
  },
  {
    slug: "h-pylori-test",
    name: "H. pylori Testing",
    aka: ["Helicobacter pylori test", "Urea breath test", "H. pylori stool antigen", "H. pylori antibody"],
    panel: "infection",
    short:
      "Checks for H. pylori, a stomach bacterium linked to ulcers, using breath, stool, or blood methods.",
    measures:
      "Evidence of Helicobacter pylori, a bacterium that can live in the stomach lining. The breath test detects a gas the bacterium produces from a swallowed test substance, the stool test detects fragments of the bacterium itself, and the blood test detects antibodies the immune system has made against it.",
    whyOrdered:
      "Ordered when persistent indigestion, stomach pain, or ulcers are being evaluated, because this bacterium is a common and treatable cause. Breath or stool testing is also used after treatment to confirm the bacterium is gone.",
    higher:
      "In general terms, a positive breath or stool test generally reflects a current, active infection, because both depend on the living bacterium being present. A positive blood antibody indicates exposure at some point, but it can stay positive for years after the bacterium has been cleared, so it does not reliably separate past infection from present infection.",
    lower:
      "A negative breath or stool test generally indicates no active infection, though certain common stomach medicines and recent antibiotics can suppress the bacterium enough to produce a falsely negative result. A negative blood antibody generally indicates no evidence of exposure.",
    affectedBy: [
      "Acid-reducing medicines such as proton pump inhibitors, which can cause false negatives on breath and stool tests",
      "Recent antibiotics or bismuth-containing stomach remedies, which can also mask an active infection",
      "Not fasting as instructed before a breath test",
      "A previously treated infection, after which the blood antibody can remain positive for years",
      "Delays or handling problems with a stool sample reaching the lab",
    ],
    ask: [
      "Was mine a breath, stool, or blood test, and does that change what the result can show?",
      "Could any of my current medicines, such as acid reducers, have affected the accuracy?",
      "If treatment is given, which test would later confirm the bacterium is actually gone?",
      "Do my symptoms fit what this bacterium typically causes, or should something else be considered?",
    ],
  },
  // ---------- vitals (generated batch) ----------
  {
    slug: "blood-pressure",
    name: "Blood Pressure",
    aka: ["BP"],
    panel: "vitals",
    short:
      "The force of blood against artery walls, recorded as a systolic and a diastolic pressure.",
    measures:
      "Two pressures inside the arteries, written as one number over another. The systolic (top) number is the pressure while the heart contracts and pushes blood out. The diastolic (bottom) number is the pressure while the heart relaxes and refills between beats.",
    whyOrdered:
      "Checked at nearly every medical visit because persistently raised pressure quietly strains the heart, blood vessels, kidneys, and brain over years, usually without symptoms. Repeated readings over time matter far more than any single measurement.",
    higher:
      "Broadly associated, when persistently elevated across many readings, with hypertension and with age-related stiffening of the arteries. Isolated high readings are extremely common and are broadly associated with stress, pain, caffeine, a full bladder, and the clinic environment itself.",
    lower:
      "Broadly associated with dehydration, blood loss, certain medications, and some hormonal conditions. Naturally low readings without any symptoms are common, particularly in younger and physically fit people, and are generally not pursued.",
    affectedBy: [
      "A cuff that is too small or too large for the arm, which skews the reading",
      "Caffeine, nicotine, or exercise shortly before the measurement",
      "Talking during the reading, or an arm that is unsupported or not at heart level",
      "The white-coat effect, meaning readings that run higher in medical settings than at home",
      "A full bladder, crossed legs, or skipping a few minutes of quiet rest beforehand",
    ],
    ask: [
      "Was the cuff the right size for my arm?",
      "Would home readings or a monitor worn over a full day give a clearer picture than office readings?",
      "What is the correct way to position myself when measuring at home?",
      "How many readings, over how long, are needed before drawing any conclusion?",
    ],
  },
  {
    slug: "resting-heart-rate",
    name: "Resting Heart Rate",
    aka: ["Pulse", "RHR"],
    panel: "vitals",
    short:
      "The number of times the heart beats each minute while the body is fully at rest.",
    measures:
      "How many times the heart beats per minute while at rest, felt at the wrist or neck or read by a monitor. It reflects the balance between the parts of the nervous system that speed the heart up and those that slow it down.",
    whyOrdered:
      "Recorded as part of routine vital signs at most visits. It offers a quick window into fitness, hydration, thyroid activity, medication effects, and whether the heart's rhythm is regular.",
    higher:
      "Broadly associated with fever, dehydration, anemia, an overactive thyroid, anxiety, deconditioning, and stimulants such as caffeine. A persistently rapid or irregular resting pulse is broadly associated with heart rhythm disturbances.",
    lower:
      "Broadly associated with high aerobic fitness, since a trained heart moves more blood with each beat, and also with certain medications and an underactive thyroid. In some contexts very slow rates are broadly associated with problems in the heart's electrical conduction.",
    affectedBy: [
      "Caffeine, nicotine, or a recent meal",
      "Recent exercise, which can raise it for hours after a hard session",
      "Stress, anxiety, or a poor night's sleep",
      "Body position and how long the person has been sitting quietly before the count",
      "Fever or a recent illness",
    ],
    ask: [
      "Is my rhythm regular, not just the rate itself?",
      "Could any of my medicines or supplements be influencing it?",
      "Are readings from my watch or fitness tracker reliable enough, or should the pulse be checked manually?",
    ],
  },
  {
    slug: "pulse-oximetry",
    name: "Pulse Oximetry",
    aka: ["SpO2", "Oxygen saturation", "Pulse ox"],
    panel: "vitals",
    short:
      "The percentage of hemoglobin in the blood that is carrying oxygen, read by a light sensor on a finger.",
    measures:
      "The percentage of hemoglobin, the oxygen-carrying protein in red blood cells, that is currently loaded with oxygen. A clip on the finger or earlobe shines light through the tissue and estimates saturation from how the light is absorbed, without any needle.",
    whyOrdered:
      "Checked when breathing problems, lung disease, or heart disease are being assessed, and to monitor illnesses such as pneumonia. It is also used during procedures, during sleep studies, and for home monitoring of lung conditions.",
    higher:
      "Readings near the top of the scale broadly reflect well-oxygenated blood and are the expected finding in healthy lungs. High values are generally not caused by disease and are not pursued.",
    lower:
      "Broadly associated with lung conditions such as asthma flares, pneumonia, and chronic lung disease, with certain heart conditions, and with high altitude. Low readings are also broadly associated with measurement problems at the sensor rather than anything in the body.",
    affectedBy: [
      "Nail polish or artificial nails over the sensor",
      "Cold hands or poor circulation in the fingers, which weaken the signal",
      "Skin tone, since studies document that some devices can read falsely high in people with darker skin, potentially missing low oxygen",
      "Movement, tremor, or a loosely fitting sensor",
      "High altitude, which lowers readings for everyone",
    ],
    ask: [
      "Could nail polish, cold fingers, or my skin tone be affecting the accuracy of this device?",
      "Should the reading be checked during walking or during sleep, rather than only at rest?",
      "If there is doubt, would a blood test of oxygen levels give a more definitive answer?",
      "Is a home pulse oximeter worth using for my situation, and how should I use it correctly?",
    ],
  },
  {
    slug: "body-temperature",
    name: "Body Temperature",
    aka: ["Temp"],
    panel: "vitals",
    short:
      "The body's core heat level, which normally varies by time of day and measurement site.",
    measures:
      "How warm the body's core is, estimated from the mouth, ear, forehead, armpit, or rectum. Each site reads a little differently, and the body normally moves its temperature up and down through the day.",
    whyOrdered:
      "Checked to detect fever, which is a deliberate immune response and a common early sign of infection or inflammation, and to track the course of an illness. It is also used to spot abnormally low temperature, which matters in cold exposure and in serious illness.",
    higher:
      "Broadly associated with infection and inflammation, since fever is part of the immune response, and also with recent vigorous exercise, hot environments, heavy clothing, and certain phases of the menstrual cycle. Some medications are also broadly associated with raised temperature.",
    lower:
      "Broadly associated with cold exposure, an underactive thyroid, and some medications. Slightly lower readings are also common in older adults and vary with the site being measured.",
    affectedBy: [
      "Time of day, since temperature normally runs lower in the early morning and higher in the evening",
      "Hot or cold drinks shortly before an oral reading",
      "The site measured (mouth, ear, forehead, armpit, rectum) and the type of thermometer",
      "Exercise, a hot bath, or warm clothing beforehand",
      "Menstrual cycle phase and pregnancy",
    ],
    ask: [
      "Which thermometer type and body site gives the most dependable reading at home?",
      "For someone my age and health, when does a raised temperature warrant a call or visit?",
      "Could any of my regular medicines mask a fever or cause one?",
    ],
  },
  {
    slug: "respiratory-rate",
    name: "Respiratory Rate",
    aka: ["RR", "Breathing rate"],
    panel: "vitals",
    short:
      "The number of breaths taken per minute at rest, a sensitive but often overlooked vital sign.",
    measures:
      "How many breaths a person takes in a minute, counted by watching the chest rise and fall while the person is at rest. It is ideally counted without the person knowing, because awareness of being watched changes breathing.",
    whyOrdered:
      "Recorded as part of routine vital signs and watched closely in hospital, because breathing rate is often one of the earliest vital signs to shift when someone is becoming unwell. Changes can appear before other signs of trouble.",
    higher:
      "Broadly associated with fever, infection, lung conditions such as asthma and pneumonia, heart failure, anemia, anxiety, and pain. A sustained rise is broadly regarded as an early warning sign in someone who is unwell.",
    lower:
      "Broadly associated with sedating medications, including opioids, and with some neurological conditions. Slow, easy breathing at rest is also common during deep relaxation, sleep, and in very fit people.",
    affectedBy: [
      "Awareness of being counted, which changes breathing almost immediately",
      "Anxiety, pain, or recent exertion",
      "Talking, eating, or moving around during the count",
      "Caffeine and other stimulants",
      "Fever or a recent illness",
    ],
    ask: [
      "Was my rate counted over a full minute, or estimated from a shorter count?",
      "What changes in breathing pattern, beyond the number itself, would be worth reporting?",
      "Could any of my medicines be slowing or speeding my breathing?",
    ],
  },

  // ---------- expansion batch 2 ----------
  {
    slug: "lipase",
    name: "Lipase",
    aka: ["Serum lipase", "LPS"],
    panel: "cmp",
    short:
      "An enzyme made mainly by the pancreas to digest fat, checked when the pancreas may be inflamed.",
    measures:
      "The level of lipase, an enzyme the pancreas makes to break down dietary fat. Most of it normally stays inside the pancreas, so the blood level rises when the gland is inflamed or injured.",
    whyOrdered:
      "It is the preferred blood test when inflammation of the pancreas is being considered, usually during a workup for abdominal pain. It is more specific to the pancreas than amylase and stays elevated longer, which is why many labs have replaced amylase with it.",
    higher:
      "Broadly associated with inflammation of the pancreas, blockage of the pancreatic duct such as by a gallstone, and reduced kidney function, which slows clearance of the enzyme. Modest elevations also occur in many abdominal conditions that have nothing to do with the pancreas, so the size of the rise and the clinical picture matter together.",
    lower:
      "A low lipase usually carries no significance on its own. Long-standing damage to the pancreas can reduce how much enzyme the gland produces.",
    affectedBy: [
      "Some common medications, including opioid pain relievers",
      "Alcohol intake",
      "Timing - the level rises within hours of pancreatic irritation and falls back over days",
      "Recent endoscopic procedures involving the bile or pancreatic ducts",
    ],
    ask: [
      "Was this ordered because of my symptoms, or as part of a broader panel?",
      "How does this fit with my amylase result and any imaging?",
      "Could any of my medications be raising this?",
    ],
  },
  {
    slug: "amylase",
    name: "Amylase",
    aka: ["Serum amylase", "AMY"],
    panel: "cmp",
    short:
      "A digestion enzyme from the pancreas and salivary glands, historically used to assess the pancreas.",
    measures:
      "The level of amylase, an enzyme that breaks down starch. It comes from two main sources - the pancreas and the salivary glands - so a raised level can reflect either.",
    whyOrdered:
      "It is ordered alongside or instead of lipase when inflammation of the pancreas is being considered, and occasionally when a salivary gland problem is suspected. Many clinicians now lean on lipase instead because amylase is less specific to the pancreas.",
    higher:
      "Broadly associated with inflammation of the pancreas, salivary gland conditions including mumps and blocked salivary ducts, reduced kidney function, and a range of other abdominal conditions. A harmless trait called macroamylasemia, where amylase binds to larger proteins and clears slowly, can also keep the level persistently raised without any disease.",
    lower:
      "A low amylase rarely means anything by itself. Long-standing damage to the pancreas can reduce its output of the enzyme.",
    affectedBy: [
      "Alcohol intake",
      "Some common medications, including opioids",
      "Vomiting, which can raise the salivary fraction",
      "Recent dental work or salivary gland irritation",
      "Pregnancy, which can raise it modestly",
    ],
    ask: [
      "Does my lipase result agree with this one?",
      "Could this be coming from the salivary glands rather than the pancreas?",
      "If this stays elevated without symptoms, is macroamylasemia worth ruling out?",
    ],
  },
  {
    slug: "ldh",
    name: "LDH (Lactate Dehydrogenase)",
    aka: ["LD", "Lactic acid dehydrogenase"],
    panel: "cmp",
    short:
      "An enzyme in almost every tissue, released into blood when cells are damaged or break down.",
    measures:
      "The level of lactate dehydrogenase, an enzyme involved in energy production that is present in nearly every cell in the body. Because cells release it when they are damaged or destroyed, the blood level works as a general gauge of cell turnover.",
    whyOrdered:
      "It is used as a broad marker of tissue damage, most often in workups for red cell breakdown (hemolysis), and to follow certain cancers and their treatment. It also gets measured on fluid samples, such as fluid drawn from around the lungs, to help characterize where the fluid came from.",
    higher:
      "Broadly associated with anything that damages cells: breakdown of red blood cells, liver disease, muscle injury, heart muscle injury, some infections, and some cancers with rapid cell turnover. The test is deliberately non-specific - other results and the clinical picture point at which tissue is the source.",
    lower:
      "A low LDH is uncommon and usually has no clinical significance. Large doses of vitamin C have been reported to lower it.",
    affectedBy: [
      "Sample handling - red cells breaking open in the tube falsely raise it, one of the most common causes of an unexpected result",
      "Strenuous exercise shortly before the draw",
      "Delays in processing the sample",
      "Intramuscular injections in the days before the draw",
    ],
    ask: [
      "Could this be a sample-handling artifact rather than a real rise?",
      "Which tissue do the other results point to as the source?",
      "Is this value being followed over time for a specific reason?",
    ],
  },
  {
    slug: "ammonia",
    name: "Ammonia",
    aka: ["NH3", "Plasma ammonia"],
    panel: "cmp",
    short:
      "A waste product of protein breakdown that a healthy liver clears almost completely.",
    measures:
      "The level of ammonia in blood. Ammonia is produced when the body and gut bacteria break down protein, and the liver normally converts it into urea for the kidneys to excrete, keeping the blood level low.",
    whyOrdered:
      "It is most often ordered when confusion or reduced alertness is being evaluated in someone with known liver disease. It is also used to monitor certain medications, valproate in particular, and in the workup of rare inherited disorders of protein metabolism, mostly in infants and children.",
    higher:
      "Broadly associated with advanced liver disease, conditions that shunt blood past the liver, gastrointestinal bleeding, certain medications including valproate, and rare inherited urea cycle disorders. It is also one of the values most often raised falsely by how the sample was collected and handled, so an unexpected result is frequently a laboratory artifact.",
    lower:
      "A low ammonia is not generally considered meaningful.",
    affectedBy: [
      "Sample handling - the tube needs to go on ice and be processed quickly, or the value climbs on the bench",
      "A tight tourniquet or fist clenching during the draw",
      "Strenuous exercise before the draw",
      "Smoking shortly before the draw",
      "A high-protein meal beforehand",
    ],
    ask: [
      "Was the sample kept on ice and processed promptly?",
      "Does this number match how I have actually been thinking and functioning?",
      "Could a medication such as valproate be playing a role?",
    ],
  },
  {
    slug: "haptoglobin",
    name: "Haptoglobin",
    aka: ["Hp"],
    panel: "cbc",
    short:
      "A protein that binds free hemoglobin - it falls when red blood cells break down early.",
    measures:
      "The level of haptoglobin, a protein made by the liver whose job is to bind hemoglobin released from destroyed red blood cells. Each bound complex is removed from circulation, so the level drops when red cells are being destroyed faster than usual.",
    whyOrdered:
      "It is a core part of the workup for hemolysis - red cells breaking down early - usually ordered alongside LDH, bilirubin, and a reticulocyte count when the cause of an anemia is being investigated. It is also checked when a reaction to a blood transfusion is suspected.",
    higher:
      "Broadly associated with inflammation and infection, because haptoglobin is an acute phase protein that rises whenever the body is inflamed, and with corticosteroid use. A raised value is rarely the finding of interest - the test is usually ordered to look for the opposite.",
    lower:
      "Broadly associated with hemolysis, where free hemoglobin consumes the available haptoglobin, and with liver disease, which reduces production. A small share of people inherit a low haptoglobin level without any disease behind it.",
    affectedBy: [
      "Recent inflammation or infection, which raises the level and can mask a fall",
      "Corticosteroids",
      "Estrogens, including oral contraceptive pills, which can lower it",
      "A recent blood transfusion",
    ],
    ask: [
      "What did the LDH, bilirubin, and reticulocyte count show alongside this?",
      "Could recent inflammation be propping this value up and hiding a low result?",
      "Is an inherited low level a possibility worth considering?",
    ],
  },
  {
    slug: "blood-type",
    name: "Blood Type and Rh Factor",
    aka: ["ABO and Rh typing", "Blood group"],
    panel: "cbc",
    short:
      "Which ABO group (A, B, AB, or O) and Rh factor (positive or negative) your red cells carry.",
    measures:
      "Which inherited markers, called antigens, sit on the surface of the red blood cells - the A and B antigens that define the ABO group, and the RhD antigen that defines positive or negative status. These markers determine which donated blood the immune system will tolerate.",
    whyOrdered:
      "It is ordered before planned surgery and transfusions, at the start of prenatal care, and as part of blood donation. In pregnancy, Rh status matters because a difference between an Rh-negative parent and an Rh-positive fetus is something prenatal care routinely screens for and addresses.",
    higher:
      "This test reports a category, not a level. The possible results pair an ABO group (A, B, AB, or O) with an Rh status (positive or negative), giving eight common types. O negative red cells can generally be given to recipients of any type in an emergency, and people who are AB positive can generally receive red cells of any type - the origin of the terms universal donor and universal recipient.",
    lower:
      "No blood type is healthier than another. Rh-negative status carries practical relevance mainly in pregnancy and transfusion planning, both of which have standard, well-established protocols built around it.",
    affectedBy: [
      "A recent transfusion, which can temporarily complicate typing",
      "A prior bone marrow or stem cell transplant, which can genuinely change a person's blood type",
      "Pregnancy, which can affect the antibody screen usually run alongside the typing",
      "Certain medications and conditions that interfere with the antibody screen rather than the type itself",
    ],
    ask: [
      "Is my Rh status relevant to a current or planned pregnancy?",
      "Was an antibody screen run with the typing, and did it find anything?",
      "Does the hospital keep my type on file, and should I carry a record of it?",
      "Is it true the hospital will re-check my type before any transfusion regardless of what I carry?",
    ],
  },
  {
    slug: "celiac-genetic-test",
    name: "Celiac Genetic Test (HLA-DQ2 and DQ8)",
    aka: ["HLA-DQ2/DQ8 typing", "Celiac HLA test"],
    panel: "inflammation",
    short:
      "A gene test showing whether celiac disease is genetically possible - not whether it is present.",
    measures:
      "Whether the genes HLA-DQ2 and HLA-DQ8 are present. These genes encode immune system proteins that celiac disease requires in order to develop - essentially all people with celiac carry one of them.",
    whyOrdered:
      "It is used to help rule celiac out: when antibody test results are ambiguous, when a gluten-free diet was started before testing and antibody tests can no longer be trusted, or in close relatives of someone with celiac. Unlike the antibody tests, it works regardless of what the person is eating.",
    higher:
      "A positive result generally means only that celiac disease is genetically possible. Roughly a third of the general population carries DQ2 or DQ8, and the large majority of carriers never develop celiac disease. On its own, a positive result diagnoses nothing.",
    lower:
      "A negative result generally makes celiac disease very unlikely, now and in the future, because the condition almost never develops without these genes. That ruling-out power is the main reason the test exists.",
    affectedBy: [
      "Nothing day to day - the result reflects inherited genes and does not change with diet, symptoms, or time",
      "Not affected by whether gluten is currently being eaten, unlike the celiac antibody tests",
      "Lab-to-lab differences in exactly which gene variants are tested and how they are reported",
    ],
    ask: [
      "Given this result, is any further celiac testing worthwhile?",
      "If antibody testing comes next, do I need to be eating gluten beforehand?",
      "Is this result relevant for my close relatives?",
    ],
  },
  {
    slug: "drug-level-monitoring",
    name: "Therapeutic Drug Monitoring",
    aka: ["TDM", "Drug level testing"],
    panel: "drugs",
    short:
      "Blood tests that check whether a medication's level sits where your prescriber intends.",
    measures:
      "The concentration of a specific medication in the blood, drawn at a defined time relative to the dose. It exists for drugs where too little fails and too much causes harm, and where the same dose produces very different blood levels in different people.",
    whyOrdered:
      "It is standard for medications with a narrow window between effective and harmful - lithium, digoxin, some seizure medications, certain antibiotics, and transplant immunosuppressants among them. Levels are typically checked when the drug is started, after dose changes, after an interacting medication is added or stopped, and periodically once things are stable.",
    higher:
      "A level above what the prescriber is aiming for is broadly associated with recent dose changes, interacting medications, changes in kidney or liver function that slow the drug's clearance, and samples drawn too soon after a dose. What any given number means depends entirely on the drug, the timing of the draw, and the target the prescriber has set - there is no universal high or low, and the target range is individual.",
    lower:
      "A level below the intended range is broadly associated with missed or mistimed doses, interacting medications that speed the drug's clearance, and differences in absorption. Draw timing matters just as much here as it does for high results.",
    affectedBy: [
      "Timing of the draw relative to the last dose - most levels are meant to be drawn at a trough, just before the next dose",
      "Missed doses in the days before the test",
      "Newly started or stopped medications and supplements that interact",
      "Hydration and kidney function, for drugs the kidneys clear",
      "Whether the dose has been stable long enough to reach a steady level",
    ],
    ask: [
      "Was this drawn at the right time relative to my last dose?",
      "What level are you aiming for in my case, and why that target?",
      "Should I take my usual dose before the blood draw on test day, or wait until after?",
      "Do any of my other medications or supplements interact with this one?",
    ],
  },
  {
    slug: "lithium-level",
    name: "Lithium Level",
    aka: ["Serum lithium", "Li level"],
    panel: "drugs",
    short:
      "The amount of lithium in blood, checked regularly because its safe window is narrow.",
    measures:
      "The concentration of lithium, a mood-stabilizing medication, in the blood. The standard sample is a trough, drawn about 12 hours after the last dose, because that is the timing the published interpretation of levels is built on.",
    whyOrdered:
      "Routine monitoring is part of taking lithium: at the start, after any dose change, after other medications change, and periodically thereafter. The gap between an effective level and a harmful one is small, and the kidneys' handling of lithium shifts with hydration, salt intake, and other drugs, so the level moves even when the dose does not.",
    higher:
      "Higher levels are broadly associated with dehydration, reduced kidney function, reduced salt intake, and interacting medications - NSAIDs such as ibuprofen, thiazide diuretics, and ACE inhibitor blood pressure drugs are the classic examples. A sample drawn earlier than the standard 12 hours after a dose also reads higher without the true steady level having changed. The target range is individual and set by the prescriber.",
    lower:
      "Lower levels are broadly associated with missed doses, increased fluid and salt intake, pregnancy, which increases clearance, and drugs that speed elimination. Caffeine can nudge levels down as well.",
    affectedBy: [
      "Timing - the standard draw is about 12 hours after the last dose, and earlier draws read high",
      "Hydration, heavy sweating, and hot weather",
      "Salt intake - large changes in either direction shift the level",
      "Over-the-counter NSAIDs such as ibuprofen and naproxen",
      "Caffeine intake",
    ],
    ask: [
      "Was this drawn about 12 hours after my last dose?",
      "Which of my other medications, including over-the-counter ones, can move this level?",
      "What should I do about monitoring when I am ill, sweating heavily, or drinking less than usual?",
      "Are my kidney and thyroid tests being checked alongside this?",
    ],
  },
  {
    slug: "digoxin-level",
    name: "Digoxin Level",
    aka: ["Serum digoxin", "Digoxin concentration"],
    panel: "drugs",
    short:
      "The amount of the heart medication digoxin in blood, where the timing of the draw matters a lot.",
    measures:
      "The concentration of digoxin, a heart rhythm and heart failure medication, in the blood. Digoxin moves slowly from blood into tissue after each dose, so samples drawn within about six hours of a dose read misleadingly high; the standard draw is at least six to eight hours after the last dose, often just before the next one.",
    whyOrdered:
      "Levels are checked when the drug is started, after dose changes, when kidney function changes, when an interacting medication is added, or when the clinical picture raises the question of a level that has drifted. Digoxin is cleared by the kidneys and has one of the narrowest safety windows of any common medication.",
    higher:
      "Higher levels are broadly associated with declining kidney function, dehydration, interacting medications - amiodarone, verapamil, and certain antibiotics are classic examples - and samples drawn too soon after a dose, before the drug has finished distributing into tissue. The target range is individual and set by the prescriber.",
    lower:
      "Lower levels are broadly associated with missed doses, interacting drugs and supplements that reduce absorption or speed clearance, including St. John's wort, and differences in how the drug is absorbed.",
    affectedBy: [
      "Timing - draws within about six hours of a dose read falsely high",
      "Kidney function and hydration",
      "Several common interacting prescriptions, plus St. John's wort",
      "Electrolyte levels, which are usually checked alongside the drug level",
    ],
    ask: [
      "How long after my last dose was this drawn?",
      "Have any of my other prescriptions changed since the last level was checked?",
      "Are my potassium, magnesium, and kidney function being monitored with this?",
    ],
  },
  {
    slug: "rapid-strep",
    name: "Rapid Strep Test",
    aka: ["Rapid antigen detection test", "RADT", "Strep A swab"],
    panel: "office",
    short:
      "A throat swab that looks for group A strep bacteria, with a result in minutes.",
    measures:
      "It detects antigens - surface proteins - of group A streptococcus bacteria on a throat swab. It looks for the presence of the bacteria itself, not the body's response to it, and delivers a result in roughly five to ten minutes.",
    whyOrdered:
      "It is used when a sore throat is being evaluated and knowing whether group A strep is present would change what happens next. Most sore throats are viral, and the test is the quick way to sort the bacterial minority from the rest during the visit.",
    higher:
      "A positive result generally indicates that group A strep bacteria are present in the throat, and false positives are uncommon. The test cannot distinguish an active infection from carriage - some people, children especially, carry the bacteria without it being the cause of their current symptoms.",
    lower:
      "A negative result generally makes strep less likely but does not fully rule it out, because rapid tests miss a portion of true cases. In children and adolescents, a negative rapid test is often backed up with a throat culture, which takes a day or two but catches what the rapid test missed.",
    affectedBy: [
      "Swab technique - a good sample rubs both tonsils and the back of the throat",
      "Recent antibiotics, which can turn the test negative",
      "How early or late in the illness the swab is taken",
      "Eating, drinking, or using mouthwash immediately before the swab",
    ],
    ask: [
      "If this is negative, will a culture be sent as a backup?",
      "Could a virus be causing the symptoms even with a positive result?",
      "Does anyone else in the household need to be checked?",
    ],
  },
  {
    slug: "influenza-test",
    name: "Rapid Influenza Test",
    aka: ["Rapid flu test", "RIDT", "Influenza antigen test"],
    panel: "office",
    short:
      "A nose or throat swab that checks for influenza A and B, usually in under 15 minutes.",
    measures:
      "It detects influenza virus in a nasal or throat swab - either viral surface proteins, in the common rapid antigen versions, or viral genetic material, in the newer rapid molecular versions. Most report influenza A and influenza B separately.",
    whyOrdered:
      "It is used during flu season when symptoms suggest influenza and the result would change what happens next during the visit. Clinics, hospitals, and care facilities also use it to decide how to group and manage patients when flu is circulating.",
    higher:
      "A positive result generally indicates influenza virus is present, and false positives are uncommon while flu is circulating widely. The A or B designation identifies the type, which matters more for public health tracking than for the individual visit.",
    lower:
      "A negative result is weaker evidence than a positive one. Rapid antigen flu tests miss a substantial share of true infections - sensitivity is commonly quoted in the range of 50 to 70 percent - especially when the swab is taken more than three or four days after symptoms begin. During a heavy flu season, clinicians often weigh the overall picture more than a negative swab.",
    affectedBy: [
      "Timing - the amount of virus is highest in roughly the first three days of symptoms",
      "Swab technique and how deep the sample is taken",
      "Which version the office uses - molecular versions miss far fewer cases than antigen versions",
      "Recent nasal sprays or rinses",
    ],
    ask: [
      "Is this the antigen version or the more sensitive molecular version?",
      "Given the season and my symptoms, does a negative result actually change anything?",
      "Was I swabbed early enough in the illness for the result to be reliable?",
    ],
  },
  {
    slug: "covid-19-test",
    name: "COVID-19 Tests",
    aka: ["SARS-CoV-2 test", "Antigen test", "PCR test", "NAAT"],
    panel: "office",
    short:
      "Antigen and PCR tests for the COVID-19 virus, trading speed against sensitivity.",
    measures:
      "Both types look for the SARS-CoV-2 virus, in different ways. Antigen tests detect viral surface proteins and give a result in about 15 minutes; PCR tests, a type of molecular test, amplify and detect the virus's genetic material, usually in a lab, and can find far smaller amounts of virus.",
    whyOrdered:
      "Testing is used for symptoms, after a known exposure, before certain procedures, and to meet some facility or travel requirements. The choice between antigen and PCR usually comes down to how fast an answer is needed versus how much sensitivity the situation calls for.",
    higher:
      "A positive result on either test generally indicates the virus is present. PCR can stay positive for weeks after an infection has resolved because it detects genetic fragments rather than intact virus, so a lingering positive PCR does not necessarily mean ongoing contagiousness.",
    lower:
      "A negative antigen test taken early - soon after symptoms start or after an exposure - is generally treated as provisional, and the FDA advises repeating antigen tests about 48 hours apart for this reason, since they often turn positive later than PCR. A negative PCR is stronger evidence, though even PCR can miss an infection if sampled very early.",
    affectedBy: [
      "Timing relative to exposure and symptom onset",
      "Swab technique",
      "Which test type was used - antigen versus PCR",
      "Expired or heat-damaged home test kits",
      "A recent prior infection, which can keep PCR positive for weeks",
    ],
    ask: [
      "Was this an antigen test or a PCR?",
      "If the antigen test is negative, should it be repeated after about 48 hours?",
      "How does a recent prior infection affect how this result reads?",
    ],
  },
  {
    slug: "mono-test",
    name: "Mono Spot Test",
    aka: ["Monospot", "Heterophile antibody test"],
    panel: "office",
    short:
      "A rapid blood test for mononucleosis that detects a distinctive antibody, not the virus itself.",
    measures:
      "It detects heterophile antibodies - unusual antibodies most people produce during infectious mononucleosis, which is usually caused by the Epstein-Barr virus. It measures the body's reaction to the infection rather than the virus itself, which shapes both its strengths and its blind spots.",
    whyOrdered:
      "It is used when mononucleosis is being considered, classically in teenagers and young adults with sore throat, marked fatigue, and swollen glands. The result comes back in minutes, during the visit.",
    higher:
      "A positive result generally supports a diagnosis of mononucleosis, and false positives are uncommon. The antibodies can persist for months after the illness, so a positive can also reflect a recent rather than a current infection.",
    lower:
      "A negative result early in the illness is common even in true mono - the antibodies often take a week or more after symptoms begin to become detectable, and a meaningful share of tests in the first week read negative in people who genuinely have it. Young children often never produce heterophile antibodies at all, so the test is much less useful in that age group. Specific Epstein-Barr virus antibody tests exist for ambiguous cases.",
    affectedBy: [
      "Timing - the first week of illness produces many false negatives",
      "Age - young children frequently test negative even when infected",
      "How long ago a past infection occurred, since the antibodies linger for months",
    ],
    ask: [
      "Could this have been drawn too early in the illness to show anything yet?",
      "If it is negative but mono still seems likely, would specific EBV antibody tests help?",
      "How long after an infection would this test still read positive?",
    ],
  },
];

export const testsByPanel = (panel: PanelKey) => LAB_TESTS.filter((t) => t.panel === panel);
