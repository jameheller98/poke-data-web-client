import { combineReducers } from 'redux';

import regionReducer from './pages/Region/RegionSlice';
import pokedexReducer from './pages/Pokedex/PokedexSlice';
import homeReducer from './pages/Home/HomeSlice';

const rootReducer = combineReducers({
  region: regionReducer,
  pokedex: pokedexReducer,
  home: homeReducer,
});

export default rootReducer;
