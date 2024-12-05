const Company = require("../models/companyModel");

const companyController = {
  updateCompany: (req, res) => {
    const userId = req.params.userId; // Ambil userId dari parameter URL
    const { name, address, phone } = req.body;
    const logo = req.file ? req.file.path : null; // Mendapatkan path logo jika ada

    // Ambil data perusahaan lama terlebih dahulu
    Company.getByUserId(userId, (err, existingCompany) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to fetch company data" });
      }
      if (existingCompany.length === 0) {
        return res.status(404).json({ success: false, message: "Company not found" });
      }

      const currentLogo = existingCompany[0].logo; // Logo lama
      const updatedLogo = logo || currentLogo; // Pertahankan logo lama jika logo baru tidak ada

      // Lakukan pembaruan data
      Company.update(userId, name, address, phone, updatedLogo, (updateErr, result) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ success: false, message: "Failed to update company" });
        }
        res.status(200).json({ success: true, message: "Company updated successfully" });
      });
    });
  },

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
