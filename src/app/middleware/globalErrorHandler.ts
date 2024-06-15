import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../error/AppError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';
import { TErrorMessages } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //  setting default value

  let statusCode = 500;
  let message = 'something went wrong';

  //  error sources
  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  //   Zod Error Checker

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // UnAuthorized Error Response

  if (errorMessages[0]?.message === 'You have no access to this route') {
    return res.status(statusCode).json({
      succes: false,
      statusCode,
      message,
    });
  }

  //  ultimate return

  return res.status(statusCode).json({
    succes: false,
    message,
    errorMessages,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
