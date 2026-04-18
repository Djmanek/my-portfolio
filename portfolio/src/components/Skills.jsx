import { useEffect, useState } from "react";
import { skillIcons } from "../utils/skillIcons";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <section
      id="skills" // 🔥 REQUIRED FOR NAVIGATION
      className="py-24 px-6 bg-white scroll-mt-24" // 🔥 OFFSET FIX
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((s) => {
          const key = s.name.toLowerCase().replace(/\s/g, "");
          const Icon = skillIcons[key];

          return (
            <div
              key={s.id}
              className="flex items-center gap-2 px-5 py-2 bg-orange-100 text-[#FF6B00] rounded-full shadow hover:scale-110 transition"
            >
              {Icon ? <Icon className="text-lg" /> : "⚡"}
              {s.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}