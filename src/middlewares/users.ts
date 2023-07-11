import { Request, Response, NextFunction } from 'express';
import { COOKIE_TOKEN_NAME } from '../config';
import { StatusCodes } from '../consts';
import logger from '../logger';
import { decodeToken } from '../utils';
import { IUser, ICookieData, IUserAuthenticatorRequest } from '../types';
import * as dal from '../dal';

const FILE_PATH = 'dal/users.ts';
const COOKIE_NAME = COOKIE_TOKEN_NAME || 'elementor-cookie';
const NOT_AUTH_MESSAGE_ERROR = 'User is not authorized!';

export const userAlreadyExistsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const FUNCTION_NAME = userAlreadyExistsValidator.name;
  const { email } = req.body;
  const userExists: IUser = await dal.getUserByEmail(email);

  if (userExists) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: user already exists - ${email}`);
    res.status(StatusCodes.OK).send({ success: false, message: 'User Already exists' });
  }
  res.status(StatusCodes.OK);
  next();
};

export const tokenValidator = async (req: IUserAuthenticatorRequest, res: Response, next: NextFunction) => {
  const FUNCTION_NAME = tokenValidator.name;
  try {
    let userToken;

    if (req.cookies[COOKIE_NAME]) {
      userToken = req.cookies[COOKIE_NAME];
    }

    if (!userToken) {
      logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: User token is required`);
      res.status(StatusCodes.UNAUTHORIZED).json({ success: false, error: NOT_AUTH_MESSAGE_ERROR });
    }

    const decodedUserToken = (await decodeToken(userToken)) as ICookieData;

    req.userId = decodedUserToken?.userId;
    res.status(StatusCodes.OK);
    next();
  } catch (error) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    return next(new Error('User is not authorized!'));
  }
};
