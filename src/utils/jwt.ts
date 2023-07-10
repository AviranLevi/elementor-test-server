import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';

const jwtKey = JWT_KEY || 'elementor-test';

export const generateToken = async (userId: string) =>
  await jwt.sign({ userId }, jwtKey, {
    expiresIn: 604800 // 1 week
  });

export const decodeToken = async (token: string) => await jwt.verify(token, jwtKey);
