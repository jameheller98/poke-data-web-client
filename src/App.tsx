import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import { routes, privateRoutes } from './configRouter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './pages/Auth/AuthSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser);
  }, []);

  return (
    <>
      <Router>
        <MainLayout>
          <Switch>
            {privateRoutes.map((route, index) => {
              return <RouteWithSubRoutes key={index} {...route} />;
            })}
            {routes.map((route, index) => {
              return <RouteWithSubRoutes key={index} {...route} />;
            })}
          </Switch>
        </MainLayout>
      </Router>
    </>
  );
};

export default App;
