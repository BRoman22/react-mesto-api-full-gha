import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
export default function auth(req, res, next) {
  // const { jwtKey } = req.cookies;
  const { Authorization } = req.headers;

  if ((Authorization && Authorization.startsWith('Bearer '))) {
    const token = Authorization.replace('Bearer ', '');
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
    let payload;
    // if (jwtKey) {
    // const token = jwtKey;
    // const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
    // let payload;

    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return next(new Unauthorized('Необходима авторизация'));
    }

    req.user = payload;
    next();
  } else {
    return next(new Unauthorized('Необходима авторизация'));
  }
}
