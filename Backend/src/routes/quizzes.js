import express from "express";
import pg from "pg";

const router = express.Router();

const pool = new pg.Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
});

// GET ALL QUIZZES
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM quizzes ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("GET /quizzes error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET QUIZ BY ID
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM quizzes WHERE id=$1", [
            req.params.id,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("GET /quizzes/:id error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CREATE NEW QUIZ
router.post("/", async (req, res) => {
    const { classroomid, type, data } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO quizzes (classroomid, type, data)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [classroomid, type, data]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error("POST /quizzes error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
