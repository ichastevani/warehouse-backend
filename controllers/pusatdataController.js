// controllers/pusatdataController.js
const pusatdataModel = require('../models/pusatdataModel');

// Get all pusatdata records
const getPusatData = async (req, res) => {
  try {
    const pusatData = await pusatdataModel.getAllPusatData();
    res.status(200).json(pusatData);
  } catch (error) {
    console.error('Error fetching pusatdata:', error);
    res.status(500).json({ error: 'Failed to fetch pusatdata' });
  }
};

// Create a new pusatdata record
const createPusatData = async (req, res) => {
  const { name, email, accessLevel, dataCenter } = req.body;
  try {
    const result = await pusatdataModel.createPusatData(name, email, accessLevel, dataCenter);
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      accessLevel,
      dataCenter
    });
  } catch (error) {
    console.error('Error adding pusatdata:', error);
    res.status(500).json({ error: 'Failed to add pusatdata' });
  }
};

// Update an existing pusatdata record
const updatePusatData = async (req, res) => {
  const { id } = req.params;
  const { name, email, accessLevel, dataCenter } = req.body;
  try {
    await pusatdataModel.updatePusatData(id, name, email, accessLevel, dataCenter);
    res.status(200).json({
      id,
      name,
      email,
      accessLevel,
      dataCenter
    });
  } catch (error) {
    console.error('Error updating pusatdata:', error);
    res.status(500).json({ error: 'Failed to update pusatdata' });
  }
};

// Delete a pusatdata record
const deletePusatData = async (req, res) => {
  const { id } = req.params;
  try {
    await pusatdataModel.deletePusatData(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting pusatdata:', error);
    res.status(500).json({ error: 'Failed to delete pusatdata' });
  }
};

module.exports = {
  getPusatData,
  createPusatData,
  updatePusatData,
  deletePusatData
};
