const db = require("../config/db");

const Company = {
  update: (userId, name, address, phone, logo, callback) => {
    const query = `
      UPDATE companies
      SET company_name = ?, address = ?, phone = ?, logo = ?
      WHERE user_id = ?
    `;
    db.query(query, [name, address, phone, logo, userId], callback);
  },

  // New Method to Get Company by User ID
  getByUserId: (userId, callback) => {
    const query = `
      SELECT * FROM companies
      WHERE user_id = ?
    `;
    db.query(query, [userId], callback);
  },
};

module.exports = Company;
