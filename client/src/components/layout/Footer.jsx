import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkText text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="mb-2">Built with React, Node.js, and MongoDB</p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              Twitter
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {currentYear} Your Name. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
