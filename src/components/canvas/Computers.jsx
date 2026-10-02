import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const EnableContextMenu = () => {
  const { gl } = useThree();

  useEffect(() => {
    const domElement = gl.domElement;
    const parent = domElement.parentElement;
    const grandParent = parent?.parentElement;

    // Enforce touch-action: pan-y so vertical swipes scroll the page natively on mobile
    domElement.style.touchAction = "pan-y";
    if (parent) parent.style.touchAction = "pan-y";
    if (grandParent) grandParent.style.touchAction = "pan-y";

    const handleContextMenu = (e) => {
      // Prevent OrbitControls from calling preventDefault() on contextmenu
      e.stopImmediatePropagation();
    };

    domElement.addEventListener("contextmenu", handleContextMenu, { capture: true });

    return () => {
      domElement.removeEventListener("contextmenu", handleContextMenu, { capture: true });
    };
  }, [gl]);

  return null;
};

const Computers = ({ isMobile, onInteract }) => {
  const computer = useGLTF("./desktop_pc/scene_opt.glb");
  const modelRef = useRef();
  const { gl, invalidate } = useThree();

  const introStartTime = useRef(null);
  const userHasInteracted = useRef(false);
  const onInteractRef = useRef(onInteract);
  onInteractRef.current = onInteract;

  const centerOffset = useMemo(() => {
    if (!computer?.scene) return { x: 0, y: 0, z: 0 };
    const box = new THREE.Box3().setFromObject(computer.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return { x: center.x, y: center.y, z: center.z };
  }, [computer]);

  const touchState = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    targetRotation: -0.2,
    currentRotation: -0.2,
    isDragging: false,
    direction: null,
  });

  useEffect(() => {
    if (!isMobile) return;

    const domElement = gl.domElement;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const state = touchState.current;
      state.startX = t.clientX;
      state.startY = t.clientY;
      state.lastX = t.clientX;
      state.lastTime = performance.now();
      state.velocity = 0;
      state.direction = null;
      state.isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const state = touchState.current;
      if (!state.isDragging) return;

      const t = e.touches[0];
      const dx = t.clientX - state.startX;
      const dy = t.clientY - state.startY;

      // Determine intent once gesture exceeds 7px threshold
      if (state.direction === null) {
        if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
          state.direction = Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical";
        }
      }

      if (state.direction === "horizontal") {
        userHasInteracted.current = true;
        onInteract?.();

        // User is interacting horizontally with the 3D PC model
        if (e.cancelable) e.preventDefault();

        const now = performance.now();
        const dt = Math.max(now - state.lastTime, 1);
        const moveX = t.clientX - state.lastX;

        state.velocity = (moveX / dt) * 0.015;
        state.targetRotation = Math.max(-1.4, Math.min(1.0, state.targetRotation + moveX * 0.007));

        state.lastX = t.clientX;
        state.lastTime = now;

        invalidate();
      }
      // If direction === 'vertical', we do nothing: browser handles native page scroll smoothly!
    };

    const handleTouchEnd = () => {
      const state = touchState.current;
      state.isDragging = false;
      state.direction = null;
      state.lastTime = performance.now();
    };

    let isPointerDragging = false;
    let pointerStartX = 0;
    let pointerLastX = 0;
    let pointerLastTime = 0;

    const handlePointerDown = (e) => {
      if (e.pointerType === "touch" && !e.isPrimary) return;
      isPointerDragging = true;
      pointerStartX = e.clientX;
      pointerLastX = e.clientX;
      pointerLastTime = performance.now();
      touchState.current.velocity = 0;
    };

    const handlePointerMove = (e) => {
      if (!isPointerDragging) return;
      const dx = e.clientX - pointerStartX;
      if (Math.abs(dx) > 5) {
        userHasInteracted.current = true;
        onInteract?.();
      }

      const now = performance.now();
      const dt = Math.max(now - pointerLastTime, 1);
      const moveX = e.clientX - pointerLastX;

      touchState.current.velocity = (moveX / dt) * 0.015;
      touchState.current.targetRotation = Math.max(-1.4, Math.min(1.0, touchState.current.targetRotation + moveX * 0.007));

      pointerLastX = e.clientX;
      pointerLastTime = now;
      invalidate();
    };

    const handlePointerUp = () => {
      isPointerDragging = false;
      touchState.current.lastTime = performance.now();
    };

    domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    domElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    domElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    domElement.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      domElement.removeEventListener("touchstart", handleTouchStart);
      domElement.removeEventListener("touchmove", handleTouchMove);
      domElement.removeEventListener("touchend", handleTouchEnd);
      domElement.removeEventListener("touchcancel", handleTouchEnd);

      domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [gl, isMobile, invalidate, onInteract]);

  useFrame((state, delta) => {
    const ts = touchState.current;
    if (ts.isDragging) {
      userHasInteracted.current = true;
    }

    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }

    // Intro showcase turn in first 3 seconds if untouched
    let introWiggle = 0;
    if (!userHasInteracted.current) {
      const elapsed = state.clock.elapsedTime - introStartTime.current;
      if (elapsed < 3.0) {
        const p = elapsed / 3.0;
        introWiggle = Math.sin(p * Math.PI * 2) * 0.22 * Math.cos(p * Math.PI * 0.5);
      }
    }

    // Apply inertia, damping, and gentle auto-centering on mobile
    if (isMobile) {
      const now = performance.now();
      if (!ts.isDragging) {
        if (Math.abs(ts.velocity) > 0.0001) {
          ts.targetRotation += ts.velocity * delta * 60;
          ts.velocity *= 0.90;
          ts.targetRotation = Math.max(-1.4, Math.min(1.0, ts.targetRotation));
          invalidate();
        } else if (now - ts.lastTime > 2500) {
          // Gently return towards front-facing view after 2.5s of inactivity
          ts.targetRotation += (-0.2 - ts.targetRotation) * Math.min(delta * 1.5, 1);
          invalidate();
        }
      }

      if (Math.abs(ts.currentRotation - ts.targetRotation) > 0.0005) {
        ts.currentRotation += (ts.targetRotation - ts.currentRotation) * Math.min(delta * 10, 1);
        invalidate();
      }
    }

    // Subtle idle floating / breathing animation so the model is unmistakably 3D
    const idleFloat = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    const idleTilt = Math.sin(state.clock.elapsedTime * 1.0) * 0.015;

    const basePosY = isMobile ? -2.2 : -3.25;

    if (modelRef.current) {
      if (isMobile) {
        modelRef.current.rotation.y = ts.currentRotation + introWiggle;
        modelRef.current.position.y = basePosY + idleFloat;
        modelRef.current.rotation.z = -0.1 + idleTilt;
      } else {
        modelRef.current.position.y = basePosY + idleFloat;
        modelRef.current.rotation.z = -0.1 + idleTilt;
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={isMobile ? [0, -2.2, 0] : [0, -3.25, -1.5]}
      scale={isMobile ? 0.44 : 0.75}
      rotation={[-0.01, -0.2, -0.1]}
    >
      <hemisphereLight intensity={isMobile ? 0.35 : 0.2} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 1.2 : 1}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 256 : 1024}
      />
      <pointLight intensity={isMobile ? 1.2 : 1} />
      <primitive
        object={computer.scene}
        position={isMobile ? [-centerOffset.x, 0, -centerOffset.z] : [0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Add a listener for changes to screen size (phones & tablets)
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleUserInteract = () => {
    setHasInteracted(true);
  };

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        frameloop="always"
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.2 : 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true, powerPreference: isMobile ? "low-power" : "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <EnableContextMenu />
          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              onStart={handleUserInteract}
            />
          )}
          <Computers isMobile={isMobile} onInteract={handleUserInteract} />
        </Suspense>

        <Preload all />
      </Canvas>

      {/* Interactive 3D Hint Badge */}
      <div
        className={`absolute bottom-8 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-all duration-700 ease-out select-none ${
          hasInteracted ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101328]/80 backdrop-blur-sm border border-white/15 text-[11px] sm:text-xs text-white/85 font-medium">
          <svg
            className="w-3.5 h-3.5 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span className="tracking-wide text-white/80">
            {isMobile ? "Swipe to rotate 3D" : "Drag to rotate 3D"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComputersCanvas;
