/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { importData } from '../../utilities/utils';

export async function fetchRegion(dispatch) {
  dispatch({ type: 'region/regionLoading' });
  setTimeout(async () => {
    try {
      dispatch(setImageData());
      const response = await axios.get('https://pokeapi.co/api/v2/region/');
      dispatch({ type: 'region/regionLoaded', payload: response.data });
    } catch (err) {
      dispatch({ type: 'region/regionError', payload: err });
    }
  }, 1200);
}

export function fetchDetailRegions(name) {
  return function fetchDetailRegionsThunk(dispatch) {
    dispatch({ type: 'region/regionLoading' });
    setTimeout(async () => {
      try {
        dispatch(setImageData());
        const response = await axios.get(`https://pokeapi.co/api/v2/region/${name}`);
        dispatch({ type: 'region/regionLoaded', payload: response.data });
      } catch (err) {
        dispatch({ type: 'region/regionError', payload: err });
      }
    }, 1200);
  };
}

export default function regionReducer(
  state = {
    loading: false,
    error: false,
    data: {},
    imageData: [],
    activeItem: false,
    currentItem: 0,
  },
  action,
) {
  switch (action.type) {
    case 'region/regionLoading':
      return { ...state, loading: true };
    case 'region/regionLoaded':
      return { ...state, loading: false, data: action.payload };
    case 'region/regionError':
      return { ...state, loading: false, error: action.payload };
    case 'region/toggleActiveItem':
      return { ...state, activeItem: action.payload };
    case 'region/setCurrentItem':
      return { ...state, currentItem: action.payload };
    case 'region/setImageData':
      return { ...state, imageData: action.payload };
    default:
      return state;
  }
}

export function toggleActiveItem(activeItem) {
  return { type: 'region/toggleActiveItem', payload: activeItem };
}

export function setCurrentItem(currentItem) {
  return { type: 'region/setCurrentItem', payload: currentItem };
}

export function setImageData() {
  const imageData = importData(require.context('../../assets/images/regions/', true, /\.(png|jpe?g|svg)$/)).map(
    (item) => item.default,
  );

  return { type: 'region/setImageData', payload: imageData };
}

export function selectStateRegion(state) {
  return state.region;
}

export function selectDataRegion(state) {
  return state.region.data;
}
