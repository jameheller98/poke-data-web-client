import axios from 'axios';
import Parser from 'rss-parser';
// import { xhr } from '../../adapters/XHR';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export async function fetchRssItems(dispatch) {
  dispatch({ type: 'home/homeLoading' });
  try {
    // const response = await xhr.getString('/home/rss-pokemon');
    // FIREBASE
    const response = await axios('https://secure-earth-32143.herokuapp.com/api/home/rss-pokemon');
    const parser = new Parser();
    const rssDataObject = await parser.parseString(response.data);
    dispatch({ type: 'home/homeLoaded', payload: rssDataObject.items.reverse() });
  } catch (err) {
    dispatch({ type: 'home/homeError', payload: err });
  }
}

export default function homeReducer(
  state = { loading: false, error: false, data: { rssItems: [] }, currentOffset: 0, limit: 5 },
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
    case 'home/setLimit':
      return { ...state, limit: action.payload };
    default:
      return state;
  }
}

export function setNextOffset() {
  return { type: 'home/setNextOffset' };
}
