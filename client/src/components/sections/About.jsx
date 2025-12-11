import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";

const About = () => {
  return (
    <section id="about" className="px-6 md:px-16 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>About Me</SectionTitle>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg flex items-center justify-center text-7xl">
              🎨
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-secondaryText mb-4 leading-relaxed">
              Aspiring Software Developer with a focus on building clean, scalable applications. Currently in my final year of B.Tech, I have hands-on experience in Frontend Development, the MERN stack, Java, SQL. I enjoy solving real-world problems and continuously improving my coding and DSA skills.
            </p>

            <p className="text-lg text-secondaryText mb-4 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the community.
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-darkText mb-3">Key Skills</h3>
              <ul className="grid grid-cols-2 gap-2 text-secondaryText">
                <li>✓ React & JavaScript</li>
                <li>✓ Node.js & Express</li>
                <li>✓ MongoDB & Databases</li>
                <li>✓ Responsive Design</li>
                <li>✓ API Development</li>
                <li>✓ Git & DevOps</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
