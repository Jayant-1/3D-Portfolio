# 2026-10-02 Mobile 3D Optimization & Performance Design Specification

## Overview & Objective
Transform the **3D Portfolio** (`3D portfolio/`) into a blazing-fast, mobile-friendly experience. Mobile visitors must be able to freely navigate and interact with the site on phones without lag, GPU overheating, or gesture traps (blocked scrolling), while drastically reducing 3D model download sizes.

---

## 1. 3D Asset Compression & Optimization Pipeline

### Problem
- Current `desktop_pc` directory is **16MB** (`scene.bin` is 4.1MB, `scene.gltf` is 1.8MB, textures total 9.4MB with individual textures up to 1.7MB).
- `planet` directory is **2.9MB** with uncompressed textures.
- Over cellular networks or mobile devices, downloading ~19MB of uncompressed 3D assets causes significant load delays, hitching, and high memory spikes.

### Solution
1. **GLTF Transform Pipeline**:
   - Use `@gltf-transform/cli` with Draco geometry compression and WebP texture compression.
   - Resize oversized textures (e.g. 2048px/1024px to max 1024px/512px with quality 85).
   - Package multi-file assets into single, self-contained binary GLB files:
     - `public/desktop_pc/scene_opt.glb` (~1.5–2.2MB vs 16MB — **~85% reduction**).
     - `public/planet/scene_opt.glb` (~500–700KB vs 2.9MB — **~80% reduction**).
2. **Backward-Compatible Fallback**:
   - Update `Computers.jsx` and `Earth.jsx` to load the optimized `.glb` models, with automatic fallback handling.

---

## 2. Adaptive WebGL Policy for Mobile Screens

### Problem
- Full real-time dynamic shadows (`shadow-mapSize={1024}`) and high DPR (`dpr={[1, 2]}`) heavily tax mobile GPUs (especially 3x density screens like iPhone and modern Android devices).
- OrbitControls intercepts touch-drag events, causing vertical page scrolling to get trapped when dragging over the 3D canvas.

### Solution
1. **Dynamic DPR & Shadow Strategy**:
   - `dpr={[1, isMobile ? 1.3 : 2]}` to keep frame rates at 60fps on phones without blurry scaling.
   - Disable real-time shadow casting (`castShadow={!isMobile}`) and shadow map rendering on mobile; use clean ambient + directional lighting.
2. **Scroll Ergonomics in OrbitControls**:
   - Add `enableRotate={!isTouchScrolling}` and configure canvas `touch-action: pan-y` so vertical swiping smoothly scrolls the webpage down, while horizontal swipes rotate the 3D model.
3. **Background Particle Throttling (`StarsCanvas`)**:
   - Reduce particle count on mobile from 600 to 250 and throttle delta updates when not in active viewport.

---

## 3. Skills Section: Dedicated Mobile Interactive Keycap Grid

### Problem
- Spline 3D keyboard runtime (`@splinetool/runtime`) is heavy to load and initialize.
- On mobile viewports, the 3D keycaps are scaled down to 0.24, making individual keys almost impossible to tap reliably on small touchscreens.
- Spline canvas captures touch gestures and prevents vertical scrolling.

### Solution
1. **Device-Specific Adaptive Render**:
   - **Desktop / Tablet (`≥ 768px`)**: Continue rendering the interactive Spline 3D keyboard with all animations and sound effects.
   - **Mobile (`< 768px`)**: Render a dedicated **Cosmic Keycap Grid**:
     - Category filter pills: `All`, `Frontend`, `Backend`, `Database`, `Tools`.
     - Tactile keycap cards styled with cosmic gradients, subtle borders, and glow effects.
     - Audio feedback via `soundEffects.playClick()` upon tap.
     - Tapping a skill opens a sleek info drawer showing the skill title, proficiency, and description.

---

## 4. Touch Navigation, Preloader & Modals

### 1. Preloader Bypass
- In `preloader/index.jsx`, update `usePreloaderBypass`:
  - Set `touchEnabled: true` and `clickEnabled: true`.
  - Display a subtle "(Tap anywhere to skip)" hint on mobile so visitors can bypass the 2.5s timer immediately.

### 2. Project Modal (`ProjectModal.jsx`)
- Make carousel navigation arrows permanently visible with translucent rounded backdrops (`opacity-100` on mobile, removing the desktop hover dependency).
- Add touch swipe handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) to navigate between screenshots with natural finger swipes.
- Ensure the modal dialog fits mobile viewport heights with smooth scrollable content.

### 3. Navigation Menu (`Navbar.jsx`)
- On mobile screens, replace the 70+ animated character spans with clean, performant slide-in nav links with 48px touch targets.
- Fix mobile menu height to prevent content cutoffs on small mobile screens.

---

## 5. Verification Plan

1. **Asset Size Verification**:
   - Compare before and after sizes of `desktop_pc` and `planet`.
2. **Build Verification**:
   - Run `npm run build` inside `3D portfolio/` to ensure zero compilation or bundle errors.
3. **Mobile Browser Testing**:
   - Test using browser emulation with iPhone 14 (390x844) and Pixel 7 (412x915).
   - Verify smooth vertical scrolling across Hero, About, Projects, Skills, and Contact.
   - Verify 3D model loading speed, interactive touch responses, and sound cues.
