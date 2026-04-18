import pool from "../config/db.js";

// 🔥 GET RESUME
export const getResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resumes ORDER BY id DESC LIMIT 1"
    );

    res.json(result.rows[0] || null);

  } catch (err) {
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
    await pool.query("DELETE FROM resumes");

    await pool.query(
      "INSERT INTO resumes (file) VALUES ($1)",
      [file]
    );

    res.json({ message: "Resume uploaded ✅" });

  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

// 🔥 DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    await pool.query("DELETE FROM resumes");
    res.json({ message: "Resume deleted" });

  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};