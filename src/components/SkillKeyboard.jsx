// SkillKeyboard.jsx
// This component renders an interactive 3D skill keyboard using Spline and GSAP animations.
// Each key represents a skill, and the keyboard animates in response to user actions.

import { Application } from "@splinetool/runtime";
import gsap from "gsap";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { SKILLS, SkillNames } from "../constants/skills";
import { sleep } from "../utils/sleep";
import useMediaQuery from "../utils/useMediaQuery";
import soundEffects from "../utils/soundEffects";

// Lazy-load the Spline React component for 3D rendering
const Spline = React.lazy(() => import("@splinetool/react-spline"));

// Keyboard transformation states for different sections and device types
const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.35, y: 0.33, z: 0.35 },
      position: { x: 20, y: 0, z: 40 }, // Centered horizontally and vertically
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.17, y: 0.17, z: 0.17 },
      position: { x: 10, y: 0, z: 0 }, // Centered for mobile
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  // State for the skills section
  skills: {
    desktop: {
      scale: { x: 0.33, y: 0.33, z: 0.33 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.24, y: 0.24, z: 0.24 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  // State for the projects section
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  // State for the contact section
  contact: {
    desktop: {
      scale: { x: 0.33, y: 0.33, z: 0.33 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.24, y: 0.24, z: 0.24 },
      position: { x: 0, y: 0, z: 0 }, // Centered
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
};

const SkillKeyboard = () => {
  // Detect if the user is on a mobile device
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Ref for the Spline component instance
  const splineContainer = useRef(null);
  // Ref for the section element to observe
  const sectionRef = useRef(null);
  // Spline application instance (lets you control the 3D scene)
  const [splineApp, setSplineApp] = useState();
  // Currently highlighted skill (when a key is hovered or pressed)
  const [selectedSkill, setSelectedSkill] = useState(null);
  // Which section of the site is active (affects keyboard animation)
  const [activeSection, setActiveSection] = useState("skills");
  // Whether the keyboard animation has finished revealing
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  // Whether the section is in view (for triggering animation)
  const [isInView, setIsInView] = useState(false);

  // Helper to get the correct transformation state for the current section/device
  const keyboardStates = (section) => {
    return STATES[section][isMobile ? "mobile" : "desktop"];
  };

  // Set up intersection observer to detect when skills section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before the section is fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle mouse hover events on the 3D keys
  const handleMouseHover = (e) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;
    // If hovering over the keyboard body/platform, clear selection
    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      // Otherwise, set the selected skill based on the key name
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        const skill = SKILLS[e.target.name];
        setSelectedSkill(skill);
      }
    }
  };

  // Update the Spline scene when the selected skill changes
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // Show/hide skill labels depending on section and device
  useEffect(() => {
    if (!splineApp) return;
    // Only light mode for now
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileLight = splineApp.findObjectByName("text-mobile");
    if (!textDesktopLight || !textMobileLight) return;
    if (activeSection !== "skills") {
      textDesktopLight.visible = false;
      textMobileLight.visible = false;
      return;
    }
    if (!isMobile) {
      textDesktopLight.visible = true;
      textMobileLight.visible = false;
    } else {
      textDesktopLight.visible = false;
      textMobileLight.visible = true;
    }
  }, [splineApp, isMobile, activeSection]);

  // Set up Spline event listeners and GSAP animations when the scene loads
  useEffect(() => {
    handleSplineInteractions();
    handleGsapAnimations();
  }, [splineApp]);

  // Trigger the keyboard reveal animation when the scene is ready AND section is in view
  useEffect(() => {
    if (!splineApp || keyboardRevealed || !isInView) return;
    revealKeyCaps();
  }, [splineApp, keyboardRevealed, activeSection, isInView]);

  // Animate the keyboard and keycaps into view
  const revealKeyCaps = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    kbd.visible = false;
    await sleep(400); // Wait before revealing
    kbd.visible = true;
    setKeyboardRevealed(true);
    // Animate keyboard scale
    gsap.fromTo(
      kbd?.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        x: keyboardStates(activeSection).scale.x,
        y: keyboardStates(activeSection).scale.y,
        z: keyboardStates(activeSection).scale.z,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );
    // Animate keycaps
    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    await sleep(900);
    if (isMobile) {
      // Show all mobile keycaps at once
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile"
      );
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = true;
      });
    } else {
      // Animate desktop keycaps one by one
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop"
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }
    // Animate all keycaps with a bounce effect
    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 100 },
        { y: 25, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  // Set up Spline event listeners for key presses and hovers
  const handleSplineInteractions = () => {
    if (!splineApp) return;
    // Clear skill info on key up
    splineApp.addEventListener("keyUp", (e) => {
      if (!splineApp) return;
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    // Show skill info on key down
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name];
      if (skill) setSelectedSkill(skill);
      splineApp.setVariable("heading", skill?.label || "");
      splineApp.setVariable("desc", skill?.shortDescription || "");
      soundEffects.playClick();
    });
    // Handle mouse hover on keys
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  // Set up initial GSAP animations for the keyboard
  const handleGsapAnimations = () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;
    // Set initial scale and position
    gsap.set(kbd.scale, { ...keyboardStates("hero").scale });
    gsap.set(kbd.position, { ...keyboardStates("hero").position });
    gsap.timeline({
      onStart: () => setActiveSection("skills"),
    });
    // You can add scroll-based triggers here if you want to animate between sections
  };

  // Render the 3D keyboard section
  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Skills Title */}

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            marginTop: 34,
            textAlign: "center",
            letterSpacing: 2,
            color: "#fff",
            textShadow: "0 2px 16px rgba(0,0,0,0.2)",
          }}
        >
          Skills
        </h2>
        <p style={{ textAlign: "center", color: "#aaa" }}>
          (hint: press a key)
        </p>
        {/* Suspense fallback while loading the Spline 3D scene */}
        <Suspense fallback={<div>Loading 3D Keyboard...</div>}>
          <Spline
            ref={splineContainer}
            onLoad={(app) => setSplineApp(app)}
            scene="/assets/skills-keyboard.spline"
          />
        </Suspense>
      </div>
      <span id="projects"></span>
    </section>
  );
};

export default SkillKeyboard;
