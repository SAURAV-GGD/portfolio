export const skills = {
  'AI & Machine Learning': [
    'Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI',
    'Claude API', 'Prompt Engineering', 'Gemini API',
    'Vertex AI', 'Encoder-Decoder Arch',
  ],
  'Web & Frontend': [
    'HTML / CSS', 'JavaScript', 'React', 'Tailwind CSS',
    'Vite', 'Node.js',
  ],
  'Cloud & DevOps': [
    'Google Cloud', 'AWS', 'Solutions Architecture',
    'Vertex AI', 'Cloud Skills',
  ],
  'Automation & Tools': [
    'Selenium', 'Git & GitHub', 'Claude Code',
    'VS Code', 'Cursor IDE',
  ],
  'Data & Analytics': [
    'Pandas', 'Excel', 'Data Visualization',
    'SQL', 'Forensic Technology',
  ],
  'Low-Level & Backend': [
    'C++', 'Java', 'Spring Framework',
    'Apache Kafka', 'Message Queue', 'Build Tools',
  ],
  'Blockchain & Web3': [
    'Blockchain Concepts', 'Decentralized Storage',
    'Smart Contracts (basics)',
  ],
}

export const projects = [
  {
    id: '01',
    name: 'Finger Mouse',
    desc: 'Real-time gesture-controlled virtual touchpad via webcam — supports cursor control, left/right click, drag & drop, and scroll. Zero hardware needed.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI'],
    github: 'https://github.com/Godgiftedevil/Finger-Mouse',
    accent: '#c8ff57',
    featured: true,
  },
  {
    id: '02',
    name: 'BlockShare',
    desc: 'Blockchain-based decentralized file sharing demo. Files stored without a central authority — built for a college presentation on Web3.',
    tags: ['Blockchain', 'Web3', 'Python', 'Decentralized'],
    github: 'https://github.com/Godgiftedevil',
    accent: '#00d4ff',
    featured: false,
  },
  {
    id: '03',
    name: 'CampusMart',
    desc: 'Hyperlocal quick-commerce delivery platform targeting Arya College students. Flat delivery fee model with UPI-based payments — built AI-first.',
    tags: ['React', 'Node.js', 'UPI Payments', 'Full Stack'],
    github: 'https://github.com/Godgiftedevil',
    accent: '#ff2d78',
    featured: true,
  },
  {
    id: '04',
    name: 'WhatsApp Automator',
    desc: 'Group automation tool using Selenium — handles message scheduling, bulk messaging, and group management. Saves hours of manual work.',
    tags: ['Python', 'Selenium', 'Automation', 'Browser Control'],
    github: 'https://github.com/Godgiftedevil',
    accent: '#bf7aff',
    featured: false,
  },
]

export const certifications = [
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia',
    via: 'Forage',
    date: 'Mar 2026',
    tasks: ['Data Analysis', 'Forensic Technology', 'Business Insights'],
    accent: '#00d4ff',
    badge: 'DLT',
  },
  {
    title: 'Solutions Architecture Job Simulation',
    issuer: 'Amazon Web Services',
    via: 'Forage',
    date: 'Dec 2024',
    tasks: ['Cloud Architecture', 'AWS Services', 'System Design'],
    accent: '#ff9500',
    badge: 'AWS',
  },
  {
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase',
    via: 'Forage',
    date: '2024',
    tasks: ['Apache Kafka', 'Spring Framework', 'Java', 'SQL', 'Build Tools'],
    accent: '#c8ff57',
    badge: 'JPM',
  },
  {
    title: 'Build Real World AI Apps with Gemini & Imagen',
    issuer: 'Google Cloud',
    via: 'Cloud Skills Boost',
    date: 'Apr 2025',
    tasks: ['Gemini API', 'Imagen', 'Generative AI', 'ML & AI'],
    accent: '#34a853',
    badge: 'GCP',
  },
  {
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    via: 'Cloud Skills Boost',
    date: 'Apr 2025',
    tasks: ['Vertex AI', 'Prompt Engineering', 'Generative AI'],
    accent: '#fbbc04',
    badge: 'GCP',
  },
  {
    title: 'Encoder-Decoder Architecture',
    issuer: 'Google Cloud',
    via: 'Cloud Skills Boost',
    date: 'Sep 2024',
    tasks: ['Neural Networks', 'Deep Learning', 'ML Architecture'],
    accent: '#4285f4',
    badge: 'GCP',
  },
  {
    title: 'AI for You: Training and Assessment',
    issuer: 'Oracle',
    via: 'Oracle MyLearn',
    date: '2024',
    tasks: ['AI Fundamentals', 'Practical AI', 'AI Strategy'],
    accent: '#ea4335',
    badge: 'ORA',
  },
  {
    title: 'C++ Programming Internship',
    issuer: 'Intern Certify',
    via: 'The Website Makers',
    date: 'Jun – Aug 2024',
    tasks: ['C++', 'OOP', 'Data Structures', 'Programming Fundamentals'],
    accent: '#bf7aff',
    badge: 'C++',
  },
]

export const experience = [
  {
    date: '2024 – Present',
    role: 'Data Analytics Intern',
    company: 'Codveda Technologies',
    accent: '#c8ff57',
    points: [
      'Performed data cleaning, analysis & visualization on real-world datasets',
      'Delivered actionable business insights using Python and Excel',
      'Collaborated on analytics pipelines for data-driven decision making',
    ],
  },
  {
    date: 'Jun 2025 – Mar 2026',
    role: 'Data Analytics Job Simulation',
    company: 'Deloitte Australia · Forage',
    accent: '#00d4ff',
    points: [
      'Completed practical tasks in data analysis and forensic technology',
      'Generated structured business insights for stakeholder reporting',
      'Certified by Chief Human Resources Officer, Deloitte',
    ],
  },
  {
    date: 'Dec 2024',
    role: 'Solutions Architecture Simulation',
    company: 'Amazon Web Services · Forage',
    accent: '#ff9500',
    points: [
      'Designed cloud architecture solutions for real-world business scenarios',
      'Worked with core AWS services and system design principles',
    ],
  },
  {
    date: 'Jun – Aug 2024',
    role: 'C++ Programming Intern',
    company: 'Intern Certify (AICTE Recognized)',
    accent: '#bf7aff',
    points: [
      'Completed 2-month hands-on C++ programming internship',
      'Practiced OOP, data structures & algorithm design',
    ],
  },
  {
    date: '2023 – Present',
    role: 'Event Coordinator & Junior Mentor',
    company: 'Arya College of Engineering, Jaipur',
    accent: '#ff2d78',
    points: [
      'Organized and led multiple technical & cultural college events',
      'Mentored juniors in Python, AI tools & project development',
      'Represented college in inter-college weightlifting competitions 🏋️',
    ],
  },
]
