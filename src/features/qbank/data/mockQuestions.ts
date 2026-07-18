export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
}

export interface Question {
  id: number;
  scenario: string;
  question: string;
  options: QuestionOption[];
  correctOption: string;
  explanation: string;
  topic: string;
  examFrequency: string;
}

export interface CardQuestionSet {
  cardId: string;
  title: string;
  questions: Question[];
}

export const CARD_QUESTION_MAP: Record<string, CardQuestionSet> = {
  // QBank Cards 1-7
  '1': {
    cardId: '1',
    title: 'SJT & Professionalism Focus',
    questions: [
      {
        id: 1,
        scenario:
          'You are a FY2 in A&E. A senior consultant asks you to perform a procedure you are not fully comfortable with. How should you respond?',
        question: 'What is the most appropriate professional action to take in this situation?',
        options: [
          {
            id: 'A',
            text: 'Perform the procedure without saying anything to avoid conflict',
          },
          {
            id: 'B',
            text: 'Politely decline and immediately report the consultant to the medical director',
          },
          {
            id: 'C',
            text: 'State your lack of experience clearly and request supervision while performing the procedure',
          },
          {
            id: 'D',
            text: 'Refuse to perform the procedure and leave the department immediately',
          },
          {
            id: 'E',
            text: 'Delegate the procedure to a junior FY1 colleague without supervision',
          },
        ],
        correctOption: 'C',
        explanation:
          'Patient safety is paramount. According to GMC guidelines (Good Medical Practice), doctors must recognize the limits of their competence. Communicating your experience level clearly and asking for supervision allows you to learn safely without placing the patient at risk.',
        topic: 'Professionalism & Safety',
        examFrequency: 'High-yield SJT topic',
      },
      {
        id: 2,
        scenario:
          'A colleague arrives for their night shift smelling strongly of alcohol and slurring their speech while preparing to prescribe medications for critically ill patients.',
        question: 'What is the immediate priority action you must take?',
        options: [
          {
            id: 'A',
            text: 'Ignore the situation to protect your working relationship with your colleague',
          },
          {
            id: 'B',
            text: 'Immediately step in, prevent the colleague from seeing patients, and escalate to the senior registrar/consultant on call',
          },
          {
            id: 'C',
            text: 'Offer them coffee and let them rest in the doctor’s mess for an hour',
          },
          {
            id: 'D',
            text: 'Send an email to the GMC fitness to practise panel the next morning',
          },
          {
            id: 'E',
            text: 'Ask the nursing staff to monitor the colleague throughout the night',
          },
        ],
        correctOption: 'B',
        explanation:
          'Immediate patient safety overrides personal loyalty. If a colleague is impaired by alcohol or drugs on duty, you must immediately intervene to prevent patient harm and escalate to a senior supervisor on call.',
        topic: 'Duty of Candour & Safety',
        examFrequency: 'High-yield SJT topic',
      },
      {
        id: 3,
        scenario:
          'You notice that a medication prescribing error occurred on the ward during your shift, resulting in a patient receiving a double dose of an antibiotic. The patient suffers no harm.',
        question: 'What is the most appropriate action regarding duty of candour?',
        options: [
          {
            id: 'A',
            text: 'Inform the patient of the error, apologize, and document the event in the Datix reporting system',
          },
          {
            id: 'B',
            text: 'Keep quiet about the incident since the patient suffered no adverse effects',
          },
          {
            id: 'C',
            text: 'Blame the pharmacist who dispensed the medication',
          },
          {
            id: 'D',
            text: 'Alter the drug kardex retroactively to conceal the double dose',
          },
          {
            id: 'E',
            text: 'Advise the patient not to ask questions about their treatment plan',
          },
        ],
        correctOption: 'A',
        explanation:
          'Statutory Duty of Candour requires open, honest disclosure whenever an incident or near-miss occurs, regardless of whether harm occurred. Apologizing and logging a incident report (Datix) is essential for learning and transparency.',
        topic: 'Duty of Candour & Openness',
        examFrequency: 'High-yield SJT topic',
      },
      {
        id: 4,
        scenario:
          'A patient’s family member calls the ward demanding detailed clinical information about a 22-year-old competent adult patient who is currently admitted.',
        question: 'How should you manage this request in accordance with confidentiality rules?',
        options: [
          {
            id: 'A',
            text: 'Share all medical information since they are an immediate family member',
          },
          {
            id: 'B',
            text: 'Politely explain that you cannot share confidential information without explicit consent from the patient',
          },
          {
            id: 'C',
            text: 'Refuse to talk to the family member and hang up abruptly',
          },
          {
            id: 'D',
            text: 'Provide vague details about the diagnosis without looking at the notes',
          },
          {
            id: 'E',
            text: 'Disclose the information only if the relative threatens to complain',
          },
        ],
        correctOption: 'B',
        explanation:
          'Adult patients with capacity have an absolute right to confidentiality. Information must not be shared with relatives unless the patient has explicitly consented.',
        topic: 'Confidentiality & Patient Rights',
        examFrequency: 'High-yield SJT topic',
      },
      {
        id: 5,
        scenario:
          'You are extremely tired after working a 13-hour shift and are asked to stay for an extra 4 hours to cover a short-staffed unit, but you feel unsafe to practice safely.',
        question: 'What is the most professional response?',
        options: [
          {
            id: 'A',
            text: 'Explain to the staffing coordinator that fatigue compromises your safety and patient care, and escalate to the consultant on call',
          },
          {
            id: 'B',
            text: 'Agree to stay and manage as best as you can despite severe exhaustion',
          },
          {
            id: 'C',
            text: 'Walk off the shift unannounced without informing anyone',
          },
          {
            id: 'D',
            text: 'Prescribe stimulants to keep yourself awake for the extra shift',
          },
          {
            id: 'E',
            text: 'Ask a medical student to take over your clinical responsibilities',
          },
        ],
        correctOption: 'A',
        explanation:
          'Doctors must recognize when fatigue compromises their ability to provide safe care. It is a professional responsibility to escalate unsafe staffing and severe fatigue to senior leads rather than risking patient safety.',
        topic: 'Workplace Safety & Fitness to Practise',
        examFrequency: 'High-yield SJT topic',
      },
    ],
  },

  // Cardiovascular Category Card
  cardio: {
    cardId: 'cardio',
    title: 'Cardiovascular Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 45-year-old male presents with sudden onset central chest pain radiating to the left jaw. ECG shows ST-segment elevation in leads V2-V4. Troponin I is significantly elevated.',
        question: 'What is the definitive first-line emergency intervention?',
        options: [
          {
            id: 'A',
            text: 'Primary Percutaneous Coronary Intervention (PCI) within 90 minutes',
          },
          {
            id: 'B',
            text: 'Oral Aspirin 300mg alone and discharge home',
          },
          {
            id: 'C',
            text: 'Intravenous Furosemide 40mg bolus',
          },
          {
            id: 'D',
            text: 'Sublingual Glyceryl Trinitrate spray every 5 minutes only',
          },
          {
            id: 'E',
            text: 'Immediate elective coronary artery bypass grafting (CABG)',
          },
        ],
        correctOption: 'A',
        explanation:
          'Acute anterior STEMI (ST-elevation in V2-V4) requires emergency reperfusion therapy. Primary PCI within 90 minutes of first medical contact is the gold standard intervention to restore coronary patency.',
        topic: 'Cardiology - STEMI',
        examFrequency: 'High-yield topic',
      },
      {
        id: 2,
        scenario:
          'A 65-year-old woman with type-2 diabetes was seen in the clinic for management of her cardiovascular risk. ECG shows ST depression in V4-V6 and elevated troponins consistent with NSTEMI.',
        question: 'What is the most appropriate management pathway to reduce her risk?',
        options: [
          {
            id: 'A',
            text: 'Immediate thrombolysis with Tenecteplase',
          },
          {
            id: 'B',
            text: 'Primary Percutaneous Coronary Intervention (PCI) within 90 minutes',
          },
          {
            id: 'C',
            text: 'Dual antiplatelet therapy and risk assessment using the GRACE score',
          },
          {
            id: 'D',
            text: 'Aspirin 300mg and discharge with urgent outpatient follow-up',
          },
          {
            id: 'E',
            text: 'Continuous infusion of Heparin for 48 hours',
          },
        ],
        correctOption: 'C',
        explanation:
          'This patient presents with NSTEMI. The correct management involves dual antiplatelet therapy combined with risk stratification using the GRACE score to determine whether early invasive angiography is required.',
        topic: 'Cardiology - ACS Management',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Respiratory Category Card
  respiratory: {
    cardId: 'respiratory',
    title: 'Respiratory Medicine Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 62-year-old female presents with acute onset shortness of breath and chest tightness. Chest X-ray reveals left-sided pleural effusion. Diagnostic pleural tap shows fluid protein content of 38 g/L (serum protein 68 g/L).',
        question: 'Based on Light’s criteria, what type of effusion is present?',
        options: [
          {
            id: 'A',
            text: 'Transudative effusion due to congestive heart failure',
          },
          {
            id: 'B',
            text: 'Exudative effusion secondary to infection, malignancy, or inflammation',
          },
          {
            id: 'C',
            text: 'Chylothorax due to thoracic duct injury',
          },
          {
            id: 'D',
            text: 'Hemothorax from blunt chest trauma',
          },
          {
            id: 'E',
            text: 'Pseudochylothorax secondary to chronic rheumatoid pleurisy',
          },
        ],
        correctOption: 'B',
        explanation:
          'According to Light’s criteria, pleural fluid protein > 30-35 g/L indicates an exudate. Exudative effusions arise from increased capillary permeability caused by pneumonia, lung cancer, or pulmonary embolism.',
        topic: 'Respiratory - Pleural Disease',
        examFrequency: 'High-yield topic',
      },
      {
        id: 2,
        scenario:
          'A 45-year-old male with severe acute asthma exacerbation presents with oxygen saturation of 88% on room air, RR 28/min, and widespread bilateral expiratory wheezes.',
        question: 'What is the initial most appropriate immediate pharmacological management?',
        options: [
          {
            id: 'A',
            text: 'High-flow oxygen and nebulized Salbutamol with Ipratropium',
          },
          {
            id: 'B',
            text: 'Oral Montelukast 10mg',
          },
          {
            id: 'C',
            text: 'Intravenous Aminophylline infusion',
          },
          {
            id: 'D',
            text: 'Immediate endotracheal intubation',
          },
          {
            id: 'E',
            text: 'Inhaled Fluticasone high dose',
          },
        ],
        correctOption: 'A',
        explanation:
          'Acute severe asthma requires immediate high-flow oxygen to maintain SpO2 > 94% along with frequent nebulized SABA (Salbutamol) and SAMA (Ipratropium bromide).',
        topic: 'Respiratory - Acute Asthma',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Gastroenterology Category Card
  gastro: {
    cardId: 'gastro',
    title: 'Gastroenterology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 30-year-old male reports recurrent episodes of burning epigastric pain and postprandial bloating. Gastric endoscopy reveals mucosal erythema in the antrum, and a 13C-urea breath test is positive for Helicobacter pylori.',
        question: 'What is the standard first-line eradication regimen?',
        options: [
          {
            id: 'A',
            text: 'High-dose Ranitidine monotherapy for 14 days',
          },
          {
            id: 'B',
            text: 'Proton Pump Inhibitor (PPI) + Amoxicillin + Clarithromycin for 7 days',
          },
          {
            id: 'C',
            text: 'Antacids after meals as needed',
          },
          {
            id: 'D',
            text: 'Single dose Azithromycin 1g oral',
          },
          {
            id: 'E',
            text: 'Long-term Metronidazole monotherapy',
          },
        ],
        correctOption: 'B',
        explanation:
          'First-line H. pylori eradication in NICE guidelines consists of 7-day triple therapy: a PPI (e.g. Omeprazole 20mg BD) with Amoxicillin 1g BD and Clarithromycin 500mg BD.',
        topic: 'Gastroenterology - H. Pylori',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Neurology Category Card
  neuro: {
    cardId: 'neuro',
    title: 'Neurology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 50-year-old female with long-standing poorly controlled hypertension presents with acute severe headache, vomiting, and left-sided hemiparesis. Non-contrast CT brain reveals a hematoma in the right basal ganglia.',
        question:
          'Which acute blood pressure management strategy is recommended within 6 hours of onset?',
        options: [
          {
            id: 'A',
            text: 'Rapidly lower systolic blood pressure to < 140 mmHg within 6 hours',
          },
          {
            id: 'B',
            text: 'Administer IV tissue plasminogen activator (Alteplase)',
          },
          {
            id: 'C',
            text: 'Raise blood pressure using IV vasopressors',
          },
          {
            id: 'D',
            text: 'Immediate anticoagulation with unfractionated Heparin',
          },
          {
            id: 'E',
            text: 'Withhold all antihypertensive therapy unless SBP > 220 mmHg',
          },
        ],
        correctOption: 'A',
        explanation:
          'In acute intracerebral hemorrhage presenting within 6 hours, NICE guidelines advise targeted lowering of SBP to < 140 mmHg to limit hematoma expansion and reduce mortality.',
        topic: 'Neurology - Intracerebral Hemorrhage',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Renal & Urology Category Card
  renal: {
    cardId: 'renal',
    title: 'Renal & Urology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 70-year-old male admitted with sepsis develops acute oliguria (urine output < 0.3 mL/kg/h for 12 hours) and serum creatinine rises from 90 µmol/L to 270 µmol/L over 24 hours. ECG shows tall peaked T waves.',
        question: 'What is the immediate priority treatment for severe hyperkalemia?',
        options: [
          {
            id: 'A',
            text: 'Intravenous Calcium Gluconate 10% (10 mL over 5-10 minutes)',
          },
          {
            id: 'B',
            text: 'Oral Spironolactone 25mg daily',
          },
          {
            id: 'C',
            text: 'High-flow nasal oxygen',
          },
          {
            id: 'D',
            text: 'Intravenous Furosemide bolus only',
          },
          {
            id: 'E',
            text: 'Oral Potassium Chloride supplements',
          },
        ],
        correctOption: 'A',
        explanation:
          'IV Calcium Gluconate stabilizes the cardiac myocardial membrane against arrhythmia induced by severe hyperkalemia. It does not lower serum potassium but prevents immediate fatal cardiac arrest.',
        topic: 'Renal - Acute Kidney Injury & Hyperkalemia',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Endocrinology & Metabolic Category Card
  endo: {
    cardId: 'endo',
    title: 'Endocrinology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 28-year-old male presents with fatigue, polydipsia, and polyuria. Fasting plasma glucose is 8.5 mmol/L and HbA1c is 7.2% (55 mmol/mol). His BMI is 31 kg/m².',
        question: 'What is the recommended first-line drug therapy alongside lifestyle advice?',
        options: [
          {
            id: 'A',
            text: 'Metformin titrating up to 1g twice daily',
          },
          {
            id: 'B',
            text: 'Immediate basal-bolus subcutaneous Insulin regimen',
          },
          {
            id: 'C',
            text: 'Gliclazide 80mg daily monotherapy',
          },
          {
            id: 'D',
            text: 'Dapagliflozin monotherapy',
          },
          {
            id: 'E',
            text: 'Pioglitazone 30mg daily',
          },
        ],
        correctOption: 'A',
        explanation:
          'Metformin is the first-line medication for Type 2 Diabetes Mellitus. It lowers blood glucose by decreasing hepatic gluconeogenesis and improving insulin sensitivity without risk of hypoglycemia.',
        topic: 'Endocrinology - T2DM',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Dermatology / ENT / Eyes Category Card
  derm: {
    cardId: 'derm',
    title: 'Dermatology & Ophthalmology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 65-year-old male presents with sudden painless loss of vision in his right eye. Fundoscopy reveals a pale retina with a distinct "cherry-red spot" at the macula.',
        question: 'What is the most likely diagnosis?',
        options: [
          {
            id: 'A',
            text: 'Central Retinal Artery Occlusion (CRAO)',
          },
          {
            id: 'B',
            text: 'Central Retinal Vein Occlusion (CRVO)',
          },
          {
            id: 'C',
            text: 'Acute Angle-Closure Glaucoma',
          },
          {
            id: 'D',
            text: 'Rhegmatogenous Retinal Detachment',
          },
          {
            id: 'E',
            text: 'Age-Related Macular Degeneration (AMD)',
          },
        ],
        correctOption: 'A',
        explanation:
          'Central Retinal Artery Occlusion presents as sudden, painless monocular visual loss. The classic fundoscopic appearance is retinal pallor due to ischemic edema with a characteristic cherry-red spot at the macula.',
        topic: 'Ophthalmology - CRAO',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Infectious Disease Category Card
  infectious: {
    cardId: 'infectious',
    title: 'Infectious Disease Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 22-year-old university student presents with headache, fever, neck stiffness, and photophobia. Examination reveals a non-blanching purpuric rash on the lower limbs.',
        question:
          'What is the immediate recommended antibiotic therapy in primary care before hospital transfer?',
        options: [
          {
            id: 'A',
            text: 'Intramuscular or Intravenous Benzylpenicillin 1.2g',
          },
          {
            id: 'B',
            text: 'Oral Amoxicillin 500mg single dose',
          },
          {
            id: 'C',
            text: 'Oral Ciprofloxacin 500mg',
          },
          {
            id: 'D',
            text: 'IV Vancomycin bolus',
          },
          {
            id: 'E',
            text: 'Oral Metronidazole 400mg',
          },
        ],
        correctOption: 'A',
        explanation:
          'If meningococcal disease is suspected in primary care (fever + non-blanching rash), urgent IM or IV Benzylpenicillin should be administered immediately prior to emergency transfer to hospital.',
        topic: 'Infectious Disease - Meningococcal Septicemia',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Immunology / Allergy Category Card
  immuno: {
    cardId: 'immuno',
    title: 'Immunology & Anaphylaxis Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 19-year-old female develops acute stridor, facial angioedema, and widespread urticaria 5 minutes after consuming peanuts at a restaurant. Her BP is 80/50 mmHg.',
        question: 'What is the immediate dose and route of Adrenaline (Epinephrine) required?',
        options: [
          {
            id: 'A',
            text: 'Intramuscular Adrenaline 0.5 mg (0.5 mL of 1:1,000 solution)',
          },
          {
            id: 'B',
            text: 'Intravenous Adrenaline 1 mg (1:10,000 solution)',
          },
          {
            id: 'C',
            text: 'Subcutaneous Adrenaline 0.1 mg',
          },
          {
            id: 'D',
            text: 'Nebulized Adrenaline 5 mL',
          },
          {
            id: 'E',
            text: 'Oral Chlorphenamine 10 mg',
          },
        ],
        correctOption: 'A',
        explanation:
          'Anaphylaxis resuscitation guidelines (Resuscitation Council UK) specify immediate Intramuscular Adrenaline 0.5 mg (1:1,000) into the anterolateral thigh for adults.',
        topic: 'Immunology - Emergency Anaphylaxis',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Musculoskeletal Category Card
  msk: {
    cardId: 'msk',
    title: 'Musculoskeletal Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 55-year-old male presents with severe acute pain, redness, and swelling in his right first metatarsophalangeal (MTP) joint. Joint aspiration shows needle-shaped negatively birefringent crystals.',
        question: 'What is the definitive diagnosis?',
        options: [
          {
            id: 'A',
            text: 'Acute Gout (Monosodium urate crystal deposition)',
          },
          {
            id: 'B',
            text: 'Pseudogout (Calcium pyrophosphate deposition)',
          },
          {
            id: 'C',
            text: 'Septic Arthritis',
          },
          {
            id: 'D',
            text: 'Rheumatoid Arthritis',
          },
          {
            id: 'E',
            text: 'Osteoarthritis',
          },
        ],
        correctOption: 'A',
        explanation:
          'Needle-shaped, strongly negatively birefringent crystals under polarized light microscopic examination of synovial fluid are pathognomonic for gout (urate crystals).',
        topic: 'Rheumatology - Crystal Arthropathy',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Paediatrics Category Card
  paediatrics: {
    cardId: 'paediatrics',
    title: 'Paediatrics Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'An 18-month-old toddler is brought to A&E with a 2-day history of low-grade fever, barking cough, and inspiratory stridor at rest.',
        question:
          'What is the most appropriate first-line medical intervention for moderate croup?',
        options: [
          {
            id: 'A',
            text: 'Single oral dose of Dexamethasone 0.15 mg/kg',
          },
          {
            id: 'B',
            text: 'Inhaled Salbutamol via spacer',
          },
          {
            id: 'C',
            text: 'Oral Amoxicillin for 7 days',
          },
          {
            id: 'D',
            text: 'Immediate endotracheal intubation',
          },
          {
            id: 'E',
            text: 'Steam inhalation in a humidified room',
          },
        ],
        correctOption: 'A',
        explanation:
          'NICE guidelines state that all children with croup (regardless of severity) should receive a single dose of oral Dexamethasone (0.15 mg/kg) to reduce airway inflammation.',
        topic: 'Paediatrics - Laryngotracheobronchitis (Croup)',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Pharmacology Category Card
  pharm: {
    cardId: 'pharm',
    title: 'Pharmacology Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 24-year-old male is admitted following an intentional overdose of Paracetamol 14 hours ago. Paracetamol blood level falls above the treatment line on the nomogram.',
        question: 'What antidote therapy should be initiated immediately?',
        options: [
          {
            id: 'A',
            text: 'Intravenous N-acetylcysteine (NAC) infusion',
          },
          {
            id: 'B',
            text: 'Oral Activated Charcoal 50g',
          },
          {
            id: 'C',
            text: 'Intravenous Naloxone bolus',
          },
          {
            id: 'D',
            text: 'Intravenous Atropine',
          },
          {
            id: 'E',
            text: 'Hemodialysis only',
          },
        ],
        correctOption: 'A',
        explanation:
          'N-acetylcysteine (NAC) replenishes hepatic glutathione stores, neutralizing the toxic metabolite NAPQI and preventing severe acute liver failure following paracetamol toxicity.',
        topic: 'Pharmacology - Paracetamol Overdose & Antidotes',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Reproductive Category Card
  repro: {
    cardId: 'repro',
    title: 'Reproductive & Obstetrics Practice Set',
    questions: [
      {
        id: 1,
        scenario:
          'A 28-year-old pregnant female at 32 weeks gestation presents with sudden onset painless, bright red vaginal bleeding. Fetal heart rate is normal.',
        question:
          'What condition must be excluded before performing any digital vaginal examination?',
        options: [
          {
            id: 'A',
            text: 'Placenta Praevia',
          },
          {
            id: 'B',
            text: 'Placental Abruption',
          },
          {
            id: 'C',
            text: 'Preterm Labor',
          },
          {
            id: 'D',
            text: 'Cervical Ectropion',
          },
          {
            id: 'E',
            text: 'Uterine Rupture',
          },
        ],
        correctOption: 'A',
        explanation:
          'Painless antepartum hemorrhage is characteristic of placenta praevia. Digital vaginal examination is strictly contraindicated as it may cause massive life-threatening hemorrhage.',
        topic: 'Obstetrics - Antepartum Hemorrhage',
        examFrequency: 'High-yield topic',
      },
    ],
  },

  // Mock Exams 1-10
  'mock-1': {
    cardId: 'mock-1',
    title: 'Mock Exam 1 - Comprehensive Clinical Assessment',
    questions: [
      {
        id: 1,
        scenario:
          'Mock Exam 1 Question 1: A 52-year-old male presents with acute central crushing chest pain. ECG shows ST elevation in II, III, and aVF.',
        question: 'Which coronary artery is most likely occluded?',
        options: [
          { id: 'A', text: 'Right Coronary Artery (RCA)' },
          { id: 'B', text: 'Left Anterior Descending Artery (LAD)' },
          { id: 'C', text: 'Left Circumflex Artery (LCx)' },
          { id: 'D', text: 'Left Main Stem Artery' },
          { id: 'E', text: 'Posterior Descending Artery' },
        ],
        correctOption: 'A',
        explanation:
          'ST elevation in leads II, III, and aVF represents inferior MI, which is supplied by the Right Coronary Artery in 85-90% of individuals.',
        topic: 'Cardiology - Inferior STEMI',
        examFrequency: 'High-yield Mock Exam Question',
      },
    ],
  },

  'mock-2': {
    cardId: 'mock-2',
    title: 'Mock Exam 2 - Emergency Medicine Special',
    questions: [
      {
        id: 1,
        scenario:
          'Mock Exam 2 Question 1: A 34-year-old trauma victim arrives with tracheal deviation to the right and hyper-resonance over the left hemithorax.',
        question: 'What is the immediate life-saving procedure required?',
        options: [
          { id: 'A', text: 'Needle decompression in the 2nd intercostal space midclavicular line' },
          { id: 'B', text: 'Immediate chest X-ray' },
          { id: 'C', text: 'Endotracheal intubation' },
          { id: 'D', text: 'Pericardiocentesis' },
          { id: 'E', text: 'CT scan of the chest' },
        ],
        correctOption: 'A',
        explanation:
          'Tension pneumothorax is a clinical diagnosis requiring immediate needle thoracocentesis before waiting for radiographic confirmation.',
        topic: 'Trauma & Emergency - Tension Pneumothorax',
        examFrequency: 'High-yield Mock Exam Question',
      },
    ],
  },

  'mock-3': {
    cardId: 'mock-3',
    title: 'Mock Exam 3 - Advanced Clinical Knowledge',
    questions: [
      {
        id: 1,
        scenario:
          'Mock Exam 3 Question 1: A 60-year-old female presents with fever, right upper quadrant pain, and jaundice (Charcot’s triad).',
        question: 'What is the primary diagnosis?',
        options: [
          { id: 'A', text: 'Acute Ascending Cholangitis' },
          { id: 'B', text: 'Acute Cholecystitis' },
          { id: 'C', text: 'Acute Pancreatitis' },
          { id: 'D', text: 'Biliary Colic' },
          { id: 'E', text: 'Viral Hepatitis A' },
        ],
        correctOption: 'A',
        explanation:
          'Charcot’s triad (fever, RUQ pain, jaundice) indicates acute ascending cholangitis, a surgical emergency requiring IV antibiotics and biliary decompression via ERCP.',
        topic: 'General Surgery - Biliary Disease',
        examFrequency: 'High-yield Mock Exam Question',
      },
    ],
  },

  // Exam Center Modules
  'cardio-resp': {
    cardId: 'cardio-resp',
    title: 'Cardiology & Respiratory Focus',
    questions: [
      {
        id: 1,
        scenario:
          'A 65-year-old woman with type-2 diabetes presents for cardiovascular risk assessment. ECG shows ST depression in V4-V6 and troponins are elevated.',
        question:
          'What is the most appropriate change to her treatment to reduce her cardiovascular risk?',
        options: [
          { id: 'A', text: 'Immediate thrombolysis with Tenecteplase' },
          { id: 'B', text: 'Primary Percutaneous Coronary Intervention (PCI) within 90 minutes' },
          { id: 'C', text: 'Dual antiplatelet therapy and risk assessment using the GRACE score' },
          { id: 'D', text: 'Aspirin 300mg and discharge with urgent outpatient follow-up' },
          { id: 'E', text: 'Continuous infusion of Heparin for 48 hours' },
        ],
        correctOption: 'C',
        explanation:
          'NSTEMI management pathway involves dual antiplatelet therapy combined with risk stratification using the GRACE score to determine need for invasive angiography.',
        topic: 'Cardiology & Respiratory Focus',
        examFrequency: 'High-yield Exam Center Module',
      },
    ],
  },
  'neuro-renal': {
    cardId: 'neuro-renal',
    title: 'Neurology & Renal Deep Dive',
    questions: [
      {
        id: 1,
        scenario:
          'A 54-year-old male with chronic kidney disease (eGFR 22 mL/min) presents with acute confusion, asterixis, pericardial friction rub, and serum urea of 38 mmol/L.',
        question:
          'What is the definitive urgent treatment for uremic pericarditis and encephalopathy?',
        options: [
          { id: 'A', text: 'Urgent Hemodialysis' },
          { id: 'B', text: 'High-dose oral NSAIDs' },
          { id: 'C', text: 'Intravenous Furosemide 120mg' },
          { id: 'D', text: 'Broad-spectrum antibiotics' },
          { id: 'E', text: 'Colchicine 500mcg daily' },
        ],
        correctOption: 'A',
        explanation:
          'Uremic pericarditis and uremic encephalopathy are absolute indications for urgent renal replacement therapy (hemodialysis). NSAIDs are nephrotoxic and contraindicated in advanced CKD.',
        topic: 'Neurology & Renal - End Stage Renal Disease',
        examFrequency: 'High-yield Exam Center Module',
      },
    ],
  },
  'sjt-pro': {
    cardId: 'sjt-pro',
    title: 'SJT Professionalism Module',
    questions: [
      {
        id: 1,
        scenario:
          'You notice a senior registrar frequently making inappropriate derogatory comments about patients on social media using a pseudonym.',
        question: 'What is the most appropriate action according to GMC social media guidance?',
        options: [
          { id: 'A', text: 'Ignore it because a pseudonym is being used' },
          { id: 'B', text: 'Report the behavior to the clinical lead or Caldicott guardian' },
          { id: 'C', text: 'Comment publicly on the posts calling out the registrar' },
          { id: 'D', text: 'Share the posts with patients to warn them' },
          { id: 'E', text: 'Confront the registrar aggressively in front of ward staff' },
        ],
        correctOption: 'B',
        explanation:
          'GMC guidance states that doctors must maintain patient confidentiality and professional standards on social media even when posting anonymously. Misconduct should be escalated to clinical leadership.',
        topic: 'SJT - Professional Conduct & Social Media',
        examFrequency: 'High-yield SJT Module',
      },
    ],
  },
  'mixed-clinical': {
    cardId: 'mixed-clinical',
    title: 'Mixed Clinical Review',
    questions: [
      {
        id: 1,
        scenario:
          'A 72-year-old female presents with acute severe left lower quadrant abdominal pain, fever, and leukocytosis. CT abdomen shows sigmoid diverticular thickening and localized fat stranding without free air.',
        question:
          'What is the recommended initial management for uncomplicated acute diverticulitis?',
        options: [
          { id: 'A', text: 'Oral antibiotics, analgesia, and liquid diet with close monitoring' },
          { id: 'B', text: 'Immediate emergency Hartmann’s procedure' },
          { id: 'C', text: 'Percutaneous CT-guided abscess drainage' },
          { id: 'D', text: 'Emergency colonoscopy' },
          { id: 'E', text: 'Intravenous thrombolysis' },
        ],
        correctOption: 'A',
        explanation:
          'Uncomplicated acute diverticulitis (Hinchey Stage 1a without abscess or perforation) is managed conservatively with gut rest, analgesia, and antibiotics. Colonoscopy is contraindicated during acute diverticulitis due to risk of perforation.',
        topic: 'General Surgery & Gastroenterology - Diverticulitis',
        examFrequency: 'High-yield Clinical Review',
      },
    ],
  },
};
