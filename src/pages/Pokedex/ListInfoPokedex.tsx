import ImageLazy from '../../imageLazy.svg';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  setNextOffset,
  fetchDetailsPokedex,
  fetchPokemonsPokedex,
  searchPokemon,
  selectDataPokedex,
} from './PokedexSlice';
import useInfiniteScroll from '../../customHooks/useInfiniteScroll';
import useLazyLoading from '../../customHooks/useLazyLoading';
import { ReplyIcon } from '@heroicons/react/solid';
import './index.scss';
import useDebouncedSearch from '../../customHooks/useDebouncedSearch';
import SearchInput from '../../components/SearchInput/SearchInput';
import Error from '../Error';
import useWindowSize from '../../customHooks/useWindowSize';
import { padLeft } from '../../utilities/utils';

const ListInfoPokedex: React.FC = () => {
  const { width } = useWindowSize();
  const bottomBoundaryRef = useRef(null);
  const { name }: { name: string } = useParams();
  const dispatch = useDispatch();
  const dataPokedex = useSelector(selectDataPokedex);
  const currentOffset = useSelector((state: { pokedex: { currentOffset: number } }) => state.pokedex.currentOffset);
  const limit = useSelector((state: { pokedex: { limit: number } }) => state.pokedex.limit);
  const loading = useSelector((state: { pokedex: { loading: boolean } }) => state.pokedex.loading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: { pokedex: { error: any } }) => state.pokedex.error);
  const useSearchPokemon = () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDebouncedSearch(
      (searchValue: string) => dispatch(searchPokemon(searchValue)),
      [{ type: 'pokedex/pokemonResetSearch' }, { type: 'pokedex/pokedexLoading' }],
    );
  const { inputText, setInputText } = useSearchPokemon();
  const detailPokemons = inputText
    ? useSelector((state: { pokedex: { details_pokemon_search: [] } }) => state.pokedex.details_pokemon_search)
    : useSelector((state: { pokedex: { details_pokemon: [] } }) => state.pokedex.details_pokemon);

  useEffect(() => {
    if (width > 768 && width < 1024) {
      dispatch({ type: 'pokedex/setLimit', payload: 16 });
    }
    if (width >= 1024 && width < 1280) {
      dispatch({ type: 'pokedex/setLimit', payload: 24 });
    }
    if (width >= 1280) {
      dispatch({ type: 'pokedex/setLimit', payload: 32 });
    }
    const timer = setTimeout(() => {
      dispatch(fetchDetailsPokedex(name));
    }, 100);
    return () => {
      dispatch({ type: 'pokedex/pokemonReset' });
      dispatch({ type: 'pokedex/pokemonResetCurrent' });
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (detailPokemons.length !== 0 && currentOffset < dataPokedex.pokemon_entries?.length && !inputText) {
      const arrPokemon = dataPokedex.pokemon_entries.slice(currentOffset, currentOffset + limit);
      dispatch(fetchPokemonsPokedex(arrPokemon));
    }
  }, [currentOffset]);

  useInfiniteScroll(bottomBoundaryRef, dispatch, setNextOffset);
  useLazyLoading('.card-img-top', detailPokemons);

  const listCardPokemon = detailPokemons?.map(
    (
      {
        id,
        sprites: {
          other: {
            dream_world: { front_default: dream },
          },
          versions: {
            ['generation-vii']: {
              ['ultra-sun-ultra-moon']: { front_default: genVII },
            },
          },
          front_default,
        },
        name,
      }: {
        id: number;
        sprites: {
          other: { dream_world: { front_default: string } };
          versions: {
            ['generation-vii']: { ['ultra-sun-ultra-moon']: { front_default: string } };
          };
          front_default: string;
        };
        name: string;
      },
      index: number,
    ) => {
      return (
        <Link key={index} to={`/pokemon/${id}`} className="relative" onClick={() => window.scrollTo(0, 0)}>
          <figure className="bg-gray-50 rounded-xl pt-6 relative">
            {dream ? (
              <img
                className="absolute z-0 left-1/2 transform -translate-x-1/2 h-32 w-32"
                src={dream}
                alt={name}
                width="128"
                height="128"
              />
            ) : null}
            <img
              className={`card-img-top m-auto relative bg-gray-50${
                dream ? ' transition-opacity hover:opacity-0' : null
              }`}
              data-src={genVII ? genVII : front_default}
              src={ImageLazy}
              alt={name}
              width="128"
              height="128"
            />
            <figcaption className="text-xl tracking-wide text-center text-blue-900 pb-3 capitalize">{name}</figcaption>
          </figure>
          <span className="absolute top-0 right-0 pt-1 pr-3 text-sm text-blue-700">
            #<span style={{ marginLeft: '1px' }}>{padLeft(id, 3)}</span>
          </span>
        </Link>
      );
    },
  );

  if (error) {
    return <Error error={error} />;
  }

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
      <section className="grid grid-cols-2 gap-4 px-3 pt-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {listCardPokemon}
      </section>
      {loading && (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 m-auto mt-3"></div>
      )}
      <div id="page-bottom-boundary" className="border-red-50 border-2 border-solid mb-3" ref={bottomBoundaryRef}></div>
    </>
  );
};

export default ListInfoPokedex;
