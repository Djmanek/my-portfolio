import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-orange-50">
      <h2 className="text-4xl font-bold text-center mb-14">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-8 rounded-3xl bg-white shadow-lg border border-orange-100 hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold text-[#FF6B00]">
              {p.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {p.description}
            </p>

            {/* TECH */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech?.slice(0, 2).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-orange-100 text-[#FF6B00] rounded-full text-xs"
                >
                  {t}
                </span>
              ))}
              {p.tech?.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{p.tech.length - 2} more
                </span>
              )}
            </div>

            <button
              onClick={() => setSelected(p)}
              className="mt-6 text-sm text-[#FF6B00] hover:underline"
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}