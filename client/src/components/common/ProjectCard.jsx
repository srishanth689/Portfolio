import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ProjectCard = ({ project }) => {
  return (
    <motion.article
      className="p-6 rounded-2xl bg-white shadow-sm border border-lightBorder hover:shadow-lg transition-shadow"
      variants={cardVariant}
      whileHover={{ y: -5 }}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-darkText">{project.title}</h3>
      <p className="mt-2 text-secondaryText line-clamp-3">{project.description}</p>
      
      {project.techStack && project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 text-center rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 text-center rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
