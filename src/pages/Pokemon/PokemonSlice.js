import axios from 'axios';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function fetchSpeciesPokemon(idPokemon) {
  return async function fetchSpeciesPokemonThunk(dispatch) {
    dispatch({ type: 'pokemon/pokemonLoading' });
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + idPokemon);
      dispatch({ type: 'pokemon/speciesPokemonLoaded', payload: response.data });
      const pokedexNumbers = response.data.pokedex_numbers;
      const dataPokedexNumbers = await Promise.all(
        response.data.pokedex_numbers
          .filter((pokedex_number) => pokedex_number.pokedex.name !== 'national')
          .map((pokedex_number) => axios.get(pokedex_number.pokedex.url).then((res) => res.data)),
      ).then(
        async (response) =>
          await Promise.all(
            response.map(async (pokedex_number) => ({
              ...pokedex_number,
              version_groups: await Promise.all(
                pokedex_number.version_groups.map(async (version) => ({
                  ...version,
                  id: Number(version.url.match(/(\d+)(?!.*\d)/)[0]),
                  entry_number: pokedexNumbers.filter((item) => item.pokedex.name === pokedex_number.name).pop()
                    .entry_number,
                  version_group: await axios.get(version.url).then((res) => res.data),
                })),
              ),
            })),
          ),
      );

      dispatch({ type: 'pokemon/pokedexNumbersLoaded', payload: dataPokedexNumbers });
    } catch (err) {
      dispatch({ type: 'pokemon/pokemonError', payload: err });
    }
  };
}

export function fetchPokemon(idPokemon) {
  return async function fetchPokemonThunk(dispatch) {
    dispatch({ type: 'pokemon/pokemonLoading' });
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + idPokemon);
      dispatch({ type: 'pokemon/PokemonLoaded', payload: response.data });
    } catch (err) {
      dispatch({ type: 'pokemon/pokemonError', payload: err });
    }
  };
}

export default function pokemonReducer(state = { loading: false, error: false, data: {} }, action) {
  switch (action.type) {
    case 'pokemon/pokemonLoading':
      return { ...state, loading: true };
    case 'pokemon/PokemonLoaded':
      return { ...state, loading: false, data: { ...state.data, pokemon: action.payload } };
    case 'pokemon/speciesPokemonLoaded':
      return { ...state, data: { ...state.data, species: action.payload } };
    case 'pokemon/pokemonError':
      return { ...state, error: action.payload };
    case 'pokemon/pokedexNumbersLoaded':
      return { ...state, loading: false, data: { ...state.data, pokedex_numbers: action.payload } };
    default:
      return state;
  }
}

export function selectSpeciesPokemon(state) {
  return state.pokemon.data.species;
}

export function selectPokemon(state) {
  return state.pokemon.data.pokemon;
}

export function selectPokedexNumbers(state) {
  return state.pokemon.data.pokedex_numbers;
}
