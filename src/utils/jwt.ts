import * as jwt from 'jsonwebtoken';
import { JWT_KEY_SECRET } from '../config';

export const generateToken = async (userId: string) =>
  await jwt.sign({ userId }, JWT_KEY_SECRET, {
    expiresIn: 604800 // 1 week
  });

export const decodeToken = async (token: string) => await jwt.verify(token, JWT_KEY_SECRET);
