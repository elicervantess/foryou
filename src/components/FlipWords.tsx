import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  interval?: number;
}

const FlipWords: React.FC<FlipWordsProps> = ({ words, interval = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(wordInterval);
  }, [words, interval]);

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={currentWordIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[currentWordIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default FlipWords;
