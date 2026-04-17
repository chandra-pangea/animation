import express from 'express';
import cors from 'cors';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- In-memory user store ---
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
}

const users = new Map<string, User>(); // keyed by email

// --- Helpers ---
function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, hash: string): boolean {
  const derived = scryptSync(password, salt, 64);
  return timingSafeEqual(derived, Buffer.from(hash, 'hex'));
}

function makeToken(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Date.now() })).toString('base64url');
  const { createHmac } = require('crypto');
  const sig = createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// --- Register ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are required.' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters.' });
    return;
  }
  if (users.has(email.toLowerCase())) {
    res.status(409).json({ error: 'Email already in use.' });
    return;
  }

  const salt = randomBytes(16).toString('hex');
  const id = randomBytes(8).toString('hex');
  const user: User = { id, name, email: email.toLowerCase(), passwordHash: hashPassword(password, salt), salt };
  users.set(user.email, user);

  const token = makeToken({ sub: user.id, email: user.email, name: user.name });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// --- Login ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const user = users.get(email.toLowerCase());
  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const token = makeToken({ sub: user.id, email: user.email, name: user.name });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
