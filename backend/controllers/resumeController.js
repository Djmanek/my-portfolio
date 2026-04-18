import pool from "../config/db.js";

// 🔥 GET RESUME
export const getResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resume ORDER BY id DESC LIMIT 1"
    );

    res.json(result.rows[0] || null);
  } catch (err) {
    console.error("GET RESUME ERROR:", err);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};

// 🔥 UPLOAD RESUME
export const uploadResume = async (req, res) => {
  try {
    const file = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Only keep latest resume
    await pool.query("DELETE FROM resume");

    await pool.query(
      "INSERT INTO resume (file) VALUES ($1)",
      [file]
    );

    res.json({ message: "Resume uploaded ✅" });
  } catch (err) {
    console.error("UPLOAD RESUME ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// 🔥 DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    await pool.query("DELETE FROM resume");

    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};