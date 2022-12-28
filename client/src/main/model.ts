import { useContext, useEffect } from 'react';
import { Context } from '../index';

export const useModel = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) store.checkAuth();
  }, [store]);

  return {
    isAuthorizationLoading: store.isLoading
  };
};
