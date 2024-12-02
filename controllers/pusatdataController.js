const pusatdataModel = require('../models/pusatdataModel');

// Get paginated pusatdata records
const getPaginatedPusatData = async (req, res) => {
  const { page = 1, limit = 50 } = req.query; // Default page = 1 and limit = 10
  const offset = (page - 1) * limit;

  try {
    const pusatData = await pusatdataModel.getPaginatedPusatData(limit, offset);
    const totalRecords = await pusatdataModel.getPusatDataCount();

    res.status(200).json({
      data: pusatData,
      totalRecords,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / limit),
    });
  } catch (error) {
    console.error('Error fetching paginated pusatdata:', error);
    res.status(500).json({ error: 'Failed to fetch paginated pusatdata' });
  }
};

// Create a new pusatdata record
const createPusatData = async (req, res) => {
  const { name, email, access_level, data_center } = req.body;
  try {
    const result = await pusatdataModel.createPusatData(name, email, access_level, data_center);
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      access_level,
      data_center,
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
      dataCenter,
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
  getPaginatedPusatData,
  createPusatData,
  updatePusatData,
  deletePusatData,
};
