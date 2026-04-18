import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: "about", label: "About", x: 20, y: 30 },
  { id: "projects", label: "Projects", x: 70, y: 30 },
  { id: "skills", label: "Skills", x: 30, y: 70 },
  { id: "resume", label: "Resume", x: 50, y: 50 }, // ✅ ADDED
  { id: "contact", label: "Contact", x: 75, y: 70 },
];

export default function GameMap({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomTarget, setZoomTarget] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 🎮 Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight")
        setActiveIndex((prev) => (prev + 1) % nodes.length);

      if (e.key === "ArrowLeft")
        setActiveIndex((prev) =>
          prev === 0 ? nodes.length - 1 : prev - 1
        );

      if (e.key === "Enter") {
        const node = nodes[activeIndex];
        handleNodeClick(node);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIndex]);

  // 🖱️ Parallax mouse
  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleNodeClick = (node) => {
    setZoomTarget(node);

    setTimeout(() => {
      document.getElementById(node.id)?.scrollIntoView({
        behavior: "smooth",
      });
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[998] bg-white overflow-hidden flex items-center justify-center"
    >
      {/* 🌌 PARTICLES */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 🌊 PARALLAX LAYER */}
      <motion.div
        style={{
          x: mouse.x,
          y: mouse.y,
        }}
        className="absolute w-full h-full"
      />

      {/* 🔥 BIG GLOW */}
      <div className="absolute w-[900px] h-[900px] bg-[#FF6B00]/20 blur-[180px] rounded-full animate-pulse"></div>

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      {/* CONNECTION LINES */}
      <svg className="absolute w-full h-full">
        {nodes.map((n1, i) =>
          nodes.map((n2, j) => {
            if (i >= j) return null;
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="rgba(255,107,0,0.2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            );
          })
        )}
      </svg>

      {/* NODES */}
      <div className="relative w-full h-full">
        {nodes.map((node, i) => {
          const isActive = activeIndex === i;

          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              animate={{
                scale:
                  zoomTarget?.id === node.id ? 3 : isActive ? 1.2 : 1,
                opacity:
                  zoomTarget && zoomTarget.id !== node.id ? 0.2 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div
                onClick={() => handleNodeClick(node)}
                className={`relative px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300
                ${
                  isActive
                    ? "bg-[#FF6B00] text-white shadow-2xl"
                    : "bg-white border border-orange-200 text-[#FF6B00]"
                }`}
              >
                {/* 🧲 Magnetic Hover */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="absolute inset-0 rounded-2xl"
                />

                {/* Ripple */}
                <span className="absolute inset-0 bg-[#FF6B00]/10 rounded-2xl opacity-0 hover:opacity-100 transition"></span>

                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}