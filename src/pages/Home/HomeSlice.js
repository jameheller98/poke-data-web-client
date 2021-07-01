import axios from 'axios';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export async function fetchRssItems(dispatch) {
  dispatch({ type: 'home/homeLoading' });
  try {
    const response = await axios('https://tragically-zed-73298.herokuapp.com/rss-pokemon');
    dispatch({ type: 'home/homeLoaded', payload: response.data.reverse() });
  } catch (err) {
    dispatch({ type: 'home/homeLoaded', payload: err });
  }
}

export default function homeReducer(
  state = { loading: false, error: false, data: { rssItems: [] }, currentOffset: 0, limit: 4 },
  action,
) {
  switch (action.type) {
    case 'home/homeLoading':
      return { ...state, loading: true };
    case 'home/homeLoaded':
      return { ...state, loading: false, data: { rssItems: action.payload } };
    case 'home/homeError':
      return { ...state, loading: false, error: action.payload };
    case 'home/setNextOffset':
      return { ...state, currentOffset: state.currentOffset + state.limit };
    default:
      return state;
  }
}

export function setNextOffset() {
  return { type: 'home/setNextOffset' };
}
