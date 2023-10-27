import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';

const { ValidationError } = mongoose.Error;
const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

export const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) return next(new NotFound('Пользователь по указанному _id не найден'));
      return res.send(user);
    })
    .catch(next);
};

export const userUpdateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные при обновлении профиля'));
      }
      next(err);
    });
};

export const userUpdateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные при обновлении аватара'));
      }
      next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwtKey', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 3600000 * 24 * 7,
      });
      return res.send({ message: 'Вы вошли в свой аккаунт' });
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequest('Некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      return next(err);
    });
};

export const logout = (req, res) => {
  res.clearCookie('jwtKey');
  return res.send({ message: 'Вы вышли из своего аккаунта' });
};
