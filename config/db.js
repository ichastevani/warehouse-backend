// config/db.js
const mysql = require('mysql2');

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'bqnr7fptqonzjcrabhbg-mysql.services.clever-cloud.com',               // Host database (tetap 'localhost' jika berjalan di lokal)
    user: 'uh0vl0limzhjwyou',                    // Username MySQL Anda
    password: 'w9vNuz67MeUntM0euYg6',                // Password MySQL Anda
    database: 'bqnr7fptqonzjcrabhbg',        // Nama database Anda
    multipleStatements: true         // Jika perlu menjalankan beberapa query dalam 1 perintah
});

// Cek koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Database connected...');
});

// Tambahkan logging untuk semua query (opsional, untuk debugging)
db.on('enqueue', function (sequence) {
    if (sequence.sql) {
        console.log('Executing query:', sequence.sql);
    }
});

module.exports = db;