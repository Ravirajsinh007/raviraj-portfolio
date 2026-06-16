const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "DevOps",
        "Tools",
        "Other"
      ],
      required: true
    },

    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },

    icon: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    },

    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Skill",
  skillSchema
);