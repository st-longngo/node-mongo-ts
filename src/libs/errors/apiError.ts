import httpStatus from 'http-status';

class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  override stack?: string;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export class ApiError extends BaseError {
  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(statusCode, message, isOperational, stack);
  }
}

export class HttpErrors {
  static BAD_REQUEST = new ApiError(httpStatus.BAD_REQUEST, 'Bad request');
  static UNAUTHORIZED = new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  static FORBIDDEN = new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  static NOT_FOUND = new ApiError(httpStatus.NOT_FOUND, 'Not found');
  static INTERNAL_SERVER_ERROR = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
}
