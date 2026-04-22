import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Resume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/resume`)
      .then((res) => res.json())
      .then((data) => setResume(data));
  }, []);

  if (!resume) return null;

  return (
    <section
      id="resume"
      className="py-24 px-6 bg-orange-50 text-center scroll-mt-24"
    >
      <h2 className="text-4xl font-bold mb-10">Resume</h2>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="flex justify-center gap-4 flex-wrap">

          {/* ✅ View — opens PDF directly from backend */}
          <button
            onClick={() => window.location.href = `${API}/api/resume/file`}
            className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl shadow hover:scale-105 transition"
          >
            View Resume
          </button>

          {/* ✅ Download — triggers PDF download */}
          <a
            href={`${API}/api/resume/file`}
            download={resume.filename || "resume.pdf"}
            className="px-6 py-3 border border-[#FF6B00] text-[#FF6B00] rounded-xl hover:bg-[#FF6B00] hover:text-white transition"
          >
            Download
          </a>

        </div>
      </div>
    </section>
  );
}