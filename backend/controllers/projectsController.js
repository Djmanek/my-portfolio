import pool from "../config/db.js";

// ✅ GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// ✅ ADD PROJECT (UPDATED)
export const addProject = async (req, res) => {
  try {
    const { title, description, tech, github, live } = req.body;

    // 🔥 VALIDATION
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // 🔥 HANDLE IMAGE
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    // 🔥 HANDLE TECH (string or array)
    let techArray = [];

    if (Array.isArray(tech)) {
      techArray = tech;
    } else if (typeof tech === "string") {
      techArray = tech.split(",").map((t) => t.trim());
    }

    // 🔥 INSERT INTO DB
    await pool.query(
      `INSERT INTO projects (title, description, tech, github, live, image)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description, techArray, github, live, image]
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

    await pool.query(
      "DELETE FROM projects WHERE id=$1",
      [id]
    );

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};