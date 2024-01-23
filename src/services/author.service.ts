import { IAuthor } from '../interfaces';
import { Author } from '../models';

export const getAllAuthor = async () => Author.find({});

export const getAuthorById = async (authorId: string) => Author.findById(authorId);

export const getAuthorByName = async (name: string) => Author.findOne({ name });

export const createAuthor = async (data: IAuthor) => Author.create(data);

export const updateAuthorById = async (authorId: string, data: IAuthor) => {
  const author = await Author.findById(authorId);
  // Check author exists
  if (!author) return;

  Object.assign(author, data);
  await author.save();
  return author;
};

export const putAuthorById = async (authorId: string, data: IAuthor) => {
  // Pass the id of the object you want to update
  // Data is for the new body you are updating the old one with
  // new: true, so the dats being returned, is the update one
  const author = await Author.findByIdAndUpdate({ _id: authorId }, data, { new: true });
  // Check author exists
  if (!author) return;

  return author;
};

export const deleteAuthorById = async (authorId: string) => {
  const author = await Author.findByIdAndDelete(authorId);
  // Check author exists
  if (!author) return;

  return author;
};
