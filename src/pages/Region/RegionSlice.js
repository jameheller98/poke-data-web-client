/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { createSelector } from 'reselect';

export async function fetchRegion(dispatch) {
  dispatch({ type: 'region/regionLoading' });
  try {
    await dispatch(setImageData());
    const response = await axios.get('https://pokeapi.co/api/v2/region/');
    dispatch({ type: 'region/regionLoaded', payload: response.data });
  } catch (err) {
    dispatch({ type: 'region/regionError', payload: err });
  }
}

export function fetchDetailRegions(name) {
  return async function fetchDetailRegionsThunk(dispatch) {
    dispatch({ type: 'region/regionLoading' });
    try {
      await dispatch(setImageData());
      const response = await axios.get(`https://pokeapi.co/api/v2/region/${name}`);
      dispatch({ type: 'region/regionLoaded', payload: response.data });
    } catch (err) {
      dispatch({ type: 'region/regionError', payload: err });
    }
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
    searchValue: '',
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
    case 'region/setSearchValue':
      return { ...state, searchValue: action.payload };
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
  const imageData = [
    { large: '/images/regions/1-kanto-large.webp', small: '/images/regions/1-kanto-small.webp' },
    { large: '/images/regions/2-johto-large.webp', small: '/images/regions/2-johto-small.webp' },
    { large: '/images/regions/3-hoenn-large.webp', small: '/images/regions/3-hoenn-small.webp' },
    { large: '/images/regions/4-sinnoh-large.webp', small: '/images/regions/4-sinnoh-small.webp' },
    { large: '/images/regions/5-unova-large.webp', small: '/images/regions/5-unova-small.webp' },
    { large: '/images/regions/6-kalos-large.webp', small: '/images/regions/6-kalos-small.webp' },
    { large: '/images/regions/7-alola-large.webp', small: '/images/regions/7-alola-small.webp' },
    { large: '/images/regions/8-galar-large.webp', small: '/images/regions/8-galar-small.webp' },
  ];

  return { type: 'region/setImageData', payload: imageData };
}

export function setSearchValue(searchValue) {
  return { type: 'region/setSearchValue', payload: searchValue };
}

export function selectStateRegion(state) {
  return state.region;
}

export const selectDataRegion = createSelector(
  (state) => state.region,
  (region) => region.data,
);

export function selectDataLocationRegion({
  region: {
    data: { locations },
    searchValue,
  },
}) {
  if (searchValue) {
    return locations.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
  return locations;
}
