import jwt from 'jsonwebtoken';
import { parsedEnv as env } from '../env/validate';

export const getJwt = (payload: { _id: string }) => {
  return jwt.sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
};

type JwtPayload = {
  _id: string;
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload;
};
