import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function ResumeAdmin() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);

  const getToken = () => localStorage.getItem("token");

  const fetchResume = async () => {
    try {
      const res = await fetch(`${API}/api/resume`);
      const data = await res.json();
      setResume(data);
    } catch (err) {
      toast.error("Failed to load resume");
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${API}/api/resume`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Resume uploaded 🚀");
      setFile(null);
      fetchResume();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/api/resume`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Resume deleted");
      setResume(null);
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Resume</h2>

      {/* UPLOAD BOX */}
      <div className="bg-white p-6 rounded-xl shadow border border-orange-100 space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-[#FF6B00] text-white rounded hover:scale-105 transition"
        >
          Upload Resume
        </button>
      </div>

      {/* CURRENT RESUME */}
      {resume && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow border border-orange-100 flex justify-between items-center">
          {/* ✅ Direct Cloudinary raw URL — opens PDF directly */}
          <a
            href={resume.file}
            target="_blank"
            rel="noreferrer"
            className="text-[#FF6B00] font-medium underline"
          >
            View Resume
          </a>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:scale-110 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}