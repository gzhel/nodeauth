import { useCallback, useContext, useState } from 'react';
import { Context } from '../../../index';

export const useModel = () => {
  const { store } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    return store.login(email, password);
  }, [store, email, password]);

  const handleRegistration = useCallback(() => {
    return store.registration(email, password);
  }, [store, email, password]);

  const handleLogout = useCallback(() => {
    return store.logout();
  }, [store]);

  return {
    store,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegistration,
    handleLogout
  };
};
