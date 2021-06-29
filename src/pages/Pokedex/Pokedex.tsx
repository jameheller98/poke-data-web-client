import { DocumentTextIcon, HashtagIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';
import { fetchPokedex, selectDataResultsPokedex, setSearchValue } from './PokedexSlice';

const Pokedex: React.FC = () => {
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
        <span className="text-lg text-indigo-800 capitalize font-semibold">{item.name}</span>
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
    return <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 m-auto"></div>;
  }

  return (
    <>
      <h1 className="font-medium text-5xl text-gray-800 tracking-wider text-center py-5 font-serif">Pokedexs</h1>
      <p className="bg-gray-50 text-gray-800 text-opacity-80 text-xl m-3 p-3 overflow-auto h-52 mb-10 shadow-inner rounded-lg">
        <DocumentTextIcon className="inline-block h-10 float-left mt-2 mr-2" />
        Pokedex is an electronic device designed to catalogue and provide information regarding the various species of
        Pokémon featured in the Pokémon video game, anime and manga series. The name Pokédex is a neologism including
        &quot;Pokémon&quot; (which itself is a portmanteau of &quot;pocket&quot; and &quot;monster&quot;) and
        &quot;index&quot;. The Japanese name is simply &quot;Pokémon Encyclopedia&quot;, as it can feature every Pokémon
        on it, depending on the Pokédex.
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-3 bg-gray-50 mb-3 shadow-btn">
        <SearchInput
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          clearSearchValue={clearSearchValue}
        />
        {allPokedex}
      </div>
    </>
  );
};

export default Pokedex;
