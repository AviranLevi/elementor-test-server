import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router';
import { PORT, CONNECTION_STRING, DEV } from './config';
import logger from './logger';
import dotenv from 'dotenv';
import { loggerMiddleware } from './logger/loggerMiddleware';

const app: Application = express();
const port: number | string = PORT;
const url: string = CONNECTION_STRING;
dotenv.config();

const options: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(url, options).then(() => logger.info('DB Connected'));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

if (true) {
  const corsOptions: CorsOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
  };
  app.use(cors(corsOptions));
  logger.info('Cors is running');
}

app.use(loggerMiddleware);
app.use('/api', router);

app.listen(port, () => {
  logger.info(`app is listening to port ${port}`);
});
