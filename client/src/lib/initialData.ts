import { Course, Faculty, Topper, Branch, GalleryItem } from './api';

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    slug: 'class-1-12-all-subjects',
    title: 'Class 1–12 All Subjects',
    category: 'School Education',
    target_audience: 'Students in Grades 1 through 12 seeking foundational clarity and board exam excellence.',
    short_description: 'Comprehensive coaching for all subjects from classes 1 to 12 with conceptual clarity and individualized attention.',
    full_description: 'Comprehensive coaching for all subjects from classes 1 to 12. Our experienced faculty ensures a strong foundation and conceptual clarity in each subject. Regular assessments, doubt clearing sessions, and personalized mentoring help students excel academically and build lasting confidence.',
    eligibility: 'Open to school students from Class 1 to Class 12 (CBSE / ICSE / State Boards).',
    duration: 'Full Academic Session (Annual with weekly batches)',
    highlights: [
      'Complete NCERT & Reference Book coverage',
      'Small batch sizes for individualized attention',
      'Weekly testing & continuous progress evaluation',
      'Regular parent-teacher feedback sessions',
      'Structured revision modules before school & board exams'
    ],
    icon: 'BookOpen',
    is_published: 1,
    order_index: 1
  },
  {
    id: 2,
    slug: 'class-11-12-commerce',
    title: 'Class 11–12 Commerce',
    category: 'School Education',
    target_audience: 'Commerce stream students aspiring for top board scores and future finance/business careers.',
    short_description: 'Specialized coaching in Accountancy, Business Studies, Economics, and Applied Mathematics.',
    full_description: 'In-depth preparation for Senior Secondary Commerce students. We specialize in conceptual clarity for Accountancy, practical analysis for Business Studies, analytical insights for Micro and Macro Economics, and comprehensive problem-solving in Mathematics. Prepares students for both Class 12 Boards and competitive university entries.',
    eligibility: 'Class 11 & Class 12 Commerce students.',
    duration: '1 to 2 Academic Years',
    highlights: [
      'Step-by-step balance sheet & ledger mastery in Accountancy',
      'Case study resolution techniques for Business Studies',
      'Real-world graph & numerical focus in Economics',
      'Past 10 years board paper solving & mock examinations',
      'Direct foundation for CUET, CA Foundation & BMS'
    ],
    icon: 'TrendingUp',
    is_published: 1,
    order_index: 2
  },
  {
    id: 3,
    slug: 'class-11-12-science',
    title: 'Class 11–12 Science',
    category: 'School Education',
    target_audience: 'Science students aiming for high board percentages and competitive engineering/medical foundation.',
    short_description: 'Rigorous coaching in Physics, Chemistry, Mathematics, and Biology with conceptual and numerical focus.',
    full_description: 'Our Senior Secondary Science program bridges theoretical understanding with mathematical and laboratory concepts. Faculty focuses on numerical problem solving in Physics and Physical Chemistry, reaction mechanisms in Organic Chemistry, and detailed diagrams & physiological concepts in Biology.',
    eligibility: 'Class 11 & Class 12 Science (PCM / PCB / PCMB).',
    duration: '1 to 2 Academic Years',
    highlights: [
      'Rigorous formula derivations and numerical problem solving',
      'Comprehensive NCERT line-by-line decoding',
      'Integrated board preparation with competitive exam tips',
      'Regular chapter-wise test series with detailed evaluation',
      'Dedicated doubt resolution sessions with senior faculty'
    ],
    icon: 'Atom',
    is_published: 1,
    order_index: 3
  },
  {
    id: 4,
    slug: 'class-11-12-humanities',
    title: 'Class 11–12 Humanities',
    category: 'School Education',
    target_audience: 'Arts and Humanities students targeting top marks in board exams and CUET admissions.',
    short_description: 'Comprehensive coaching in Political Science, History, Geography, Psychology, and Sociology.',
    full_description: 'Our Humanities coaching empowers students with critical thinking, analytical answer writing, and deep historical and geopolitical context. We guide students through effective map work, timeline memorization, and high-scoring essay structures required for top board percentages and university entrance examinations.',
    eligibility: 'Class 11 & Class 12 Humanities students.',
    duration: '1 to 2 Academic Years',
    highlights: [
      'Structured essay and long-answer framing methodologies',
      'Thorough map practice and source-based question training',
      'Contemporary application of political and economic theories',
      'Chapter-wise key term glossaries and mind maps',
      'Direct alignment with CUET Humanities domain subjects'
    ],
    icon: 'Landmark',
    is_published: 1,
    order_index: 4
  },
  {
    id: 5,
    slug: 'computer-science-digital-marketing',
    title: 'Computer Science & Digital Marketing',
    category: 'Skill Development',
    target_audience: 'Students, young professionals and beginners looking to master programming, web skills, and modern digital marketing.',
    short_description: 'Learn fundamentals of Computer Science and Digital Marketing with hands-on practical projects.',
    full_description: 'Learn the fundamentals of Computer Science and Digital Marketing. Our courses include hands-on projects and real-world applications to prepare you for the future. Led by faculty with practical industry experience, students master coding logic, digital branding, social media strategy, SEO, and content creation.',
    eligibility: 'Open to high school students, college students, and working professionals.',
    duration: '3 to 6 Months (Certificate Program)',
    highlights: [
      'Programming basics and software engineering principles',
      'Hands-on Social Media Marketing & Meta Ads management',
      'Search Engine Optimization (SEO) & Google Analytics basics',
      'Content strategy, copywriting, and digital campaign planning',
      'Live project portfolio creation for career readiness'
    ],
    icon: 'Laptop',
    is_published: 1,
    order_index: 5
  },
  {
    id: 6,
    slug: 'jee-neet',
    title: 'JEE / NEET Entrance Coaching',
    category: 'Competitive Examinations',
    target_audience: 'Engineering and Medical aspirants targeting IIT-JEE (Main & Advanced) and NEET-UG.',
    short_description: 'Intensive coaching for JEE and NEET with expert faculty and well-structured curriculum.',
    full_description: 'Intensive coaching for JEE and NEET exams. Our expert faculty and well-structured curriculum ensure you are well-prepared to excel in these competitive exams. We place equal emphasis on speed, accuracy, conceptual depth, and time management strategies under exam conditions.',
    eligibility: 'Class 11, 12 students and repeater/dropper candidates.',
    duration: '1 Year / 2 Years / Crash Course',
    highlights: [
      'Experienced faculty specializing in competitive exam pedagogy',
      'Exhaustive question bank covering past 20 years of JEE & NEET',
      'Periodic All-India level mock test pattern simulation',
      'Speed calculation techniques and shortcut methodologies',
      'One-on-one performance analysis and error log tracking'
    ],
    icon: 'Target',
    is_published: 1,
    order_index: 6
  },
  {
    id: 7,
    slug: 'cuet',
    title: 'CUET (Common University Entrance Test)',
    category: 'Competitive Examinations',
    target_audience: 'Class 12 students seeking admission into Delhi University, BHU, JNU, and central universities.',
    short_description: 'Specialized coaching for CUET focusing on Section 1 Languages, Section 2 Domains, and Section 3 General Test.',
    full_description: 'Specialized coaching for the Common University Entrance Test (CUET). We focus on all essential topics to help you secure admission to top universities. Our curriculum covers Domain Subjects, English/Hindi language comprehension, General Mental Ability, Quantitative Reasoning, and Current Affairs.',
    eligibility: 'Class 12 appearing or passed students.',
    duration: '3 to 6 Months',
    highlights: [
      'Domain subject syllabus aligned precisely with NCERT Class 12',
      'General Test training: Logical Reasoning, Quant & General Knowledge',
      'Computer-based test (CBT) practice interface',
      'Mock tests designed according to NTA examination guidelines',
      'College preference and admission counselling guidance'
    ],
    icon: 'GraduationCap',
    is_published: 1,
    order_index: 7
  },
  {
    id: 8,
    slug: 'ssc-nda',
    title: 'SSC / NDA Exam Coaching',
    category: 'Competitive Examinations',
    target_audience: 'Candidates aspiring for Central Government services (SSC CGL/CHSL/MTS) and National Defence Academy.',
    short_description: 'Prepare for SSC and NDA exams with our rigorous training programs and detailed guidance.',
    full_description: 'Prepare for SSC and NDA exams with our rigorous training programs. Our experienced instructors provide detailed guidance to help you achieve your career goals. We cover Mathematics, General English, General Science, Current Affairs, and SSB interview orientation basics.',
    eligibility: '10+2 for NDA / 10th, 12th, Graduate depending on specific SSC exam.',
    duration: '6 Months to 1 Year',
    highlights: [
      'Special focus on Quantitative Aptitude and Reasoning shortcuts',
      'English vocabulary, grammar rules and comprehension drills',
      'Comprehensive General Studies modules with current affairs updates',
      'Full-length timed sectional and full syllabus practice tests',
      'Physical and medical test awareness guidelines for NDA'
    ],
    icon: 'Shield',
    is_published: 1,
    order_index: 8
  },
  {
    id: 9,
    slug: 'banking-ctet',
    title: 'Banking & CTET Preparation',
    category: 'Competitive Examinations',
    target_audience: 'Aspirants targeting IBPS/SBI Bank PO/Clerk and Central Teacher Eligibility Test (CTET Paper 1 & 2).',
    short_description: 'Get ready for Banking and CTET exams with extensive practice and conceptual clarity.',
    full_description: 'Get ready for Banking and CTET exams with our comprehensive courses. We cover all important topics and provide extensive practice to ensure your success. For Banking, we focus on Data Interpretation, Quantitative Aptitude, and Financial Awareness. For CTET, we emphasize Child Development & Pedagogy, Language learning, and Teaching methodologies.',
    eligibility: 'Graduates for Banking; B.Ed / D.El.Ed / aspiring educators for CTET.',
    duration: '4 to 8 Months',
    highlights: [
      'Child Development and Pedagogy (CDP) deep conceptual coverage',
      'High-speed calculation tricks for Banking Quant & Reasoning',
      'Banking awareness, financial systems, and current events',
      'Previous years solved questions and answer explanation sheets',
      'Weekly full-length mock examinations'
    ],
    icon: 'Briefcase',
    is_published: 1,
    order_index: 9
  },
  {
    id: 10,
    slug: 'rpf-cds',
    title: 'RPF / CDS Preparation',
    category: 'Competitive Examinations',
    target_audience: 'Candidates preparing for Railway Protection Force and Combined Defence Services examinations.',
    short_description: 'Specialized training for RPF and CDS exams to help you excel in competitive selection.',
    full_description: 'Our RPF and CDS coaching programs offer specialized training to help you excel in these exams. We focus on all critical areas to enhance your performance, including General Intelligence, Elementary Mathematics, General Knowledge, and Advanced English comprehension.',
    eligibility: 'Graduates for CDS; 10th/12th/Graduate for RPF Constable/SI.',
    duration: '6 Months',
    highlights: [
      'Extensive practice of previous years UPSC CDS papers',
      'Targeted arithmetic and reasoning drills for RPF examinations',
      'In-depth Defence, Geography, and Polity study material',
      'Regular test series with negative marking simulation',
      'Mentorship from experienced competitive faculty'
    ],
    icon: 'Award',
    is_published: 1,
    order_index: 10
  },
  {
    id: 11,
    slug: 'cat-mat',
    title: 'CAT / MAT Management Entrance',
    category: 'Competitive Examinations',
    target_audience: 'Graduates and final year students aspiring for premier MBA institutions and management colleges.',
    short_description: 'Achieve success in CAT and MAT exams with strategic coaching in Quant, DILR, and VARC.',
    full_description: 'Achieve success in CAT and MAT exams with our targeted coaching. Our curriculum is designed to provide you with the skills and strategies needed to excel in Quantitative Aptitude, Data Interpretation & Logical Reasoning (DILR), and Verbal Ability & Reading Comprehension (VARC).',
    eligibility: 'Graduates / Final Year Degree Students.',
    duration: '6 Months to 1 Year',
    highlights: [
      'Strategy-driven approach to VARC passage analysis',
      'Complex puzzle solving and matrix DILR set drills',
      'Shortcut arithmetic, algebra, and geometry problem sets',
      'Percentile boosting strategies and question selection tactics',
      'Group Discussion (GD) and Personal Interview (PI) guidance'
    ],
    icon: 'Compass',
    is_published: 1,
    order_index: 11
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: 'Air-Conditioned Modern Classroom',
    category: 'Classrooms',
    image_url: '/assets/institute/CR -1.jpeg',
    description: 'Fully air-conditioned, comfortable learning environment equipped for focused learning.'
  },
  {
    id: 2,
    title: 'Interactive Lecture Hall',
    category: 'Classrooms',
    image_url: '/assets/institute/CR -4.jpeg',
    description: 'Conducive batch setup with optimal teacher-student engagement.'
  },
  {
    id: 3,
    title: 'Academic Session in Progress',
    category: 'Classrooms',
    image_url: '/assets/institute/about-1.jpeg',
    description: 'Expert educators delivering structured conceptual lectures.'
  },
  {
    id: 4,
    title: 'Study Space & Doubt Desk',
    category: 'Classrooms',
    image_url: '/assets/institute/Classroom 1  (1).jpeg',
    description: 'Dedicated space for focused problem solving and group discussions.'
  },
  {
    id: 5,
    title: 'Lecture Facility Overview',
    category: 'Classrooms',
    image_url: '/assets/institute/Classroom 1  (2).jpeg',
    description: 'State-of-the-art coaching facilities at the Madangir campus.'
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 1,
    name: 'Mr. Vibhor Gupta',
    designation: 'CEO & Founder',
    subjects: 'Institutional Leadership & Academic Direction',
    bio: 'In a humble beginning, the owner of our institute started his journey in a small, single-room setup. With a passion for education and a vision for growth, he began teaching students on the floor, driven by a deep commitment to providing quality education. Today, his vision has transformed into a reality with two fully air-conditioned branches.',
    image_url: '/assets/faculty/team-1.jpg',
    linkedin_url: '',
    twitter_url: '',
    is_published: 1,
    order_index: 1
  },
  {
    id: 2,
    name: 'Arpit',
    designation: 'Senior Faculty',
    subjects: 'Mathematics & Science (Classes 8–10)',
    bio: 'With a specialization in Data Science, he teaches Maths and Science to classes 8–10 with exceptional conceptual clarity and practical examples that make challenging concepts effortless for school students.',
    image_url: '/assets/faculty/Arpit sur.jpeg',
    linkedin_url: '',
    twitter_url: '',
    is_published: 1,
    order_index: 2
  },
  {
    id: 3,
    name: 'Shreyash Srivastava',
    designation: 'Faculty & Digital Media Head',
    subjects: 'Digital Marketing & Social Media Strategy',
    bio: 'With his great experience in Digital Marketing, he handles all the socials and teaches Digital Marketing at the institute, preparing learners for modern tech and business landscapes.',
    image_url: '/assets/faculty/Shreyash.png',
    linkedin_url: 'https://www.linkedin.com/in/shreyash-srivastava-b46878278/',
    twitter_url: 'https://x.com/Shreyash_sri03',
    is_published: 1,
    order_index: 3
  },
  {
    id: 4,
    name: 'Bhavika',
    designation: 'Academic Faculty',
    subjects: 'School Education & Foundational Studies',
    bio: 'Dedicated educator specializing in building solid foundational understanding, student confidence, and disciplined study habits for academic excellence.',
    image_url: '/assets/faculty/Bhavika.jpg',
    linkedin_url: '',
    twitter_url: '',
    is_published: 1,
    order_index: 4
  },
  {
    id: 5,
    name: 'Harshit Walecha',
    designation: 'Faculty Member',
    subjects: 'Commerce & Quantitative Studies',
    bio: 'Passionate educator committed to practical problem-solving, structured mentoring, and board exam preparation.',
    image_url: '/assets/faculty/Harshit Walecha.jpg',
    linkedin_url: 'https://www.linkedin.com/in/harshit-walecha-8353a4142/',
    twitter_url: '',
    is_published: 1,
    order_index: 5
  },
  {
    id: 6,
    name: 'Kirti Gupta',
    designation: 'Academic Faculty',
    subjects: 'School Curriculum & Guidance',
    bio: 'Experienced in mentoring school students through interactive pedagogy, regular evaluations, and personalized guidance.',
    image_url: '/assets/faculty/Kirti gupta.jpeg',
    linkedin_url: 'https://www.linkedin.com/in/kirti-gupta-068906176/',
    twitter_url: 'https://www.instagram.com/kirttigulhare?igsh=aXdxaGIzdDVwZmg3&utm_source=qr',
    is_published: 1,
    order_index: 6
  },
  {
    id: 7,
    name: 'Simran',
    designation: 'Faculty Member',
    subjects: 'Humanities & Academic Mentoring',
    bio: 'Focused on comprehensive student support, analytical writing skills, and conceptual clarity across secondary school courses.',
    image_url: '/assets/faculty/simran.jpg',
    linkedin_url: '',
    twitter_url: '',
    is_published: 1,
    order_index: 7
  }
];

export const INITIAL_TOPPERS: Topper[] = [
  { id: 1, student_name: 'Aditya Mishra', exam_or_class: 'Academic Excellence & Topper', score_or_rank: 'Top Ranker', year: 'Verified Alumnus', image_url: '/assets/toppers/Aditya_Mishra-removebg-preview.png', is_published: 1, order_index: 1 },
  { id: 2, student_name: 'AAchin', exam_or_class: 'Board Examination Star', score_or_rank: 'Top Ranker', year: 'Verified Alumnus', image_url: '/assets/toppers/AAchin.png', is_published: 1, order_index: 2 },
  { id: 3, student_name: 'Kumar Sriniwas', exam_or_class: 'Academic Excellence & Topper', score_or_rank: 'Top Ranker', year: 'Verified Alumnus', image_url: '/assets/toppers/Kumar Sriniwas.png', is_published: 1, order_index: 3 },
  { id: 4, student_name: 'Institute Topper 1', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/1-removebg-preview.png', is_published: 1, order_index: 4 },
  { id: 5, student_name: 'Institute Topper 2', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/2-removebg-preview.png', is_published: 1, order_index: 5 },
  { id: 6, student_name: 'Institute Topper 3', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/3-removebg-preview.png', is_published: 1, order_index: 6 },
  { id: 7, student_name: 'Institute Topper 4', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/4-removebg-preview.png', is_published: 1, order_index: 7 },
  { id: 8, student_name: 'Institute Topper 5', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/5-removebg-preview.png', is_published: 1, order_index: 8 },
  { id: 9, student_name: 'Institute Topper 6', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/6-removebg-preview.png', is_published: 1, order_index: 9 },
  { id: 10, student_name: 'Institute Topper 7', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/7-removebg-preview.png', is_published: 1, order_index: 10 },
  { id: 11, student_name: 'Institute Topper 8', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/8-removebg-preview.png', is_published: 1, order_index: 11 },
  { id: 12, student_name: 'Institute Topper 9', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/9-removebg-preview.png', is_published: 1, order_index: 12 },
  { id: 13, student_name: 'Institute Topper 10', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/10-removebg-preview.png', is_published: 1, order_index: 13 },
  { id: 14, student_name: 'Institute Topper 11', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/11-removebg-preview.png', is_published: 1, order_index: 14 },
  { id: 15, student_name: 'Institute Topper 12', exam_or_class: 'Board & Competitive Achiever', score_or_rank: 'Top Merit', year: 'Classroom Achiever', image_url: '/assets/toppers/12-removebg-preview.png', is_published: 1, order_index: 15 }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 1,
    name: 'Madangir Branch (Main Campus)',
    address: '23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India',
    phone: '+91 7011667297',
    timings: 'Monday–Saturday: 9 AM–5 PM | Sunday: Closed',
    map_url: 'https://maps.google.com/?q=23/663+Basement+DDA+Flats+Madangir+New+Delhi+110062',
    is_active: 1,
    is_verified: 1
  }
];

export const INITIAL_SETTINGS: Record<string, string> = {
  institute_name: 'Ideal Career Institute',
  tagline: 'Igniting Minds, Illuminating Futures.',
  established_year: '1999',
  hero_headline: 'Igniting Minds, Illuminating Futures.',
  hero_subheadline: 'At Ideal Career Institute, we believe in igniting young minds with knowledge and skills, illuminating the path to a bright future. With expert faculty and comprehensive courses, we empower students to excel in commerce, science, humanities, and all entrance exams.',
  credibility_tag: 'Excellence in Education Since 1999',
  stats_toppers: '333',
  stats_students: '1000',
  stats_parents: '500',
  primary_phone: '+91 7011667297',
  primary_whatsapp: '917011667297',
  primary_email: 'info@idealcareerinstitute.in',
  office_address: '23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India',
  office_hours: 'Monday–Saturday: 9 AM–5 PM | Sunday: Closed',
  tech_partner: 'AlgoForce AI'
};
