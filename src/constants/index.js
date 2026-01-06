import {
  astroPixel,
  backend,
  code,
  concepts,
  coursera,
  cp,
  creator,
  designs,
  fcc,
  hr,
  ideas,
  malariadetectionsystem,
  mobile,
  novalearn,
  ponggame,
  portfolio,
  web,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "achievement",
    title: "Achievement",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Development",
    icon: web,
  },
  {
    title: "Backend Development",
    icon: mobile,
  },
  {
    title: "Database Management",
    icon: backend,
  },
  {
    title: "Cloud & DevOps",
    icon: creator,
  },
];

const achievements = [
  {
    title: ["FreeCodeCamp"],
    company_name: "freeCodeCamp",
    icon: fcc,
    iconBg: "#383E56",
    date: "May 2024",
    points: ["Responsive Web Design", "JavaScript"],
    credential: [
      "https://freecodecamp.org/certification/Jayant-1/responsive-web-design",
      "https://freecodecamp.org/certification/Jayant-1/responsive-web-design",
    ],
  },
  {
    title: ["HackerRank"],
    company_name: "HackerRank",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "Apr 2025",
    points: [
      "Python (Basic) Certificate",
      "SQL (Basic) Certificate",
      "CSS (Basic) Certificate",
      "Go (Basic) Certificate",
    ],
    credential: [
      "https://www.hackerrank.com/certificates/b011ba865ccf",
      "https://www.hackerrank.com/certificates/633d92ea00fe",
      "https://www.hackerrank.com/certificates/c9bfa3c0b9e7",
      "https://www.hackerrank.com/certificates/b5ee5bc85229",
    ],
  },
  {
    title: ["Certiport"],
    company_name: "Certiport",
    icon: cp,
    iconBg: "#383E56",
    date: "Apr 2025",
    points: ["IT Specialist - HTML and CSS", "IT Specialist - Databases"],
    credential: [
      "https://www.credly.com/badges/c59ff7d1-7af2-4dcb-8c57-d2bd6a6d1f44/linked_in_profile",
      "https://www.credly.com/badges/61128af2-38bc-4299-b862-157ba2ca2edb/linked_in_profile",
    ],
  },
  {
    title: ["Coursera"],
    company_name: "Coursera",
    icon: coursera,
    iconBg: "#0056d2",
    date: "Jul 2025",
    points: ["IBM Full Stack Software Developer"],
    credential: ["https://coursera.org/verify/professional-cert/8R7RY7URFI6O"],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Jayant proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Jayant does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Jayant boosted our website traffic by 50% through his smart optimization. We are Truly grateful!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "AstroPixel",
    description:
      "AstroPixel is a FastAPI + React platform for exploring NASA gigapixel imagery with buttery-smooth deep zoom, annotations, and secure user/admin workflows. It ingests GeoTIFF/PSB files, generates tile pyramids with GDAL, and serves them through an optimized viewer.",
    tags: [
      {
        name: "FastAPI",
        color: "blue-text-gradient",
      },
      {
        name: "GDAL",
        color: "green-text-gradient",
      },
      {
        name: "OpenSeadragon",
        color: "pink-text-gradient",
      },
      {
        name: "Cloudflare R2",
        color: "violet-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "orange-text-gradient",
      },
    ],
    image: astroPixel,
    images: [astroPixel], // Multiple screenshot support
    source_code_link: "https://github.com/Jayant-1/AstroPixel",
    live_demo_link: "https://astro-pixel.vercel.app/",
    metrics: {
      stars: 152,
      forks: 42,
      views: "2.3K",
    },
    features: [
      "Deep zoom functionality for gigapixel imagery",
      "Secure user authentication and admin workflows",
      "Annotation system for collaborative marking",
      "GeoTIFF and PSB file ingestion",
      "Cloudflare R2 integration for scalable storage",
      "PostgreSQL database for persistent data",
    ],
  },
  {
    name: "Malaria Detection System",
    description:
      "AI-powered malaria detection system for hospitals with patient management, PDF report generation, and real-time analytics. Built with React, Supabase & FastAPI.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "FastAPI",
        color: "pink-text-gradient",
      },
      {
        name: "Keras",
        color: "violet-text-gradient",
      },
    ],
    image: malariadetectionsystem,
    images: [malariadetectionsystem], // Multiple screenshot support
    source_code_link: "https://github.com/Jayant-1/MalariaDetectionSystem",
    live_demo_link: "https://malaria-detection-system.vercel.app/",
    metrics: {
      stars: 89,
      forks: 28,
      views: "1.8K",
    },
    features: [
      "AI-powered malaria cell detection using Keras",
      "Patient management system",
      "Automated PDF report generation",
      "Real-time analytics dashboard",
      "Hospital workflow integration",
      "Secure data storage with Supabase",
    ],
  },
  {
    name: "3D Portfolio",
    description:
      "A dynamic React JS portfolio with immersive 3D graphics and smooth animations for an engaging user experience. Includes interactive sections like About, Education, Projects, Connect, and Contact. 🎨💻",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "framer-motion",
        color: "pink-text-gradient",
      },
      {
        name: "three.js",
        color: "orange-text-gradient",
      },
      {
        name: "spline",
        color: "violet-text-gradient",
      },
    ],
    image: portfolio,
    images: [portfolio], // Multiple screenshot support
    source_code_link: "https://github.com/Jayant-1/3D-Portfolio",
    live_demo_link: "https://jayant-1.vercel.app/",
    metrics: {
      stars: 234,
      forks: 67,
      views: "5.2K",
    },
    features: [
      "Immersive 3D graphics with Three.js",
      "Smooth scroll animations with Framer Motion",
      "Interactive 3D models and environments",
      "Responsive design across all devices",
      "Easter eggs and interactive elements",
      "Custom elastic cursor with physics",
    ],
  },
  {
    name: "Nova-Learn",
    description:
      "NovaLearn is an AI-powered platform that creates personalized learning paths with interactive content and quizzes. Designed with a futuristic 3D UI, it makes learning immersive, efficient, and goal-driven. 🚀",
    tags: [
      {
        name: "node",
        color: "blue-text-gradient",
      },
      {
        name: "spline",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
      {
        name: "Flask",
        color: "violet-text-gradient",
      },
      {
        name: "sqlite3",
        color: "orange-text-gradient",
      },
    ],
    image: novalearn,
    images: [novalearn], // Multiple screenshot support
    source_code_link: "https://github.com/Jayant-1/Nova-Learn",
    live_demo_link: "https://nova-learn-jayant.vercel.app/",
    metrics: {
      stars: 127,
      forks: 35,
      views: "3.1K",
    },
    features: [
      "Personalized learning path generation",
      "Interactive 3D user interface",
      "Dynamic quiz generation",
      "Progress tracking and analytics",
      "Futuristic design system",
      "Mobile-responsive learning experience",
    ],
  },
  {
    name: "Multiplayer Pong Game",
    description:
      "Multiplayer Pong Game with three modes: Play with a friend online, play side-by-side on the same screen, or challenge an AI opponent. Fast, fun, and competitive — classic Pong with modern multiplayer options! 🕹️🔥",
    tags: [
      {
        name: "socket",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: ponggame,
    images: [ponggame], // Multiple screenshot support
    source_code_link: "https://github.com/Jayant-1/Multiplayer_Pong_Game",
    live_demo_link: "https://multiplayer-pong-game-psi.vercel.app/",
    metrics: {
      stars: 76,
      forks: 19,
      views: "945",
    },
    features: [
      "Real-time multiplayer gameplay via WebSocket",
      "Three game modes (Online, Local, AI)",
      "Responsive controls and smooth physics",
      "Score tracking and leaderboards",
      "AI opponent with adjustable difficulty",
      "Low-latency networking with Express.js",
    ],
  },
];

const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  {
    text: "Concepts",
    imgPath: concepts,
    font: "'Courier New', Courier, monospace",
  },
  {
    text: "Designs",
    imgPath: designs,
    font: "'Times New Roman', Times, serif",
  },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  {
    text: "Ideas",
    imgPath: ideas,
    font: "'Comic Sans MS', cursive, sans-serif",
  },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];

export { achievements, projects, services, testimonials, words };
