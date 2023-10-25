import { Router } from 'express';
import {
  getUserByIdValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
} from '../middlewares/requestValidation.js';
import {
  getUsers,
  getCurrentUserInfo,
  getUserById,
  userUpdateProfile,
  userUpdateAvatar,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUserInfo);
userRouter.get('/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/me', updateUserProfileValidation, userUpdateProfile);
userRouter.patch('/me/avatar', updateUserAvatarValidation, userUpdateAvatar);

export default userRouter;
