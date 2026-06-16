const express = require("express");

const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Route
router.post("/", createMessage);

// Protected Routes
router.get("/", protect, getMessages);

router.patch(
  "/:id/read",
  protect,
  markAsRead
);

router.delete(
  "/:id",
  protect,
  deleteMessage
);

module.exports = router;