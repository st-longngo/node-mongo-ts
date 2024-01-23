import httpStatus from 'http-status';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { ApiError, HttpErrors } from '../libs';
import { config } from '../configs';
import User from '../models/user.model';
import { IAuthRequest, IUserDoc } from '../interfaces';

const isAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req?.headers?.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(HttpErrors.UNAUTHORIZED);
  }

  jwt.verify(token, config.jwt.secret, async (err: VerifyErrors | null, decodedUser: any) => {
    if (err) {
      const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return next(new ApiError(httpStatus.UNAUTHORIZED, errorMessage));
    }
    try {
      const decodedUserInDB = await User.findOne({ _id: decodedUser?.sub });

      if (!decodedUserInDB) return next(HttpErrors.UNAUTHORIZED);

      req.user = decodedUserInDB as IUserDoc;

      // if we did success go to the next middleware
      next();
    } catch (error: any) {
      return next(HttpErrors.INTERNAL_SERVER_ERROR);
    }
  });
};
export default isAuth;
