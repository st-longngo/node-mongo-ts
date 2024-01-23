import express, { Router } from 'express';

// Import routes
import { healthCheckRoute, bookRoutes, authorRoutes, authRoutes } from '../routes';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/authors',
    route: authorRoutes,
  },
  {
    path: '/healthCheck',
    route: healthCheckRoute,
  },
];

defaultIRoute.forEach((route: IRoute) => {
  router.use(route.path, route.route);
});

export default router;
