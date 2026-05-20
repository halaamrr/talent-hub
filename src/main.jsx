import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpsumOkjHtWIHhORyBR-CpMgLpwQ7F4TaOGCt6IIm27wkahmVSX2Yvvka9nfh0y1J2MkV-Cm3vwKzOeou9s-7fd1VMzDPbD4KMkeGCULL5sSXWP1VNTh7PNpD2dSr5zC1AnpPTScucqQFGtdWUcK5pSNXEYGiyUseP1fEw-hiG8WGAvzRhKoBrJYvN_QAhgw4xBDfoDbtYx4pLqslbrxB-f3pDrLPMr8j03Y_MSUM6Udbt6P1wK_9ZGsvp7D3NffQevFS7ta_roRsn',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8rc5vA4O3G_4BxS_kJbDLZ5fcf_rmqsNq_1wBJHrru_a_mOxoQpbRYg_xCy9B0mTM5BLO-xgCzNeuzQNI1zgiwtYAQOJ8kgi3dSN6vDogLXP5BQx7LXExOHsEUaJb7OwNvPuvGeHHOHKCvEPZOaJh1UtXFBZtjWi81sid-3_UEhAmOcqZLX8jVEXpR6jfX1VFMFzoPTiscb28chmNk550yCThS4IrLzz5N5AaVTpH-bcbRRW1lH7wpsRZOcDE_ZNVEvaioTzmpvfZ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_NKCwpjOxamFQFOALpvotgnGCODlvDRHRebdEbTNeBMEUTDSUqQghh2oNZkOZpyYlVTFC6s9QKej6EJKgG9QBlQ0nvNXk985SqOwOGF5uGUPE2XiQv62SjpqDLohEIKhIo9Ue8EQy64dZ8ho7mRttLwuWQXZAUdH8H-uCCvq13BdyiSLO_zYdhObqCmYTYmLK9lz-vZTDXTq8nF2Gp2k73Jnyjk4NUAUkhGTxhCFjjx2bhpPycxKtmbbQf_lIECmcTFAD9HqQvnH3',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC64nA23f_bPEPEtQVS15bVSwbHaBmEGJ-g0xBI5MUCwJV7gW6-S1a929IxAAK9gpOZwbjVbboZceimF_j75NtwBNtEZ1IWzv8zyJsx_Kmhwl48S5d-ZDgikk7x8pl5Iv9Qohc3TaPVrsWwC5Eui0pShdrn2xgRJah2OXIpAJe_vI9vn2yi1eARsaMkZDsPyNjclCDStxOmvlu7M8Vm6_xw00AvvH1m84TFaRNrzusAKgoJDD2rjBjZBoUIDNf_tp4pnKTdOV1zeIsL'
];

const initialCourses = [
  { id: 1, code: 'MET 4999', name: 'Bachelor Project', instructors: ['mervat@guc.edu.eg'] },
  { id: 2, code: 'CSEN 704', name: 'Software Engineering', instructors: ['aya.salama@guc.edu.eg'] },
  { id: 3, code: 'DMET 706', name: 'Data Mining', instructors: ['nada.ibrahim@guc.edu.eg'] },
  { id: 4, code: 'CSEN 601', name: 'Computer Architecture', instructors: [] },
  { id: 5, code: 'CSEN 603', name: 'Algorithms', instructors: ['sherif.hassan@guc.edu.eg'] },
  { id: 6, code: 'DMET 502', name: 'Computer Interaction', instructors: ['salma.wahdan@guc.edu.eg'] },
  { id: 7, code: 'NETW 701', name: 'Network Security', instructors: ['hany.mourad@guc.edu.eg'] }
];

const TEST_OTP = '123456';
const ORIGINAL_ADMIN_EMAIL = 'admin@guc.edu.eg';
const SAMPLE_PDF_DATA_URL = 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9Db3VudCAwID4+CmVuZG9iagp0cmFpbGVyCjw8IC9Sb290IDEgMCBSID4+CiUlRU9G';

const initialPeople = [
  { id: 1, role: 'Student', fullName: 'Alex Miller', email: 'alex.miller@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['React', 'Python', 'Computer Vision'], projects: 4, linkedIn: 'linkedin.com/in/alex-miller', avatar: 'AM' },
  { id: 2, role: 'Student', fullName: 'Sarah Rogers', email: 'sarah.rogers@student.guc.edu.eg', password: 'student123', active: true, major: 'Architecture', skills: ['CAD', 'Sustainability', 'UX'], projects: 3, linkedIn: 'linkedin.com/in/sarah-rogers', avatar: 'SR' },
  { id: 3, role: 'Course Instructor', fullName: 'Dr. Aya Salama', email: 'aya.salama@guc.edu.eg', password: 'instructor123', active: true, bio: 'Software engineering instructor focused on requirements and product quality.', interests: 'Requirements, UX evaluation, project governance', education: 'PhD Computer Science', courses: ['Software Engineering', 'Bachelor Project'], avatar: 'AS' },
  { id: 4, role: 'Course Instructor', fullName: 'Dr. Nada Ibrahim', email: 'nada.ibrahim@guc.edu.eg', password: 'instructor123', active: true, bio: 'Researcher in data-driven learning systems.', interests: 'Data Mining, AI, educational analytics', education: 'PhD Data Science', courses: ['Data Mining', 'Bachelor Project'], avatar: 'NI' },
  { id: 5, role: 'Course Instructor', fullName: 'Dr. Mervat Abuelkheir', email: 'mervat@guc.edu.eg', password: 'instructor123', active: true, bio: 'Bachelor project coordinator focused on thesis quality and academic supervision.', interests: 'Thesis supervision, HCI, educational platforms', education: 'PhD Information Systems', courses: ['Bachelor Project'], avatar: 'MA' },
  { id: 6, role: 'Student', fullName: 'Mona Adel', email: 'mona.adel@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['React', 'UI Testing', 'Node.js'], projects: 2, linkedIn: 'linkedin.com/in/mona-adel', avatar: 'MA' },
  { id: 7, role: 'Student', fullName: 'Omar Hassan', email: 'omar.hassan@student.guc.edu.eg', password: 'student123', active: true, major: 'Computer Science', skills: ['Java', 'Spring', 'SQL'], projects: 2, linkedIn: 'linkedin.com/in/omar-hassan', avatar: 'OH' },
  { id: 8, role: 'Student', fullName: 'Lina Farouk', email: 'lina.farouk@student.guc.edu.eg', password: 'student123', active: true, major: 'Data Science', skills: ['Python', 'R', 'Tableau'], projects: 2, linkedIn: 'linkedin.com/in/lina-farouk', avatar: 'LF' },
  { id: 9, role: 'Student', fullName: 'Youssef Nader', email: 'youssef.nader@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['Flutter', 'Firebase', 'UX'], projects: 1, linkedIn: 'linkedin.com/in/youssef-nader', avatar: 'YN' },
  { id: 10, role: 'Student', fullName: 'Farida Samir', email: 'farida.samir@student.guc.edu.eg', password: 'student123', active: true, major: 'Architecture', skills: ['CAD', 'GIS', 'Sustainability'], projects: 2, linkedIn: 'linkedin.com/in/farida-samir', avatar: 'FS' },
  { id: 11, role: 'Student', fullName: 'Karim Younes', email: 'karim.younes@student.guc.edu.eg', password: 'student123', active: true, major: 'Computer Science', skills: ['C++', 'Algorithms', 'React'], projects: 1, linkedIn: 'linkedin.com/in/karim-younes', avatar: 'KY' },
  { id: 12, role: 'Student', fullName: 'Nadine Lotfy', email: 'nadine.lotfy@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['Product Design', 'Figma', 'Research'], projects: 1, linkedIn: 'linkedin.com/in/nadine-lotfy', avatar: 'NL' },
  { id: 13, role: 'Student', fullName: 'Tarek Amin', email: 'tarek.amin@student.guc.edu.eg', password: 'student123', active: true, major: 'Networks', skills: ['Cybersecurity', 'Linux', 'Python'], projects: 1, linkedIn: 'linkedin.com/in/tarek-amin', avatar: 'TA' },
  { id: 14, role: 'Student', fullName: 'Jana Fouad', email: 'jana.fouad@student.guc.edu.eg', password: 'student123', active: true, major: 'Data Science', skills: ['Machine Learning', 'Python', 'UX'], projects: 1, linkedIn: 'linkedin.com/in/jana-fouad', avatar: 'JF' },
  { id: 15, role: 'Student', fullName: 'Malak Zaki', email: 'malak.zaki@student.guc.edu.eg', password: 'student123', active: true, major: 'Computer Science', skills: ['React', 'Testing', 'Accessibility'], projects: 1, linkedIn: 'linkedin.com/in/malak-zaki', avatar: 'MZ' },
  { id: 19, role: 'Course Instructor', fullName: 'Dr. Sherif Hassan', email: 'sherif.hassan@guc.edu.eg', password: 'instructor123', active: true, bio: 'Algorithms instructor focused on visual explanations, tutoring systems and complexity analysis.', interests: 'Algorithms, tutoring systems, assessment design', education: 'PhD Computer Science', courses: ['Algorithms'], avatar: 'SH' },
  { id: 20, role: 'Course Instructor', fullName: 'Dr. Salma Wahdan', email: 'salma.wahdan@guc.edu.eg', password: 'instructor123', active: true, bio: 'Human-computer interaction instructor studying usable academic tools and design research methods.', interests: 'HCI, accessibility, design systems', education: 'PhD Human-Computer Interaction', courses: ['Computer Interaction'], avatar: 'SW' },
  { id: 21, role: 'Course Instructor', fullName: 'Dr. Hany Mourad', email: 'hany.mourad@guc.edu.eg', password: 'instructor123', active: true, bio: 'Network security instructor guiding secure systems, threat modeling and lab simulation projects.', interests: 'Network security, systems labs, threat modeling', education: 'PhD Networks', courses: ['Network Security'], avatar: 'HM' },
  { id: 22, role: 'Student', fullName: 'Mariam Hassan', email: 'mariam.hassan@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['React', 'OCR', 'Research'], projects: 2, linkedIn: 'linkedin.com/in/mariam-hassan', avatar: 'MH' },
  { id: 23, role: 'Student', fullName: 'Ziad Mansour', email: 'ziad.mansour@student.guc.edu.eg', password: 'student123', active: true, major: 'Computer Science', skills: ['Algorithms', 'TypeScript', 'Tutoring'], projects: 1, linkedIn: 'linkedin.com/in/ziad-mansour', avatar: 'ZM' },
  { id: 24, role: 'Student', fullName: 'Noor El Din', email: 'noor.eldin@student.guc.edu.eg', password: 'student123', active: true, major: 'Media Engineering', skills: ['AR', 'Figma', 'Usability Testing'], projects: 1, linkedIn: 'linkedin.com/in/noor-eldin', avatar: 'NE' },
  { id: 25, role: 'Student', fullName: 'Sara Khattab', email: 'sara.khattab@student.guc.edu.eg', password: 'student123', active: true, major: 'Computer Engineering', skills: ['IoT', 'Embedded Systems', 'Dashboards'], projects: 1, linkedIn: 'linkedin.com/in/sara-khattab', avatar: 'SK' },
  { id: 26, role: 'Student', fullName: 'Yara Magdy', email: 'yara.magdy@student.guc.edu.eg', password: 'student123', active: true, major: 'Data Science', skills: ['NLP', 'Python', 'Analytics'], projects: 1, linkedIn: 'linkedin.com/in/yara-magdy', avatar: 'YM' },
  { id: 27, role: 'Student', fullName: 'Hassan Radwan', email: 'hassan.radwan@student.guc.edu.eg', password: 'student123', active: false, major: 'Networks', skills: ['Linux', 'Monitoring', 'Security'], projects: 1, linkedIn: 'linkedin.com/in/hassan-radwan', avatar: 'HR' },
  { id: 16, role: 'Employer', fullName: 'NileTech Labs', email: 'talent@niletech.com', password: 'employer123', active: true, status: 'Accepted', companyBio: 'Product studio hiring students with strong portfolio evidence.', address: 'Cairo Festival City', contactType: 'phone', contact: '02111222222', mapLocation: 'Cairo Festival City, Cairo, Egypt', avatar: 'NL' },
  { id: 18, role: 'Employer', fullName: 'QuantumWorks', email: 'careers@quantumworks.ai', password: 'employer123', active: true, status: 'Accepted', companyBio: 'Applied AI research studio.', address: 'Smart Village', contactType: 'phone', contact: '02555778800', mapLocation: 'Smart Village, Giza, Egypt', avatar: 'QW' },
  { id: 28, role: 'Employer', fullName: 'Cairo Mobility Studio', email: 'hiring@cairomobility.com', password: 'employer123', active: true, status: 'Accepted', companyBio: 'Urban mobility team hiring interns for maps, routing and transit analytics.', address: 'Downtown Cairo', contactType: 'email', contact: 'hiring@cairomobility.com', mapLocation: 'Downtown Cairo, Egypt', avatar: 'CM' },
  { id: 29, role: 'Employer', fullName: 'MedVision Analytics', email: 'students@medvision.ai', password: 'employer123', active: true, status: 'Accepted', companyBio: 'Health analytics company looking for explainable AI and dashboard projects.', address: 'New Cairo', contactType: 'phone', contact: '01099887766', mapLocation: 'New Cairo, Egypt', avatar: 'MV' },
  { id: 30, role: 'Employer', fullName: 'UrbanGrid Systems', email: 'verify@urbangrid.io', password: 'employer123', active: true, status: 'Pending', companyBio: 'Smart infrastructure startup pending administrator verification.', address: 'Maadi Technology Park', contactType: 'email', contact: 'verify@urbangrid.io', mapLocation: 'Maadi, Cairo, Egypt', avatar: 'UG' },
  { id: 17, role: 'Administrator', fullName: 'Platform Admin', email: 'admin@guc.edu.eg', password: 'admin123', active: true, avatar: 'PA' },
  { id: 31, role: 'Administrator', fullName: 'Quality Admin', email: 'quality.admin@guc.edu.eg', password: 'admin123', active: true, avatar: 'QA' }
];

const initialProjects = [
  { id: 1, title: 'Autonomous Drone Grid', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Alex Miller', createdAt: '2026-04-10', rating: 4.8, public: true, active: true, favorite: false, github: 'https://github.com/alex/drone-grid', report: 'Distributed drone coordination with resilient planning, route simulation and a lightweight React dashboard for monitoring fleet activity across test zones.', demo: 'https://demo.example/drone', languages: ['Python', 'React'], image: images[1], flagged: false, collaborators: ['Mona Adel'], instructorInvites: ['Dr. Aya Salama'], comments: ['Excellent requirements traceability.'] },
  { id: 4, title: 'Smart Campus Thesis Portal', course: 'Bachelor Project', instructor: 'Dr. Mervat Abuelkheir', creator: 'Alex Miller', createdAt: '2026-04-26', rating: 0, public: false, active: true, favorite: false, github: 'https://github.com/alex/campus-thesis-portal', report: 'A bachelor project prototype for managing thesis submissions, final draft visibility and instructor review workflows inside a university portfolio environment.', demo: 'https://demo.example/thesis-portal', languages: ['React', 'CSS'], image: images[0], flagged: false, collaborators: [], instructorInvites: ['Dr. Mervat Abuelkheir'], comments: [] },
  { id: 2, title: 'Sustainable Urban Hub', course: 'Bachelor Project', instructor: 'Dr. Mervat Abuelkheir', creator: 'Sarah Rogers', createdAt: '2026-03-24', rating: 4.6, public: true, active: true, favorite: true, github: 'https://github.com/sarah/urban-hub', report: 'A portfolio-ready design research platform documenting the design rationale, stakeholder interviews, environmental goals and final architecture proposal.', demo: 'https://demo.example/urban', languages: ['JavaScript', 'Figma'], image: images[2], flagged: false, collaborators: [], instructorInvites: ['Dr. Mervat Abuelkheir'], comments: [] },
  { id: 3, title: 'Predictive Health Analysis', course: 'Data Mining', instructor: 'Dr. Nada Ibrahim', creator: 'Lina Farouk', createdAt: '2026-02-18', rating: 4.9, public: true, active: true, favorite: false, github: 'https://github.com/lina/health-analysis', report: 'Risk prediction from anonymized wearable datasets with model comparison, evaluation metrics and explainability notes for medical reviewers.', demo: 'https://demo.example/health', languages: ['Python', 'R'], image: images[3], flagged: false, collaborators: ['Jana Fouad'], instructorInvites: ['Dr. Nada Ibrahim'], comments: ['Strong experiment design.'] },
  { id: 5, title: 'Campus Navigation AR', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Mona Adel', createdAt: '2026-03-30', rating: 4.3, public: true, active: true, favorite: false, github: 'https://github.com/mona/campus-ar', report: 'Mobile-first AR wayfinding prototype for navigating large campus buildings with collaborative route annotations.', demo: 'https://demo.example/campus-ar', languages: ['React', 'Three.js'], image: images[1], flagged: false, collaborators: ['Omar Hassan'], instructorInvites: ['Dr. Aya Salama'], comments: [] },
  { id: 6, title: 'Secure Exam Browser', course: 'Computer Architecture', instructor: 'Not assigned', creator: 'Omar Hassan', createdAt: '2026-03-14', rating: 4.1, public: true, active: true, favorite: false, github: 'https://github.com/omar/exam-browser', report: 'A controlled browser prototype for exam sessions with local monitoring states, device checks and accessible lock-screen flows.', demo: 'https://demo.example/exam-browser', languages: ['Java', 'React'], image: images[2], flagged: false, collaborators: ['Tarek Amin'], instructorInvites: [], comments: [] },
  { id: 7, title: 'Green Roof Planner', course: 'Bachelor Project', instructor: 'Dr. Mervat Abuelkheir', creator: 'Farida Samir', createdAt: '2026-04-02', rating: 4.7, public: true, active: true, favorite: false, github: 'https://github.com/farida/green-roof-planner', report: 'Bachelor thesis prototype for evaluating building roof capacity, planting plans and sustainability tradeoffs.', demo: 'https://demo.example/green-roof', languages: ['JavaScript', 'GIS'], image: images[0], flagged: false, collaborators: [], instructorInvites: ['Dr. Mervat Abuelkheir'], comments: [] },
  { id: 8, title: 'Portfolio Accessibility Audit', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Malak Zaki', createdAt: '2026-04-18', rating: 4.4, public: true, active: true, favorite: false, github: 'https://github.com/malak/a11y-audit', report: 'Audit dashboard that checks portfolio pages for semantic labels, keyboard flow and visual contrast issues.', demo: 'https://demo.example/a11y-audit', languages: ['React', 'Testing'], image: images[3], flagged: false, collaborators: ['Alex Miller'], instructorInvites: ['Dr. Aya Salama'], comments: [] },
  { id: 9, title: 'Internship Matcher', course: 'Data Mining', instructor: 'Dr. Nada Ibrahim', creator: 'Jana Fouad', createdAt: '2026-01-29', rating: 4.2, public: true, active: true, favorite: false, github: 'https://github.com/jana/internship-matcher', report: 'Recommendation prototype that ranks internships against student skills and project evidence using transparent scoring.', demo: 'https://demo.example/matcher', languages: ['Python', 'React'], image: images[2], flagged: false, collaborators: ['Lina Farouk'], instructorInvites: ['Dr. Nada Ibrahim'], comments: [] },
  { id: 10, title: 'Network Lab Visualizer', course: 'Computer Architecture', instructor: 'Not assigned', creator: 'Tarek Amin', createdAt: '2026-02-06', rating: 4.0, public: true, active: true, favorite: false, github: 'https://github.com/tarek/network-visualizer', report: 'Interactive visualization of packet routing, subnet behavior and classroom network experiments.', demo: 'https://demo.example/network-lab', languages: ['Python', 'D3'], image: images[1], flagged: false, collaborators: [], instructorInvites: [], comments: [] },
  { id: 11, title: 'Design Critique Board', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Nadine Lotfy', createdAt: '2026-04-08', rating: 4.5, public: true, active: true, favorite: false, github: 'https://github.com/nadine/critique-board', report: 'Collaborative critique board for project teams to structure peer review comments and instructor feedback.', demo: 'https://demo.example/critique', languages: ['React', 'Figma'], image: images[0], flagged: false, collaborators: ['Youssef Nader'], instructorInvites: ['Dr. Aya Salama'], comments: [] },
  { id: 12, title: 'Event Crowd Forecast', course: 'Data Mining', instructor: 'Dr. Nada Ibrahim', creator: 'Karim Younes', createdAt: '2026-02-27', rating: 4.1, public: false, active: true, favorite: false, github: 'https://github.com/karim/crowd-forecast', report: 'Forecasting prototype for campus event attendance using historical registrations and venue constraints.', demo: 'https://demo.example/crowd', languages: ['Python', 'SQL'], image: images[3], flagged: false, collaborators: [], instructorInvites: ['Dr. Nada Ibrahim'], comments: [] },
  { id: 13, title: 'Mobile Studio Planner', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Youssef Nader', createdAt: '2026-03-08', rating: 4.0, public: true, active: true, favorite: false, github: 'https://github.com/youssef/studio-planner', report: 'Mobile workflow for planning studio sessions, assigning tasks and tracking project materials.', demo: 'https://demo.example/studio', languages: ['Flutter', 'Firebase'], image: images[2], flagged: false, collaborators: ['Farida Samir'], instructorInvites: ['Dr. Aya Salama'], comments: [] },
  { id: 14, title: 'CrowdSafe Evacuation Planner', course: 'Computer Interaction', instructor: 'Dr. Salma Wahdan', creator: 'Mariam Hassan', createdAt: '2026-04-29', rating: 4.6, public: true, active: true, favorite: false, github: 'https://github.com/mariam/crowdsafe', report: 'Interactive evacuation planning prototype combining persona research, route clarity tests and a dashboard for comparing safety instructions across crowded venues.', demo: 'https://demo.example/crowdsafe', languages: ['React', 'D3'], image: images[1], flagged: false, collaborators: ['Noor El Din'], instructorInvites: ['Dr. Salma Wahdan'], comments: ['Strong usability evidence.'], reviews: [{ instructor: 'Dr. Salma Wahdan', instructorEmail: 'salma.wahdan@guc.edu.eg', rating: 5, comment: 'Excellent scenario coverage and clear test protocol.', createdAt: '2026-05-04T10:00:00.000Z' }] },
  { id: 15, title: 'Algorithm Tutor Studio', course: 'Algorithms', instructor: 'Dr. Sherif Hassan', creator: 'Ziad Mansour', createdAt: '2026-04-20', rating: 4.3, public: true, active: true, favorite: false, github: 'https://github.com/ziad/algorithm-tutor', report: 'Adaptive tutoring tool that visualizes graph algorithms, records attempts and explains time complexity with progressive hints.', demo: 'https://demo.example/algorithm-tutor', languages: ['TypeScript', 'React'], image: images[0], flagged: false, collaborators: ['Karim Younes'], instructorInvites: ['Dr. Sherif Hassan'], comments: ['Hint sequence is easy to follow.'], reviews: [{ instructor: 'Dr. Sherif Hassan', instructorEmail: 'sherif.hassan@guc.edu.eg', rating: 4, comment: 'Good scaffolding; add more edge-case exercises.', createdAt: '2026-05-03T13:20:00.000Z' }] },
  { id: 16, title: 'Phishing Lab Simulator', course: 'Network Security', instructor: 'Dr. Hany Mourad', creator: 'Tarek Amin', createdAt: '2026-04-16', rating: 3.8, public: true, active: true, favorite: false, github: 'https://github.com/tarek/phishing-lab', report: 'Controlled phishing-awareness lab with safe email templates, detection scoring and debrief notes for cybersecurity classes.', demo: 'https://demo.example/phishing-lab', languages: ['Python', 'React'], image: images[3], flagged: true, flagReason: 'Needs clearer statement that all simulations are safe and consent-based.', flaggedBy: 'Dr. Hany Mourad', flaggedAt: '2026-05-10T09:00:00.000Z', appealDeadline: '2026-05-12T09:00:00.000Z', collaborators: ['Hassan Radwan'], instructorInvites: ['Dr. Hany Mourad'], comments: ['Flagged for policy wording clarification.'] },
  { id: 17, title: 'Dorm Energy Monitor', course: 'Computer Architecture', instructor: 'Not assigned', creator: 'Sara Khattab', createdAt: '2026-03-22', rating: 0, public: true, active: true, favorite: false, github: 'https://github.com/sara/dorm-energy', report: 'Embedded sensor prototype for estimating dorm energy consumption and sending weekly dashboards to residents.', demo: 'https://demo.example/dorm-energy', languages: ['C', 'React'], image: images[2], flagged: false, collaborators: [], instructorInvites: [], comments: [] },
  { id: 18, title: 'AI Study Planner', course: 'Data Mining', instructor: 'Dr. Nada Ibrahim', creator: 'Yara Magdy', createdAt: '2026-03-19', rating: 4.1, public: true, active: false, favorite: false, github: 'https://github.com/yara/ai-study-planner', report: 'NLP planner that converts course deadlines and student habits into a weekly study schedule with explainable recommendations.', demo: 'https://demo.example/study-planner', languages: ['Python', 'React'], image: images[1], flagged: false, collaborators: ['Jana Fouad'], instructorInvites: ['Dr. Nada Ibrahim'], comments: ['Temporarily deactivated by admin pending data-source clarification.'] },
  { id: 19, title: 'AR Museum Guide', course: 'Computer Interaction', instructor: 'Dr. Salma Wahdan', creator: 'Noor El Din', createdAt: '2026-04-05', rating: 4.7, public: true, active: true, favorite: false, github: 'https://github.com/noor/ar-museum-guide', report: 'AR walkthrough for museum exhibits with visitor testing, accessible captions and interaction states for low-light galleries.', demo: 'https://demo.example/ar-museum', languages: ['Unity', 'Figma'], image: images[2], flagged: false, collaborators: ['Mariam Hassan'], instructorInvites: ['Dr. Salma Wahdan'], comments: ['Excellent accessibility notes.'], reviews: [{ instructor: 'Dr. Salma Wahdan', instructorEmail: 'salma.wahdan@guc.edu.eg', rating: 5, comment: 'The testing plan is thoughtful and well documented.', createdAt: '2026-05-05T15:00:00.000Z' }] },
  { id: 20, title: 'Faculty Load Balancer', course: 'Software Engineering', instructor: 'Dr. Aya Salama', creator: 'Karim Younes', createdAt: '2026-04-14', rating: 4.2, public: false, active: true, favorite: false, github: 'https://github.com/karim/faculty-load', report: 'Requirements-driven scheduling prototype for distributing advising load across instructors with audit trails and fairness checks.', demo: 'https://demo.example/faculty-load', languages: ['React', 'SQL'], image: images[0], flagged: false, collaborators: ['Ziad Mansour'], instructorInvites: ['Dr. Aya Salama'], comments: [] },
  { id: 21, title: 'Marketplace UX Redesign', course: 'Computer Interaction', instructor: 'Dr. Salma Wahdan', creator: 'Nadine Lotfy', createdAt: '2026-02-22', rating: 4.0, public: true, active: true, favorite: false, github: 'https://github.com/nadine/marketplace-ux', report: 'Design research and prototype for improving marketplace checkout trust, product comparison and accessibility.', demo: 'https://demo.example/marketplace-ux', languages: ['Figma', 'React'], image: images[3], flagged: true, flagReason: 'Copyright concern around imported product imagery.', flaggedBy: 'Platform Admin', flaggedAt: '2026-05-09T08:30:00.000Z', appealDeadline: '2026-05-10T08:30:00.000Z', appeal: 'All product images were replaced with original placeholders and sources are documented.', collaborators: [], instructorInvites: ['Dr. Salma Wahdan'], comments: ['Appeal submitted by student.'] },
  { id: 22, title: 'Thesis Archive OCR', course: 'Bachelor Project', instructor: 'Dr. Mervat Abuelkheir', creator: 'Mariam Hassan', createdAt: '2026-05-01', rating: 0, public: false, active: true, favorite: false, github: 'https://github.com/mariam/thesis-ocr', report: 'Bachelor thesis prototype that extracts metadata from scanned thesis PDFs and lets coordinators search archived work.', demo: 'https://demo.example/thesis-ocr', languages: ['Python', 'React'], image: images[0], flagged: false, collaborators: [], instructorInvites: ['Dr. Mervat Abuelkheir'], comments: [] }
];

const initialTasks = [
  { id: 1, projectId: 1, title: 'Finalize API contract', assignee: 'Alex Miller', assignedBy: 'Alex Miller', status: 'Pending', deadline: '2026-05-08', feedback: 'Define failure cases clearly.' },
  { id: 2, projectId: 1, title: 'Record demo video', assignee: 'Mona Adel', assignedBy: 'Alex Miller', status: 'Post-poned', deadline: '2026-05-10', feedback: '' },
  { id: 3, projectId: 2, title: 'Upload final thesis', assignee: 'Sarah Rogers', assignedBy: 'Sarah Rogers', status: 'Completed', deadline: '2026-05-03', feedback: 'Final draft approved.' },
  { id: 4, projectId: 4, title: 'Polish final thesis viewer', assignee: 'Alex Miller', assignedBy: 'Alex Miller', status: 'Pending', deadline: '2026-05-12', feedback: '' },
  { id: 5, projectId: 5, title: 'Validate route overlay', assignee: 'Omar Hassan', assignedBy: 'Mona Adel', status: 'Pending', deadline: '2026-05-09', feedback: '' },
  { id: 6, projectId: 7, title: 'Prepare sustainability appendix', assignee: 'Farida Samir', assignedBy: 'Farida Samir', status: 'Completed', deadline: '2026-05-01', feedback: 'Appendix format approved.' },
  { id: 7, projectId: 14, title: 'Run hallway evacuation usability test', assignee: 'Noor El Din', assignedBy: 'Mariam Hassan', status: 'Pending', deadline: '2026-05-14', feedback: 'Add pre-test consent notes.' },
  { id: 8, projectId: 15, title: 'Add Dijkstra edge-case questions', assignee: 'Ziad Mansour', assignedBy: 'Ziad Mansour', status: 'Post-poned', deadline: '2026-05-18', feedback: 'Prioritize disconnected graph examples.' },
  { id: 9, projectId: 16, title: 'Rewrite consent disclaimer', assignee: 'Tarek Amin', assignedBy: 'Tarek Amin', status: 'Pending', deadline: '2026-05-12', feedback: 'This resolves the active flag concern.' },
  { id: 10, projectId: 18, title: 'Document dataset source', assignee: 'Yara Magdy', assignedBy: 'Yara Magdy', status: 'Pending', deadline: '2026-05-13', feedback: 'Admin lock remains until source is clarified.' },
  { id: 11, projectId: 19, title: 'Caption low-light gallery interactions', assignee: 'Mariam Hassan', assignedBy: 'Noor El Din', status: 'Completed', deadline: '2026-05-02', feedback: 'Good accessibility improvement.' },
  { id: 12, projectId: 22, title: 'Upload OCR evaluation appendix', assignee: 'Mariam Hassan', assignedBy: 'Mariam Hassan', status: 'Pending', deadline: '2026-05-16', feedback: '' }
];

const initialInternships = [
  { id: 1, title: 'Frontend Engineering Intern', company: 'NileTech Labs', employerEmail: 'talent@niletech.com', details: 'React dashboards for portfolio analytics.', skills: ['React', 'CSS'], duration: '3 months', deadline: '2026-05-21', languages: ['JavaScript'], status: 'Currently hiring', archived: false, postedAt: '2026-04-12', applications: [{ name: 'Alex Miller', email: 'alex.miller@student.guc.edu.eg', contributors: 8, status: 'Nominated', cover: 'My projects match the design system work.', pdfName: 'alex-portfolio.pdf' }] },
  { id: 2, title: 'Data Product Intern', company: 'QuantumWorks', employerEmail: 'careers@quantumworks.ai', details: 'Build ranking experiments for discovery.', skills: ['Python', 'SQL'], duration: '6 months', deadline: '2026-04-01', languages: ['Python'], status: 'Position filled', archived: true, postedAt: '2026-03-01', applications: [{ name: 'Lina Farouk', email: 'lina.farouk@student.guc.edu.eg', contributors: 12, status: 'Accepted', cover: 'I built predictive analytics projects.', pdfName: 'lina-data-portfolio.pdf' }] },
  { id: 3, title: 'UX Research Intern', company: 'Cairo Mobility Studio', employerEmail: 'hiring@cairomobility.com', details: 'Run usability studies for route-planning flows and summarize participant insights.', skills: ['Figma', 'Usability Testing'], duration: '3 months', deadline: '2026-05-30', languages: ['JavaScript'], status: 'Currently hiring', archived: false, postedAt: '2026-05-03', applications: [{ name: 'Noor El Din', email: 'noor.eldin@student.guc.edu.eg', contributors: 7, status: 'Nominated', cover: 'My AR museum guide used similar visitor research.', pdfName: 'noor-ux-portfolio.pdf' }, { name: 'Nadine Lotfy', email: 'nadine.lotfy@student.guc.edu.eg', contributors: 5, status: 'Rejected', cover: 'I can help with checkout UX research.', pdfName: 'nadine-ux.pdf' }] },
  { id: 4, title: 'Explainable AI Intern', company: 'MedVision Analytics', employerEmail: 'students@medvision.ai', details: 'Prototype explainability panels for health-risk prediction dashboards.', skills: ['Python', 'React', 'Machine Learning'], duration: '6 months', deadline: '2026-06-10', languages: ['Python'], status: 'Currently hiring', archived: false, postedAt: '2026-05-05', applications: [{ name: 'Jana Fouad', email: 'jana.fouad@student.guc.edu.eg', contributors: 9, status: 'Accepted', cover: 'My internship matcher and ML projects fit the role.', pdfName: 'jana-ml.pdf' }, { name: 'Yara Magdy', email: 'yara.magdy@student.guc.edu.eg', contributors: 6, status: 'Nominated', cover: 'I built an NLP study planner and can help explain recommendations.', pdfName: 'yara-nlp.pdf' }] },
  { id: 5, title: 'Cybersecurity Lab Intern', company: 'QuantumWorks', employerEmail: 'careers@quantumworks.ai', details: 'Prepare safe network-security training labs and dashboards.', skills: ['Cybersecurity', 'Linux', 'Python'], duration: '4 months', deadline: '2026-05-18', languages: ['Python'], status: 'Currently hiring', archived: false, postedAt: '2026-04-25', applications: [{ name: 'Tarek Amin', email: 'tarek.amin@student.guc.edu.eg', contributors: 8, status: 'Nominated', cover: 'My network and security projects are directly relevant.', pdfName: 'tarek-security.pdf' }] },
  { id: 6, title: 'Embedded Dashboard Intern', company: 'UrbanGrid Systems', employerEmail: 'verify@urbangrid.io', details: 'Help design dashboards for building-energy monitoring devices after company verification.', skills: ['IoT', 'React'], duration: '3 months', deadline: '2026-06-01', languages: ['C', 'JavaScript'], status: 'Currently hiring', archived: false, postedAt: '2026-05-07', applications: [{ name: 'Sara Khattab', email: 'sara.khattab@student.guc.edu.eg', contributors: 4, status: 'Nominated', cover: 'Dorm Energy Monitor matches this opening.', pdfName: 'sara-iot.pdf' }] }
];

const initialNotifications = [
  { id: 1, text: 'Invitation sent to Dr. Aya Salama for Autonomous Drone Grid.', email: 'alex.miller@student.guc.edu.eg', role: 'Student', read: false, type: 'Invitation sent' },
  { id: 2, text: 'NileTech Labs submitted verification documents.', role: 'Administrator', read: false, type: 'Employer verification' },
  { id: 3, text: 'New private message from Sarah Rogers.', role: 'Student', read: true, type: 'Message' },
  { id: 4, text: 'A feedback comment was added to your task.', role: 'Student', read: false, type: 'Feedback' },
  { id: 5, text: 'Alex Miller invited you to join Autonomous Drone Grid as a collaborator.', email: 'mona.adel@student.guc.edu.eg', role: 'Student', read: false, type: 'Project invitation' },
  { id: 6, text: 'Malak Zaki invited you to join Portfolio Accessibility Audit as a collaborator.', email: 'alex.miller@student.guc.edu.eg', role: 'Student', read: false, type: 'Project invitation' },
  { id: 7, text: 'Dr. Hany Mourad flagged Phishing Lab Simulator for a policy wording clarification.', email: 'tarek.amin@student.guc.edu.eg', role: 'Student', read: false, type: 'Moderation' },
  { id: 8, text: 'UrbanGrid Systems submitted employer verification documents.', role: 'Administrator', read: false, type: 'Employer verification' },
  { id: 9, text: 'Dr. Sherif Hassan accepted the Algorithm Tutor Studio instructor invitation.', email: 'ziad.mansour@student.guc.edu.eg', role: 'Student', read: false, type: 'Invitation decision' },
  { id: 10, text: 'Your application for Explainable AI Intern was accepted.', email: 'jana.fouad@student.guc.edu.eg', role: 'Student', read: false, type: 'Internship application' },
  { id: 11, text: 'A task was assigned to you in CrowdSafe Evacuation Planner.', email: 'noor.eldin@student.guc.edu.eg', role: 'Student', read: false, type: 'Task assignment' }
];

const initialEmployers = [
  { id: 1, company: 'NileTech Labs', email: 'talent@niletech.com', bio: 'Portfolio-first hiring partner.', address: 'Cairo Festival City', contactType: 'phone', contact: '02111222222', mapLocation: 'Cairo Festival City, Cairo, Egypt', document: 'tax-certificate.pdf', documentUrl: SAMPLE_PDF_DATA_URL, status: 'Accepted' },
  { id: 2, company: 'QuantumWorks', email: 'careers@quantumworks.ai', bio: 'Applied AI research studio.', address: 'Smart Village', contactType: 'phone', contact: '02555778800', mapLocation: 'Smart Village, Giza, Egypt', document: 'registry.pdf', documentUrl: SAMPLE_PDF_DATA_URL, status: 'Accepted' },
  { id: 3, company: 'Cairo Mobility Studio', email: 'hiring@cairomobility.com', bio: 'Urban mobility research and transit analytics partner.', address: 'Downtown Cairo', contactType: 'email', contact: 'hiring@cairomobility.com', mapLocation: 'Downtown Cairo, Egypt', document: 'mobility-registry.pdf', documentUrl: SAMPLE_PDF_DATA_URL, status: 'Accepted' },
  { id: 4, company: 'MedVision Analytics', email: 'students@medvision.ai', bio: 'Health analytics company for explainable AI internships.', address: 'New Cairo', contactType: 'phone', contact: '01099887766', mapLocation: 'New Cairo, Egypt', document: 'medvision-tax.pdf', documentUrl: SAMPLE_PDF_DATA_URL, status: 'Accepted' },
  { id: 5, company: 'UrbanGrid Systems', email: 'verify@urbangrid.io', bio: 'Smart infrastructure startup awaiting verification.', address: 'Maadi Technology Park', contactType: 'email', contact: 'verify@urbangrid.io', mapLocation: 'Maadi, Cairo, Egypt', document: 'urbangrid-registration.pdf', documentUrl: SAMPLE_PDF_DATA_URL, status: 'Pending' }
];

const initialMessages = [
  {
    id: 1,
    participants: ['alex.miller@student.guc.edu.eg', 'sarah.rogers@student.guc.edu.eg'],
    messages: [
      { id: 101, senderEmail: 'sarah.rogers@student.guc.edu.eg', text: 'Can you review my portfolio draft?', sentAt: '2026-05-01T12:00:00.000Z' },
      { id: 102, senderEmail: 'alex.miller@student.guc.edu.eg', text: 'Yes, send the report link.', sentAt: '2026-05-01T12:05:00.000Z' }
    ],
    unreadBy: ['alex.miller@student.guc.edu.eg']
  },
  {
    id: 2,
    participants: ['alex.miller@student.guc.edu.eg', 'talent@niletech.com'],
    messages: [
      { id: 201, senderEmail: 'talent@niletech.com', text: 'We liked your drone project demo.', sentAt: '2026-05-02T09:00:00.000Z' }
    ],
    unreadBy: []
  }
];

const initialFavoritesByEmail = {
  'alex.miller@student.guc.edu.eg': { projects: [2], portfolios: [1] },
  'talent@niletech.com': { projects: [1], portfolios: [1] }
};

const initialNotificationSettingsByEmail = {};

const initialCourseRequests = [
  { id: 1, instructorName: 'Dr. Hany Mourad', instructorEmail: 'hany.mourad@guc.edu.eg', courseId: 4, courseCode: 'CSEN 601', courseName: 'Computer Architecture', type: 'link', status: 'Pending', requestedAt: '2026-05-09T10:30:00.000Z' },
  { id: 2, instructorName: 'Dr. Aya Salama', instructorEmail: 'aya.salama@guc.edu.eg', courseId: 1, courseCode: 'MET 4999', courseName: 'Bachelor Project', type: 'unlink', status: 'Pending', requestedAt: '2026-05-10T11:15:00.000Z' },
  { id: 3, instructorName: 'Dr. Salma Wahdan', instructorEmail: 'salma.wahdan@guc.edu.eg', courseId: 2, courseCode: 'CSEN 704', courseName: 'Software Engineering', type: 'link', status: 'Accepted', requestedAt: '2026-05-02T09:00:00.000Z', decidedAt: '2026-05-03T09:00:00.000Z' }
];

const initialInvitations = [
  { id: 1, projectId: 1, project: 'Autonomous Drone Grid', sender: 'Alex Miller', senderEmail: 'alex.miller@student.guc.edu.eg', person: 'Dr. Aya Salama', email: 'aya.salama@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 3, projectId: 4, project: 'Smart Campus Thesis Portal', sender: 'Alex Miller', senderEmail: 'alex.miller@student.guc.edu.eg', person: 'Dr. Mervat Abuelkheir', email: 'mervat@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 2, projectId: 1, project: 'Autonomous Drone Grid', sender: 'Alex Miller', senderEmail: 'alex.miller@student.guc.edu.eg', person: 'Mona Adel', email: 'mona.adel@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 4, projectId: 8, project: 'Portfolio Accessibility Audit', sender: 'Malak Zaki', senderEmail: 'malak.zaki@student.guc.edu.eg', person: 'Alex Miller', email: 'alex.miller@student.guc.edu.eg', role: 'Collaborator', status: 'No reply' },
  { id: 5, projectId: 5, project: 'Campus Navigation AR', sender: 'Mona Adel', senderEmail: 'mona.adel@student.guc.edu.eg', person: 'Omar Hassan', email: 'omar.hassan@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 6, projectId: 14, project: 'CrowdSafe Evacuation Planner', sender: 'Mariam Hassan', senderEmail: 'mariam.hassan@student.guc.edu.eg', person: 'Dr. Salma Wahdan', email: 'salma.wahdan@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 7, projectId: 14, project: 'CrowdSafe Evacuation Planner', sender: 'Mariam Hassan', senderEmail: 'mariam.hassan@student.guc.edu.eg', person: 'Noor El Din', email: 'noor.eldin@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 8, projectId: 15, project: 'Algorithm Tutor Studio', sender: 'Ziad Mansour', senderEmail: 'ziad.mansour@student.guc.edu.eg', person: 'Dr. Sherif Hassan', email: 'sherif.hassan@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 9, projectId: 15, project: 'Algorithm Tutor Studio', sender: 'Ziad Mansour', senderEmail: 'ziad.mansour@student.guc.edu.eg', person: 'Karim Younes', email: 'karim.younes@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 10, projectId: 16, project: 'Phishing Lab Simulator', sender: 'Tarek Amin', senderEmail: 'tarek.amin@student.guc.edu.eg', person: 'Dr. Hany Mourad', email: 'hany.mourad@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 11, projectId: 16, project: 'Phishing Lab Simulator', sender: 'Tarek Amin', senderEmail: 'tarek.amin@student.guc.edu.eg', person: 'Hassan Radwan', email: 'hassan.radwan@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 12, projectId: 19, project: 'AR Museum Guide', sender: 'Noor El Din', senderEmail: 'noor.eldin@student.guc.edu.eg', person: 'Dr. Salma Wahdan', email: 'salma.wahdan@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' },
  { id: 13, projectId: 20, project: 'Faculty Load Balancer', sender: 'Karim Younes', senderEmail: 'karim.younes@student.guc.edu.eg', person: 'Dr. Aya Salama', email: 'aya.salama@guc.edu.eg', role: 'Course Instructor', status: 'No reply' },
  { id: 14, projectId: 20, project: 'Faculty Load Balancer', sender: 'Karim Younes', senderEmail: 'karim.younes@student.guc.edu.eg', person: 'Ziad Mansour', email: 'ziad.mansour@student.guc.edu.eg', role: 'Collaborator', status: 'Accepted' },
  { id: 15, projectId: 21, project: 'Marketplace UX Redesign', sender: 'Nadine Lotfy', senderEmail: 'nadine.lotfy@student.guc.edu.eg', person: 'Dr. Salma Wahdan', email: 'salma.wahdan@guc.edu.eg', role: 'Course Instructor', status: 'Rejected' },
  { id: 16, projectId: 22, project: 'Thesis Archive OCR', sender: 'Mariam Hassan', senderEmail: 'mariam.hassan@student.guc.edu.eg', person: 'Dr. Mervat Abuelkheir', email: 'mervat@guc.edu.eg', role: 'Course Instructor', status: 'Accepted' }
];

const initialDrafts = [
  { id: 1, name: 'Bachelor Draft v1.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 2, project: 'Sustainable Urban Hub', visibility: 'Private', final: false, uploadedAt: '2026-04-12' },
  { id: 2, name: 'Bachelor Final Draft.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 2, project: 'Sustainable Urban Hub', visibility: 'Public', final: true, uploadedAt: '2026-05-02' },
  { id: 3, name: 'Smart Campus Thesis Final.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 4, project: 'Smart Campus Thesis Portal', visibility: 'Public', final: true, uploadedAt: '2026-05-05' },
  { id: 4, name: 'Green Roof Draft 1.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 7, project: 'Green Roof Planner', visibility: 'Private', final: false, uploadedAt: '2026-04-21' },
  { id: 5, name: 'Green Roof Final Thesis.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 7, project: 'Green Roof Planner', visibility: 'Public', final: true, uploadedAt: '2026-05-04' },
  { id: 6, name: 'Thesis Archive OCR Draft.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 22, project: 'Thesis Archive OCR', visibility: 'Private', final: false, uploadedAt: '2026-05-06', feedback: [{ instructor: 'Dr. Mervat Abuelkheir', comment: 'Clarify the OCR evaluation dataset and scanned-page quality.', createdAt: '2026-05-08T09:30:00.000Z' }] },
  { id: 7, name: 'Thesis Archive OCR Final.pdf', documentUrl: SAMPLE_PDF_DATA_URL, projectId: 22, project: 'Thesis Archive OCR', visibility: 'Public', final: true, uploadedAt: '2026-05-10', feedback: [] }
];

function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [people, setPeople] = useState(initialPeople);
  const [courses, setCourses] = useState(initialCourses);
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [internships, setInternships] = useState(initialInternships);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [employers, setEmployers] = useState(initialEmployers);
  const [messages, setMessages] = useState(initialMessages);
  const [invitations, setInvitations] = useState(initialInvitations);
  const [drafts, setDrafts] = useState(initialDrafts);
  const [favoritesByEmail, setFavoritesByEmail] = useState(initialFavoritesByEmail);
  const [courseRequests, setCourseRequests] = useState(initialCourseRequests);
  const [toast, setToast] = useState(null);
  const [notificationSettingsByEmail, setNotificationSettingsByEmail] = useState(initialNotificationSettingsByEmail);
  const [globalSearch, setGlobalSearch] = useState('');
  const [viewer, setViewer] = useState(null);
  const [pdfViewer, setPdfViewer] = useState(null);
  const [messageTargetEmail, setMessageTargetEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workspaceProjectId, setWorkspaceProjectId] = useState(null);

  const currentFavorites = user ? favoritesByEmail[user.email] || { projects: [], portfolios: [] } : { projects: [], portfolios: [] };
  const setFavorites = (updater) => {
    if (!user) return;
    setFavoritesByEmail((items) => {
      const current = items[user.email] || { projects: [], portfolios: [] };
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...items, [user.email]: next };
    });
  };
  const notificationsOff = user ? !!notificationSettingsByEmail[user.email]?.notificationsOff : false;
  const setNotificationsOff = (valueOrUpdater) => {
    if (!user) return;
    setNotificationSettingsByEmail((items) => {
      const current = items[user.email] || {};
      const nextValue = typeof valueOrUpdater === 'function' ? valueOrUpdater(!!current.notificationsOff) : valueOrUpdater;
      return { ...items, [user.email]: { ...current, notificationsOff: nextValue } };
    });
  };
  const activeNotifications = user && !notificationsOff ? notifications.filter((n) => n.email ? n.email === user.email : (n.role === user.role || user.role === 'Administrator')) : [];

  const notify = (message) => {
    setToast(message);
  };

  const navigatePage = (nextPage) => {
    setViewer(null);
    setPage(nextPage);
  };

  const openProject = (projectOrId) => {
    const id = typeof projectOrId === 'object' ? projectOrId.id : projectOrId;
    setViewer({ type: 'project', id });
  };

  const openProfile = (personOrEmail) => {
    const email = typeof personOrEmail === 'object' ? personOrEmail.email : personOrEmail;
    setViewer({ type: 'profile', email });
  };

  const startChatWith = (personOrEmail) => {
    if (!user) return;
    const targetEmail = typeof personOrEmail === 'object' ? personOrEmail.email : personOrEmail;
    if (!targetEmail || targetEmail === user.email) return;
    setMessages((items) => {
      const existing = items.find((thread) => thread.participants.includes(user.email) && thread.participants.includes(targetEmail));
      if (existing) return items;
      return [{
        id: Date.now(),
        participants: [user.email, targetEmail],
        messages: [],
        unreadBy: []
      }, ...items];
    });
    setMessageTargetEmail(targetEmail);
    setViewer(null);
    setPage('messages');
  };

  const openWorkspaceProject = (projectId) => {
    setWorkspaceProjectId(projectId);
    setViewer(null);
    setPage('workspace');
  };

  const openPdfFile = ({ name, url }) => {
    if (!url) {
      notify('No PDF is available for this item.');
      return;
    }
    setPdfViewer({ name: name || 'Document.pdf', url });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const context = {
    page,
    setPage: navigatePage,
    user,
    setUser,
    people,
    setPeople,
    courses,
    setCourses,
    projects,
    setProjects,
    tasks,
    setTasks,
    internships,
    setInternships,
    notifications,
    setNotifications,
    activeNotifications,
    employers,
    setEmployers,
    messages,
    setMessages,
    messageTargetEmail,
    setMessageTargetEmail,
    invitations,
    setInvitations,
    courseRequests,
    setCourseRequests,
    drafts,
    setDrafts,
    favorites: currentFavorites,
    setFavorites,
    notificationsOff,
    setNotificationsOff,
    globalSearch,
    setGlobalSearch,
    openProject,
    openProfile,
    startChatWith,
    workspaceProjectId,
    openWorkspaceProject,
    openPdfFile,
    notify
  };

  if (!user) {
    return (
      <div className="app-shell auth-shell">
        <AuthCenter {...context} />
        {toast && <div className="toast" role="status">
          <Icon name="task_alt" /> {toast}
        </div>}
      </div>
    );
  }

  const allowedPages = getAllowedPages(user.role);
  const activePage = allowedPages.includes(page) ? page : 'dashboard';
  const employerRecord = user.role === 'Employer' ? findEmployerRecord(employers, user.email) : null;
  const employerStatus = employerRecord?.status || user.status || 'Pending';
  if (user.role === 'Employer' && employerStatus !== 'Accepted') {
    return (
      <div className="app-shell locked-shell">
        <EmployerVerificationGate user={user} employer={employerRecord} status={employerStatus} setUser={setUser} setPage={navigatePage} />
        {toast && <div className="toast" role="status">
          <Icon name="task_alt" /> {toast}
        </div>}
      </div>
    );
  }

  const pageContent = {
    dashboard: <Dashboard {...context} />,
    profile: <ProfileCenter {...context} />,
    discovery: <Discovery {...context} />,
    favorites: <FavoritesHub {...context} />,
    projects: <ProjectStudio {...context} />,
    invitations: <GlobalInvitationsHub {...context} />,
    workspace: <ProjectWorkspace {...context} />,
    instructors: <InstructorPortal {...context} />,
    admin: <AdminSuite {...context} />,
    requests: <CourseRequestsPage {...context} />,
    inventory: <CourseInventory {...context} />,
    moderation: <ModerationCenter {...context} />,
    internships: <InternshipHub {...context} />,
    statistics: <StatisticsCenter {...context} />,
    messages: <MessagingHub {...context} />,
    notifications: <NotificationCenter {...context} />,
    settings: <SettingsCenter {...context} />
  }[activePage];
  const viewerPerson = viewer?.type === 'profile' ? people.find((person) => person.email === viewer.email) : null;
  const viewerProject = viewer?.type === 'project' ? projects.find((project) => project.id === viewer.id) : null;
  const content = viewerPerson
    ? <PublicPortfolioPage {...context} person={viewerPerson} onBack={() => setViewer(null)} />
    : viewerProject
      ? <ProjectDetailPage {...context} project={viewerProject} onBack={() => setViewer(null)} />
      : pageContent;

  return (
    <div className="app-shell">
      <TopNav {...context} setPage={navigatePage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar page={activePage} setPage={navigatePage} user={user} open={sidebarOpen} />
        <main className="content">{content}</main>
      </div>
      {toast && <div className="toast" role="status">
        <Icon name="task_alt" /> {toast}
      </div>}
      {pdfViewer && <PdfModal file={pdfViewer} onClose={() => setPdfViewer(null)} />}
    </div>
  );
}

function TopNav({ user, setPage, setUser, activeNotifications, setGlobalSearch, notify, sidebarOpen, setSidebarOpen }) {
  const navKeys = getAllowedPages(user.role);
  const logout = () => {
    setUser(null);
    setPage('dashboard');
    notify('Logged out successfully.');
  };
  return (
    <header className="topbar">
      <button className="icon-button menu-button" type="button" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'} aria-pressed={sidebarOpen}>
        <Icon name="menu" />
      </button>
      <button className="brand" onClick={() => setPage('dashboard')}>EduPortfolio Pro</button>
      <nav className="toplinks">
        <button onClick={() => setPage('dashboard')}>Home</button>
        <button onClick={() => setPage('discovery')}>Explore</button>
        <button onClick={() => setPage('instructors')}>University Network</button>
      </nav>
      <div className="top-actions">
        <button className="search-shortcut" type="button" onClick={() => { setGlobalSearch(''); setPage('discovery'); }} aria-label="Open discovery search">
          <Icon name="search" />
        </button>
        <button className="icon-button" onClick={() => setPage('notifications')} aria-label="Notifications">
          <Icon name="notifications" />
          {activeNotifications.some((n) => !n.read) && <span className="dot" />}
        </button>
        {navKeys.includes('messages') && <button className="icon-button" onClick={() => setPage('messages')} aria-label="Messages"><Icon name="mail" /></button>}
        {navKeys.includes('settings') && <button className="icon-button" onClick={() => setPage('settings')} aria-label="Settings"><Icon name="settings" /></button>}
        <button className="logout-button" onClick={logout}>Log out</button>
        <button className="avatar" onClick={() => setPage('profile')}>{user.avatarImage ? <img src={user.avatarImage} alt="" /> : initials(user.fullName)}</button>
      </div>
    </header>
  );
}

function Sidebar({ page, setPage, user, open }) {
  const items = getRoleNav(user.role);
  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="role-card">
        <span className="avatar role-avatar">{user.avatarImage ? <img src={user.avatarImage} alt="" /> : initials(user.fullName)}</span>
        <span className={`badge ${roleClass(user.role)}`}>{user.role}</span>
        <strong>{user.fullName}</strong>
        <small>{user.email}</small>
      </div>
      {items.map(([key, icon, label]) => (
        <button key={key} className={page === key ? 'active' : ''} onPointerDown={() => setPage(key)} onClick={() => setPage(key)}>
          <Icon name={icon} /> {label}
        </button>
      ))}
    </aside>
  );
}

function Dashboard({ user, setPage, projects, internships, people, notifications, favorites, courses, invitations, openProject }) {
  const config = getDashboardConfig(user, projects, internships, people, notifications, courses, invitations);
  const recommendedProjects = (user.role === 'Course Instructor'
    ? projects.filter((project) => {
      const course = courses.find((item) => item.name === project.course);
      const linkedToInstructor = project.instructor === user.fullName || (project.instructorInvites || []).includes(user.fullName) || courseInstructorEmails(course, people).includes(user.email);
      const hasMyFeedback = (project.reviews || []).some((review) => review.instructorEmail === user.email);
      return project.active && linkedToInstructor && !hasMyFeedback;
    })
    : projects.filter((project) => project.public && project.active && projectInstructorState(project, invitations).key === 'active'))
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0) || b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);
  return (
    <section className="stack home-page">
      <div className="home-hero">
        <div className="hero-copy">
          <h1>{config.title}</h1>
          <p>{config.text}</p>
          <div className="actions">
            <button className="primary" onClick={() => setPage(config.primaryPage)}>{config.primaryAction}</button>
            <button className="secondary" onClick={() => setPage(config.secondaryPage)}>{config.secondaryAction}</button>
          </div>
        </div>
        <DashboardIllustration />
      </div>

      <div className="home-stat-strip">
        {config.stats.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
      </div>

      <section className="home-tools">
        <header className="section-title">
          <h2>{config.workspaceTitle}</h2>
        </header>
        <div className="tool-grid">
          {config.tiles.map((tile) => <RoleTile key={tile.title} {...tile} onClick={() => setPage(tile.page)} />)}
        </div>
      </section>

      <SectionHeader title={config.listTitle} action={config.listAction} onAction={() => setPage(config.listPage || config.secondaryPage)} />
      <div className="card-grid home-recommendations">
        {recommendedProjects.map((project) => <ProjectCard key={project.id} project={project} favorite={favorites.projects.includes(project.id)} onSelect={() => openProject(project.id)} />)}
      </div>
    </section>
  );
}

function AuthCenter({ people, setPeople, employers, setEmployers, setNotifications, setUser, setPage, notify }) {
  const [mode, setMode] = useState('login');
  const [registerRole, setRegisterRole] = useState('Student');
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', password: '', otp: '', newPassword: '', document: '', documentUrl: '' });
  const [authError, setAuthError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [recoveryEmailConfirmed, setRecoveryEmailConfirmed] = useState(false);
  const emailExists = people.some((person) => person.email.toLowerCase() === form.email.toLowerCase());
  const validRegisterEmail = registerRole === 'Student'
    ? form.email.toLowerCase().endsWith('@student.guc.edu.eg')
    : registerRole === 'Course Instructor'
      ? form.email.toLowerCase().endsWith('@guc.edu.eg') && !form.email.toLowerCase().endsWith('@student.guc.edu.eg')
      : form.email.includes('@') && !form.email.toLowerCase().endsWith('@guc.edu.eg') && !form.email.toLowerCase().endsWith('@student.guc.edu.eg');
  const updateForm = (patch) => {
    setForm((current) => ({ ...current, ...patch }));
    setAuthError('');
  };
  const switchMode = (nextMode) => {
    setMode(nextMode);
    setAuthError('');
    setOtpVerified(false);
    setRecoveryEmailConfirmed(false);
    setForm({ firstName: '', lastName: '', company: '', email: '', password: '', otp: '', newPassword: '', document: '', documentUrl: '' });
  };
  const attachEmployerDocument = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setAuthError('Employer verification document must be a PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateForm({ document: file.name, documentUrl: reader.result });
    reader.readAsDataURL(file);
  };
  const submit = (event) => {
    event.preventDefault();
    if (mode === 'forgot') {
      const account = people.find((person) => person.email.toLowerCase() === form.email.toLowerCase());
      if (!account) {
        setAuthError('Email is not registered.');
        return;
      }
      if (!recoveryEmailConfirmed) {
        setRecoveryEmailConfirmed(true);
        notify('Account found. Enter the OTP sent to your email.');
        return;
      }
      if (!otpVerified) {
        if (form.otp !== TEST_OTP) {
          setAuthError('OTP is incorrect.');
          return;
        }
        setOtpVerified(true);
        notify('OTP verified. Enter a new password.');
        return;
      }
      if (form.newPassword.length < 6) {
        setAuthError('New password must be at least 6 characters.');
        return;
      }
      setPeople((items) => items.map((person) => person.email.toLowerCase() === form.email.toLowerCase() ? { ...person, password: form.newPassword } : person));
      notify('Password changed. Log in with your new password.');
      switchMode('login');
    }
    else if (mode === 'login') {
      const account = people.find((person) => person.email.toLowerCase() === form.email.toLowerCase());
      if (!account) {
        setAuthError('Email is incorrect or not registered.');
        return;
      }
      if (!account.active) {
        setAuthError('This account is deactivated. Please contact the administrator.');
        return;
      }
      if (account.password !== form.password) {
        setAuthError('Password is incorrect.');
        return;
      }
      setUser({ role: account.role, fullName: account.fullName, email: account.email, status: account.status, avatarImage: account.avatarImage, coverImage: account.coverImage });
      setPage('dashboard');
      notify(`Logged in as ${account.role}.`);
    }
    else {
      if (!form.email || !validRegisterEmail) {
        setAuthError(registerRole === 'Student' ? 'Student email must end with @student.guc.edu.eg.' : registerRole === 'Course Instructor' ? 'Instructor email must end with @guc.edu.eg.' : 'Employer email must be an external company email.');
        return;
      }
      if (emailExists) {
        setAuthError('This email is already registered.');
        return;
      }
      if (form.password.length < 6) {
        setAuthError('Password must be at least 6 characters.');
        return;
      }
      if (registerRole === 'Employer' ? !form.company : !form.firstName || !form.lastName) {
        setAuthError('Complete all registration fields.');
        return;
      }
      if (registerRole === 'Employer' && !form.documentUrl) {
        setAuthError('Upload a company verification PDF such as a tax certificate.');
        return;
      }
      const name = registerRole === 'Employer' ? form.company : `${form.firstName} ${form.lastName}`;
      const account = { id: Date.now(), role: registerRole, fullName: name, email: form.email, password: form.password, active: true, status: registerRole === 'Employer' ? 'Pending' : 'Accepted', avatar: initials(name), major: '', skills: [], projects: 0, companyBio: '', address: '', contactType: 'email', contact: form.email, mapLocation: '', verificationDocument: form.document, verificationDocumentUrl: form.documentUrl };
      setPeople((items) => [account, ...items]);
      if (registerRole === 'Employer') {
        setEmployers((items) => [{
          id: Date.now() + 1,
          company: name,
          email: form.email,
          bio: '',
          address: '',
          contactType: 'email',
          contact: form.email,
          mapLocation: '',
          document: form.document,
          documentUrl: form.documentUrl,
          status: 'Pending'
        }, ...items]);
        setNotifications((items) => [{ id: Date.now() + 2, text: `${name} submitted employer verification documents.`, role: 'Administrator', read: false, type: 'Employer verification' }, ...items]);
      }
      setUser({ role: account.role, fullName: account.fullName, email: account.email, status: account.status, avatarImage: account.avatarImage, coverImage: account.coverImage });
      setPage('dashboard');
      notify(registerRole === 'Employer' ? 'Employer account created. Your company is pending administrator review.' : `Account created as ${account.role}.`);
    }
  };
  return (
    <section className="auth-page">
      <div className="auth-visual">
        <span className="auth-mark"><Icon name="school" /></span>
        <h1>Showcase academic work that proves what you can build.</h1>
        <p>Projects, thesis drafts, feedback, internships, and portfolio discovery in one clean workspace.</p>
      </div>
      <form className="panel auth-card form-grid" onSubmit={submit}>
        <span className="brand auth-brand">EduPortfolio Pro</span>
        <h2>{mode === 'login' ? 'Log into EduPortfolio' : mode === 'register' ? 'Create new account' : 'Reset your password'}</h2>
        {mode === 'forgot' && <p className="muted auth-help">{recoveryEmailConfirmed ? `Testing OTP: ${TEST_OTP}` : 'Enter your registered email first.'}</p>}
        {mode === 'register' && (
          <label className="auth-full">User type
            <span className="select-shell">
              <select value={registerRole} onChange={(event) => { setRegisterRole(event.target.value); setAuthError(''); }}>
                <option>Student</option>
                <option>Course Instructor</option>
                <option>Employer</option>
              </select>
              <Icon name="expand_more" />
            </span>
          </label>
        )}
        {mode === 'register' && registerRole !== 'Employer' && (
          <>
            <label>First name<input value={form.firstName} onChange={(event) => updateForm({ firstName: event.target.value })} /></label>
            <label>Last name<input value={form.lastName} onChange={(event) => updateForm({ lastName: event.target.value })} /></label>
          </>
        )}
        {mode === 'register' && registerRole === 'Employer' && (
          <>
            <label className="auth-full">Company name<input value={form.company} onChange={(event) => updateForm({ company: event.target.value })} /></label>
            <label className="upload-tile auth-full"><Icon name="picture_as_pdf" /> Upload company verification PDF<input type="file" accept="application/pdf" onChange={attachEmployerDocument} />{form.document && <small>{form.document}</small>}</label>
          </>
        )}
        <label>Email<input type="email" value={form.email} onChange={(event) => {
          const nextEmail = event.target.value;
          if (mode === 'forgot') {
            setRecoveryEmailConfirmed(false);
            setOtpVerified(false);
            updateForm({ email: nextEmail, otp: '', newPassword: '' });
            return;
          }
          updateForm({ email: nextEmail });
        }} /></label>
        {mode === 'forgot' ? (
          <>
            {recoveryEmailConfirmed && !otpVerified && <label>OTP<input value={form.otp} onChange={(event) => updateForm({ otp: event.target.value })} placeholder="Enter 6-digit OTP" /></label>}
            {otpVerified && <label>New password<input type="password" value={form.newPassword} onChange={(event) => updateForm({ newPassword: event.target.value })} /></label>}
          </>
        ) : (
          <label>Password<input type="password" value={form.password} onChange={(event) => updateForm({ password: event.target.value })} /></label>
        )}
        <div className="error-line">{authError}</div>
        <button className="primary auth-full" type="submit">{mode === 'forgot' ? otpVerified ? 'Change Password' : recoveryEmailConfirmed ? 'Verify OTP' : 'Confirm Email' : mode === 'login' ? 'Log in' : 'Create Account'}</button>
        {mode === 'login' && <button className="text-button auth-full centered-link" type="button" onClick={() => switchMode('forgot')}>Forgot password?</button>}
        {mode === 'login' ? (
          <button className="secondary auth-full" type="button" onClick={() => switchMode('register')}>Create new account</button>
        ) : (
          <button className="secondary auth-full" type="button" onClick={() => switchMode('login')}>Back to login</button>
        )}
      </form>
    </section>
  );
}

function inferContactType(contact = '') {
  return contact.includes('@') ? 'email' : 'phone';
}

function isValidEmployerContact(type, value = '') {
  if (!value) return true;
  return type === 'email'
    ? /^[^\s@]+@[^\s@]+\.com$/i.test(value)
    : /^\d{11}$/.test(value);
}

function employerContactMessage(type) {
  return type === 'email'
    ? 'Email must include @ and end with .com.'
    : 'Phone number must be exactly 11 digits.';
}

function googleMapsUrl(location = '') {
  const query = location.trim() || 'Google Maps';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapEmbedSource(location = '') {
  const query = location.trim();
  return query ? `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed` : '';
}

function findEmployerRecord(employers, email = '') {
  return employers.find((employer) => employer.email.toLowerCase() === email.toLowerCase());
}

function EmployerVerificationGate({ user, employer, status, setUser, setPage }) {
  const isRejected = status === 'Rejected';
  const logout = () => {
    setUser(null);
    setPage('dashboard');
  };
  return (
    <section className="verification-gate">
      <div className="panel verification-card">
        <span className={`badge ${isRejected ? 'administrator' : 'employer'}`}>{status}</span>
        <h1>{isRejected ? 'Company verification rejected' : 'Company verification pending'}</h1>
        <p>{isRejected ? 'An administrator rejected this employer application. Website access is locked until a new valid company document is reviewed.' : 'Your employer account was created, but an administrator must accept your company verification before you can use the workspace.'}</p>
        <div className="mini-list">
          <MiniItem icon="business" title={employer?.company || user.fullName} meta="Company" />
          <MiniItem icon="picture_as_pdf" title={employer?.document || 'Verification document missing'} meta="Submitted document" />
          <MiniItem icon="mail" title={user.email} meta="Account email" />
        </div>
        <button className="secondary" onClick={logout}>Log out</button>
      </div>
    </section>
  );
}

function ProfileCenter({ user, setUser, people, setPeople, courses, setCourses, employers, setEmployers, courseRequests, setCourseRequests, setNotifications, openPdfFile, notify }) {
  const current = people.find((p) => p.email === user.email) || people.find((p) => p.role === user.role) || people[0];
  const [profile, setProfile] = useState({ ...current, skills: current.skills || [] });
  const [skillInput, setSkillInput] = useState('');
  const [documentName, setDocumentName] = useState(current.verificationDocument || findEmployerRecord(employers, user.email)?.document || '');
  const [documentUrl, setDocumentUrl] = useState(current.verificationDocumentUrl || findEmployerRecord(employers, user.email)?.documentUrl || '');
  const [editingPublicUrl, setEditingPublicUrl] = useState(false);
  const [contactError, setContactError] = useState('');
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const detailsRef = useRef(null);
  const courseMenuRef = useRef(null);
  const employerContactType = profile.contactType || inferContactType(profile.contact);
  const employerContactValid = user.role !== 'Employer' || isValidEmployerContact(employerContactType, profile.contact || '');
  const employerMapSource = mapEmbedSource(profile.mapLocation || profile.address || profile.fullName);
  useEffect(() => {
    if (!courseMenuOpen) return undefined;
    const closeOnOutside = (event) => {
      if (courseMenuRef.current && !courseMenuRef.current.contains(event.target)) setCourseMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setCourseMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [courseMenuOpen]);
  const persistProfile = (nextProfile, options = {}) => {
    setPeople((items) => items.map((item) => item.id === current.id ? nextProfile : item));
    setUser((currentUser) => ({ ...currentUser, fullName: nextProfile.fullName, email: nextProfile.email, avatarImage: nextProfile.avatarImage, coverImage: nextProfile.coverImage }));
    if (user.role === 'Employer') {
      setEmployers((items) => items.map((item) => item.email === user.email ? { ...item, company: nextProfile.fullName, bio: nextProfile.companyBio, address: nextProfile.address, contactType: nextProfile.contactType || inferContactType(nextProfile.contact), contact: nextProfile.contact, mapLocation: nextProfile.mapLocation, document: nextProfile.verificationDocument || documentName || item.document, documentUrl: nextProfile.verificationDocumentUrl || documentUrl || item.documentUrl } : item));
    }
    if (options.notify) notify(options.notify);
  };
  const updateProfile = (patch) => {
    setProfile((currentProfile) => {
      const nextProfile = { ...currentProfile, ...patch, skills: patch.skills || currentProfile.skills || [] };
      persistProfile(nextProfile);
      return nextProfile;
    });
  };
  const clearStudentInfo = () => {
    if (!window.confirm('Remove the editable profile basics from this account?')) return;
    if (user.role === 'Student') {
      updateProfile({ major: '', skills: [], linkedIn: '' });
      notify('Basic portfolio information removed.');
      return;
    }
    if (user.role === 'Course Instructor') {
      updateProfile({ bio: '', interests: '', education: '' });
      notify('Instructor profile information removed.');
      return;
    }
    if (user.role === 'Employer') {
      updateProfile({ companyBio: '', address: '', contact: '', mapLocation: '' });
      notify('Company profile information removed.');
    }
  };
  const updateEmployerContactType = (contactType) => {
    setContactError('');
    updateProfile({ contactType, contact: '' });
  };
  const updateEmployerContact = (value) => {
    const nextValue = employerContactType === 'phone' ? value.replace(/\D/g, '').slice(0, 11) : value.trim();
    updateProfile({ contactType: employerContactType, contact: nextValue });
    if (!nextValue) {
      setContactError('');
      return;
    }
    setContactError(isValidEmployerContact(employerContactType, nextValue) ? '' : employerContactMessage(employerContactType));
  };
  const saveEmployerLocation = () => {
    const nextLocation = (profile.mapLocation || '').trim();
    if (!nextLocation) return notify('Add a company location before saving.');
    updateProfile({ mapLocation: nextLocation });
    notify('Company Google Maps location saved.');
  };
  const addSkill = () => {
    const nextSkill = skillInput.trim();
    if (!nextSkill) return;
    const existingSkills = profile.skills || [];
    if (existingSkills.some((skill) => skill.toLowerCase() === nextSkill.toLowerCase())) {
      notify('Skill is already added.');
      return;
    }
    updateProfile({ skills: [...existingSkills, nextSkill] });
    setSkillInput('');
  };
  const removeSkill = (skillToRemove) => {
    updateProfile({ skills: (profile.skills || []).filter((skill) => skill !== skillToRemove) });
  };
  const handleProfilePicture = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatarImage: reader.result });
      notify(user.role === 'Employer' ? 'Company logo updated.' : 'Profile picture updated.');
    };
    reader.readAsDataURL(file);
  };
  const handleCoverPicture = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ coverImage: reader.result });
      notify('Cover image updated.');
    };
    reader.readAsDataURL(file);
  };
  const removeProfilePicture = () => {
    updateProfile({ avatarImage: '' });
    notify(user.role === 'Employer' ? 'Company logo removed.' : 'Profile picture removed.');
  };
  const handleEmployerDocument = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      notify('Verification document must be a PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDocumentName(file.name);
      setDocumentUrl(reader.result);
      updateProfile({ verificationDocument: file.name, verificationDocumentUrl: reader.result });
      notify('Company verification document uploaded.');
    };
    reader.readAsDataURL(file);
  };
  const instructorCourses = instructorCourseLabels(profile, courses);
  const pendingCourseRequests = courseRequests.filter((request) => request.instructorEmail === current.email && request.status === 'Pending');
  const requestForCourse = (courseName, type) => pendingCourseRequests.find((request) => request.courseName === courseName && request.type === type);
  const toggleInstructorCourse = (courseName) => {
    if (courseName === 'Bachelor Project') return;
    const type = instructorCourses.includes(courseName) ? 'unlink' : 'link';
    if (requestForCourse(courseName, type)) {
      notify(`A ${type} request for ${courseName} is already pending.`);
      return;
    }
    const course = courses.find((item) => item.name === courseName);
    const request = {
      id: Date.now() + Math.random(),
      type,
      instructorName: current.fullName,
      instructorEmail: current.email,
      courseId: course?.id,
      courseName,
      courseCode: course?.code || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setCourseRequests((items) => [request, ...items]);
    pushNotification(setNotifications, {
      role: 'Administrator',
      type: 'Course link request',
      text: `${current.fullName} requested to ${type} ${course?.code || ''} ${courseName}.`
    });
    notify(`Request for ${type === 'link' ? 'linking to' : 'unlinking from'} ${courseName} sent to admin.`);
  };
  const showProfileDetails = user.role !== 'Administrator';
  return (
    <section className="stack moderation-page">
      <div className="profile-page">
        <div className={`profile-main ${showProfileDetails ? '' : 'admin-profile-main'}`}>
          <section className="profile-hero-card">
            <div className={`profile-cover ${profile.coverImage ? 'has-cover' : ''}`} style={profile.coverImage ? { backgroundImage: `url(${profile.coverImage})` } : undefined}>
              <label className="cover-camera" title={user.role === 'Employer' ? 'Update company cover image' : 'Update profile picture'}>
                <Icon name="photo_camera" />
                <input type="file" accept="image/*" onChange={handleCoverPicture} />
              </label>
            </div>
            <div className="profile-identity">
              <div className="profile-photo-wrap">
                <div className="large-avatar profile-photo">{profile.avatarImage ? <img src={profile.avatarImage} alt="" /> : profile.avatar || initials(profile.fullName)}</div>
                <label className="profile-photo-camera" title={user.role === 'Employer' ? 'Update company logo' : 'Update profile picture'}>
                  <Icon name="photo_camera" />
                  <input type="file" accept="image/*" onChange={handleProfilePicture} />
                </label>
                {profile.avatarImage && <button className="remove-photo" type="button" onClick={removeProfilePicture} aria-label={user.role === 'Employer' ? 'Remove company logo' : 'Remove profile picture'}>x</button>}
              </div>
              <div className="profile-name-row">
                <div>
                  <h1>{profile.fullName}</h1>
                  <p className="profile-headline">{user.role === 'Student' ? studentHeadline(profile) : user.role === 'Course Instructor' ? profile.bio || 'Course Instructor at The German University in Cairo' : profile.companyBio || 'Employer partner profile'}</p>
                  <p className="muted">{profile.email}</p>
                  <span className={`badge ${roleClass(profile.role || user.role)}`}>{profile.role || user.role}</span>
                </div>
                {showProfileDetails && <button className="icon-button" type="button" onClick={() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} aria-label="Edit profile"><Icon name="edit" /></button>}
              </div>
            </div>
          </section>

          {showProfileDetails && (
          <>
          <section className="panel profile-details-card" ref={detailsRef}>
            <SectionHeader title={user.role === 'Student' ? 'Portfolio Details' : user.role === 'Course Instructor' ? 'Instructor Details' : 'Company Details'} subtitle="Everything visible on your profile is shown and editable here." />
            <div className="form-grid">
          <label>Name / company<input value={profile.fullName || ''} onChange={(event) => updateProfile({ fullName: event.target.value })} /></label>
          <label>Email<input value={profile.email || ''} onChange={(event) => updateProfile({ email: event.target.value })} /></label>
          {(user.role === 'Student' || profile.role === 'Student') && (
            <>
              <label>Major<input value={profile.major || ''} onChange={(event) => updateProfile({ major: event.target.value })} /></label>
              <label className="skills-field">Skills
                <div className="skill-entry">
                  <input value={skillInput} onChange={(event) => setSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addSkill(); } }} placeholder="Add a skill" />
                  <button className="secondary" type="button" onClick={addSkill}>Add</button>
                </div>
                <div className="skill-chip-list">
                  {(profile.skills || []).map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                      <button type="button" aria-label={`Remove ${skill}`} onClick={() => removeSkill(skill)}>x</button>
                    </span>
                  ))}
                </div>
              </label>
            </>
          )}
          {(user.role === 'Course Instructor' || profile.role === 'Course Instructor') && (
            <>
              <label className="instructor-bio-field">Short biography<textarea value={profile.bio || ''} onChange={(event) => updateProfile({ bio: event.target.value })} /></label>
              <label className="instructor-interest-field">Research interests<input value={profile.interests || ''} onChange={(event) => updateProfile({ interests: event.target.value })} /></label>
              <label>Education background<input value={profile.education || ''} onChange={(event) => updateProfile({ education: event.target.value })} /></label>
              <div className="courses-field">
                <span>Courses I Teach</span>
                <div className="course-picker" ref={courseMenuRef}>
                  <button className="course-picker-trigger" type="button" onClick={() => setCourseMenuOpen((open) => !open)}>
                    {instructorCourses.length} selected <Icon name="expand_more" />
                  </button>
                  {courseMenuOpen && <div className="course-picker-menu">
                    {courses.map((course) => (
                      <label className="course-option" key={course.id}>
                        <input type="checkbox" checked={instructorCourses.includes(course.name)} disabled={course.name === 'Bachelor Project' || !!requestForCourse(course.name, instructorCourses.includes(course.name) ? 'unlink' : 'link')} onChange={() => toggleInstructorCourse(course.name)} />
                        <span>{course.code} - {course.name}{requestForCourse(course.name, 'link') ? ' (link pending)' : requestForCourse(course.name, 'unlink') ? ' (unlink pending)' : ''}</span>
                      </label>
                    ))}
                  </div>}
                </div>
                <div className="skill-chip-list">
                  {instructorCourses.map((course) => (
                    <span className={`skill-chip ${course === 'Bachelor Project' ? 'readonly' : ''}`} key={course}>
                      {course}
                      {course !== 'Bachelor Project' && <button type="button" aria-label={`Remove ${course}`} onClick={() => toggleInstructorCourse(course)}>x</button>}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          {(user.role === 'Employer' || profile.role === 'Employer') && (
            <>
              <label>Company biography<textarea value={profile.companyBio || ''} onChange={(event) => updateProfile({ companyBio: event.target.value })} /></label>
              <label className="employer-address-field">Address<input value={profile.address || ''} onChange={(event) => updateProfile({ address: event.target.value })} /></label>
              <label>Contact type<span className="select-shell"><select value={employerContactType} onChange={(event) => updateEmployerContactType(event.target.value)}><option value="email">Email</option><option value="phone">Phone number</option></select><Icon name="expand_more" /></span></label>
              <label>Contact {employerContactType === 'email' ? 'email' : 'phone number'}<input value={profile.contact || ''} inputMode={employerContactType === 'phone' ? 'numeric' : 'email'} placeholder={employerContactType === 'email' ? 'company@example.com' : '01123456789'} onChange={(event) => updateEmployerContact(event.target.value)} /></label>
              {contactError && <p className="form-error">{contactError}</p>}
              <label className="map-field">Google Maps location<input value={profile.mapLocation || ''} onChange={(event) => updateProfile({ mapLocation: event.target.value })} placeholder="Search address or paste a Google Maps location" /></label>
              <div className="map-actions">
                <button className="secondary" type="button" onClick={saveEmployerLocation}>Set Location</button>
                <a className="text-button" href={googleMapsUrl(profile.mapLocation || profile.address || profile.fullName)} target="_blank" rel="noreferrer">Open in Google Maps</a>
              </div>
              <div className="document-upload-row full-label">
                <label className="upload-tile"><Icon name="picture_as_pdf" /> Upload verification PDF<input type="file" accept="application/pdf" onChange={handleEmployerDocument} />{documentName && <small>{documentName}</small>}</label>
                <button className="secondary" type="button" disabled={!documentUrl} onClick={() => openPdfFile({ name: documentName || 'Verification document.pdf', url: documentUrl })}><Icon name="visibility" /> View PDF</button>
              </div>
            </>
          )}
          <div className="actions">
            {user.role === 'Employer' && <button className="primary" type="button" disabled={!employerContactValid} onClick={() => employerContactValid ? persistProfile(profile, { notify: 'Employer profile saved.' }) : setContactError(employerContactMessage(employerContactType))}>Save Profile</button>}
          </div>
          {user.role === 'Employer' && <div className="map-box">{employerMapSource ? <iframe title="Company map preview" src={employerMapSource} loading="lazy" /> : <><Icon name="map" /> Company map preview</>}</div>}
            </div>
          </section>
          <section className="panel profile-summary-panel">
            <SectionHeader title={user.role === 'Student' ? 'Portfolio Snapshot' : user.role === 'Course Instructor' ? 'Academic Snapshot' : 'Company Snapshot'} />
            {user.role === 'Student' && (
              <>
                <MiniItem icon="school" title={profile.major || 'Major not added'} meta="Major" />
                <MiniItem icon="psychology" title={(profile.skills || []).length ? `${profile.skills.length} skills added` : 'Skills not added'} meta="Skills" />
                <div className="skill-chip-list side-skills">{(profile.skills || []).map((skill) => <span className="skill-chip readonly" key={skill}>{skill}</span>)}</div>
                <button className="danger profile-clear-button" type="button" onClick={clearStudentInfo}>Remove Basic Info</button>
                <div className="side-row">
                  <div>
                    <h3>Public profile & URL</h3>
                    {editingPublicUrl ? (
                      <input value={profile.linkedIn || ''} onChange={(event) => updateProfile({ linkedIn: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter') setEditingPublicUrl(false); }} onBlur={() => setEditingPublicUrl(false)} placeholder="linkedin.com/in/your-profile" />
                    ) : profile.linkedIn ? (
                      <a className="profile-link" href={formatUrl(profile.linkedIn)} target="_blank" rel="noreferrer">{profile.linkedIn}</a>
                    ) : (
                      <p>Add your LinkedIn / CV link</p>
                    )}
                  </div>
                  <button className="icon-button" type="button" onClick={() => setEditingPublicUrl(!editingPublicUrl)} aria-label={editingPublicUrl ? 'Save public profile URL' : 'Edit public profile URL'}>
                    <Icon name={editingPublicUrl ? 'check' : 'edit'} />
                  </button>
                </div>
              </>
            )}
            {user.role === 'Course Instructor' && (
              <>
                <MiniItem icon="article" title={profile.bio || 'Biography not added'} meta="Short biography" />
                <MiniItem icon="science" title={profile.interests || 'Research interests not added'} meta="Research interests" />
                <MiniItem icon="workspace_premium" title={profile.education || 'Education background not added'} meta="Education background" />
                <button className="danger profile-clear-button" type="button" onClick={clearStudentInfo}>Remove Basic Info</button>
              </>
            )}
            {user.role === 'Employer' && (
              <>
                <MiniItem icon="business" title={profile.companyBio || 'Company biography not added'} meta="Company biography" />
                <MiniItem icon="location_on" title={profile.address || 'Address not added'} meta="Address" />
                <MiniItem icon={employerContactType === 'email' ? 'mail' : 'call'} title={profile.contact || 'Contact not added'} meta={employerContactType === 'email' ? 'Email contact' : 'Phone contact'} />
                <button className="danger profile-clear-button" type="button" onClick={clearStudentInfo}>Remove Basic Info</button>
              </>
            )}
          </section>
          </>
          )}
        </div>
      </div>
    </section>
  );
}

function Discovery({ user, projects, people, invitations, favorites, setFavorites, globalSearch, setGlobalSearch, openProject, openProfile, courses: courseCatalog }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Projects');
  const [course, setCourse] = useState('All');
  const [instructor, setInstructor] = useState('All');
  const [createdFrom, setCreatedFrom] = useState('');
  const [createdTo, setCreatedTo] = useState('');
  const [major, setMajor] = useState('All');
  const [skill, setSkill] = useState('All');
  const [sort, setSort] = useState('rating');
  const [portfolioSort, setPortfolioSort] = useState('desc');
  const searchText = query || globalSearch;
  const normalizedSearch = searchText.toLowerCase();
  const courses = ['All', ...new Set(projects.map((p) => p.course))];
  const instructors = ['All', ...new Set(projects.map((p) => p.instructor).filter((name) => name && name !== 'Not assigned'))];
  const majors = ['All', ...new Set(people.filter((p) => p.major).map((p) => p.major))];
  const skills = ['All', ...new Set(people.filter((p) => p.role === 'Student').flatMap((p) => p.skills || []))].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
  const projectMatchesFilters = (p) => {
    if (course !== 'All' && p.course !== course) return false;
    if (instructor !== 'All' && p.instructor !== instructor) return false;
    if (createdFrom && p.createdAt < createdFrom) return false;
    if (createdTo && p.createdAt > createdTo) return false;
    return true;
  };
  const projectResults = useMemo(() => {
    return projects
      .filter((p) => p.active && p.public && projectInstructorState(p, invitations).key === 'active')
      .filter((p) => p.title.toLowerCase().includes(normalizedSearch) || p.creator.toLowerCase().includes(normalizedSearch) || p.instructor.toLowerCase().includes(normalizedSearch) || p.course.toLowerCase().includes(normalizedSearch) || p.languages.join(' ').toLowerCase().includes(normalizedSearch))
      .filter(projectMatchesFilters)
      .sort((a, b) => sort === 'date' ? b.createdAt.localeCompare(a.createdAt) : b.rating - a.rating);
  }, [projects, invitations, normalizedSearch, course, instructor, createdFrom, createdTo, sort]);
  const recommendedProjects = useMemo(() => {
    return projects
      .filter((p) => p.active && p.public && projectInstructorState(p, invitations).key === 'active')
      .filter(projectMatchesFilters)
      .sort((a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);
  }, [projects, invitations, course, instructor, createdFrom, createdTo]);
  const portfolioResults = people
    .filter((p) => p.role === 'Student')
    .filter((p) => p.fullName.toLowerCase().includes(normalizedSearch) || p.email.toLowerCase().includes(normalizedSearch) || (p.skills || []).join(' ').toLowerCase().includes(normalizedSearch))
    .filter((p) => major === 'All' || p.major === major)
    .filter((p) => skill === 'All' || (p.skills || []).includes(skill))
    .sort((a, b) => {
      const countA = publicProjectCount(projects, a.fullName);
      const countB = publicProjectCount(projects, b.fullName);
      return portfolioSort === 'asc' ? countA - countB : countB - countA;
    });
  const instructorResults = people
    .filter((p) => p.role === 'Course Instructor')
    .filter((p) => p.fullName.toLowerCase().includes(normalizedSearch) || p.email.toLowerCase().includes(normalizedSearch) || instructorCourseLabels(p, courseCatalog).join(' ').toLowerCase().includes(normalizedSearch) || (p.interests || '').toLowerCase().includes(normalizedSearch))
    .filter((p) => course === 'All' || instructorCourseLabels(p, courseCatalog).includes(course));
  const canFavorite = user.role === 'Student' || user.role === 'Employer';
  const toggleProject = (id) => {
    setFavorites((items) => ({ ...items, projects: items.projects.includes(id) ? items.projects.filter((value) => value !== id) : [...items.projects, id] }));
  };
  const togglePortfolio = (id) => {
    setFavorites((items) => ({ ...items, portfolios: items.portfolios.includes(id) ? items.portfolios.filter((value) => value !== id) : [...items.portfolios, id] }));
  };
  const resetFilters = () => {
    setQuery('');
    setGlobalSearch('');
    setActiveTab('Projects');
    setCourse('All');
    setInstructor('All');
    setCreatedFrom('');
    setCreatedTo('');
    setMajor('All');
    setSkill('All');
    setSort('rating');
    setPortfolioSort('desc');
  };
  const tabs = [
    ['Projects', projectResults.length],
    ['Portfolios', portfolioResults.length],
    ['Instructors', instructorResults.length],
    ['Recommended', recommendedProjects.length]
  ];
  return (
    <section className="stack discovery-page">
      <div className="discovery-heading">
        <SectionHeader title="Project & Portfolio Discovery" subtitle="Search projects, student portfolios, and course instructors from one place." />
        <div className="discovery-metrics">
          <span><Icon name="school" /> {people.filter((p) => p.role === 'Student').length} students</span>
          <span><Icon name="folder_open" /> {projects.filter((p) => p.public && p.active).length} projects</span>
          <span><Icon name="public" /> {portfolioResults.length} portfolios</span>
        </div>
      </div>
      <div className="discovery-filter-panel">
        <label className="discovery-search"><Icon name="search" /><input value={searchText} onChange={(event) => { setQuery(event.target.value); setGlobalSearch(event.target.value); }} placeholder="Project title, student name, instructor name…" /></label>
        <div className="filter-row">
          {(activeTab === 'Projects' || activeTab === 'Instructors' || activeTab === 'Recommended') && <label>Course<span className="select-shell"><select value={course} onChange={(event) => setCourse(event.target.value)}>{courses.map((value) => <option key={value}>{value}</option>)}</select><Icon name="expand_more" /></span></label>}
          {(activeTab === 'Projects' || activeTab === 'Recommended') && <label>Course instructor<span className="select-shell"><select value={instructor} onChange={(event) => setInstructor(event.target.value)}>{instructors.map((value) => <option key={value}>{value}</option>)}</select><Icon name="expand_more" /></span></label>}
          {(activeTab === 'Projects' || activeTab === 'Recommended') && <label>Created from<input type="date" value={createdFrom} onChange={(event) => setCreatedFrom(event.target.value)} /></label>}
          {(activeTab === 'Projects' || activeTab === 'Recommended') && <label>Created to<input type="date" value={createdTo} onChange={(event) => setCreatedTo(event.target.value)} /></label>}
          {activeTab === 'Portfolios' && <label>Major<span className="select-shell"><select value={major} onChange={(event) => setMajor(event.target.value)}>{majors.map((value) => <option key={value}>{value}</option>)}</select><Icon name="expand_more" /></span></label>}
          {activeTab === 'Portfolios' && <label>Skill<span className="select-shell"><select value={skill} onChange={(event) => setSkill(event.target.value)}>{skills.map((value) => <option key={value}>{value}</option>)}</select><Icon name="expand_more" /></span></label>}
          {activeTab === 'Portfolios' && <label>Project count<span className="select-shell"><select value={portfolioSort} onChange={(event) => setPortfolioSort(event.target.value)}><option value="desc">Descending</option><option value="asc">Ascending</option></select><Icon name="expand_more" /></span></label>}
          {(activeTab === 'Projects' || activeTab === 'Recommended') && <label>Sort<span className="select-shell"><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="rating">Rating</option><option value="date">Creation date</option></select><Icon name="expand_more" /></span></label>}
          <button className="secondary filter-reset" type="button" onClick={resetFilters}><Icon name="tune" /> Reset</button>
        </div>
        <div className="quick-filters">
          <span><Icon name="filter_alt" /> Quick filters:</span>
          <button type="button" onClick={() => setSort('rating')}>Trending</button>
          <button type="button" onClick={() => setSort('date')}>New This Week</button>
          <button type="button" onClick={() => setCourse('Bachelor Project')}>Bachelor Projects</button>
        </div>
      </div>
      <div className="discovery-tabs" role="tablist" aria-label="Discovery categories">
        {tabs.map(([tab, count]) => (
          <button key={tab} className={activeTab === tab ? 'selected' : ''} type="button" onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}>{tab} <span>{count}</span></button>
        ))}
      </div>
      {activeTab === 'Projects' && (
        <>
          <SectionHeader title="Projects" subtitle={`${projectResults.length} matching project titles`} />
          <div className="card-grid">
            {projectResults.map((project) => <ProjectCard key={project.id} project={project} favorite={favorites.projects.includes(project.id)} onFavorite={canFavorite ? () => toggleProject(project.id) : undefined} onSelect={() => openProject(project.id)} />)}
          </div>
          {projectResults.length === 0 && <EmptyState icon="search_off" title="No projects match this search" text="Try a different title, course, creator or programming language." />}
        </>
      )}
      {activeTab === 'Portfolios' && (
        <>
          <SectionHeader title="Portfolios" subtitle={`${portfolioResults.length} matching public portfolios, sorted by project count ${portfolioSort === 'asc' ? 'ascending' : 'descending'}`} />
          <div className="card-grid">
            {portfolioResults.map((person) => <PortfolioDiscoveryCard key={person.id} person={person} projectCount={publicProjectCount(projects, person.fullName)} favorite={favorites.portfolios.includes(person.id)} onFavorite={canFavorite ? () => togglePortfolio(person.id) : undefined} onSelect={() => openProfile(person.email)} />)}
          </div>
          {portfolioResults.length === 0 && <EmptyState icon="person_search" title="No portfolios match this search" text="Try another major, skill, student name or email." />}
        </>
      )}
      {activeTab === 'Instructors' && (
        <>
          <SectionHeader title="Course Instructors" subtitle={`${instructorResults.length} matching instructors`} />
          <div className="card-grid">
            {instructorResults.map((person) => <InstructorDiscoveryCard key={person.id} person={person} courses={courseCatalog} onSelect={() => openProfile(person.email)} />)}
          </div>
          {instructorResults.length === 0 && <EmptyState icon="school" title="No instructors match this search" text="Try another instructor name, email, course or research interest." />}
        </>
      )}
      {activeTab === 'Recommended' && (
        <>
          <SectionHeader title="Recommended Projects" subtitle="Ranked from favorite courses, ratings and recent activity." />
          <div className="card-grid">
            {recommendedProjects.map((project) => <ProjectCard key={project.id} project={project} favorite={favorites.projects.includes(project.id)} onFavorite={canFavorite ? () => toggleProject(project.id) : undefined} onSelect={() => openProject(project.id)} />)}
          </div>
          {recommendedProjects.length === 0 && <EmptyState icon="workspace_premium" title="No recommendations yet" text="Try another course or clear the filters." />}
        </>
      )}
    </section>
  );
}

function FavoritesHub({ user, favorites, setFavorites, projects, people, openProject, openProfile }) {
  const savedProjects = projects.filter((project) => favorites.projects.includes(project.id));
  const savedPortfolios = people.filter((person) => favorites.portfolios.includes(person.id));
  const canFavorite = user.role === 'Student' || user.role === 'Employer';
  const toggleProject = (id) => {
    setFavorites((items) => ({ ...items, projects: items.projects.includes(id) ? items.projects.filter((value) => value !== id) : [...items.projects, id] }));
  };
  const togglePortfolio = (id) => {
    setFavorites((items) => ({ ...items, portfolios: items.portfolios.includes(id) ? items.portfolios.filter((value) => value !== id) : [...items.portfolios, id] }));
  };
  return (
    <section className="stack">
      <SectionHeader title="Favorites" subtitle="Keep your saved projects and portfolios in one polished shortlist." />
      <SectionHeader title="Saved Projects" subtitle={savedProjects.length ? `${savedProjects.length} project${savedProjects.length === 1 ? '' : 's'} bookmarked` : 'No saved projects yet'} />
      {savedProjects.length > 0 ? (
        <div className="card-grid">
          {savedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              favorite={favorites.projects.includes(project.id)}
              onFavorite={canFavorite ? () => toggleProject(project.id) : undefined}
              onSelect={() => openProject(project.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon="star" title="No saved projects yet" text="Use the gold star on discovery cards to build a shortlist of projects worth revisiting." />
      )}
      <SectionHeader title="Saved Portfolios" subtitle={savedPortfolios.length ? `${savedPortfolios.length} portfolio${savedPortfolios.length === 1 ? '' : 's'} bookmarked` : 'No saved portfolios yet'} />
      {savedPortfolios.length > 0 ? (
        <div className="portfolio-grid">
          {savedPortfolios.map((person) => (
            <article className="portfolio-card" key={person.id}>
              <div className="portfolio-top">
                <span className="avatar">{initials(person.fullName)}</span>
                <div>
                  <h3>{person.fullName}</h3>
                  <p>{person.major || 'Student portfolio'}</p>
                </div>
                <div className="portfolio-count">
                  <strong>{publicProjectCount(projects, person.fullName)}</strong>
                  <small>public projects</small>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="chips">{(person.skills || []).slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
              <div className="card-actions portfolio-actions">
                <button className="text-button" onClick={() => openProfile(person.email)}>View Portfolio</button>
                {canFavorite && <button className="icon-button favorite-active" onClick={() => togglePortfolio(person.id)} aria-label="Remove saved portfolio" aria-pressed="true"><Icon name="star" /></button>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon="person" title="No saved portfolios yet" text="Star strong student portfolios from discovery and they will appear here automatically." />
      )}
    </section>
  );
}

function ProjectStudio({ user, projects, setProjects, courses, people, invitations, setInvitations, setNotifications, drafts, setDrafts, favorites, workspaceProjectId, openProject, openWorkspaceProject, openProfile, notify }) {
  const blank = { title: '', course: 'Bachelor Project', github: '', report: '', demo: '', languages: '', public: true, invitees: [], thesisDraftName: '', thesisDraftUrl: '' };
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [pendingTeamInvites, setPendingTeamInvites] = useState([]);
  const [inviteSearch, setInviteSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectVisibilityFilter, setProjectVisibilityFilter] = useState('All');
  const [showProjectForm, setShowProjectForm] = useState(false);
  if (user.role !== 'Student') {
    return (
      <section className="stack">
        <SectionHeader title="Project Access" subtitle="This workspace is read-only for your account type." />
        <div className="card-grid">
          {projects.filter((project) => favorites.projects.includes(project.id) || user.role === 'Employer').slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} favorite={favorites.projects.includes(project.id)} onSelect={() => openProject(project.id)} />
          ))}
        </div>
      </section>
    );
  }
  const acceptedProjectIds = invitations.filter((invite) => invite.email === user.email && invite.status === 'Accepted').map((invite) => invite.projectId);
  const myProjects = projects
    .filter((project) => project.creator === user.fullName || acceptedProjectIds.includes(project.id))
    .filter((project) => projectInstructorState(project, invitations).key !== 'expired');
  const projectFilter = projectSearch.toLowerCase();
  const visibleProjects = myProjects.filter((project) => (
    project.title.toLowerCase().includes(projectFilter)
    || project.course.toLowerCase().includes(projectFilter)
    || project.languages.join(' ').toLowerCase().includes(projectFilter)
  )).filter((project) => projectVisibilityFilter === 'All' || (projectVisibilityFilter === 'Public' ? project.public : !project.public));
  const selectedCourse = courses.find((course) => course.name === form.course);
  const candidatePeople = people
    .filter((person) => person.role === 'Student' || person.role === 'Course Instructor')
    .filter((person) => person.email !== user.email)
    .filter((person) => !(form.course === 'Bachelor Project' && person.role === 'Student'))
    .filter((person) => {
      if (!inviteSearch) return false;
      const haystack = `${person.fullName} ${person.email}`.toLowerCase();
      return haystack.includes(inviteSearch.toLowerCase()) && canInvitePersonToCourse(person, form.course, selectedCourse, people);
    });
  const editingProjectInvites = editingId ? pendingTeamInvites : [];
  const addInvitee = (person) => {
    if (form.invitees.some((invitee) => invitee.email === person.email)) return;
    setForm((current) => ({ ...current, invitees: [...current.invitees, { name: person.fullName, email: person.email, role: person.role === 'Course Instructor' ? 'Course Instructor' : 'Collaborator' }] }));
  };
  const attachInitialThesisDraft = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      notify('Thesis draft must be a PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, thesisDraftName: file.name, thesisDraftUrl: reader.result }));
    reader.readAsDataURL(file);
  };
  const removePendingTeamInvite = (inviteId) => {
    const invite = pendingTeamInvites.find((item) => item.id === inviteId);
    if (invite && !window.confirm(`${invite.status === 'Accepted' ? 'Remove' : 'Withdraw the invitation for'} ${invite.person} from this project?`)) return;
    setPendingTeamInvites((items) => items.filter((item) => item.id !== inviteId));
  };
  const resetEditor = () => {
    setForm(blank);
    setEditingId(null);
    setPendingTeamInvites([]);
    setInviteSearch('');
    setShowProjectForm(false);
  };
  const save = () => {
    if (!form.title || !form.github) {
      notify('Project title and GitHub link are required.');
      return;
    }
    if (!editingId && !form.invitees.some((invitee) => invitee.role === 'Course Instructor')) {
      notify('Invite at least one course instructor before creating the project.');
      return;
    }
    const editingProject = editingId ? projects.find((project) => project.id === editingId) : null;
    if (editingProject && projectIsLocked(editingProject)) {
      notify('This project is locked and cannot be edited.');
      return;
    }
    const projectPayload = {
      title: form.title,
      course: form.course,
      github: formatUrl(form.github),
      report: form.report,
      demo: formatUrl(form.demo),
      public: form.public,
      languages: form.languages.split(',').map((item) => item.trim()).filter(Boolean),
      instructor: editingProject?.instructor || 'Not assigned'
    };
    if (editingId) {
      setProjects((items) => items.map((project) => project.id === editingId ? { ...project, ...projectPayload } : project));
      const originalInvites = invitations.filter((invite) => invite.projectId === editingId);
      const removedInvites = originalInvites.filter((invite) => !pendingTeamInvites.some((item) => item.id === invite.id));
      removedInvites.forEach((invite) => {
        cancelInvitation(invite, setInvitations, setProjects, setNotifications, user);
      });
      form.invitees.forEach((invitee) => createInvitation(editingId, form.title, user, invitee, invitations, setInvitations, setNotifications));
      notify('Project updated.');
    } else {
      const id = Date.now();
      setProjects((items) => [{ id, ...projectPayload, creator: user.fullName, createdAt: new Date().toISOString().slice(0, 10), rating: 0, active: true, favorite: false, image: images[0], collaborators: [], instructorInvites: [], comments: [], flagged: false }, ...items]);
      if (form.course === 'Bachelor Project' && form.thesisDraftUrl) {
        setDrafts((items) => [{
          id: id + 1,
          name: form.thesisDraftName,
          documentUrl: form.thesisDraftUrl,
          projectId: id,
          project: form.title,
          visibility: 'Private',
          final: false,
          uploadedAt: new Date().toISOString().slice(0, 10),
          feedback: []
        }, ...items]);
      }
      form.invitees.forEach((invitee) => createInvitation(id, form.title, user, invitee, invitations, setInvitations, setNotifications));
      notify('Project created with automatic creation date.');
    }
    resetEditor();
  };
  const edit = (project) => {
    if (projectIsLocked(project)) {
      notify('This project is locked and cannot be edited.');
      return;
    }
    setEditingId(project.id);
    setShowProjectForm(true);
    setForm({ ...project, languages: project.languages.join(', '), invitees: [] });
    setPendingTeamInvites(invitations.filter((invite) => invite.projectId === project.id));
  };
  const remove = (id) => {
    const project = projects.find((item) => item.id === id);
    if (!window.confirm(`Delete ${project?.title || 'this project'}? This cannot be undone.`)) return;
    setProjects((items) => items.filter((project) => project.id !== id));
    notify('Project deleted.');
  };
  const toggleVisibility = (id) => {
    setProjects((items) => items.map((project) => project.id === id ? { ...project, public: !project.public } : project));
    notify('Project visibility changed.');
  };
  return (
    <section className="stack project-studio-page">
      <div className="project-studio-head">
        <SectionHeader title="My Projects" subtitle="Create, view, update, delete, and control whether each project is public or private." />
        <div className="project-counters">
          <span>{myProjects.length} total</span>
          <span>{myProjects.filter((project) => project.public).length} public</span>
          <span>{myProjects.filter((project) => !project.public).length} private</span>
        </div>
      </div>
      <div className={`panel project-composer ${showProjectForm || editingId ? 'expanded' : ''}`}>
        <button className="composer-toggle" type="button" onClick={() => setShowProjectForm((open) => !open)}>
          <span><Icon name="add" /> {editingId ? 'Edit Project' : 'Create Project'}</span>
          <small>{showProjectForm || editingId ? 'Fill in the fields below and hit Create when ready' : 'Expand the project form'}</small>
        </button>
        {(showProjectForm || editingId) && (
          <div className="form-grid project-form">
            <label>Project title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Predictive Health Analysis" /></label>
            <label>Course<span className="select-shell"><select value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value, invitees: [] })}>{courses.map((course) => <option key={course.id}>{course.name}</option>)}</select><Icon name="expand_more" /></span></label>
            <label><span className="label-icon"><Icon name="code" /> GitHub link</span><input value={form.github} onChange={(event) => setForm({ ...form, github: event.target.value })} placeholder="https://github.com/name/repo" /></label>
            <label><span className="label-icon"><Icon name="play_circle" /> Demo video link</span><input value={form.demo} onChange={(event) => setForm({ ...form, demo: event.target.value })} placeholder="https://..." /></label>
            <label className="full-label"><span className="label-icon"><Icon name="article" /> Project report</span><textarea className="report-input" value={form.report} onChange={(event) => setForm({ ...form, report: event.target.value })} placeholder="Write the project report summary, scope, implementation details and outcomes." /></label>
            <label>Programming languages<input value={form.languages} onChange={(event) => setForm({ ...form, languages: event.target.value })} placeholder="React, Python" /></label>
            {form.course === 'Bachelor Project' && !editingId && <label className="upload-tile"><Icon name="picture_as_pdf" /> Thesis draft PDF<input type="file" accept="application/pdf" onChange={attachInitialThesisDraft} />{form.thesisDraftName ? <small>{form.thesisDraftName}</small> : <small>Optional · max 10 MB</small>}</label>}
            <label className="visibility-card visibility-choice"><input type="checkbox" checked={form.public} onChange={(event) => setForm({ ...form, public: event.target.checked })} /><span><strong><Icon name={form.public ? 'public' : 'lock'} />{form.public ? 'Public project' : 'Private'}</strong><small>{form.public ? 'Visible in discovery and on your portfolio.' : 'Only you and invited instructors.'}</small></span></label>
            <div className="invite-picker">
              <label><span className="label-icon"><Icon name="group_add" /> Invite course instructors</span><input value={inviteSearch} onChange={(event) => setInviteSearch(event.target.value)} placeholder="Search by first name, last name or email" /></label>
              {candidatePeople.length > 0 && (
                <div className="mini-list candidate-scroll">
                  {candidatePeople.map((person) => (
                    <div key={person.id} className="candidate-row">
                      <span className="avatar small-avatar">{initials(person.fullName)}</span>
                      <span>{person.fullName}<small>{person.email}</small></span>
                      <span className="candidate-actions"><button className="text-button" type="button" onClick={() => openProfile(person.email)}>{person.role === 'Course Instructor' ? 'View Profile' : 'View Portfolio'}</button><button className="primary small-action" type="button" disabled={form.invitees.some((invitee) => invitee.email === person.email)} onClick={() => addInvitee(person)}>{form.invitees.some((invitee) => invitee.email === person.email) ? 'Invited' : 'Invite'}</button></span>
                    </div>
                  ))}
                </div>
              )}
              {form.invitees.length > 0 && <div className="chips">{form.invitees.map((invitee) => <span key={invitee.email}>{invitee.name} <button type="button" onClick={() => setForm((current) => ({ ...current, invitees: current.invitees.filter((item) => item.email !== invitee.email) }))}>x</button></span>)}</div>}
            </div>
            {editingId && (
              <div className="form-section">
                <h3>Current Team</h3>
                <div className="mini-list">
                  {editingProjectInvites.map((invite) => (
                    <div className="mini-row" key={invite.id}>
                      <Icon name={invite.status === 'Accepted' ? 'group' : 'outgoing_mail'} />
                      <div><strong>{invite.person}</strong><small>{invite.role} / {invitationStatusLabel(invite.status)}</small></div>
                      {invite.status === 'Accepted'
                        ? <button className="danger" type="button" onClick={() => removePendingTeamInvite(invite.id)}>Remove</button>
                        : <button className="text-button" type="button" onClick={() => removePendingTeamInvite(invite.id)}>Withdraw Invite</button>}
                    </div>
                  ))}
                  {editingProjectInvites.length === 0 && <p className="muted">No collaborators or instructor invitations yet.</p>}
                </div>
              </div>
            )}
            <div className="actions composer-actions">
              <button className="primary" onClick={save}><Icon name="add" /> {editingId ? 'Save Changes' : 'Create Project'}</button>
              {editingId && <button className="secondary" type="button" onClick={resetEditor}>Cancel</button>}
            </div>
          </div>
        )}
      </div>
      <div className="project-repository-head">
        <SectionHeader title="Project Repository" subtitle={`${visibleProjects.length} projects shown`} />
        <div className="repo-filters">
          {['All', 'Public', 'Private'].map((filter) => <button key={filter} className={projectVisibilityFilter === filter ? 'selected' : ''} type="button" onClick={() => setProjectVisibilityFilter(filter)}>{filter}</button>)}
          <label className="wide-search"><Icon name="search" /><input value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Search my projects..." /></label>
        </div>
      </div>
      <div className="repo-list">
        {visibleProjects.map((project) => {
          const state = projectInstructorState(project, invitations);
          const locked = projectIsLocked(project);
          return (
            <div className={`repo-row project-repo-row ${accentClass(project.course)} ${locked ? 'locked-row' : ''}`} key={project.id}>
              <div className="repo-main">
                <Icon name={locked ? 'lock' : 'layers'} />
                <div>
                  <div className="repo-title-line">
                    <button className="repo-title-display" type="button" onClick={() => openProject(project.id)}>{project.title}</button>
                    {project.creator === user.fullName && !locked && (
                      <button className="icon-button repo-edit-button" type="button" onClick={() => edit(project)} aria-label={`Edit ${project.title}`}>
                        <Icon name="edit" />
                      </button>
                    )}
                  </div>
                  <small>{project.course} · {project.createdAt} · {locked ? 'Locked' : project.creator === user.fullName ? (project.public ? 'Public' : 'Private') : `Shared by ${project.creator}`}</small>
                  <p>{project.report}</p>
                  <div className="chips">{project.languages.map((language) => <span key={language}>{language}</span>)}</div>
                </div>
              </div>
              <div className="repo-status-row">
                <span className={`badge ${state.badge}`}>{state.label}</span>
                <span className={`badge ${project.public ? 'accepted' : 'student'}`}>{project.public ? 'Public' : 'Private'}</span>
                {project.creator === user.fullName && !locked && (
                  <button className="icon-button visibility-toggle" onClick={() => toggleVisibility(project.id)} aria-label={project.public ? 'Hide project' : 'Show project'} aria-pressed={project.public}>
                    <Icon name={project.public ? 'visibility_off' : 'visibility'} />
                  </button>
                )}
              </div>
              <div className="repo-actions">
                <button className={locked ? 'secondary small-action' : 'primary small-action'} onClick={() => openWorkspaceProject(project.id)}><Icon name={locked ? 'lock' : 'groups'} /> Workspace</button>
                {locked && <span className="badge administrator">Locked</span>}
                {project.creator === user.fullName && !locked && <button className="danger small-action" onClick={() => remove(project.id)}><Icon name="delete" /> Delete</button>}
              </div>
            </div>
          );
        })}
        {visibleProjects.length === 0 && <EmptyState icon="folder_off" title="No projects yet" text="Create your first project with a title, course, report, links, languages and instructor invite." />}
      </div>
    </section>
  );
}

function GlobalInvitationsHub({ user, tasks, setTasks, invitations, setInvitations, setNotifications, projects, setProjects, people, drafts, setDrafts, openPdfFile }) {
  const [instructorTab, setInstructorTab] = useState('invitations');
  const [selectedFeedbackProjectId, setSelectedFeedbackProjectId] = useState('');
  const [projectFeedbackDraft, setProjectFeedbackDraft] = useState({ rating: 5, comment: '' });
  const [selectedThesisDraftId, setSelectedThesisDraftId] = useState('');
  const [thesisFeedbackDraft, setThesisFeedbackDraft] = useState('');
  const receivedInvites = invitations.filter((invite) => invite.email === user.email);
  const sentInvites = invitations.filter((invite) => invite.senderEmail === user.email);
  const instructorInvites = invitations.filter((invite) => invite.role === 'Course Instructor' && invite.email === user.email);
  const instructorProjects = projects.filter((project) => {
    const acceptedInvite = invitations.some((invite) => invite.projectId === project.id && invite.email === user.email && invite.role === 'Course Instructor' && invite.status === 'Accepted');
    return project.instructor === user.fullName || (project.instructorInvites || []).includes(user.fullName) || acceptedInvite;
  });
  const selectedFeedbackProject = instructorProjects.find((project) => project.id === Number(selectedFeedbackProjectId)) || instructorProjects[0];
  const selectedProjectTasks = tasks.filter((task) => task.projectId === selectedFeedbackProject?.id);
  const selectedProjectInvites = invitations.filter((invite) => invite.projectId === selectedFeedbackProject?.id && invite.status === 'Accepted');
  const selectedProjectDrafts = thesisDraftsForProject(selectedFeedbackProject, drafts);
  const selectedFinalDraft = finalThesisDraft(selectedFeedbackProject, drafts);
  const instructorThesisDrafts = feedbackDraftsForInstructor(selectedFeedbackProject, drafts, user, invitations);
  const selectedThesisDraft = instructorThesisDrafts.find((draft) => draft.id === Number(selectedThesisDraftId)) || instructorThesisDrafts[0];
  const myProjectReview = selectedFeedbackProject?.reviews?.find((review) => review.instructorEmail === user.email);
  const notifyTaskFeedback = (task) => {
    const project = projects.find((item) => item.id === task.projectId);
    if (!project) return;
    projectMemberEmails(project, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Task feedback',
        text: `${user.fullName} updated feedback on ${task.title} in ${project.title}.`
      });
    });
  };
  const saveProjectFeedback = () => {
    if (!selectedFeedbackProject) return;
    const ratingValue = Math.min(5, Math.max(1, Number(projectFeedbackDraft.rating) || 1));
    const comment = projectFeedbackDraft.comment.trim();
    setProjects((items) => items.map((project) => {
      if (project.id !== selectedFeedbackProject.id) return project;
      const nextReviews = [
        ...(project.reviews || []).filter((review) => review.instructorEmail !== user.email),
        { instructor: user.fullName, instructorEmail: user.email, rating: ratingValue, comment, createdAt: new Date().toISOString() }
      ];
      const nextRating = nextReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / nextReviews.length;
      return { ...project, reviews: nextReviews, rating: Number(nextRating.toFixed(1)), comments: comment ? [...(project.comments || []), `${user.fullName}: ${comment}`] : project.comments || [] };
    }));
    projectMemberEmails(selectedFeedbackProject, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Project feedback',
        text: `${user.fullName} left feedback on ${selectedFeedbackProject.title}.`
      });
    });
    setProjectFeedbackDraft({ rating: 5, comment: '' });
  };
  const removeProjectFeedback = () => {
    if (!selectedFeedbackProject || !myProjectReview) return;
    if (!window.confirm(`Remove your feedback from ${selectedFeedbackProject.title}?`)) return;
    setProjects((items) => items.map((project) => {
      if (project.id !== selectedFeedbackProject.id) return project;
      const nextReviews = (project.reviews || []).filter((review) => review.instructorEmail !== user.email);
      const nextRating = nextReviews.length ? nextReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / nextReviews.length : 0;
      return { ...project, reviews: nextReviews, rating: Number(nextRating.toFixed(1)) };
    }));
  };
  const removeTaskFeedback = (task) => {
    if (!window.confirm(`Remove feedback from ${task.title}?`)) return;
    setTasks((items) => items.map((item) => item.id === task.id ? { ...item, feedback: '' } : item));
  };
  const saveThesisFeedback = () => {
    const comment = thesisFeedbackDraft.trim();
    if (!selectedFeedbackProject || !selectedThesisDraft || !comment) return;
    setDrafts((items) => items.map((draft) => draft.id === selectedThesisDraft.id ? {
      ...draft,
      feedback: [...(draft.feedback || []), { instructor: user.fullName, comment, createdAt: new Date().toISOString() }]
    } : draft));
    projectMemberEmails(selectedFeedbackProject, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Thesis feedback',
        text: `${user.fullName} commented on a thesis draft for ${selectedFeedbackProject.title}.`
      });
    });
    setThesisFeedbackDraft('');
  };
  const renderInstructorInviteSection = (title, statuses) => {
    const items = instructorInvites.filter((invite) => statuses.includes(invite.status));
    return (
      <div className="panel instructor-invite-box">
        <SectionHeader title={title} subtitle={`${items.length} invitation${items.length === 1 ? '' : 's'}`} />
        <div className="mini-list fixed-scroll-list">
          {items.map((invite) => (
            <div className="mini-row invite-row" key={invite.id}>
              <Icon name={invite.status === 'Accepted' ? 'task_alt' : invite.status === 'Rejected' ? 'block' : 'outgoing_mail'} />
              <div><strong>{invite.project}</strong><small>{invite.sender} / {invitationStatusLabel(invite.status)}</small></div>
              {invite.status === 'No reply' ? (
                <div className="inline-actions">
                  <button className="text-button" onClick={() => updateInvitationStatus(invite, 'Accepted', user, setInvitations, setProjects, setNotifications)}>Accept</button>
                  <button className="danger" onClick={() => window.confirm(`Reject the invitation to join ${invite.project}?`) && updateInvitationStatus(invite, 'Rejected', user, setInvitations, setProjects, setNotifications)}>Reject</button>
                </div>
              ) : <span className={`badge ${invite.status === 'Accepted' ? 'accepted' : 'rejected'}`}>{invitationStatusLabel(invite.status)}</span>}
            </div>
          ))}
          {items.length === 0 && <EmptyState icon="mail" title={`No ${title.toLowerCase()}`} text="Matching instructor invitations will appear here." />}
        </div>
      </div>
    );
  };
  if (user.role === 'Course Instructor') {
    return (
      <section className="stack instructor-feedback-page">
        <SectionHeader title="Invitations & Feedback" subtitle="Review project invitations separately from task and project feedback." />
        <div className="workspace-tabs" role="tablist" aria-label="Instructor invitations and feedback">
          <button className={instructorTab === 'invitations' ? 'selected' : ''} type="button" onClick={() => setInstructorTab('invitations')} role="tab" aria-selected={instructorTab === 'invitations'}>Invitations</button>
          <button className={instructorTab === 'feedback' ? 'selected' : ''} type="button" onClick={() => setInstructorTab('feedback')} role="tab" aria-selected={instructorTab === 'feedback'}>Feedback</button>
        </div>
        {instructorTab === 'invitations' ? (
          <div className="instructor-invite-board">
            {renderInstructorInviteSection('Accepted', ['Accepted'])}
            {renderInstructorInviteSection('Pending', ['No reply'])}
            {renderInstructorInviteSection('Rejected', ['Rejected'])}
          </div>
        ) : (
          <div className="two-column instructor-feedback-grid">
            <div className="instructor-feedback-column">
              <div className="panel form-grid">
                <SectionHeader title="Project Feedback" subtitle="Select a linked project, rate it, and leave a general note." />
                {instructorProjects.length > 0 ? (
                  <>
                    <label className="full-label">Project<span className="select-shell"><select value={selectedFeedbackProject?.id || ''} onChange={(event) => { setSelectedFeedbackProjectId(event.target.value); setSelectedThesisDraftId(''); }}>{instructorProjects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select><Icon name="expand_more" /></span></label>
                    <div className="star-field full-label">
                      <span>Rating out of 5</span>
                      <StarRating value={projectFeedbackDraft.rating} onChange={(rating) => setProjectFeedbackDraft((current) => ({ ...current, rating }))} />
                    </div>
                    <label className="full-label">General feedback<textarea value={projectFeedbackDraft.comment} onChange={(event) => setProjectFeedbackDraft((current) => ({ ...current, comment: event.target.value }))} placeholder="Feedback visible to the project team" /></label>
                    <div className="actions full-label">
                      <button className="primary" onClick={saveProjectFeedback}>Save Feedback</button>
                      {myProjectReview && <button className="danger" type="button" onClick={removeProjectFeedback}>Remove My Feedback</button>}
                    </div>
                  </>
                ) : <EmptyState icon="rate_review" title="No linked projects" text="Accepted instructor invitations will appear here." />}
              </div>
              <div className="panel task-feedback-panel">
                <SectionHeader title="Task Feedback" subtitle={selectedFeedbackProject ? `Tasks in ${selectedFeedbackProject.title}` : 'Choose a project first'} />
                <div className="mini-list fixed-scroll-list">
                  {selectedProjectTasks.map((task) => (
                    <div className="mini-row feedback-row" key={task.id}>
                      <Icon name="rate_review" />
                      <div><strong>{task.title}</strong><small>Assigned to {task.assignee} / {task.status}</small></div>
                      <input value={task.feedback} onChange={(event) => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, feedback: event.target.value } : item))} onBlur={() => notifyTaskFeedback(task)} placeholder="Add task feedback" />
                      <button className="danger" onClick={() => removeTaskFeedback(task)}>Remove</button>
                    </div>
                  ))}
                  {selectedProjectTasks.length === 0 && <EmptyState icon="task" title="No tasks yet" text="Tasks for the selected project will appear here." />}
                </div>
              </div>
            </div>
            <div className="instructor-feedback-column">
              <div className="panel project-detail-summary">
                <SectionHeader title="Project Details" subtitle={selectedFeedbackProject ? `${selectedFeedbackProject.course} / ${selectedFeedbackProject.creator}` : 'Choose a project first'} />
                {selectedFeedbackProject ? (
                  <>
                    <div className="three-grid compact-grid">
                      <MiniItem icon="person" title={selectedFeedbackProject.creator} meta="Project creator" />
                      <MiniItem icon="menu_book" title={selectedFeedbackProject.course} meta="Course" />
                      <MiniItem icon="groups" title={`${selectedProjectInvites.length} accepted`} meta="Accepted members" />
                    </div>
                    <div className="chips">{(selectedFeedbackProject.languages || []).map((language) => <span key={language}>{language}</span>)}</div>
                    <section className="report-box">
                      <h3>Project Report</h3>
                      <p>{selectedFeedbackProject.report || 'No project report has been written yet.'}</p>
                    </section>
                  </>
                ) : <EmptyState icon="folder_open" title="No project selected" text="Accepted projects will appear here." />}
              </div>
              {isBachelorCourse(selectedFeedbackProject?.course) && (
                <div className="panel thesis-review-panel">
                  <SectionHeader title="Thesis Feedback" subtitle={selectedFinalDraft ? 'Final thesis selected; feedback is limited to the final thesis.' : 'No final thesis selected; feedback can target any draft.'} />
                  <div className="mini-list">
                    {instructorThesisDrafts.map((draft) => (
                      <div className="thesis-feedback-block" key={draft.id}>
                        <div className="mini-row">
                          <Icon name={draft.final ? 'verified' : 'draft'} />
                          <div><strong>{draft.name}</strong><small>{draft.final ? 'Final thesis' : 'Draft'} / uploaded {draft.uploadedAt}</small></div>
                          {draft.documentUrl && <button className="text-button" type="button" onClick={() => openPdfFile({ name: draft.name, url: draft.documentUrl })}>View PDF</button>}
                        </div>
                        {(draft.feedback || []).map((item) => <MiniItem key={`${draft.id}-${item.instructor}-${item.createdAt}`} icon="rate_review" title={item.instructor} meta={item.comment} />)}
                      </div>
                    ))}
                    {selectedProjectDrafts.length === 0 && <EmptyState icon="draft" title="No thesis drafts yet" text="Student uploads for this Bachelor Project will appear here." />}
                  </div>
                  {instructorThesisDrafts.length > 0 && (
                    <div className="form-grid feedback-editor">
                      <label className="full-label">Draft<span className="select-shell"><select value={selectedThesisDraft?.id || ''} onChange={(event) => setSelectedThesisDraftId(event.target.value)}>{instructorThesisDrafts.map((draft) => <option key={draft.id} value={draft.id}>{draft.name}{draft.final ? ' - final thesis' : ''}</option>)}</select><Icon name="expand_more" /></span></label>
                      <label className="full-label">Thesis feedback<textarea value={thesisFeedbackDraft} onChange={(event) => setThesisFeedbackDraft(event.target.value)} placeholder="Feedback visible only to project students and assigned instructors" /></label>
                      <button className="primary" type="button" onClick={saveThesisFeedback}>Save Thesis Feedback</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
  return (
    <section className="stack">
      <SectionHeader title="Invitations" subtitle="Manage invitations across all projects without entering a project workspace." />
      <div className="two-column">
        <div className="panel">
          <SectionHeader title="Received Invitations" subtitle="Accepting a collaborator invite adds the project to your workspace." />
          <div className="mini-list course-management-list">
            {receivedInvites.map((invite) => (
              <div className="mini-row invite-row" key={invite.id}>
                <Icon name="mark_email_unread" />
                <div><strong>{invite.project}</strong><small>{invite.sender} invited you as {invite.role}. Status: {invitationStatusLabel(invite.status)}.</small></div>
                {invite.status === 'No reply' ? (
                  <div className="inline-actions">
                    <button className="text-button" onClick={() => updateInvitationStatus(invite, 'Accepted', user, setInvitations, setProjects, setNotifications)}>Accept</button>
                    <button className="danger" onClick={() => window.confirm(`Reject the invitation to join ${invite.project}?`) && updateInvitationStatus(invite, 'Rejected', user, setInvitations, setProjects, setNotifications)}>Reject</button>
                  </div>
                ) : (
                  <span className={`badge ${invite.status === 'Accepted' ? 'student' : 'administrator'}`}>{invitationStatusLabel(invite.status)}</span>
                )}
              </div>
            ))}
            {receivedInvites.length === 0 && <EmptyState icon="mail" title="No received invitations" text="Invites sent to this account will appear here." />}
          </div>
        </div>
        <div className="panel">
          <SectionHeader title="Sent Invitations" subtitle="Track requests you sent from project workspaces." />
          <div className="mini-list">
            {sentInvites.map((invite) => (
              <div className="mini-row invite-row" key={invite.id}>
                <Icon name="outgoing_mail" />
                <div><strong>{invite.person}</strong><small>{invite.project} / {invite.role} / {invitationStatusLabel(invite.status)}</small></div>
                {invite.status === 'No reply' && <button className="text-button" onClick={() => cancelInvitation(invite, setInvitations, setProjects, setNotifications, user)}>Cancel invitation</button>}
              </div>
            ))}
            {sentInvites.length === 0 && <EmptyState icon="outgoing_mail" title="No sent invitations" text="Invitations you send from a project workspace will appear here." />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectWorkspace({ user, tasks, setTasks, invitations, setInvitations, setNotifications, drafts, setDrafts, projects, setProjects, people, courses, workspaceProjectId, openProfile, openPdfFile, notify }) {
  const ownedProjects = projects.filter((project) => project.creator === user.fullName && projectInstructorState(project, invitations).key !== 'expired');
  const acceptedProjectIds = invitations.filter((invite) => invite.email === user.email && invite.status === 'Accepted').map((invite) => invite.projectId);
  const memberProjects = projects.filter((project) => acceptedProjectIds.includes(project.id) && project.creator !== user.fullName && projectInstructorState(project, invitations).key !== 'expired');
  const accessibleProjects = [...ownedProjects, ...memberProjects];
  const [selectedProjectId, setSelectedProjectId] = useState(workspaceProjectId || accessibleProjects[0]?.id || projects[0]?.id || 1);
  const [workspaceTab, setWorkspaceTab] = useState('details');
  const [taskForm, setTaskForm] = useState({ title: '', assignee: user.fullName || 'Alex Miller', status: 'Pending', deadline: '' });
  const [inviteQuery, setInviteQuery] = useState('');
  useEffect(() => {
    if (workspaceProjectId && accessibleProjects.some((project) => project.id === workspaceProjectId)) {
      setSelectedProjectId(workspaceProjectId);
    }
  }, [workspaceProjectId]);
  if (user.role === 'Course Instructor') {
    const myInvites = invitations.filter((invite) => invite.role === 'Course Instructor' && invite.email === user.email);
    const instructorTasks = tasks.filter((task) => {
      const project = projects.find((item) => item.id === task.projectId);
      return project?.instructor === user.fullName || (project?.instructorInvites || []).includes(user.fullName);
    });
    const notifyTaskFeedback = (task) => {
      const project = projects.find((item) => item.id === task.projectId);
      if (!project) return;
      projectMemberEmails(project, people, invitations).forEach((email) => {
        pushNotification(setNotifications, {
          email,
          role: 'Student',
          type: 'Task feedback',
          text: `${user.fullName} updated feedback on ${task.title} in ${project.title}.`
        });
      });
    };
    return (
      <section className="stack">
        <SectionHeader title="Instructor Invitations & Task Feedback" subtitle="Respond to project invitations and add, edit or remove feedback on assigned tasks." />
        <div className="two-column">
          <div className="panel">
            <h2>Project Invitations</h2>
            <div className="mini-list">
            {myInvites.map((invite) => (
              <div className="mini-row" key={invite.id}>
                <Icon name="outgoing_mail" />
                <div><strong>{invite.project}</strong><small>{invite.sender} invited you as {invite.role}. Status: {invitationStatusLabel(invite.status)}.</small></div>
                {invite.status === 'No reply' ? (
                  <div className="inline-actions">
                    <button className="text-button" onClick={() => updateInvitationStatus(invite, 'Accepted', user, setInvitations, setProjects, setNotifications)}>Accept</button>
                    <button className="danger" onClick={() => window.confirm(`Reject the invitation to join ${invite.project}?`) && updateInvitationStatus(invite, 'Rejected', user, setInvitations, setProjects, setNotifications)}>Reject</button>
                  </div>
                ) : (
                  <span className={`badge ${invite.status === 'Accepted' ? 'student' : 'administrator'}`}>{invitationStatusLabel(invite.status)}</span>
                )}
              </div>
            ))}
            {myInvites.length === 0 && <EmptyState icon="mail" title="No invitations yet" text="Project invitations sent to you will appear here." />}
            </div>
          </div>
          <div className="panel">
            <h2>Task Feedback</h2>
            <div className="mini-list">
            {instructorTasks.map((task) => (
              <div className="mini-row feedback-row" key={task.id}>
                <Icon name="rate_review" />
                <div><strong>{task.title}</strong><small>Assigned by {task.assignedBy || projects.find((project) => project.id === task.projectId)?.creator || 'Project creator'} / Assigned to {task.assignee}</small></div>
                <input value={task.feedback} onChange={(event) => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, feedback: event.target.value } : item))} onBlur={() => notifyTaskFeedback(task)} placeholder="Add task feedback" />
                <button className="danger" onClick={() => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, feedback: '' } : item))}>Remove</button>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  const selectedProject = accessibleProjects.find((project) => project.id === Number(selectedProjectId)) || accessibleProjects[0];
  const isCreator = selectedProject?.creator === user.fullName;
  const instructorState = selectedProject ? projectInstructorState(selectedProject, invitations) : { key: 'pending', label: 'Pending Instructor', badge: 'pending' };
  const moderationLocked = selectedProject ? projectIsLocked(selectedProject) : false;
  const workspaceLocked = moderationLocked || instructorState.key !== 'active';
  const projectTasks = tasks.filter((task) => task.projectId === selectedProject?.id);
  const projectDrafts = thesisDraftsForProject(selectedProject, drafts);
  const visibleProjectDrafts = visibleThesisDraftsForUser(selectedProject, drafts, user, invitations);
  const selectedFinalDraft = finalThesisDraft(selectedProject, drafts);
  const projectInvites = invitations.filter((invite) => invite.projectId === selectedProject?.id);
  const acceptedCollaborators = projectInvites.filter((invite) => invite.status === 'Accepted');
  const sentProjectInvites = projectInvites.filter((invite) => invite.status !== 'Accepted');
  const selectedCourse = courses.find((course) => course.name === selectedProject?.course);
  const bachelorProject = isBachelorCourse(selectedProject?.course);
  const eligibleAssignees = [selectedProject?.creator, ...acceptedCollaborators.filter((invite) => invite.role === 'Collaborator').map((invite) => invite.person)].filter(Boolean);
  const projectReviews = selectedProject?.reviews || [];
  const tasksWithFeedback = projectTasks.filter((task) => (task.feedback || '').trim());
  const draftsWithFeedback = visibleProjectDrafts.filter((draft) => (draft.feedback || []).length);
  const searchValue = inviteQuery;
  const inviteCandidates = people
    .filter((person) => person.role === 'Student' || person.role === 'Course Instructor')
    .filter((person) => person.email !== user.email)
    .filter((person) => searchValue && `${person.fullName} ${person.email}`.toLowerCase().includes(searchValue.toLowerCase()))
    .filter((person) => !projectInvites.some((invite) => invite.email === person.email && (invite.status !== 'Rejected' || person.role === 'Course Instructor')))
    .filter((person) => canInvitePersonToCourse(person, selectedProject?.course, selectedCourse, people));
  const moveTask = (index, direction) => {
    if (workspaceLocked) return notify('This project is locked, so task order cannot be changed.');
    const nextProjectTasks = [...projectTasks];
    const target = index + direction;
    if (target < 0 || target >= nextProjectTasks.length) return;
    [nextProjectTasks[index], nextProjectTasks[target]] = [nextProjectTasks[target], nextProjectTasks[index]];
    const rest = tasks.filter((task) => task.projectId !== selectedProject.id);
    setTasks([...nextProjectTasks, ...rest]);
    notify('Task importance order updated.');
  };
  const updateSelectedProject = (patch) => {
    if (!selectedProject || workspaceLocked) return;
    setProjects((items) => items.map((project) => project.id === selectedProject.id ? { ...project, ...patch } : project));
  };
  const addTask = () => {
    if (workspaceLocked) return notify('This project is locked, so new tasks cannot be created.');
    if (!selectedProject || !taskForm.title || !taskForm.deadline) {
      notify('Choose a project and enter task title and deadline.');
      return;
    }
    const newTask = { id: Date.now(), projectId: selectedProject.id, feedback: '', assignedBy: user.fullName, ...taskForm };
    setTasks((items) => [newTask, ...items]);
    notifyTaskAssignment(setNotifications, people, selectedProject, newTask, user);
    setTaskForm({ title: '', assignee: user.fullName, status: 'Pending', deadline: '' });
    notify('Task created.');
  };
  const setFinalDraft = (id) => {
    if (!isCreator) return notify('Only the project creator can choose a final thesis.');
    if (workspaceLocked) return notify('This project is locked, so thesis visibility cannot be changed.');
    setDrafts((items) => items.map((draft) => draft.projectId === selectedProject.id ? (draft.id === id ? { ...draft, final: true, visibility: 'Public' } : { ...draft, final: false, visibility: 'Private' }) : draft));
    notify('Final draft selected; all other drafts are now private.');
  };
  const clearFinalDraft = () => {
    if (!isCreator) return notify('Only the project creator can clear the final thesis.');
    if (workspaceLocked) return notify('This project is locked, so thesis visibility cannot be changed.');
    setDrafts((items) => items.map((draft) => draft.projectId === selectedProject.id ? { ...draft, final: false, visibility: 'Private' } : draft));
    notify('Final thesis cleared. Drafts remain visible to you and assigned instructors.');
  };
  const uploadDraft = (event) => {
    if (workspaceLocked) {
      notify('This project is locked, so draft uploads are disabled.');
      return;
    }
    const file = event.target.files?.[0];
    if (!file || !selectedProject || selectedProject.course !== 'Bachelor Project') {
      notify('Thesis drafts can only be uploaded for Bachelor Project.');
      return;
    }
    if (file.type !== 'application/pdf') {
      notify('Thesis draft must be a PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const id = Date.now();
      setDrafts((items) => [
        { id, name: file.name, documentUrl: reader.result, projectId: selectedProject.id, project: selectedProject.title, visibility: 'Private', final: false, uploadedAt: new Date().toISOString().slice(0, 10), feedback: [] },
        ...items
      ]);
      notify('Thesis draft uploaded. It is not final until you choose it.');
    };
    reader.readAsDataURL(file);
  };
  const sendInvite = (person) => {
    if (moderationLocked) return notify('This project is locked, so invitations are disabled.');
    if (instructorState.key !== 'active' && person.role !== 'Course Instructor') return notify('Instructor approval is required before inviting collaborators.');
    if (!selectedProject) return;
    createInvitation(selectedProject.id, selectedProject.title, user, { name: person.fullName, email: person.email, role: person.role === 'Course Instructor' ? 'Course Instructor' : 'Collaborator' }, invitations, setInvitations, setNotifications);
    notify('Project invitation sent. The person joins only after accepting.');
  };
  const removeInvite = (invite) => {
    if (!window.confirm(`Remove ${invite.person} from ${selectedProject.title}?`)) return;
    cancelInvitation(invite, setInvitations, setProjects, setNotifications, user);
    notify(`${invite.person} removed from the project.`);
  };
  const revokeInvite = (invite) => {
    if (!window.confirm(`Revoke the invitation for ${invite.person} from ${selectedProject.title}?`)) return;
    cancelInvitation(invite, setInvitations, setProjects, setNotifications, user);
    notify(`Invitation for ${invite.person} revoked.`);
  };
  const workspaceTabs = [
    ['details', 'Project Details'],
    ['drafts', 'Thesis Drafts'],
    ['collaborators', 'Collaborators'],
    ['tasks', 'Task List'],
    ['feedback', 'Feedback']
  ];
  return (
    <section className="stack project-workspace-page">
      <SectionHeader title="Project Workspace" subtitle="Select one project, then manage only that project’s drafts, collaborators, invitations and tasks." />
      {accessibleProjects.length === 0 && <EmptyState icon="folder_off" title="No accessible projects" text="Create a project or accept a collaborator invitation before entering a workspace." />}
      <div className="panel control-panel workspace-control-panel">
        <label>Active project<span className="select-shell"><select value={selectedProject?.id || ''} onChange={(event) => setSelectedProjectId(Number(event.target.value))}>{accessibleProjects.map((project) => <option key={project.id} value={project.id}>{project.title} - {project.course}{project.creator !== user.fullName ? ' (collaborator)' : ''}</option>)}</select><Icon name="expand_more" /></span></label>
        {selectedProject && (
          <div className="workspace-status-pair">
            <span className={`badge compact-status ${instructorState.badge}`}>{instructorState.label}</span>
            <span className={`badge compact-status ${selectedProject.public ? 'student' : 'administrator'}`}>{selectedProject.public ? 'Public' : 'Private'}</span>
          </div>
        )}
        <label className="wide-search"><Icon name="search" /><input disabled={!isCreator || moderationLocked} value={inviteQuery} onChange={(event) => setInviteQuery(event.target.value)} placeholder="Search collaborators or instructors..." /></label>
      </div>
      {selectedProject && instructorState.key !== 'active' && (
        <div className="lock-banner"><Icon name="hourglass_top" /> {instructorState.key === 'needs-instructor' ? 'This project needs a different instructor invite within 24 hours.' : 'This project is pending instructor acceptance.'}</div>
      )}
      {selectedProject && moderationLocked && <div className="lock-banner"><Icon name="lock" /> Project content is locked while deactivated or after an unanswered flag window.</div>}
      <div className="workspace-tabs" role="tablist" aria-label="Project workspace sections">
        {workspaceTabs.map(([key, label]) => <button key={key} className={workspaceTab === key ? 'selected' : ''} type="button" onClick={() => setWorkspaceTab(key)} role="tab" aria-selected={workspaceTab === key}>{label}</button>)}
      </div>
      {selectedProject && workspaceTab === 'details' && (
        <div className="panel form-grid workspace-details-panel">
          <SectionHeader title="Project Details" subtitle={isCreator ? 'Edit title, links, report, languages and visibility.' : 'Project details are read-only for collaborators.'} />
          <label>Title<input disabled={!isCreator || workspaceLocked} value={selectedProject.title} onChange={(event) => updateSelectedProject({ title: event.target.value })} /></label>
          <label>Course<input disabled value={selectedProject.course} /></label>
          <label><span className="label-icon"><Icon name="code" /> GitHub link</span><input disabled={!isCreator || workspaceLocked} value={selectedProject.github || ''} onChange={(event) => updateSelectedProject({ github: event.target.value })} onBlur={(event) => updateSelectedProject({ github: formatUrl(event.target.value) })} /></label>
          <label><span className="label-icon"><Icon name="play_circle" /> Demo video link</span><input disabled={!isCreator || workspaceLocked} value={selectedProject.demo || ''} onChange={(event) => updateSelectedProject({ demo: event.target.value })} onBlur={(event) => updateSelectedProject({ demo: formatUrl(event.target.value) })} /></label>
          <label className="full-label">Project report<textarea disabled={!isCreator || workspaceLocked} value={selectedProject.report || ''} onChange={(event) => updateSelectedProject({ report: event.target.value })} /></label>
          <label>Programming languages<input disabled={!isCreator || workspaceLocked} value={(selectedProject.languages || []).join(', ')} onChange={(event) => updateSelectedProject({ languages: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
          <label className="visibility-card visibility-choice"><input disabled={!isCreator || workspaceLocked} type="checkbox" checked={!!selectedProject.public} onChange={(event) => updateSelectedProject({ public: event.target.checked })} /><span><strong><Icon name={selectedProject.public ? 'public' : 'lock'} />{selectedProject.public ? 'Public project' : 'Private'}</strong><small>{selectedProject.public ? 'Visible in discovery and on your portfolio.' : 'Only you and invited instructors.'}</small></span></label>
        </div>
      )}
      {selectedProject && workspaceTab === 'drafts' && (
        <div className="workspace-drafts-grid">
          <div className="panel thesis-upload-panel">
            <SectionHeader title="Bachelor Thesis Drafts" subtitle="Upload and manage your thesis draft PDFs." />
          {selectedProject?.course === 'Bachelor Project' && isCreator && !workspaceLocked ? (
              <label className="upload-tile large-upload clickable-upload"><Icon name="upload_file" /> <strong>Upload thesis draft</strong><span>PDF only · max 10 MB</span><span className="secondary upload-browse">Browse files</span><input type="file" accept="application/pdf" onChange={uploadDraft} /></label>
          ) : selectedProject?.course === 'Bachelor Project' ? (
            <EmptyState icon="visibility" title={selectedFinalDraft ? 'Final thesis is visible' : 'No final thesis selected'} text={selectedFinalDraft ? 'Members can view the selected final thesis, while draft uploads stay with the project creator.' : 'Draft uploads stay private to the creator and assigned instructors until a final thesis is selected.'} />
          ) : (
            <EmptyState icon="lock" title="No thesis required" text="Thesis drafts are only available when the selected course is Bachelor Project." />
          )}
          <div className="draft-list">
          {visibleProjectDrafts.map((draft) => (
            <div className="mini-row draft-row" key={draft.id}>
              <Icon name={draft.final ? 'verified' : 'draft'} />
              <div><strong>{draft.name}</strong><small>{draft.project} / {draft.visibility} / uploaded {draft.uploadedAt}</small></div>
              <div className="draft-actions">
                {isCreator && !workspaceLocked && <button className="text-button" onClick={() => draft.final ? clearFinalDraft() : setFinalDraft(draft.id)}>{draft.final ? 'Unset Final' : 'Make Final'}</button>}
                {!isCreator && draft.final && <span className="badge accepted">Final thesis</span>}
                {draft.documentUrl && <button className="text-button" type="button" onClick={() => openPdfFile({ name: draft.name, url: draft.documentUrl })}>View PDF</button>}
              </div>
            </div>
          ))}
            {visibleProjectDrafts.length === 0 && <EmptyState icon="draft" title="No visible drafts" text={projectDrafts.length ? 'A final thesis has not been selected for this project yet.' : 'Bachelor project drafts will appear here after upload.'} />}
          </div>
          </div>
          <div className="panel draft-history-panel">
            <SectionHeader title="Draft History" />
            <div className="mini-list">
              {visibleProjectDrafts.map((draft) => <MiniItem key={`history-${draft.id}`} icon="draft" title={draft.final ? `${draft.name} · Current` : draft.name} meta={draft.uploadedAt} />)}
              {visibleProjectDrafts.length === 0 && <EmptyState icon="history" title="No visible draft history" text="Uploaded drafts will appear here when you can access them." />}
            </div>
          </div>
        </div>
      )}
      {selectedProject && workspaceTab === 'collaborators' && (
        <div className="workspace-collab-grid">
          <div className="panel">
            <SectionHeader title="Accepted Members" subtitle="People currently collaborating on this project." />
            <div className="mini-list fixed-scroll-list">
              <div className="mini-row">
                <span className="avatar small-avatar">{initials(selectedProject.creator)}</span>
                <div><strong>{selectedProject.creator}</strong><small>Owner</small></div>
                <span className="badge student">Owner</span>
              </div>
              {acceptedCollaborators.map((invite) => (
                <div className="mini-row" key={invite.id}>
                  <span className="avatar small-avatar">{initials(invite.person)}</span>
                  <div><strong>{invite.person}</strong><small>{invite.role}</small></div>
                  <span className="badge accepted">Accepted</span>
                  {isCreator && <button className="danger" disabled={workspaceLocked} onClick={() => removeInvite(invite)}>Remove</button>}
                </div>
              ))}
            </div>
          </div>
          <div className="workspace-invite-column">
            <div className="panel">
              <SectionHeader title={bachelorProject ? 'Bachelor Project Team' : 'Invite Collaborator'} subtitle={bachelorProject ? 'Bachelor projects are individual; only course instructors can be invited.' : 'Search by name, email or student ID.'} />
              {isCreator ? (
                <>
                  <div className="invite-inline">
                    <label className="wide-search"><Icon name="search" /><input value={searchValue} onChange={(event) => setInviteQuery(event.target.value)} placeholder={bachelorProject ? 'Search course instructors only' : 'Dr. Aya Salama or mona.adel@student.guc.edu.eg'} /></label>
                  </div>
                  {inviteCandidates.length > 0 && (
                    <div className="mini-list candidate-scroll">
                      {inviteCandidates.map((person) => (
                        <div key={person.id} className="candidate-row">
                          <span className="avatar small-avatar">{initials(person.fullName)}</span>
                          <span>{person.fullName}<small>{person.email}</small></span>
                          <span className="candidate-actions"><button className="text-button" onClick={() => openProfile(person.email)}>{person.role === 'Course Instructor' ? 'View Profile' : 'View Portfolio'}</button><button className="primary small-action" disabled={moderationLocked || (instructorState.key !== 'active' && person.role !== 'Course Instructor')} onClick={() => sendInvite(person)}>Invite</button></span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : <p className="muted">Only the project creator can send, cancel, or remove project invitations.</p>}
            </div>
            <div className="panel">
              <SectionHeader title="Sent Invitations" />
              <div className="mini-list fixed-scroll-list">
                {sentProjectInvites.map((invite) => (
                  <div className="mini-row" key={invite.id}>
                    <span className="avatar small-avatar">{initials(invite.person)}</span>
                    <div><strong>{invite.person}</strong><small>{invite.email}</small></div>
                    <span className={`badge ${invite.status === 'Rejected' ? 'rejected' : 'pending'}`}>{invitationStatusLabel(invite.status)}</span>
                    {invite.status === 'No reply' && <button className="text-button" disabled={moderationLocked} onClick={() => revokeInvite(invite)}>Revoke</button>}
                  </div>
                ))}
                {sentProjectInvites.length === 0 && <EmptyState icon="outgoing_mail" title="No sent invitations" text="Sent collaborator and instructor invitations will appear here." />}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedProject && workspaceTab === 'tasks' && (
      <div className="panel workspace-task-panel">
        <SectionHeader title="Task List" subtitle={`Tasks for ${selectedProject?.title || 'the selected project'}. Only the project creator can create or edit tasks. Collaborators can only update the status of tasks assigned to them.`} />
        {isCreator && <div className="task-create">
          <input value={taskForm.title} onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })} placeholder="Short task description" />
          <span className="select-shell"><select value={taskForm.assignee} onChange={(event) => setTaskForm({ ...taskForm, assignee: event.target.value })}>{eligibleAssignees.map((name) => <option key={name}>{name}</option>)}</select><Icon name="expand_more" /></span>
          <span className="select-shell"><select value={taskForm.status} onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value })}><option>Pending</option><option>Post-poned</option><option>Completed</option></select><Icon name="expand_more" /></span>
          <input type="date" value={taskForm.deadline} onChange={(event) => setTaskForm({ ...taskForm, deadline: event.target.value })} />
          <button className="primary" disabled={workspaceLocked} onClick={addTask}>Add Task</button>
        </div>}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>Task</th><th>Assigned By</th><th>Assignee</th><th>Status</th><th>Deadline</th><th>Feedback</th><th>Actions</th></tr></thead>
            <tbody>
              {projectTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{selectedProject?.title}</td>
                  <td>{isCreator && !workspaceLocked ? <input value={task.title} onChange={(event) => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, title: event.target.value } : item))} /> : task.title}</td>
                  <td>{task.assignedBy || selectedProject?.creator}</td>
                  <td>{isCreator && !workspaceLocked ? <span className="select-shell compact"><select value={task.assignee} onChange={(event) => {
                    const nextAssignee = event.target.value;
                    const updatedTask = { ...task, assignee: nextAssignee };
                    setTasks((items) => items.map((item) => item.id === task.id ? updatedTask : item));
                    notifyTaskAssignment(setNotifications, people, selectedProject, updatedTask, user, task.assignee);
                  }}>{eligibleAssignees.map((name) => <option key={name}>{name}</option>)}</select><Icon name="expand_more" /></span> : task.assignee}</td>
                  <td><span className="select-shell compact"><select value={task.status} disabled={workspaceLocked || (!isCreator && task.assignee !== user.fullName)} onChange={(event) => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, status: event.target.value } : item))}><option>Pending</option><option>Post-poned</option><option>Completed</option></select><Icon name="expand_more" /></span></td>
                  <td>{isCreator && !workspaceLocked ? <input type="date" value={task.deadline} onChange={(event) => setTasks((items) => items.map((item) => item.id === task.id ? { ...item, deadline: event.target.value } : item))} /> : task.deadline}</td>
                  <td>{task.feedback || 'No feedback yet'}</td>
                  <td>{isCreator && !workspaceLocked && <><button className="icon-button" onClick={() => moveTask(index, -1)}><Icon name="arrow_upward" /></button><button className="icon-button" onClick={() => moveTask(index, 1)}><Icon name="arrow_downward" /></button><button className="icon-button danger-icon" onClick={() => setTasks((items) => items.filter((item) => item.id !== task.id))}><Icon name="delete" /></button></>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
      {selectedProject && workspaceTab === 'feedback' && (
        <div className="workspace-feedback-grid">
          <section className="panel project-feedback-summary">
            <SectionHeader title="Project Feedback" subtitle="General comments and ratings from assigned instructors." />
            <div className="feedback-card-grid">
              {projectReviews.map((review) => (
                <div className="feedback-card" key={`${review.instructorEmail}-${review.createdAt}`}>
                  <div><span className="avatar small-avatar">{initials(review.instructor)}</span><strong>{review.instructor}</strong></div>
                  <RatingStars value={review.rating} />
                  <p>{review.comment || 'Rating only'}</p>
                  <small>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</small>
                </div>
              ))}
            </div>
            {(selectedProject.comments || []).map((comment) => <MiniItem key={comment} icon="forum" title={comment} meta="Project comment" />)}
            {projectReviews.length === 0 && !(selectedProject.comments || []).length && <EmptyState icon="rate_review" title="No project feedback yet" text="Instructor project comments and ratings will appear here." />}
          </section>
          <section className="panel">
            <SectionHeader title="Task Feedback" subtitle="Feedback left on individual project tasks." />
            <div className="mini-list">
              {tasksWithFeedback.map((task) => <MiniItem key={task.id} icon="task_alt" title={task.title} meta={`${task.feedback} / ${task.assignee}`} />)}
              {tasksWithFeedback.length === 0 && <EmptyState icon="task" title="No task feedback yet" text="Task comments from course instructors will appear here." />}
            </div>
          </section>
          {bachelorProject && (
            <section className="panel">
              <SectionHeader title="Thesis Feedback" subtitle={selectedFinalDraft ? 'Feedback on the selected final thesis.' : 'Feedback on visible thesis drafts.'} />
              <div className="mini-list">
                {draftsWithFeedback.map((draft) => (
                  <div className="thesis-feedback-block" key={draft.id}>
                    <div className="mini-row">
                      <Icon name={draft.final ? 'verified' : 'draft'} />
                      <div><strong>{draft.name}</strong><small>{draft.final ? 'Final thesis' : 'Draft'} / uploaded {draft.uploadedAt}</small></div>
                      {draft.documentUrl && <button className="text-button" type="button" onClick={() => openPdfFile({ name: draft.name, url: draft.documentUrl })}>View PDF</button>}
                    </div>
                    {(draft.feedback || []).map((item) => <MiniItem key={`${draft.id}-${item.instructor}-${item.createdAt}`} icon="rate_review" title={item.instructor} meta={item.comment} />)}
                  </div>
                ))}
                {draftsWithFeedback.length === 0 && <EmptyState icon="draft" title="No thesis feedback yet" text="Instructor feedback on thesis drafts will appear here." />}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

function InstructorPortal({ user, people, projects, setProjects, openProfile, notify, courses }) {
  const [query, setQuery] = useState('');
  const instructors = useMemo(() => people
    .filter((p) => p.role === 'Course Instructor')
    .map((p) => ({ ...p, linkedCourseLabels: instructorCourseLabels(p, courses) }))
    .filter((p) => {
      const searchText = [p.fullName, p.bio, ...p.linkedCourseLabels, 'Bachelor Project'].join(' ').toLowerCase();
      return searchText.includes(query.toLowerCase());
    }), [people, courses, query]);
  return (
    <section className="stack">
      <SectionHeader title="Course Instructor Portal" subtitle="Search Intructor profiles." />
      <FilterBar><label><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Instructor name or course" /></label></FilterBar>
      <div className="card-grid">
        {instructors.map((instructor) => (
          <article className="card clickable-card instructor-card" key={instructor.id} role="button" tabIndex="0" onClick={() => openProfile(instructor.email)} onKeyDown={(event) => { if (event.key === 'Enter') openProfile(instructor.email); }}>
            <div className="card-header instructor-card-head"><div className="avatar">{instructor.avatarImage ? <img src={instructor.avatarImage} alt="" /> : instructor.avatar}</div><span className="badge instructor">Instructor</span></div>
            <h3>{instructor.fullName}</h3>
            <p>{instructor.bio}</p>
            <p><strong>Research:</strong> {instructor.interests}</p>
            <p><strong>Education:</strong> {instructor.education}</p>
            <div className="chips">{instructor.linkedCourseLabels.map((course) => <span key={course}>{course}</span>)}</div>
            <div className="instructor-card-footer">
              <button className="text-button" type="button" onClick={(event) => { event.stopPropagation(); openProfile(instructor.email); }}>View Portfolio</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminSuite({ people, setPeople, notify }) {
  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [roleFilter, setRoleFilter] = useState('All');
  const [expandedUserId, setExpandedUserId] = useState(null);
  const userRoles = ['All', ...new Set(people.map((person) => person.role))];
  const visibleUsers = people.filter((person) => roleFilter === 'All' || person.role === roleFilter);
  const addAdmin = () => {
    if (!adminForm.username || adminForm.password.length < 6) return notify('Admin username and password are required.');
    setPeople((items) => [{ id: Date.now(), role: 'Administrator', fullName: adminForm.username, email: `${adminForm.username}@guc.edu.eg`, password: adminForm.password, active: true, avatar: initials(adminForm.username) }, ...items]);
    setAdminForm({ username: '', password: '' });
    notify('Administrator account created.');
  };
  const toggleUserActive = (person) => {
    if (isOriginalAdmin(person) && person.active) {
      notify('The original admin cannot be deactivated.');
      return;
    }
    if (person.active && !window.confirm(`Are you sure you want to deactivate ${person.fullName}?`)) return;
    setPeople((items) => items.map((item) => item.id === person.id ? { ...item, active: !item.active } : item));
    notify(`${person.fullName} ${person.active ? 'deactivated' : 'activated'}.`);
  };
  return (
    <section className="stack">
      <SectionHeader title="User Management" subtitle="Create admins and manage account activation." />
      <div className="two-column">
        <div className="panel">
          <SectionHeader title="Users" subtitle={`${visibleUsers.length} user${visibleUsers.length === 1 ? '' : 's'} shown`} />
          <label>Filter by role<span className="select-shell"><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>{userRoles.map((role) => <option key={role}>{role}</option>)}</select><Icon name="expand_more" /></span></label>
          <div className="admin-user-list">
          {visibleUsers.map((person) => (
            <div className={`admin-user-card ${expandedUserId === person.id ? 'expanded' : ''}`} key={person.id}>
              <button className="admin-user-summary" type="button" onClick={() => setExpandedUserId((id) => id === person.id ? null : person.id)} aria-expanded={expandedUserId === person.id}>
                <Icon name="person" />
                <span>
                  <strong>{person.fullName}</strong>
                  <small>{person.email} / {person.role} / {person.active ? 'Active' : 'Deactivated'}</small>
                </span>
                <Icon name={expandedUserId === person.id ? 'expand_less' : 'expand_more'} />
              </button>
              <button className={person.active ? 'danger' : 'secondary'} disabled={isOriginalAdmin(person) && person.active} onClick={() => toggleUserActive(person)}>{isOriginalAdmin(person) && person.active ? 'Protected' : person.active ? 'Deactivate' : 'Activate'}</button>
              {expandedUserId === person.id && (
                <dl className="admin-user-details">
                  <div><dt>Full name</dt><dd>{person.fullName}</dd></div>
                  <div><dt>Email</dt><dd>{person.email}</dd></div>
                  <div><dt>Role</dt><dd>{person.role}</dd></div>
                  <div><dt>Status</dt><dd>{person.active ? 'Active' : 'Deactivated'}</dd></div>
                </dl>
              )}
            </div>
          ))}
          </div>
        </div>
        <div className="panel form-grid">
          <SectionHeader title="Admin Creation" subtitle="Create new administrator accounts for platform management." />
          <label>New admin username<input value={adminForm.username} onChange={(event) => setAdminForm({ ...adminForm, username: event.target.value })} /></label>
          <label>New admin password<input type="password" value={adminForm.password} onChange={(event) => setAdminForm({ ...adminForm, password: event.target.value })} /></label>
          <button className="primary" onClick={addAdmin}>Create Admin</button>
        </div>
      </div>
    </section>
  );
}

function ModerationCenter({ user, projects, setProjects, people, invitations, setNotifications, openProject, notify }) {
  const [flagDrafts, setFlagDrafts] = useState({});
  const [appealDrafts, setAppealDrafts] = useState({});
  const [selectedAppealId, setSelectedAppealId] = useState(null);
  const [flaggingProjectId, setFlaggingProjectId] = useState(null);
  const appealReviewRef = useRef(null);
  const canFlag = user.role === 'Administrator' || user.role === 'Course Instructor';
  const isAdmin = user.role === 'Administrator';
  const acceptedProjectIds = invitations.filter((invite) => invite.email === user.email && invite.status === 'Accepted').map((invite) => invite.projectId);
  const studentAppealProjects = projects.filter((project) => project.flagged && (project.creator === user.fullName || acceptedProjectIds.includes(project.id)));
  const rows = user.role === 'Student'
    ? studentAppealProjects
    : isAdmin
      ? projects.filter((project) => project.flagged)
      : projects;
  const selectedAppealProject = rows.find((project) => project.id === selectedAppealId && project.appeal);
  useEffect(() => {
    if (selectedAppealProject) appealReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [selectedAppealProject]);
  const setFlagDraft = (id, patch) => {
    setFlagDrafts((items) => ({ ...items, [id]: { reason: 'Plagiarism', details: '', ...(items[id] || {}), ...patch } }));
  };
  const flagProject = (project) => {
    const draft = flagDrafts[project.id] || { reason: 'Plagiarism', details: '' };
    const reason = draft.reason === 'Other' ? draft.details.trim() : draft.reason;
    if (!reason) return notify('Choose a flag reason or write an other reason.');
    const flaggedAt = new Date();
    const appealDeadline = new Date(flaggedAt.getTime() + 24 * 60 * 60 * 1000).toISOString();
    setProjects((items) => items.map((item) => item.id === project.id ? {
      ...item,
      flagged: true,
      active: true,
      flagReason: reason,
      flaggedBy: user.fullName,
      flaggedAt: flaggedAt.toISOString(),
      appealDeadline,
      appeal: ''
    } : item));
    projectMemberEmails(project, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Project flagged',
        text: `${project.title} was flagged for: ${reason}. You have 24 hours to appeal before final deactivation.`
      });
    });
    setFlaggingProjectId(null);
    notify('Project flagged and student/collaborator notifications were sent.');
  };
  const unflagProject = (project) => {
    if (!window.confirm(`Unflag ${project.title}?`)) return;
    setProjects((items) => items.map((item) => item.id === project.id ? {
      ...item,
      flagged: false,
      flagReason: '',
      flaggedAt: '',
      appealDeadline: '',
      appeal: '',
      active: true
    } : item));
    notify('Project unflagged and reactivated.');
  };
  const submitAppeal = (project) => {
    const appeal = (appealDrafts[project.id] || '').trim();
    if (!appeal) return notify('Write a short appeal message first.');
    setProjects((items) => items.map((item) => item.id === project.id ? { ...item, appeal, appealAt: new Date().toISOString() } : item));
    pushNotification(setNotifications, {
      role: 'Administrator',
      type: 'Project appeal',
      text: `${user.fullName} appealed ${project.title}: ${appeal}`
    });
    notify('Appeal sent to administrators.');
  };
  return (
    <section className="stack">
      <SectionHeader title={user.role === 'Student' ? 'Project Appeals' : 'Moderation & Appeals'} subtitle={user.role === 'Student' ? 'Only your flagged projects and projects you collaborate on can be appealed.' : isAdmin ? 'Review flagged projects, appeals, unflagging and activation state.' : 'Flag inappropriate projects with a clear reason and a 24-hour appeal window.'} />
      <div className="table-wrap moderation-scroll-table">
        <table>
          <thead><tr><th>Project</th><th>Status</th><th>Reason</th><th>Appeal Window</th><th>Appeal</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map((project) => {
              const countdown = flagCountdown(project);
              const draft = flagDrafts[project.id] || { reason: 'Plagiarism', details: '' };
              return (
                <tr key={project.id}>
                  <td><button className="text-button" onClick={() => openProject(project.id)}>{project.title}</button></td>
                  <td>{projectIsLocked(project) ? 'Locked' : project.active ? 'Active' : 'Deactivated'}</td>
                  <td>{project.flagReason || (canFlag && flaggingProjectId === project.id ? (
                    <div className="flag-reason-controls">
                      <span className="select-shell"><select value={draft.reason} onChange={(event) => setFlagDraft(project.id, { reason: event.target.value })}>
                        <option>Plagiarism</option>
                        <option>Inappropriate content</option>
                        <option>University rules violation</option>
                        <option>Copyright/IP violation</option>
                        <option>Other</option>
                      </select><Icon name="expand_more" /></span>
                      {draft.reason === 'Other' && <input value={draft.details} onChange={(event) => setFlagDraft(project.id, { details: event.target.value })} placeholder="Other reason" />}
                    </div>
                  ) : 'Not flagged')}</td>
                  <td>{project.flagged ? countdown : 'Not flagged'}</td>
                  <td>{user.role === 'Student' && project.flagged ? (
                    <div className="appeal-box">
                      <textarea value={appealDrafts[project.id] || project.appeal || ''} onChange={(event) => setAppealDrafts((items) => ({ ...items, [project.id]: event.target.value }))} placeholder="Explain your point of view" />
                      <button className="primary" onClick={() => submitAppeal(project)}>{project.appeal ? 'Update Appeal' : 'Send Appeal'}</button>
                    </div>
                  ) : project.appeal ? <button className="text-button appeal-link" onClick={() => setSelectedAppealId(project.id)}>Appeal submitted</button> : 'No appeal'}</td>
                  <td>
                    {canFlag && !project.flagged && (flaggingProjectId === project.id
                      ? <button className="danger" onClick={() => flagProject(project)}>Confirm Flag</button>
                      : <button className="danger" onClick={() => setFlaggingProjectId(project.id)}>Flag</button>)}
                    {canFlag && project.flagged && <button className="secondary" onClick={() => unflagProject(project)}>Flagged</button>}
                    {isAdmin && <button className="text-button" onClick={() => setProjects((items) => items.map((item) => item.id === project.id ? { ...item, active: !item.active } : item))}>{project.active ? 'Deactivate' : 'Activate'}</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedAppealProject && (
        <div className="panel appeal-review-panel" ref={appealReviewRef}>
          <SectionHeader title={`Appeal for ${selectedAppealProject.title}`} subtitle={`Submitted ${selectedAppealProject.appealAt ? new Date(selectedAppealProject.appealAt).toLocaleString() : 'recently'}`} />
          <p>{selectedAppealProject.appeal}</p>
          {isAdmin && (
            <div className="actions">
              <button className="secondary" onClick={() => unflagProject(selectedAppealProject)}>Accept Appeal</button>
              <button className="danger" onClick={() => setProjects((items) => items.map((item) => item.id === selectedAppealProject.id ? { ...item, active: false } : item))}>Deactivate Project</button>
            </div>
          )}
        </div>
      )}
      {rows.length === 0 && <EmptyState icon="gavel" title="No projects to show" text={user.role === 'Student' ? 'Only flagged projects connected to you appear here.' : 'No flagged projects need moderation right now.'} />}
    </section>
  );
}

function InternshipHub({ user, internships, setInternships, setNotifications, people, projects, tasks, favorites, openPdfFile, notify }) {
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('All');
  const [duration, setDuration] = useState('All');
  const [cover, setCover] = useState('');
  const [applicationPdf, setApplicationPdf] = useState({ name: '', url: '' });
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [form, setForm] = useState({ title: '', details: '', skills: '', duration: '3 months', deadline: '', languages: '', status: 'Currently hiring' });
  const [editingInternshipId, setEditingInternshipId] = useState(null);
  const [applicationSort, setApplicationSort] = useState('suggested');
  const [internshipSort, setInternshipSort] = useState('posted-desc');
  const [selectedApplicantInternshipId, setSelectedApplicantInternshipId] = useState('');
  const visibleInternships = user.role === 'Employer'
    ? internships.filter((item) => item.employerEmail === user.email)
    : user.role === 'Student'
      ? internships.filter((item) => item.status === 'Currently hiring' && !item.archived)
    : internships;
  const companies = ['All', ...new Set(visibleInternships.map((i) => i.company))];
  const durations = ['All', ...new Set(visibleInternships.map((i) => i.duration))];
  const results = visibleInternships
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.company.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => company === 'All' || item.company === company)
    .filter((item) => duration === 'All' || item.duration === duration)
    .sort((a, b) => {
      if (internshipSort === 'posted-asc') return a.postedAt.localeCompare(b.postedAt);
      return b.postedAt.localeCompare(a.postedAt);
    });
  const selectedInternship = results.find((item) => item.id === selectedInternshipId) || results[0];
  const selectedApplicantInternship = visibleInternships.find((item) => item.id === Number(selectedApplicantInternshipId)) || visibleInternships[0];
  const applicationFor = (item) => item?.applications.find((application) => application.email === user.email);
  const hasApplied = (item) => !!applicationFor(item);
  const contributionScoreForEmail = (email) => {
    const person = people.find((item) => item.email === email);
    if (!person) return 0;
    const memberProjects = projects.filter((project) => project.creator === person.fullName || (project.collaborators || []).includes(person.fullName));
    if (memberProjects.length === 0) return 0;
    const total = memberProjects.reduce((sum, project) => {
      const taskPoints = tasks.filter((task) => task.projectId === project.id && (task.assignee === person.fullName || task.assignedBy === person.fullName)).length;
      return sum + taskPoints + (project.creator === person.fullName ? 2 : 1);
    }, 0);
    return Number((total / memberProjects.length).toFixed(1));
  };
  const attachApplicationPdf = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      notify('Application attachment must be a PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setApplicationPdf({ name: file.name, url: reader.result });
    reader.readAsDataURL(file);
  };
  const saveInternship = () => {
    if (!form.title || !form.deadline) return notify('Internship title and deadline are required.');
    const payload = { ...form, skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean), languages: form.languages.split(',').map((item) => item.trim()).filter(Boolean) };
    if (editingInternshipId) {
      setInternships((items) => items.map((item) => item.id === editingInternshipId ? { ...item, ...payload } : item));
      notify('Internship updated.');
    } else {
      setInternships((items) => [{ id: Date.now(), ...payload, company: user.fullName, employerEmail: user.email, postedAt: new Date().toISOString().slice(0, 10), archived: false, applications: [] }, ...items]);
      notify('Internship saved.');
    }
    setForm({ title: '', details: '', skills: '', duration: '3 months', deadline: '', languages: '', status: 'Currently hiring' });
    setEditingInternshipId(null);
  };
  const editInternship = (item) => {
    setEditingInternshipId(item.id);
    setSelectedInternshipId(item.id);
    setForm({ title: item.title, details: item.details, skills: (item.skills || []).join(', '), duration: item.duration, deadline: item.deadline, languages: (item.languages || []).join(', '), status: item.status });
  };
  const deleteInternship = (item) => {
    if (!window.confirm(`Delete ${item.title}?`)) return;
    setInternships((items) => items.filter((target) => target.id !== item.id));
    if (editingInternshipId === item.id) setEditingInternshipId(null);
    notify('Internship deleted.');
  };
  const apply = (id) => {
    if (!cover) return notify('Write a short cover letter before applying.');
    const target = internships.find((item) => item.id === id);
    if (!target || hasApplied(target)) return notify('You already applied to this internship.');
    setInternships((items) => items.map((item) => item.id === id ? { ...item, applications: [...item.applications, { name: user.fullName, email: user.email, contributions: contributionScoreForEmail(user.email), status: 'Nominated', cover, pdfName: applicationPdf.name, pdfUrl: applicationPdf.url }] } : item));
    setCover('');
    setApplicationPdf({ name: '', url: '' });
    notify('Internship application submitted.');
  };
  const updateApplicationStatus = (internship, application, status) => {
    setInternships((items) => items.map((item) => item.id === internship.id ? {
      ...item,
      applications: item.applications.map((app) => app.email === application.email ? { ...app, status } : app)
    } : item));
    pushNotification(setNotifications, {
      email: application.email,
      role: 'Student',
      type: 'Internship application',
      text: `Your application for ${internship.title} was ${status.toLowerCase()}.`
    });
    notify(`Application marked ${status.toLowerCase()}.`);
  };
  const applicantIsSuggested = (application) => {
    const person = people.find((item) => item.email === application.email);
    if (!person) return false;
    const favoriteProjectOwners = projects.filter((project) => favorites.projects.includes(project.id)).map((project) => project.creator);
    return favoriteProjectOwners.includes(person.fullName) || favorites.portfolios.includes(person.id);
  };
  const sortedApplications = (selectedApplicantInternship ? selectedApplicantInternship.applications.map((application) => ({ internship: selectedApplicantInternship, application, contributions: contributionScoreForEmail(application.email), suggested: applicantIsSuggested(application) })) : [])
    .sort((a, b) => {
      if (applicationSort === 'contributions') return b.contributions - a.contributions;
      if (applicationSort === 'status') return a.application.status.localeCompare(b.application.status);
      return Number(b.suggested) - Number(a.suggested) || b.contributions - a.contributions;
    });
  return (
    <section className="stack">
      <SectionHeader title={user.role === 'Administrator' ? 'Internship Statistics' : 'Internships & Applications'} subtitle="Role-specific internship tools from the milestone requirements." />
      {user.role === 'Administrator' && (
        <div className="stat-grid">
          <StatCard label="Internships Offered" value={internships.length} icon="business_center" />
          <StatCard label="Applications" value={internships.reduce((sum, item) => sum + item.applications.length, 0)} icon="group" />
          <StatCard label="Hiring Now" value={internships.filter((item) => item.status === 'Currently hiring').length} icon="work" />
          <StatCard label="Archived" value={internships.filter((item) => item.archived).length} icon="archive" />
        </div>
      )}
      <FilterBar>
        <label><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Internship title or company..." /></label>
        <label>Company<span className="select-shell"><select value={company} onChange={(event) => setCompany(event.target.value)}>{companies.map((item) => <option key={item}>{item}</option>)}</select><Icon name="expand_more" /></span></label>
        <label>Duration<span className="select-shell"><select value={duration} onChange={(event) => setDuration(event.target.value)}>{durations.map((item) => <option key={item}>{item}</option>)}</select><Icon name="expand_more" /></span></label>
        {user.role === 'Student' && <label>Sort<span className="select-shell"><select value={internshipSort} onChange={(event) => setInternshipSort(event.target.value)}><option value="posted-desc">Newest posted</option><option value="posted-asc">Oldest posted</option></select><Icon name="expand_more" /></span></label>}
      </FilterBar>
      <div className="two-column">
        {user.role === 'Employer' && (
        <div className="panel form-grid">
          <h2>{editingInternshipId ? 'Edit Internship' : 'Employer Opening'}</h2>
          <label>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
          <label>Responsibilities<textarea value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} /></label>
          <label>Skills<input value={form.skills} onChange={(event) => setForm({ ...form, skills: event.target.value })} /></label>
          <label>Duration<input value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} /></label>
          <label>Deadline<input type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} /></label>
          <label>Languages<input value={form.languages} onChange={(event) => setForm({ ...form, languages: event.target.value })} /></label>
          {editingInternshipId && <label>Status<span className="select-shell"><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Currently hiring</option><option>Position filled</option></select><Icon name="expand_more" /></span></label>}
          <button className="primary" onClick={saveInternship}>{editingInternshipId ? 'Update Internship' : 'Save Internship'}</button>
          {editingInternshipId && <button className="secondary" onClick={() => { setEditingInternshipId(null); setForm({ title: '', details: '', skills: '', duration: '3 months', deadline: '', languages: '', status: 'Currently hiring' }); }}>Cancel Edit</button>}
        </div>
        )}
        {user.role === 'Student' ? (
          <>
            <div className="panel form-grid student-application-panel">
              <h2>Student Application</h2>
              <p className="muted">{selectedInternship ? `Applying to ${selectedInternship.title} at ${selectedInternship.company}` : 'Choose an internship from the list.'}</p>
              <label className="full-label internship-cover-label">Cover Letter<textarea value={cover} onChange={(event) => setCover(event.target.value)} placeholder="Write a concise cover letter for the selected internship." /></label>
              <label className="upload-tile full-label internship-pdf-upload"><Icon name="upload_file" /> <span>Drop PDF or <b>browse</b></span><small>{applicationPdf.name || 'Optional · max 5 MB'}</small><input type="file" accept="application/pdf" onChange={attachApplicationPdf} /></label>
              <button className={selectedInternship && applicationFor(selectedInternship) ? 'secondary applied-button' : 'primary'} disabled={!selectedInternship || hasApplied(selectedInternship)} onClick={() => selectedInternship && apply(selectedInternship.id)}><Icon name={selectedInternship && applicationFor(selectedInternship) ? 'task_alt' : 'send'} /> {selectedInternship && applicationFor(selectedInternship) ? applicationStatusLabel(applicationFor(selectedInternship).status) : 'Apply'}</button>
            </div>
            <div className="panel internship-list-panel">
              <div className="panel-heading-row"><h2>Available Internships</h2><span>{results.length} position{results.length === 1 ? '' : 's'}</span></div>
              <div className="scroll-list">
                {results.map((item) => (
                  <button className={`mini-row button-row internship-row-card ${selectedInternship?.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelectedInternshipId(item.id)}>
                    <Icon name="business_center" />
                    <div><strong>{item.title}</strong><small>{item.company} / {item.duration} / {item.status}</small></div>
                    <span className="internship-row-badges">
                      {applicationFor(item) && <span className="badge student">{applicationStatusLabel(applicationFor(item).status)}</span>}
                      <span className={`badge ${item.status === 'Currently hiring' ? 'accepted' : 'pending'}`}>{item.status === 'Currently hiring' ? 'Open' : 'Filled'}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
        <div className="panel">
          <h2>{user.role === 'Employer' ? 'My Internships' : 'View Internships'}</h2>
          {results.map((item) => (
            <div className="mini-row" key={item.id}>
              <Icon name="business_center" />
              <div><button className="text-button project-title-link" onClick={() => user.role === 'Employer' && editInternship(item)}>{item.title}</button><small>{item.company} / {item.duration} / {item.status}</small></div>
              {user.role === 'Employer' && <div className="inline-actions"><button className="text-button" onClick={() => setInternships((items) => items.map((target) => target.id === item.id ? { ...target, archived: !target.archived } : target))}>{item.archived ? 'Unarchive' : 'Archive'}</button><button className="danger" onClick={() => deleteInternship(item)}>Delete</button></div>}
            </div>
          ))}
          {results.length === 0 && <EmptyState icon="business_center" title="No internships to show" text="Created openings for this account will appear here." />}
        </div>
        )}
      </div>
      {user.role === 'Student' && (
        <div className="panel">
          <SectionHeader title="Completed Internships" subtitle="Automatically added to portfolio after completion." />
          <MiniItem icon="verified" title="Frontend Engineering Internship" meta="NileTech Labs · 2025" />
        </div>
      )}
      {user.role === 'Employer' && (
      <div className="panel">
        <SectionHeader title="Applications" subtitle="Choose one internship, then sort its applicants." />
        <div className="application-controls">
          <label>Internship<span className="select-shell"><select value={selectedApplicantInternship?.id || ''} onChange={(event) => setSelectedApplicantInternshipId(event.target.value)}>{visibleInternships.map((internship) => <option key={internship.id} value={internship.id}>{internship.title}</option>)}</select><Icon name="expand_more" /></span></label>
          <label>Sort applicants<span className="select-shell"><select value={applicationSort} onChange={(event) => setApplicationSort(event.target.value)}><option value="suggested">Suggested applicants</option><option value="contributions">Average contributions</option><option value="status">Status</option></select><Icon name="expand_more" /></span></label>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Internship</th><th>Applicant</th><th>Average Contributions</th><th>Suggested</th><th>Status</th><th>Cover Letter</th></tr></thead>
            <tbody>
              {sortedApplications.map(({ internship, application, contributions, suggested }) => (
                <tr key={`${internship.id}-${application.email}`}>
                  <td>{internship.title}</td><td>{application.name}</td><td>{contributions}</td><td>{suggested ? 'Yes' : 'No'}</td>
                  <td><select value={application.status} onChange={(event) => updateApplicationStatus(internship, application, event.target.value)}><option>Nominated</option><option>Accepted</option><option>Rejected</option></select></td>
                  <td>{application.cover}{application.pdfName && application.pdfUrl && <button className="document-link" type="button" onClick={() => openPdfFile({ name: application.pdfName, url: application.pdfUrl })}>View {application.pdfName}</button>}{application.pdfName && !application.pdfUrl && <small> / {application.pdfName}</small>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </section>
  );
}

function MessagingHub({ user, people, messages, setMessages, messageTargetEmail, setMessageTargetEmail, setNotifications, notify }) {
  const myThreads = messages.filter((message) => message.participants.includes(user.email));
  const targetThread = messageTargetEmail ? myThreads.find((message) => message.participants.includes(messageTargetEmail)) : null;
  const [selected, setSelected] = useState(targetThread?.id || myThreads[0]?.id || null);
  const [draft, setDraft] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  useEffect(() => {
    if (!messageTargetEmail) return;
    const thread = messages.find((item) => item.participants.includes(user.email) && item.participants.includes(messageTargetEmail));
    if (thread) setSelected(thread.id);
    setMessageTargetEmail('');
  }, [messageTargetEmail, messages, setMessageTargetEmail, user.email]);
  const current = myThreads.find((message) => message.id === selected) || myThreads[0];
  const conversationPerson = current ? people.find((person) => person.email === current.participants.find((email) => email !== user.email)) : null;
  const threadTitle = conversationPerson?.fullName || current?.participants.find((email) => email !== user.email) || 'No conversation selected';
  const normalizedMessageSearch = messageSearch.trim().toLowerCase();
  const visibleThreads = myThreads.filter((message) => {
    const otherEmail = message.participants.find((email) => email !== user.email);
    const other = people.find((person) => person.email === otherEmail);
    const lastMessage = message.messages.at(-1);
    const haystack = `${other?.fullName || ''} ${otherEmail || ''} ${lastMessage?.text || ''}`.toLowerCase();
    return haystack.includes(normalizedMessageSearch);
  });
  const send = () => {
    const messageText = draft.trim();
    if (!messageText) return notify('Message cannot be empty.');
    if (!current) return notify('Start a conversation from a portfolio first.');
    const recipientEmail = current.participants.find((email) => email !== user.email);
    const recipientPerson = people.find((person) => person.email === recipientEmail);
    setMessages((items) => items.map((message) => message.id === current.id ? {
      ...message,
      messages: [...message.messages, { id: Date.now(), senderEmail: user.email, text: messageText, sentAt: new Date().toISOString() }],
      unreadBy: Array.from(new Set([...(message.unreadBy || []), recipientEmail].filter(Boolean)))
    } : message));
    pushNotification(setNotifications, {
      email: recipientEmail,
      role: recipientPerson?.role || 'Employer',
      type: 'Message',
      text: `New private message from ${user.fullName}.`
    });
    setDraft('');
    notify('Private message sent.');
  };
  return (
    <section className="messages-shell">
      <div className="messages-sidebar">
        <h1>Messages</h1>
        <label className="messages-search"><Icon name="search" /><input value={messageSearch} onChange={(event) => setMessageSearch(event.target.value)} placeholder="Search" /></label>
        <div className="message-thread-list">
          {visibleThreads.map((message) => {
            const otherEmail = message.participants.find((email) => email !== user.email);
            const other = people.find((person) => person.email === otherEmail);
            const lastMessage = message.messages.at(-1);
            const unread = message.unreadBy?.includes(user.email) ? 1 : 0;
            return (
              <button className={`message-row ${selected === message.id ? 'selected' : ''}`} key={message.id} onClick={() => {
                setSelected(message.id);
                setMessages((items) => items.map((item) => item.id === message.id ? { ...item, unreadBy: (item.unreadBy || []).filter((email) => email !== user.email) } : item));
              }}>
                <span className="avatar status-avatar">{initials(other?.fullName || otherEmail)}</span>
                <span><strong>{other?.fullName || otherEmail}</strong><small>{lastMessage?.text || 'No messages yet'}</small></span>
                <span className="thread-meta">{lastMessage?.sentAt ? new Date(lastMessage.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                {unread > 0 && <span className="unread-dot" />}
              </button>
            );
          })}
        </div>
        {myThreads.length === 0 && <EmptyState icon="forum" title="No private chats" text="Open a public portfolio and start a chat." />}
        {myThreads.length > 0 && visibleThreads.length === 0 && <EmptyState icon="search_off" title="No chats match" text="Try another person or message." />}
      </div>
      <div className="chat-panel">
        {current ? (
          <>
            <header className="chat-header">
              <span className="avatar status-avatar">{initials(threadTitle)}</span>
              <div><h2>{threadTitle}</h2><small>Online</small></div>
            </header>
            <div className="chat-log">
              <span className="chat-date-divider">Today</span>
              {current.messages.map((line) => (
                <div key={line.id} className={`bubble ${line.senderEmail === user.email ? 'sent' : 'received'}`}>
                  <p className={line.senderEmail === user.email ? 'sent' : 'received'}>{line.text}</p>
                  <small className="msg-time">{line.sentAt ? new Date(line.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</small>
                </div>
              ))}
            </div>
            <div className="message-composer"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); send(); } }} placeholder="Text Message" /><button className="primary send-button" onClick={send} aria-label="Send message"><Icon name="send" /></button></div>
          </>
        ) : <EmptyState icon="forum" title="No chat selected" text="Start a private chat from a portfolio." />}
      </div>
    </section>
  );
}

function NotificationCenter({ notifications, setNotifications, activeNotifications, notificationsOff, setNotificationsOff, notify }) {
  const list = notificationsOff ? [] : activeNotifications;
  const toggleRead = (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: !item.read } : item));
  return (
    <section className="stack">
      <SectionHeader title="Notification Center" subtitle="Project invitations, comments, messages, moderation, internships and admin requests appear here." />
      <div className="panel">
        <label className="switch"><input type="checkbox" checked={notificationsOff} onChange={(event) => { setNotificationsOff(event.target.checked); notify(event.target.checked ? 'All notifications turned off.' : 'Notifications turned on.'); }} /> Turn off all notifications</label>
        <div className="mini-list notification-scroll-list">
          {list.map((item) => (
            <div className={`mini-row ${item.read ? '' : 'unread'}`} key={item.id}>
              <Icon name={item.read ? 'notifications' : 'notifications_active'} />
              <div><strong>{item.type}</strong><small>{item.text}</small></div>
              <button className="text-button" onClick={() => toggleRead(item.id)}>{item.read ? 'Mark unread' : 'Mark read'}</button>
            </div>
          ))}
          {list.length === 0 && <div className="empty-state">No visible notifications.</div>}
        </div>
      </div>
    </section>
  );
}

function SettingsCenter({ user, notificationsOff, setNotificationsOff, notify }) {
  const [privacy, setPrivacy] = useState({ defaultVisibility: 'Public', allowMessages: true, showEmail: true });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });
  return (
    <section className="stack settings-page">
      <SectionHeader title="User Settings" subtitle="Account, privacy, notifications and default workspace preferences." />
      <div className="settings-grid">
        <article className="settings-card notifications-card">
          <header className="settings-card-head">
            <span className="settings-icon"><Icon name="notifications" /></span>
            <h2>Notifications</h2>
          </header>
          <div className="settings-card-body">
            <label className="settings-switch-row">
              <span><strong>Turn off all notifications</strong><small>Pause all email and push alerts</small></span>
              <span className="switch"><input type="checkbox" checked={notificationsOff} onChange={(event) => { setNotificationsOff(event.target.checked); notify('Notification preference saved.'); }} /></span>
            </label>
          </div>
        </article>
        <article className="settings-card privacy-card">
          <header className="settings-card-head">
            <span className="settings-icon"><Icon name="lock" /></span>
            <h2>Privacy & Messaging</h2>
          </header>
          <div className="settings-card-body">
            <label>Default project visibility<span className="select-shell"><select value={privacy.defaultVisibility} onChange={(event) => setPrivacy({ ...privacy, defaultVisibility: event.target.value })}><option>Public</option><option>Private</option></select><Icon name="expand_more" /></span></label>
            <label className="settings-switch-row">
              <span><strong>Allow portfolio messages</strong><small>Others can send you messages</small></span>
              <span className="switch"><input type="checkbox" checked={privacy.allowMessages} onChange={(event) => setPrivacy({ ...privacy, allowMessages: event.target.checked })} /></span>
            </label>
            <label className="settings-switch-row">
              <span><strong>Show email on portfolio</strong><small>Visible on your public profile</small></span>
              <span className="switch"><input type="checkbox" checked={privacy.showEmail} onChange={(event) => setPrivacy({ ...privacy, showEmail: event.target.checked })} /></span>
            </label>
          </div>
          <button className="secondary settings-save" onClick={() => notify('Privacy preferences saved for this session.')}>Save Privacy</button>
        </article>
        <article className="settings-card account-card">
          <header className="settings-card-head">
            <span className="settings-icon"><Icon name="person" /></span>
            <h2>Account</h2>
          </header>
          <div className="settings-card-body">
            <div className="settings-account-row">
              <span className="avatar">{initials(user.fullName)}</span>
              <span><strong>{user.fullName}</strong><small>{user.email}</small></span>
            </div>
            <label>Current password<input type="password" value={passwordForm.current} onChange={(event) => setPasswordForm({ ...passwordForm, current: event.target.value })} /></label>
            <label>New password<input type="password" value={passwordForm.next} onChange={(event) => setPasswordForm({ ...passwordForm, next: event.target.value })} /></label>
          </div>
          <button className="secondary settings-save" onClick={() => notify(passwordForm.next.length >= 6 ? 'Password preference captured for this prototype.' : 'New password must be at least 6 characters.')}>Change Password</button>
        </article>
      </div>
      <div className="panel danger-zone">
        <button className="danger" onClick={() => window.confirm('Deactivate this local prototype account?') && notify('Account deactivation request recorded for this prototype.')}>Request Account Deactivation</button>
        <button className="danger" onClick={() => window.confirm('Clear local preference choices?') && notify('Local preferences cleared for this session.')}>Clear Preferences</button>
      </div>
    </section>
  );
}

function CourseRequestsPage({ courseRequests, setCourseRequests, courses, setCourses, people, setPeople, employers, setEmployers, setNotifications, openProfile, openPdfFile, notify }) {
  const decideEmployer = (employer, status) => {
    if (status === 'Rejected' && !window.confirm(`Reject ${employer.company} and lock their website access?`)) return;
    setEmployers((items) => items.map((item) => item.id === employer.id ? { ...item, status } : item));
    setPeople((items) => items.map((person) => person.email.toLowerCase() === employer.email.toLowerCase() ? { ...person, status, active: true } : person));
    pushNotification(setNotifications, {
      email: employer.email,
      role: 'Employer',
      type: 'Employer verification',
      text: status === 'Accepted' ? 'Your employer account was accepted. You can now use the website.' : 'Your employer account was rejected. Website access is locked until verification is resolved.'
    });
    notify(`${employer.company} ${status.toLowerCase()}.`);
  };
  const decideRequest = (request, status) => {
    setCourseRequests((items) => items.map((item) => item.id === request.id ? { ...item, status, decidedAt: new Date().toISOString() } : item));
    if (status === 'Accepted') {
      setCourses((items) => items.map((course) => {
        if (course.id !== request.courseId && course.name !== request.courseName) return course;
        return {
          ...course,
          instructors: request.type === 'link'
            ? Array.from(new Set([...course.instructors, request.instructorEmail]))
            : course.instructors.filter((email) => email !== request.instructorEmail)
        };
      }));
      setPeople((items) => items.map((person) => {
        if (person.email !== request.instructorEmail) return person;
        const currentCourses = Array.from(new Set(person.courses || []));
        const nextCourses = request.type === 'link'
          ? Array.from(new Set([...currentCourses, request.courseName]))
          : currentCourses.filter((courseName) => courseName !== request.courseName);
        return { ...person, courses: nextCourses };
      }));
    }
    pushNotification(setNotifications, {
      email: request.instructorEmail,
      role: 'Course Instructor',
      type: 'Course request decision',
      text: `Your ${request.type} request for ${request.courseCode} ${request.courseName} was ${status.toLowerCase()}.`
    });
    notify(`Course ${request.type} request ${status.toLowerCase()}.`);
  };
  const renderRequests = (type) => {
    const items = courseRequests.filter((request) => request.type === type);
    return (
      <div className="panel">
        <SectionHeader title={type === 'link' ? 'Course Link Requests' : 'Course Unlink Requests'} subtitle={`${items.filter((request) => request.status === 'Pending').length} pending`} />
        <div className="mini-list">
          {items.map((request) => (
            <div className="mini-row invite-row" key={request.id}>
              <Icon name={type === 'link' ? 'link' : 'link_off'} />
              <div><strong>{request.instructorName}</strong><small>{request.courseCode} {request.courseName} / {request.status}</small></div>
              {request.status === 'Pending' ? (
                <div className="inline-actions">
                  <button className="text-button" onClick={() => decideRequest(request, 'Accepted')}>Accept</button>
                  <button className="danger" onClick={() => decideRequest(request, 'Rejected')}>Reject</button>
                </div>
              ) : <span className={`badge ${request.status === 'Accepted' ? 'student' : 'administrator'}`}>{request.status}</span>}
            </div>
          ))}
          {items.length === 0 && <EmptyState icon="inbox" title="No requests" text={`No ${type} requests have been sent yet.`} />}
        </div>
      </div>
    );
  };
  return (
    <section className="stack">
      <SectionHeader title="Requests" subtitle="Review employer applications and instructor course link requests." />
      <div className="panel">
        <SectionHeader title="Employer Applications" subtitle={`${employers.filter((employer) => employer.status === 'Pending').length} pending`} />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Company</th><th>Email</th><th>Address</th><th>Document</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {employers.map((employer) => (
                <tr key={employer.id}>
                  <td><button className="text-button" onClick={() => openProfile(employer.email)}>{employer.company}</button></td>
                  <td>{employer.email}</td>
                  <td>{employer.address || 'Not added'}</td>
                  <td>{employer.document ? <button className="document-link" type="button" onClick={() => openPdfFile({ name: employer.document, url: employer.documentUrl })}>{employer.document}</button> : <span className="muted">No document</span>}</td>
                  <td>{employer.status}</td>
                  <td>
                    {employer.status === 'Pending' ? (
                      <div className="inline-actions">
                        <button className="text-button" onClick={() => decideEmployer(employer, 'Accepted')}>Accept</button>
                        <button className="danger" onClick={() => decideEmployer(employer, 'Rejected')}>Reject</button>
                      </div>
                    ) : (
                      <span className={`badge ${employer.status === 'Accepted' ? 'employer' : 'administrator'}`}>Review complete</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="two-column">
        {renderRequests('link')}
        {renderRequests('unlink')}
      </div>
    </section>
  );
}

function CourseInventory({ user, courses, setCourses, projects, setProjects, people, setPeople, openProject, notify }) {
  const [courseForm, setCourseForm] = useState({ name: '', code: '' });
  const [courseScope, setCourseScope] = useState('supervised');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const isInstructor = user.role === 'Course Instructor';
  const linkedInstructorEmails = (course) => courseInstructorEmails(course, people);
  const supervisedProjects = projects.filter((project) => {
    const course = courses.find((item) => item.name === project.course);
    return project.instructor === user.fullName || (project.instructorInvites || []).includes(user.fullName) || linkedInstructorEmails(course).includes(user.email);
  });
  const supervisedCourseNames = new Set(supervisedProjects.map((project) => project.course));
  const supervisedCourses = courses.filter((course) => linkedInstructorEmails(course).includes(user.email) || supervisedCourseNames.has(course.name));
  const visibleCourses = isInstructor ? (courseScope === 'all' ? courses : supervisedCourses) : courses;
  const visibleProjects = isInstructor ? supervisedProjects : projects;
  const selectedCourse = courses.find((course) => course.id === selectedCourseId);
  const linkedInstructorNames = (course) => linkedInstructorEmails(course)
    .map((email) => people.find((person) => person.email === email)?.fullName || email)
    .join(', ') || 'No instructors linked';
  const addCourse = () => {
    if (!courseForm.name || !courseForm.code) return notify('Course name and code are required.');
    setCourses((items) => [{ id: Date.now(), ...courseForm, instructors: [] }, ...items]);
    setCourseForm({ name: '', code: '' });
    notify('Course created.');
  };
  const updateCourse = (courseId, patch) => {
    updateCourseWithRelations(courseId, patch, courses, setCourses, setProjects, setPeople);
  };
  const deleteCourse = (course) => {
    if (!window.confirm(`Delete ${course.code} ${course.name}?`)) return;
    setCourses((items) => items.filter((item) => item.id !== course.id));
    notify('Course deleted.');
  };
  const updateProject = (projectId, patch) => {
    setProjects?.((items) => items.map((project) => project.id === projectId ? { ...project, ...patch } : project));
  };
  return (
    <section className="stack">
      <SectionHeader title={isInstructor ? 'Courses' : 'Courses & Projects'} subtitle={isInstructor ? 'Your linked courses and every project you are assigned to, including private projects.' : 'Create and edit courses, then review every project, including private projects.'} />
      <div className="two-column">
        <div className="panel">
          <SectionHeader title={isInstructor ? (courseScope === 'all' ? 'All Courses' : 'Supervised Courses') : 'Courses'} subtitle={`${visibleCourses.length} course${visibleCourses.length === 1 ? '' : 's'} included`} />
          {isInstructor && (
            <div className="segmented-control" role="group" aria-label="Course list type">
              <button className={courseScope === 'supervised' ? 'selected' : ''} type="button" onClick={() => setCourseScope('supervised')}>Supervised Courses</button>
              <button className={courseScope === 'all' ? 'selected' : ''} type="button" onClick={() => setCourseScope('all')}>All Courses</button>
            </div>
          )}
          {!isInstructor && (
            <div className="course-create-row">
              <label>Course name<input value={courseForm.name} onChange={(event) => setCourseForm({ ...courseForm, name: event.target.value })} placeholder="Course name" /></label>
              <label>Course code<input value={courseForm.code} onChange={(event) => setCourseForm({ ...courseForm, code: event.target.value })} placeholder="Course code" /></label>
              <button className="primary" onClick={addCourse}>Create Course</button>
            </div>
          )}
          <div className="mini-list">
            {visibleCourses.map((course) => isInstructor ? (
              <MiniItem key={course.id} icon="menu_book" title={`${course.code} ${course.name}`} meta={courseScope === 'all' && !supervisedCourses.some((item) => item.id === course.id) ? 'Available course' : 'Supervised course'} />
            ) : (
              <div className="mini-row course-management-row" key={course.id}>
                <Icon name="menu_book" />
                <div>
                  <button className="text-button project-title-link" type="button" onClick={() => setSelectedCourseId(course.id)}>{course.code} {course.name}</button>
                  <small>{linkedInstructorEmails(course).length} linked instructor{linkedInstructorEmails(course).length === 1 ? '' : 's'}</small>
                  <div className="inline-edit-row course-edit-row">
                    <input value={course.name} onChange={(event) => updateCourse(course.id, { name: event.target.value })} aria-label={`Edit name for ${course.code}`} placeholder="Course name" />
                    <input value={course.code} onChange={(event) => updateCourse(course.id, { code: event.target.value })} aria-label={`Edit code for ${course.name}`} placeholder="Course code" />
                  </div>
                </div>
                <button className="danger" onClick={() => deleteCourse(course)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <SectionHeader title={isInstructor ? 'Supervised Projects' : 'All Projects'} subtitle={`${visibleProjects.length} ${isInstructor ? 'assigned' : 'public and private'} project${visibleProjects.length === 1 ? '' : 's'}`} />
          <div className="repo-list course-project-scroll">
            {visibleProjects.map((project) => (
              <div className="repo-row" key={project.id}>
                <div className="repo-main">
                  <Icon name={project.public ? 'visibility' : 'visibility_off'} />
                  <div>
                    <button className="text-button project-title-link" onClick={() => openProject(project.id)}>{project.title}</button>
                    <small>{project.course} / {project.creator} / {project.public ? 'Public' : 'Private'} / {project.active ? 'Active' : 'Deactivated'}{project.projectCode ? ` / ${project.projectCode}` : ''}</small>
                  </div>
                </div>
                {!isInstructor && <button className={project.active ? 'danger' : 'secondary'} onClick={() => updateProject(project.id, { active: !project.active })}>{project.active ? 'Deactivate' : 'Activate'}</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isInstructor && selectedCourse && (
        <div className="course-modal-backdrop" onClick={() => setSelectedCourseId(null)} role="presentation">
          <section className="course-modal" onClick={(event) => event.stopPropagation()} aria-label={`${selectedCourse.code} ${selectedCourse.name} linked instructors`}>
            <header className="pdf-modal-header">
              <div>
                <span className="badge instructor">Course</span>
                <h2>{selectedCourse.code} {selectedCourse.name}</h2>
              </div>
              <button className="icon-button close-button" onClick={() => setSelectedCourseId(null)} aria-label="Close course instructors"><Icon name="close" /></button>
            </header>
            <div className="mini-list course-modal-list">
              {linkedInstructorEmails(selectedCourse).map((email) => {
                const instructor = people.find((person) => person.email === email);
                return <MiniItem key={email} icon="school" title={instructor?.fullName || email} meta={email} />;
              })}
              {linkedInstructorEmails(selectedCourse).length === 0 && <EmptyState icon="school" title="No linked instructors" text="Accepted course-link requests will appear here." />}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function StatisticsCenter({ user, people, projects, internships, courses, tasks, drafts }) {
  const [selectedPlatformMetric, setSelectedPlatformMetric] = useState('users');
  const ownedProjects = projects.filter((project) => project.creator === user.fullName);
  const myInternships = internships.filter((internship) => internship.employerEmail === user.email);
  const acceptedInterns = new Set(myInternships.flatMap((internship) => internship.applications.filter((application) => application.status === 'Accepted').map((application) => application.email)));
  const languageCounts = ownedProjects.flatMap((project) => project.languages || []).reduce((counts, language) => ({ ...counts, [language]: (counts[language] || 0) + 1 }), {});
  const totalLanguages = Object.values(languageCounts).reduce((sum, count) => sum + count, 0) || 1;
  const languageEntries = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);
  const collaboratorStats = ownedProjects.flatMap((project) => {
    const names = Array.from(new Set(project.collaborators || []));
    return names.map((name) => {
      const completedTasks = tasks.filter((task) => task.projectId === project.id && task.assignee === name && task.status === 'Completed').length;
      const uploads = drafts.filter((draft) => draft.projectId === project.id && draft.project?.includes(project.title)).length;
      return { project: project.title, name, score: completedTasks + uploads };
    });
  });
  const internshipTimeline = Object.entries(myInternships.reduce((counts, internship) => {
    const month = internship.postedAt?.slice(0, 7) || 'Unknown';
    return { ...counts, [month]: (counts[month] || 0) + 1 };
  }, {})).map(([label, value]) => ({ label, value }));
  const allInternshipTimeline = Object.entries(internships.reduce((counts, internship) => {
    const month = internship.postedAt?.slice(0, 7) || 'Unknown';
    return { ...counts, [month]: (counts[month] || 0) + 1 };
  }, {})).map(([label, value]) => ({ label, value }));
  const acceptedInternEmails = new Set(internships.flatMap((internship) => internship.applications.filter((application) => application.status === 'Accepted').map((application) => application.email)));
  const roleCounts = people.reduce((counts, person) => ({ ...counts, [person.role]: (counts[person.role] || 0) + 1 }), {});
  const platformChart = selectedPlatformMetric === 'users'
    ? Object.entries(roleCounts).map(([label, value]) => ({ label, value }))
    : selectedPlatformMetric === 'projects'
      ? courses.map((course) => ({ label: course.code, value: projects.filter((project) => project.course === course.name).length }))
      : courses.map((course) => ({ label: course.code, value: courseInstructorEmails(course, people).length }));
  const platformChartTotal = selectedPlatformMetric === 'users'
    ? people.length
    : selectedPlatformMetric === 'projects'
      ? projects.length
      : Math.max(1, people.filter((person) => person.role === 'Course Instructor').length);
  const platformChartSubtitle = selectedPlatformMetric === 'courses'
    ? 'Bars show linked instructors per course as a share of all instructors.'
    : 'Bars show each category as a share of the selected total.';
  if (user.role === 'Employer') {
    return (
      <section className="stack statistics-page">
        <SectionHeader title="Employer Statistics" subtitle="Internship participation and offered openings for this company account." />
        <div className="stat-grid">
          <StatCard label="My Offered Internships" value={myInternships.length} icon="business_center" />
          <StatCard label="Accepted Interns" value={acceptedInterns.size} icon="group" />
          <StatCard label="Current Openings" value={myInternships.filter((internship) => internship.status === 'Currently hiring').length} icon="work" />
          <StatCard label="Archived" value={myInternships.filter((internship) => internship.archived).length} icon="archive" />
        </div>
        <div className="panel">
          <SectionHeader title="Internships Offered Over Time" />
          <SimpleBarChart data={internshipTimeline} />
          <div className="mini-list">{myInternships.map((internship) => <MiniItem key={internship.id} icon="timeline" title={internship.title} meta={`${internship.postedAt} / ${internship.applications.length} application${internship.applications.length === 1 ? '' : 's'}`} />)}</div>
        </div>
      </section>
    );
  }
  if (user.role === 'Administrator') {
    return (
      <section className="stack statistics-page">
        <SectionHeader title="Platform Statistics" subtitle="Platform usage, course inventory and internship activity." />
        <div className="stat-grid">
          <StatCard label="Users" value={people.length} icon="group" />
          <StatCard label="Projects" value={projects.length} icon="folder_open" />
          <StatCard label="Courses" value={courses.length} icon="menu_book" />
          <StatCard label="Internships" value={internships.length} icon="business_center" />
          <StatCard label="Students Interned" value={acceptedInternEmails.size} icon="school" />
        </div>
        <div className="panel">
          <SectionHeader title="Internship Outcomes" subtitle="Students accepted into internships and internships offered over time." />
          <div className="stat-grid">
            <StatCard label="Accepted Student Interns" value={acceptedInternEmails.size} icon="group" />
            <StatCard label="Internships Offered" value={internships.length} icon="business_center" />
          </div>
          <SimpleBarChart data={allInternshipTimeline} />
        </div>
        <div className="panel">
          <SectionHeader title="Platform Usage" subtitle={platformChartSubtitle} />
          <div className="stat-grid">
            <StatCard label="Total Users" value={people.length} icon="group" onClick={() => setSelectedPlatformMetric('users')} selected={selectedPlatformMetric === 'users'} />
            <StatCard label="Total Projects" value={projects.length} icon="folder_open" onClick={() => setSelectedPlatformMetric('projects')} selected={selectedPlatformMetric === 'projects'} />
            <StatCard label="Total Courses" value={courses.length} icon="menu_book" onClick={() => setSelectedPlatformMetric('courses')} selected={selectedPlatformMetric === 'courses'} />
          </div>
          <SimpleBarChart data={platformChart} total={platformChartTotal} />
        </div>
      </section>
    );
  }
  return (
    <section className="stack statistics-page">
      <SectionHeader title="Student Statistics" subtitle="Your project count, language mix and top collaborator contribution signals." />
      <div className="stat-grid">
        <StatCard label="Total Projects" value={ownedProjects.length} icon="folder_open" />
        <StatCard label="Public Projects" value={ownedProjects.filter((project) => project.public).length} icon="visibility" />
        <StatCard label="Languages Used" value={Object.keys(languageCounts).length} icon="code" />
        <StatCard label="Collaborators" value={new Set(ownedProjects.flatMap((project) => project.collaborators || [])).size} icon="groups" />
      </div>
      <div className="two-column">
        <div className="panel">
          <SectionHeader title="Programming Languages" subtitle="Percentage across your project language tags." />
          <div className="language-mix-bar">
            {languageEntries.map(([language, count], index) => <span key={language} className={`mix-${index % 4}`} style={{ width: `${(count / totalLanguages) * 100}%` }} />)}
          </div>
          <div className="language-list">
            {languageEntries.map(([language, count], index) => (
              <div className="language-row" key={language}>
                <span className={`language-icon mix-${index % 4}`}><Icon name="code" /></span>
                <strong>{language}</strong>
                <span>{Math.round((count / totalLanguages) * 100)}%</span>
                <i><b style={{ width: `${Math.round((count / totalLanguages) * 100)}%` }} /></i>
              </div>
            ))}
            {languageEntries.length === 0 && <EmptyState icon="code_off" title="No languages yet" text="Add languages to your projects to populate this chart." />}
          </div>
        </div>
        <div className="panel">
          <SectionHeader title="Top Collaborators" subtitle="Score uses completed tasks plus uploaded project content." />
          <div className="collaborator-rank-list">
            {collaboratorStats.sort((a, b) => b.score - a.score).map((item, index) => (
              <div className="collaborator-rank-row" key={`${item.project}-${item.name}`}>
                <strong>#{index + 1}</strong>
                <span className="avatar small-avatar">{initials(item.name)}</span>
                <div><b>{item.name}</b><small>{item.project}</small></div>
                <span>{item.score}<small>pts</small></span>
                <i><b style={{ width: `${Math.min(100, Math.max(8, item.score * 8))}%` }} /></i>
              </div>
            ))}
            {collaboratorStats.length === 0 && <EmptyState icon="groups" title="No collaborator statistics yet" text="Accepted collaborators with completed tasks will appear here." />}
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicPortfolioPage({ user, person, projects, courses, openProject, startChatWith, onBack }) {
  const visibleProjects = person.role === 'Student'
    ? projects.filter((project) => project.creator === person.fullName && project.public && project.active)
    : projects.filter((project) => project.public && project.active && (project.instructor === person.fullName || (project.instructorInvites || []).includes(person.fullName)));
  const totalViews = visibleProjects.reduce((sum, project) => sum + (project.views || 120 + (project.id % 20) * 23), 0);
  const averageRating = visibleProjects.length
    ? (visibleProjects.reduce((sum, project) => sum + Number(project.rating || 0), 0) / visibleProjects.length).toFixed(1)
    : 'New';
  const supervisedStudents = new Set(visibleProjects.map((project) => project.creator)).size;
  const instructorReviews = projects.flatMap((project) => (project.reviews || [])
    .filter((review) => review.instructorEmail === person.email || review.instructor === person.fullName)
    .map((review) => ({ ...review, projectTitle: project.title })));
  const averageGivenRating = instructorReviews.length
    ? (instructorReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / instructorReviews.length).toFixed(1)
    : 'New';
  const canMessage = person.email !== user.email && user.role !== 'Administrator';
  const messageButton = canMessage ? <button className="primary" onClick={() => startChatWith(person.email)}><Icon name="forum" /> Message</button> : null;
  if (person.role === 'Student') {
    return (
      <section className="stack public-page portfolio-reference-page">
        <button className="text-button back-button" onClick={onBack}><Icon name="arrow_back" /> Back to Discovery</button>
        <section className="public-profile-hero">
          <span className="large-avatar public-avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
          <div className="public-profile-copy">
            <span className="badge student">Student</span>
            <h1>{person.fullName}</h1>
            <p>{studentHeadline(person)}</p>
            <p className="muted">{person.email}</p>
            <div className="profile-meta-row">
              <span><Icon name="folder_open" /> {visibleProjects.length} Public Project{visibleProjects.length === 1 ? '' : 's'}</span>
              <span><Icon name="school" /> {person.major || 'Major not added'}</span>
              <span><Icon name="code" /> {(person.skills || []).slice(0, 3).join(' · ') || 'Skills not added'}</span>
              {person.linkedIn && <a href={formatUrl(person.linkedIn)} target="_blank" rel="noreferrer"><Icon name="link" /> {person.linkedIn}</a>}
            </div>
          </div>
          {messageButton}
        </section>
        <div className="portfolio-reference-grid">
          <div className="profile-side-stack">
            <section className="panel">
              <SectionHeader title="Skills & Profile" />
              <div className="reference-label">Technologies</div>
              <div className="chips">{(person.skills || []).map((skill) => <span key={skill}>{skill}</span>)}</div>
              <MiniItem icon="school" title={person.major || 'Major not added'} meta="Major" />
              {person.linkedIn ? <LinkedProfileItem value={person.linkedIn} /> : <MiniItem icon="link" title="Public URL not added" meta="Public profile URL" />}
              <MiniItem icon="star" title={`${averageRating} Avg Rating`} meta="Across public projects" />
            </section>
          </div>
          <section className="panel">
            <SectionHeader title="Public Projects" subtitle={`${visibleProjects.length} visible project${visibleProjects.length === 1 ? '' : 's'}`} />
            <div className="reference-project-list">
              {visibleProjects.map((project) => (
                <article className={`reference-project-card ${accentClass(project.course)}`} key={project.id}>
                  <span className="project-icon"><Icon name="database" /></span>
                  <div>
                    <div className="reference-project-head">
                      <span className="badge student">{project.course}</span>
                      <span className="badge accepted">{project.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.report}</p>
                    <div className="chips">{project.languages.map((language) => <span key={language}>{language}</span>)}</div>
                  </div>
                  <div className="reference-project-side">
                    <strong><span className="rating-star">★</span> {project.rating || 'New'}</strong>
                    <small><Icon name="visibility" /> {project.views || 120 + (project.id % 20) * 23}</small>
                  </div>
                  <div className="reference-project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer"><Icon name="code" /> GitHub</a>
                    <a href={project.demo} target="_blank" rel="noreferrer"><Icon name="play_circle" /> Demo</a>
                    <button className="text-button" onClick={() => openProject(project.id)}>View Details <Icon name="arrow_forward" /></button>
                  </div>
                </article>
              ))}
              {visibleProjects.length === 0 && <EmptyState icon="visibility_off" title="No public projects" text="This portfolio does not have public projects yet." />}
            </div>
          </section>
        </div>
      </section>
    );
  }
  if (person.role === 'Course Instructor') {
    return (
      <section className="stack public-page portfolio-reference-page">
        <button className="text-button back-button" onClick={onBack}><Icon name="arrow_back" /> Back to Instructors</button>
        <section className="public-profile-hero instructor-reference-hero">
          <span className="large-avatar public-avatar instructor-avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
          <div className="public-profile-copy">
            <span className="badge instructor">Course Instructor</span>
            <h1>{person.fullName}</h1>
            <p>{person.bio || 'Course instructor profile'}</p>
            <p className="muted">{person.email}</p>
            <div className="chips">{instructorCourseLabels(person, courses).map((courseName) => <span key={courseName}>{courseName}</span>)}</div>
          </div>
          {messageButton}
        </section>
        <div className="portfolio-reference-grid">
          <div className="profile-side-stack">
            <section className="panel">
              <SectionHeader title="Instructor Profile" />
              <MiniItem icon="science" title={person.interests || 'Research interests not added'} meta="Research Interests" />
              <MiniItem icon="school" title={person.education || 'Education background not added'} meta="Education" />
              <MiniItem icon="groups" title={`${supervisedStudents} active`} meta={`${visibleProjects.length} public supervised projects`} />
              <MiniItem icon="star" title={`${averageGivenRating} Avg Rating`} meta={`${instructorReviews.length} review${instructorReviews.length === 1 ? '' : 's'} given`} />
            </section>
            <section className="panel">
              <SectionHeader title="Courses Teaching" />
              <div className="mini-list">
                {instructorCourseLabels(person, courses).map((courseName) => <MiniItem key={courseName} icon="menu_book" title={courseName} meta="Course" />)}
              </div>
            </section>
          </div>
          <div className="profile-side-stack">
            <section className="panel">
              <SectionHeader title="Projects Supervised" subtitle={`${visibleProjects.length} project${visibleProjects.length === 1 ? '' : 's'}`} />
              <div className="mini-list">
                {visibleProjects.map((project) => (
                  <button key={project.id} className="supervised-project-row" onClick={() => openProject(project.id)}>
                    <Icon name="folder_open" />
                    <span><strong>{project.title}</strong><small>{project.creator} · {project.course}</small></span>
                    <strong><span className="rating-star">★</span> {project.rating || 'New'}</strong>
                    <span className="badge accepted">Active</span>
                  </button>
                ))}
                {visibleProjects.length === 0 && <EmptyState icon="visibility_off" title="No public supervised projects" text="Only public supervised projects are displayed." />}
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="stack public-page">
      <button className="text-button back-button" onClick={onBack}><Icon name="arrow_back" /> Back</button>
      <section className="public-hero">
        <div>
          <span className={`badge ${roleClass(person.role)}`}>{person.role}</span>
          <h1>{person.fullName}</h1>
          <p>{person.role === 'Student' ? studentHeadline(person) : person.role === 'Employer' ? person.companyBio || 'Employer partner profile' : person.bio || 'Course instructor profile'}</p>
          <p className="muted">{person.email}</p>
          {person.email !== user.email && user.role !== 'Administrator' && <button className="primary" onClick={() => startChatWith(person.email)}><Icon name="forum" /> Message</button>}
        </div>
        <span className="large-avatar public-avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
      </section>
      {person.role === 'Employer' && (
        <div className="panel">
          <SectionHeader title="Company Profile" />
          <div className="three-grid compact-grid">
            <MiniItem icon="business" title={person.companyBio || 'Company biography not added'} meta="Biography" />
            <MiniItem icon={person.contactType === 'phone' ? 'call' : 'mail'} title={person.contact || 'Contact not added'} meta="Contact" />
            <MiniItem icon="location_on" title={person.address || 'Address not added'} meta="Address" />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectDetailPage({ user, project, drafts = [], invitations = [], people, setProjects, setDrafts, setNotifications, openProfile, startChatWith, openPdfFile, onBack }) {
  const finalDraft = finalThesisDraft(project, drafts);
  const acceptedInvites = invitations.filter((invite) => invite.projectId === project.id && invite.status === 'Accepted');
  const owner = people.find((person) => person.fullName === project.creator);
  const locked = projectIsLocked(project);
  const [reviewDraft, setReviewDraft] = useState({ rating: 5, comment: '' });
  const [thesisFeedback, setThesisFeedback] = useState('');
  const [selectedThesisDraftId, setSelectedThesisDraftId] = useState('');
  const projectReviews = project.reviews || [];
  const displayedRating = projectReviews.length
    ? (projectReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / projectReviews.length).toFixed(1)
    : Number(project.rating || 0).toFixed(1);
  const isAssignedInstructor = isAssignedInstructorForProject(user, project, invitations);
  const isProjectMember = project.creator === user.fullName || acceptedInvites.some((invite) => invite.email === user.email) || isAssignedInstructor;
  const visibleThesisDrafts = visibleThesisDraftsForUser(project, drafts, user, invitations);
  const instructorThesisDrafts = feedbackDraftsForInstructor(project, drafts, user, invitations);
  const selectedThesisDraft = instructorThesisDrafts.find((draft) => draft.id === Number(selectedThesisDraftId)) || instructorThesisDrafts[0];
  const submitProjectReview = () => {
    if (!isAssignedInstructor) return;
    const ratingValue = Math.min(5, Math.max(1, Number(reviewDraft.rating) || 1));
    const comment = reviewDraft.comment.trim();
    setProjects((items) => items.map((item) => {
      if (item.id !== project.id) return item;
      const nextReviews = [
        ...(item.reviews || []).filter((review) => review.instructorEmail !== user.email),
        { instructor: user.fullName, instructorEmail: user.email, rating: ratingValue, comment, createdAt: new Date().toISOString() }
      ];
      const nextRating = nextReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / nextReviews.length;
      return { ...item, reviews: nextReviews, rating: Number(nextRating.toFixed(1)), comments: comment ? [...(item.comments || []), `${user.fullName}: ${comment}`] : item.comments || [] };
    }));
    projectMemberEmails(project, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Project feedback',
        text: `${user.fullName} left feedback on ${project.title}.`
      });
    });
    setReviewDraft({ rating: 5, comment: '' });
  };
  const submitThesisFeedback = () => {
    const comment = thesisFeedback.trim();
    if (!selectedThesisDraft || !isAssignedInstructor || !comment) return;
    setDrafts((items) => items.map((draft) => draft.id === selectedThesisDraft.id ? {
      ...draft,
      feedback: [...(draft.feedback || []), { instructor: user.fullName, comment, createdAt: new Date().toISOString() }]
    } : draft));
    projectMemberEmails(project, people, invitations).forEach((email) => {
      pushNotification(setNotifications, {
        email,
        role: 'Student',
        type: 'Thesis feedback',
        text: `${user.fullName} commented on a thesis draft for ${project.title}.`
      });
    });
    setThesisFeedback('');
  };
  return (
    <section className="stack public-page">
      <button className="text-button back-button" onClick={onBack}><Icon name="arrow_back" /> Back</button>
      {locked && <div className="lock-banner"><Icon name="lock" /> This project is locked because it is deactivated or its flag appeal window expired.</div>}
      <section className="public-hero project-public-hero">
        <div>
          <span className="badge student">{project.course}</span>
          <h1>{project.title}</h1>
          <p>{project.report || 'No project report has been written yet.'}</p>
          <div className="project-meta-row">
            <span className="avatar small-avatar">{initials(project.creator)}</span>
            <strong>{project.creator}</strong>
            <span>Created {project.createdAt}</span>
            <span><Icon name={project.public ? 'public' : 'lock'} /> {project.public ? 'Public' : 'Private'}</span>
            <span className={project.active ? 'status-active-dot' : 'status-muted-dot'}>{project.active ? 'Active' : 'Deactivated'}</span>
            <span><span className="rating-star">★</span> {displayedRating} public rating</span>
            <span><Icon name="visibility" /> {project.views || 120 + (project.id % 20) * 23} views</span>
          </div>
          <div className="chips">{project.languages.map((language) => <span key={language}>{language}</span>)}</div>
          <div className="actions">
            {owner && <button className="secondary" onClick={() => openProfile(owner.email)}>View Owner Portfolio</button>}
            {owner && owner.email !== user.email && user.role !== 'Administrator' && <button className="primary" onClick={() => startChatWith(owner.email)}><Icon name="forum" /> Message Owner</button>}
          </div>
        </div>
        <img className="public-project-image" src={project.image} alt="" />
      </section>
      {project.flagged && (
        <div className="panel">
          <SectionHeader title="Moderation Status" subtitle={flagCountdown(project)} />
          <MiniItem icon="gavel" title={project.flagReason || 'Flagged'} meta={`Flagged by ${project.flaggedBy || 'moderator'}`} />
          <MiniItem icon="forum" title={project.appeal || 'No appeal submitted'} meta="Appeal message" />
        </div>
      )}
      <div className="two-column">
        <div className="panel">
          <SectionHeader title="Links & Report" />
          <div className="link-grid">
            <a href={project.github} target="_blank" rel="noreferrer"><Icon name="code" /><span>GitHub Repository</span><small>{project.github}</small></a>
            <a href={project.demo} target="_blank" rel="noreferrer"><Icon name="play_circle" /><span>Demo Video</span><small>{project.demo || 'No demo link added'}</small></a>
          </div>
          <section className="report-box">
            <h3>Project Report</h3>
            <p>{project.report || 'No project report has been written yet.'}</p>
          </section>
        </div>
        <div className="panel">
          <SectionHeader title="Collaborators & Instructors" />
          <div className="mini-list">
            {acceptedInvites.map((invite) => <MiniItem key={invite.id} icon="group" title={invite.person} meta={`${invite.role} / accepted`} />)}
            <MiniItem icon="person" title={project.creator} meta="Owner" />
            {acceptedInvites.length === 0 && <p className="muted">No accepted collaborators yet.</p>}
          </div>
        </div>
      </div>
      <section className="panel project-feedback-section">
        <SectionHeader title="Project Feedback" subtitle={`${projectReviews.length} instructor rating${projectReviews.length === 1 ? '' : 's'} / ${displayedRating} average`} />
        <div className="feedback-rating-pill"><span className="rating-star">★</span> {displayedRating}</div>
        {isAssignedInstructor && (
          <div className="form-grid feedback-editor">
            <div className="star-field"><span>Rating out of 5</span><StarRating value={reviewDraft.rating} onChange={(rating) => setReviewDraft({ ...reviewDraft, rating })} /></div>
            <label className="full-label">General project comment<textarea value={reviewDraft.comment} onChange={(event) => setReviewDraft({ ...reviewDraft, comment: event.target.value })} placeholder="Leave feedback for the project team" /></label>
            <button className="primary" onClick={submitProjectReview}>Save Feedback</button>
          </div>
        )}
        {isProjectMember && (
          <div className="feedback-card-grid">
            {projectReviews.map((review) => (
              <div className="feedback-card" key={`${review.instructorEmail}-${review.createdAt}`}>
                <div><span className="avatar small-avatar">{initials(review.instructor)}</span><strong>{review.instructor}</strong></div>
                <RatingStars value={review.rating} />
                <p>{review.comment || 'Rating only'}</p>
                <small>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</small>
              </div>
            ))}
            {(project.comments || []).filter((comment) => !projectReviews.some((review) => comment.includes(review.comment))).map((comment) => <MiniItem key={comment} icon="forum" title={comment} meta="Project comment" />)}
          </div>
        )}
      </section>
      {isBachelorCourse(project.course) && (
        <section className="panel">
          <SectionHeader title={finalDraft ? 'Final Thesis' : 'Bachelor Thesis Drafts'} subtitle={finalDraft ? 'Only the selected final thesis is visible to non-creators.' : 'Assigned instructors can review drafts before a final thesis is selected.'} />
          {visibleThesisDrafts.length > 0 ? (
            <div className="thesis-actions thesis-action-list">
              {visibleThesisDrafts.map((draft) => (
                <button className="thesis-link" type="button" key={draft.id} onClick={() => openPdfFile({ name: draft.name, url: draft.documentUrl || SAMPLE_PDF_DATA_URL })}>
                  <Icon name="picture_as_pdf" />
                  <span>{draft.name}</span>
                  <small>{draft.final ? 'Visible final thesis' : 'Draft visible for review'}</small>
                </button>
              ))}
            </div>
          ) : <p className="muted">No final thesis draft has been selected yet.</p>}
          {isProjectMember && visibleThesisDrafts.some((draft) => (draft.feedback || []).length) && (
            <div className="mini-list thesis-feedback-list">
              {visibleThesisDrafts.flatMap((draft) => (draft.feedback || []).map((item) => <MiniItem key={`${draft.id}-${item.instructor}-${item.createdAt}`} icon="rate_review" title={item.instructor} meta={`${draft.name}: ${item.comment}`} />))}
            </div>
          )}
          {isAssignedInstructor && instructorThesisDrafts.length > 0 && (
            <div className="form-grid feedback-editor">
              <label className="full-label">Thesis draft
                <span className="select-shell">
                  <select value={selectedThesisDraft?.id || ''} onChange={(event) => setSelectedThesisDraftId(event.target.value)}>
                    {instructorThesisDrafts.map((draft) => <option key={draft.id} value={draft.id}>{draft.name}{draft.final ? ' - final thesis' : ''}</option>)}
                  </select>
                  <Icon name="expand_more" />
                </span>
              </label>
              <label className="full-label">Thesis draft comment<textarea value={thesisFeedback} onChange={(event) => setThesisFeedback(event.target.value)} placeholder="Feedback visible to the project creator, collaborators and assigned instructors" /></label>
              <button className="primary" onClick={submitThesisFeedback}>Add Thesis Comment</button>
            </div>
          )}
        </section>
      )}
    </section>
  );
}

function ProfileDetailPanel({ person, projects, onClose, onSelectProject }) {
  const visibleProjects = person.role === 'Student'
    ? projects.filter((project) => project.creator === person.fullName && project.public)
    : projects.filter((project) => project.public && project.active && (project.instructor === person.fullName || (project.instructorInvites || []).includes(person.fullName)));
  return (
    <aside className="detail-panel" aria-label={`${person.fullName} profile`}>
      <div className="detail-card profile-detail-card">
        <button className="icon-button close-button" onClick={onClose} aria-label="Close profile details"><Icon name="close" /></button>
        <div className="profile-detail-head">
          <span className="large-avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
          <div>
            <span className={`badge ${roleClass(person.role)}`}>{person.role}</span>
            <h2>{person.fullName}</h2>
            <p className="muted">{person.email}</p>
          </div>
        </div>
        {person.role === 'Student' ? (
          <>
            <div className="detail-metrics">
              <MiniItem icon="folder_open" title={`${visibleProjects.length}`} meta="Public projects" />
              <MiniItem icon="school" title={person.major || 'Major not set'} meta="Major" />
            </div>
            <div className="chips">{(person.skills || []).map((skill) => <span key={skill}>{skill}</span>)}</div>
            <section className="detail-section">
              <h3>Public Projects</h3>
              {visibleProjects.map((project) => (
                <button key={project.id} className="profile-project-row" onClick={() => onSelectProject?.(project)}>
                  <Icon name="folder_open" />
                  <span><strong>{project.title}</strong><small>{project.course} / {project.rating} rating</small></span>
                  <Icon name="arrow_forward" />
                </button>
              ))}
              {visibleProjects.length === 0 && <EmptyState icon="visibility_off" title="No public projects" text="This portfolio does not have public projects yet." />}
            </section>
          </>
        ) : person.role === 'Employer' ? (
          <>
            <section className="report-box">
              <h3>Company Biography</h3>
              <p>{person.companyBio || 'Company biography not added.'}</p>
            </section>
            <div className="detail-metrics">
              <MiniItem icon="verified_user" title={person.status || 'Pending'} meta="Verification status" />
              <MiniItem icon={person.contactType === 'phone' ? 'call' : 'mail'} title={person.contact || 'Contact not added'} meta={person.contactType === 'phone' ? 'Phone contact' : 'Email contact'} />
              <MiniItem icon="location_on" title={person.address || 'Address not added'} meta="Address" />
            </div>
            <MiniItem icon="map" title={person.mapLocation || 'Map location not added'} meta="Google Maps location" />
            <MiniItem icon="picture_as_pdf" title={person.verificationDocument || 'Verification document missing'} meta="Company document" />
          </>
        ) : (
          <>
            <section className="report-box">
              <h3>Instructor Profile</h3>
              <p>{person.bio || 'No biography added.'}</p>
            </section>
            <div className="chips">{(person.courses || []).map((courseName) => <span key={courseName}>{courseName}</span>)}</div>
            <MiniItem icon="science" title={person.interests || 'Research interests not added'} meta="Research interests" />
            <MiniItem icon="workspace_premium" title={person.education || 'Education background not added'} meta="Education" />
          </>
        )}
      </div>
    </aside>
  );
}

function ProjectDetailPanel({ project, drafts = [], invitations = [], openPdfFile = () => {}, onClose }) {
  const finalDraft = drafts.find((draft) => draft.projectId === project.id && draft.final);
  const acceptedInvites = invitations.filter((invite) => invite.projectId === project.id && invite.status === 'Accepted');
  return (
    <aside className="detail-panel" aria-label={`${project.title} details`}>
      <div className="detail-card">
        <button className="icon-button close-button" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button>
        <span className="badge student">{project.course}</span>
        <h2>{project.title}</h2>
        <p className="muted">{project.creator} / Created {project.createdAt} / {project.public ? 'Public' : 'Private'}</p>
        <div className="link-grid">
          <a href={project.github} target="_blank" rel="noreferrer"><Icon name="code" /><span>GitHub Repository</span><small>{project.github}</small></a>
          <a href={project.demo} target="_blank" rel="noreferrer"><Icon name="play_circle" /><span>Demo Video</span><small>{project.demo || 'No demo link added'}</small></a>
        </div>
        <section className="report-box">
          <h3>Project Report</h3>
          <p>{project.report || 'No project report has been written yet.'}</p>
        </section>
        <div className="chips">{project.languages.map((language) => <span key={language}>{language}</span>)}</div>
        <section className="detail-section">
          <h3>Collaborators & Instructor Invitations</h3>
          {acceptedInvites.length > 0 ? acceptedInvites.map((invite) => <MiniItem key={invite.id} icon="group" title={invite.person} meta={`${invite.role} / accepted`} />) : <p className="muted">No accepted collaborators yet. Pending invitations do not count as added collaborators.</p>}
        </section>
        {project.course === 'Bachelor Project' && (
          <section className="detail-section">
            <h3>Final Thesis</h3>
            {finalDraft ? (
              <div className="thesis-actions">
                <button className="thesis-link" type="button" onClick={() => openPdfFile({ name: finalDraft.name, url: finalDraft.documentUrl || SAMPLE_PDF_DATA_URL })}>
                  <Icon name="picture_as_pdf" />
                  <span>{finalDraft.name}</span>
                  <small>Visible final draft</small>
                </button>
              </div>
            ) : <p className="muted">No final thesis draft has been selected yet.</p>}
          </section>
        )}
      </div>
    </aside>
  );
}

function PdfModal({ file, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);
  return (
    <div className="pdf-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="pdf-modal" role="dialog" aria-modal="true" aria-label={`${file.name} preview`}>
        <header className="pdf-modal-header">
          <div>
            <span className="badge student">PDF Preview</span>
            <h2>{file.name}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close PDF preview"><Icon name="close" /></button>
        </header>
        <iframe className="pdf-frame" title={file.name} src={file.url} />
        <footer className="pdf-modal-actions">
          <button className="secondary" type="button" onClick={onClose}>Close</button>
          <a className="primary" href={file.url} download={file.name}><Icon name="download" /> Download</a>
        </footer>
      </section>
    </div>
  );
}

function SimpleBarChart({ data, total }) {
  const denominator = total || data.reduce((sum, item) => sum + item.value, 0) || 1;
  return (
    <div className="bar-chart">
      {data.map((item) => {
        const percent = denominator ? Math.min(100, Math.max(0, (item.value / denominator) * 100)) : 0;
        return (
          <div className="bar-row" key={item.label}>
            <span>{item.label}</span>
            <div><i style={{ width: `${percent}%` }} /></div>
            <strong>{item.value} ({Math.round(percent)}%)</strong>
          </div>
        );
      })}
      {data.length === 0 && <EmptyState icon="bar_chart" title="No chart data yet" text="New activity will appear here." />}
    </div>
  );
}

function RatingStars({ value = 0 }) {
  const rounded = Math.round(Number(value) || 0);
  return (
    <span className="rating-stars" aria-label={`${rounded} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= rounded ? 'selected' : ''}><Icon name="star" /></span>)}
    </span>
  );
}

function StarRating({ value = 0, onChange }) {
  const current = Number(value) || 0;
  return (
    <div className="star-rating" role="radiogroup" aria-label="Rating out of 5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} className={star <= current ? 'selected' : ''} type="button" onClick={() => onChange?.(star)} role="radio" aria-checked={star === current} aria-label={`${star} star${star === 1 ? '' : 's'}`}>
          <Icon name="star" />
        </button>
      ))}
    </div>
  );
}

function StatCard({ label, value, icon, onClick, selected }) {
  const content = <>{icon && <Icon name={icon} />}<span>{label}</span><strong>{value}</strong></>;
  if (onClick) {
    return <button className={`stat-card clickable-stat ${selected ? 'selected-card' : ''}`} onClick={onClick}>{content}</button>;
  }
  return <article className="stat-card">{content}</article>;
}

function RoleTile({ icon, badge, title, text, onClick }) {
  return (
    <article className="role-tile">
      <Icon name={icon} />
      <span className={`badge ${roleClass(badge)}`}>{badge}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className={badge === 'Employer' ? 'dark-button' : badge === 'Instructor' ? 'secondary' : 'primary'} onClick={onClick}>Open Workspace</button>
    </article>
  );
}

function DashboardIllustration() {
  return (
    <div className="dashboard-illustration" aria-hidden="true">
      <div className="diagram-card diagram-main"><span /><span /><strong /></div>
      <div className="diagram-card diagram-small diagram-top"><span /><strong /></div>
      <div className="diagram-card diagram-small diagram-bottom"><span /><strong /></div>
      <i className="diagram-line line-top" />
      <i className="diagram-line line-bottom" />
    </div>
  );
}

function ProjectCard({ project, favorite, onFavorite, onSelect }) {
  const accent = accentClass(project.course);
  return (
    <article className={`project-card ${accent}`}>
      <div className="project-card-top">
        <span className="project-icon"><Icon name="book_2" /></span>
        <span className="view-pill">{project.views || 120 + (project.id % 20) * 23} views</span>
      </div>
      <div className="project-body">
        <span className="badge student">{project.course}</span>
        <h3>{project.title}</h3>
        <p>{project.report}</p>
        <small>{project.creator} · {project.createdAt} · <span className="rating-star">★</span> {project.rating || 'New'}</small>
        <div className="chips">{project.languages.map((language) => <span key={language}>{language}</span>)}</div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer"><Icon name="code" /> GitHub</a>
          <a href={project.demo} target="_blank" rel="noreferrer"><Icon name="play_circle" /> Demo</a>
        </div>
        <div className="card-actions">
          {onFavorite && <button className={`icon-button ${favorite ? 'favorite-active' : ''}`} onClick={onFavorite} aria-label={favorite ? 'Remove saved project' : 'Save project'} aria-pressed={favorite}><Icon name={favorite ? 'star' : 'star_border'} /></button>}
          {onSelect && <button className="text-button" onClick={onSelect}>View Details</button>}
        </div>
      </div>
    </article>
  );
}

function PortfolioDiscoveryCard({ person, projectCount, favorite, onFavorite, onSelect }) {
  return (
    <article className="project-card portfolio-project-card accent-portfolio">
      <div className="project-card-top">
        <span className="avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
        <span className="view-pill">{projectCount} public projects</span>
      </div>
      <div className="project-body">
        <span className="badge student">{person.major || 'Student Portfolio'}</span>
        <h3>{person.fullName}</h3>
        <p>{studentHeadline(person)}</p>
        <small>{person.email}</small>
        <div className="chips">{(person.skills || []).slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="card-actions">
          {onFavorite && <button className={`icon-button ${favorite ? 'favorite-active' : ''}`} onClick={onFavorite} aria-label={favorite ? 'Remove saved portfolio' : 'Save portfolio'} aria-pressed={favorite}><Icon name={favorite ? 'star' : 'star_border'} /></button>}
          <button className="text-button" onClick={onSelect}>View Portfolio</button>
        </div>
      </div>
    </article>
  );
}

function InstructorDiscoveryCard({ person, courses, onSelect }) {
  return (
    <article className="project-card instructor-project-card accent-instructor clickable-card" role="button" tabIndex="0" onClick={onSelect} onKeyDown={(event) => { if (event.key === 'Enter') onSelect(); }}>
      <div className="project-card-top">
        <span className="avatar">{person.avatarImage ? <img src={person.avatarImage} alt="" /> : initials(person.fullName)}</span>
        <span className="view-pill">Instructor</span>
      </div>
      <div className="project-body">
        <span className="badge instructor">Course Instructor</span>
        <h3>{person.fullName}</h3>
        <p>{person.bio || 'Course instructor profile'}</p>
        <small>{person.email}</small>
        <div className="chips">{instructorCourseLabels(person, courses).map((courseName) => <span key={courseName}>{courseName}</span>)}</div>
        <div className="card-actions instructor-discovery-actions">
          <button className="text-button" type="button" onClick={(event) => { event.stopPropagation(); onSelect(); }}>View Portfolio</button>
        </div>
      </div>
    </article>
  );
}

function LinkedProfileItem({ value }) {
  return (
    <div className="mini-row">
      <Icon name="link" />
      <div>
        <a className="profile-link" href={formatUrl(value)} target="_blank" rel="noreferrer">{value}</a>
        <small>Public profile URL</small>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, text }) {
  return <div className="empty-state"><Icon name={icon} /><strong>{title}</strong><span>{text}</span></div>;
}

function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <header className="section-title">
      <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
      {action && <button className="text-button" onClick={onAction}>{action} <Icon name="arrow_forward" /></button>}
    </header>
  );
}

function FilterBar({ children }) {
  return <div className="filter-bar">{children}</div>;
}

function MiniItem({ icon, title, meta }) {
  return <div className="mini-row"><Icon name={icon} /><div><strong>{title}</strong><small>{meta}</small></div></div>;
}

function Icon({ name }) {
  return <span className="material-symbols-outlined" aria-hidden="true">{name}</span>;
}

function initials(name = '') {
  return name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'EP';
}

function roleClass(role) {
  return role.toLowerCase().replace(/\s+/g, '-');
}

function studentHeadline(person = {}) {
  const major = (person.major || '').trim();
  return `${major ? `${major} Student` : 'Student'} at The German University in Cairo`;
}

function accentClass(value = '') {
  const text = value.toLowerCase();
  if (text.includes('data') || text.includes('mining')) return 'accent-blue';
  if (text.includes('software')) return 'accent-purple';
  if (text.includes('bachelor')) return 'accent-green';
  if (text.includes('computer')) return 'accent-gold';
  if (text.includes('network')) return 'accent-red';
  return 'accent-cyan';
}

function formatUrl(value) {
  if (!value) return '';
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function isOriginalAdmin(person) {
  return person?.role === 'Administrator' && person.email?.toLowerCase() === ORIGINAL_ADMIN_EMAIL;
}

function updateCourseWithRelations(courseId, patch, courses, setCourses, setProjects, setPeople) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;
  const previousName = course.name;
  const nextName = patch.name ?? previousName;
  setCourses?.((items) => items.map((item) => item.id === courseId ? { ...item, ...patch } : item));
  if (patch.name && patch.name !== previousName) {
    setProjects?.((items) => items.map((project) => project.course === previousName ? { ...project, course: nextName } : project));
    setPeople?.((items) => items.map((person) => (person.courses || []).includes(previousName)
      ? { ...person, courses: person.courses.map((courseName) => courseName === previousName ? nextName : courseName) }
      : person));
  }
}

function pushNotification(setNotifications, { text, email, role, type }) {
  setNotifications?.((items) => [{
    id: Date.now() + Math.random(),
    text,
    email,
    role,
    read: false,
    type
  }, ...items]);
}

function notifyTaskAssignment(setNotifications, people, project, task, actor, previousAssignee = null) {
  if (!project || !task?.assignee || task.assignee === previousAssignee) return;
  const assignee = people.find((person) => person.role === 'Student' && person.fullName === task.assignee);
  if (!assignee) return;
  pushNotification(setNotifications, {
    email: assignee.email,
    role: 'Student',
    type: 'Task assignment',
    text: `${actor.fullName} assigned you "${task.title}" in ${project.title}.`
  });
}

function notificationRoleForInvite(inviteRole) {
  return inviteRole === 'Course Instructor' ? 'Course Instructor' : 'Student';
}

function invitationStatusLabel(status) {
  if (status === 'No reply') return 'Pending';
  return status;
}

function applicationStatusLabel(status) {
  if (status === 'Nominated') return 'Applied';
  return status;
}

function isBachelorCourse(courseName = '') {
  return courseName === 'Bachelor Project';
}

function courseInstructorEmails(course, people = []) {
  if (!course) return [];
  const linkedEmails = course.instructors || [];
  if (!isBachelorCourse(course.name)) return linkedEmails;
  const allInstructorEmails = people
    .filter((person) => person.role === 'Course Instructor')
    .map((person) => person.email);
  return Array.from(new Set([...linkedEmails, ...allInstructorEmails]));
}

function instructorCourseLabels(person, courses = []) {
  const directCourses = Array.from(new Set((person.courses || []).filter(Boolean)));
  const linkedCourses = courses
    .filter((course) => courseInstructorEmails(course, [person]).includes(person.email))
    .map((course) => course.name)
    .filter(Boolean);
  return Array.from(new Set([...linkedCourses, ...directCourses]));
}

function canInvitePersonToCourse(person, courseName, course, people = []) {
  if (person.role === 'Course Instructor') {
    if (isBachelorCourse(courseName)) return true;
    return courseInstructorEmails(course, people).includes(person.email) || (person.courses || []).includes(courseName);
  }
  if (isBachelorCourse(courseName)) return false;
  return person.role === 'Student' && person.active;
}

function publicProjectCount(projects, creator) {
  return projects.filter((project) => project.creator === creator && project.public && project.active).length;
}

function projectInstructorState(project, invitations = []) {
  const instructorInvites = invitations.filter((invite) => invite.projectId === project.id && invite.role === 'Course Instructor');
  if (instructorInvites.some((invite) => invite.status === 'Accepted')) {
    return { key: 'active', label: 'Active', badge: 'accepted' };
  }
  if (instructorInvites.some((invite) => invite.status === 'No reply')) {
    return { key: 'pending', label: 'Pending Instructor', badge: 'pending' };
  }
  const latestRejected = instructorInvites
    .filter((invite) => invite.status === 'Rejected')
    .sort((a, b) => new Date(b.decidedAt || 0) - new Date(a.decidedAt || 0))[0];
  if (latestRejected) {
    const decidedAt = latestRejected.decidedAt ? new Date(latestRejected.decidedAt).getTime() : Date.now();
    const expiresAt = decidedAt + 24 * 60 * 60 * 1000;
    if (Date.now() < expiresAt) return { key: 'needs-instructor', label: 'Needs Instructor', badge: 'needs-instructor', expiresAt };
    return { key: 'expired', label: 'Expired', badge: 'rejected' };
  }
  if (project.instructor && project.instructor !== 'Not assigned') {
    return { key: 'active', label: 'Active', badge: 'accepted' };
  }
  return { key: 'pending', label: 'Pending Instructor', badge: 'pending' };
}

function projectIsLocked(project) {
  if (!project) return false;
  if (!project.active) return true;
  if (!project.flagged || project.appeal) return false;
  if (!project.appealDeadline) return false;
  return Date.now() >= new Date(project.appealDeadline).getTime();
}

function flagCountdown(project) {
  if (!project.flagged) return 'Not flagged';
  if (project.appeal) return 'Appeal submitted';
  if (!project.appealDeadline) return 'Awaiting appeal';
  const ms = new Date(project.appealDeadline).getTime() - Date.now();
  if (ms <= 0) return 'Appeal window expired';
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m left to appeal`;
}

function projectMemberEmails(project, people, invitations) {
  const names = [project.creator, ...(project.collaborators || [])];
  const inviteEmails = invitations
    .filter((invite) => invite.projectId === project.id && invite.status === 'Accepted' && invite.role === 'Collaborator')
    .map((invite) => invite.email);
  const nameEmails = people.filter((person) => names.includes(person.fullName)).map((person) => person.email);
  return Array.from(new Set([...nameEmails, ...inviteEmails]));
}

function isAssignedInstructorForProject(user, project, invitations = []) {
  if (!user || user.role !== 'Course Instructor' || !project) return false;
  const acceptedInvite = invitations.some((invite) => invite.projectId === project.id && invite.email === user.email && invite.role === 'Course Instructor' && invite.status === 'Accepted');
  return project.instructor === user.fullName || (project.instructorInvites || []).includes(user.fullName) || acceptedInvite;
}

function thesisDraftsForProject(project, drafts = []) {
  return drafts
    .filter((draft) => draft.projectId === project?.id)
    .sort((a, b) => (b.uploadedAt || '').localeCompare(a.uploadedAt || '') || b.id - a.id);
}

function finalThesisDraft(project, drafts = []) {
  return thesisDraftsForProject(project, drafts).find((draft) => draft.final);
}

function visibleThesisDraftsForUser(project, drafts = [], user, invitations = []) {
  const projectDrafts = thesisDraftsForProject(project, drafts);
  const finalDraft = projectDrafts.find((draft) => draft.final);
  if (!project || !isBachelorCourse(project.course)) return [];
  if (user?.fullName === project.creator) return projectDrafts;
  if (finalDraft) return [finalDraft];
  if (isAssignedInstructorForProject(user, project, invitations)) return projectDrafts;
  return [];
}

function feedbackDraftsForInstructor(project, drafts = [], user, invitations = []) {
  if (!isAssignedInstructorForProject(user, project, invitations) || !isBachelorCourse(project?.course)) return [];
  const projectDrafts = thesisDraftsForProject(project, drafts);
  const finalDraft = projectDrafts.find((draft) => draft.final);
  return finalDraft ? [finalDraft] : projectDrafts;
}

function createInvitation(projectId, projectTitle, sender, invitee, existingInvitations, setInvitations, setNotifications) {
  const duplicate = existingInvitations.some((invite) => invite.projectId === projectId && invite.email === invitee.email && invite.status !== 'Rejected');
  if (duplicate) return;
  setInvitations((items) => [{
    id: Date.now() + Math.random(),
    projectId,
    project: projectTitle,
    sender: sender.fullName,
    senderEmail: sender.email,
    person: invitee.name,
    email: invitee.email,
    role: invitee.role,
    status: 'No reply'
  }, ...items]);
  pushNotification(setNotifications, {
    text: `${sender.fullName} invited you to join ${projectTitle} as ${invitee.role === 'Course Instructor' ? 'the course instructor' : 'a collaborator'}.`,
    email: invitee.email,
    role: notificationRoleForInvite(invitee.role),
    type: 'Project invitation'
  });
  pushNotification(setNotifications, {
    text: `Invitation sent to ${invitee.name} for ${projectTitle}.`,
    email: sender.email,
    role: sender.role,
    type: 'Invitation sent'
  });
}

function updateInvitationStatus(targetInvite, status, actor, setInvitations, setProjects, setNotifications) {
  setInvitations((items) => items.map((invite) => invite.id === targetInvite.id ? { ...invite, status, decidedAt: new Date().toISOString() } : invite));
  if (status === 'Accepted') {
    setProjects((items) => items.map((project) => {
      if (project.id !== targetInvite.projectId) return project;
      const field = targetInvite.role === 'Course Instructor' ? 'instructorInvites' : 'collaborators';
      const current = project[field] || [];
      const nextProject = current.includes(targetInvite.person) ? project : { ...project, [field]: [...current, targetInvite.person] };
      return targetInvite.role === 'Course Instructor' ? { ...nextProject, instructor: targetInvite.person } : nextProject;
    }));
  }
  pushNotification(setNotifications, {
    text: `${actor.fullName} ${status === 'Accepted' ? 'accepted' : 'rejected'} your invitation to ${targetInvite.project}.`,
    email: targetInvite.senderEmail,
    role: 'Student',
    type: status === 'Accepted' ? 'Invitation accepted' : 'Invitation rejected'
  });
  pushNotification(setNotifications, {
    text: `You ${status === 'Accepted' ? 'accepted' : 'rejected'} the invitation to join ${targetInvite.project}.`,
    email: targetInvite.email,
    role: notificationRoleForInvite(targetInvite.role),
    type: status === 'Accepted' ? 'Invitation accepted' : 'Invitation rejected'
  });
}

function cancelInvitation(targetInvite, setInvitations, setProjects, setNotifications, actor) {
  setInvitations((items) => items.filter((invite) => invite.id !== targetInvite.id));
  setProjects((items) => items.map((project) => {
    if (project.id !== targetInvite.projectId) return project;
    const field = targetInvite.role === 'Course Instructor' ? 'instructorInvites' : 'collaborators';
    const nextProject = { ...project, [field]: (project[field] || []).filter((name) => name !== targetInvite.person) };
    return targetInvite.role === 'Course Instructor' && project.instructor === targetInvite.person ? { ...nextProject, instructor: 'Not assigned' } : nextProject;
  }));
  if (setNotifications && actor) {
    pushNotification(setNotifications, {
      text: actor.fullName === targetInvite.sender
        ? `${actor.fullName} ${targetInvite.status === 'Accepted' ? 'removed you from' : 'cancelled your invitation to'} ${targetInvite.project}.`
        : `${actor.fullName} updated the project team for ${targetInvite.project}.`,
      email: targetInvite.email,
      role: notificationRoleForInvite(targetInvite.role),
      type: targetInvite.status === 'Accepted' ? 'Project team update' : 'Invitation cancelled'
    });
  }
}

function getDashboardConfig(user, projects, internships, people, notifications, courses, invitations) {
  const unread = notifications.filter((n) => !n.read && (n.email ? n.email === user.email : (n.role === user.role || user.role === 'Administrator'))).length;
  const ownedProjects = projects.filter((p) => p.creator === user.fullName);
  const activeOwnedProjects = ownedProjects.filter((project) => projectInstructorState(project, invitations).key === 'active');
  const pendingOwnedProjects = ownedProjects.filter((project) => ['pending', 'needs-instructor'].includes(projectInstructorState(project, invitations).key));
  const profile = people.find((person) => person.email === user.email);
  const portfolioPieces = user.role === 'Student'
    ? [profile?.major, (profile?.skills || []).length, profile?.linkedIn, activeOwnedProjects.length]
    : [];
  const portfolioCompletion = user.role === 'Student'
    ? `${Math.round((portfolioPieces.filter(Boolean).length / portfolioPieces.length) * 100)}%`
    : '100%';
  const myInternships = internships.filter((internship) => internship.employerEmail === user.email);
  const myApplications = internships.reduce((count, internship) => count + internship.applications.filter((application) => application.email === user.email).length, 0);
  const myInstructorInvitations = invitations.filter((invite) => invite.role === 'Course Instructor' && invite.email === user.email && invite.status === 'No reply');
  const linkedCourses = courses.filter((course) => courseInstructorEmails(course, people).includes(user.email)).length;
  const instructorProjects = projects.filter((project) => {
    const course = courses.find((item) => item.name === project.course);
    const linkedToInstructor = courseInstructorEmails(course, people).includes(user.email) || (project.instructorInvites || []).includes(user.fullName) || project.instructor === user.fullName;
    const hasMyFeedback = (project.reviews || []).some((review) => review.instructorEmail === user.email);
    return project.active && linkedToInstructor && !hasMyFeedback;
  }).length;
  const configs = {
    Student: {
      eyebrow: 'STUDENT PORTFOLIO WORKSPACE',
      title: 'Build, publish and manage your academic portfolio.',
      text: 'Create projects, choose public visibility, manage thesis drafts, invite collaborators and instructors, track tasks, apply for internships and follow feedback.',
      primaryPage: 'projects',
      primaryAction: 'Manage Projects',
      secondaryPage: 'workspace',
      secondaryAction: 'Open Project Workspace',
      stats: [
        ['Active Projects', activeOwnedProjects.length, 'folder_open'],
        ['Pending Invitations', pendingOwnedProjects.length, 'outgoing_mail'],
        ['Internship Applications', myApplications, 'business_center'],
        ['Portfolio Completion', portfolioCompletion, 'verified']
      ],
      workspaceTitle: 'Student Tools',
      workspaceText: 'Only student-owned project, thesis, collaborator, task, internship and appeal workflows are shown here.',
      tiles: [
        { icon: 'folder_open', badge: 'Student', title: 'Project Portfolio', text: 'Create, edit, delete and choose visible projects.', page: 'projects' },
        { icon: 'star', badge: 'Student', title: 'Favorites', text: 'Keep a shortlist of saved projects and portfolios.', page: 'favorites' },
        { icon: 'mark_email_unread', badge: 'Student', title: 'Invitations', text: 'Accept, reject and track invitations across projects.', page: 'invitations' },
        { icon: 'groups', badge: 'Student', title: 'Project Workspace', text: 'Enter one selected project and manage only its work.', page: 'workspace' },
        { icon: 'bar_chart', badge: 'Student', title: 'Statistics', text: 'Review project, language and collaborator analytics.', page: 'statistics' }
      ],
      listTitle: 'Recommended Projects',
      listAction: 'Explore Projects',
      listPage: 'discovery'
    },
    'Course Instructor': {
      eyebrow: 'INSTRUCTOR REVIEW WORKSPACE',
      title: 'Guide projects through course links, invitations and feedback.',
      text: 'Maintain instructor profile details, link teaching courses, respond to project invitations, add feedback and ratings, and flag projects that violate university rules.',
      primaryPage: 'instructors',
      primaryAction: 'Manage Course Links',
      secondaryPage: 'invitations',
      secondaryAction: 'Review Invitations',
      stats: [
        ['Linked Courses', linkedCourses, 'link'],
        ['Projects to Review', instructorProjects, 'rate_review'],
        ['Invitations', myInstructorInvitations.length, 'outgoing_mail'],
        ['Unread Alerts', unread, 'notifications']
      ],
      workspaceTitle: 'Instructor Tools',
      workspaceText: 'Instructor-only actions are separated from student project creation and employer hiring flows.',
      tiles: [
        { icon: 'school', badge: 'Instructor', title: 'Course Linking', text: 'Request admin approval for course links.', page: 'profile' },
        { icon: 'inventory_2', badge: 'Instructor', title: 'Project Inventory', text: 'View all courses and public/private projects.', page: 'inventory' },
        { icon: 'gavel', badge: 'Instructor', title: 'Flagging', text: 'Flag inappropriate projects with reasons.', page: 'moderation' }
      ],
      listTitle: 'Projects Awaiting Feedback',
      listAction: 'Discover Projects',
      listPage: 'discovery'
    },
    Employer: {
      eyebrow: 'EMPLOYER TALENT WORKSPACE',
      title: 'Discover portfolios and manage internships from one place.',
      text: 'Maintain company profile data, publish internships, archive passed openings, review student applications, save favorite talent and send private messages.',
      primaryPage: 'internships',
      primaryAction: 'Manage Internships',
      secondaryPage: 'discovery',
      secondaryAction: 'Find Talent',
      stats: [
        ['My Internships', myInternships.length, 'business_center'],
        ['Applications', myInternships.reduce((sum, item) => sum + item.applications.length, 0), 'group'],
        ['Portfolios', people.filter((p) => p.role === 'Student').length, 'badge'],
        ['Unread Alerts', unread, 'notifications']
      ],
      workspaceTitle: 'Employer Tools',
      workspaceText: 'Employer actions focus on company verification, internship management, applicants, favorites and messaging.',
      tiles: [
        { icon: 'business_center', badge: 'Employer', title: 'Openings', text: 'Create, edit, archive and update internship status.', page: 'internships' },
        { icon: 'travel_explore', badge: 'Employer', title: 'Talent Discovery', text: 'Search portfolios and save favorite projects.', page: 'discovery' },
        { icon: 'star', badge: 'Employer', title: 'Favorites', text: 'Review saved projects and portfolios in one shortlist.', page: 'favorites' },
        { icon: 'bar_chart', badge: 'Employer', title: 'Statistics', text: 'Track interns and openings over time.', page: 'statistics' }
      ],
      listTitle: 'Recommended Talent Projects',
      listAction: 'Search Portfolios',
      listPage: 'discovery'
    },
    Administrator: {
      eyebrow: 'ADMINISTRATOR CONTROL WORKSPACE',
      title: 'Govern users, courses, companies and platform integrity.',
      text: 'Manage users, create admin accounts, review requests, manage courses, moderate flagged projects and inspect platform usage.',
      primaryPage: 'admin',
      primaryAction: 'Open User Management',
      secondaryPage: 'requests',
      secondaryAction: 'Review Requests',
      stats: [
        ['Users', people.length, 'group'],
        ['Projects', projects.length, 'folder_open'],
        ['Courses', courses.length, 'menu_book'],
        ['Unread Alerts', unread, 'notifications']
      ],
      workspaceTitle: 'Administrator Tools',
      workspaceText: 'Admin-only functionality is isolated from student, employer and instructor workspaces.',
      tiles: [
        { icon: 'admin_panel_settings', badge: 'Administrator', title: 'User Management', text: 'Create admins and activate or deactivate accounts.', page: 'admin' },
        { icon: 'fact_check', badge: 'Administrator', title: 'Requests', text: 'Accept or reject companies and instructor link requests.', page: 'requests' },
        { icon: 'inventory_2', badge: 'Administrator', title: 'Courses & Projects', text: 'Create courses and review project inventory.', page: 'inventory' },
        { icon: 'bar_chart', badge: 'Administrator', title: 'Statistics', text: 'Review platform totals and usage.', page: 'statistics' }
      ],
      listTitle: 'Platform Project Inventory',
      listAction: 'Review Discovery',
      listPage: 'inventory'
    }
  };
  return configs[user.role] || configs.Student;
}

function getRoleNav(role) {
      const shared = [
    ['dashboard', 'dashboard', 'Home'],
    ['profile', 'account_circle', 'Portfolio'],
    ['discovery', 'travel_explore', 'Discovery'],
    ['instructors', 'school', 'Instructors']
  ];
  const byRole = {
    Student: [
      ['projects', 'folder_open', 'My Projects'],
      ['workspace', 'groups', 'Project Workspace'],
      ['invitations', 'mark_email_unread', 'Invitations'],
      ['favorites', 'star', 'Favorites'],
      ['internships', 'business_center', 'Internships'],
      ['statistics', 'bar_chart', 'Statistics'],
      ['moderation', 'gavel', 'Appeals']
    ],
    'Course Instructor': [
      ['invitations', 'mark_email_unread', 'Invitations & Feedback'],
      ['inventory', 'inventory_2', 'My Courses & Projects'],
      ['moderation', 'gavel', 'Flag Projects']
    ],
    Employer: [
      ['internships', 'business_center', 'Internships'],
      ['favorites', 'star', 'Favorites'],
      ['statistics', 'bar_chart', 'Statistics']
    ],
    Administrator: [
      ['admin', 'admin_panel_settings', 'User Management'],
      ['requests', 'rule', 'Requests'],
      ['inventory', 'inventory_2', 'Courses & Projects'],
      ['moderation', 'gavel', 'Moderation'],
      ['statistics', 'bar_chart', 'Statistics']
    ]
  };
  const extra = byRole[role] || [];
  return [...shared, ...extra];
}

function getAllowedPages(role) {
  const hiddenByRole = {
    Student: ['notifications', 'messages', 'settings'],
    'Course Instructor': ['notifications', 'messages', 'settings'],
    Employer: ['notifications', 'messages', 'settings'],
    Administrator: ['notifications']
  };
  return Array.from(new Set([...getRoleNav(role).map(([key]) => key), ...(hiddenByRole[role] || [])]));
}

createRoot(document.getElementById('root')).render(<App />);
