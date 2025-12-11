import { motion } from "framer-motion";

const SectionTitle = ({ children, className = "" }) => {
  return (
    <motion.h2
      className={`text-3xl md:text-4xl font-bold text-darkText mb-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;
