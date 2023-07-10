import { Request, Response, NextFunction } from 'express';
import logger from './index';

export const loggerMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const requestUrl = req.url;
  const requestMethod = req.method;
  const requestBody = JSON.stringify(req.body);
  logger.warn(`${requestMethod} -- ${requestUrl} -- ${requestBody}`);
  next();
};
