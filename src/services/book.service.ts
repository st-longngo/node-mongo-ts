import { IBook } from '../interfaces';
import { Book } from '../models';

export const getAllBook = async () => Book.find({}).populate('authorId');

export const getBookById = async (bookId: string) => Book.findById(bookId).populate('authorId');

export const createBook = async (data: IBook) => Book.create(data);

export const updateBookById = async (bookId: string, data: IBook) => {
  const book = await Book.findById(bookId);
  // Check book exists
  if (!book) return;

  Object.assign(book, data);
  await book.save();
  return book;
};

export const putBookById = async (bookId: string, data: IBook) => {
  // Pass the id of the object you want to update
  // Data is for the new body you are updating the old one with
  // new: true, so the dats being returned, is the update one
  const book = await Book.findByIdAndUpdate({ _id: bookId }, data, { new: true });
  // Check book exists
  if (!book) return;

  return book;
};

export const deleteBookById = async (bookId: string) => {
  const book = await Book.findByIdAndDelete(bookId);
  // Check book exists
  if (!book) return;

  return book;
};
