"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../users/user.constant");
const facility_controller_1 = require("./facility.controller");
const facility_zodValidation_1 = require("./facility.zodValidation");
const router = express_1.default.Router();
router.get('/', facility_controller_1.facilityController.getFacility);
router.post('/', (0, validateRequest_1.default)(facility_zodValidation_1.FacilitySchemaValidation), (0, auth_1.auth)(user_constant_1.USER_Role.admin), facility_controller_1.facilityController.createFacility);
router.put('/:id', (0, validateRequest_1.default)(facility_zodValidation_1.updateFacilitySchemaValidation), (0, auth_1.auth)(user_constant_1.USER_Role.admin), facility_controller_1.facilityController.updateFacility);
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_Role.admin), facility_controller_1.facilityController.deleteFacility);
exports.facilityRouter = router;
