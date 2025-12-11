import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import SectionTitle from "../common/SectionTitle";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await api.get("/experience");
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 py-20 bg-lightBg">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Experience</SectionTitle>

        {loading ? (
          <p className="text-center text-secondaryText">Loading experience...</p>
        ) : (
          <motion.div
            className="space-y-6"
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
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                className="p-6 rounded-xl bg-white border-l-4 border-blue-600 shadow-sm hover:shadow-md transition"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-darkText">{exp.jobTitle}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                    <p className="text-sm text-secondaryText mt-1">{exp.duration}</p>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-3 text-secondaryText leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && experiences.length === 0 && (
          <p className="text-center text-secondaryText text-lg">
            Experience coming soon...
          </p>
        )}
      </div>
    </section>
  );
};

export default Experience;
