import { Request } from 'express';

export interface IUserAuthenticatorRequest extends Request {
  userId: string;
}
