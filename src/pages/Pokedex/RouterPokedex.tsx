import { Route, Switch } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ListInfoPokedex from './ListInfoPokedex';
import Pokedex from './Pokedex';

const RouterPokedex: React.FC = () => (
  <Switch>
    <Route exact path="/pokedex">
      <MainLayout>
        <Pokedex />
      </MainLayout>
    </Route>
    <Route path="/pokedex/:name">
      <MainLayout>
        <ListInfoPokedex />
      </MainLayout>
    </Route>
  </Switch>
);

export default RouterPokedex;
