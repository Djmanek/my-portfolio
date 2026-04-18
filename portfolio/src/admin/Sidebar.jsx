import { Link } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaEnvelope, FaTools } from "react-icons/fa";

export default function Sidebar() {
  const items = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Projects", path: "/admin/projects", icon: <FaProjectDiagram /> },
    { name: "Skills", path: "/admin/skills", icon: <FaTools /> },
    { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    { name: "Resume", path: "/admin/resume" }
  ];

  return (
    <div className="w-64 bg-white border-r border-orange-100 p-6">
      <h1 className="text-xl font-bold text-[#FF6B00] mb-8">
        DevOS Admin
      </h1>

      {items.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition"
        >
          <span className="text-[#FF6B00]">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </div>
  );
}