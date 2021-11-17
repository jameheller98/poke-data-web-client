import { useEffect } from 'react';
import parseHtml from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRssItems, setNextOffset } from './HomeSlice';
import useLazyLoading from '../../customHooks/useLazyLoading';
import ImageLazy from '../../imageLazy.svg';
import Error from '../Error';
import useWindowSize from '../../customHooks/useWindowSize';

const Home: React.FC = () => {
  const { width } = useWindowSize();
  const rssItems = useSelector((state: { home: { data: { rssItems: [] } } }) => state.home.data.rssItems);
  const currentItem = useSelector((state: { home: { currentOffset: number } }) => state.home.currentOffset);
  const limit = useSelector((state: { home: { limit: number } }) => state.home.limit);
  const loading = useSelector((state: { home: { loading: boolean } }) => state.home.loading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: { home: { error: any } }) => state.home.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (width > 1024) dispatch({ type: 'home/setLimit', payload: 6 });
    dispatch(fetchRssItems);
  }, []);

  const rssItemsChange = rssItems?.filter((item, index) => {
    if (index < currentItem + limit) return item;
  });

  useLazyLoading('.card-img-top', rssItemsChange);

  const increaseRssItems = () => {
    dispatch(setNextOffset());
  };

  const article = rssItems
    ?.filter((item, index) => {
      if (index < currentItem + limit) return item;
    })
    .map(
      (
        {
          link,
          title,
          content,
          pubDate,
          enclosure: { url },
        }: { link: string; title: string; content: string; pubDate: string; enclosure: { url: string } },
        index: number,
      ) => {
        const publicDate = new Date(Date.parse(pubDate));

        const cardTitle = (
          <div className="mx-3 my-3 sm:mb-0">
            <time className="text-yellow-700 sm:text-sm">
              {publicDate.toDateString().slice(4, 10) + ',' + publicDate.toDateString().slice(10)}
            </time>
            <h2 className="text-xl mt-2 font-semibold text-gray-900 sm:text-lg">{parseHtml(title)}</h2>
          </div>
        );

        return (
          <a key={index} href={link} target="_blank" rel="noreferrer">
            <article className="grid gap-2 my-7 mx-3 bg-gray-50 rounded-lg lg:h-52">
              <div>
                <img
                  className="card-img-top float-left mr-3 rounded-tl-lg sm:h-40 sm:w-40"
                  data-src={url}
                  src={ImageLazy}
                  alt={title}
                  height="150"
                  width="150"
                />
                {width < 640 ? (
                  <p className="m-3 text-gray-500 overflow-auto h-20 shadow-inner p-2 sm:text-sm">
                    {parseHtml(content)}
                  </p>
                ) : (
                  <>
                    {cardTitle}
                    <p className="text-gray-500 sm:text-sm">{parseHtml(content)}</p>
                  </>
                )}
              </div>
              {width > 640 ? null : cardTitle}
            </article>
          </a>
        );
      },
    );

  if (loading) {
    return (
      <section className="bg-gray-100 p-3 w-full">
        <div className="animate-pulse text-4xl h-10 w-4/6 mt-3 bg-gray-300 rounded-sm" />
        <article className="grid gap-2 my-7 bg-gray-50 rounded-lg w-full">
          <div className="w-full">
            <div className="animate-pulse float-left mr-3 rounded-tl-lg h-40 w-2/5 bg-gray-300" />
            <p className="animate-pulse m-3 bg-gray-300 overflow-auto h-20 shadow-inner"></p>
          </div>
          <div className="mx-3 mb-3">
            <div className="animate-pulse bg-yellow-100 h-3 w-20"></div>
            <div className="animate-pulse mt-2 h-5 font-semibold bg-gray-300"></div>
          </div>
        </article>
        <article className="grid gap-2 my-7 bg-gray-50 rounded-lg w-full">
          <div className="w-full">
            <div className="animate-pulse float-left mr-3 rounded-tl-lg h-40 w-2/5 bg-gray-300" />
            <p className="animate-pulse m-3 bg-gray-300 overflow-auto h-20 shadow-inner"></p>
          </div>
          <div className="mx-3 mb-3">
            <div className="animate-pulse bg-yellow-100 h-3 w-20"></div>
            <div className="animate-pulse mt-2 h-5 font-semibold bg-gray-300"></div>
          </div>
        </article>
        <article className="grid gap-2 my-7 bg-gray-50 rounded-lg w-full">
          <div className="w-full">
            <div className="animate-pulse float-left mr-3 rounded-tl-lg h-40 w-2/5 bg-gray-300" />
            <p className="animate-pulse m-3 bg-gray-300 overflow-auto h-20 shadow-inner"></p>
          </div>
          <div className="mx-3 mb-3">
            <div className="animate-pulse bg-yellow-100 h-3 w-20"></div>
            <div className="animate-pulse mt-2 h-5 font-semibold bg-gray-300"></div>
          </div>
        </article>
      </section>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <section className="grid lg:grid-cols-2">
        <h1 className="text-4xl mx-3 text-gray-600 pt-3 lg:col-span-2">Pokémon News</h1>
        {article}
        <div className="text-center text-xl lg:col-span-2">
          {currentItem + limit - 1 < rssItems?.length ? (
            <button className="bg-indigo-200 bg-opacity-60 text-indigo-900 rounded-md p-3 " onClick={increaseRssItems}>
              Read more
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Home;
