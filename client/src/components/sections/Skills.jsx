import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import SectionTitle from "../common/SectionTitle";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section className="px-6 md:px-16 py-20 bg-lightBg">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Skills & Expertise</SectionTitle>

        {loading ? (
          <p className="text-center text-secondaryText">Loading skills...</p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h3 className="text-xl font-bold text-darkText mb-4">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills
                    .filter(s => s.category === category)
                    .map((skill) => (
                      <motion.div
                        key={skill._id}
                        className="p-4 rounded-lg bg-white shadow-sm border border-lightBorder hover:shadow-md transition"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -3 }}
                      >
                        <p className="font-semibold text-darkText">{skill.name}</p>
                        <p className="text-sm text-blue-600 mt-1 capitalize">
                          {skill.proficiency}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}

            {skills.length === 0 && (
              <p className="text-center text-secondaryText text-lg">
                Skills coming soon...
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
