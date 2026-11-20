import bcrypt from 'bcryptjs';
import { db, initDatabase } from './database';

export function seedDatabase() {
  initDatabase();

  // Check if already seeded
  const userCheck = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
  if (userCheck.count > 0) {
    console.log('Database already initialized. Checking for updates...');
    return;
  }

  console.log('Seeding initial authentic institutional data...');

  // 1. Admin user
  const passwordHash = bcrypt.hashSync('Admin@ICI2026!', 10);
  const insertUser = db.prepare(`
    INSERT INTO admin_users (username, email, password_hash, full_name, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertUser.run('admin', 'admin@idealcareerinstitute.in', passwordHash, 'Institute Director', 'superadmin');

  // 2. Counsellors
  const insertCounsellor = db.prepare(`
    INSERT INTO counsellors (name, email, phone, is_active)
    VALUES (?, ?, ?, ?)
  `);
  insertCounsellor.run('Senior Admission Counsellor', 'counsellor@idealcareerinstitute.in', '+91 7011667297', 1);
  insertCounsellor.run('Academic Guidance Head', 'academic@idealcareerinstitute.in', '+91 7011667297', 1);

  // 3. Branches (Verified Madangir branch + Second branch architecture)
  const insertBranch = db.prepare(`
    INSERT INTO branches (name, address, phone, timings, map_url, is_active, is_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertBranch.run(
    'Madangir Branch (Main Campus)',
    '23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India',
    '+91 7011667297',
    'Monday–Saturday: 9 AM–5 PM | Sunday: Closed',
    'https://maps.google.com/?q=23/663+Basement+DDA+Flats+Madangir+New+Delhi+110062',
    1,
    1
  );
  insertBranch.run(
    'Branch 2 (South Delhi Expansion)',
    'South Delhi Campus — Official address verification in progress by management',
    '+91 7011667297',
    'Monday–Saturday: 9 AM–5 PM | Sunday: Closed',
    '',
    0, // Not displayed as active until verified by management
    0
  );

  // 4. Courses (All 11 authentic courses from institute)
  const insertCourse = db.prepare(`
    INSERT INTO courses (slug, title, category, target_audience, short_description, full_description, eligibility, duration, highlights, icon, is_published, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const courses = [
    {
      slug: 'class-1-12-all-subjects',
      title: 'Class 1–12 All Subjects',
      category: 'School Education',
      target_audience: 'Students in Grades 1 through 12 seeking foundational clarity and board exam excellence.',
      short_description: 'Comprehensive coaching for all subjects from classes 1 to 12 with conceptual clarity and individualized attention.',
      full_description: 'Comprehensive coaching for all subjects from classes 1 to 12. Our experienced faculty ensures a strong foundation and conceptual clarity in each subject. Regular assessments, doubt clearing sessions, and personalized mentoring help students excel academically and build lasting confidence.',
      eligibility: 'Open to school students from Class 1 to Class 12 (CBSE / ICSE / State Boards).',
      duration: 'Full Academic Session (Annual with weekly batches)',
      highlights: JSON.stringify([
        'Complete NCERT & Reference Book coverage',
        'Small batch sizes for individualized attention',
        'Weekly testing & continuous progress evaluation',
        'Regular parent-teacher feedback sessions',
        'Structured revision modules before school & board exams'
      ]),
      icon: 'BookOpen',
      order_index: 1
    },
    {
      slug: 'class-11-12-commerce',
      title: 'Class 11–12 Commerce',
      category: 'School Education',
      target_audience: 'Commerce stream students aspiring for top board scores and future finance/business careers.',
      short_description: 'Specialized coaching in Accountancy, Business Studies, Economics, and Applied Mathematics.',
      full_description: 'In-depth preparation for Senior Secondary Commerce students. We specialize in conceptual clarity for Accountancy, practical analysis for Business Studies, analytical insights for Micro and Macro Economics, and comprehensive problem-solving in Mathematics. Prepares students for both Class 12 Boards and competitive university entries.',
      eligibility: 'Class 11 & Class 12 Commerce students.',
      duration: '1 to 2 Academic Years',
      highlights: JSON.stringify([
        'Step-by-step balance sheet & ledger mastery in Accountancy',
        'Case study resolution techniques for Business Studies',
        'Real-world graph & numerical focus in Economics',
        'Past 10 years board paper solving & mock examinations',
        'Direct foundation for CUET, CA Foundation & BMS'
      ]),
      icon: 'TrendingUp',
      order_index: 2
    },
    {
      slug: 'class-11-12-science',
      title: 'Class 11–12 Science',
      category: 'School Education',
      target_audience: 'Science students aiming for high board percentages and competitive engineering/medical foundation.',
      short_description: 'Rigorous coaching in Physics, Chemistry, Mathematics, and Biology with conceptual and numerical focus.',
      full_description: 'Our Senior Secondary Science program bridges theoretical understanding with mathematical and laboratory concepts. Faculty focuses on numerical problem solving in Physics and Physical Chemistry, reaction mechanisms in Organic Chemistry, and detailed diagrams & physiological concepts in Biology.',
      eligibility: 'Class 11 & Class 12 Science (PCM / PCB / PCMB).',
      duration: '1 to 2 Academic Years',
      highlights: JSON.stringify([
        'Rigorous formula derivations and numerical problem solving',
        'Comprehensive NCERT line-by-line decoding',
        'Integrated board preparation with competitive exam tips',
        'Regular chapter-wise test series with detailed evaluation',
        'Dedicated doubt resolution sessions with senior faculty'
      ]),
      icon: 'Atom',
      order_index: 3
    },
    {
      slug: 'class-11-12-humanities',
      title: 'Class 11–12 Humanities',
      category: 'School Education',
      target_audience: 'Arts and Humanities students targeting top marks in board exams and CUET admissions.',
      short_description: 'Comprehensive coaching in Political Science, History, Geography, Psychology, and Sociology.',
      full_description: 'Our Humanities coaching empowers students with critical thinking, analytical answer writing, and deep historical and geopolitical context. We guide students through effective map work, timeline memorization, and high-scoring essay structures required for top board percentages and university entrance examinations.',
      eligibility: 'Class 11 & Class 12 Humanities students.',
      duration: '1 to 2 Academic Years',
      highlights: JSON.stringify([
        'Structured essay and long-answer framing methodologies',
        'Thorough map practice and source-based question training',
        'Contemporary application of political and economic theories',
        'Chapter-wise key term glossaries and mind maps',
        'Direct alignment with CUET Humanities domain subjects'
      ]),
      icon: 'Landmark',
      order_index: 4
    },
    {
      slug: 'computer-science-digital-marketing',
      title: 'Computer Science & Digital Marketing',
      category: 'Skill Development',
      target_audience: 'Students, young professionals and beginners looking to master programming, web skills, and modern digital marketing.',
      short_description: 'Learn fundamentals of Computer Science and Digital Marketing with hands-on practical projects.',
      full_description: 'Learn the fundamentals of Computer Science and Digital Marketing. Our courses include hands-on projects and real-world applications to prepare you for the future. Led by faculty with practical industry experience, students master coding logic, digital branding, social media strategy, SEO, and content creation.',
      eligibility: 'Open to high school students, college students, and working professionals.',
      duration: '3 to 6 Months (Certificate Program)',
      highlights: JSON.stringify([
        'Programming basics and software engineering principles',
        'Hands-on Social Media Marketing & Meta Ads management',
        'Search Engine Optimization (SEO) & Google Analytics basics',
        'Content strategy, copywriting, and digital campaign planning',
        'Live project portfolio creation for career readiness'
      ]),
      icon: 'Laptop',
      order_index: 5
    },
    {
      slug: 'jee-neet',
      title: 'JEE / NEET Entrance Coaching',
      category: 'Competitive Examinations',
      target_audience: 'Engineering and Medical aspirants targeting IIT-JEE (Main & Advanced) and NEET-UG.',
      short_description: 'Intensive coaching for JEE and NEET with expert faculty and well-structured curriculum.',
      full_description: 'Intensive coaching for JEE and NEET exams. Our expert faculty and well-structured curriculum ensure you are well-prepared to excel in these competitive exams. We place equal emphasis on speed, accuracy, conceptual depth, and time management strategies under exam conditions.',
      eligibility: 'Class 11, 12 students and repeater/dropper candidates.',
      duration: '1 Year / 2 Years / Crash Course',
      highlights: JSON.stringify([
        'Experienced faculty specializing in competitive exam pedagogy',
        'Exhaustive question bank covering past 20 years of JEE & NEET',
        'Periodic All-India level mock test pattern simulation',
        'Speed calculation techniques and shortcut methodologies',
        'One-on-one performance analysis and error log tracking'
      ]),
      icon: 'Target',
      order_index: 6
    },
    {
      slug: 'cuet',
      title: 'CUET (Common University Entrance Test)',
      category: 'Competitive Examinations',
      target_audience: 'Class 12 students seeking admission into Delhi University, BHU, JNU, and central universities.',
      short_description: 'Specialized coaching for CUET focusing on Section 1 Languages, Section 2 Domains, and Section 3 General Test.',
      full_description: 'Specialized coaching for the Common University Entrance Test (CUET). We focus on all essential topics to help you secure admission to top universities. Our curriculum covers Domain Subjects, English/Hindi language comprehension, General Mental Ability, Quantitative Reasoning, and Current Affairs.',
      eligibility: 'Class 12 appearing or passed students.',
      duration: '3 to 6 Months',
      highlights: JSON.stringify([
        'Domain subject syllabus aligned precisely with NCERT Class 12',
        'General Test training: Logical Reasoning, Quant & General Knowledge',
        'Computer-based test (CBT) practice interface',
        'Mock tests designed according to NTA examination guidelines',
        'College preference and admission counselling guidance'
      ]),
      icon: 'GraduationCap',
      order_index: 7
    },
    {
      slug: 'ssc-nda',
      title: 'SSC / NDA Exam Coaching',
      category: 'Competitive Examinations',
      target_audience: 'Candidates aspiring for Central Government services (SSC CGL/CHSL/MTS) and National Defence Academy.',
      short_description: 'Prepare for SSC and NDA exams with our rigorous training programs and detailed guidance.',
      full_description: 'Prepare for SSC and NDA exams with our rigorous training programs. Our experienced instructors provide detailed guidance to help you achieve your career goals. We cover Mathematics, General English, General Science, Current Affairs, and SSB interview orientation basics.',
      eligibility: '10+2 for NDA / 10th, 12th, Graduate depending on specific SSC exam.',
      duration: '6 Months to 1 Year',
      highlights: JSON.stringify([
        'Special focus on Quantitative Aptitude and Reasoning shortcuts',
        'English vocabulary, grammar rules and comprehension drills',
        'Comprehensive General Studies modules with current affairs updates',
        'Full-length timed sectional and full syllabus practice tests',
        'Physical and medical test awareness guidelines for NDA'
      ]),
      icon: 'Shield',
      order_index: 8
    },
    {
      slug: 'banking-ctet',
      title: 'Banking & CTET Preparation',
      category: 'Competitive Examinations',
      target_audience: 'Aspirants targeting IBPS/SBI Bank PO/Clerk and Central Teacher Eligibility Test (CTET Paper 1 & 2).',
      short_description: 'Get ready for Banking and CTET exams with extensive practice and conceptual clarity.',
      full_description: 'Get ready for Banking and CTET exams with our comprehensive courses. We cover all important topics and provide extensive practice to ensure your success. For Banking, we focus on Data Interpretation, Quantitative Aptitude, and Financial Awareness. For CTET, we emphasize Child Development & Pedagogy, Language learning, and Teaching methodologies.',
      eligibility: 'Graduates for Banking; B.Ed / D.El.Ed / aspiring educators for CTET.',
      duration: '4 to 8 Months',
      highlights: JSON.stringify([
        'Child Development and Pedagogy (CDP) deep conceptual coverage',
        'High-speed calculation tricks for Banking Quant & Reasoning',
        'Banking awareness, financial systems, and current events',
        'Previous years solved questions and answer explanation sheets',
        'Weekly full-length mock examinations'
      ]),
      icon: 'Briefcase',
      order_index: 9
    },
    {
      slug: 'rpf-cds',
      title: 'RPF / CDS Preparation',
      category: 'Competitive Examinations',
      target_audience: 'Candidates preparing for Railway Protection Force and Combined Defence Services examinations.',
      short_description: 'Specialized training for RPF and CDS exams to help you excel in competitive selection.',
      full_description: 'Our RPF and CDS coaching programs offer specialized training to help you excel in these exams. We focus on all critical areas to enhance your performance, including General Intelligence, Elementary Mathematics, General Knowledge, and Advanced English comprehension.',
      eligibility: 'Graduates for CDS; 10th/12th/Graduate for RPF Constable/SI.',
      duration: '6 Months',
      highlights: JSON.stringify([
        'Extensive practice of previous years UPSC CDS papers',
        'Targeted arithmetic and reasoning drills for RPF examinations',
        'In-depth Defence, Geography, and Polity study material',
        'Regular test series with negative marking simulation',
        'Mentorship from experienced competitive faculty'
      ]),
      icon: 'Award',
      order_index: 10
    },
    {
      slug: 'cat-mat',
      title: 'CAT / MAT Management Entrance',
      category: 'Competitive Examinations',
      target_audience: 'Graduates and final year students aspiring for premier MBA institutions and management colleges.',
      short_description: 'Achieve success in CAT and MAT exams with strategic coaching in Quant, DILR, and VARC.',
      full_description: 'Achieve success in CAT and MAT exams with our targeted coaching. Our curriculum is designed to provide you with the skills and strategies needed to excel in Quantitative Aptitude, Data Interpretation & Logical Reasoning (DILR), and Verbal Ability & Reading Comprehension (VARC).',
      eligibility: 'Graduates / Final Year Degree Students.',
      duration: '6 Months to 1 Year',
      highlights: JSON.stringify([
        'Strategy-driven approach to VARC passage analysis',
        'Complex puzzle solving and matrix DILR set drills',
        'Shortcut arithmetic, algebra, and geometry problem sets',
        'Percentile boosting strategies and question selection tactics',
        'Group Discussion (GD) and Personal Interview (PI) guidance'
      ]),
      icon: 'Compass',
      order_index: 11
    }
  ];

  for (const c of courses) {
    insertCourse.run(
      c.slug,
      c.title,
      c.category,
      c.target_audience,
      c.short_description,
      c.full_description,
      c.eligibility,
      c.duration,
      c.highlights,
      c.icon,
      1,
      c.order_index
    );
  }

  // 5. Authentic Faculty Members
  const insertFaculty = db.prepare(`
    INSERT INTO faculty (name, designation, subjects, bio, image_url, linkedin_url, twitter_url, is_published, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const facultyMembers = [
    {
      name: 'Mr. Vibhor Gupta',
      designation: 'CEO & Founder',
      subjects: 'Institutional Leadership & Academic Direction',
      bio: 'In a humble beginning, the owner of our institute started his journey in a small, single-room setup. With a passion for education and a vision for growth, he began teaching students on the floor, driven by a deep commitment to providing quality education. Despite the modest start, his dedication and innovative teaching methods soon garnered attention, and the institute began to thrive. Today, his vision has transformed into a reality that surpasses expectations. With two branches that boast fully air-conditioned classrooms, students are provided with a comfortable and conducive learning environment.',
      image_url: '/assets/faculty/team-1.jpg',
      linkedin_url: '',
      twitter_url: '',
      order_index: 1
    },
    {
      name: 'Arpit',
      designation: 'Senior Faculty',
      subjects: 'Mathematics & Science (Classes 8–10)',
      bio: 'With a specialization in Data Science, he teaches Maths and Science to classes 8–10 with exceptional conceptual clarity and practical examples that make challenging concepts effortless for school students.',
      image_url: '/assets/faculty/Arpit sur.jpeg',
      linkedin_url: '',
      twitter_url: '',
      order_index: 2
    },
    {
      name: 'Shreyash Srivastava',
      designation: 'Faculty & Digital Media Head',
      subjects: 'Digital Marketing & Social Media Strategy',
      bio: 'With his great experience in Digital Marketing, he handles all the socials and teaches Digital Marketing at the institute, preparing learners for modern tech and business landscapes.',
      image_url: '/assets/faculty/Shreyash.png',
      linkedin_url: 'https://www.linkedin.com/in/shreyash-srivastava-b46878278/',
      twitter_url: 'https://x.com/Shreyash_sri03',
      order_index: 3
    },
    {
      name: 'Bhavika',
      designation: 'Academic Faculty',
      subjects: 'School Education & Foundational Studies',
      bio: 'Dedicated educator specializing in building solid foundational understanding, student confidence, and disciplined study habits for academic excellence.',
      image_url: '/assets/faculty/Bhavika.jpg',
      linkedin_url: '',
      twitter_url: '',
      order_index: 4
    },
    {
      name: 'Harshit Walecha',
      designation: 'Faculty Member',
      subjects: 'Commerce & Quantitative Studies',
      bio: 'Passionate educator committed to practical problem-solving, structured mentoring, and board exam preparation.',
      image_url: '/assets/faculty/Harshit Walecha.jpg',
      linkedin_url: 'https://www.linkedin.com/in/harshit-walecha-8353a4142/',
      twitter_url: '',
      order_index: 5
    },
    {
      name: 'Kirti Gupta',
      designation: 'Academic Faculty',
      subjects: 'School Curriculum & Guidance',
      bio: 'Experienced in mentoring school students through interactive pedagogy, regular evaluations, and personalized guidance.',
      image_url: '/assets/faculty/Kirti gupta.jpeg',
      linkedin_url: 'https://www.linkedin.com/in/kirti-gupta-068906176/',
      twitter_url: 'https://www.instagram.com/kirttigulhare?igsh=aXdxaGIzdDVwZmg3&utm_source=qr',
      order_index: 6
    },
    {
      name: 'Simran',
      designation: 'Faculty Member',
      subjects: 'Humanities & Academic Mentoring',
      bio: 'Focused on comprehensive student support, analytical writing skills, and conceptual clarity across secondary school courses.',
      image_url: '/assets/faculty/simran.jpg',
      linkedin_url: '',
      twitter_url: '',
      order_index: 7
    }
  ];

  for (const f of facultyMembers) {
    insertFaculty.run(f.name, f.designation, f.subjects, f.bio, f.image_url, f.linkedin_url, f.twitter_url, 1, f.order_index);
  }

  // 6. Authentic Toppers Gallery (All 15 official topper photos from institute)
  const insertTopper = db.prepare(`
    INSERT INTO toppers (student_name, exam_or_class, score_or_rank, year, image_url, is_published, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const toppersList = [
    { name: 'Aditya Mishra', exam: 'Academic Excellence & Topper', score: 'Top Ranker', year: 'Verified Alumnus', img: '/assets/toppers/Aditya_Mishra-removebg-preview.png', order: 1 },
    { name: 'AAchin', exam: 'Board Examination Star', score: 'Top Ranker', year: 'Verified Alumnus', img: '/assets/toppers/AAchin.png', order: 2 },
    { name: 'Kumar Sriniwas', exam: 'Academic Excellence & Topper', score: 'Top Ranker', year: 'Verified Alumnus', img: '/assets/toppers/Kumar Sriniwas.png', order: 3 },
    { name: 'Institute Topper 1', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/1-removebg-preview.png', order: 4 },
    { name: 'Institute Topper 2', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/2-removebg-preview.png', order: 5 },
    { name: 'Institute Topper 3', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/3-removebg-preview.png', order: 6 },
    { name: 'Institute Topper 4', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/4-removebg-preview.png', order: 7 },
    { name: 'Institute Topper 5', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/5-removebg-preview.png', order: 8 },
    { name: 'Institute Topper 6', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/6-removebg-preview.png', order: 9 },
    { name: 'Institute Topper 7', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/7-removebg-preview.png', order: 10 },
    { name: 'Institute Topper 8', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/8-removebg-preview.png', order: 11 },
    { name: 'Institute Topper 9', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/9-removebg-preview.png', order: 12 },
    { name: 'Institute Topper 10', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/10-removebg-preview.png', order: 13 },
    { name: 'Institute Topper 11', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/11-removebg-preview.png', order: 14 },
    { name: 'Institute Topper 12', exam: 'Board & Competitive Achiever', score: 'Top Merit', year: 'Classroom Achiever', img: '/assets/toppers/12-removebg-preview.png', order: 15 },
  ];

  for (const t of toppersList) {
    insertTopper.run(t.name, t.exam, t.score, t.year, t.img, 1, t.order);
  }

  // 7. Authentic Gallery (Classrooms and Learning Facilities)
  const insertGallery = db.prepare(`
    INSERT INTO gallery (title, category, image_url, description, is_published, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const galleryItems = [
    { title: 'Air-Conditioned Modern Classroom', category: 'Classrooms', img: '/assets/institute/CR -1.jpeg', desc: 'Fully air-conditioned, comfortable learning environment equipped for focused learning.', order: 1 },
    { title: 'Interactive Lecture Hall', category: 'Classrooms', img: '/assets/institute/CR -4.jpeg', desc: 'Conducive batch setup with optimal teacher-student engagement.', order: 2 },
    { title: 'Academic Session in Progress', category: 'Classrooms', img: '/assets/institute/about-1.jpeg', desc: 'Expert educators delivering structured conceptual lectures.', order: 3 },
    { title: 'Study Space & Doubt Desk', category: 'Classrooms', img: '/assets/institute/Classroom 1  (1).jpeg', desc: 'Dedicated space for focused problem solving and group discussions.', order: 4 },
    { title: 'Lecture Facility Overview', category: 'Classrooms', img: '/assets/institute/Classroom 1  (2).jpeg', desc: 'State-of-the-art coaching facilities at the Madangir campus.', order: 5 },
  ];

  for (const g of galleryItems) {
    insertGallery.run(g.title, g.category, g.img, g.desc, 1, g.order);
  }

  // 8. Website Settings
  const insertSetting = db.prepare(`
    INSERT INTO website_settings (key, value)
    VALUES (?, ?)
  `);

  const settings: Record<string, string> = {
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
    facebook_url: 'https://www.facebook.com/profile.php?id=100095219029967',
    instagram_url: 'https://www.instagram.com/kirttigulhare?igsh=aXdxaGIzdDVwZmg3&utm_source=qr',
    linkedin_url: 'https://www.linkedin.com/in/shreyash-srivastava-b46878278/',
    twitter_url: 'https://x.com/Shreyash_sri03',
    tech_partner: 'AlgoForce AI'
  };

  for (const [k, v] of Object.entries(settings)) {
    insertSetting.run(k, v);
  }

  // 9. Initial Verified Testimonials empty state / real feedback showcase
  // As explicitly stated: "Never generate fake parent reviews. If verified testimonial text is unavailable, create an attractive empty state for management to populate."
  // We leave testimonials table clean for real entries via admin panel.

  // 10. Initial system audit log
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertAudit.run('System', 'INITIAL_SEED', 'SYSTEM', '1', 'Initial database migration and verified institutional data populated successfully.');

  console.log('Seeding completed successfully!');
}

if (require.main === module) {
  seedDatabase();
}
