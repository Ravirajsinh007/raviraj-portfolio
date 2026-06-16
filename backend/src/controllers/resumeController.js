const Resume = require("../models/Resume");

// Create Resume
const createResume = async (req, res) => {
  try {
    const existingActiveResume =
      await Resume.findOne({ active: true });

    if (existingActiveResume) {
      existingActiveResume.active = false;
      await existingActiveResume.save();
    }

    const resume = await Resume.create(
      req.body
    );

    res.status(201).json({
      success: true,
      data: resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Active Resume
const getResume = async (
  req,
  res
) => {
  try {
    const resume =
      await Resume.findOne({
        active: true
      });

    res.status(200).json({
      success: true,
      data: resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Resumes
const getAllResumes = async (
  req,
  res
) => {
  try {
    const resumes =
      await Resume.find()
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Resume
const deleteResume = async (
  req,
  res
) => {
  try {
    const resume =
      await Resume.findByIdAndDelete(
        req.params.id
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Resume not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Resume deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createResume,
  getResume,
  getAllResumes,
  deleteResume
};