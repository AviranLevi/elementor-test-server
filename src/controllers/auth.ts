import { Response } from 'express';
import bcrypt from 'bcrypt';
import logger from '../logger';
import { StatusCodes } from '../consts';
import * as utils from '../utils';
import { COOKIE_NAME } from '../config';
import { IUser, IAuthenticateUserRequest, ILoginUserRequest, ILogoutUserRequest } from '../types';
import * as dal from '../dal';

const FILE_PATH = 'controllers/user.ts';

export const loginUser = async (req: ILoginUserRequest, res: Response) => {
  const FUNCTION_NAME = loginUser.name;
  try {
    const { email, password } = req.body;
    const user: IUser = await dal.getUserByEmail(email);

    if (!user) {
      logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: User not found ! - ${email}`);
      res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'User not found!' });
    }

    //check password
    const passwordsAreMatched = await bcrypt.compare(password, user.password);

    if (!passwordsAreMatched) {
      logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: Passwords are not matched ! - ${email}`);
      res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Invalid Password!' });
    }

    //update user's logged-in, logged in time and his logged-in counter by 1
    await dal.updateUserById(user._id, {
      loggedIn: true,
      lastLoginTime: new Date().getTime(),
      loginCounter: user.loginCounter + 1
    });
    const { token, cookieOptions } = await utils.createOptionsAndToken(user._id);

    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    res.status(StatusCodes.ERROR).json({ success: false, error });
  }
};

export const authenticateUser = async (req: IAuthenticateUserRequest, res: Response) => {
  const FUNCTION_NAME = authenticateUser.name;
  try {
    const { userId } = req;
    const user = await dal.getUserById(userId);

    if (!user) {
      logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: User not found! - ${userId}`);
      res.status(StatusCodes.ERROR).json({ success: false, message: 'User not found!' });
    } else {
      await dal.updateUserById(userId, {
        loggedIn: true,
        loginCounter: user.loginCounter + 1,
        lastLoginTime: new Date().getTime()
      });
      res.status(StatusCodes.OK).json({ success: true, data: user });
    }
  } catch (error) {
    res.status(StatusCodes.ERROR).json(error);
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
  }
};

export const userLogout = async (req: ILogoutUserRequest, res: Response) => {
  const FUNCTION_NAME = userLogout.name;
  try {
    const userId = req.userId;
    await dal.updateUserById(userId, { loggedIn: false });
    res.clearCookie(COOKIE_NAME);
    res.status(StatusCodes.OK).json({ success: true });
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    res.status(StatusCodes.ERROR).json(error);
  }
};
