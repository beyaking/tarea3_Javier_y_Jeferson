const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/user.controllers');
const { protect, protectAccountOwner } = require('../middlewares/auth.middleware');
const { finderId, validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', finderId, findOneUser);

router.use(protect)

router.patch(
  '/:id',
  [
    check('name', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),

    validateFields,
    finderId,
    protectAccountOwner
  ],
  
  updateUser
);

router.patch('/password/:id', 
[
  check('currentePassword', 'the current password must be  be mandatory').not().isEmpty(),
  check('newPassword', 'the new password must be mandatory').not().isEmpty(),
  validateFields,
  validIfExistUser,
  protectAccountOwner,
],updatePassword)


router.delete('/:id', finderId, deleteUser);

module.exports = {
  userRouter: router,
};
