const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
require('dotenv').config();

const SALT_ROUNDS = 10;

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const existingUser = await usersModel.findByUsername(username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await usersModel.createUser({ username, password_hash: hash });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ user, token });
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await usersModel.findByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    user: { id: user.id, username: user.username },
    token
  });
}

module.exports = { register, login };