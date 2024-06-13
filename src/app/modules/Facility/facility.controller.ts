import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { facilityServices } from "./facility.service";
import { FacilitySchemaValidation, updateFacilitySchemaValidation } from "./facility.zodValidation";


const getFacility = catchAsync(async (req, res, next) => {

    const result = await facilityServices.getFacilityIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Facilities retrieved successfully',
        data: result,
    });

})
const createFacility = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const valdateData = FacilitySchemaValidation.parse(payload);
    const result = await facilityServices.createdFacilityIntoDB(valdateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Facility added successfully',
        data: result,
    });

})


const updateFacility = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const facilityId = req.params?.id;
    const valdateData = updateFacilitySchemaValidation.parse(payload);

    const result = await facilityServices.updatedFacilityIntoDB(valdateData, facilityId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Facility Updated successfully',
        data: result,
    });

})


const deleteFacility = catchAsync(async (req, res, next) => {
    const facilityId = req.params?.id;

    const result = await facilityServices.deleteFacilityIntoDB(facilityId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Facility Deleted successfully',
        data: result,
    });

})

export const facilityController = {
    getFacility,
    createFacility,
    updateFacility,
    deleteFacility
};