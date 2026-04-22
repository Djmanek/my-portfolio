import pool from "../config/db.js";

// ✅ GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, description, tech, github, live, imagemime FROM projects ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// ✅ SERVE PROJECT IMAGE
export const serveProjectImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT imagedata, imagemime FROM projects WHERE id=$1",
      [id]
    );

    if (!result.rows.length || !result.rows[0].imagedata) {
      return res.status(404).json({ error: "Image not found" });
    }

    const { imagedata, imagemime } = result.rows[0];
    const buffer = Buffer.from(imagedata, "base64");

    res.setHeader("Content-Type", imagemime || "image/jpeg");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to serve image" });
  }
};

// ✅ ADD PROJECT
export const addProject = async (req, res) => {
  try {
    const { title, description, tech, github, live } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // ✅ Store image as base64 in DB
    let imagedata = null;
    let imagemime = null;

    if (req.file) {
      imagedata = req.file.buffer.toString("base64");
      imagemime = req.file.mimetype;
    }

    // ✅ Handle tech (string or array)
    let techArray = [];
    if (Array.isArray(tech)) {
      techArray = tech;
    } else if (typeof tech === "string") {
      techArray = tech.split(",").map((t) => t.trim());
    }

    await pool.query(
      `INSERT INTO projects (title, description, tech, github, live, imagedata, imagemime)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [title, description, techArray, github, live, imagedata, imagemime]
    );

    res.json({ message: "Project added successfully 🚀" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add project" });
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM projects WHERE id=$1", [id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};