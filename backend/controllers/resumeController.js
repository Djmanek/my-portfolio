import pool from "../config/db.js";

// 🔥 GET RESUME INFO (no filedata — just metadata)
export const getResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, filename, mimetype FROM public.resume ORDER BY id DESC LIMIT 1"
    );

    if (!result.rows.length) {
      return res.status(200).json(null);
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error("❌ GET RESUME ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch resume", details: err.message });
  }
};

// 🔥 SERVE RESUME FILE — streams PDF directly to browser
export const serveResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT filename, mimetype, filedata FROM public.resume ORDER BY id DESC LIMIT 1"
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "No resume found" });
    }

    const { filename, mimetype, filedata } = result.rows[0];
    const buffer = Buffer.from(filedata, "base64");

    res.setHeader("Content-Type", mimetype || "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.send(buffer);

  } catch (err) {
    console.error("❌ SERVE RESUME ERROR:", err.message);
    res.status(500).json({ error: "Failed to serve resume", details: err.message });
  }
};

// 🔥 UPLOAD RESUME — stores as base64 in PostgreSQL
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = req.file;
    const base64Data = buffer.toString("base64");

    await pool.query("DELETE FROM public.resume");
    await pool.query(
      "INSERT INTO public.resume (filename, mimetype, filedata) VALUES ($1, $2, $3)",
      [originalname, mimetype, base64Data]
    );

    res.status(200).json({
      message: "Resume uploaded successfully ✅",
      filename: originalname,
    });

  } catch (err) {
    console.error("❌ UPLOAD RESUME ERROR:", err.message);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

// 🔥 DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    await pool.query("DELETE FROM public.resume");
    res.status(200).json({ message: "Resume deleted successfully 🗑️" });

  } catch (err) {
    console.error("❌ DELETE RESUME ERROR:", err.message);
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};