const Company = require("../models/companyModel");

const companyController = {
  // Menangani update atau insert perusahaan berdasarkan userId
  updateOrCreateCompany: (req, res) => {
    const userId = req.params.userId;
    const { name, address, phone } = req.body;
    const logo = req.file ? req.file.path : null; // Logo jika ada

    // Mengecek apakah data perusahaan sudah ada berdasarkan userId
    Company.getByUserId(userId, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to fetch company" });
      }

      if (result.length > 0) {
        // Jika perusahaan sudah ada, lakukan update
        Company.update(userId, name, address, phone, logo, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Failed to update company" });
          }
          res.status(200).json({ success: true, message: "Company updated successfully" });
        });
      } else {
        // Jika perusahaan tidak ada, lakukan insert
        Company.create(userId, name, address, phone, logo, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Failed to create company" });
          }
          res.status(201).json({ success: true, message: "Company created successfully" });
        });
      }
    });
  },

  // Ambil perusahaan berdasarkan userId
  getCompanyByUserId: (req, res) => {
    const userId = req.params.userId;
    Company.getByUserId(userId, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to get company data" });
      }
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: "Company not found" });
      }
      res.status(200).json(result[0]);
    });
  },
};

module.exports = companyController;
