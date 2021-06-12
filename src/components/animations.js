export const pageAnimation = {
  hidden: {
    opacity: 0.1,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, ease: "easeInOut" },
  },
  exit: { opacity: 0, y: -20 },
};
