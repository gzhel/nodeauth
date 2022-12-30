import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../../../index';
import { IValidationError } from '../../../shared/interfaces/IValidationError';

export const useModel = () => {
  const { store } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([] as IValidationError[]);

  const handleLogin = useCallback(() => {
    return store.login(email, password);
  }, [store, email, password]);

  const handleRegistration = useCallback(() => {
    return store.registration(email, password);
  }, [store, email, password]);

  const handleLogout = useCallback(() => {
    return store.logout();
  }, [store]);

  const handleLogoClicked = useCallback(() => {
    window.location.reload();
    return;
  }, []);

  useEffect(() => {
    setErrors(store.errors);
  }, [store.errors]);

  const emailValidation = useMemo(() => {
    if (errors.length && !email.length) return 'Required field value';
    return errors.find((error) => error.param === 'email')?.msg;
  }, [email.length, errors]);

  const passwordValidation = useMemo(() => {
    if (errors.length && !password.length) return 'Required field value';
    return errors.find((error) => error.param === 'password')?.msg;
  }, [password.length, errors]);

  return {
    store,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegistration,
    handleLogout,
    handleLogoClicked,
    emailValidation,
    passwordValidation
  };
};
