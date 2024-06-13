import express from 'express';
import { facilityController } from './facility.controller';

const router = express.Router();


router.get('/', facilityController.getFacility)
router.post('/', facilityController.createFacility)
router.put('/:id', facilityController.updateFacility)
router.delete('/:id', facilityController.deleteFacility)




export const facilityRouter = router;
