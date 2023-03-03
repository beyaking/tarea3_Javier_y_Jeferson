const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateField.middleware");

const router =Router();

router.post(
    '/signup',
    [
      check('name', 'The user name must mandatory').not().isEmpty(),
      check('email', 'The user name must mandatory').not().isEmpty(),
      check('email', 'The email must be a correct format').isEmail(),
      check('password', 'The password must be a correct format').not().isEmpty(),
      validateFields,

    ],
    createUser
  );

  router.post('/login',
  [
    check('email', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
   check('password', 'The password must be a correct format').not().isEmpty(),
    validateFields
  ],login)


 module.exports={
    authRouter: router,
} 