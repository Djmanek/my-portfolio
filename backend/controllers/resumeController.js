import pool from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 GET RESUME
export const getResume = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.resume ORDER BY id DESC LIMIT 1"
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

// 🔥 UPLOAD RESUME
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Upload buffer to Cloudinary as raw PDF
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "resumes",
          public_id: "resume",
          overwrite: true,
          format: "pdf",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const fileUrl = uploadResult.secure_url;

    // ✅ Keep only latest resume in DB
    await pool.query("DELETE FROM public.resume");
    await pool.query(
      "INSERT INTO public.resume (file) VALUES ($1)",
      [fileUrl]
    );

    res.status(200).json({
      message: "Resume uploaded successfully ✅",
      file: fileUrl,
    });

  } catch (err) {
    console.error("❌ UPLOAD RESUME ERROR:", err.message);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

// 🔥 DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    // ✅ Also delete from Cloudinary
    await cloudinary.uploader.destroy("resumes/resume", { resource_type: "raw" });

    await pool.query("DELETE FROM public.resume");

    res.status(200).json({ message: "Resume deleted successfully 🗑️" });

  } catch (err) {
    console.error("❌ DELETE RESUME ERROR:", err.message);
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};