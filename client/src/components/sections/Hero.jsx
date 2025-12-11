import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-12 py-10">
      <motion.div
        className="max-w-2xl flex-1 flex-shrink-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm font-semibold tracking-widest text-blue-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          FULL STACK MERN DEVELOPER
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mt-3 text-darkText leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I'm <span className="text-blue-600">M. Srishanth</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-secondaryText leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I design and build modern web applications using the MERN stack, focused on clean UI, performance, and scalable backend systems.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="https://github.com/srishanth689/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600 transition">
            🐙
          </a>
          <a href="https://www.linkedin.com/in/srishanth-30aug2004/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600 transition">
            💼
          </a>
          <a href="mailto:muppidisrishanth123@gmail.com" className="text-2xl hover:text-blue-600 transition">
            📧
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-80 h-80 rounded-3xl shadow-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <img 
          src="/images/profile.jpeg" 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
