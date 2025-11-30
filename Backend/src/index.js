import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { encryptField, decryptField } from "./utils/crypto.js";

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

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Register endpoint (stores bcrypt password hash)
app.post("/api/users/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) return res.status(400).json({ message: "Missing fields" });

  try {
    const existing = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Username exists" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)",
      [username, hash, role]
    );

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint (verifies bcrypt hash)
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Example endpoints showing field-level encryption usage (optional)
app.post("/api/users/:id/save-secret", async (req, res) => {
  const { id } = req.params;
  const { secret } = req.body;
  if (!secret) return res.status(400).json({ message: "Missing secret" });

  try {
    const encrypted = encryptField(secret);
    await pool.query("ALTER TABLE IF NOT EXISTS users ADD COLUMN IF NOT EXISTS secret_encrypted TEXT", []);
    await pool.query("UPDATE users SET secret_encrypted = $1 WHERE id = $2", [encrypted, id]);
    res.json({ message: "Saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/users/:id/secret", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT secret_encrypted FROM users WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Not found" });
    const encrypted = result.rows[0].secret_encrypted;
    if (!encrypted) return res.json({ secret: null });
    const secret = decryptField(encrypted);
    res.json({ secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));