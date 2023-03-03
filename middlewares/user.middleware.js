const User = require('../models/users.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

 exports.validIfExistUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const user = await User.findOne({
     where: {
      status: true,
      id,
    },
  });
  if (!user) {
    return next(new AppError('User not Found', 404));
  }
  req.user = user;
  next();
}); 

exports.finderId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
