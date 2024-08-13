export const GenderOptions = ["male", "female", "other"];

export const TypeOptions = ["Full-Time", "Part-Time"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const DoctorFormDefaultValues = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  type: "Full-Time" as Type,
  address: "",
  specialist: "",
  profilePicture: [],
  emergencyContactName: "",
  emergencyContactNumber: "",
  allergies: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
};

export const DoctorSpecialist = [
  "General Surgery", // Perform surgeries on various parts of the body
  "Cardiology", // Treat heart and cardiovascular system disorders
  "Dermatology", // Treat skin, hair, and nail conditions
  "Pediatrics", // Provide medical care for children and adolescents
  "Psychiatry", // Treat mental health disorders
  "Neurology", // Treat disorders of the nervous system
  "Oncology", // Treat cancer and related diseases
  "Orthopedics", // Treat musculoskeletal system issues
  "Ophthalmology", // Treat eye and vision conditions
  "Radiology", // Use imaging to diagnose and treat diseases
  "Gastroenterology", // Treat digestive system disorders
  "Obstetrics and Gynecology", // Provide reproductive health care and deliver babies
  "Endocrinology", // Treat hormone-related disorders
  "Urology", // Treat urinary tract and male reproductive system disorders
  "Nephrology", // Treat kidney-related disorders
  "Rheumatology", // Treat joint, muscle, and autoimmune disorders
  "Pulmonology", // Treat respiratory system disorders
  "Hematology", // Treat blood-related disorders
  "Otolaryngology (ENT)", // Treat ear, nose, and throat conditions
  "Anesthesiology", // Manage pain and administer anesthesia during surgeries
  "Allergy and Immunology", // Treat allergic reactions and immune system disorders
  "Plastic Surgery", // Perform reconstructive and cosmetic surgeries
  "Pathology", // Study and diagnose diseases through lab analysis
  "Family Medicine", // Provide comprehensive health care for individuals and families
  "Emergency Medicine", // Provide immediate care for acute illnesses and injuries
  "Geriatrics", // Provide care for the elderly
  "Sports Medicine", // Treat sports-related injuries and conditions
  "Infectious Disease", // Treat infections caused by bacteria, viruses, fungi, and parasites
  "Neonatology", // Provide care for newborn infants, especially premature or ill infants
  "Pediatric Surgery", // Perform surgeries on infants, children, and adolescents
  "Occupational Medicine", // Treat work-related injuries and illnesses
];

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
