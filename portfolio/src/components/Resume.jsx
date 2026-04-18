import { useEffect, useState } from "react";

export default function Resume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/resume")
      .then((res) => res.json())
      .then((data) => setResume(data));
  }, []);

  if (!resume) return null;

  return (
    <section
      id="resume"
      className="py-24 px-6 bg-orange-50 text-center scroll-mt-24"
    >
      <h2 className="text-4xl font-bold mb-10">
        Resume
      </h2>

      {/* CENTER CONTAINER */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={`http://localhost:5000${resume.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl shadow hover:scale-105 transition"
          >
            View Resume
          </a>

          <a
            href={`http://localhost:5000${resume.file}`}
            download
            className="px-6 py-3 border border-[#FF6B00] text-[#FF6B00] rounded-xl hover:bg-[#FF6B00] hover:text-white transition"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
}