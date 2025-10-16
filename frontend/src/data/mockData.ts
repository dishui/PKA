/**
 * Mock Data 
 * This file contains the data extracted from the openmypro.com website for development
 * I am use as const here to make sure the data is immutable
 * In production, when we dynamically fetch the data from the website, we will remove the as const and use the actual data
 */

// ============================================================================
// SEARCH OPTIONS 
// ============================================================================
export const searchOptions = [
  { value: 'doctor', label: 'Wellness Pro' },
  { value: 'symptom', label: 'Symptoms' },
  { value: 'speciality', label: 'Speciality' },
  { value: 'location', label: 'Location' },
] as const

// ============================================================================
// NAVIGATION LINKS 
// ============================================================================
export const navigationLinks = {
  company: [
    {
      href: 'https://www.blossend.com/about',
      label: 'About',
      icon: 'info',
      external: true,
    },
    {
      href: '/privacy',
      label: 'Privacy Policy',
      icon: 'shield',
      external: false,
    },
    {
      href: '/Terms&Conditions',
      label: 'Terms of Service',
      icon: 'file-text',
      external: false,
    },
  ],
} as const

// ============================================================================
// SITE METADATA 
// ============================================================================
export const siteMetadata = {
  title: 'OpenMyPro | Book Health, Wellness & Beauty Appointments Instantly',
  description: 'Find and book top-rated health, wellness, and beauty professionals instantly. Premium salon services, medical appointments, and wellness treatments in one platform.',
  ogTitle: 'OpenMyPro | Instantly Book Trusted Health, Wellness & Beauty Pros',
  ogDescription: 'Find and book top-rated health, wellness, and beauty professionals instantly. Premium salon services, medical appointments, and wellness treatments in one platform.',
  ogUrl: 'https://openmypro.com/',
  ogSiteName: 'OpenMyPro',
  ogLocale: 'en_US',
  ogImage: 'https://openmypro.com/assets/images/OMDLogo.png',
  ogImageWidth: '600',
  ogImageHeight: '600',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'OpenMyPro | Instantly Book Trusted Health, Wellness & Beauty Pros',
  twitterDescription: 'Find and book top-rated health, wellness, and beauty professionals instantly. Premium salon services, medical appointments, and wellness treatments in one platform.',
  twitterImage: 'https://openmypro.com/assets/images/OMDLogo.png',
  twitterImageWidth: '600',
  twitterImageHeight: '600',
} as const

// ============================================================================
// BRANDING COLORS 
// ============================================================================
export const brandColors = {
  primary: 'rgb(169, 232, 229)', // Blossend teal
  gradient: 'radial-gradient(140% 70% at 50% -20%, rgb(169, 232, 229), transparent)',
} as const

// ============================================================================
// PLACEHOLDER TEXT 
// ============================================================================
export const placeholders = {
  search: 'Search Pro Name',
} as const

// ============================================================================
// BUTTON TEXT
// ============================================================================
export const buttons = {
  signIn: 'Sign in',
  signUp: 'Sign up',
} as const

// ============================================================================
// ABOUT TEXT (for Footer)
// ============================================================================
export const aboutText = "OpenMyPro app by Blossend is a teleservices platform offering streamlined, optimized, & automated Pro-to-Consumer real-time, 24/7 online scheduling ⎯ redefining how professionals & consumers connect to make their services more accessible & efficient. Our solution ensures a seamless, accurate, & personalized discovery & booking experience ⎯ enabling anyone to effortlessly find & book the right appointment in under 3 clicks & 33 seconds, worldwide. Powered by AI/ML precision, we address the urgent need for instant, intelligent teleservices access. We empower solo skilled pros & businesses with exposure, client acquisition, & streamlined operations ⎯ reducing customer leakage, no-shows, administrative overhead, & automating workflows, while solving everyday Pro-to-Consumer challenges & boosting their solo or large business centers. Consumers gain the fastest, simplest, most transparent, flexible, & customizable experience to connect with professionals ⎯ anytime, anywhere, & much more!" as const

// ============================================================================
// FOOTER DATA
// ============================================================================
export const footerData = {
company: {
  name: 'Blossend',
  location: 'Austin, TX',
},
download: {
  appStore: {
    url: 'https://apps.apple.com',
    image: '/assets/images/download-app-store.png',
    alt: 'Download on the App Store',
  },
  googlePlay: {
    url: 'https://play.google.com',
    image: '/assets/images/get-it-on-google.png',
    alt: 'Get it on Google Play',
  },
},
usefulLinks: [
  { label: 'Help & Support', href: '/help' },
  { label: 'Settings', href: '/settings' },
],
social: [
  { name: 'WhatsApp', url: 'https://wa.me/', icon: 'whatsapp' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
],
copyright: '© 2024 Blossend. All rights reserved.',
legal: [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
],
} as const

// ============================================================================
// HERO SECTION DATA (Carousel Slides)
// ============================================================================
export const heroSlides = [
{
  id: 1,
  badge: 'Wellness Pros Available Now',
  title: 'Your Wellness Journey',
  subtitle: 'Starts Here',
  description: 'Connect with top professionals, book appointments instantly, and take charge of your personal care journey.',
  buttonText: 'Get Started Now',
  buttonLink: '/get-started',
  image: '/assets/images/doctors.png',
  imageAlt: 'Medical professionals team',
  features: [
    { icon: 'shield-check', text: 'Verified Pros' },
    { icon: 'clock', text: '24/7 Support' },
    { icon: 'star', text: 'Top Rated' },
  ],
},
{
  id: 2,
  badge: 'Join Our Network',
  title: 'Grow Your Business',
  subtitle: 'With Us',
  description: 'Join our platform to grow your business effortlessly. Reach more clients, streamline bookings and payments, and unlock exclusive member benefits — so you can focus on delivering exceptional service.',
  buttonText: 'Join as a Wellness Pro',
  buttonLink: '/join',
  secondaryLink: { text: 'Already a member?', linkText: 'Signin', url: '/signin' },
  image: '/assets/images/typing.png',
  imageAlt: 'Professional working on laptop',
  features: [
    { icon: 'users', text: 'Wider Reach' },
    { icon: 'trending-up', text: 'Practice Growth' },
    { icon: 'dollar-sign', text: 'Higher Revenue' },
  ],
},
] as const

// ============================================================================
// ELITE PROS SECTION DATA
// ============================================================================
export const eliteProsSectionData = {
badge: 'Elite Wellness Network',
title: 'Meet Our',
titleHighlight: 'Elite',
titleEnd: 'Pros',
description: 'Connect with world-class professionals who combine cutting-edge expertise with compassionate care, handpicked for their excellence in client outcomes and innovative care solutions.',
} as const


// ============================================================================
// AVAILABLE NOW SECTION DATA
// ============================================================================
export const availableNowSectionData = {
  title: 'Available Now',
  subtitle: 'Find and book appointments with top professionals that are accepting clients right now!',
  seeAllLink: '/available-now',
} as const

// ============================================================================
// PROFESSIONAL PROFILES DATA
// ============================================================================
export const professionalProfiles = {
  1: {
    id: 1,
    firstName: 'Jackline',
    lastName: 'mwangi',
    specialty: 'Nurse Practitioner',
    location: 'NYERI, NYERI COUNTY',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
    bio: 'Compassionate nurse practitioner with 10+ years of experience providing comprehensive healthcare services. Specialized in preventive care and chronic disease management.',
    education: ['MSN - Nurse Practitioner, University of Nairobi', 'BSN - Nursing, Kenyatta University'],
    certifications: ['Board Certified Nurse Practitioner', 'Advanced Cardiac Life Support (ACLS)'],
    languages: ['English', 'Swahili', 'Kikuyu'],
    availability: ['Monday: 9:00 AM - 5:00 PM', 'Tuesday: 9:00 AM - 5:00 PM', 'Wednesday: 9:00 AM - 5:00 PM', 'Thursday: 9:00 AM - 5:00 PM', 'Friday: 9:00 AM - 3:00 PM'],
    servicesOffered: ['Annual Physical Exams', 'Chronic Disease Management', 'Preventive Care', 'Health Screenings', 'Immunizations'],
    yearsExperience: 10,
  },
  2: {
    id: 2,
    firstName: 'Alyssa',
    lastName: 'Cappelletti',
    specialty: 'Chiropractic',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F4bIimvu9igbfIcC7pfgWSSpzpOS2%2Fa9e98c5e-ec7c-43cb-bb0a-b503581e598f-profile-photo.png?alt=media&token=d05e31cf-601a-469a-b631-db1becb2065a',
    bio: 'Holistic chiropractor dedicated to helping patients achieve optimal health through spinal adjustments and natural wellness approaches. Specializing in sports injuries and chronic pain management.',
    education: ['Doctor of Chiropractic, Parker University', 'BS in Exercise Science, University of Texas'],
    certifications: ['Board Certified Chiropractor', 'Certified in Applied Kinesiology', 'Sports Injury Specialist'],
    languages: ['English', 'Spanish'],
    availability: ['Monday: 8:00 AM - 6:00 PM', 'Tuesday: 8:00 AM - 6:00 PM', 'Wednesday: 8:00 AM - 6:00 PM', 'Thursday: 8:00 AM - 6:00 PM', 'Friday: 8:00 AM - 2:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
    servicesOffered: ['Spinal Adjustments', 'Sports Injury Treatment', 'Posture Correction', 'Massage Therapy', 'Nutritional Counseling'],
    yearsExperience: 8,
  },
  3: {
    id: 3,
    firstName: 'Tom',
    lastName: 'Darilek',
    specialty: 'Wellness Consultant',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
    bio: 'Experienced wellness consultant helping individuals achieve their health goals through personalized wellness plans and lifestyle coaching.',
    education: ['MS in Health Sciences, University of Texas', 'BS in Biology, Texas A&M University'],
    certifications: ['Certified Wellness Consultant', 'Health Coach Certification', 'Nutrition Specialist'],
    languages: ['English'],
    availability: ['Monday: 10:00 AM - 7:00 PM', 'Tuesday: 10:00 AM - 7:00 PM', 'Wednesday: 10:00 AM - 7:00 PM', 'Thursday: 10:00 AM - 7:00 PM', 'Friday: 10:00 AM - 4:00 PM'],
    servicesOffered: ['Wellness Assessments', 'Lifestyle Coaching', 'Stress Management', 'Weight Management', 'Health Education'],
    yearsExperience: 12,
  },
  4: {
    id: 4,
    firstName: 'Mihael',
    lastName: 'Rosano',
    specialty: 'Internal Medicine',
    location: 'TLALPAN, CDMX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
    bio: 'Board-certified internist with extensive experience in diagnosing and treating complex medical conditions. Committed to providing patient-centered care with a focus on prevention.',
    education: ['MD - Internal Medicine, Universidad Nacional Autónoma de México', 'Residency in Internal Medicine, Hospital General de México'],
    certifications: ['Board Certified in Internal Medicine', 'Advanced Life Support Certified', 'Geriatric Care Specialist'],
    languages: ['Spanish', 'English', 'Portuguese'],
    availability: ['Monday: 9:00 AM - 6:00 PM', 'Tuesday: 9:00 AM - 6:00 PM', 'Wednesday: 9:00 AM - 6:00 PM', 'Thursday: 9:00 AM - 6:00 PM', 'Friday: 9:00 AM - 5:00 PM'],
    servicesOffered: ['Primary Care', 'Chronic Disease Management', 'Preventive Medicine', 'Geriatric Care', 'Diagnostic Services'],
    yearsExperience: 15,
  },
  5: {
    id: 5,
    firstName: 'Rehan',
    lastName: 'Shah',
    specialty: 'Addiction Medicine',
    location: 'NY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F5mb5d7aLO2glPQxshgqkWouyFOG2%2F00aaa47a-32ae-4579-b647-9c62ae947712-profile-photo.png?alt=media&token=231e9e17-3542-4de8-950a-68ff040e3791',
    bio: 'Compassionate addiction medicine specialist dedicated to helping individuals overcome substance use disorders through evidence-based treatment and support.',
    education: ['MD - Addiction Medicine, Columbia University', 'Fellowship in Addiction Medicine, Mount Sinai Hospital'],
    certifications: ['Board Certified in Addiction Medicine', 'Suboxone Waivered Provider', 'Certified in Motivational Interviewing'],
    languages: ['English', 'Urdu', 'Hindi'],
    availability: ['Monday: 8:00 AM - 5:00 PM', 'Tuesday: 8:00 AM - 5:00 PM', 'Wednesday: 8:00 AM - 5:00 PM', 'Thursday: 8:00 AM - 5:00 PM', 'Friday: 8:00 AM - 12:00 PM'],
    servicesOffered: ['Addiction Assessment', 'Medication-Assisted Treatment', 'Individual Counseling', 'Group Therapy', 'Relapse Prevention'],
    yearsExperience: 9,
  },
  6: {
    id: 6,
    firstName: 'Walking',
    lastName: 'Tall',
    specialty: 'Mental Health Counselor',
    location: 'ASHEVILLE, NC',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F7TgPeYOTtWghkk6kx2w0uO22yD73%2Fb7f88124-846a-45af-b6ba-ce2a63f62d24-profile-photo.png?alt=media&token=e96dbfd9-9fe9-47fb-bcf3-c85b2ed8cfda',
    bio: 'Licensed mental health counselor with expertise in trauma-informed care, anxiety, and depression. Creating a safe, supportive environment for healing and growth.',
    education: ['MA in Clinical Mental Health Counseling, Appalachian State University', 'BA in Psychology, UNC Chapel Hill'],
    certifications: ['Licensed Professional Counselor (LPC)', 'Certified in EMDR Therapy', 'Trauma-Informed Care Specialist'],
    languages: ['English'],
    availability: ['Monday: 9:00 AM - 7:00 PM', 'Tuesday: 9:00 AM - 7:00 PM', 'Wednesday: 9:00 AM - 7:00 PM', 'Thursday: 9:00 AM - 7:00 PM', 'Friday: 9:00 AM - 5:00 PM'],
    servicesOffered: ['Individual Therapy', 'Trauma Therapy', 'Anxiety Treatment', 'Depression Treatment', 'EMDR Therapy', 'Mindfulness-Based Therapy'],
    yearsExperience: 7,
  },
  7: {
    id: 7,
    firstName: 'Santiago',
    lastName: 'Castelazo',
    specialty: 'Obstetrics/Gynecology',
    location: 'JESÚS DEL MONTE, ESTADO DE MÉXICO',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F8AShnwgjQwdOptx6uLi4IxQRD353%2F6fbc0119-2738-4281-9144-b655d17048df-profile-photo.png?alt=media&token=6a386dbd-17d7-475f-af60-58aeb517e261',
    bio: 'Board-certified OB/GYN providing comprehensive womens health care with a focus on preventive medicine and patient education. Committed to supporting women through all stages of life.',
    education: ['MD - Obstetrics & Gynecology, Instituto Politécnico Nacional', 'Residency in OB/GYN, Hospital de la Mujer'],
    certifications: ['Board Certified in Obstetrics & Gynecology', 'Minimally Invasive Surgery Certified', 'Maternal-Fetal Medicine'],
    languages: ['Spanish', 'English'],
    availability: ['Monday: 8:00 AM - 4:00 PM', 'Tuesday: 8:00 AM - 4:00 PM', 'Wednesday: 8:00 AM - 4:00 PM', 'Thursday: 8:00 AM - 4:00 PM', 'Friday: 8:00 AM - 2:00 PM'],
    servicesOffered: ['Prenatal Care', 'Gynecological Exams', 'Family Planning', 'Menopause Management', 'Ultrasound Services', 'High-Risk Pregnancy Care'],
    yearsExperience: 14,
  },
  8: {
    id: 8,
    firstName: 'Kris',
    lastName: 'Meadows',
    specialty: 'Nutrition',
    location: 'DETROIT, MI',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FCT2qPE6pBCbF3sVXrwUVSCt697F3%2Fd7e6ad75-5f41-4959-bb1e-f0323ad580d9-profile-photo.png?alt=media&token=a3ec4663-6183-4ade-bf42-12f17ecb307b',
    bio: 'Registered dietitian nutritionist helping clients achieve their health goals through personalized nutrition plans and evidence-based dietary guidance.',
    education: ['MS in Nutrition Science, Wayne State University', 'BS in Dietetics, Michigan State University'],
    certifications: ['Registered Dietitian Nutritionist (RDN)', 'Certified Diabetes Educator', 'Sports Nutrition Specialist'],
    languages: ['English'],
    availability: ['Monday: 9:00 AM - 6:00 PM', 'Tuesday: 9:00 AM - 6:00 PM', 'Wednesday: 9:00 AM - 6:00 PM', 'Thursday: 9:00 AM - 6:00 PM', 'Friday: 9:00 AM - 4:00 PM', 'Saturday: 10:00 AM - 2:00 PM'],
    servicesOffered: ['Nutrition Counseling', 'Meal Planning', 'Weight Management', 'Sports Nutrition', 'Diabetes Management', 'Gut Health'],
    yearsExperience: 11,
  },
} as const

// Professionals available now 
export const availableNowPros: AvailableNowPro[] = [
  {
    id: 1,
    firstName: 'Jackline',
    lastName: 'mwangi',
    specialty: 'nurse practitioner',
    location: 'NYERI, NYERI COUNTY',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null, // Uses SVG placeholder
  },
  {
    id: 2,
    firstName: 'Alyssa',
    lastName: 'Cappelletti',
    specialty: 'chiropractic',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F4bIimvu9igbfIcC7pfgWSSpzpOS2%2Fa9e98c5e-ec7c-43cb-bb0a-b503581e598f-profile-photo.png?alt=media&token=d05e31cf-601a-469a-b631-db1becb2065a',
  },
  {
    id: 3,
    firstName: 'Tom',
    lastName: 'Darilek',
    specialty: 'undefined non-physician type (specify)',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 4,
    firstName: 'Mihael',
    lastName: 'Rosano',
    specialty: 'internal medicine',
    location: 'TLALPAN, CDMX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 5,
    firstName: 'rehan',
    lastName: 'shah',
    specialty: 'addiction medicine',
    location: 'NY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F5mb5d7aLO2glPQxshgqkWouyFOG2%2F00aaa47a-32ae-4579-b647-9c62ae947712-profile-photo.png?alt=media&token=231e9e17-3542-4de8-950a-68ff040e3791',
  },
  {
    id: 6,
    firstName: 'Walking',
    lastName: 'Tall',
    specialty: 'mental health counselor',
    location: 'ASHEVILLE, NC',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F7TgPeYOTtWghkk6kx2w0uO22yD73%2Fb7f88124-846a-45af-b6ba-ce2a63f62d24-profile-photo.png?alt=media&token=e96dbfd9-9fe9-47fb-bcf3-c85b2ed8cfda',
  },
  {
    id: 7,
    firstName: 'Santiago',
    lastName: 'Castelazo',
    specialty: 'obstetrics/gynecology',
    location: 'JESÚS DEL MONTE, ESTADO DE MÉXICO',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F8AShnwgjQwdOptx6uLi4IxQRD353%2F6fbc0119-2738-4281-9144-b655d17048df-profile-photo.png?alt=media&token=6a386dbd-17d7-475f-af60-58aeb517e261',
  },
  {
    id: 8,
    firstName: 'Kris',
    lastName: 'Meadows',
    specialty: 'nutrition',
    location: 'DETROIT, MI',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FCT2qPE6pBCbF3sVXrwUVSCt697F3%2Fd7e6ad75-5f41-4959-bb1e-f0323ad580d9-profile-photo.png?alt=media&token=a3ec4663-6183-4ade-bf42-12f17ecb307b',
  },
] as const

// SVG Placeholder for professionals without photos
export const profilePlaceholderSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='%239ca3af' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><circle cx='32' cy='19' r='12'/><rect x='16' y='36' width='32' height='20' rx='6'/></svg>" as const

// ============================================================================
// SEARCH FILTER DATA 
// ============================================================================
export const practiceSpecialties = [
  'addiction medicine',
  'adult congenital heart disease (achd)',
  'advanced heart failure and transplant cardiology',
  'allergy/immunology',
  'anesthesiology',
  'anesthesiology assistant',
  'cancer',
  'cardiac electrophysiology',
  'cardiac surgery',
  'cardiologist',
  'cardiology',
  'cardiovascular disease (cardiology)',
  'certified clinical nurse specialist (cns)',
  'certified nurse midwife (cnm)',
  'certified registered nurse anesthetist (crna)',
  'chiropractic',
  'clinical nutritionist',
  'clinical psychologist',
  'clinical social worker',
  'colorectal surgery (proctology)',
  'critical care (intensivists)',
  'dentist',
  'dermatology',
  'diagnostic radiology',
  'emergency medicine',
  'endocrinology',
  'family practice',
  'gastroenterology',
  'gastrology',
  'general practice',
  'general surgery',
  'geriatric medicine',
  'geriatric psychiatry',
  'gynecological oncology',
  'hand surgery',
  'hematology',
  'hematology/oncology',
  'hematopoietic cell transplantation and cellular therapy',
  'herbal medicine',
  'hospice/palliative care',
  'hospitalist',
  'infectious disease',
  'internal medicine',
  'interventional cardiology',
  'interventional pain management',
  'interventional radiology',
  'marriage and family therapist',
  'maxillofacial surgery',
  'medical genetics and genomics',
  'medical oncology',
  'medical toxicology',
  'mental health counselor',
  'micrographic dermatologic surgery (mds)',
  'nephrology',
  'neurology',
  'neuropsychiatry',
  'neurosurgery',
  'nuclear medicine',
  'nurse practitioner',
  'nutrition',
  'obstetrics/gynecology',
  'occupational therapy',
  'ophthalmology',
  'optometry',
  'oral and maxillofacial radiology',
  'oral surgery',
  'orthopedic surgery',
  'osteopathic manipulative medicine',
  'otolaryngology',
  'pain management',
  'pathology',
  'pediatric medicine',
  'peripheral vascular disease',
  'physical medicine and rehabilitation',
  'physical therapy',
  'physician assistant',
  'plastic and reconstructive surgery',
  'podiatry',
  'preventive medicine',
  'psychiatry',
  'pulmonary disease',
  'qualified audiologist',
  'qualified speech language pathologist',
  'radiation oncology',
  'registered dietitian or nutrition professional',
  'rheumatology',
  'sleep medicine',
  'sports medicine',
  'surgical oncology',
  'thoracic surgery',
  'undefined non-physician type (specify)',
  'undefined physician type (specify)',
  'undersea and hyperbaric medicine',
  'urology',
  'vascular surgery',
  'beauty professionals',
  'fitness trainers',
  'personal trainers',
  'gym trainers',
  'sports coaches',
  'martial arts instructors',
] as const

export const filterDefaults = {
  zipCode: '',
  maxDistance: 5,
  minDistance: 0,
  maxDistanceLimit: 250,
  distanceStep: 10,
} as const

// ============================================================================
// FEATURED SECTION DATA
// ============================================================================
export const featuredSectionData = {
  header: {
    title: 'Featured',
    description: 'Discover highly-rated professionals ready to provide expert care, just a click away!',
    actionText: 'Join thousands of clients who trust our featured network.',
  },
  stats: [
    {
      id: 1,
      value: '30+',
      label: 'Featured Pros',
      color: 'blue',
    },
    {
      id: 2,
      value: '100+',
      label: 'Wellness Experts',
      color: 'green',
    },
    {
      id: 3,
      value: '15K+',
      label: 'Clients Served',
      color: 'purple',
    },
    {
      id: 4,
      value: '98%',
      label: 'Satisfaction Rate',
      color: 'orange',
    },
  ],
  featuredOrganizations: [
    {
      id: 1,
      name: 'Wellness Drips',
      description: "Wellness Drips is Mexico's premier IV therapy and longevity center, specializing in IV vitamin drips, anti-aging treatments, hydration therapy, detox solutions, and performance optimization. Our medical team blends advanced science with luxury wellness, creating customized IV therapies that boost energy, strengthen immunity, enhance recovery, and promote long-term vitality.\n\nServing wellness travelers, executives, athletes, and local residents, we provide a premium health experience designed for those who value optimal performance, cellular rejuvenation, and holistic wellness. Whether you are seeking rapid recovery, enhanced focus, or cutting-edge longevity protocols, Wellness Drips delivers trusted, science-backed solutions in a modern, luxury environment.",
      badge: 'Featured',
      iconGradient: 'from-blue-500 to-purple-600',
      statusText: 'Active Partner',
      statusColor: 'green',
    },
    {
      id: 2,
      name: 'Livestrong',
      description: 'No wellness professionals added yet',
      badge: 'Featured',
      iconGradient: 'from-green-500 to-teal-600',
      statusText: 'Active Partner',
      statusColor: 'green',
    },
  ],
  buttonText: 'See All Featured Centers & Wellness Professionals',
} as const

// ============================================================================
// HOLISTIC HEALTH SECTION DATA
// ============================================================================
export const holisticHealthSectionData = {
  header: {
    title: 'Mind & Body Wellness: IVs, Therapists & Mental Health Specialists, Holistic, Alternative & Spiritual Experts',
    description: 'Experience transformative healing and balance with Blossend\'s curated network of holistic and spiritual wellness experts.',
    actionText: 'Book holistic therapies, meditation, and spiritual guidance for mind and body wellness.',
  },
  stats: [
    { id: '1', value: '4+', label: 'Holistic Partners', color: 'emerald' },
    { id: '2', value: '30+', label: 'Practitioners', color: 'yellow' },
    { id: '3', value: '800+', label: 'Happy Clients', color: 'blue' },
    { id: '4', value: '98%', label: 'Client Satisfaction', color: 'emerald' },
  ],
  holisticPartners: [
    {
      id: '1',
      name: 'Wellness Drips',
      location: 'Cancun, Mexico',
      description: 'Wellness Drips is Mexico\'s premier IV therapy and longevity center, specializing in IV vitamin drips, anti-aging treatments, hydration therapy, detox solutions, and performance optimization.',
      iconGradient: 'from-blue-500 to-purple-600',
      statusText: 'Active Partner',
      statusColor: 'green' as const,
    },
    {
      id: '2',
      name: 'Wellness Drips',
      location: 'Monterrey, Mexico',
      description: 'Wellness Drips is Mexico\'s premier IV therapy and longevity center, specializing in IV vitamin drips, anti-aging treatments, hydration therapy, detox solutions, and performance optimization.',
      iconGradient: 'from-green-500 to-teal-600',
      statusText: 'Active Partner',
      statusColor: 'green' as const,
    },
  ],
  buttonText: 'See All Holistic & Spiritual Services',
} as const

// ============================================================================
// FITNESS SECTION DATA
// ============================================================================
export const fitnessSectionData = {
  header: {
    title: 'Fitness & Exercise: Nutrition Coaches, Personal Trainers, Gyms, Class & Exercise Instructors (Yoga, Pilates,..), Jujitsu, MMA, Boxing & Recreation:',
    description: 'Unlock your full potential with Blossend\'s exclusive network of fitness, sports medicine, and wellness experts.',
    actionText: 'Book premium fitness services alongside your wellness appointments.',
  },
  stats: [
    { id: 1, value: '4+', label: 'Fitness Partners', color: 'teal' },
    { id: 2, value: '50+', label: 'Trainers & Experts', color: 'yellow' },
    { id: 3, value: '1K+', label: 'Happy Clients', color: 'blue' },
    { id: 4, value: '97%', label: 'Client Satisfaction', color: 'teal' },
  ],
  emptyStateMessage: 'No TeamCare centers to display.',
  buttonText: 'See All Fitness & Sports Medicine Services',
} as const

export const fitnessPartners: FitnessPartner[] = [];
// ============================================================================
// BEAUTY SECTION DATA
// ============================================================================
export const beautySectionData = {
  header: {
    title: 'Beauty & Aesthetics (Personal Care & Grooming): Nail Salons, Dental, Hair & Skin Care (Facials), Cosmetics:',
    description: 'Discover premium nail salons, cosmetics, hair care, and facial services through OpenMyPro\'s trusted beauty network.',
    actionText: 'Book beauty appointments instantly alongside your wellness services.',
  },
  announcement: {
    title: 'Welcome Escape Nail Bar to Blossend!',
    description: 'We\'re thrilled to announce our partnership with Escape Nail Bar, bringing you premium beauty services integrated with your health and wellness journey.',
  },
  stats: [
    { id: 1, value: '1+', label: 'Salon Partners', color: 'teal' },
    { id: 2, value: '150+', label: 'Beauty Professionals', color: 'yellow' },
    { id: 3, value: '2K+', label: 'Happy Clients', color: 'blue' },
    { id: 4, value: '95%', label: 'Client Satisfaction', color: 'teal' },
  ],
  beautyPartners: [
    {
      id: 'beauty-1',
      name: 'Escape Nail Bar',
      description: 'Premium beauty experience with expert stylists',
      badge: 'Featured Partner',
      iconGradient: 'from-blue-500 to-purple-600',
      statusText: 'Active Partner',
      statusColor: 'green' as const,
    },
  ],
  buttonText: 'See All Beauty & Aesthetics Services',
} as const

// ============================================================================
// ORGANIZATIONS SECTION DATA
// ============================================================================
export const organizationsSectionData = {
  header: {
    title: 'Medical & Clinical Services: Healthcare Facilities (Clinics, Hospitals, Labs), Hormonal Health, Wellness Orgs:',
    description: 'Trusted healthcare networks and institutions collaborating with Blossend to provide exceptional care.',
    actionText: 'Join thousands of patients who trust our verified partner network.',
  },
  stats: [
    { id: 1, value: '5+', label: 'Partner Organizations', color: 'blue' },
    { id: 2, value: '500+', label: 'Healthcare Professionals', color: 'green' },
    { id: 3, value: '15K+', label: 'Patients Served', color: 'purple' },
    { id: 4, value: '98%', label: 'Satisfaction Rate', color: 'orange' },
  ],
  organizations: [
    {
      id: 'org-1',
      name: 'Wellness Drips',
      description: 'Wellness Drips is Mexico\'s premier IV therapy and longevity center, specializing in IV vitamin drips, anti-aging treatments, hydration therapy, detox solutions, and performance optimization. Our medical team blends advanced science with luxury wellness, creating customized IV therapies that boost energy, strengthen immunity, enhance recovery, and promote long-term vitality.\n\nServing wellness travelers, executives, athletes, and local residents, we provide a premium health experience designed for those who value optimal performance, cellular rejuvenation, and holistic wellness. Whether you are seeking rapid recovery, enhanced focus, or cutting-edge longevity protocols, Wellness Drips delivers trusted, science-backed solutions in a modern, luxury environment.',
      badge: 'Health Org',
      iconGradient: 'from-blue-500 to-purple-600',
      statusText: 'Active Partner',
      statusColor: 'green' as const,
    },
    {
      id: 'org-2',
      name: 'Livestrong',
      description: 'No wellness professionals added yet',
      badge: 'Health Org',
      iconGradient: 'from-green-500 to-teal-600',
      statusText: 'Active Partner',
      statusColor: 'green' as const,
    },
  ],
  buttonText: 'See All Partner Organizations & Health Networks',
} as const

// ============================================================================
// NEW TO BLOSSEND SECTION DATA
// ============================================================================
export const newToBlossendSectionData = {
  title: 'New to Blossend',
  subtitle: 'Meet the latest professionals who recently joined OpenMyPro by Blossend!',
  seeAllLink: '/new-professionals',
} as const

export const newToBlossendPros: AvailableNowPro[] = [
  {
    id: 9,
    firstName: 'Jackline',
    lastName: 'mwangi',
    specialty: 'nurse practitioner',
    location: 'NYERI, NYERI COUNTY',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 10,
    firstName: 'Tom',
    lastName: 'Darilek',
    specialty: 'undefined non-physician type (specify)',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 11,
    firstName: 'Mihael',
    lastName: 'Rosano',
    specialty: 'internal medicine',
    location: 'TLALPAN, CDMX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 12,
    firstName: 'Walking',
    lastName: 'Tall',
    specialty: 'mental health counselor',
    location: 'ASHEVILLE, NC',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F7TgPeYOTtWghkk6kx2w0uO22yD73%2Fb7f88124-846a-45af-b6ba-ce2a63f62d24-profile-photo.png?alt=media&token=e96dbfd9-9fe9-47fb-bcf3-c85b2ed8cfda',
  },
  {
    id: 13,
    firstName: 'Dave',
    lastName: 'Nguyen',
    specialty: 'beauty professionals',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FAV7lklKEBlhhw361Y1fi2eh5f9b2%2F4bd920a6-4d52-4ef9-8140-545edbacf25e-profile-photo.png?alt=media&token=7b04232f-ef6f-4708-8886-847a3d9b166a',
  },
  {
    id: 14,
    firstName: 'Kris',
    lastName: 'Meadows',
    specialty: 'nutrition',
    location: 'DETROIT, MI',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FCT2qPE6pBCbF3sVXrwUVSCt697F3%2Fd7e6ad75-5f41-4959-bb1e-f0323ad580d9-profile-photo.png?alt=media&token=a3ec4663-6183-4ade-bf42-12f17ecb307b',
  },
  {
    id: 15,
    firstName: 'Naqash',
    lastName: 'Khan',
    specialty: 'personal trainers',
    location: 'MIAMI, FL',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FNQh7KatihdMmzwua5aDB6Tz0MN72%2F39f28f6d-a564-44cd-a685-4e85679cdea8-profile-photo.png?alt=media&token=045f3218-d2e6-49ff-89ee-1b72d81b86a9',
  },
  {
    id: 16,
    firstName: 'Peace',
    lastName: 'Mensah',
    specialty: 'nutrition',
    location: 'TAKORADI, WESTERN REGION',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 17,
    firstName: 'Fred',
    lastName: 'Maleto',
    specialty: 'nutrition',
    location: 'NAROK, NAROK COUNTY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 18,
    firstName: 'Sami',
    lastName: 'Khan',
    specialty: 'cardiac surgery',
    location: 'COHOCTON, NY',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 19,
    firstName: 'James',
    lastName: 'Stubbs',
    specialty: 'chiropractic',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 20,
    firstName: 'Andre',
    lastName: 'Cyrino GB JUNDIAI SP',
    specialty: 'physical therapy',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 21,
    firstName: 'Kome',
    lastName: 'Johnson',
    specialty: 'physical therapy',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 22,
    firstName: 'Frank',
    lastName: 'otieno',
    specialty: 'herbal medicine',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 23,
    firstName: 'Tammy',
    lastName: 'Lê',
    specialty: 'acupuncture',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 24,
    firstName: 'Lance',
    lastName: 'shipman',
    specialty: 'personal trainers',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 25,
    firstName: 'Niwamanya',
    lastName: 'David',
    specialty: 'chiropractic',
    location: 'KAMPALA, KAMPALA',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 26,
    firstName: 'Malia',
    lastName: 'Ropati',
    specialty: 'nutrition',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 27,
    firstName: 'CancerFit',
    lastName: 'by Livestrong',
    specialty: 'personal trainers',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 28,
    firstName: 'Alice',
    lastName: 'Baker',
    specialty: 'nurse practitioner',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
]

// ============================================================================
// TOP 10 SECTION DATA
// ============================================================================
export const top10SectionData = {
  title: 'Top 10 Pros Recommended by Blossend: Most Popular & Highly Rated:',
  subtitle: 'Verified top-performing professionals selected by Blossend\'s quality standards',
  seeAllLink: '/top-10',
} as const

// Top 10 professionals
export const top10Pros: AvailableNowPro[] = [
  {
    id: 1,
    firstName: 'Jackline',
    lastName: 'mwangi',
    specialty: 'nurse practitioner',
    location: 'NYERI, NYERI COUNTY',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: null,
  },
  {
    id: 2,
    firstName: 'Alyssa',
    lastName: 'Cappelletti',
    specialty: 'chiropractic',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F4bIimvu9igbfIcC7pfgWSSpzpOS2%2Fa9e98c5e-ec7c-43cb-bb0a-b503581e598f-profile-photo.png?alt=media&token=d05e31cf-601a-469a-b631-db1becb2065a',
  },
  {
    id: 3,
    firstName: 'Tom',
    lastName: 'Darilek',
    specialty: 'undefined non-physician type (specify)',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 4,
    firstName: 'Mihael',
    lastName: 'Rosano',
    specialty: 'internal medicine',
    location: 'TLALPAN, CDMX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 5,
    firstName: 'rehan',
    lastName: 'shah',
    specialty: 'addiction medicine',
    location: 'NY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F5mb5d7aLO2glPQxshgqkWouyFOG2%2F00aaa47a-32ae-4579-b647-9c62ae947712-profile-photo.png?alt=media&token=231e9e17-3542-4de8-950a-68ff040e3791',
  },
  {
    id: 12,
    firstName: 'Walking',
    lastName: 'Tall',
    specialty: 'mental health counselor',
    location: 'ASHEVILLE, NC',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F7TgPeYOTtWghkk6kx2w0uO22yD73%2Fb7f88124-846a-45af-b6ba-ce2a63f62d24-profile-photo.png?alt=media&token=e96dbfd9-9fe9-47fb-bcf3-c85b2ed8cfda',
  },
  {
    id: 6,
    firstName: 'Santiago',
    lastName: 'Castelazo',
    specialty: 'obstetrics/gynecology',
    location: 'JESÚS DEL MONTE, ESTADO DE MÉXICO',
    price: 0.00,
    rating: 0.0,
    reviewCount: 0,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2F8AShnwgjQwdOptx6uLi4IxQRD353%2F6fbc0119-2738-4281-9144-b655d17048df-profile-photo.png?alt=media&token=6a386dbd-17d7-475f-af60-58aeb517e261',
  },
  {
    id: 7,
    firstName: 'Kris',
    lastName: 'Meadows',
    specialty: 'nutrition',
    location: 'DETROIT, MI',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FCT2qPE6pBCbF3sVXrwUVSCt697F3%2Fd7e6ad75-5f41-4959-bb1e-f0323ad580d9-profile-photo.png?alt=media&token=a3ec4663-6183-4ade-bf42-12f17ecb307b',
  },
]

// ============================================================================
// ALTERNATIVE BLOSSEND PROS SECTION DATA
// ============================================================================
export const alternativeProsData = {
  title: 'Alternative Blossend Pros',
  subtitle: 'Can\'t find who you are looking for? Try these other Blossend options',
  seeAllLink: '/alternative-pros',
} as const

export const alternativePros: AvailableNowPro[] = [
  {
    id: 3,
    firstName: 'Tom',
    lastName: 'Darilek',
    specialty: 'undefined non-physician type (specify)',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 29,
    firstName: 'Robert',
    lastName: 'Parsimei',
    specialty: 'general practice',
    location: 'NAROK, NAROK COUNTY',
    price: 10.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 30,
    firstName: 'Alexander',
    lastName: 'Ezra',
    specialty: 'chiropractic',
    location: 'NEW YORK, NY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FN3994Vs2e4Qry7RkT7RWCdCGtbv1%2F5f845970-a1e9-44f0-bc39-b2a8cd075d7e-profile-photo.png?alt=media&token=b4ea1f37-ddbd-4ada-9ceb-65b3737aefe9',
  },
  {
    id: 15,
    firstName: 'Naqash',
    lastName: 'Khan',
    specialty: 'personal trainers',
    location: 'MIAMI, FL',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FNQh7KatihdMmzwua5aDB6Tz0MN72%2F39f28f6d-a564-44cd-a685-4e85679cdea8-profile-photo.png?alt=media&token=045f3218-d2e6-49ff-89ee-1b72d81b86a9',
  },
  {
    id: 17,
    firstName: 'Fred',
    lastName: 'Maleto',
    specialty: 'nutrition',
    location: 'NAROK, NAROK COUNTY',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 20,
    firstName: 'Andre',
    lastName: 'Cyrino GB JUNDIAI SP',
    specialty: 'physical therapy',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: null,
  },
  {
    id: 31,
    firstName: 'Ellis',
    lastName: 'by Livestrong',
    specialty: 'cancer',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FeNwJd5jAiuhvTAFml4ebdKlirIf1%2F2e60a29e-ab9d-4be0-baaf-dda1442ebf09-profile-photo.png?alt=media&token=f2dba004-6ff4-4010-b26a-ba135d2a96c7',
  },
  {
    id: 27,
    firstName: 'CancerFit',
    lastName: 'by Livestrong',
    specialty: 'cancer',
    location: 'AUSTIN, TX',
    price: 0.00,
    rating: 5.0,
    reviewCount: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/omd-blossend.appspot.com/o/users%2FvD3UTGy9dzRvT3rFVXidBYTKR7q1%2Fd6836c68-efa6-4047-8451-ebea5cf4b40c-profile-photo.png?alt=media&token=dacf79a9-4dc5-4f94-9e28-a275043b4a1f',
  },
]

// ============================================================================
// NOT IN DIRECTORY SECTION DATA
// ============================================================================
export const notInDirectoryData = {
  badge: 'Expand Our Network',
  title: 'Can\'t find your',
  titleHighlight: 'Pro or Wellness Center',
  titleEnd: 'in our directory?',
  description: 'Help us grow our network by adding your trusted professional. We\'ll verify their credentials and make them available to our community.',
  bulletPoints: [
    { text: 'Quick verification process', gradient: 'from-teal-500 to-blue-500' },
    { text: 'Credential verification included', gradient: 'from-blue-500 to-indigo-500' },
    { text: 'Available to community within 48 hours', gradient: 'from-indigo-500 to-purple-500' },
  ],
  buttonText: 'Add my Pro or Wellness Center',
  buttonLink: '/add-my-doctor',
  stats: [
    { value: '500+', label: 'Pros Added', gradient: 'from-teal-600 to-blue-600' },
    { value: '24h', label: 'Avg. Approval', gradient: 'from-blue-600 to-teal-600' },
    { value: '99%', label: 'Success Rate', gradient: 'from-teal-600 to-blue-600' },
  ],
  rightCard: {
    title: 'Pro or Wellness Center Not Found?',
    description: 'Can\'t find your professional? Help us grow our network by adding your trusted health, wellness, or lifestyle professional.',
    buttonText: 'Click to add Pro or Wellness Center',
  },
} as const

// ============================================================================
// SPECIALTIES SECTION DATA
// ============================================================================
export const specialtiesSectionData = {
  badge: {
    icon: 'activity',
    text: 'Wellness Categories',
  },
  title: 'Find a',
  titleHighlight: 'Wellness Pro',
  titleEnd: 'by specialty',
  description: 'Connect with world-class specialists across health, wellness, and lifestyle services. Our curated network ensures you receive exceptional care from highly qualified professionals.',
  specialties: [
    {
      id: 1,
      title: 'Spine/Bone',
      description: 'Orthopedic specialists for bone, joint, and spine care',
      icon: 'bone',
      iconGradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      dotGradient: 'from-orange-500 to-red-600',
      textGradient: 'from-orange-500 to-red-600',
      specialistCount: '150+',
      gridSpan: 'col-span-1 md:col-span-2 lg:col-span-2', // div1: spans 2 columns
      link: '/search?specialization=chiropractic,hand%20surgery,orthopedic%20surgery,osteopathic%20manipulative%20medicine,physical%20medicine%20and%20rehabilitation,physical%20therapy,podiatry,sports%20medicine',
    },
    {
      id: 2,
      title: 'Oral',
      description: 'Dental and oral health professionals',
      icon: 'smile',
      iconGradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      dotGradient: 'from-blue-500 to-indigo-600',
      textGradient: 'from-blue-500 to-indigo-600',
      specialistCount: '200+',
      gridSpan: 'col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1',
      //gridSpan: 'col-span-1 md:col-span-1 lg:row-span-1 lg:row-start-2', // div2: spans 2 rows, starts row 2
      link: '/search?specialization=maxillofacial%20surgery,dentist,oral%20and%20maxillofacial%20radiology,oral%20surgery',
    },
    {
      id: 3,
      title: 'Skin',
      description: 'Dermatology and skin care experts',
      icon: 'shield',
      iconGradient: 'from-rose-300 to-pink-400',
      bgGradient: 'from-rose-50 to-pink-50',
      dotGradient: 'from-rose-300 to-pink-400',
      textGradient: 'from-rose-300 to-pink-400',
      specialistCount: '120+',
      gridSpan: 'col-span-1 row-span-1', // Single cell
      //gridSpan: 'col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1', // div3: spans 2 cols, starts col 3, row 2
      link: '/search?specialization=dermatology,micrographic%20dermatologic%20surgery%20(mds)',
    },
    {
      id: 4,
      title: 'Natural',
      description: 'Holistic and naturopathic medicine',
      icon: 'activity',
      iconGradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      dotGradient: 'from-green-500 to-emerald-600',
      textGradient: 'from-green-500 to-emerald-600',
      specialistCount: '80+',
      gridSpan: 'col-span-1 row-span-2 md:row-span-2 lg:row-span-2 lg:row-start-2',
      link: '/search?specialization=registered%20dietitian%20or%20nutrition%20professional,preventive%20medicine,occupational%20therapy,qualified%20audiologist,qualified%20speech%20language%20pathologist',
    },
    {
      id: 5,
      title: 'Internal',
      description: 'Internal medicine and primary care',
      icon: 'stethoscope',
      iconGradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      dotGradient: 'from-purple-500 to-violet-600',
      textGradient: 'from-purple-500 to-violet-600',
      specialistCount: '300+',
      gridSpan: 'col-span-1 row-span-1', // Single cell
      link: '/search?specialization=allergy%2Fimmunology,critical%20care%20(intensivists),endocrinology,family%20practice,gastroenterology,gastrology,general%20practice,geriatric%20medicine,hematology,hospice%2Fpalliative%20care,hospitalist,infectious%20disease,internal%20medicine,interventional%20pain%20management,nephrology,pulmonary%20disease,rheumatology,sleep%20medicine,sports%20medicine,undersea%20and%20hyperbaric%20medicine',
    },
    {
      id: 6,
      title: 'Mental Health',
      description: 'Psychology and psychiatric care',
      icon: 'brain',
      iconGradient: 'from-yellow-400 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      dotGradient: 'from-yellow-400 to-amber-500',
      textGradient: 'from-yellow-400 to-amber-500',
      specialistCount: '110+',
      gridSpan: 'col-span-1 md:col-span-2 row-span-1', // Spans 2 columns on md+
      link: '/search?specialization=addiction%20medicine,clinical%20psychologist,clinical%20social%20worker,geriatric%20psychiatry,marriage%20and%20family%20therapist,mental%20health%20counselor,neuropsychiatry,psychiatry',
    },
    {
      id: 7,
      title: 'Women\'s Health',
      description: 'Specialized care for women\'s health needs',
      icon: 'user-check',
      iconGradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      dotGradient: 'from-pink-500 to-rose-600',
      textGradient: 'from-pink-500 to-rose-600',
      specialistCount: '85+',
      gridSpan: 'col-span-1 row-span-1', // Single cell
      link: '/search?specialization=certified%20nurse%20midwife%20(cnm),obstetrics%2Fgynecology,gynecological%20oncology',
    },
    {
      id: 8,
      title: 'Cardiovascular',
      description: 'Heart and vascular system specialists',
      icon: 'heart',
      iconGradient: 'from-amber-300 to-rose-400',
      bgGradient: 'from-amber-50 to-rose-50',
      dotGradient: 'from-amber-300 to-rose-400',
      textGradient: 'from-amber-300 to-rose-400',
      specialistCount: '95+',
      gridSpan: 'col-span-1 md:col-span-2 row-span-1', // Spans 2 columns on md+
      link: '/search?specialization=adult%20congenital%20heart%20disease%20(achd),advanced%20heart%20failure%20and%20transplant%20cardiology,cardiac%20electrophysiology,cardiac%20surgery,cardiologist,cardiology,cardiovascular%20disease%20(cardiology),interventional%20cardiology,peripheral%20vascular%20disease,vascular%20surgery',
    },
  ],
} as const

// ============================================================================
// QR CODE MODAL DATA
// ============================================================================
export const qrCodeModalData = {
  title: 'Get the OpenMyPro app',
  description: 'Scan the QR code to download the app now',
  qrCodes: [
    {
      src: '/assets/images/apple-qr.png',
      alt: 'appleStore',
      width: 200,
      height: 200,
    },
    {
      src: '/assets/images/google-qr.png',
      alt: 'appleStore',
      width: 200,
      height: 200,
    },
  ],
  storeLinks: [
    {
      href: 'https://apps.apple.com/us/app/open-my-doctor-doctor-finder/id6737090324',
      src: '/assets/images/apple-store.png',
      alt: 'appleStore',
      width: 200,
      height: 50,
    },
    {
      href: 'https://play.google.com/store/apps/details?id=com.blossend.omd',
      src: '/assets/images/google-store.png',
      alt: 'googlePlay',
      width: 200,
      height: 50,
    },
  ],
  footerText: 'Or check it out in the app stores',
  buttonText: 'Remind me later',
} as const

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
export type SearchOption = typeof searchOptions[number]
export type NavigationLink = typeof navigationLinks.company[number]
export type HeroSlide = typeof heroSlides[number]
export interface AvailableNowPro {
  id: number
  firstName: string
  lastName: string
  specialty: string
  location: string
  price: number
  rating: number
  reviewCount: number
  image: string | null
}

export interface FitnessPartner {
  id: string | number; 
  icon: string;
  iconGradient?: string; 
  badge: string;
  name: string;
  description: string;
  statusText: string;
  statusColor: 'green' | 'blue' | 'red' | 'yellow' | 'orange';
}
export type ProfessionalProfile = typeof professionalProfiles[keyof typeof professionalProfiles]
