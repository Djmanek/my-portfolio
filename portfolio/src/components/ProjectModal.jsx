import { motion } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] flex items-center justify-center px-4">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 relative"
      >
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        {/* 🔥 Title */}
        <h2 className="text-2xl font-bold text-[#FF6B00]">
          {project.title}
        </h2>

        {/* 🖼️ IMAGE */}
        {project.image ? (
          <img
            src={`http://localhost:5000${project.image}`}
            alt={project.title}
            className="mt-4 h-44 w-full object-cover rounded-xl"
          />
        ) : (
          <div className="mt-4 h-44 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        {/* 🧠 DESCRIPTION */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          {project.description}
        </p>

        {/* 🧩 TECH STACK */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech?.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-orange-100 text-[#FF6B00] rounded-full text-sm font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* 🔗 ACTION BUTTONS */}
        <div className="mt-6 flex gap-4 flex-wrap">

          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#FF6B00] text-white rounded-xl shadow hover:scale-105 transition"
            >
              GitHub
            </a>
          )}

          {/* Live */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-xl hover:bg-orange-50 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}