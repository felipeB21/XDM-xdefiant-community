const { body } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("Username must not contain spaces");
      }
      return true;
    })
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
