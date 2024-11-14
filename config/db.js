// config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: 'root', // Ganti dengan password MySQL Anda
    database: 'warehouse_db'          // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected...');
});

module.exports = db;
