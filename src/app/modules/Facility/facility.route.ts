import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../users/user.constant';
import { facilityController } from './facility.controller';

const router = express.Router();


router.get('/', facilityController.getFacility)
router.post('/', auth(USER_Role.admin), facilityController.createFacility)
router.put('/:id', facilityController.updateFacility)
router.delete('/:id', facilityController.deleteFacility)




export const facilityRouter = router;
