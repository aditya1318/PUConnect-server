import { promisify } from 'util';

import jwt from 'jsonwebtoken';

const signAndSendToken = async (user, statusCode, res) => {
  // Create JWT for user
  const token = await promisify(jwt.sign)(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Send token and newly created user
  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token,
      statusCode
    }
  });
};

export default signAndSendToken;
