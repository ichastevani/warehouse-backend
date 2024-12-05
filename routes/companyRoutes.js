const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const upload = require("../config/multerConfig");

// Route untuk update atau insert perusahaan
router.post("/updateOrCreateCompany/:userId", upload.single("logo"), companyController.updateOrCreateCompany);

// Route untuk mengambil perusahaan berdasarkan userId
router.get("/:userId", companyController.getCompanyByUserId);

module.exports = router;
