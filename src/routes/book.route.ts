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

/**
 * @swagger
 * tags:
 *   name: Book
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - authorId
 *               - publicationYear
 *             properties:
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *                 description: id of author
 *               publicationYear:
 *                 type: date
 *                 format: date
 *             example:
 *               title: fake title
 *               authorId: 65a0b5e081255f98e58f9896
 *               publicationYear: 2002-12-09T00:00:00.000Z
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */
