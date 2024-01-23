import express, { Router } from 'express';

import { authValidation } from '../validations';
import { authController } from '../controllers';
import { validate, isAuth } from '../middlewares';

const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/send-verification-email', isAuth, authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;
