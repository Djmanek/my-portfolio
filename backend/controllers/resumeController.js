import pool from "../config/db.js";

// 🔥 GET RESUME (SAFE + PRODUCTION READY)
export const getResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.resume ORDER BY id DESC LIMIT 1"
    );

    // ✅ Handle empty table
    if (!result.rows.length) {
      return res.status(200).json(null);
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error("❌ GET RESUME ERROR:", err.message);
    res.status(500).json({
      error: "Failed to fetch resume",
      details: err.message, // helpful for debugging
    });
  }
};

// 🔥 UPLOAD RESUME
export const uploadResume = async (req, res) => {
  try {
    const file = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    // ✅ Keep only latest resume
    await pool.query("DELETE FROM public.resume");

    await pool.query(
      "INSERT INTO public.resume (file) VALUES ($1)",
      [file]
    );

    res.status(200).json({
      message: "Resume uploaded successfully ✅",
      file,
    });

  } catch (err) {
    console.error("❌ UPLOAD RESUME ERROR:", err.message);
    res.status(500).json({
      error: "Upload failed",
      details: err.message,
    });
  }
};

// 🔥 DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM public.resume");

    res.status(200).json({
      message: "Resume deleted successfully 🗑️",
      deletedRows: result.rowCount,
    });

  } catch (err) {
    console.error("❌ DELETE RESUME ERROR:", err.message);
    res.status(500).json({
      error: "Delete failed",
      details: err.message,
    });
  }
};