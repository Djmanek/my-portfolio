import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  // 🔥 SUBMIT (CONNECTED TO BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return toast.error("Please fix the errors ⚠️");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Message sent successfully 🚀");

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-gradient-to-b from-white to-orange-50"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Let's Connect 🚀
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Have an idea or opportunity?
          </h3>

          <p className="text-gray-600 mb-6">
            I'm always open to collaborating on exciting projects.
          </p>

          <div className="flex gap-4">
            <a className="p-3 bg-white shadow-md rounded-full text-[#FF6B00]">
              <FaGithub />
            </a>
            <a className="p-3 bg-white shadow-md rounded-full text-[#FF6B00]">
              <FaLinkedin />
            </a>
            <a className="p-3 bg-white shadow-md rounded-full text-[#FF6B00]">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-orange-100 shadow-xl rounded-3xl p-8 space-y-5"
        >
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full p-3 rounded-xl border ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-200 focus:border-[#FF6B00]"
              } outline-none`}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full p-3 rounded-xl border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-200 focus:border-[#FF6B00]"
              } outline-none`}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              rows="4"
              placeholder="Your Message"
              className={`w-full p-3 rounded-xl border ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-200 focus:border-[#FF6B00]"
              } outline-none`}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl shadow-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#FF6B00] to-[#FFA559] text-white hover:scale-105"
            }`}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}