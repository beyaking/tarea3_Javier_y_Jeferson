const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/AppError');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  // 1 crear una instancia  de la clase user
  const user = new User({ name, email, password, role });
  console.log(user);

  //2 encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  //3 guardar en la base de datos
  await user.save();
  //4 generar el jwt
  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'User created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. Check if user exist && password is correct
  const user = await User.findOne({
    where: { email: email.toLowerCase(), status: 'avalaible' },
  });
console.log('hola2')

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
 //2. if everything ok, send token to client
 const token = await generateJWT(user.id);

 
 res.status(200).json({
  status: 'success',
 token,
 user: {id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
},
});
});