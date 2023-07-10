import { generateToken } from './jwt';
import { CookieOptions } from 'express';
import logger from '../logger/index';

export const createOptionsAndToken = async (data: any) => {
  const token: Promise<string> | string = await generateToken(data);
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 900000),
    httpOnly: false
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  return { token, cookieOptions };
};
