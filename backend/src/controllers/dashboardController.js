const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Certificate = require("../models/Certificate");
const Contact = require("../models/Contact");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const [
      projects,
      skills,
      certificates,
      messages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certificate.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({
        isRead: false
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        projects,
        skills,
        certificates,
        messages,
        unreadMessages
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};