import { Router } from 'express';
import {
  createUserValidation,
  loginValidation,
} from '../middlewares/requestValidation.js';
import { createUser, login, logout } from '../controllers/users.js';

const authRouter = Router();

authRouter.post('/signup', createUserValidation, createUser);
authRouter.post('/signin', loginValidation, login);
authRouter.post('/signout', logout);

export default authRouter;
