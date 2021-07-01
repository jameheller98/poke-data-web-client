import { DocumentIcon, DocumentTextIcon, HashtagIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';
import { fetchPokedex, selectDataResultsPokedex, setSearchValue } from './PokedexSlice';

const Pokedex: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataResultsPokedex = useSelector(selectDataResultsPokedex);
  const searchValue = useSelector((state: { pokedex: { searchValue: string } }) => state.pokedex.searchValue);
  const dispatch = useDispatch();
  const loading = useSelector((state: { pokedex: { loading: boolean } }) => state.pokedex.loading);

  useEffect(() => {
    dispatch(fetchPokedex);
  }, []);

  const allPokedex = dataResultsPokedex?.map((item: { name: string }, index: number) => (
    <Link to={`/pokedex/${item.name}`} rel="preconnect" key={index}>
      <div className="bg-indigo-100 bg-opacity-90 rounded-lg p-2 h-full flex content-center items-center">
        <HashtagIcon className="inline-block h-4 mr-2 text-indigo-800" />
        <cite className="text-lg text-indigo-800 capitalize font-semibold">{item.name}</cite>
      </div>
    </Link>
  ));

  const onChangeSearchValue = (e: { target: { value: string } }) => {
    dispatch(setSearchValue(e.target.value));
  };

  const clearSearchValue = () => {
    dispatch(setSearchValue(''));
  };

  if (loading) {
    return (
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 m-auto mt-8"></div>
    );
  }

  return (
    <>
      <h1 className="font-medium text-5xl text-gray-800 tracking-wider text-center py-5 font-serif">Pokedexs</h1>
      <details className="bg-gray-50 text-gray-800 text-opacity-80 text-xl m-3 p-3 mb-10 shadow-inner rounded-lg">
        <summary onClick={() => setIsOpen(!isOpen)} className="flex items-center">
          {isOpen ? (
            <DocumentTextIcon className="inline-block h-6 mr-2" />
          ) : (
            <DocumentIcon className="inline-block h-6 mr-2" />
          )}{' '}
          Pokedex Pokémon
        </summary>
        <blockquote
          cite="https://pokemon.fandom.com/wiki/Pok%C3%A9dex"
          className="bg-gray-50 text-gray-800 text-opacity-80 text-xl m-3 p-3 overflow-auto h-52"
        >
          <dfn>Pokedex</dfn> is an electronic device designed to catalogue and provide information regarding the various
          species of Pokémon featured in the Pokémon video game, anime and manga series. The name Pokédex is a neologism
          including &quot;<cite>Pokémon</cite>&quot; (which itself is a portmanteau of &quot;<cite>pocket</cite>&quot;
          and &quot;
          <cite>monster</cite>&quot;) and &quot;<cite>index</cite>&quot;. The Japanese name is simply &quot;
          <cite>Pokémon Encyclopedia</cite>&quot;, as it can feature every Pokémon on it, depending on the Pokédex.
        </blockquote>
      </details>

      <section className="grid grid-cols-2 gap-x-4 gap-y-6 p-3 bg-gray-50 mb-3 shadow-btn">
        <SearchInput
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          clearSearchValue={clearSearchValue}
        />
        {allPokedex}
      </section>
    </>
  );
};

export default Pokedex;
