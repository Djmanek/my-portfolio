import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = ["home", "about", "projects", "skills", "resume", "contact"];
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/60 border-b border-orange-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-[#FF6B00]">
          DevOS
        </h1>

        {/* NAV LINKS */}
        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item)}
              className={`capitalize text-sm font-medium transition ${
                active === item
                  ? "text-[#FF6B00]"
                  : "text-gray-600 hover:text-[#FF6B00]"
              }`}
            >
              {item}
            </button>
          ))}

          {/* ADMIN BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#FF6B00] to-[#FFA559] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}