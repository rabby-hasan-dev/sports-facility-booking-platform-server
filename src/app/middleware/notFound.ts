import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoute = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    succes: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'API NOT FOUND !',
  });
};

export default notFoundRoute;
