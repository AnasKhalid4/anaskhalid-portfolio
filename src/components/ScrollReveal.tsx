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
      opacity: 0.2, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      filter: "brightness(0.5)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "brightness(1)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
