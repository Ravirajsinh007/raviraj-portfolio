const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    issuer: {
      type: String,
      required: true,
      trim: true
    },

    issueDate: {
      type: Date,
      required: true
    },

    credentialId: {
      type: String,
      default: ""
    },

    credentialUrl: {
      type: String,
      default: ""
    },

    image: {
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
  "Certificate",
  certificateSchema
);