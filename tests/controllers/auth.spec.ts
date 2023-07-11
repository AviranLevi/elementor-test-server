import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as authController from '../../src/controllers/auth';
import * as dal from '../../src/dal';
import * as utils from '../../src/utils';
import * as mocks from '../mocks/users';
import { ILoginUserRequest } from '../../src/types';
import { StatusCodes } from '../../src/consts/index';

jest.mock('bcrypt');
jest.mock('../../src/dal');
jest.mock('../../src/utils');

describe('Auth Controller', () => {
  describe('loginUser', () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: '123456'
      }
    } as ILoginUserRequest;

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    it('should login a user and return 200', async () => {
      const getUserByEmailSpy = jest.spyOn(dal, 'getUserByEmail').mockResolvedValueOnce(mocks.userMock);
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      const createTokenSpy = jest
        .spyOn(utils, 'createOptionsAndToken')
        .mockResolvedValueOnce({ cookieOptions: {}, token: 'token' });

      await authController.loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(getUserByEmailSpy).toBeCalledTimes(1);
      expect(compareSpy).toBeCalledTimes(1);
      expect(createTokenSpy).toBeCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mocks.userMock });
    });

    it('should return 404 if user is not found', async () => {
      jest.spyOn(dal, 'getUserByEmail').mockReturnValueOnce(null);
      await authController.loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    });
  });
});
