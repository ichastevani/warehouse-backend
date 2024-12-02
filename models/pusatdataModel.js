// models/pusatdataModel.js
const db = require('../config/db');

// Get paginated pusatdata records
const getPaginatedPusatData = (limit, offset) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name, email, access_level, data_center 
      FROM pusatdata 
      LIMIT ? OFFSET ?
    `;
    db.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get total count of pusatdata records (for pagination)
const getPusatDataCount = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS total FROM pusatdata';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results[0].total);
    });
  });
};


// Add a new pusatdata record
const createPusatData = (name, email, access_level, data_center) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pusatdata (name, email, access_level, data_center) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, access_level, data_center], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Update an existing pusatdata record
const updatePusatData = (id, name, email, accessLevel, dataCenter) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pusatdata SET name = ?, email = ?, access_level = ?, data_center = ? WHERE id = ?';
    db.query(query, [name, email, accessLevel, dataCenter, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete a pusatdata record
const deletePusatData = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pusatdata WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getPaginatedPusatData,
  getPusatDataCount,
  createPusatData,
  updatePusatData,
  deletePusatData
};
