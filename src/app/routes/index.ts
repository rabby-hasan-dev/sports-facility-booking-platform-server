import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRouter,
    },

];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));


export default router;
