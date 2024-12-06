const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userController, changePassword} = require("../controllers/userController");

// Secret key for signing JWT (in a real app, use environment variables)
const JWT_SECRET = 'secret-warehouse';

// Endpoint untuk Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
      // Query untuk mendapatkan user berdasarkan email
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], async (err, results) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ error: 'Database error occurred.' });
          }

          // Jika user tidak ditemukan
          if (results.length === 0) {
              return res.status(404).json({ error: 'User not found.' });
          }

          const user = results[0];

          // Periksa kecocokan password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ error: 'Invalid credentials.' });
          }

          // Generate JWT with user ID and role
            const payload = {
                userId: user.id,
                role: user.role
            };
        
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

          // Jika berhasil login
          res.status(200).json({ message: 'Login successful!', userId: user.id, token, role: user.role });
      });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk Sign Up
router.post('/signup', async (req, res) => {
    console.log('Request body:', req.body);
    const { fullname, email, phone, role, password } = req.body;

    // Validasi input
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'Please fill all required fields' });
    }

    try {
        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update query untuk menyimpan data ke tabel 'users'
        const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [fullname, email, phone, role, hashedPassword], (err, result) => {
            if (err) {
                console.error('Database error:', err); // Logging error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already registered' });
                }
                return res.status(500).json({ error: 'Database error occurred' });
            }
            res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
        });
    } catch (err) {
        console.error('Error during signup:', err); // Logging error
        res.status(500).json({ error: 'Internal server error' });
    }
});
  

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error occurred' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ name: results[0].name, email: results[0].email });
        });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put("/changePassword/:userId", changePassword);

module.exports = router;