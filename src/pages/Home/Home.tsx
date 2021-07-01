import { useEffect } from 'react';
import parseHtml from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRssItems, setNextOffset } from './HomeSlice';
import useLazyLoading from '../../customHooks/useLazyLoading';
import ImageLazy from '../../imageLazy.svg';

const Home: React.FC = () => {
  const rssItems = useSelector((state: { home: { data: { rssItems: [] } } }) => state.home.data.rssItems);
  const currentItem = useSelector((state: { home: { currentOffset: number } }) => state.home.currentOffset);
  const limit = useSelector((state: { home: { limit: number } }) => state.home.limit);
  const dispatch = useDispatch();

  useEffect(() => {
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

        return (
          <a key={index} href={link}>
            <article className="grid gap-2 my-7 mx-3 bg-gray-50 rounded-lg">
              <div>
                <img
                  className="card-img-top float-left mr-3 rounded-tl-lg"
                  data-src={url}
                  src={ImageLazy}
                  alt={title}
                  height="150"
                  width="150"
                />
                <p className="m-3 text-gray-500 overflow-auto h-20 shadow-inner p-2">{content}</p>
              </div>
              <div className="mx-3 mb-3">
                <time className="text-yellow-700">
                  {publicDate.toDateString().slice(4, 10) + ',' + publicDate.toDateString().slice(10)}
                </time>
                <h2 className="text-xl mt-2 font-semibold text-gray-900">{parseHtml(title)}</h2>
              </div>
            </article>
          </a>
        );
      },
    );
  return (
    <>
      <section>
        <h1 className="text-4xl mx-3 text-gray-600 pt-3">Pokémon News</h1>
        {article}
        <div className="text-center text-xl">
          {currentItem + limit - 1 !== rssItems?.length ? (
            <button className="bg-indigo-200 bg-opacity-60 text-indigo-900 rounded-md p-3" onClick={increaseRssItems}>
              Read more
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Home;
