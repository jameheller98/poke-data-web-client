import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import RouteWithSubRoutes, { TRouteProps } from '../../components/RouteWithSubRoutes/RouteWithSubRoutes';

const Auth: React.FC<TRouteProps> = ({ routes }) => {
  return (
    <>
      <Switch>
        {routes &&
          routes.map((route, index) => {
            return <RouteWithSubRoutes key={index} {...route} />;
          })}
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </>
  );
};

Auth.propTypes = {
  routes: PropTypes.any.isRequired,
};

export default Auth;
