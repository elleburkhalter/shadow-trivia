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

// CREATE CLASSROOM
router.post("/", async (req, res) => {
    const { name, users = [], quizzes = [] } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO classrooms (name, users, quizzes)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [name, users, quizzes]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET CLASSROOM BY ID
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM classrooms WHERE id=$1",
            [req.params.id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Classroom not found" });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LIST ALL CLASSROOMS
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM classrooms");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
