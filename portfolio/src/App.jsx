import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// 🔥 LOADER
import Loader from "./components/Loader";

// 🔥 NAVBAR (ADD THIS)
import Navbar from "./components/Navbar";

// MAIN
import Home from "./pages/Home";
import TerminalOverlay from "./components/TerminalOverlay";
import GameMap from "./components/GameMap";
import { Toaster } from "react-hot-toast";

// ✅ ADMIN
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin";
import SkillsAdmin from "./admin/pages/SkillsAdmin";
import MessagesAdmin from "./admin/pages/MessagesAdmin";
import ResumeAdmin from "./admin/pages/ResumeAdmin";
import Login from "./admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ ADMIN PAGE
function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="resume" element={<ResumeAdmin />} />
      </Routes>
    </AdminLayout>
  );
}

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  // 🔥 LOADER STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(true);
      }

      if (e.ctrlKey && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setGameOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        // 🔥 LOADER SCREEN
        <Loader key="loader" onFinish={() => setLoading(false)} />
      ) : (
        // 🔥 MAIN APP
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Router>

            {/* ✅ NAVBAR (ALWAYS FIXED) */}
            <Navbar />

            {/* 🔥 TOASTER */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1A1A1A",
                  color: "#fff",
                  border: "1px solid #FF6B00",
                },
              }}
            />

            {/* ✅ ROUTES WITH TOP SPACING */}
            <div className="pt-20">
              <Routes>
                {/* Portfolio */}
                <Route path="/" element={<Home />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Admin */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>

            {/* GLOBAL OVERLAYS */}
            <TerminalOverlay
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
            />

            <GameMap
              isOpen={gameOpen}
              onClose={() => setGameOpen(false)}
            />

          </Router>

          {/* 🔥 FLOATING BUTTONS — moved outside Router, inline styles to avoid filter/transform clipping */}
          <div style={{ position: "fixed", bottom: "24px", right: "24px", display: "flex", flexDirection: "column", gap: "12px", zIndex: 99999 }}>
            <div
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { ctrlKey: true, key: "k" }))}
              style={{ padding: "12px 20px", background: "#FF6B00", color: "white", borderRadius: "9999px", boxShadow: "0 4px 15px rgba(255,107,0,0.4)", cursor: "pointer", fontWeight: "600", userSelect: "none", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Dev ⚡
            </div>
            <div
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { ctrlKey: true, key: "g" }))}
              style={{ padding: "12px 20px", background: "white", border: "1px solid #FFD0B0", color: "#FF6B00", borderRadius: "9999px", boxShadow: "0 4px 15px rgba(255,107,0,0.15)", cursor: "pointer", fontWeight: "600", userSelect: "none", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Explore 🎮
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;