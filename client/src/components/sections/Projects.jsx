import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "../common/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="px-6 md:px-16 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Featured Projects</SectionTitle>

        {loading ? (
          <p className="text-center text-secondaryText">Loading projects...</p>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-center text-secondaryText text-lg">
            Projects coming soon...
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
