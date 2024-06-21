import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import db from './db.js'; // Sesuaikan dengan lokasi file db.js Anda

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Endpoint untuk registrasi
app.post('/api/auth/register', async (req, res) => {
  const { username, nama, sebagai, email, password, departemen } = req.body;

  try {
    // Check jika user sudah terdaftar berdasarkan email
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru ke database
    await db.query(
      'INSERT INTO users (username, nama, sebagai, email, password, departemen) VALUES (?, ?, ?, ?, ?, ?)',
      [username, nama, sebagai, email, hashedPassword, departemen]
    );

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
