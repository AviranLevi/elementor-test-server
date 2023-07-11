import { Request } from 'express';

interface IUserIdRequestHeaders extends Request {
  userId: string;
}

export interface ILoginUserRequest extends IUserIdRequestHeaders {
  body: {
    email: string;
    password: string;
  };
}

export interface IAuthenticateUserRequest extends IUserIdRequestHeaders {}

export interface ILogoutUserRequest extends IUserIdRequestHeaders {}
