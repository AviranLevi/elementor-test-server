export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  loginCounter: number;
  loggedIn: boolean;
  currentLoginTime: number;
  userIp?: string;
  userAgent?: string;
  lastLoginTime?: number;
  updatedAt: number;
  createdAt: number;
}
