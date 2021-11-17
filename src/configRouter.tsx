import User from './components/User';
import AboutUs from './pages/AboutUs';
import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';
import Register from './pages/Auth/Register';
import Builder from './pages/Builder';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import ListInfoPokedex from './pages/Pokedex/ListInfoPokedex';
import Pokemon from './pages/Pokemon';
import Region from './pages/Region';
import ListInfoRegion from './pages/Region/ListInfoRegion';

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/auth',
    component: Auth,
    routes: [
      {
        path: '/auth/login',
        component: Login,
      },
      {
        path: '/auth/register',
        component: Register,
      },
      {
        path: '/auth/logout',
        component: Logout,
      },
    ],
  },
  {
    path: '/about-us',
    component: AboutUs,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/region',
    component: Region,
    exact: true,
  },
  {
    path: '/region/:name',
    component: ListInfoRegion,
  },
  {
    path: '/pokedex',
    component: Pokedex,
    exact: true,
  },
  {
    path: '/pokedex/:name',
    component: ListInfoPokedex,
  },
  {
    path: '/pokemon/:id',
    component: Pokemon,
  },
  {
    path: '/builder',
    component: Builder,
  },
  {
    path: '*',
    component: Home,
  },
];

export const privateRoutes = [
  {
    private: true,
    path: '/user/:username',
    component: User,
  },
];
