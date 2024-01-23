import Joi from 'joi';

export const authorValidation = Joi.object({
  name: Joi.string().required(),
  birth: Joi.date().required(),
  death: Joi.date(),
});
