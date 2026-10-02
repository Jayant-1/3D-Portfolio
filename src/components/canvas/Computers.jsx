import React, { Suspense, useEffect, useRef, useState } from "react";
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

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene_opt.glb");
  const modelRef = useRef();
  const { gl, invalidate } = useThree();

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

    let isMouseDown = false;
    const handleMouseDown = (e) => {
      isMouseDown = true;
      const state = touchState.current;
      state.startX = e.clientX;
      state.lastX = e.clientX;
      state.lastTime = performance.now();
      state.velocity = 0;
      state.isDragging = true;
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      const state = touchState.current;
      const now = performance.now();
      const dt = Math.max(now - state.lastTime, 1);
      const moveX = e.clientX - state.lastX;

      state.velocity = (moveX / dt) * 0.015;
      state.targetRotation = Math.max(-1.4, Math.min(1.0, state.targetRotation + moveX * 0.007));

      state.lastX = e.clientX;
      state.lastTime = now;
      invalidate();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      touchState.current.isDragging = false;
      touchState.current.lastTime = performance.now();
    };

    domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    domElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    domElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    domElement.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      domElement.removeEventListener("touchstart", handleTouchStart);
      domElement.removeEventListener("touchmove", handleTouchMove);
      domElement.removeEventListener("touchend", handleTouchEnd);
      domElement.removeEventListener("touchcancel", handleTouchEnd);

      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gl, isMobile, invalidate]);

  useFrame((state, delta) => {
    const ts = touchState.current;

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
        modelRef.current.rotation.y = ts.currentRotation;
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
      position={isMobile ? [0, -2.2, -1.8] : [0, -3.25, -1.5]}
      scale={isMobile ? 0.46 : 0.75}
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
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="w-full h-full relative" style={{ touchAction: "pan-y" }}>
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
            />
          )}
          <Computers isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
