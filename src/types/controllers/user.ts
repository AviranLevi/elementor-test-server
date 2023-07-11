import { Request, Response } from 'express';
import { IUser } from '../models/user';

interface IUserIdRequestHeaders extends Request {
  userId: string;
}

export interface ICreateUserRequest extends IUserIdRequestHeaders {
  body: {
    email: string;
    password: string;
  };
}

export interface ICreateUserResponse extends Response {
  body: IUser;
}

export interface IGetUserByIdRequest extends IUserIdRequestHeaders {}

export interface IGetUserByIdResponse extends Response {
  body: IUser;
}

export interface IUpdateUserByIdRequest extends IUserIdRequestHeaders {}
