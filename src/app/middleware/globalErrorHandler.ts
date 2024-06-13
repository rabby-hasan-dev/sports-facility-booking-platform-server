import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

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

export default globalErrorHandler;
