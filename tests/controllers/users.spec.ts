import { Request, Response } from 'express';
import * as userController from '../../src/controllers/user';
import * as dal from '../../src/dal';
import * as mocks from '../mocks/users';
import { ICreateUserRequest, ICreateUserResponse } from '../../src/types/controllers/user';
import { StatusCodes } from '../../src/consts';

jest.mock('../../src/dal');

describe('Users Controller', () => {
  describe('getUsersList', () => {
    const req = {} as Request;

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    it('should return a list of users', async () => {
      const getUsersListSpy = jest.spyOn(dal, 'getUsersList').mockResolvedValueOnce(mocks.userListsMock);
      await userController.getUsersList(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(getUsersListSpy).toBeCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mocks.userListsMock });
    });

    it('should return 500 if getUsersList fails', async () => {
      jest.spyOn(dal, 'getUsersList').mockRejectedValueOnce('error');
      await userController.getUsersList(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'error' });
    });
  });

  describe('createUser', () => {
    const userId = '123456';
    const headers = {
      'user-agent': 'test'
    };
    const body = {
      email: 'test@test.com',
      password: '123456'
    };

    const req = {
      userId,
      headers,
      body
    } as ICreateUserRequest;

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as ICreateUserResponse;

    it('should create a user and return 201', async () => {
      const createUserSpy = jest.spyOn(dal, 'createUser').mockResolvedValueOnce(mocks.userMock);
      await userController.createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(createUserSpy).toBeCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mocks.userMock });
    });

    it('should return 500 if createUser fails', async () => {
      jest.spyOn(dal, 'createUser').mockRejectedValueOnce('error');
      await userController.createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Couldnt create User!' });
    });
  });
});
