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
exports.facilityController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilis/sendResponse"));
const facility_service_1 = require("./facility.service");
const getFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.facilityServices.getFacilityIntoDB();
    if (result.length === 0) {
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
        message: 'Facilities retrieved successfully',
        data: result,
    });
}));
const createFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield facility_service_1.facilityServices.createdFacilityIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Facility added successfully',
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    const facilityId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield facility_service_1.facilityServices.updatedFacilityIntoDB(payload, facilityId);
    if (!result || result == null) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            succcess: false,
            message: " Can't find this Id in database ",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Facility Updated successfully',
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const facilityId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield facility_service_1.facilityServices.deleteFacilityIntoDB(facilityId);
    if (result == null) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            succcess: false,
            message: "No Data Found ",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        succcess: true,
        message: 'Facility Deleted successfully',
        data: result,
    });
}));
exports.facilityController = {
    getFacility,
    createFacility,
    updateFacility,
    deleteFacility,
};
