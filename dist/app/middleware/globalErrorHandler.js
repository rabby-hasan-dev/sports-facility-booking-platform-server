"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    //  setting default value 
    let statusCode = 500;
    let message = 'something went wrong';
    //  ultimate return
    return res.status(statusCode).json({
        succes: false,
        message,
        err
    });
};
exports.default = globalErrorHandler;
