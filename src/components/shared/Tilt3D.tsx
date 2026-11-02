import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees
}

export const Tilt3D: React.FC<Tilt3DProps> = ({ 
  children, 
  className = '',
  maxTilt = 12 
}) => {
  // Motion values to track coordinate positions (normalized between -0.5 and 0.5)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs to avoid rigid jumps on hover entry/exit
  const springX = useSpring(x, { damping: 25, stiffness: 120 });
  const springY = useSpring(y, { damping: 25, stiffness: 120 });

  // Map coordinate range [-0.5, 0.5] to tilt rotation angle [-maxTilt, maxTilt]
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized cursor distance from relative centers
    const relativeX = (event.clientX - rect.left) / width;
    const relativeY = (event.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Reset spring to center rest state
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
