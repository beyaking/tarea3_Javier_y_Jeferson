const { validationResult } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);
  console.log('hola')
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};
