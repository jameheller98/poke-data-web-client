// utils/useWindowSize.js

import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useWindowSize() {
  const isSSR = typeof window === 'undefined';
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
