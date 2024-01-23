import mongoose from 'mongoose';
import httpStatus from 'http-status';

import { Token } from '../models';
import { ApiError, HttpErrors } from '../libs';
import { TokenTypes } from '../utils';
import { verifyToken } from './token.service';
import { getUserByEmail, getUserById, updateUserById } from './user.service';

export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  // Check user and correct password
  if (!user || !(await user.isPasswordMatch(password))) return;

  return user;
};

export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: TokenTypes.REFRESH, blacklisted: false });

  if (!refreshTokenDoc) throw HttpErrors.NOT_FOUND;

  await refreshTokenDoc.deleteOne();
};

export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, TokenTypes.VERIFY_EMAIL);
    const user = await getUserById(new mongoose.Types.ObjectId(verifyEmailTokenDoc.user));
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: TokenTypes.VERIFY_EMAIL });
    const updatedUser = await updateUserById(user.id, { isEmailVerified: true });
    return updatedUser;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
