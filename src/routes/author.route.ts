import express from 'express';

import { authorController } from '../controllers';
import { authorValidation } from '../validations';
import { isAuth, validate } from '../middlewares';

const router = express.Router();

router
  .route('/')
  .get(authorController.getAuthors)
  .post(isAuth, validate(authorValidation.createAuthor), authorController.createAuthor);

router
  .route('/:authorId')
  .get(validate(authorValidation.getAuthor), authorController.getAuthor)
  .post(isAuth, validate(authorValidation.updateAuthor), authorController.updateAuthor)
  .put(isAuth, validate(authorValidation.createAuthor), authorController.putAuthor)
  .delete(isAuth, validate(authorValidation.deleteAuthor), authorController.deleteAuthor);

export default router;
