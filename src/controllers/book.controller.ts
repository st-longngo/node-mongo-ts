import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

import { bookService } from '../services';
import { IBook } from '../interfaces';
import { customResponse, catchAsync } from '../utils';
import { ApiError, HttpErrors } from '../libs';

export const getBooks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBook();

    res.status(httpStatus.OK).send(
      customResponse<typeof books>({
        message: books?.length ? 'Successful Found books' : 'No books found',
        status: httpStatus.OK,
        data: books,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const getBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookService.getBookById(bookId);

    if (!book) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Book not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof book>({
        message: 'Successful Found book',
        status: httpStatus.OK,
        data: book,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const createBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { title, authorId, publicationYear } = req.body;

  const data = {
    title,
    authorId,
    publicationYear,
  } as IBook;

  try {
    const newBook = await bookService.createBook(data);

    res.status(httpStatus.CREATED).send(
      customResponse<typeof newBook>({
        message: 'Successful create book',
        status: httpStatus.CREATED,
        data: newBook,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const updateBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId || '';
  const data = req.body;

  try {
    const newBook = await bookService.updateBookById(bookId, data);

    // Check book exists
    if (!newBook) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Book not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof newBook>({
        message: 'Update book successfully',
        status: httpStatus.OK,
        data: newBook,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const putBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId || '';
  const { title, authorId, publicationYear } = req.body;

  const data = {
    title,
    authorId,
    publicationYear,
  } as IBook;

  try {
    const newBook = await bookService.putBookById(bookId, data);

    // Check book exists
    if (!newBook) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Book not found'));
    }

    res.status(httpStatus.OK).send(
      customResponse<typeof newBook>({
        message: 'Update book successfully',
        status: httpStatus.OK,
        data: newBook,
      })
    );
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});

export const deleteBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId || '';

  try {
    const book = await bookService.deleteBookById(bookId);

    // Check book exists
    if (!book) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Book not found'));
    }

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error: any) {
    throw HttpErrors.INTERNAL_SERVER_ERROR;
  }
});
