const db = require('../config/db');

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

const getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      db.query(query, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]); // Return first result (since id should be unique)
      });
    });
  };

  const updateUserPassword = async (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET password = ? WHERE id = ?";
      db.query(query, [hashedPassword, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

const updateUser = async ({ id, name, email, phone}) => {
    await db.query(
        "UPDATE users SET name = ?, email = ?, phone ? WHERE id = ?",
    [name, email, phone, id]
  );
};
    
module.exports = { createUser, getUserById, updateUser, updateUserPassword };