import pool from "../config/db.js";

export const getSkills = async (req, res) => {
  const result = await pool.query("SELECT * FROM skills");
  res.json(result.rows);
};

export const addSkill = async (req, res) => {
  const { name } = req.body;

  await pool.query("INSERT INTO skills (name) VALUES ($1)", [name]);

  res.json({ message: "Skill added" });
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM skills WHERE id=$1", [id]);

  res.json({ message: "Deleted" });
};