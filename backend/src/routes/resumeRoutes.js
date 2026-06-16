const express = require("express");

const {
  createResume,
  getResume,
  getAllResumes,
  deleteResume
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getResume);

router.get("/all", protect, getAllResumes);

router.post("/", protect, createResume);

router.delete("/:id", protect, deleteResume);

module.exports = router;