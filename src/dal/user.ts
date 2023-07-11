import User from '../models/User';
import { ICreateUser, IUser } from '../types';
import logger from '../logger';

const FILE_PATH = 'dal/users.ts';

export const createUser = async (userData: Partial<IUser>) => {
  const FUNCTION_NAME = createUser.name;
  try {
    const user = await User.create(userData);
    return user;
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    throw new Error(`Couldn't create new user!`);
  }
};

export const getUsersList = async () => {
  const FUNCTION_NAME = getUsersList.name;
  try {
    const users: IUser[] = await User.find({ loggedIn: true }).select({ password: 0 }).lean();
    return users;
  } catch (error: unknown) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    throw new Error('Get users list error');
  }
};

export const getUserByEmail = async (email: string): Promise<IUser> | null => {
  const FUNCTION_NAME = getUserByEmail.name;
  try {
    const user: IUser = await User.findOne({ email }).lean();
    return user;
  } catch (error) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    throw new Error('Ger user by email error!');
  }
};

export const getUserById = async (id: string) => {
  const FUNCTION_NAME = getUserById.name;
  try {
    const user: IUser = await User.findById(id).select({ password: 0 }).lean();
    return user;
  } catch (error) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    throw new Error('Ger user error!');
  }
};

export const updateUserById = async (userId: string, newUserDetails: Partial<IUser>) => {
  const FUNCTION_NAME = updateUserById.name;
  try {
    const dataToUpdate: Partial<IUser> = {
      ...newUserDetails,
      updatedAt: new Date().getTime()
    };
    const user: IUser = await User.findByIdAndUpdate(userId, dataToUpdate).select({ password: 0 }).lean();
    return user;
  } catch (error) {
    logger.error(`${FILE_PATH} :: ${FUNCTION_NAME} :: ${error}`);
    throw new Error('Update user error!');
  }
};
