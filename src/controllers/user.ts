import { Request, Response } from 'express';
import logger from '../logger';
import { StatusCodes } from '../consts';
import * as utils from '../utils';
import { COOKIE_NAME } from '../config';
import * as dal from '../dal';
import { IUser, ICreateUserRequest, ICreateUserResponse } from '../types';

const FILE_PATH = 'controllers/user.ts';

export const createUser = async (req: ICreateUserRequest, res: ICreateUserResponse) => {
  const FUNCTION_NAME = createUser.name;
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const userName = email.split('@')[0];
    const userIp = req.ip;
    const dataToDB: Partial<IUser> = {
      email,
      password,
      userName,
      userAgent,
      userIp,
      loginCounter: 1,
      loggedIn: true
    };
    const createdUser: IUser = await dal.createUser(dataToDB);
    const { token, cookieOptions } = await utils.createOptionsAndToken(createdUser._id);

    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.status(StatusCodes.CREATED).json({ success: true, data: createdUser });
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    res.status(StatusCodes.ERROR).json({ success: false, error: 'Couldnt create User!' });
  }
};

export const getUsersList = async (_req: Request, res: Response) => {
  const FUNCTION_NAME = getUsersList.name;
  try {
    const usersList: IUser[] = await dal.getUsersList();
    res.status(StatusCodes.OK).json({ success: true, data: usersList });
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    res.status(StatusCodes.ERROR).json({ success: false, error });
  }
};
