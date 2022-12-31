import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Context } from '../index';

export const useModel = () => {
  const { store } = useContext(Context);

  const preloaderElement = document.getElementById('preloader');
  const preloaderTextElement = useRef<HTMLInputElement>(null);
  const preloaderColors = useMemo(() => ['#000000', '#378FE9'], []);
  const [preloaderColor, setPreloaderColor] = useState(preloaderColors[0]);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (preloaderTextElement.current) {
      timeout = setTimeout(() => {
        if (preloaderColor === preloaderColors[0]) {
          setPreloaderColor(preloaderColors[1]);
        } else {
          setPreloaderColor(preloaderColors[0]);
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [preloaderColor]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) store.checkAuth();
  }, [store]);

  return {
    preloaderElement,
    preloaderTextElement,
    preloaderColor,
    isLoading: store.isLoading
  };
};
