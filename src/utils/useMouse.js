import { useEffect, useState } from "react";

export const useMouse = ({ allowPage, allowAngle, allowAcc } = {}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setX(allowPage ? e.pageX : e.clientX);
      setY(allowPage ? e.pageY : e.clientY);
      if (allowAcc) {
        const acc = Math.abs(e.movementX) + Math.abs(e.movementY);
        setAcceleration(acc);
      }
      if (allowAngle) {
        setAngle(Math.atan2(e.movementY, e.movementX));
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [allowPage, allowAngle, allowAcc]);

  return { x, y, angle, acceleration };
};
