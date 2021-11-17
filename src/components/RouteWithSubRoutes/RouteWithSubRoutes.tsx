import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

export type TRouteProps = {
  private?: boolean;
  path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  exact?: boolean;
  routes?: TRouteProps[] | undefined;
};

const RouteWithSubRoutes: React.FC<TRouteProps> = (route) =>
  route.private ? (
    <PrivateRoute {...route} />
  ) : (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );

export default RouteWithSubRoutes;
