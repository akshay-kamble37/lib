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
    name: 'IEEE IEL Online',
    category: 'Engineering Database',
    description:
      'IEEE IEL Online provides access to IEEE journals, conference papers, standards and technical research resources.',
    detailedDescription:
      'IEEE IEL Online is a digital research resource providing access to scholarly and technical content in engineering, technology and related fields.',
    features: [
      'IEEE journals',
      'Conference papers',
      'Technical standards',
      'Engineering research'
    ],
    audience:
      'Engineering students, faculty members and researchers',
    accessInfo:
      'Access IEEE IEL Online through the official IEEE Xplore platform.',
    itemCount: 464,
    itemLabel: 'E-Journals',
    url: 'https://ieeexplore.ieee.org'
  },

  {
    id: 'r2',
    name: 'ASME',
    category: 'Engineering Database',
    description:
      'ASME Digital Collection provides journals, conference proceedings and technical publications in mechanical engineering.',
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
      'Access the ASME Digital Collection through the official ASME platform.',
    itemCount: 22,
    itemLabel: 'E-Journals',
    url: 'https://asmedigitalcollection.asme.org'
  },

  {
    id: 'r3',
    name: 'ASCE',
    category: 'Engineering Database',
    description:
      'ASCE Library provides civil engineering journals, proceedings and technical research publications.',
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
      'Access the ASCE Library through the official ASCE platform.',
    itemCount: 30,
    itemLabel: 'E-Journals',
    url: 'https://ascelibrary.org'
  },

  {
    id: 'r4',
    name: 'Elsevier (ScienceDirect)',
    category: 'Academic Database',
    description:
      'ScienceDirect provides research articles, journals and books across engineering, science and related disciplines.',
    detailedDescription:
      'ScienceDirect is an academic research platform providing access to scholarly articles, journals, books and book chapters across a wide range of disciplines.',
    features: [
      'Research articles',
      'Academic journals',
      'Books and book chapters',
      'Multidisciplinary research'
    ],
    audience:
      'Students, faculty members and researchers across disciplines',
    accessInfo:
      'Access ScienceDirect through the official Elsevier platform.',
    itemCount: 252,
    itemLabel: 'E-Journals',
    url: 'https://www.sciencedirect.com'
  },

  {
    id: 'r5',
    name: 'ACM Digital Library',
    category: 'Computing Database',
    description:
      'ACM Digital Library provides computing and information technology research publications.',
    detailedDescription:
      'The ACM Digital Library provides access to research literature and technical publications covering computing, computer science and information technology.',
    features: [
      'Computer science journals',
      'Conference proceedings',
      'Technical articles',
      'Computing research'
    ],
    audience:
      'Computer science students, faculty members and researchers',
    accessInfo:
      'Access the ACM Digital Library through the official ACM platform.',
    itemCount: 44,
    itemLabel: 'E-Journals',
    url: 'https://dl.acm.org'
  },

  {
    id: 'r6',
    name: 'Springer Link',
    category: 'Academic Database',
    description:
      'SpringerLink provides access to scholarly journals, books and research publications across disciplines.',
    detailedDescription:
      'SpringerLink is an academic platform providing access to journals, books, reference works and research publications across science, technology, engineering and other disciplines.',
    features: [
      'Academic journals',
      'Research articles',
      'E-books',
      'Scientific publications'
    ],
    audience:
      'Students, faculty members and researchers',
    accessInfo:
      'Access SpringerLink through the official Springer Nature platform.',
    itemCount: 586,
    itemLabel: 'E-Journals',
    url: 'https://link.springer.com'
  },

  {
    id: 'r7',
    name: 'IEEE Wiley E-Books',
    category: 'E-Books',
    description:
      'IEEE and Wiley engineering and technology e-books for academic learning and research.',
    detailedDescription:
      'The IEEE Wiley eBooks collection provides digital books covering engineering, technology and related academic subjects for students, faculty members and researchers.',
    features: [
      'Engineering e-books',
      'Technology books',
      'Academic reference material',
      'Research-oriented books'
    ],
    audience:
      'Engineering students, faculty members and researchers',
    accessInfo:
      'Access the IEEE Wiley eBook collection through the official IEEE Xplore platform.',
    itemCount: 550,
    itemLabel: 'E-Books',
    url: 'https://ieeexplore.ieee.org'
  },

  {
    id: 'r8',
    name: 'Springer E-Books',
    category: 'E-Books',
    description:
      'Springer e-books covering engineering, science, technology and other academic disciplines.',
    detailedDescription:
      'Springer eBooks provide digital access to academic books and reference material across science, engineering, technology and related disciplines.',
    features: [
      'Engineering e-books',
      'Science e-books',
      'Technology publications',
      'Academic reference books'
    ],
    audience:
      'Students, faculty members and researchers',
    accessInfo:
      'Access Springer eBooks through the official Springer Nature platform.',
    itemCount: 2080,
    itemLabel: 'E-Books',
    url: 'https://link.springer.com'
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