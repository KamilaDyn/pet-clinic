import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config';
import logger from './utils/logger';
import appointmentsRouter from './routes/appointmentsRouter';
import usersRouter from './routes/usersRouter';
import loginRouter from './routes/loginInRoutes';
import middlewares from './middlewares';
import staffRoutes from './routes/staffRoutes';
import treatmentsRoutes from './routes/treatmentsRoutes';

const app = express();

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to MonoDB');
  })
  .catch((error) => {
    logger.error('error connecting to Mongo DB: ', error.message);
  });

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/staff', staffRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/login', loginRouter);
app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/appointments', middlewares.userExtractor, appointmentsRouter);

app.use(middlewares.unknownEndpoint);

app.use(middlewares.errorHandler);

export default app;
