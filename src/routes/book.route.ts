import express from 'express';

import { bookController } from '../controllers';
import { bookValidation } from '../validations';
import { isAuth, validate } from '../middlewares';

const router = express.Router();

router
  .route('/')
  .get(bookController.getBooks)
  .post(isAuth, validate(bookValidation.createBook), bookController.createBook);

router
  .route('/:bookId')
  .get(validate(bookValidation.getBook), bookController.getBook)
  .post(isAuth, validate(bookValidation.updateBook), bookController.updateBook)
  .put(isAuth, validate(bookValidation.createBook), bookController.putBook)
  .delete(isAuth, validate(bookValidation.deleteBook), bookController.deleteBook);

export default router;
