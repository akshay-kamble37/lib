export const departments = [
  ['electronics', 'Electronics', 'ECE'],
  ['textile', 'Textile', 'TX'],
  ['civil', 'Civil', 'CE'],
  ['electrical', 'Electrical', 'EE'],
  ['instrumentation', 'Instrumentation', 'IE'],
  ['production', 'Production', 'PE'],
  ['chemical', 'Chemical', 'CH'],
  ['mechanical', 'Mechanical', 'ME'],
  ['information-technology', 'Information Technology', 'IT'],
  ['computer-science', 'Computer Science & Engineering', 'CSE']
].map(([slug, name, short]) => ({
  slug,
  name,
  short,
  description: `Academic resources, question papers and learning material for ${name}.`,
  image: '/images/campus.webp'
}));

export const years = [
  'First',
  'Second',
  'Third',
  'Fourth'
];

export const semesters = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII'
];

export const defaultBooks = [
  {
    id: 'b1',
    title: 'Data Structures Using C',
    author: 'Reema Thareja',
    department: 'Computer Science & Engineering',
    year: 2024,
    isbn: '9780199478504',
    copies: 5,
    available: 3,
    rack: 'CS-12',
    shelf: '03',
    description:
      'A practical introduction to data structures, algorithms and implementation using C.'
  },
  {
    id: 'b2',
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    department: 'Computer Science & Engineering',
    year: 2023,
    isbn: '9781119456339',
    copies: 4,
    available: 2,
    rack: 'CS-08',
    shelf: '02',
    description:
      'Core operating-system concepts with examples and modern system design.'
  },
  {
    id: 'b3',
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    department: 'Computer Science & Engineering',
    year: 2022,
    isbn: '9780078022159',
    copies: 4,
    available: 1,
    rack: 'CS-15',
    shelf: '01',
    description:
      'Foundations of database architecture, SQL, transactions and storage.'
  },
  {
    id: 'b4',
    title: 'Engineering Mechanics',
    author: 'S. Timoshenko',
    department: 'Mechanical',
    year: 2021,
    isbn: '9780070700044',
    copies: 6,
    available: 4,
    rack: 'ME-07',
    shelf: '02',
    description:
      'Fundamental mechanics concepts for engineering students.'
  },
  {
    id: 'b5',
    title: 'Signals and Systems',
    author: 'Alan V. Oppenheim',
    department: 'Electronics',
    year: 2022,
    isbn: '9780138147570',
    copies: 5,
    available: 2,
    rack: 'EC-09',
    shelf: '01',
    description:
      'Signals, systems, transforms and continuous/discrete-time analysis.'
  },
  {
    id: 'b6',
    title: 'Power System Analysis',
    author: 'Hadi Saadat',
    department: 'Electrical',
    year: 2022,
    isbn: '9780073404559',
    copies: 3,
    available: 1,
    rack: 'EE-10',
    shelf: '04',
    description:
      'Power-system modeling, analysis and operation.'
  },
  {
    id: 'b7',
    title: 'Structural Analysis',
    author: 'R.C. Hibbeler',
    department: 'Civil',
    year: 2022,
    isbn: '9780134610672',
    copies: 4,
    available: 2,
    rack: 'CE-05',
    shelf: '01',
    description:
      'Analysis of trusses, beams, frames and structural systems.'
  }
];

export const defaultResources = [
  {
    id: 'r1',
    name: 'IEEE Xplore',
    category: 'Engineering Database',
    description:
      'IEEE journals, conference papers and standards.',
    detailedDescription:
      'IEEE Xplore is a digital research platform providing access to scholarly literature and technical information in engineering, technology and related fields.',
    features: [
      'IEEE journals',
      'Conference papers',
      'Technical standards',
      'Engineering research'
    ],
    audience:
      'Engineering students, faculty members and researchers',
    accessInfo:
      'Visit the official IEEE Xplore platform to explore available academic and technical resources.',
    url: 'https://ieeexplore.ieee.org'
  },

  {
    id: 'r2',
    name: 'ASME Digital Collection',
    category: 'Engineering Database',
    description:
      'Journals, proceedings and technical content from ASME.',
    detailedDescription:
      'ASME Digital Collection provides access to scholarly journals, conference proceedings and technical publications covering mechanical engineering and related engineering disciplines.',
    features: [
      'ASME journals',
      'Conference proceedings',
      'Technical publications',
      'Mechanical engineering research'
    ],
    audience:
      'Mechanical engineering students, faculty members and researchers',
    accessInfo:
      'Visit the official ASME Digital Collection platform to access its available academic content.',
    url: 'https://asmedigitalcollection.asme.org'
  },

  {
    id: 'r3',
    name: 'ASCE Library',
    category: 'Engineering Database',
    description:
      'Civil engineering journals, proceedings and research.',
    detailedDescription:
      'ASCE Library provides access to scholarly publications and technical research related to civil engineering and the built environment.',
    features: [
      'Civil engineering journals',
      'Conference proceedings',
      'Technical papers',
      'Engineering research'
    ],
    audience:
      'Civil engineering students, faculty members and researchers',
    accessInfo:
      'Visit the official ASCE Library platform to explore its available publications and research resources.',
    url: 'https://ascelibrary.org'
  },

  {
    id: 'r4',
    name: 'ScienceDirect',
    category: 'Academic Database',
    description:
      'Research articles, journals and books across disciplines.',
    detailedDescription:
      'ScienceDirect provides access to a broad collection of academic research articles, journals and books covering engineering, science and other academic disciplines.',
    features: [
      'Research articles',
      'Academic journals',
      'Books and book chapters',
      'Multidisciplinary research'
    ],
    audience:
      'Students, faculty members and researchers across disciplines',
    accessInfo:
      'Visit the official ScienceDirect platform to search and explore available academic content.',
    url: 'https://www.sciencedirect.com'
  },

  {
    id: 'r5',
    name: 'NDLI',
    category: 'Discovery',
    description:
      'National Digital Library of India discovery platform.',
    detailedDescription:
      'The National Digital Library of India is a digital discovery platform that brings together learning and academic resources from different sources.',
    features: [
      'Digital learning resources',
      'Academic content discovery',
      'Multidisciplinary resources',
      'Educational materials'
    ],
    audience:
      'Students, teachers, researchers and academic users',
    accessInfo:
      'Visit the official NDLI platform to discover available digital learning and research resources.',
    url: 'https://ndl.iitkgp.ac.in'
  },

  {
    id: 'r6',
    name: 'DELNET',
    category: 'Discovery',
    description:
      'Union catalogue and resource sharing services.',
    detailedDescription:
      'DELNET supports resource discovery and sharing through a network of libraries and provides access to bibliographic information and library resources.',
    features: [
      'Union catalogues',
      'Resource discovery',
      'Library resource sharing',
      'Bibliographic databases'
    ],
    audience:
      'Students, faculty members, researchers and library users',
    accessInfo:
      'Visit the official DELNET platform to explore available library discovery and resource-sharing services.',
    url: 'https://delnet.in'
  }
];

export const defaultPapers = [
  {
    id: 'p1',
    programme: 'B.Tech',
    subject: 'Data Structures',
    department: 'Computer Science & Engineering',
    academicYear: '2025-26',
    year: 'Third',
    semester: 'V',
    exam: 'End Semester',
    pdf: '/question-papers/computer-science/2025-26/third/v/data-structures.pdf'
  },
  {
    id: 'p2',
    programme: 'B.Tech',
    subject: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    academicYear: '2025-26',
    year: 'Third',
    semester: 'V',
    exam: 'End Semester',
    pdf: '/question-papers/computer-science/2025-26/third/v/dbms.pdf'
  },
  {
    id: 'p3',
    programme: 'B.Tech',
    subject: 'Engineering Mechanics',
    department: 'Mechanical',
    academicYear: '2024-25',
    year: 'First',
    semester: 'I',
    exam: 'End Semester',
    pdf: '/question-papers/mechanical/2024-25/first/i/engineering-mechanics.pdf'
  },
  {
    id: 'p4',
    programme: 'M.Tech',
    subject: 'Advanced Digital Signal Processing',
    department: 'Electronics',
    academicYear: '2025-26',
    year: 'First',
    semester: 'I',
    exam: 'End Semester',
    pdf: '/question-papers/electronics/2025-26/first/i/adsp.pdf'
  }
];

export const defaultPublications = [
  {
    id: 'pub1',
    title: 'Advances in Sustainable Engineering',
    author: 'Institute Faculty',
    department: 'Chemical',
    year: 2025,
    publisher: 'Academic Press',
    description:
      'A faculty-authored volume exploring sustainable engineering practices.',
    cover: '/images/bookshelves.jpg'
  },
  {
    id: 'pub2',
    title: 'Modern Embedded Systems',
    author: 'Institute Faculty',
    department: 'Electronics',
    year: 2024,
    publisher: 'Tech Knowledge Press',
    description:
      'Contemporary embedded systems concepts and applications.',
    cover: '/images/library-room.jpg'
  },
  {
    id: 'pub3',
    title: 'Applied Manufacturing Systems',
    author: 'Institute Faculty',
    department: 'Production',
    year: 2024,
    publisher: 'Engineering Publications',
    description:
      'Applied methods for modern production and manufacturing systems.',
    cover: '/images/study-space.jpg'
  }
];

export const defaultAnnouncements = [
  {
    id: 'a1',
    title: 'B.Tech & M.Tech Question Paper Archive Updated',
    text:
      'Previous-year examination papers are now organized by programme, department, year and semester.',
    date: '08 Sep 2026',
    tag: 'Academic',
    image: '/images/library-reading.jpg',
    pinned: true
  },
  {
    id: 'a2',
    title: 'Reading Hall Timings',
    text:
      'The reading hall is available from 09:30 AM to 10:00 PM.',
    date: '05 Sep 2026',
    tag: 'Library',
    image: '/images/reading-corner.webp',
    pinned: false
  },
  {
    id: 'a3',
    title: 'Institute Faculty Publications',
    text:
      'Explore books and scholarly works published by Shri Guru Gobind Singhji Institute faculty members.',
    date: '01 Sep 2026',
    tag: 'Publication',
    image: '/images/bookshelves.jpg',
    pinned: false
  }
];

export const defaultSite = {
  heroTitle: 'Knowledge. Discovery. Innovation.',
  heroSubtitle:
    'The Central Library of Shri Guru Gobind Singhji Institute of Engineering & Technology, Vishnupuri, Nanded is a modern academic gateway for books, digital resources, examination archives and faculty publications.',
  heroImage: '/images/library-hero.webp',
  logo: '/images/sggs-logo.jpeg',
  video: '/library-tour.mp4',
  contactPhone: '02462 269234',
  contactEmail: 'library@sggs.ac.in',
  address:
    'Shri Guru Gobind Singhji Institute of Engineering & Technology, Vishnupuri, Nanded, Maharashtra 431606',
  about:
    'The Central Library supports teaching, learning and research by connecting the institute community with curated print and digital knowledge resources.'
};

export const defaultUsers = [
  {
    id: 'u1',
    name: 'Library Admin',
    email: 'library@sggs.ac.in',
    role: 'admin'
  }
];