const errorHandler =
require("./middleware/errorMiddleware");

const notFound =
require("./middleware/notFoundMiddleware");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes =require("./routes/contactRoutes");
const skillRoutes =require("./routes/skillRoutes");
const certificateRoutes =require("./routes/certificateRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});
const uploadRoutes =require("./routes/uploadRoutes");
const resumeRoutes = require("./routes/resumeRoutes");;


const connectDB = require("./config/db");

// Connect Database
connectDB();
const app = express();
const authRoutes = require("./routes/authRoutes");
const { protect } =
require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates",certificateRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use(limiter);
app.use("/api/resume", resumeRoutes);
app.use("/api/upload",uploadRoutes);
app.use(notFound);
app.use(errorHandler);

//Temp
app.get(
  "/api/admin",
  protect,
  (req, res) => {
    res.json({
      success: true,
      message:
        "Protected Route Working",
      user: req.user
    });
  }
);

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});