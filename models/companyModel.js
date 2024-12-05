const db = require("../config/db");

const Company = {
  // Dapatkan perusahaan berdasarkan userId
  getByUserId: (userId, callback) => {
    const query = "SELECT * FROM companies WHERE user_id = ?";
    db.query(query, [userId], callback);
  },

  // Update perusahaan
  update: (userId, name, address, phone, logo, callback) => {
    const query = "UPDATE companies SET company_name = ?, address = ?, phone = ?, logo = ? WHERE user_id = ?";
    db.query(query, [name, address, phone, logo, userId], callback);
  },

  // Insert perusahaan
  create: (userId, name, address, phone, logo, callback) => {
    const query = "INSERT INTO companies (user_id, company_name, address, phone, logo) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [userId, name, address, phone, logo], callback);
  },
};

module.exports = Company;
