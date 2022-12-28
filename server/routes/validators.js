const { body } = require("express-validator");

const requiredMessage = "Required field value";

const authenticationValidators = [
  body("email").isEmail().withMessage("Wrong format of email"),
  body("email").notEmpty().withMessage(requiredMessage),
  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("Wrong length of password"),
  body("password").notEmpty().withMessage(requiredMessage),
];

const validators = {
  authenticationValidators,
};

module.exports = validators;
