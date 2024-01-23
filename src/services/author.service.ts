import { IAuthor } from '../interfaces';
import { logger } from '../utils';
import { Author } from '../models';

export const getAuthors = async () => {
  try {
    const authors = await Author.find({});
    return authors;
  } catch (error: any) {
    logger.error(error);
  }
};

export const getAuthorById = async (id: string) => {
  try {
    const author = await Author.findById(id);
    return author;
  } catch (error: any) {
    logger.error(error);
  }
};

export const createAuthor = async (data: IAuthor) => {
  try {
    const newAuthor = await Author.create(data);
    return newAuthor;
  } catch (error: any) {
    logger.error(error);
  }
};

export const updateAuthorById = () => {};

export const deleteAuthorById = () => {};
