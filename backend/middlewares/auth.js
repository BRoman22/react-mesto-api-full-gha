import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
  const { jwtKey } = req.cookies;

  try {
    const payload = jwt.verify(jwtKey, secret);
    req.user = { _id: payload._id };
    next();
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
}
// const { authorization } = req.headers;

// if ((authorization && authorization.startsWith('Bearer '))) {
//   const token = authorization.replace('Bearer ', '');
//   const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
//   let payload;
//   if (jwtKey) {
//     const token = jwtKey;
//     const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
//     // let payload;

//     try {
//       payload = jwt.verify(token, secret);
//     } catch (err) {
//       return next(new Unauthorized('Необходима авторизация'));
//     }
//   }

// //     req.user = { _id: payload._id };

// //     next();
// //   } else {
// //     return next(new Unauthorized('Необходима авторизация'));
// //   }
// // }
