import { useEffect, useState } from 'react';
import Select, { Option } from '../../components/Select';
import List, { Item } from '../../components/List/List';
import Button from '../../components/Button/Button';
import { ChartPieIcon, PlusIcon, RefreshIcon, XIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllGeneration,
  fetchGeneration,
  fetchGenerations,
  initSelectPokemon,
  nextPokemonsGeneration,
  searchPokemon,
  selectDataGenerations,
  selectDataPokemon,
  selectDataPokemonSearch,
} from './BuilderSlice';
import { padLeft } from '../../utilities/utils';
import useDebouncedSearch from '../../customHooks/useDebouncedSearch';
import SearchInput from '../../components/SearchInput/SearchInput';
import TableBuilderTypes from './TableBuilderTypes';
import { Link } from 'react-router-dom';
import { notification } from '../../components/Notification/Notification';
import useWindowSize from '../../customHooks/useWindowSize';
import { selectCurrentUser } from '../Auth/AuthSlice';
import { builder } from '../../adapters/BuildAdapter';

const Builder: React.FC = () => {
  const { width } = useWindowSize();
  const [selectGener, setSelectGener] = useState('');
  const arrSelectPokemon = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: { builder: { arrSelectPokemon: any[] } }) => state.builder.arrSelectPokemon,
  );
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: { builder: { loading: boolean } }) => state.builder.loading);
  const selectLoading = useSelector((state: { builder: { selectLoading: boolean } }) => state.builder.selectLoading);
  const generations = useSelector(selectDataGenerations);
  const currentUser = useSelector(selectCurrentUser);
  const useSearchPokemon = () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDebouncedSearch(
      (searchValue: string) => dispatch(searchPokemon(searchValue)),
      [{ type: 'generation/pokemonResetSearch' }, { type: 'generation/generationLoading' }],
    );
  const { inputText, setInputText } = useSearchPokemon();
  const detailPokemons = inputText
    ? useSelector(selectDataPokemonSearch)
    : useSelector((state) => selectDataPokemon(state, selectGener));

  useEffect(() => {
    inputText === '' ? dispatch({ type: 'generation/generationFinishLoad' }) : null;
  }, [inputText]);

  useEffect(() => {
    if (openModal) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  useEffect(() => {
    if (width > 768 && width < 1024) {
      dispatch({ type: 'generation/setLimitPokemon', payload: 16 });
    }
    if (width >= 1024 && width < 1280) {
      dispatch({ type: 'generation/setLimitPokemon', payload: 24 });
    }
    if (width >= 1280) {
      dispatch({ type: 'generation/setLimitPokemon', payload: 32 });
    }
    dispatch(fetchGenerations);
    return () => {
      dispatch({ type: 'generation/pokemonReset' });
    };
  }, []);

  useEffect(() => {
    selectGener && selectGener === 'national' && dispatch(fetchAllGeneration(selectGener));
    selectGener && selectGener !== 'national' && dispatch(fetchGeneration(selectGener));
    dispatch({ type: 'generation/resetCurrentOffsetPokemon' });
  }, [selectGener]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectPokemon = (item: any) => {
    let findIndex = arrSelectPokemon.findIndex((item: { select: boolean }) => item.select === true);
    let newItem = Object.assign({}, arrSelectPokemon[findIndex], { item }, { select: false });

    const nextSelect = Object.assign({}, arrSelectPokemon[findIndex + 1], { select: true });
    let newArr = [
      ...arrSelectPokemon.slice(0, findIndex),
      newItem,
      nextSelect,
      ...arrSelectPokemon.slice(findIndex + 2),
    ];

    if (!arrSelectPokemon[findIndex + 1])
      newArr = [...arrSelectPokemon.slice(0, findIndex), newItem, ...arrSelectPokemon.slice(findIndex + 2)];

    if (arrSelectPokemon.findIndex((item: { reSelect: boolean }) => item.reSelect === true) >= 0) {
      findIndex = arrSelectPokemon.findIndex((item: { reSelect: boolean }) => item.reSelect === true);
      if (arrSelectPokemon[findIndex].select === false) {
        newItem = Object.assign({}, arrSelectPokemon[findIndex], { item }, { reSelect: false });
        newArr = [...arrSelectPokemon.slice(0, findIndex), newItem, ...arrSelectPokemon.slice(findIndex + 1)];
      }
    }

    setOpenModal(false);
    dispatch({ type: 'generation/setArrSelectPokemon', payload: newArr });
  };

  const onOpenModal = (indexSelect: number) => {
    window.scrollTo(0, 0);
    dispatch({
      type: 'generation/setArrSelectPokemon',
      payload:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arrSelectPokemon.map((item: any, index: number) => {
          if (index === indexSelect) return { ...item, reSelect: true };
          return { ...item, reSelect: false };
        }),
    });
    setOpenModal(!openModal);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectGener(e.target.value);
  };

  const Reset = () => {
    dispatch({ type: 'generation/setArrSelectPokemon', payload: initSelectPokemon });
  };

  const saveListSelectPokemon = () => {
    const selectPokemonRequest = {
      builder: JSON.stringify(arrSelectPokemon),
      user: currentUser.username,
    };

    builder.saveListSelectPokemon(selectPokemonRequest);
  };

  const optionsGeneration = generations.results?.map((generation: { name: string }) => (
    <Option key={generation.name} value={generation.name}>
      {generation.name}
    </Option>
  ));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listSelectPokemon = arrSelectPokemon.map((pokemon: { select: boolean; item: any }, index) => {
    if (index >= 6) return;
    return (
      <Item key={index}>
        <article
          className={`w-full h-40 xl:h-full rounded-lg${pokemon.item?.id ? ' bg-gray-50' : ' flex bg-gray-300'}`}
        >
          {pokemon.select ? (
            <Button
              type="button"
              className="m-3 bg-gray-50 w-full xl:self-center"
              onClick={() => {
                if (selectGener === '') {
                  return notification({ type: 'warning', message: 'Please select generation' });
                }
                onOpenModal(index);
              }}
            >
              <PlusIcon className="text-gray-300 m-auto h-18 sm:h-32 md:h-full" />
            </Button>
          ) : pokemon.item?.id ? (
            <div key={index} className="relative w-full">
              <figure className="bg-gray-50 rounded-xl pt-6 relative contents">
                {pokemon.item?.sprites?.order?.dream_world?.front_default ? (
                  <img
                    className="absolute z-0 left-1/2 transform -translate-x-1/2 h-32 w-32"
                    src={pokemon.item?.sprites?.order?.dream_world?.front_default}
                    alt={pokemon.item?.name}
                    width="128"
                    height="128"
                  />
                ) : null}
                <img
                  className={`card-img-top m-auto relative bg-gray-50${
                    pokemon.item?.sprites?.order?.dream_world?.front_default
                      ? ' transition-opacity hover:opacity-0'
                      : ''
                  }`}
                  src={
                    pokemon.item?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']?.front_default
                      ? pokemon.item?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']?.front_default
                      : pokemon.item?.sprites?.front_default
                  }
                  alt={pokemon.item?.name}
                  width="128"
                  height="128"
                />
                <figcaption className="text-xl tracking-wide text-center text-blue-900 pb-3 capitalize">
                  {pokemon.item?.name}
                </figcaption>
              </figure>
              <span className="absolute top-0 right-0 pt-1 pr-3 text-sm text-gray-700">
                #<span style={{ marginLeft: '1px' }}>{pokemon.item?.id && padLeft(pokemon.item?.id, 3)}</span>
              </span>
              <span className="absolute top-0 left-0 pt-2 pl-2 text-sm text-blue-700">
                <RefreshIcon
                  className="w-5 text-gray-500 inline mr-1"
                  onClick={() => {
                    if (selectGener === '') {
                      return notification({ type: 'warning', message: 'Please select generation' });
                    }
                    onOpenModal(index);
                  }}
                />
                <Link
                  to={`/pokemon/${pokemon.item?.id}`}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <ChartPieIcon className="w-5 text-gray-500 inline mr-1" />
                </Link>
              </span>
            </div>
          ) : null}
        </article>
      </Item>
    );
  });

  const listCardPokemon = detailPokemons.map(
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
      const item = detailPokemons?.[index];
      return (
        <div key={index} className="relative" onClick={() => selectPokemon(item)}>
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
              src={genVII ? genVII : front_default}
              alt={name}
              width="128"
              height="128"
            />
            <figcaption className="text-xl tracking-wide text-center text-blue-900 pb-3 capitalize">{name}</figcaption>
          </figure>
          <span className="absolute top-0 right-0 pt-1 pr-3 text-sm text-blue-700">
            #<span style={{ marginLeft: '1px' }}>{padLeft(id, 3)}</span>
          </span>
        </div>
      );
    },
  );

  return (
    <>
      {openModal ? (
        <div className={`absolute top-0 left-0 h-screen w-full z-20${openModal ? ' overflow-scroll' : ''}`}>
          <section className="flex flex-col min-h-full h-fit-content bg-gray-500 bg-opacity-90 pb-10">
            <div className="sticky top-0 z-10 bg-gray-600 bg-opacity-60 flex">
              <Button type="button" className="w-10 h-10 bg-gray-50 m-5" onClick={() => setOpenModal(false)}>
                <XIcon className="text-gray-600" />
              </Button>
              <div className="flex items-center">
                <SearchInput
                  searchValue={inputText}
                  onChangeSearchValue={(e) => setInputText(e.target.value)}
                  clearSearchValue={() => setInputText('')}
                />
              </div>
            </div>
            <section
              className={`grid ${
                loading ? 'grid-cols-1 h-screen ' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 '
              }gap-4 px-3 pt-3`}
            >
              {loading ? (
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 m-auto mt-3"></div>
              ) : listCardPokemon.length === 0 ? (
                <>
                  <div className="text-gray-50 text-2xl w-full col-span-2 text-center md:col-span-4 lg:col-span-6 xl:col-span-8">
                    Please search pokemon here!
                  </div>
                </>
              ) : (
                <>{listCardPokemon}</>
              )}
              <Button
                type="button"
                className="bg-gray-50 text-gray-800 col-span-2 xl:col-span-8 lg:col-span-6 md:col-span-4"
                onClick={() => dispatch(nextPokemonsGeneration)}
              >
                Show more
              </Button>
            </section>
          </section>
        </div>
      ) : null}
      <section className="flex flex-col">
        <section className="flex justify-center pt-5">
          <div className="mr-2">
            <Select onChange={onChangeSelect} disabled={selectLoading}>
              <Option value="">Select generation</Option>
              {optionsGeneration}
              <Option value="national">All generation</Option>
            </Select>
          </div>
          <Button className="w-20 bg-gray-600 ml-2" type="button" onClick={Reset}>
            Reset
          </Button>
        </section>
        <section>
          <List className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 p-8 xl:h-64">{listSelectPokemon}</List>
        </section>
        <button type="submit" onClick={saveListSelectPokemon}>
          Save
        </button>
        <TableBuilderTypes arrSelectPokemon={arrSelectPokemon} />
      </section>
    </>
  );
};

export default Builder;
