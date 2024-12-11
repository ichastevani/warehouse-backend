const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan koneksi DB sudah benar

// Mendapatkan semua data reminders
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            r.id, 
            r.name, 
            r.expirationDate AS expirationDate, 
            r.updatedBy AS updatedBy,
            r.selectedProduct
        FROM 
            reminders r
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reminders:', err.message);
            return res.status(500).json({ error: 'Failed to fetch reminders' });
        }
        res.status(200).json(results);
    });
});

// Mendapatkan reminder berdasarkan ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            r.id, 
            r.name, 
            r.expirationDate AS expirationDate, 
            r.updatedBy AS updatedBy,
            r.selectedProduct AS productId  // Mengambil selectedProduct sebagai productId
        FROM 
            reminders r
        WHERE 
            r.id = ?;
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching reminder by ID:', err.message);
            return res.status(500).json({ error: 'Failed to fetch reminder' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Menambahkan reminder baru
router.post('/', (req, res) => {
    const { name, expirationDate, updatedBy, selectedProduct } = req.body;
    const sql = 'INSERT INTO reminders (name, expirationDate, updatedBy, selectedProduct) VALUES (?, ?, ?, ?)';

    // Menyimpan pengingat baru ke database
    db.query(sql, [name, expirationDate, updatedBy, selectedProduct], (err, result) => {
        if (err) {
            console.error('Error creating reminder:', err.message);
            return res.status(500).json({ error: 'Failed to create reminder' });
        }
        res.status(201).json({ message: 'Reminder created successfully', id: result.insertId });
    });
});

// Mengedit reminder berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, expirationDate, updatedBy, selectedProduct } = req.body;
    const sql = 'UPDATE reminders SET name = ?, expirationDate = ?, updatedBy = ?, selectedProduct = ? WHERE id = ?';

    // Memperbarui pengingat di database
    db.query(sql, [name, expirationDate, updatedBy, selectedProduct, id], (err, result) => {
        if (err) {
            console.error('Error updating reminder:', err.message);
            return res.status(500).json({ error: 'Failed to update reminder' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.status(200).json({ message: 'Reminder updated successfully' });
    });
});

// Menghapus reminder berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM reminders WHERE id = ?';

    // Menghapus pengingat dari database
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting reminder:', err.message);
            return res.status(500).json({ error: 'Failed to delete reminder' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.status(200).json({ message: 'Reminder deleted successfully' });
    });
});

module.exports = router;
