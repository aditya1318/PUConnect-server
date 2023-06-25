
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
dotenv.config();

 // controllers/authController.js


 
 
 export const googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile'] }, (err, user, info) => {
    if (err) { 
      return res.status(500).json({ status: 'error', message: 'An error occurred during authentication.' });
    }
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Authentication failed.' });
    }
    req.logIn(user, function(err) {
      if (err) { 
        return res.status(500).json({ status: 'error', message: 'An error occurred during login.' });
      }
      return res.status(200).json({ status: 'success', message: 'Successfully authenticated.', user: user });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  res.status(200).json({ status: 'success', message: 'Successfully logged out.' });
};

export const getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json({ status: 'success', user: req.user });
  } else {
    res.status(401).json({ status: 'fail', message: 'No user is currently logged in.' });
  }
};
 





export const protect = catchAsync(async (req, res, next) => {
  // Get jwt token from request headers
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return next(new AppError('Please login to access this route', 401));

  // Verify jwt token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find user based on decoded payload
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  // Grant access
  req.user = user;
  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) =>
    next(
      roles.includes(req.user?.role)
        ? null
        : new AppError('You are not allowed to access this route', 403)
    );


   