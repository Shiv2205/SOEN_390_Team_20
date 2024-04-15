import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import loginRouter from './routes/login'; 
import usersRouter from './routes/users';
import signUpRouter from './routes/signup';
import propertyHandler from './routes/properties';
import accountsHandler from './routes/accounts';
import eventsHandler from './routes/eventsHandler';


// Express app
const app = express();

// Handle CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld', 'https://soen-390-team-20.vercel.app/']
};

// Utils
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/accounts', accountsHandler);
app.use('/properties', propertyHandler);
app.use('/events', eventsHandler);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404, 'Page not found'));
});

// Error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: 'Page not found. Index.ts' }); // Adjusted error message
});

export default app;