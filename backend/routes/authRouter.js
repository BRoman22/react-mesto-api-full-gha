import { Router } from 'express';
import {
  createUserValidation,
  loginValidation,
} from '../middlewares/requestValidation';
import { createUser, login, logout } from '../controllers/users';

const authRouter = Router();

authRouter.post('/signup', createUserValidation, createUser);
authRouter.post('/signin', loginValidation, login);
authRouter.post('/signout', logout);

export default authRouter;
