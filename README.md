# 🚀 3D Portfolio Website

Welcome to my immersive 3D portfolio website! This project showcases my skills, projects, and creativity through stunning 3D animations, interactive elements, and smooth motion design. Experience a cosmic journey through space-themed design with cutting-edge web technologies.

![Portfolio Preview](https://github.com/Jayant-1/3D-Portfolio/blob/main/public/assets/nav-link-previews/home.png?raw=true)


## ✨ Features

### 🎮 Interactive 3D Elements

- **Custom 3D Keyboard**: Interactive Spline-powered keyboard with skills as keycaps that reveal titles and descriptions on hover
- **3D Models**: Desktop PC, Earth, and other 3D assets using Three.js and React Three Fiber
- **Particle Systems**: Dynamic star field background creating an immersive space environment
- **Elastic Cursor**: Custom cursor with physics-based animations for enhanced interactivity

### 🎨 Visual & Animation

- **Smooth Animations**: Powered by GSAP and Framer Motion for fluid scroll animations, hover effects, and element reveals
- **Space Theme**: Dark cosmic background with particle effects and stellar animations
- **Preloader**: Engaging loading screen with custom animations
- **Easter Eggs**: Hidden interactive elements for curious visitors

### 📱 Responsive Design

- **Mobile-First**: Fully responsive across all devices and screen sizes
- **Touch Optimized**: Smooth interactions on touch devices
- **Performance Optimized**: Optimized 3D rendering and animations

### 🎯 Sections

- **Hero**: Eye-catching introduction with 3D elements
- **About**: Personal story and background
- **Skills**: Interactive 3D keyboard showcasing technical skills
- **Projects**: Portfolio of work with 3D project cards
- **Achievements**: Timeline of accomplishments and certifications
- **Contact**: Interactive contact form with 3D elements

## 🛠️ Tech Stack

### Frontend & Framework

- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **React Router DOM** - Client-side routing

### 3D & Graphics

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Spline Runtime** - Interactive 3D design tool integration
- **Maath** - Mathematical utilities for 3D graphics

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Animations & Interactions

- **GSAP** - Professional-grade animations
- **Framer Motion** - Production-ready motion library
- **React Tilt** - 3D tilt effects
- **React Vertical Timeline Component** - Timeline animations

### Utilities & Tools

- **React Icons** - Icon library
- **EmailJS** - Email functionality
- **Clsx & Tailwind Merge** - Conditional styling utilities
- **Devtools Detector** - Development tools detection

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jayant-1/3D-Portfolio.git
   cd 3d-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to see the magic!

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── canvas/         # 3D canvas components
│   │   ├── Ball.jsx
│   │   ├── Computers.jsx
│   │   ├── Earth.jsx
│   │   └── Stars.jsx
│   ├── preloader/      # Loading screen
│   ├── ui/            # UI components
│   ├── About.jsx
│   ├── Achievement.jsx
│   ├── Contact.jsx
│   ├── ElasticCursor.jsx
│   ├── Feedbacks.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── SkillKeyboard.jsx
│   └── Works.jsx
├── assets/            # Static assets
│   ├── achievement/   # Achievement images
│   ├── badge/        # Skill badges
│   ├── fonts/        # Custom fonts
│   └── project/      # Project images
├── constants/         # Configuration files
├── hoc/              # Higher-order components
├── utils/            # Utility functions
└── styles.js         # Global styles
```

## 🎨 Customization

### Adding New 3D Models

1. Place your 3D models in the `public/` directory
2. Import and use them in canvas components
3. Ensure models are optimized for web (glTF format recommended)

### Modifying Animations

- **GSAP Animations**: Edit scroll-triggered animations in component files
- **Framer Motion**: Modify motion variants in components
- **3D Animations**: Update Three.js animations in canvas components

### Styling Changes

- **Tailwind Classes**: Modify existing classes or add custom ones
- **Global Styles**: Update `src/styles.js` for theme changes
- **Component Styles**: Edit individual component styling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your site

### Other Platforms

- **GitHub Pages**: Deploy using GitHub Actions
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload built files to S3 bucket

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices
- Maintain responsive design
- Optimize 3D performance
- Add meaningful commit messages
- Test across different devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spline** for 3D design tools
- **Three.js** community for 3D graphics
- **GSAP** for powerful animations
- **Framer Motion** for React animations
- **Tailwind CSS** for utility-first styling

## 📞 Contact

- **Portfolio**: [https://jayant-1.vercel.app/]
- **GitHub**: [@Jayant-1](https://github.com/Jayant-1)
- **LinkedIn**: [Jayant Potdar](https://www.linkedin.com/in/jayant-potdar-880a461b8/)
- **Email**: jayantpotdar2006@gmail.com

---

⭐ **Star this repository if you found it helpful!**
