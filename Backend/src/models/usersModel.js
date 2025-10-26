const db = require('../db');

async function createUser({ username, password_hash }) {
  const res = await db.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     RETURNING id, username, created_at`,
    [username, password_hash]
  );
  return res.rows[0];
}

async function findByUsername(username) {
  const res = await db.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return res.rows[0];
}

module.exports = {
  createUser,
  findByUsername
};