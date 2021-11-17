import { combineReducers } from 'redux';

import regionReducer from './pages/Region/RegionSlice';
import pokedexReducer from './pages/Pokedex/PokedexSlice';
import homeReducer from './pages/Home/HomeSlice';
import pokemonReducer from './pages/Pokemon/PokemonSlice';
import authReducer from './pages/Auth/AuthSlice';
import builderReducer from './pages/Builder/BuilderSlice';

const rootReducer = combineReducers({
  region: regionReducer,
  pokedex: pokedexReducer,
  home: homeReducer,
  pokemon: pokemonReducer,
  auth: authReducer,
  builder: builderReducer,
});

export default rootReducer;
