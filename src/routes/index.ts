import { Router } from "express";
import { AuthRoute } from "../modules/Auth/Auth.route";
import { AdminRoute } from "../modules/Admin/Admin.route";



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/jobs',
    route: AdminRoute
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
