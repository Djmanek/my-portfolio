import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-white to-orange-50"
    >
      {/* 🔥 BACKGROUND GLOW ORBS */}
      <div className="absolute w-[600px] h-[600px] bg-[#FF6B00]/20 blur-[140px] rounded-full top-[-120px] left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-300/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      <div className="relative text-center max-w-4xl">
        {/* 🔥 NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Dev{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFA559]">
            Manek
          </span>
        </motion.h1>

        {/* 🔥 TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-600"
        >
          Designing & Building{" "}
          <span className="text-[#FF6B00] font-semibold">
            Next-Level Web Experiences
          </span>{" "}
          🚀
        </motion.p>

        {/* 🔥 BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center gap-6 flex-wrap"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FFA559] text-white rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition"
          >
            Explore Work
          </a>

          <a
            href="#contact"
            className="px-8 py-3 border-2 border-[#FF6B00] text-[#FF6B00] rounded-2xl hover:bg-[#FF6B00] hover:text-white transition"
          >
            Contact Me
          </a>
        </motion.div>

        {/* 🔥 SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col items-center text-gray-400 text-sm"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-2 w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-1"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}