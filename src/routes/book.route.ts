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
  .post(validate(bookValidation.updateBook), bookController.updateBook)
  .put(validate(bookValidation.createBook), bookController.putBook)
  .delete(validate(bookValidation.deleteBook), bookController.deleteBook);

export default router;
