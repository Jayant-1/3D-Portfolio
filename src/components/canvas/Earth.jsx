import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const EnableContextMenu = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextMenu = (e) => {
      // Prevent OrbitControls from calling preventDefault() on contextmenu
      e.stopImmediatePropagation();
    };

    const domElement = gl.domElement;
    domElement.addEventListener("contextmenu", handleContextMenu, { capture: true });

    return () => {
      domElement.removeEventListener("contextmenu", handleContextMenu, { capture: true });
    };
  }, [gl]);

  return null;
};

const Earth = () => {
  const earth = useGLTF("./planet/scene_opt.glb");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      frameloop='demand'
      dpr={[1, isMobile ? 1.3 : 2]}
      gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <EnableContextMenu />
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
