const express = require("express");

const {
  createCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate
} = require("../controllers/certificateController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getCertificates);

// Protected
router.post("/", protect, createCertificate);

router.put(
  "/:id",
  protect,
  updateCertificate
);

router.delete(
  "/:id",
  protect,
  deleteCertificate
);

module.exports = router;