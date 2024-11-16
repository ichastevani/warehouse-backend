const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Endpoint untuk Sign Up
router.post('/signup', async (req, res) => {
    console.log('Request body:', req.body);
    const { fullname, email, phone, password } = req.body;

    // Validasi input
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'Please fill all required fields' });
    }

    try {
        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update query untuk menyimpan data ke tabel 'users'
        const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(query, [fullname, email, phone, hashedPassword], (err, result) => {
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

module.exports = router;
