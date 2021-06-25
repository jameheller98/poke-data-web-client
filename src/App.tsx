import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css';
import RouterRegion from './pages/Region/RouterRegion';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainLayout>
              <Home />
            </MainLayout>
          </Route>
          <Route path="/pokedex">
            <MainLayout>
              <div>Pokedex</div>
            </MainLayout>
          </Route>
          <Route path="/about-us">
            <MainLayout>
              <div>About us</div>
            </MainLayout>
          </Route>
          <Route path="/Contact">
            <MainLayout>
              <div>Contact</div>
            </MainLayout>
          </Route>
        </Switch>
        <RouterRegion />
      </Router>
    </>
  );
};

export default App;
