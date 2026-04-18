// Skill names enum
export const SkillNames = {
  JS: "js",
  TS: "ts",
  HTML: "html",
  CSS: "css",
  REACT: "react",
  VUE: "vue",
  NEXTJS: "nextjs",
  TAILWIND: "tailwind",
  NODEJS: "nodejs",
  EXPRESS: "express",
  POSTGRES: "postgres",
  MONGODB: "mongodb",
  GIT: "git",
  GITHUB: "github",
  PRETTIER: "prettier",
  NPM: "npm",
  FIREBASE: "firebase",
  WORDPRESS: "wordpress",
  LINUX: "linux",
  DOCKER: "docker",
  NGINX: "nginx",
  AWS: "aws",
  VIM: "vim",
  VERCEL: "vercel",
};

// Skill type (for reference)
// id: number, name: string, label: string, shortDescription: string, color: string, icon: string

export const SKILLS = {
  js: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription:
      "A scripting language used to make web pages interactive and dynamic.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  ts: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "A superset of JavaScript that adds static typing and better tooling support.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  html: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription:
      "The standard markup language used to structure content on the web.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  css: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription:
      "A style sheet language used to describe the visual presentation of HTML elements.",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  react: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription:
      "A JavaScript library for building fast and reusable user interfaces using components.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  vue: {
    id: 6,
    name: "vue",
    label: "Vue",
    shortDescription:
      "A progressive JavaScript framework for building user interfaces with a simple and flexible API.",
    color: "#41b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  nextjs: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "A React-based framework for building full-stack web apps with server-side rendering and routing.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  tailwind: {
    id: 8,
    name: "tailwind",
    label: "Tailwind",
    shortDescription:
      "A utility-first CSS framework for rapidly building custom and responsive UI designs.",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  nodejs: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "A runtime environment that lets you run JavaScript on the server side.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  express: {
    id: 10,
    name: "express",
    label: "Express",
    shortDescription:
      "A minimal and flexible Node.js web application framework for creating APIs and backend services.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  postgres: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "A powerful open-source relational database system known for reliability and feature-richness.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  mongodb: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription:
      "A NoSQL database that stores data in flexible, JSON-like documents.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  git: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription:
      "A distributed version control system to track changes in source code during development.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  github: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription:
      "A platform to host, manage, and collaborate on code using Git.",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  prettier: {
    id: 15,
    name: "prettier",
    label: "Prettier",
    shortDescription:
      "A code formatter that automatically styles code to follow consistent rules.",
    color: "#f7b93a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
  },
  npm: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription:
      "The package manager for JavaScript, used to install libraries and manage project dependencies.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  firebase: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "A platform by Google offering backend services like authentication, database, and hosting.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  wordpress: {
    id: 18,
    name: "wordpress",
    label: "WordPress",
    shortDescription:
      "A content management system (CMS) used to build and manage websites easily.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  linux: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription:
      "An open-source operating system widely used in servers, development, and cloud environments.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  docker: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription:
      "A platform for developing, shipping, and running applications in isolated containers.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  nginx: {
    id: 21,
    name: "nginx",
    label: "NginX",
    shortDescription:
      "A high-performance web server and reverse proxy used for serving static content and load balancing.",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  aws: {
    id: 22,
    name: "aws",
    label: "AWS",
    shortDescription:
      "Amazon Web Services — a cloud platform offering scalable computing, storage, and services.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  },
  vim: {
    id: 23,
    name: "vim",
    label: "Vim",
    shortDescription:
      "A highly configurable, efficient text editor popular among developers and system administrators.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  vercel: {
    id: 24,
    name: "vercel",
    label: "Vercel",
    shortDescription:
      "A cloud platform for deploying frontend applications, especially optimized for Next.js.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
};
