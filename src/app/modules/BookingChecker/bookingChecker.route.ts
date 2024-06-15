import express from 'express';
import { bookingCheckerController } from './bookingChecker.controller';

const router = express.Router();

router.get('/', bookingCheckerController.bookingChecker);

export const bookingCheckerRouter = router;
