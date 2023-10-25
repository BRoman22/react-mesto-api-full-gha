import { Router } from 'express';
import userRouter from './userRouter.js';
import cardRouter from './cardRouter.js';
import authRouter from './authRouter.js';
import auth from '../middlewares/auth.js';
import NotFound from '../errors/NotFound.js';

const routes = Router();

routes.use('/', authRouter);
routes.use(auth);
routes.use('/users', userRouter);
routes.use('/cards', cardRouter);
routes.use('*', (req, res, next) => {
  next(new NotFound('Такой ресурс еще не создан'));
});

export default routes;
