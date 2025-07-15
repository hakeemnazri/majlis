import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

type AnimContainerProps = {
  children: React.ReactNode;
  key: number;
};

function AnimContainer({ children, key }: AnimContainerProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          layout
          className="flex flex-col gap-6"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default AnimContainer;
