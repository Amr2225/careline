export type Sex = "MALE" | "FEMALE" | "OTHER" | "UNSPECIFIED"

export type BloodType =
  | "A_POS"
  | "A_NEG"
  | "B_POS"
  | "B_NEG"
  | "AB_POS"
  | "AB_NEG"
  | "O_POS"
  | "O_NEG"
  | "UNKNOWN"

export const SEX_LABELS: Record<Sex, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  UNSPECIFIED: "Prefer not to say",
}

export const BLOOD_TYPE_LABELS: Record<BloodType, string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
  UNKNOWN: "Unknown",
}

export type Patient = {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  isActive: boolean
  dob: string
  sex: Sex
  address: string | null
  emergencyContactName: string | null
  emergencyContactPhone: string | null
  bloodType: BloodType | null
  allergies: string | null
  chronicConditions: string | null
  currentMedications: string | null
  medicalNotes: string | null
  lastVisitAt: string | null
  createdAt: string
  updatedAt: string
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "pat_01",
    userId: "usr_p01",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 100 123 4567",
    isActive: true,
    dob: "1989-04-12",
    sex: "MALE",
    address: "12 Tahrir St., Cairo",
    emergencyContactName: "Nora Hassan",
    emergencyContactPhone: "+20 100 987 6543",
    bloodType: "O_POS",
    allergies: "Penicillin",
    chronicConditions: "Hypertension",
    currentMedications: "Lisinopril 10mg daily",
    medicalNotes:
      "Patient reports occasional headaches; BP 138/86 last visit. Recommend follow-up in 3 months.",
    lastVisitAt: "2026-04-22",
    createdAt: "2025-09-01T10:30:00.000Z",
    updatedAt: "2026-04-22T11:00:00.000Z",
  },
  {
    id: "pat_02",
    userId: "usr_p02",
    name: "Layla Mostafa",
    email: "layla.m@example.com",
    phone: "+20 102 555 9988",
    isActive: true,
    dob: "1996-11-30",
    sex: "FEMALE",
    address: "8 Gezira Plaza, Zamalek",
    emergencyContactName: "Mostafa Hany",
    emergencyContactPhone: "+20 100 222 1111",
    bloodType: "A_NEG",
    allergies: null,
    chronicConditions: null,
    currentMedications: null,
    medicalNotes: null,
    lastVisitAt: "2026-05-02",
    createdAt: "2025-11-14T08:00:00.000Z",
    updatedAt: "2026-05-02T09:00:00.000Z",
  },
  {
    id: "pat_03",
    userId: "usr_p03",
    name: "Omar El-Sayed",
    email: "omar.elsayed@example.com",
    phone: "+20 111 444 7700",
    isActive: true,
    dob: "1972-02-19",
    sex: "MALE",
    address: "44 Heliopolis Ave., Cairo",
    emergencyContactName: "Mariam El-Sayed",
    emergencyContactPhone: "+20 111 444 7701",
    bloodType: "B_POS",
    allergies: "Shellfish",
    chronicConditions: "Type 2 Diabetes, mild asthma",
    currentMedications: "Metformin 500mg BID; Salbutamol inhaler PRN",
    medicalNotes:
      "Stable on current regimen. HbA1c last reading 6.8. Patient advised to monitor diet.",
    lastVisitAt: "2026-03-10",
    createdAt: "2025-07-22T13:15:00.000Z",
    updatedAt: "2026-03-10T14:30:00.000Z",
  },
  {
    id: "pat_04",
    userId: "usr_p04",
    name: "Salma Adel",
    email: "salma.adel@example.com",
    phone: "+20 122 333 9090",
    isActive: true,
    dob: "2014-06-08",
    sex: "FEMALE",
    address: "10 Maadi Corniche, Cairo",
    emergencyContactName: "Adel Mahmoud",
    emergencyContactPhone: "+20 100 555 1313",
    bloodType: "O_NEG",
    allergies: "Peanuts (severe)",
    chronicConditions: null,
    currentMedications: "EpiPen on hand",
    medicalNotes: null,
    lastVisitAt: null,
    createdAt: "2026-01-08T09:00:00.000Z",
    updatedAt: "2026-01-08T09:00:00.000Z",
  },
  {
    id: "pat_05",
    userId: "usr_p05",
    name: "Youssef Kamel",
    email: "yk@example.com",
    phone: "+20 109 808 2233",
    isActive: false,
    dob: "1958-08-25",
    sex: "MALE",
    address: "3 Nile View, Giza",
    emergencyContactName: "Hoda Kamel",
    emergencyContactPhone: "+20 109 808 2234",
    bloodType: "AB_POS",
    allergies: null,
    chronicConditions: "Coronary artery disease",
    currentMedications: "Atorvastatin 40mg; Aspirin 81mg",
    medicalNotes: "Cardiology follow-up at external clinic. Records on file.",
    lastVisitAt: "2025-12-19",
    createdAt: "2024-10-03T07:45:00.000Z",
    updatedAt: "2025-12-19T16:00:00.000Z",
  },
  {
    id: "pat_06",
    userId: "usr_p06",
    name: "Nadia Farouk",
    email: "nadia.f@example.com",
    phone: "+20 100 717 5511",
    isActive: true,
    dob: "2001-03-17",
    sex: "FEMALE",
    address: null,
    emergencyContactName: null,
    emergencyContactPhone: null,
    bloodType: "UNKNOWN",
    allergies: null,
    chronicConditions: null,
    currentMedications: null,
    medicalNotes: null,
    lastVisitAt: "2026-05-08",
    createdAt: "2026-02-01T11:00:00.000Z",
    updatedAt: "2026-05-08T12:30:00.000Z",
  },
  {
    id: "pat_07",
    userId: "usr_p07",
    name: "Khaled Mansour",
    email: "khaled.mansour@example.com",
    phone: "+20 106 222 4488",
    isActive: true,
    dob: "1984-12-01",
    sex: "MALE",
    address: "27 New Cairo Compound",
    emergencyContactName: "Reem Mansour",
    emergencyContactPhone: "+20 106 222 4489",
    bloodType: "A_POS",
    allergies: "Latex",
    chronicConditions: "Seasonal allergic rhinitis",
    currentMedications: "Cetirizine PRN",
    medicalNotes: null,
    lastVisitAt: "2026-04-30",
    createdAt: "2025-08-11T15:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
  },
  {
    id: "pat_08",
    userId: "usr_p08",
    name: "Yara Ibrahim",
    email: "yara.ibrahim@example.com",
    phone: "+20 128 909 1212",
    isActive: false,
    dob: "1993-07-04",
    sex: "FEMALE",
    address: "5 October City, Block 7",
    emergencyContactName: "Ibrahim Saad",
    emergencyContactPhone: "+20 128 909 1213",
    bloodType: "B_NEG",
    allergies: null,
    chronicConditions: "Migraine",
    currentMedications: "Sumatriptan PRN",
    medicalNotes: "Migraine triggers: lack of sleep, stress.",
    lastVisitAt: "2025-10-14",
    createdAt: "2024-06-20T09:30:00.000Z",
    updatedAt: "2025-10-14T18:00:00.000Z",
  },
]

export function calculateAge(dob: string): number {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const currentMonth = today.getMonth() - birth.getMonth()

  if (currentMonth < 0 || (currentMonth === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export function formatDate(input: string | null): string {
  if (!input) return "—"

  return new Date(input).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getMockPatient(id: string): Patient | undefined {
  return MOCK_PATIENTS.find((p) => p.id === id)
}

export type LinkableUser = {
  id: string
  name: string
  email: string
  phoneNumber: string | null
  createdAt: string
}

export const MOCK_LINKABLE_USERS: LinkableUser[] = [
  {
    id: "usr_u01",
    name: "Mariam Saleh",
    email: "mariam.saleh@example.com",
    phoneNumber: "+20 100 818 7700",
    createdAt: "2026-04-18T09:00:00.000Z",
  },
  {
    id: "usr_u02",
    name: "Hussein Tarek",
    email: "h.tarek@example.com",
    phoneNumber: "+20 122 404 9090",
    createdAt: "2026-04-22T11:30:00.000Z",
  },
  {
    id: "usr_u03",
    name: "Dina Roshdy",
    email: "dina.roshdy@example.com",
    phoneNumber: null,
    createdAt: "2026-05-01T08:15:00.000Z",
  },
  {
    id: "usr_u04",
    name: "Tamer Helmy",
    email: "tamer.helmy@example.com",
    phoneNumber: "+20 111 303 5050",
    createdAt: "2026-05-05T14:45:00.000Z",
  },
]
