import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegion, selectDataRegion, toggleActiveItem, setCurrentItem } from './RegionSlice';
import Error from '../Error';
import data from './dataRegionDescription.json';
import { DocumentIcon, DocumentTextIcon } from '@heroicons/react/solid';
import './index.scss';

const dataRegionDescription: { [key: string]: string } = data;

const ListRegion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataRegion = useSelector(selectDataRegion);
  const loading = useSelector((state: { region: { loading: boolean } }) => state.region.loading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: { region: { error: any } }) => state.region.error);
  const mapCount: {
    [key: number]: string[];
    count: number;
  } = { count: 0, [dataRegion.length + 1]: ['row-start-5', 'col-start-1', 'col-end-3'] };
  const listClassOdd = ['row-start-1', 'row-start-2', 'row-start-3', 'row-start-4'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleActiveItem(false));
    dispatch(fetchRegion);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.querySelectorAll('link[rel=preload]').forEach((e: { parentNode: any }) => e.parentNode.removeChild(e));
  }, []);

  if (loading) {
    const listLoadingItem = [...Array(8)].map((_, index) => (
      <div key={index} className="h-44 w-48 bg-gray-200 bg-opacity-90 rounded-lg p-3">
        <div className="animate-pulse h-28 w-40 m-auto bg-gray-300 rounded-2xl shadow-btn" />
        <div className="animate-pulse m-auto mt-4 h-5 w-40 text-2xl font-semibold bg-gray-300 rounded-2xl shadow-btn" />
      </div>
    ));
    return <div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 fixed">{listLoadingItem}</div>;
  }

  if (error) {
    return <Error error={error} />;
  }

  const allCard = dataRegion?.results?.map(({ name }: { name: string }, index: number) => {
    mapCount[index] = (
      index % 2 !== 0 ? listClassOdd[mapCount.count++] + ' col-start-1 col-end-3' : 'col-span-2'
    ).split(' ');
    return <ListRegionItem key={index} name={name} index={index} mapCount={mapCount} />;
  });

  return (
    <>
      <h1 className="font-medium text-5xl text-gray-800 tracking-wider text-center py-5 font-serif">Regions</h1>
      <details className="bg-gray-50 text-gray-800 text-opacity-80 text-xl m-3 p-3 mb-10 shadow-inner rounded-lg">
        <summary onClick={() => setIsOpen(!isOpen)} className="flex items-center">
          {isOpen ? (
            <DocumentTextIcon className="inline-block h-6 mr-2" />
          ) : (
            <DocumentIcon className="inline-block h-6 mr-2" />
          )}{' '}
          Regions Pokémon
        </summary>
        <blockquote
          cite="https://pokemon.fandom.com/wiki/Regions"
          className="bg-gray-50 text-gray-800 text-opacity-80 text-xl mt-3 pt-3 overflow-auto h-52"
        >
          <dfn>Regions</dfn> are areas in the Pokémon universe that are smaller parts of a nation. Each region has their
          own <cite>Pokémon Professor</cite>, who provides a unique set of Starter Pokémon for young Trainers. Each
          region also has a unique set of eight <cite>Gym Leaders</cite>, along with the regional{' '}
          <cite>Elite Four</cite> and <cite>Pokémon Champions</cite>. In some cases, regions can share{' '}
          <cite>Elite Four</cite> divisions, such as <cite>Johto</cite> and <cite>Kanto</cite>.
        </blockquote>
      </details>
      <section className="grid grid-cols-2 gap-4 p-3">{allCard}</section>
    </>
  );
};
type TRegionItem = {
  index: number;
  name: string;
  mapCount: { [key: number]: string[] };
};

const ListRegionItem: React.FC<TRegionItem> = ({ index, name, mapCount }) => {
  const activeItem = useSelector((state: { region: { activeItem: boolean } }) => state.region.activeItem);
  const currentItem = useSelector((state: { region: { currentItem: number } }) => state.region.currentItem);
  const imageData = useSelector((state: { region: { imageData: Record<string, ''>[] } }) => state.region.imageData);
  const dispatch = useDispatch();

  useEffect(() => {
    const $link = document.createElement('link');
    $link.rel = 'preload';
    $link.href = imageData[index]?.large;
    $link.as = 'image';
    document.head.appendChild($link);
  }, []);

  const onActiveItem = (e: React.MouseEvent, index: number, mapCount: { [key: number]: string[] }) => {
    const tagLink = e.target as HTMLElement;
    if (tagLink.tagName === 'A') {
      return;
    }
    dispatch(setCurrentItem(index));

    if (!activeItem || currentItem !== index) {
      if (currentItem !== index) {
        e.currentTarget.getElementsByTagName('img')[0].src = imageData[index]?.small;
        document.getElementsByClassName(mapCount[currentItem][0])[0]?.classList.remove(...mapCount[currentItem]);
      }

      e.currentTarget.getElementsByTagName('img')[0].src = imageData[index]?.large;
      dispatch(toggleActiveItem(true));
      e.currentTarget.classList.add(...mapCount[index]);
      return e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }

    e.currentTarget.getElementsByTagName('img')[0].src = imageData[index]?.small;
    dispatch(toggleActiveItem(false));
    return e.currentTarget.classList.remove(...mapCount[index]);
  };

  return (
    <>
      <article
        className="h-fit-content last:h-full"
        onClick={(e) => {
          onActiveItem(e, index, mapCount);
        }}
      >
        <div
          className={`bg-gray-200 bg-opacity-90 rounded-lg p-3 ${
            activeItem && currentItem === index ? 'text-left' : ''
          }`}
        >
          <figure>
            <picture>
              <source media="(min-width: 768px)" srcSet={imageData[index]?.large} />
              <img
                src={imageData[index]?.small}
                className="rounded-lg shadow-btn"
                width="600px"
                height="424px"
                alt={name}
              />
            </picture>
            <figcaption
              className={`${
                activeItem && currentItem === index ? 'text-3xl opacity-90' : 'text-2xl opacity-80'
              } font-semibold tracking-wide text-gray-800 transition-all inline-block pt-1 underline float-left`}
            >
              <Link to={`region/${name}`} rel="preconnect" className="capitalize">
                <h2>{name}</h2>
              </Link>
            </figcaption>{' '}
          </figure>

          <p
            className={`${
              activeItem && currentItem === index
                ? 'text-xl pt-3 text-opacity-80 '
                : 'text-lg truncate pt-2 text-opacity-90 '
            }text-gray-700`}
          >
            &nbsp;- {dataRegionDescription[name]}
          </p>
        </div>
      </article>
    </>
  );
};

ListRegionItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  mapCount: PropTypes.any.isRequired,
};

export default ListRegion;
