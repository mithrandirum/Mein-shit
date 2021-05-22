const { check, body, validationResult } = require("express-validator");

exports.validate = [
  function (req, res, next) {
    check("username", "email is required").isEmail();
    check("password", "password is required").isLength({ min: 6 });
    var errorValidation = validationResult(req);
    if (errorValidation) {
      return res.status(500).json({
        error: errorValidation,
      });
    }
    next();
  },
];
