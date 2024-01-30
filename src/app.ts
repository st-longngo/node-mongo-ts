// Import all the dependencies
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

// Import Routes
import router from './api';
import { errorConverter, errorHandler, ApiError } from './libs';

// Import Api Docs
// const swaggerDocument = YAML.load(`${process.cwd()}/swagger/swagger.yaml`);
// const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Access Environment variables
dotenv.config();

// Initialize app with express
const app: express.Application | undefined = express();

// Load App Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

// Serve all static files inside public directory.
app.use('/static', express.static('public'));

// Routes which Should handle the requests
app.use('/api/v1', router);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
