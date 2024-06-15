import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { facilityServices } from "./facility.service";


const getFacility = catchAsync(async (req, res, next) => {

    const result = await facilityServices.getFacilityIntoDB();


    if (!result || result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            succcess: false,
            message: 'No Data Found',
            data: result,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Facilities retrieved successfully',
        data: result,
    });

})
const createFacility = catchAsync(async (req, res, next) => {
    const payload = req.body;

    const result = await facilityServices.createdFacilityIntoDB(payload);


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


    const result = await facilityServices.updatedFacilityIntoDB(payload, facilityId);

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