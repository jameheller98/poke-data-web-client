import { combineReducers } from 'redux';

import regionReducer from './pages/Region/RegionSlice';
import pokedexReducer from './pages/Pokedex/PokedexSlice';

const rootReducer = combineReducers({
  region: regionReducer,
  pokedex: pokedexReducer,
});

export default rootReducer;
