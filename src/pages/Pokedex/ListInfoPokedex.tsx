import ImageLazy from '../../imageLazy.svg';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  fetchDetailsPokedex,
  fetchPokemonsPokedex,
  searchPokemon,
  selectDataPokedex,
  setNextOffset,
} from './PokedexSlice';
import useInfiniteScroll from '../../customHooks/useInfiniteScroll';
import useLazyLoading from '../../customHooks/useLazyLoading';
import { ReplyIcon } from '@heroicons/react/solid';
import './index.scss';
import useDebouncedSearch from '../../customHooks/useDebouncedSearch';
import SearchInput from '../../components/SearchInput/SearchInput';

const ListInfoPokedex: React.FC = () => {
  const bottomBoundaryRef = useRef(null);
  const { name }: { name: string } = useParams();
  const dispatch = useDispatch();
  const dataPokedex = useSelector(selectDataPokedex);
  const currentOffset = useSelector((state: { pokedex: { currentOffset: number } }) => state.pokedex.currentOffset);
  const limit = useSelector((state: { pokedex: { limit: number } }) => state.pokedex.limit);
  const loading = useSelector((state: { pokedex: { loading: boolean } }) => state.pokedex.loading);
  const useSearchPokemon = () => useDebouncedSearch((searchValue: string) => dispatch(searchPokemon(searchValue)));
  const { inputText, setInputText } = useSearchPokemon();
  const detailPokemons = inputText
    ? useSelector((state: { pokedex: { details_pokemon_search: [] } }) => state.pokedex.details_pokemon_search)
    : useSelector((state: { pokedex: { details_pokemon: [] } }) => state.pokedex.details_pokemon);

  useEffect(() => {
    dispatch(fetchDetailsPokedex(name));
  }, []);

  useEffect(() => {
    if (Object.keys(dataPokedex).length !== 0 && currentOffset < dataPokedex.pokemon_entries?.length && !inputText) {
      const arrPokemon = dataPokedex.pokemon_entries.slice(currentOffset, currentOffset + limit);
      dispatch(fetchPokemonsPokedex(arrPokemon));
    }
  }, [currentOffset]);

  useInfiniteScroll(bottomBoundaryRef, dispatch, setNextOffset);
  useLazyLoading('.card-img-top', detailPokemons);

  const listCardPokemon = detailPokemons?.map(
    (
      {
        sprites: {
          versions: {
            ['generation-vii']: {
              ['ultra-sun-ultra-moon']: { front_default: genVII },
            },
          },
          front_default,
        },
        name,
      }: {
        sprites: {
          versions: { ['generation-vii']: { ['ultra-sun-ultra-moon']: { front_default: string } } };
          front_default: string;
        };
        name: string;
      },
      index: number,
    ) => {
      return (
        <figure key={index} className="bg-gray-50 rounded-xl">
          <img
            className="card-img-top m-auto"
            data-src={genVII ? genVII : front_default}
            src={ImageLazy}
            alt={name}
            width="128"
            height="128"
          />
          <figcaption className="text-2xl tracking-wide text-center text-gray-700 mb-3 capitalize">{name}</figcaption>
        </figure>
      );
    },
  );

  return (
    <>
      <div className="px-6 pt-3">
        <Link to="/pokedex" aria-label="BackPokedex">
          <ReplyIcon className="inline-block w-10 text-gray-500" />
        </Link>
      </div>
      <h1 className="py-5 text-4xl font-bold text-center tracking-wide text-gray-800 text-opacity-90">
        Pokedex <span className="capitalize">{dataPokedex.name}</span>
      </h1>
      <SearchInput
        searchValue={inputText}
        onChangeSearchValue={(e) => setInputText(e.target.value)}
        clearSearchValue={() => setInputText('')}
      />
      <section className="grid grid-cols-2 gap-4 px-3 pt-3">{listCardPokemon}</section>
      {loading && (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 m-auto mt-3"></div>
      )}
      <div id="page-bottom-boundary" className="border-red-50 border-2 border-solid mb-3" ref={bottomBoundaryRef}></div>
    </>
  );
};

export default ListInfoPokedex;
