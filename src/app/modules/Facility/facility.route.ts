import express from 'express';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_Role } from '../users/user.constant';
import { facilityController } from './facility.controller';
import {
  FacilitySchemaValidation,
  updateFacilitySchemaValidation,
} from './facility.zodValidation';

const router = express.Router();

router.get('/', facilityController.getFacility);
router.post(
  '/',
  validateRequest(FacilitySchemaValidation),
  auth(USER_Role.admin),
  facilityController.createFacility,
);
router.put(
  '/:id',
  validateRequest(updateFacilitySchemaValidation),
  auth(USER_Role.admin),
  facilityController.updateFacility,
);
router.delete('/:id', auth(USER_Role.admin), facilityController.deleteFacility);

export const facilityRouter = router;
