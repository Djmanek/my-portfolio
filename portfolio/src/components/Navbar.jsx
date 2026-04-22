import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const navItems = ["home", "about", "projects", "skills", "resume", "contact"];

  const handleScroll = (id) => {
    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      const yOffset = -80; // 👈 prevents hiding under navbar
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-[10000] bg-white/95 border-b border-orange-100 shadow-xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🔥 LOGO */}
        <h1
          onClick={() => handleScroll("home")}
          className="text-xl font-bold text-[#FF6B00] cursor-pointer"
        >
          DevOS
        </h1>

        {/* 🔥 NAV LINKS */}
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

          {/* 🔐 ADMIN BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#FF6B00] to-[#FFA559] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition duration-300"
          >
            Admin
          </button>

        </div>
      </div>
    </nav>
  );
}