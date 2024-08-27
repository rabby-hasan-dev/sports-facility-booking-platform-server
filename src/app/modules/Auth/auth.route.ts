import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserSchemaValidation } from '../users/user.zodValidation';
import { authControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(UserSchemaValidation),
  authControllers.signup,
);
router.post('/login', authControllers.login);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);


export const authRouter = router;
