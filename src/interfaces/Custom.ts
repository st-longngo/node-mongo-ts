import { Request } from 'express';
import { IUserDoc } from './User';

export interface AuthenticatedRequestBody<T> extends Request {
  body: T;
  user?: IUserDoc;
}

export interface IAuthRequest extends Request {
  user?: IUserDoc;
}
