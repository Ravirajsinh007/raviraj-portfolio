const {
  body
} = require("express-validator");

const projectValidation = [
  body("title")
    .notEmpty()
    .withMessage(
      "Project title is required"
    ),

  body("slug")
    .notEmpty()
    .withMessage(
      "Project slug is required"
    ),

  body("description")
    .notEmpty()
    .withMessage(
      "Description is required"
    )
];

module.exports = {
  projectValidation
};