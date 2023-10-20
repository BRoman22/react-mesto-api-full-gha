import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import authRouter from './auth';
import auth from '../middlewares/auth';
import NotFound from '../errors/NotFound';

const routes = Router();

routes.use('/', authRouter);
routes.use(auth);
routes.use('/users', userRouter);
routes.use('/cards', cardRouter);
routes.use('*', (req, res, next) => {
  next(new NotFound('Такой ресурс еще не создан'));
});

export default routes;
