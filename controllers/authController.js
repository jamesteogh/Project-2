const jwt =require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err)  {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};



exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
}
// exports.login = (req, res, next) => {
//   try{
//     const { email, password } = req.body;
//     // 1) Check if email and password exist
//     if(!email || !password) {

//     }
//     // 2) Check if user exists and password is correct
//     // 3) If everything is ok, send token to client
//     const token = '';
//     res.status(200).json({
//       status: 'success',
//       token
//     })

//   } catch (err)  {
//     res.status(404).json({
//       status: 'fail',
//       message: err
//     });
//   }

// }