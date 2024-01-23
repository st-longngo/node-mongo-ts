import Joi from 'joi';
import { objectId } from './custom.validation';

export const createAuthor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    birth: Joi.date().required(),
    death: Joi.date(),
  }),
};

export const getAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};

export const updateAuthor = {
  params: Joi.object().keys({
    authorId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    birth: Joi.date(),
    death: Joi.date(),
  }),
};

export const deleteAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};
