const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
    where: {
      status: 'available',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Users found',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(201).json({
    status: 'success',
    message: 'User found',
    user,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  const verificPassword = await bcrypt.compare(currentPassword, user.password);

  if (!verificPassword) {
    return next(new AppError('incorrent password', 401));
  }

  const salt = await bcrypt.genSalt(10);

  const encriptPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptPassword,
    passwordChangeAt: new Date(),
  });

   res.status(201).json({
    status: 'success',
    message: 'password change',
    
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
