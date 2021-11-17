/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export async function fetchPokedex(dispatch) {
  dispatch({ type: 'pokedex/pokedexLoading' });
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex?offset=0&limit=28');
    dispatch({ type: 'pokedex/pokedexLoaded', payload: response.data });
  } catch (err) {
    dispatch({ type: 'pokedex/pokedexError', payload: err });
  }
}

export function fetchDetailsPokedex(name) {
  return async function fetchDetailsPokedexThunk(dispatch, getState) {
    dispatch({ type: 'pokedex/pokedexLoading' });
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokedex/' + name);
      const arrPokemon = response.data.pokemon_entries.slice(0, getState().pokedex.limit);
      dispatch({ type: 'pokedex/pokemonResetCurrent' });
      dispatch(fetchPokemonsPokedex(arrPokemon));
      dispatch({ type: 'pokedex/pokedexLoaded', payload: response.data });
    } catch (err) {
      dispatch({ type: 'pokedex/pokedexError', payload: err });
    }
  };
}

export function fetchPokemonsPokedex(arrPokemon) {
  return async function fetchPokemonsPokedexThunk(dispatch) {
    dispatch({ type: 'pokedex/pokedexLoading' });
    try {
      const arrDetailsPokemon = await Promise.all(
        arrPokemon.map(({ pokemon_species: { url } }) =>
          axios.get('https://pokeapi.co/api/v2/pokemon/' + url.match(/(\d+)(?!.*\d)/)[0]).then((res) => res.data),
        ),
      );

      dispatch({ type: 'pokedex/pokemonLoaded', payload: arrDetailsPokemon });
    } catch (err) {
      dispatch({ type: 'pokedex/pokedexError', payload: err });
    }
  };
}

export function searchPokemon(searchValue) {
  return async function searchPokemonThunk(dispatch, getState) {
    if (searchValue)
      try {
        const searchArrPokemon = await Promise.all(
          getState()
            .pokedex.data.pokemon_entries?.filter(({ pokemon_species: { name } }) =>
              name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
            )
            .map(({ pokemon_species: { url } }) =>
              axios.get('https://pokeapi.co/api/v2/pokemon/' + url.match(/(\d+)(?!.*\d)/)[0]).then((res) => res.data),
            ),
        );

        dispatch({ type: 'pokedex/pokemonSearch', payload: searchArrPokemon });
      } catch (err) {
        dispatch({ type: 'pokedex/pokedexError', payload: err });
      }
  };
}

export default function pokedexReducer(
  state = {
    loading: false,
    error: false,
    data: {},
    details_pokemon: [],
    details_pokemon_search: [],
    searchValue: '',
    currentOffset: 0,
    limit: 8,
  },
  action,
) {
  switch (action.type) {
    case 'pokedex/pokedexLoading':
      return { ...state, loading: true };
    case 'pokedex/pokedexLoaded':
      return { ...state, loading: false, data: action.payload };
    case 'pokedex/pokedexError':
      return { ...state, loading: false, error: action.payload };
    case 'pokedex/setSearchValue':
      return { ...state, searchValue: action.payload };
    case 'pokedex/pokemonLoaded':
      return {
        ...state,
        loading: false,
        details_pokemon: state.details_pokemon.concat(action.payload),
        details_pokemon_search: [],
      };
    case 'pokedex/pokemonSearch':
      return { ...state, loading: false, details_pokemon_search: action.payload };
    case 'pokedex/pokemonReset':
      return { ...state, details_pokemon: [], details_pokemon_search: [] };
    case 'pokedex/pokemonResetCurrent':
      return { ...state, currentOffset: 0 };
    case 'pokedex/pokemonResetSearch':
      return { ...state, details_pokemon_search: [] };
    case 'pokedex/setNextOffset':
      return { ...state, currentOffset: state.currentOffset + state.limit };
    case 'pokedex/setLimit':
      return { ...state, limit: action.payload };
    default:
      return state;
  }
}

export function setSearchValue(searchValue) {
  return { type: 'pokedex/setSearchValue', payload: searchValue };
}

export function setNextOffset() {
  return { type: 'pokedex/setNextOffset' };
}

export function selectStatePokedex(state) {
  return state.pokedex;
}

export function selectDataPokedex(state) {
  return state.pokedex.data;
}

export function selectDataResultsPokedex({
  pokedex: {
    data: { results },
    searchValue,
  },
}) {
  if (searchValue) {
    return results.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
  return results;
}
