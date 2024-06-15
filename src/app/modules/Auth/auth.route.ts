import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserSchemaValidation } from '../users/user.zodValidation';
import { authControllers } from './auth.controller';


const router = express.Router();
router.post('/signup', validateRequest(UserSchemaValidation), authControllers.signup)
router.post('/login', authControllers.login);



export const authRouter = router;
