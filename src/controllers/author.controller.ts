import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { authorService } from '../services';
import { IAuthor } from '../interfaces';
import { authorValidation } from '../validations/author.validation';
import { customResponse, catchAsync } from '../utils';

export const getAuthors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authors = await authorService.getAuthors();

  res.status(httpStatus.OK).send(
    customResponse<typeof authors>({
      success: true,
      error: false,
      message: authors?.length ? 'Successful Found Authors' : 'No Author found',
      status: httpStatus.OK,
      data: authors,
    })
  );
});

export const getAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const author = await authorService.getAuthorById(id);

  // Check Author exists
  if (!author) {
    res.status(httpStatus.NOT_FOUND).send('Author not found');
  }

  res.status(httpStatus.OK).send(
    customResponse<typeof author>({
      success: true,
      error: false,
      message: 'Successful Found Author',
      status: httpStatus.OK,
      data: author,
    })
  );
});

export const createAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = {
    name: req?.body?.name,
    birth: req?.body?.birth,
    death: req?.body?.death,
  } as IAuthor;

  // Validation the request
  const { error, value } = authorValidation.validate(data);

  if (error) {
    res.status(httpStatus.BAD_REQUEST).send(error.message);
  }

  const newAuthor = await authorService.createAuthor(data);
  res.status(httpStatus.CREATED).send(
    customResponse<typeof newAuthor>({
      success: true,
      error: false,
      message: 'Successful Create Author',
      status: httpStatus.CREATED,
      data: newAuthor,
    })
  );
});

export const updateAuthor = catchAsync(() => {
  authorService.updateAuthorById();
});

export const deleteAuthor = catchAsync(() => {
  authorService.deleteAuthorById();
});
