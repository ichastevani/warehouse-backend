const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const upload = require("../config/multerConfig");

// Existing routes with userId in URL
router.put("/updateCompany/:userId", upload.single("logo"), companyController.updateCompany);

// New Route: Get Company by User ID
router.get("/:userId", companyController.getCompanyByUserId);

module.exports = router;
