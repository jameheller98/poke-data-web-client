/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export async function fetchRegion(dispatch) {
  dispatch({ type: 'region/regionLoading' });
  try {
    dispatch(setImageData());
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
      dispatch(setImageData());
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
  // const imageData = importData(require.context('../../assets/images/regions/', true, /\.(png|jpe?g|svg)$/)).map(
  //   (item) => item.default,
  // );
  const imageData = [
    'https://live.staticflickr.com/65535/51258780299_b7af1f3dc3_z.jpg',
    'https://live.staticflickr.com/65535/51257309432_a2f939bc6d_z.jpg',
    'https://live.staticflickr.com/65535/51257309392_2938d1cf31_z.jpg',
    'https://live.staticflickr.com/65535/51257309352_4a458a99f9_z.jpg',
    'https://live.staticflickr.com/65535/51258238073_6c8f6f1e3a_z.jpg',
    'https://live.staticflickr.com/65535/51258780114_da835e07ba_z.jpg',
    'https://live.staticflickr.com/65535/51258780134_bfe5445c6a_z.jpg',
    'https://live.staticflickr.com/65535/51257309287_edd89d7820_z.jpg',
  ];

  return { type: 'region/setImageData', payload: imageData };
}

export function setSearchValue(searchValue) {
  return { type: 'region/setSearchValue', payload: searchValue };
}

export function selectStateRegion(state) {
  return state.region;
}

export function selectDataRegion(state) {
  return state.region.data;
}
