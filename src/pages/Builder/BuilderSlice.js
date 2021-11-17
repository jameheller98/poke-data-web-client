/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { builder } from '../../adapters/BuildAdapter';

export async function fetchGenerations(dispatch) {
  dispatch({ type: 'generation/selectLoading' });
  try {
    const response = await builder.getGenerations();
    dispatch({ type: 'generation/generationsLoaded', payload: response });
  } catch (err) {
    dispatch({ type: 'generation/generationError', payload: err });
  }
}

export function fetchGeneration(selectGener) {
  return async function fetchGenerationThunk(dispatch, getState) {
    dispatch({ type: 'generation/generationLoading' });
    try {
      const response = await builder.getGeneration(selectGener);
      const arrPokemon = response.pokemon_species;
      dispatch({ type: 'generation/pokemonReset' });
      dispatch(fetchPokemonsGeneration(arrPokemon.filter((_, index) => index < getState().builder.limitPokemon)));
      dispatch({ type: 'generation/setArrPokemonGeneration', payload: arrPokemon });
      dispatch({ type: 'generation/generationLoaded', payload: response });
      dispatch({ type: 'generation/setCurrentOffsetPokemon' });
    } catch (err) {
      dispatch({ type: 'generation/generationError', payload: err });
    }
  };
}

export function fetchAllGeneration(selectGener) {
  return async function fetchAllGenerationThunk(dispatch) {
    dispatch({ type: 'generation/generationLoading' });
    try {
      const response = await builder.getPokedex(selectGener);
      const arrPokemon = response.pokemon_entries.map((item) => item.pokemon_species);
      dispatch({ type: 'generation/pokemonReset' });
      dispatch(fetchPokemonsGeneration(arrPokemon));
      dispatch({ type: 'generation/generationLoaded', payload: response });
    } catch (err) {
      dispatch({ type: 'generation/generationError', payload: err });
    }
  };
}

export function fetchPokemonsGeneration(arrPokemon) {
  return async function fetchPokemonsPokedexThunk(dispatch) {
    try {
      const arrDetailsPokemon = await Promise.all(
        arrPokemon.map(({ url }) =>
          axios.get('https://pokeapi.co/api/v2/pokemon/' + url.match(/(\d+)(?!.*\d)/)[0]).then((res) => res.data),
        ),
      );
      dispatch({ type: 'generation/pokemonLoaded', payload: arrDetailsPokemon });
    } catch (err) {
      dispatch({ type: 'generation/generationError', payload: err });
    }
  };
}

export function searchPokemon(searchValue) {
  return async function searchPokemonThunk(dispatch, getState) {
    if (searchValue)
      try {
        const searchArrPokemon = await Promise.all(
          getState().builder.generation.pokemon_entries
            ? getState()
                .builder.generation.pokemon_entries.map((item) => item.pokemon_species)
                .filter(({ name }) => name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                .map(({ url }) =>
                  axios
                    .get('https://pokeapi.co/api/v2/pokemon/' + url.match(/(\d+)(?!.*\d)/)[0])
                    .then((res) => res.data),
                )
            : getState()
                .builder.generation.pokemon_species?.filter(({ name }) =>
                  name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
                )
                .sort((a, b) => a.id - b.id)
                .map(({ url }) =>
                  axios
                    .get('https://pokeapi.co/api/v2/pokemon/' + url.match(/(\d+)(?!.*\d)/)[0])
                    .then((res) => res.data),
                ),
        );

        dispatch({ type: 'generation/pokemonSearch', payload: searchArrPokemon });
      } catch (err) {
        dispatch({ type: 'generation/pokedexError', payload: err });
      }
  };
}

export async function nextPokemonsGeneration(dispatch, getState) {
  const stateBuilder = getState().builder;
  const nextArrPokemon = stateBuilder.arrPokemonGeneration.filter(
    (_, index) => index >= stateBuilder.offsetPokemon && index < stateBuilder.offsetPokemon + stateBuilder.limitPokemon,
  );
  dispatch(fetchPokemonsGeneration(nextArrPokemon));
  dispatch({ type: 'generation/setCurrentOffsetPokemon' });
}

export const initSelectPokemon = [
  {
    id: 1,
    select: true,
    reSelect: false,
    item: {},
  },
  {
    id: 2,
    select: false,
    reSelect: false,
    item: {},
  },
  {
    id: 3,
    select: false,
    reSelect: false,
    item: {},
  },
  {
    id: 4,
    select: false,
    reSelect: false,
    item: {},
  },
  {
    id: 5,
    select: false,
    reSelect: false,
    item: {},
  },
  {
    id: 6,
    select: false,
    reSelect: false,
    item: {},
  },
];

export default function builderReducer(
  state = {
    loading: false,
    selectLoading: false,
    error: false,
    data: {},
    generation: {},
    arrPokemonGeneration: [],
    details_pokemon: [],
    details_pokemon_search: [],
    searchValue: '',
    arrSelectPokemon: initSelectPokemon,
    offsetPokemon: 0,
    limitPokemon: 10,
  },
  action,
) {
  switch (action.type) {
    case 'generation/generationLoading':
      return { ...state, loading: true };
    case 'generation/selectLoading':
      return { ...state, selectLoading: true };
    case 'generation/generationFinishLoad':
      return { ...state, loading: false };
    case 'generation/generationsLoaded':
      return { ...state, selectLoading: false, data: action.payload };
    case 'generation/generationLoaded':
      return { ...state, loading: false, generation: action.payload };
    case 'generation/generationError':
      return { ...state, loading: false, error: action.payload };
    case 'generation/pokemonLoaded':
      return {
        ...state,
        loading: false,
        details_pokemon: state.details_pokemon.concat(action.payload),
        details_pokemon_search: [],
      };
    case 'generation/pokemonSearch':
      return { ...state, loading: false, details_pokemon_search: action.payload };
    case 'generation/pokemonReset':
      return { ...state, details_pokemon: [], details_pokemon_search: [] };
    case 'generation/pokemonResetSearch':
      return { ...state, details_pokemon_search: [] };
    case 'generation/setArrSelectPokemon':
      return { ...state, arrSelectPokemon: action.payload };
    case 'generation/setArrPokemonGeneration':
      return { ...state, arrPokemonGeneration: action.payload };
    case 'generation/setCurrentOffsetPokemon':
      return { ...state, offsetPokemon: state.offsetPokemon + state.limitPokemon };
    case 'generation/resetCurrentOffsetPokemon':
      return { ...state, offsetPokemon: 0 };
    case 'generation/setLimitPokemon':
      return { ...state, limitPokemon: action.payload };
    default:
      return state;
  }
}

export function selectDataGenerations(state) {
  return state.builder.data;
}

export function selectDataGeneration(state) {
  return state.builder.generation;
}

export function selectDataPokemon(state, selectGener) {
  if (selectGener === 'national') return [];
  return state.builder.details_pokemon;
}

export function selectDataPokemonSearch(state) {
  return state.builder.details_pokemon_search;
}
