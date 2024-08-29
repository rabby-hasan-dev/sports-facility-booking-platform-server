import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import  path from 'path'

const app: Application = express();

//  parser
app.use(express.json());


// middleware

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(cookieParser())


//  APPLICATION ROUTEs
app.use('/api', router);

// Default Home Routes
app.get('/', (req: Request, res: Response) => {
  res.send('SPORTS FACILITY BOOKING PLATFORM SERVER!');
});


//  GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// NOT FOUND ROUTE
app.use(notFoundRoute);

export default app;
