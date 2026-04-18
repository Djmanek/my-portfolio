import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// 🔥 LOADER
import Loader from "./components/Loader";

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
        // 🔥 MAIN APP WITH SMOOTH TRANSITION
        <motion.div
          key="app"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
        >
          <Router>
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

            {/* ROUTES */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;