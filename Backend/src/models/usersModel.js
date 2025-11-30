import db from "../db/index.js";

export async function findByUsername(username) {
  const res = await db.query("SELECT * FROM users WHERE username = $1", [username]);
  return res.rows[0] || null;
}

export async function createUser({ username, password_hash, role }) {
  const res = await db.query(
    "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role",
    [username, password_hash, role]
  );
  return res.rows[0];
}

export async function findById(id) {
  const res = await db.query("SELECT id, username, role FROM users WHERE id = $1", [id]);
  return res.rows[0] || null;
}

export default { findByUsername, createUser, findById };
