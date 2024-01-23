import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { HttpErrors, ApiError } from '../libs';
import { authorService } from '../services';
import { IAuthor } from '../interfaces';
import { customResponse, catchAsync } from '../utils';

export const getAuthors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await authorService.getAllAuthor();

    res.status(httpStatus.OK).send(
      customResponse<typeof authors>({
        message: authors?.length ? 'Successful Found Authors' : 'No Author found',
        status: httpStatus.OK,
        data: authors,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const getAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;
  try {
    const author = await authorService.getAuthorById(authorId);

    // Check author exists
    if (!author) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Author not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof author>({
        message: 'Successful found author',
        status: httpStatus.OK,
        data: author,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const createAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data: IAuthor = req.body;

  try {
    // Check author exists
    if (await authorService.getAuthorByName(data.name)) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Author already exists'));
    }

    const newAuthor = await authorService.createAuthor(data);

    res.status(httpStatus.CREATED).send(
      customResponse<typeof newAuthor>({
        message: 'Successful create author',
        status: httpStatus.CREATED,
        data: newAuthor,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const updateAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req?.params?.authorId;
  const data: IAuthor = req.body;

  try {
    const newAuthor = await authorService.updateAuthorById(authorId, data);

    if (!newAuthor) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Author not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof newAuthor>({
        message: 'Update author successfully',
        status: httpStatus.OK,
        data: newAuthor,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const putAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req?.params?.authorId;
  const data: IAuthor = req.body;

  try {
    const newAuthor = await authorService.putAuthorById(authorId, data);

    if (!newAuthor) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Author not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof newAuthor>({
        message: 'Upsert author successfully',
        status: httpStatus.OK,
        data: newAuthor,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const deleteAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req?.params?.authorId;

  try {
    const author = await authorService.deleteAuthorById(authorId);

    if (!author) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Author not found'));
    }

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});
