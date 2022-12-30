import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../../../index';
import { IUser } from '../../../shared/interfaces/IUser';
import userService from '../../../shared/services/userService';

export const useModel = () => {
  const { store } = useContext(Context);

  const isMobile = useMemo(() => {
    return window.screen.width < 768;
  }, []);

  const [validationMessage, setValidationMessage] = useState('');

  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = useCallback(async () => {
    try {
      const { data: users } = await userService.fetchUsers();
      const slicedUsers = users.map((user) => {
        return { ...user, email: user.email.slice(0, 15) + '...' };
      });
      setUsers(isMobile ? slicedUsers : users);
    } catch (e) {
      console.log(e);
    }
  }, [isMobile]);

  const isUserAuthorized = store.isAuthorized;

  useEffect(() => {
    setValidationMessage(store.validationMessage);
  }, [store.validationMessage]);

  return { store, users, setUsers, getUsers, isUserAuthorized, validationMessage, isMobile };
};
