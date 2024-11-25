// models/pusatdataModel.js
const db = require('../config/db');

// Get all pusatdata records
const getAllPusatData = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, email, access_level, data_center FROM pusatdata';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add a new pusatdata record
const createPusatData = (name, email, accessLevel, dataCenter) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pusatdata (name, email, access_level, data_center) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, accessLevel, dataCenter], (err, result) => {
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
  getAllPusatData,
  createPusatData,
  updatePusatData,
  deletePusatData
};
