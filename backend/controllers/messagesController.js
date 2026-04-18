import pool from "../config/db.js";

// ✅ GET ALL MESSAGES
export const getMessages = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// ✅ ADD MESSAGE
export const addMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔥 VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    await pool.query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    res.json({ message: "Message saved successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
};