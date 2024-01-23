import httpStatus from 'http-status';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

import { config } from '../configs';
import { ApiError, HttpErrors } from '../libs';
import { catchAsync, customResponse } from '../utils';
import { AuthenticatedRequestBody, IUserDoc } from '../interfaces';
import { authService, emailService, userService, tokenService } from '../services';
import { SendEmailOptions } from '../services/email.service';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registerUser(req.body);
    // Validation email
    if (!user) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Email already taken'));
    }
    // Generate token
    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.CREATED).send(
      customResponse({
        message: 'Create user successfully',
        status: httpStatus.CREATED,
        data: {
          user,
          tokens,
        },
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);

    // Check user exists and password is correct
    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
    }
    // Generate token
    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.OK).send(
      customResponse({
        message: 'Login user successfully',
        status: httpStatus.OK,
        data: {
          user,
          tokens,
        },
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(async <T>(req: AuthenticatedRequestBody<T>, res: Response) => {
  const user = req.user as IUserDoc;
  // Generate token send mail
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  // Handle send mail
  const options: SendEmailOptions = {
    subject: 'Email verification',
    receiver: {
      name: user.name,
      email: user.email,
    },
    context: {
      verifyEmailUrl: `${config.clientUrl}/verify-email?token=${verifyEmailToken}`,
    },
  };
  const pathTemplate = path.join(__dirname, '../views/verify-email.pug');
  await emailService.sendEmail(options, pathTemplate);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query['token'] as string);
  res.status(httpStatus.NO_CONTENT).send();
});

// export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
//   const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...userWithTokens });
// });

// export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// export const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   await authService.resetPassword(req.query['token'], req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });
