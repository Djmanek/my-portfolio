import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, []);

  // 🔥 HANDLE LOGIN
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields are required ⚠️");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // ✅ Save token
      localStorage.setItem("token", data.token);

      toast.success("Login successful 🔥");

      // ✅ Navigate without reload
      navigate("/admin");

    } catch (err) {
      toast.error("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-white to-orange-50">
      
      <div className="p-8 bg-white rounded-2xl shadow-lg w-80 space-y-5 border border-orange-100">
        
        <h2 className="text-xl font-bold text-center text-[#FF6B00]">
          Admin Login
        </h2>

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={form.email}
          className="w-full p-3 border rounded-xl focus:border-[#FF6B00] outline-none"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full p-3 border rounded-xl focus:border-[#FF6B00] outline-none"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF6B00] text-white hover:scale-105"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}