/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { setNextOffset } from '../pages/Pokedex/PokedexSlice';

const useInfiniteScroll = (scrollRef: any, dispatch: any): void => {
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            dispatch(setNextOffset());
          }
        });
      }).observe(node);
    },
    [dispatch],
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};

export default useInfiniteScroll;
