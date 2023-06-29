import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';

import questionPostRoutes from './routes/questionPost.routes.js';
import userRoutes from './routes/user.routes.js';
import userAuthencationRoutes from './routes/authentication.routes.js';





import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/error.controller.js';


// Create main app
const app = express();

// Configure CORS
app.use(cors());

// Parse json in request into req.body
app.use(express.json());

// Serve static files
app.use(express.static('./public'));

// Limit requests from same API
app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compress responses
app.use(compression());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Define routes
//app
 // .use('/api/users', userRouter);

 app.use('/api/user/questionPosts', questionPostRoutes)
    .use('/api/user',userRoutes)
    .use('/api/user/authenticate',userAuthencationRoutes);


// Create 404 error
app.all('*', (req, res, next) =>
  next(
    new AppError(
      `The requested resource ${req.originalUrl} was not found on this server`,
      404
    )
  )
);

app.use(globalErrorHandler);

// Export the app for use in server.js
export default app;
