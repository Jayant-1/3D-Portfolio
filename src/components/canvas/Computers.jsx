import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
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

  return (
    <mesh>
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
        scale={isMobile ? 0.58 : 0.75}
        position={isMobile ? [0, -3.15, -2.1] : [0, -3.80, -1.5]}
        rotation={[-0.00, -0.2, -0.1]}
      />
    </mesh>
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
    <div className={`w-full h-full ${isMobile ? "pointer-events-none" : ""}`}>
      <Canvas
        frameloop='demand'
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.2 : 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true, powerPreference: isMobile ? "low-power" : "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <EnableContextMenu />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
