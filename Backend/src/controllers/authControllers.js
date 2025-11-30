import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export async function register(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password and role are required' });
  }

  const existingUser = await usersModel.findByUsername(username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await usersModel.createUser({ username, password_hash: hash, role });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ user, token });
}

export async function login(req, res) {
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

export default { register, login };