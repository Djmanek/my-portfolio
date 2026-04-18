import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    image: null,
  });

  // ✅ ALWAYS GET FRESH TOKEN
  const getToken = () => {
    const token = localStorage.getItem("token");

    // 🔥 Prevent "undefined" or invalid token
    if (!token || token === "undefined") return null;

    return token;
  };

  // 🔥 FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setProjects(data);

    } catch (err) {
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔥 ADD PROJECT
  const handleAdd = async () => {
    if (!form.title || !form.description) {
      return toast.error("Title & Description required");
    }

    const token = getToken();

    if (!token) {
      toast.error("Session expired. Please login again ❌");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech", form.tech);
    formData.append("github", form.github);
    formData.append("live", form.live);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      toast.success("Project added 🚀");

      setForm({
        title: "",
        description: "",
        tech: "",
        github: "",
        live: "",
        image: null,
      });

      fetchProjects();

    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔥 DELETE PROJECT
  const handleDelete = async (id) => {
    const token = getToken();

    if (!token) {
      toast.error("Session expired. Please login again ❌");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete failed");

      toast.success("Deleted successfully");

      // ✅ Instant UI update
      setProjects((prev) => prev.filter((p) => p.id !== id));

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-xl shadow border border-orange-100">

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="p-2 border rounded"
        />

        <input
          placeholder="GitHub Link"
          value={form.github}
          onChange={(e) =>
            setForm({ ...form, github: e.target.value })
          }
          className="p-2 border rounded"
        />

        <input
          placeholder="Live Link"
          value={form.live}
          onChange={(e) =>
            setForm({ ...form, live: e.target.value })
          }
          className="p-2 border rounded"
        />

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          className="p-2 border rounded"
        />

        <input
          placeholder="Tech (comma separated)"
          value={form.tech}
          onChange={(e) =>
            setForm({ ...form, tech: e.target.value })
          }
          className="p-2 border rounded col-span-2"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="p-2 border rounded col-span-2"
        />

        <button
          onClick={handleAdd}
          className="col-span-2 px-4 py-2 bg-[#FF6B00] text-white rounded hover:scale-105 transition"
        >
          Add Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white rounded-xl shadow border border-orange-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-[#FF6B00]">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500">
                {p.description}
              </p>
            </div>

            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500 hover:scale-110 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}