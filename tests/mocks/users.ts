import { IUser } from '../../src/types';
import { v4 as uuid } from 'uuid';

export const userMock: IUser = {
  _id: uuid(),
  email: 'test@test.com',
  password: '123456',
  userName: 'test',
  userAgent: 'test',
  userIp: 'test',
  loginCounter: 1,
  loggedIn: true,
  currentLoginTime: new Date().getTime(),
  updatedAt: new Date().getTime(),
  createdAt: new Date().getTime()
};

export const userListsMock: IUser[] = [userMock, userMock, userMock];
