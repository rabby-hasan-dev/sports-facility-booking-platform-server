"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../users/user.constant");
const booking_controller_1 = require("./booking.controller");
const booking_zodValidation_1 = require("./booking.zodValidation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(booking_zodValidation_1.BookingSchemaValidation), (0, auth_1.auth)(user_constant_1.USER_Role.user), booking_controller_1.bookingController.createBookings);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_Role.admin), booking_controller_1.bookingController.getAllBookings);
router.get('/user', (0, auth_1.auth)(user_constant_1.USER_Role.user), booking_controller_1.bookingController.getUserBookings);
router.delete('/:bookingId', (0, auth_1.auth)(user_constant_1.USER_Role.user), booking_controller_1.bookingController.cancelBookings);
exports.bookingRouter = router;
