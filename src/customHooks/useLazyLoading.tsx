import { useCallback, useEffect, useRef } from 'react';

const useLazyLoading = (imgSelector: string, items: []): void => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target as HTMLImageElement;
          const newImgSrc = currentImg.dataset.src;

          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    });
    intObs.observe(node);
  }, []);
  const imagesRef = useRef<NodeListOf<Element> | null>(null);
  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};

export default useLazyLoading;
