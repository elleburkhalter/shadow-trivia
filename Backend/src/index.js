import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

// Register endpoint
app.post("/api/users/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existing = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Username exists" });
    }

    // Store plain text password (for testing only)
    await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, password, role]
    );

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
  if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
  const user = result.rows[0];
  
  if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});



app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));