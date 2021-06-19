import { combineReducers } from 'redux';

import regionReducer from './pages/Region/RegionSlice';

const rootReducer = combineReducers({
  region: regionReducer,
});

export default rootReducer;
