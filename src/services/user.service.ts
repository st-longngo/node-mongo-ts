import mongoose from 'mongoose';
import httpStatus from 'http-status';

import { User } from '../models';
import { ApiError } from '../libs';
import { IUserDoc, NewRegisteredUser, UpdateUserBody } from '../interfaces';

export const registerUser = async (userBody: NewRegisteredUser) => {
  if (await User.isEmailTaken(userBody.email)) return;
  return User.create(userBody);
};

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
