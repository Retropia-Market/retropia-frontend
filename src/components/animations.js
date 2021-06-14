export const pageAnimation = {
  hidden: {
    opacity: 0.1,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, y: -20 },
};

export const logoAnimation = {
  hidden: {
    opacity: 0.1,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  },
  exit: { opacity: 0, y: -20 },
};

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: { opacity: 0, y: -20 },
};
