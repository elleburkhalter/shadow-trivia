import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticate } from "../middlewares/auth.js";
import pg from "pg";

const router = express.Router();
const pool = new pg.Pool({ /* config */ });

// REGISTER
router.post("/register", async (req, res) => {
    const { username, password, role, classroom } = req.body;

    const existing = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );
    if (existing.rows.length > 0) {
        return res.status(400).json({ message: "Username exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
        `INSERT INTO users (username, password, role, classroom)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, role, classroom`,
        [username, hashed, role, classroom || {}]
    );

    res.json(user.rows[0]);
});

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    if (result.rows.length === 0)
        return res.status(404).json({ message: "User not found" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            classroom: user.classroom
        }
    });
});

// ME
router.get("/me", authenticate, async (req, res) => {
    const result = await pool.query(
        "SELECT id, username, role, classroom FROM users WHERE id=$1",
        [req.user.id]
    );

    if (result.rows.length === 0)
        return res.status(404).json({ error: "User not found" });

    res.json(result.rows[0]);
});

export default router;
