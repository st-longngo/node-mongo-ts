import express, { Router } from 'express';

// Import routes
import { healthCheckRoute, bookRoutes, authorRoutes, authRoutes, docsRoute } from '../routes';
import { config } from '../configs';

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

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route: IRoute) => {
  router.use(route.path, route.route);
});

if (config.env === 'local') {
  /* istanbul ignore next */
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
