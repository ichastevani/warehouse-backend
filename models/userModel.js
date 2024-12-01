const mysql = require('mysql2');

// Buat koneksi database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Ganti sesuai dengan password MySQL Anda
    database: 'expressdb', // Nama database
});

// Fungsi untuk menyimpan user ke database
const createUser = (fullname, email, phone, role, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (fullname, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [fullname, email, phone, role, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { createUser };