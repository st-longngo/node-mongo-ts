import Joi from 'joi';
import { objectId } from './custom.validation';

export const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required().max(200),
    authorId: Joi.string().required().custom(objectId),
    publicationYear: Joi.date().required(),
  }),
};

export const getBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

export const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().max(200),
    authorId: Joi.string().custom(objectId),
    publicationYear: Joi.date(),
  }),
};

export const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};
