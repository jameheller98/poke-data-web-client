import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetailRegions, selectDataRegion } from './RegionSlice';
import Error from '../Error';
import { ChevronRightIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';
import React from 'react';

const ListInfoRegion: React.FC = () => {
  const { name }: { name: string } = useParams();
  const loading = useSelector((state: { region: { loading: boolean } }) => state.region.loading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: { region: { error: any } }) => state.region.error);
  const idRegion = useSelector((state: { region: { data: { id: number } } }) => state.region.data.id);
  const imageData = useSelector((state: { region: { imageData: [] } }) => state.region.imageData);
  const dataInfoRegion = useSelector(selectDataRegion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailRegions(name));
  }, []);

  if (loading) {
    return <div>...</div>;
  }
  if (error) {
    return <Error error={error} />;
  }

  const version =
    dataInfoRegion.version_groups?.map((item: { name: string }, index: number) => (
      <ListViewItem key={index} name={item.name} />
    )) || [];

  const location =
    dataInfoRegion.locations?.map((item: { name: string }, index: number) => (
      <ListViewItem key={index} name={item.name} />
    )) || [];

  const pokedex =
    dataInfoRegion.pokedexes?.map((item: { name: string }, index: number) => (
      <ListViewItem key={index} name={item.name} />
    )) || [];
  console.log(location);
  console.log(dataInfoRegion);
  return (
    <>
      <div>
        <div className="p-3">
          <img className="rounded-lg shadow-btn" src={imageData[idRegion - 1]} />
          <div className="pt-2">
            <div className="text-3xl text-black capitalize font-bold pt-1">
              {dataInfoRegion.name && dataInfoRegion.name}
            </div>
            <div className="text-2xl text-gray-800 capitalize">
              {dataInfoRegion.main_generation?.name
                .split('-')
                .map((item: string, index: number) => (index === 0 ? item : item.toUpperCase()))
                .join('-')}
            </div>
            <div className={`grid ${version.length === pokedex.length ? 'grid-cols-2' : 'grid-cols-1'} gap-3 pt-1`}>
              <TableView
                data={version}
                title="Version"
                colorTitle="bg-indigo-100 text-indigo-900"
                gridCols={`${version.length === pokedex.length ? 'grid-cols-1' : 'grid-cols-2'}`}
              />
              <TableView
                data={pokedex}
                title="Pokedex"
                colorTitle="bg-yellow-100 text-yellow-900"
                gridCols={`${version.length === pokedex.length ? 'grid-cols-1' : 'grid-cols-2'}`}
              />
            </div>
            <div className="block pt-3">
              <TableView
                data={location}
                title="Location"
                colorTitle="bg-green-100 text-green-900"
                gridCols="grid-cols-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TableView: React.FC<{
  data: JSX.Element[];
  title: string;
  colorTitle: string;
  gridCols: string;
  height?: string;
}> = ({ data, title, colorTitle, gridCols, height = 'h-fit-content' }) => {
  return (
    <div className={`grid ${gridCols} gap-y-3 mt-5 text-lg bg-gray-50 bg-opacity-90 pb-3 ${height} shadow-md`}>
      <div
        className={`${
          gridCols === 'grid-cols-1' ? '' : 'col-start-1 col-end-3 '
        }text-center font-semibold rounded-t-lg py-1 tracking-wide ${colorTitle}`}
      >
        {title}
      </div>
      {data.length ? (
        data
      ) : (
        <span className="col-start-1 col-end-3 text-gray-600 capitalize text-center">Not available!</span>
      )}
    </div>
  );
};

TableView.propTypes = {
  data: propTypes.array.isRequired,
  title: propTypes.string.isRequired,
  colorTitle: propTypes.string.isRequired,
  gridCols: propTypes.string.isRequired,
  height: propTypes.string,
};

const ListViewItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <span className="text-gray-600 capitalize flex items-center">
      <ChevronRightIcon className="w-4 inline-block text-gray-600" />
      {name}
    </span>
  );
};

ListViewItem.propTypes = {
  name: propTypes.string.isRequired,
};

export default ListInfoRegion;
