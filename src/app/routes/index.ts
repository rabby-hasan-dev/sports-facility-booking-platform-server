import { Router } from 'express';
import { facilityRouter } from '../modules/Facility/facility.route';
import { userRouter } from '../modules/users/user.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRouter,
    },
    {
        path: '/facility',
        route: facilityRouter,
    },

];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));


export default router;
