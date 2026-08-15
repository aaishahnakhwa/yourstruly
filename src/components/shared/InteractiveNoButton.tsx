import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveNoButtonProps {
  text: string;
  className: string;
}

export const InteractiveNoButton: React.FC<InteractiveNoButtonProps> = ({
  text,
  className,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tapCount, setTapCount] = useState(0);
  const [buttonText, setButtonText] = useState(text);
  const [isBroken, setIsBroken] = useState(false);

  const funnyTexts = [
    "Wait, what? 😮",
    "Are you sure? 💔",
    "Think again! 🥺",
    "Error: Button broken! 🛠️",
    "Click YES instead! 🫣",
    "Okay fine, I surrender! ❤️"
  ];

  const handleEscape = () => {
    if (isBroken) return;
    
    // Generate a random translation that isn't too close to current center
    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    // Jump distance
    const newX = randomRange(-120, 120);
    const newY = randomRange(-80, 80);

    setPosition({ x: newX, y: newY });
  };

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (isBroken) return;
    e.preventDefault();
    e.stopPropagation();

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    if (nextTap >= funnyTexts.length) {
      setIsBroken(true);
      setButtonText("Broken permanently 💔");
    } else {
      setButtonText(funnyTexts[nextTap - 1]);
      handleEscape();
    }
  };

  return (
    <motion.button
      type="button"
      disabled={isBroken}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseEnter={handleEscape}
      onClick={handleTap}
      onTouchStart={handleTap}
      className={`px-6 py-3 text-sm md:text-base select-none focus:outline-none transition-all duration-300 ${
        isBroken 
          ? 'opacity-40 cursor-not-allowed border-dashed border-red-500 bg-red-950/20 text-red-400' 
          : className
      }`}
    >
      {buttonText}
    </motion.button>
  );
};
