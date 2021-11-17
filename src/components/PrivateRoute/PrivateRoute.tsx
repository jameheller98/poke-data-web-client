import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { auth } from '../../adapters/AuthAdapter';
import { TRouteProps } from '../RouteWithSubRoutes/RouteWithSubRoutes';

const PrivateRoute: React.FC<TRouteProps> = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={(props: any) =>
        auth.isLoggedIn() ? (
          <route.component {...props} routes={route.routes} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
