import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchDetailRegions, selectDataLocationRegion, selectDataRegion, setSearchValue } from './RegionSlice';
import Error from '../Error';
import { ReplyIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';
import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';

const ListInfoRegion: React.FC = () => {
  // const history = useHistory();
  const { name }: { name: string } = useParams();
  const loading = useSelector((state: { region: { loading: boolean } }) => state.region.loading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: { region: { error: any } }) => state.region.error);
  const idRegion = useSelector((state: { region: { data: { id: number } } }) => state.region.data.id);
  const imageData = useSelector((state: { region: { imageData: Record<string, ''>[] } }) => state.region.imageData);
  const dataInfoRegion = useSelector(selectDataRegion);
  const dataLocationRegion = useSelector(selectDataLocationRegion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailRegions(name));
  }, []);

  if (loading) {
    const listLoadingItem = [...Array(8)].map((_, index) => (
      <ListViewItem
        key={index}
        name={<div className="animate-pulse h-5 mt-4 w-10/12 bg-gray-300 rounded-2xl shadow-btn mb-4" />}
      />
    ));
    return (
      <div className="p-3 pt-16 w-full fixed bg-gray-50">
        <div className="animate-pulse h-64 w-full bg-gray-300 rounded-2xl shadow-btn" />
        <div className="animate-pulse h-8 mt-6 w-2/6 bg-gray-300 rounded-2xl shadow-btn" />
        <div className="animate-pulse h-8 mt-4 w-3/6 bg-gray-300 rounded-2xl shadow-btn" />
        <TableView
          data={listLoadingItem}
          title={<div className="animate-pulse h-4 mt-1 mb-2 w-1/3 bg-gray-300 rounded-2xl shadow-btn m-auto" />}
          colorTitle="bg-indigo-100 text-indigo-900"
          gridCols="grid-cols-2"
        />
      </div>
    );
  }
  if (error) {
    return <Error error={error} />;
  }

  const version =
    dataInfoRegion.version_groups?.map((item: { name: string }, index: number) => (
      <ListViewItem key={index} name={item.name} />
    )) || [];

  const location =
    dataLocationRegion?.map((item: { name: string }, index: number) => <ListViewItem key={index} name={item.name} />) ||
    [];

  const pokedex =
    dataInfoRegion.pokedexes?.map((item: { name: string }, index: number) => (
      <Link to={`/pokedex/${item.name}`} key={index}>
        <ListViewItem key={index} name={item.name} />
      </Link>
    )) || [];

  return (
    <>
      <div className="px-6 pt-3">
        <Link to="/region" aria-label="BackRegion">
          <ReplyIcon className="inline-block w-10 text-gray-500" />
        </Link>
      </div>
      <section className="p-3">
        <figure>
          <img
            className="rounded-lg shadow-btn"
            src={imageData[idRegion - 1]?.large}
            width="600px"
            height="424px"
            alt={dataInfoRegion.name}
          />
          <figcaption className="text-3xl text-black capitalize font-bold pt-1">{dataInfoRegion.name}</figcaption>
        </figure>
        <cite className="text-2xl text-gray-800 capitalize">
          <h1>
            {dataInfoRegion.main_generation?.name
              .split('-')
              .map((item: string, index: number) => (index === 0 ? item : item.toUpperCase()))
              .join('-')}
          </h1>
        </cite>
        <div className={`grid ${version.length === pokedex.length ? 'grid-cols-2' : 'grid-cols-1'} gap-3 pt-1`}>
          <TableView
            data={pokedex}
            title="Pokedex"
            colorTitle="bg-yellow-100 text-yellow-900"
            gridCols={`${version.length === pokedex.length ? 'grid-cols-1' : 'grid-cols-2'}`}
          />
          <TableView
            data={version}
            title="Version"
            colorTitle="bg-indigo-100 text-indigo-900"
            gridCols={`${version.length === pokedex.length ? 'grid-cols-1' : 'grid-cols-2'}`}
          />
        </div>
        <div className="block pt-3">
          <TableView data={location} title="Location" colorTitle="bg-green-100 text-green-900" gridCols="grid-cols-2" />
        </div>
      </section>
    </>
  );
};

const TableView: React.FC<{
  data: JSX.Element[];
  title: React.ReactNode;
  colorTitle: string;
  gridCols: string;
  height?: string;
}> = ({ data, title, colorTitle, gridCols, height = 'h-fit-content' }) => {
  return (
    <article
      className={`grid ${gridCols} gap-y-5 mt-5 text-lg bg-gray-50 bg-opacity-90 pb-5 ${height} shadow-md rounded-t-lg`}
    >
      <h2
        className={`${
          gridCols === 'grid-cols-1' ? '' : 'col-start-1 col-end-3 '
        }text-center font-semibold rounded-t-lg py-1 tracking-wide ${colorTitle}`}
      >
        {title}
      </h2>
      {title === 'Location' ? <SearchLocation /> : null}
      {data.length ? (
        data
      ) : (
        <span className="col-start-1 col-end-3 text-gray-600 capitalize text-center">Not available!</span>
      )}
    </article>
  );
};

TableView.propTypes = {
  data: propTypes.array.isRequired,
  title: propTypes.node.isRequired,
  colorTitle: propTypes.string.isRequired,
  gridCols: propTypes.string.isRequired,
  height: propTypes.string,
};

const ListViewItem: React.FC<{ name: React.ReactNode }> = ({ name }) => {
  return (
    <span className={`text-gray-600 capitalize flex items-center pl-3`}>
      <span className="inline-block">{name}</span>
    </span>
  );
};

ListViewItem.propTypes = {
  name: propTypes.node.isRequired,
};

const SearchLocation: React.FC = () => {
  const searchValue = useSelector((state: { region: { searchValue: string } }) => state.region.searchValue);
  const dispatch = useDispatch();

  const onChangeSearchValue = (e: { target: { value: string } }) => {
    dispatch(setSearchValue(e.target.value));
  };

  const clearSearchValue = () => {
    dispatch(setSearchValue(''));
  };

  return (
    <SearchInput
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      clearSearchValue={clearSearchValue}
    />
  );
};

export default ListInfoRegion;
