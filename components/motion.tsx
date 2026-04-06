"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function MotionDiv({
  children,
  className,
  custom = 0,
  ...props
}: HTMLMotionProps<"div"> & { custom?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={custom}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({
  children,
  className,
  ...props
}: HTMLMotionProps<"section">) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionArticle({
  children,
  className,
  custom = 0,
  ...props
}: HTMLMotionProps<"article"> & { custom?: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={custom}
      className={className}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export function MotionStaggerChild({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeInUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export { motion };
