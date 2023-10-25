import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import limiter from './middlewares/rateLimiter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/routes.js';

const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://mesto.nomoredomainsrocks.ru', 'https://localhost:3000'],
    credentials: true,
    maxAge: 60,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(limiter);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

export default app;
