"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilis/sendResponse"));
const booking_service_1 = require("./booking.service");
//   RETRIVE ALL BOOKING
const getAllBookings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.getAllBookingsIntoDB();
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            succcess: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Booking retrieved successfully',
        data: result,
    });
}));
//   RETRIVE ALL BOOKING For user
const getUserBookings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.bookingServices.getUserBookingsIntoDB(user);
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            succcess: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Booking retrieved successfully',
        data: result,
    });
}));
const createBookings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user;
    const result = yield booking_service_1.bookingServices.createdBookingIntoDB(user, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Booking created successfully',
        data: result,
    });
}));
const cancelBookings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const result = yield booking_service_1.bookingServices.cancelBookingIntoDB(bookingId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Booking created successfully',
        data: result,
    });
}));
exports.bookingController = {
    createBookings,
    getAllBookings,
    cancelBookings,
    getUserBookings,
};
