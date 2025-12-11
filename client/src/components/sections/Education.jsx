import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import SectionTitle from "../common/SectionTitle";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await api.get("/education");
      setEducation(response.data);
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Education</SectionTitle>

        {loading ? (
          <p className="text-center text-secondaryText">Loading education...</p>
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
            {education.map((edu) => (
              <motion.div
                key={edu._id}
                className="p-6 rounded-xl bg-lightBg border-l-4 border-green-600 shadow-sm hover:shadow-md transition"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-darkText">{edu.degree}</h3>
                    <p className="text-green-600 font-semibold">{edu.institution}</p>
                    {edu.field && (
                      <p className="text-sm text-secondaryText mt-1">Field: {edu.field}</p>
                    )}
                    {edu.graduationDate && (
                      <p className="text-sm text-secondaryText">
                        Graduated: {new Date(edu.graduationDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-3 text-secondaryText leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && education.length === 0 && (
          <p className="text-center text-secondaryText text-lg">
            Education coming soon...
          </p>
        )}
      </div>
    </section>
  );
};

export default Education;
