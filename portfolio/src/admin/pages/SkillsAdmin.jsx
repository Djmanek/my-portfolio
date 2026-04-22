import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const getToken = () => localStorage.getItem("token");

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API}/api/skills`);
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to fetch skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async () => {
    if (!newSkill.trim()) return toast.error("Skill cannot be empty");

    try {
      await fetch(`${API}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: newSkill }),
      });

      toast.success("Skill added 🚀");
      setNewSkill("");
      fetchSkills();
    } catch (err) {
      toast.error("Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success("Skill removed");
      fetchSkills();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>

      <div className="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow border border-orange-100">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter skill (e.g. React)"
          className="flex-1 p-2 border rounded outline-none focus:border-[#FF6B00]"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#FF6B00] text-white rounded hover:scale-105 transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet</p>
        ) : (
          skills.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center p-3 bg-white shadow rounded border border-orange-100"
            >
              <span className="font-medium text-[#FF6B00]">{s.name}</span>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-500 hover:scale-110 transition"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}