/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
  className?: string;
  key?: React.Key;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: ScrollRevealProps) {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      variants={variants}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
